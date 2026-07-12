/* KplaWY — site.js · shared behavior (PT + EN). Reads localized strings from window.PAGE. */
(function () {
  'use strict';
  var P = window.PAGE || {};
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* header scroll */
  var hdr = $('#hdr');
  var sticky = $('#sticky');
  function onScroll() {
    var y = window.scrollY;
    if (hdr) hdr.classList.toggle('scrolled', y > 24);
    if (sticky) sticky.classList.toggle('on', window.innerWidth < 760 && y > 700 && !$('#mnav').classList.contains('open'));
    checkReveals();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  /* mobile menu */
  var mnav = $('#mnav');
  $$('.js-menu').forEach(function (b) {
    b.addEventListener('click', function () { mnav.classList.toggle('open'); });
  });
  $$('#mnav a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function () { mnav.classList.remove('open'); });
  });

  /* scroll reveals */
  var rvEls = [];
  function reveal(el) {
    el.classList.add('in');
    rvEls = rvEls.filter(function (x) { return x !== el; });
    if (ro) ro.unobserve(el);
  }
  function checkReveals() {
    var vh = window.innerHeight;
    rvEls.slice().forEach(function (el) {
      if (el.getBoundingClientRect().top < vh + 80) reveal(el);
    });
  }
  var ro = ('IntersectionObserver' in window) ? new IntersectionObserver(function (ents) {
    ents.forEach(function (e) { if (e.isIntersecting) reveal(e.target); });
  }, { threshold: 0, rootMargin: '0px 0px 15% 0px' }) : null;
  $$('[data-rv]').forEach(function (el) {
    if (el.getBoundingClientRect().top <= window.innerHeight) { el.classList.add('in'); return; }
    rvEls.push(el);
    if (ro) ro.observe(el);
  });

  /* lazy play/pause videos */
  if ('IntersectionObserver' in window) {
    var vo = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) { if (v.play) v.play().catch(function () {}); }
        else if (v.pause) v.pause();
      });
    }, { threshold: 0.25 });
    $$('video[data-autovid]').forEach(function (v) { vo.observe(v); });
  }

  /* ---------- HERO replay simulation ---------- */
  var heroVid = $('#hero-vid'), heroScrub = $('#hero-scrub'), heroToast = $('#hero-toast'),
      heroClipPop = $('#hero-clip'), heroClipName = $('#hero-clip-name'),
      heroTc = $('#hero-tc'), heroClipsChip = $('#hero-clips');
  var heroBusy = false, heroClips = 0, tc = 0;
  setInterval(function () {
    if (document.hidden || !heroTc) return;
    tc++;
    var m = String(Math.floor(tc / 60)).padStart(2, '0'), s = String(tc % 60).padStart(2, '0');
    heroTc.textContent = 'REC ' + m + ':' + s;
  }, 1000);
  function pad(x) { return String(x).padStart(2, '0'); }
  function heroReplay() {
    if (heroBusy || !heroVid) return;
    heroBusy = true;
    heroScrub.classList.add('on');
    heroToast.classList.remove('on');
    setTimeout(function () {
      try { if (heroVid.duration) heroVid.currentTime = Math.max(0, heroVid.currentTime - 10); } catch (e) {}
      heroScrub.classList.remove('on');
      heroToast.classList.add('on');
      heroClips++;
      if (heroClipsChip) heroClipsChip.textContent = (P.clipsLabel || 'CLIPES') + ' ' + pad(Math.min(heroClips, 99));
      if (heroClipPop) {
        var d = new Date();
        heroClipName.textContent = 'KplaWY_' + d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + '_' + pad(d.getHours()) + '-' + pad(d.getMinutes()) + '.mp4';
        heroClipPop.classList.add('on');
      }
      setTimeout(function () { heroToast.classList.remove('on'); heroBusy = false; }, 2400);
    }, 720);
  }
  var heroBtn = $('#hero-replay');
  if (heroBtn) heroBtn.addEventListener('click', heroReplay);
  function heroVisible() {
    if (!heroVid) return false;
    var r = heroVid.getBoundingClientRect();
    return r.bottom > 0 && r.top < window.innerHeight;
  }
  setTimeout(function () { if (!document.hidden && heroVisible()) heroReplay(); }, 2600);
  setInterval(function () { if (!document.hidden && heroVisible()) heroReplay(); }, 9000);
  if (heroVid) setTimeout(function () { if (heroVid.paused) heroVid.play().catch(function () {}); }, 350);

  /* ---------- Interactive demo ---------- */
  var demoVid = $('#demo-vid'), demoScrubEl = $('#demo-scrub'), demoToastEl = $('#demo-toast'),
      demoBufChip = $('#demo-buf-chip'), demoScrubT = $('#demo-scrub-t'),
      demoWin = $('#demo-win'), demoWinLbl = $('#demo-win-lbl'),
      demoList = $('#demo-clips'), demoEmpty = $('#demo-empty'), demoCount = $('#demo-count'),
      demoRewindTxt = $('#demo-rewind-txt');
  var demoBuf = 10, demoBusy = false, demoClips = [];
  $$('.buf-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      demoBuf = parseInt(b.getAttribute('data-buf'), 10);
      $$('.buf-btn').forEach(function (x) { x.classList.remove('sel'); });
      b.classList.add('sel');
      if (demoBufChip) demoBufChip.textContent = 'BUF ' + demoBuf + 's';
      if (demoWinLbl) demoWinLbl.textContent = (P.windowLabel || 'JANELA') + ' ' + demoBuf + 's';
      if (demoRewindTxt) demoRewindTxt.textContent = (P.rewindTxt || '').replace('{s}', demoBuf);
    });
  });
  function renderClips() {
    if (!demoList) return;
    demoList.innerHTML = '';
    if (demoClips.length === 0) { demoEmpty.style.display = 'block'; }
    else {
      demoEmpty.style.display = 'none';
      demoClips.forEach(function (c) {
        var row = document.createElement('div');
        row.className = 'clip-row';
        row.innerHTML = '<img src="' + (P.demoPoster || '') + '" alt=""><div style="flex:1;min-width:0"><div class="nm"></div><div class="st">✓ ' + c.dur + 's ' + (P.savedTxt || 'salvos') + '</div></div><span class="sz">' + c.size + '</span>';
        row.querySelector('.nm').textContent = c.name;
        demoList.appendChild(row);
      });
    }
    if (demoCount) demoCount.textContent = demoClips.length + ' ' + (demoClips.length === 1 ? (P.clipOne || 'clipe') : (P.clipMany || 'clipes')) + ' · ' + (P.onDevice || 'no dispositivo');
  }
  function demoReplay() {
    if (demoBusy) return;
    demoBusy = true;
    if (demoVid && demoVid.paused) { try { demoVid.play().catch(function () {}); } catch (e) {} }
    demoScrubT.textContent = '-' + demoBuf + 's';
    demoScrubEl.classList.add('on');
    demoToastEl.classList.remove('on');
    if (demoWin) { demoWin.style.transition = 'left .65s cubic-bezier(.2,.8,.2,1)'; demoWin.style.left = '8%'; }
    setTimeout(function () {
      try { if (demoVid && demoVid.duration) demoVid.currentTime = Math.max(0, demoVid.currentTime - demoBuf); } catch (e) {}
      var d = new Date();
      demoClips.unshift({
        name: 'KplaWY_' + d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + '_' + pad(d.getHours()) + '-' + pad(d.getMinutes()) + '-' + pad(d.getSeconds()) + '.mp4',
        dur: demoBuf,
        size: (demoBuf * 0.24).toFixed(1) + ' MB'
      });
      demoClips = demoClips.slice(0, 3);
      renderClips();
      demoScrubEl.classList.remove('on');
      demoToastEl.classList.add('on');
      setTimeout(function () {
        demoToastEl.classList.remove('on');
        if (demoWin) { demoWin.style.transition = 'none'; demoWin.style.left = '68%'; }
        demoBusy = false;
      }, 2200);
    }, 780);
  }
  var demoBtn = $('#demo-replay');
  if (demoBtn) demoBtn.addEventListener('click', demoReplay);

  /* ---------- gallery hover + modal ---------- */
  var modal = $('#modal'), modalVid = $('#modal-vid');
  $$('.gal-card').forEach(function (card) {
    var v = card.querySelector('video');
    card.addEventListener('mouseenter', function () { if (v) v.play().catch(function () {}); });
    card.addEventListener('mouseleave', function () { if (v) v.pause(); });
    card.addEventListener('click', function () {
      if (!modal) return;
      modalVid.src = card.getAttribute('data-video');
      modal.classList.add('open');
      modalVid.play().catch(function () {});
    });
  });
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target.closest('.frame') && !e.target.classList.contains('close')) return;
      modal.classList.remove('open');
      modalVid.pause(); modalVid.removeAttribute('src'); modalVid.load();
    });
  }

  /* ---------- product tabs ---------- */
  var shotImg = $('#shot-img');
  $$('.shot-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      $$('.shot-btn').forEach(function (x) { x.classList.remove('sel'); });
      b.classList.add('sel');
      if (shotImg) {
        shotImg.style.animation = 'none'; void shotImg.offsetWidth; shotImg.style.animation = '';
        shotImg.src = b.getAttribute('data-img');
        shotImg.alt = b.getAttribute('data-alt') || '';
      }
    });
  });

  /* ---------- FAQ ---------- */
  $$('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.parentElement, was = item.classList.contains('open');
      $$('.faq-item').forEach(function (x) { x.classList.remove('open'); });
      if (!was) item.classList.add('open');
    });
  });

  onScroll();
})();
