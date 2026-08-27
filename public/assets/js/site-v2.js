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

  const toast = document.querySelector('[data-toast]');
  const toastSeconds = document.querySelector('[data-toast-seconds]');
  const flowSteps = [...document.querySelectorAll('[data-flow-step]')];
  const savedSeconds = 10;
  const flowOrder = ['play', 'tap', 'saved'];

  const setFlowState = (state) => {
    const activeIndex = Math.max(0, flowOrder.indexOf(state));
    flowSteps.forEach((step) => {
      const index = Math.max(0, flowOrder.indexOf(step.dataset.flowStep || 'play'));
      step.classList.toggle('active', index === activeIndex);
      step.classList.toggle('complete', index < activeIndex);
    });
  };

  const showAutoSaved = (card) => {
    if (toastSeconds) toastSeconds.textContent = String(savedSeconds);
    setFlowState('saved');
    card?.classList.add('replay-saved');
    card?.classList.remove('watch-cue-visible');
    toast?.classList.add('show');
  };

  const resetAutoSaved = (card) => {
    card?.classList.remove('replay-saved');
    toast?.classList.remove('show');
  };

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
      showAutoSaved(card);
      setVideoButton(toggle, true);
    } else {
      setVideoButton(toggle, video.paused);
    }

    video.addEventListener('timeupdate', () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      const remaining = video.duration - video.currentTime;
      const savedWindow = video.currentTime > 1 && remaining <= 1.35;
      const nearWatchTap = video.currentTime > 1 && remaining <= 3 && !savedWindow;

      if (savedWindow) {
        showAutoSaved(card);
        return;
      }

      resetAutoSaved(card);
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
