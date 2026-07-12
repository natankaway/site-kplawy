import { after, before, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { createServer as createNetServer } from 'node:net';
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { tmpdir } from 'node:os';

const root = process.cwd();
const chromePath =
  process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

let webServer;
let webBaseUrl;
let chrome;
let chromePort;
let chromeProfile;

const mimeTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.png', 'image/png'],
  ['.mp4', 'video/mp4'],
  ['.webm', 'video/webm'],
]);

function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = createNetServer();
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      server.close(() => resolve(address.port));
    });
    server.on('error', reject);
  });
}

function startStaticServer() {
  return new Promise((resolve, reject) => {
    const server = createServer(async (req, res) => {
      try {
        const url = new URL(req.url || '/', 'http://127.0.0.1');
        let filePath;

        if (url.pathname === '/' || url.pathname === '/pt' || url.pathname === '/pt/') {
          filePath = join(root, 'src/static-site/pt/index.html');
        } else if (url.pathname === '/en' || url.pathname === '/en/') {
          filePath = join(root, 'src/static-site/en/index.html');
        } else {
          const decodedPath = decodeURIComponent(url.pathname).replace(/^\/+/, '');
          const publicPath = normalize(join(root, 'public', decodedPath));
          if (!publicPath.startsWith(join(root, 'public'))) {
            res.writeHead(403);
            res.end('Forbidden');
            return;
          }
          filePath = publicPath;
        }

        const body = await readFile(filePath);
        res.writeHead(200, {
          'content-type': mimeTypes.get(extname(filePath)) || 'application/octet-stream',
          'cache-control': 'no-store',
        });
        res.end(body);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });

    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      resolve({ server, baseUrl: `http://127.0.0.1:${address.port}` });
    });
    server.on('error', reject);
  });
}

async function waitForChrome() {
  const endpoint = `http://127.0.0.1:${chromePort}/json/version`;
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(endpoint);
      if (response.ok) return;
    } catch {
      // Chrome is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error('Chrome DevTools endpoint did not start');
}

class CdpClient {
  constructor(wsUrl) {
    this.nextId = 1;
    this.callbacks = new Map();
    this.listeners = new Map();
    this.socket = new WebSocket(wsUrl);
  }

  async open() {
    await new Promise((resolve, reject) => {
      this.socket.addEventListener('open', resolve, { once: true });
      this.socket.addEventListener('error', reject, { once: true });
    });
    this.socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (message.id && this.callbacks.has(message.id)) {
        const { resolve, reject } = this.callbacks.get(message.id);
        this.callbacks.delete(message.id);
        if (message.error) reject(new Error(message.error.message));
        else resolve(message.result);
        return;
      }
      if (message.method && this.listeners.has(message.method)) {
        for (const resolve of this.listeners.get(message.method)) resolve(message.params || {});
        this.listeners.delete(message.method);
      }
    });
  }

  send(method, params = {}) {
    const id = this.nextId;
    this.nextId += 1;
    this.socket.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => {
      this.callbacks.set(id, { resolve, reject });
    });
  }

  once(method) {
    return new Promise((resolve) => {
      const listeners = this.listeners.get(method) || [];
      listeners.push(resolve);
      this.listeners.set(method, listeners);
    });
  }

  close() {
    this.socket.close();
  }
}

async function inspectLanding(pathname, viewport) {
  const target = await fetch(`http://127.0.0.1:${chromePort}/json/new`, { method: 'PUT' }).then(
    (response) => response.json(),
  );
  const client = new CdpClient(target.webSocketDebuggerUrl);
  await client.open();
  await client.send('Page.enable');
  await client.send('Runtime.enable');
  await client.send('Emulation.setDeviceMetricsOverride', {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
    mobile: viewport.mobile,
  });

  const loaded = client.once('Page.loadEventFired');
  await client.send('Page.navigate', { url: `${webBaseUrl}${pathname}` });
  await loaded;
  await new Promise((resolve) => setTimeout(resolve, 250));

  const { result } = await client.send('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const layoutViewportWidth = window.innerWidth;
      const viewportWidth = Math.min(
        window.innerWidth,
        window.visualViewport ? window.visualViewport.width : window.innerWidth,
      );
      const doc = document.documentElement;
      const isVisible = (el) => {
        const style = getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
      };
      const inspectTarget = (selector, label = selector) => {
        const el = document.querySelector(selector);
        if (!el || !isVisible(el)) return null;
        const rect = el.getBoundingClientRect();
        return {
          label,
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          clipped: rect.left < 0 || rect.right > viewportWidth,
          tooSmall: rect.width < 44 || rect.height < 44,
        };
      };
      const headerTargets = [
        inspectTarget('#hdr .brand', 'brand'),
        inspectTarget('#hdr .m-actions .btn', 'mobile download CTA'),
        inspectTarget('#burger', 'menu button'),
      ].filter(Boolean);
      const floaties = Array.from(document.querySelectorAll('.floaty'))
        .filter(isVisible)
        .map((el) => {
          const rect = el.getBoundingClientRect();
          return {
            text: el.textContent.trim().replace(/\\s+/g, ' '),
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            width: Math.round(rect.width),
            clipped: rect.left < 8 || rect.right > viewportWidth - 8,
          };
        });

      return {
        viewportWidth,
        scrollOverflow: Math.max(0, doc.scrollWidth - layoutViewportWidth),
        headerTargets,
        clippedHeaderTargets: headerTargets.filter((target) => target.clipped),
        smallHeaderTargets: headerTargets.filter((target) => target.tooSmall),
        clippedFloaties: floaties.filter((target) => target.clipped),
      };
    })()`,
  });

  await fetch(`http://127.0.0.1:${chromePort}/json/close/${target.id}`).catch(() => {});
  client.close();
  return result.value;
}

async function inspectStickyCta(pathname, viewport) {
  const target = await fetch(`http://127.0.0.1:${chromePort}/json/new`, { method: 'PUT' }).then(
    (response) => response.json(),
  );
  const client = new CdpClient(target.webSocketDebuggerUrl);
  await client.open();
  await client.send('Page.enable');
  await client.send('Runtime.enable');
  await client.send('Emulation.setDeviceMetricsOverride', {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: viewport.deviceScaleFactor ?? 1,
    mobile: viewport.mobile,
  });

  const loaded = client.once('Page.loadEventFired');
  await client.send('Page.navigate', { url: `${webBaseUrl}${pathname}` });
  await loaded;
  await client.send('Runtime.evaluate', {
    expression: 'window.scrollTo(0, 900)',
  });
  await new Promise((resolve) => setTimeout(resolve, 350));

  const { result } = await client.send('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const visualWidth = Math.min(
        window.innerWidth,
        window.visualViewport ? window.visualViewport.width : window.innerWidth,
      );
      const sticky = document.querySelector('#sticky');
      const button = document.querySelector('#sticky a');
      const stickyRect = sticky.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      const stickyStyle = getComputedStyle(sticky);
      return {
        visualWidth,
        stickyDisplay: stickyStyle.display,
        stickyLeft: Math.round(stickyRect.left),
        stickyRight: Math.round(stickyRect.right),
        buttonLeft: Math.round(buttonRect.left),
        buttonRight: Math.round(buttonRect.right),
        buttonWidth: Math.round(buttonRect.width),
        buttonHeight: Math.round(buttonRect.height),
        buttonClipped: buttonRect.left < 0 || buttonRect.right > visualWidth,
        buttonTooSmall: buttonRect.width < 44 || buttonRect.height < 44,
      };
    })()`,
  });

  await fetch(`http://127.0.0.1:${chromePort}/json/close/${target.id}`).catch(() => {});
  client.close();
  return result.value;
}

describe('responsive static landing', () => {
  before(async () => {
    assert.ok(existsSync(chromePath), `Chrome not found at ${chromePath}`);
    const startedServer = await startStaticServer();
    webServer = startedServer.server;
    webBaseUrl = startedServer.baseUrl;
    chromePort = await getFreePort();
    chromeProfile = mkdtempSync(join(tmpdir(), 'kplawy-responsive-'));
    chrome = spawn(chromePath, [
      '--headless=new',
      '--no-first-run',
      '--disable-gpu',
      `--remote-debugging-port=${chromePort}`,
      `--user-data-dir=${chromeProfile}`,
      'about:blank',
    ]);
    await waitForChrome();
  });

  after(async () => {
    webServer?.close();
    chrome?.kill();
    if (chromeProfile) {
      try {
        rmSync(chromeProfile, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
      } catch {
        // Chrome can briefly hold cache files after kill; this is not a test failure.
      }
    }
  });

  for (const pathname of ['/pt', '/en']) {
    it(`${pathname} keeps the mobile header inside 320px with accessible touch targets`, async () => {
      const result = await inspectLanding(pathname, { width: 320, height: 740, mobile: true });

      assert.equal(result.scrollOverflow, 0);
      assert.deepEqual(result.clippedHeaderTargets, []);
      assert.deepEqual(result.smallHeaderTargets, []);
    });
  }

  for (const pathname of ['/pt', '/en']) {
    it(`${pathname} does not clip desktop hero cards at 1024px`, async () => {
      const result = await inspectLanding(pathname, { width: 1024, height: 768, mobile: false });

      assert.equal(result.scrollOverflow, 0);
      assert.deepEqual(result.clippedFloaties, []);
    });
  }

  for (const pathname of ['/pt', '/en']) {
    it(`${pathname} keeps the sticky download CTA fully visible on Galaxy S25-sized mobile`, async () => {
      const result = await inspectStickyCta(pathname, {
        width: 360,
        height: 780,
        deviceScaleFactor: 3,
        mobile: true,
      });

      assert.equal(result.stickyDisplay, 'flex');
      assert.equal(result.buttonClipped, false);
      assert.equal(result.buttonTooSmall, false);
    });
  }
});
