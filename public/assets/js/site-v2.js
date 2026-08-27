(() => {
  document.documentElement.classList.add('js');

  const body = document.body;
  const menu = document.querySelector('[data-menu]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  menu?.addEventListener('click', () => {
    const isOpen = body.classList.toggle('menu-open');
    menu.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.mobile-nav a').forEach((link) => {
    link.addEventListener('click', () => {
      body.classList.remove('menu-open');
      menu?.setAttribute('aria-expanded', 'false');
    });
  });

  const buttons = [...document.querySelectorAll('[data-duration]')];
  const fill = document.querySelector('[data-fill]');
  const seconds = document.querySelector('[data-seconds]');
  const toast = document.querySelector('[data-toast]');
  const toastSeconds = document.querySelector('[data-toast-seconds]');
  const replay = document.querySelector('[data-replay]');
  const flowSteps = [...document.querySelectorAll('[data-flow-step]')];
  let selected = 10;
  let savedUntil = 0;
  const widths = { 10: '30%', 22: '46%', 30: '62%', 50: '86%' };
  const flowOrder = ['play', 'tap', 'saved'];

  const setFlowState = (state) => {
    const activeIndex = Math.max(0, flowOrder.indexOf(state));
    flowSteps.forEach((step) => {
      const index = Math.max(0, flowOrder.indexOf(step.dataset.flowStep || 'play'));
      step.classList.toggle('active', index === activeIndex);
      step.classList.toggle('complete', index < activeIndex);
    });
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      selected = Number(button.dataset.duration || 10);
      buttons.forEach((item) => item.classList.toggle('active', item === button));
      if (fill) fill.style.width = widths[selected] || '30%';
      if (seconds) seconds.textContent = `${selected}s`;
      toast?.classList.remove('show');
      setFlowState('play');
    });
  });

  replay?.addEventListener('click', () => {
    if (toastSeconds) toastSeconds.textContent = String(selected);
    savedUntil = Date.now() + 1900;
    toast?.classList.remove('show');
    setFlowState('saved');
    document.querySelectorAll('.video-card').forEach((card) => {
      card.classList.add('watch-cue-visible', 'replay-saved');
      window.setTimeout(() => card.classList.remove('replay-saved'), 700);
      window.setTimeout(() => card.classList.remove('watch-cue-visible'), 1900);
    });
    requestAnimationFrame(() => requestAnimationFrame(() => toast?.classList.add('show')));
  });

  const reveal = 'IntersectionObserver' in window && !reducedMotion
    ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            reveal.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -35px' })
    : null;

  document.querySelectorAll('.reveal').forEach((el) => {
    if (reveal) reveal.observe(el);
  });

  const setVideoButton = (button, paused) => {
    if (!button) return;
    const label = paused ? button.dataset.playLabel : button.dataset.pauseLabel;
    button.textContent = label || '';
    button.setAttribute('aria-label', label || '');
    button.setAttribute('aria-pressed', String(!paused));
  };

  document.querySelectorAll('video[data-autoplay]').forEach((video) => {
    const toggle = video.parentElement?.querySelector('[data-video-toggle]');
    const card = video.closest('.video-card');
    if (reducedMotion) {
      video.pause();
      video.removeAttribute('autoplay');
      card?.classList.add('watch-cue-visible');
      setFlowState('tap');
      setVideoButton(toggle, true);
    } else {
      setVideoButton(toggle, video.paused);
    }

    video.addEventListener('timeupdate', () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0 || Date.now() < savedUntil) return;
      const nearWatchTap = video.currentTime > 1 && video.duration - video.currentTime <= 3;
      card?.classList.toggle('watch-cue-visible', nearWatchTap);
      setFlowState(nearWatchTap ? 'tap' : 'play');
    });

    toggle?.addEventListener('click', () => {
      if (video.paused) video.play().catch(() => {});
      else video.pause();
      setVideoButton(toggle, video.paused);
    });
  });

  if ('IntersectionObserver' in window && !reducedMotion) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
        setVideoButton(video.parentElement?.querySelector('[data-video-toggle]'), video.paused);
      });
    }, { threshold: 0.18 });

    document.querySelectorAll('video[data-autoplay]').forEach((video) => videoObserver.observe(video));
  }
})();
