(() => {
  document.documentElement.classList.add('js');
  const body = document.body;
  const menu = document.querySelector('[data-menu]');
  menu?.addEventListener('click', () => body.classList.toggle('menu-open'));
  document.querySelectorAll('.mobile-nav a').forEach((a) => a.addEventListener('click', () => body.classList.remove('menu-open')));

  const buttons = [...document.querySelectorAll('[data-duration]')];
  const fill = document.querySelector('[data-fill]');
  const seconds = document.querySelector('[data-seconds]');
  const toast = document.querySelector('[data-toast]');
  const toastSeconds = document.querySelector('[data-toast-seconds]');
  const replay = document.querySelector('[data-replay]');
  let selected = 10;
  const widths = { 10: '30%', 22: '46%', 30: '62%', 50: '86%' };

  buttons.forEach((button) => button.addEventListener('click', () => {
    selected = Number(button.dataset.duration || 10);
    buttons.forEach((item) => item.classList.toggle('active', item === button));
    if (fill) fill.style.width = widths[selected] || '30%';
    if (seconds) seconds.textContent = `${selected}s`;
    toast?.classList.remove('show');
  }));

  replay?.addEventListener('click', () => {
    if (toastSeconds) toastSeconds.textContent = String(selected);
    toast?.classList.remove('show');
    requestAnimationFrame(() => requestAnimationFrame(() => toast?.classList.add('show')));
  });

  const reveal = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        reveal.unobserve(entry.target);
      }
    });
  }, { threshold: .08, rootMargin: '0px 0px -35px' }) : null;
  document.querySelectorAll('.reveal').forEach((el) => reveal ? reveal.observe(el) : el.classList.add('in'));

  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting) video.play().catch(() => {}); else video.pause();
    }), { threshold: .18 });
    document.querySelectorAll('video[data-autoplay]').forEach((video) => videoObserver.observe(video));
  }
})();
