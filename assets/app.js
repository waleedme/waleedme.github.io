// Smooth in-page scroll
(function enableSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  });
})();

// Theme toggle with persistence
(function themeToggle() {
  const root = document.documentElement;
  const toggleButton = document.getElementById('theme-toggle');
  const themeColorMeta = document.getElementById('theme-color');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (_) {}
    // Update theme-color for Android address bar
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', theme === 'dark' ? '#0b0e14' : '#f7f9fc');
    }
    if (toggleButton) {
      const isDark = theme === 'dark';
      toggleButton.setAttribute('aria-pressed', String(isDark));
      toggleButton.title = isDark ? 'Switch to light theme' : 'Switch to dark theme';
    }
  }

  function getInitialTheme() {
    const stored = (function () { try { return localStorage.getItem('theme'); } catch (_) { return null; } })();
    if (stored === 'light' || stored === 'dark') return stored;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  const initial = getInitialTheme();
  applyTheme(initial);

  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }
})();

// Scroll progress bar
(function scrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  function update() {
    const scrollTop = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? (scrollTop / max) * 100 : 0;
    bar.style.width = progress + '%';
  }
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
})();

// Back to top button
(function backToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  function toggle() {
    if (window.scrollY > 400) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  }
  btn.addEventListener('click', () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  });
  toggle();
  window.addEventListener('scroll', toggle, { passive: true });
})();

// Scrollspy for nav items
(function scrollSpy() {
  const navLinks = Array.from(document.querySelectorAll('nav a[href^="#"]'));
  const sections = navLinks
    .map((link) => document.getElementById(link.getAttribute('href').slice(1)))
    .filter(Boolean);
  if (!sections.length) return;

  const linkById = new Map();
  navLinks.forEach((link) => linkById.set(link.getAttribute('href').slice(1), link));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        const link = linkById.get(id);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
  );

  sections.forEach((section) => observer.observe(section));
})();

// Project tag filters (multi-select)
(function projectFilters() {
  const container = document.querySelector('.filters');
  const chips = Array.from(document.querySelectorAll('.filters .chip'));
  const cards = Array.from(document.querySelectorAll('.project.card'));
  const emptyState = document.querySelector('.empty-state');
  if (!container || chips.length === 0 || cards.length === 0) return;

  function getSelectedTags() {
    const selected = chips.filter((c) => c.classList.contains('selected') && c.dataset.filter !== 'all');
    return selected.map((c) => c.dataset.filter);
  }

  function updateFilter() {
    const selected = getSelectedTags();
    const showAll = selected.length === 0;
    let visibleCount = 0;
    cards.forEach((card) => {
      const tags = (card.dataset.tags || '').split(',').map((t) => t.trim());
      const matches = showAll || selected.every((t) => tags.includes(t));
      card.style.display = matches ? '' : 'none';
      if (matches) visibleCount += 1;
    });
    if (emptyState) emptyState.hidden = visibleCount !== 0;
  }

  function clearAllChips() {
    chips.forEach((c) => {
      c.classList.remove('selected');
      c.setAttribute('aria-pressed', 'false');
    });
  }

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const isAll = chip.dataset.filter === 'all';
      if (isAll) {
        clearAllChips();
        chip.classList.add('selected');
        chip.setAttribute('aria-pressed', 'true');
      } else {
        const allChip = chips.find((c) => c.dataset.filter === 'all');
        if (allChip) {
          allChip.classList.remove('selected');
          allChip.setAttribute('aria-pressed', 'false');
        }
        chip.classList.toggle('selected');
        chip.setAttribute(
          'aria-pressed',
          chip.classList.contains('selected') ? 'true' : 'false'
        );
        // If none selected, re-select All for clarity
        if (getSelectedTags().length === 0 && allChip) {
          allChip.classList.add('selected');
          allChip.setAttribute('aria-pressed', 'true');
        }
      }
      updateFilter();
    });
  });

  // Initial state
  updateFilter();
})();
