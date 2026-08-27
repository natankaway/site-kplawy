import { after, before, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { createServer as createNetServer } from 'node:net';
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const root = process.cwd();
const chromePath =
  process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

let webServer;
let webBaseUrl;
let chrome;
let chromePort;
let chromeProfile;

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

async function startNextServer() {
  const port = await getFreePort();
  const server = spawn(process.execPath, [
    'node_modules/next/dist/bin/next',
    'dev',
    '--webpack',
    '--hostname',
    '127.0.0.1',
    '--port',
    String(port),
  ], {
    cwd: root,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  const baseUrl = `http://127.0.0.1:${port}`;
  let output = '';
  server.stdout.on('data', (chunk) => {
    output += String(chunk);
  });
  server.stderr.on('data', (chunk) => {
    output += String(chunk);
  });

  for (let attempt = 0; attempt < 160; attempt += 1) {
    if (server.exitCode !== null) {
      throw new Error(`Next dev server exited early:\n${output}`);
    }
    try {
      const response = await fetch(`${baseUrl}/pt`);
      if (response.ok) return { server, baseUrl };
    } catch {
      // Server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  server.kill();
  throw new Error(`Next dev server did not start:\n${output}`);
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
        inspectTarget('.site-header .brand', 'brand'),
        inspectTarget('.site-header .btn', 'desktop download CTA'),
        inspectTarget('.menu-button', 'menu button'),
      ].filter(Boolean);
      const floaties = Array.from(document.querySelectorAll('.float'))
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
    expression: "document.querySelector('#controle')?.scrollIntoView()",
  });
  await new Promise((resolve) => setTimeout(resolve, 350));

  const { result } = await client.send('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const visualWidth = Math.min(
        window.innerWidth,
        window.visualViewport ? window.visualViewport.width : window.innerWidth,
      );
      const sticky = document.querySelector('.mobile-download');
      const button = document.querySelector('.mobile-download .btn');
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

async function inspectMobileDownloadBehavior(pathname, viewport) {
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
  await new Promise((resolve) => setTimeout(resolve, 350));

  const readState = async (scrollExpression) => {
    await client.send('Runtime.evaluate', { expression: scrollExpression });
    await new Promise((resolve) => setTimeout(resolve, 450));
    const { result } = await client.send('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        const sticky = document.querySelector('.mobile-download');
        if (!sticky) return null;
        const rect = sticky.getBoundingClientRect();
        const style = getComputedStyle(sticky);
        return {
          opacity: style.opacity,
          pointerEvents: style.pointerEvents,
          visible: style.display !== 'none' && style.opacity !== '0' && rect.bottom > 0,
          top: Math.round(rect.top),
          bottom: Math.round(rect.bottom),
          viewportHeight: window.innerHeight,
        };
      })()`,
    });
    return result.value;
  };

  const states = {
    top: await readState('window.scrollTo(0, 0)'),
    demo: await readState("document.querySelector('#demo')?.scrollIntoView()"),
    control: await readState("document.querySelector('#controle')?.scrollIntoView()"),
    app: await readState("document.querySelector('#app')?.scrollIntoView()"),
  };

  await fetch(`http://127.0.0.1:${chromePort}/json/close/${target.id}`).catch(() => {});
  client.close();
  return states;
}

async function inspectMobileHeroCompression(pathname, viewport) {
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
  await new Promise((resolve) => setTimeout(resolve, 350));

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
      const inspectTarget = (el, label) => {
        const rect = el.getBoundingClientRect();
        return {
          label,
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          clipped: rect.left < 0 || rect.right > viewportWidth,
          textClipped: el.scrollWidth > el.clientWidth + 1,
        };
      };
      const chipTargets = Array.from(document.querySelectorAll('.micro span, .actions a, .proof-item, .mobile-download > *'))
        .filter(isVisible)
        .map((el, index) => inspectTarget(el, 'responsive item ' + index));

      return {
        viewportWidth,
        scrollOverflow: Math.max(0, doc.scrollWidth - layoutViewportWidth),
        compressedTargets: chipTargets.filter((target) => target.clipped || target.textClipped),
      };
    })()`,
  });

  await fetch(`http://127.0.0.1:${chromePort}/json/close/${target.id}`).catch(() => {});
  client.close();
  return result.value;
}

async function inspectDemoExperience(pathname, viewport) {
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
  await client.send('Page.navigate', { url: `${webBaseUrl}${pathname}#demo` });
  await loaded;
  await client.send('Runtime.evaluate', {
    expression: "document.querySelector('#demo')?.scrollIntoView()",
  });
  await new Promise((resolve) => setTimeout(resolve, 350));

  const { result } = await client.send('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const viewportWidth = Math.min(
        window.innerWidth,
        window.visualViewport ? window.visualViewport.width : window.innerWidth,
      );
      const rectFor = (selector) => {
        const el = document.querySelector(selector);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return {
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          clipped: rect.left < 0 || rect.right > viewportWidth,
        };
      };
      const visible = (el) => {
        const style = getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
      };
      const textProblems = Array.from(document.querySelectorAll('.save-step b, .save-step small, .auto-save-status b, .auto-save-status small'))
        .filter(visible)
        .map((el) => {
          const rect = el.getBoundingClientRect();
          return {
            text: el.textContent.trim().replace(/\\s+/g, ' '),
            width: Math.round(rect.width),
            scrollWidth: el.scrollWidth,
            clientWidth: el.clientWidth,
            clipped: el.scrollWidth > el.clientWidth + 1,
            oneWordColumn: rect.width < 64 && el.textContent.trim().includes(' '),
          };
        })
        .filter((item) => item.clipped || item.oneWordColumn);

      return {
        viewportWidth,
        video: rectFor('.video-card'),
        panel: rectFor('.demo-panel'),
        flow: rectFor('.save-flow'),
        autoSave: rectFor('.auto-save-status'),
        stepCount: document.querySelectorAll('.save-step').length,
        textProblems,
      };
    })()`,
  });

  await fetch(`http://127.0.0.1:${chromePort}/json/close/${target.id}`).catch(() => {});
  client.close();
  return result.value;
}

async function inspectAppScreens(pathname, viewport) {
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
  await client.send('Page.navigate', { url: `${webBaseUrl}${pathname}#app` });
  await loaded;
  await client.send('Runtime.evaluate', {
    expression: "document.querySelector('#app')?.scrollIntoView()",
  });
  await new Promise((resolve) => setTimeout(resolve, 350));

  const { result } = await client.send('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const viewportWidth = Math.min(
        window.innerWidth,
        window.visualViewport ? window.visualViewport.width : window.innerWidth,
      );
      const screens = document.querySelector('.screens');
      const mobileDownload = document.querySelector('.mobile-download');
      const cards = Array.from(document.querySelectorAll('.screen-card'));
      const rectFor = (el) => {
        const rect = el.getBoundingClientRect();
        return {
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          clipped: rect.left < 0 || rect.right > viewportWidth,
        };
      };
      const textProblems = cards.flatMap((card, index) => {
        return Array.from(card.querySelectorAll('h3, p'))
          .map((el) => {
            const rect = el.getBoundingClientRect();
            return {
              index,
              text: el.textContent.trim().replace(/\\s+/g, ' '),
              width: Math.round(rect.width),
              scrollWidth: el.scrollWidth,
              clientWidth: el.clientWidth,
              clipped: el.scrollWidth > el.clientWidth + 1,
              oneWordColumn: rect.width < 82 && el.textContent.trim().includes(' '),
            };
          })
          .filter((item) => item.clipped || item.oneWordColumn);
      });

      return {
        viewportWidth,
        count: cards.length,
        appScreensActive: document.body.classList.contains('immersive-section-active'),
        mobileDownloadHidden: !mobileDownload || getComputedStyle(mobileDownload).display === 'none' || getComputedStyle(mobileDownload).opacity === '0',
        screensScrollOverflow: screens ? Math.max(0, screens.scrollWidth - screens.clientWidth) : null,
        cardRects: cards.map(rectFor),
        clippedCards: cards.map(rectFor).filter((item) => item.clipped),
        maxCardHeight: cards.reduce((max, card) => Math.max(max, Math.round(card.getBoundingClientRect().height)), 0),
        largeMoments: cards
          .filter((card) => card.classList.contains('featured') || card.classList.contains('result'))
          .map(rectFor),
        textProblems,
      };
    })()`,
  });

  await fetch(`http://127.0.0.1:${chromePort}/json/close/${target.id}`).catch(() => {});
  client.close();
  return result.value;
}

async function inspectLegalPage(pathname, viewport) {
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
  await new Promise((resolve) => setTimeout(resolve, 350));

  const { result } = await client.send('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const doc = document.documentElement;
      const h1 = document.querySelector('.legal-hero h1');
      const hero = document.querySelector('.legal-hero');
      const shell = document.querySelector('.legal-shell');
      const h1Rect = h1.getBoundingClientRect();
      const heroRect = hero.getBoundingClientRect();
      const shellRect = shell.getBoundingClientRect();
      const h1Style = getComputedStyle(h1);
      return {
        scrollOverflow: Math.max(0, doc.scrollWidth - window.innerWidth),
        h1Height: Math.round(h1Rect.height),
        h1FontSize: parseFloat(h1Style.fontSize),
        heroHeight: Math.round(heroRect.height),
        shellTop: Math.round(shellRect.top),
      };
    })()`,
  });

  await fetch(`http://127.0.0.1:${chromePort}/json/close/${target.id}`).catch(() => {});
  client.close();
  return result.value;
}

describe('responsive refreshed landing', () => {
  before(async () => {
    assert.ok(existsSync(chromePath), `Chrome not found at ${chromePath}`);
    const startedServer = await startNextServer();
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
    webServer?.kill();
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

      assert.equal(result.stickyDisplay, 'grid');
      assert.equal(result.buttonClipped, false);
      assert.equal(result.buttonTooSmall, false);
    });
  }

  for (const pathname of ['/pt', '/en']) {
    it(`${pathname} keeps the mobile download CTA contextual instead of covering hero, demo, or app screens`, async () => {
      const result = await inspectMobileDownloadBehavior(pathname, {
        width: 360,
        height: 780,
        deviceScaleFactor: 3,
        mobile: true,
      });

      assert.equal(result.top.visible, false);
      assert.equal(result.demo.visible, false);
      assert.equal(result.control.visible, true);
      assert.equal(result.app.visible, false);
      assert.ok(result.control.bottom <= result.control.viewportHeight, `sticky CTA bottom is clipped: ${result.control.bottom}`);
    });
  }

  for (const pathname of ['/pt', '/en']) {
    it(`${pathname} keeps hero chips and the buffer strip readable on Galaxy S25-sized mobile`, async () => {
      const result = await inspectMobileHeroCompression(pathname, {
        width: 360,
        height: 780,
        deviceScaleFactor: 3,
        mobile: true,
      });

      assert.equal(result.scrollOverflow, 0);
      assert.deepEqual(result.compressedTargets, []);
    });
  }

  for (const pathname of ['/pt', '/en']) {
    it(`${pathname} keeps the replay demo compact and legible on mobile`, async () => {
      const result = await inspectDemoExperience(pathname, { width: 360, height: 780, mobile: true });

      assert.equal(result.stepCount, 3);
      assert.equal(result.video.clipped, false);
      assert.equal(result.panel.clipped, false);
      assert.equal(result.flow.clipped, false);
      assert.equal(result.autoSave.clipped, false);
      assert.ok(result.flow.height <= 190, `save flow is too tall: ${result.flow.height}`);
      assert.ok(result.panel.height <= 390, `demo panel is too tall: ${result.panel.height}`);
      assert.deepEqual(result.textProblems, []);
    });
  }

  for (const pathname of ['/pt', '/en']) {
    it(`${pathname} keeps the replay demo balanced on desktop`, async () => {
      const result = await inspectDemoExperience(pathname, { width: 1280, height: 820, mobile: false });

      assert.equal(result.stepCount, 3);
      assert.equal(result.video.clipped, false);
      assert.equal(result.panel.clipped, false);
      assert.ok(result.video.height >= 300, `video is too small: ${result.video.height}`);
      assert.ok(result.flow.height <= 190, `save flow is too tall: ${result.flow.height}`);
      assert.ok(result.panel.height <= 440, `demo panel is too tall: ${result.panel.height}`);
      assert.deepEqual(result.textProblems, []);
    });
  }

  for (const pathname of ['/pt', '/en']) {
    it(`${pathname} presents app screens as a compact vertical product story on mobile`, async () => {
      const result = await inspectAppScreens(pathname, {
        width: 360,
        height: 780,
        deviceScaleFactor: 3,
        mobile: true,
      });

      assert.ok(result.count >= 5, `expected at least 5 product screens, got ${result.count}`);
      assert.equal(result.screensScrollOverflow, 0);
      assert.equal(result.appScreensActive, true);
      assert.equal(result.mobileDownloadHidden, true);
      assert.deepEqual(result.clippedCards, []);
      assert.equal(result.largeMoments.length, 2);
      assert.ok(result.largeMoments.every((item) => item.height >= 270), `large mobile product moments are too small: ${JSON.stringify(result.largeMoments)}`);
      assert.ok(result.maxCardHeight <= 430, `mobile screen cards are too tall: ${result.maxCardHeight}`);
      assert.deepEqual(result.textProblems, []);
    });
  }

  for (const pathname of ['/pt', '/en']) {
    it(`${pathname} presents app screens without a horizontal carousel on desktop`, async () => {
      const result = await inspectAppScreens(pathname, { width: 1280, height: 820, mobile: false });

      assert.ok(result.count >= 5, `expected at least 5 product screens, got ${result.count}`);
      assert.equal(result.screensScrollOverflow, 0);
      assert.deepEqual(result.clippedCards, []);
      assert.equal(result.largeMoments.length, 2);
      assert.ok(result.maxCardHeight <= 620, `desktop screen cards are too tall: ${result.maxCardHeight}`);
      assert.deepEqual(result.textProblems, []);
    });
  }

  for (const pathname of ['/pt', '/en']) {
    it(`${pathname} keeps app screens balanced on tablet widths`, async () => {
      const result = await inspectAppScreens(pathname, {
        width: 768,
        height: 900,
        deviceScaleFactor: 2,
        mobile: true,
      });

      assert.ok(result.count >= 5, `expected at least 5 product screens, got ${result.count}`);
      assert.equal(result.screensScrollOverflow, 0);
      assert.deepEqual(result.clippedCards, []);
      assert.ok(result.maxCardHeight <= 560, `tablet screen cards are too tall: ${result.maxCardHeight}`);
      assert.deepEqual(result.textProblems, []);
    });
  }

  for (const pathname of ['/pt/privacy', '/pt/terms', '/pt/delete-account', '/en/privacy', '/en/terms', '/en/delete-account']) {
    it(`${pathname} keeps legal pages calm and readable on mobile`, async () => {
      const result = await inspectLegalPage(pathname, {
        width: 360,
        height: 780,
        deviceScaleFactor: 3,
        mobile: true,
      });

      assert.equal(result.scrollOverflow, 0);
      assert.ok(result.h1FontSize <= 40, `legal h1 is too loud: ${result.h1FontSize}px`);
      assert.ok(result.h1Height <= 132, `legal h1 is too tall: ${result.h1Height}`);
      assert.ok(result.heroHeight <= 300, `legal hero is too tall: ${result.heroHeight}`);
      assert.ok(result.shellTop < 340, `legal content starts too low: ${result.shellTop}`);
    });
  }
});
