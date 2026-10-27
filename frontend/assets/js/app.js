/**
 * SOLIWAYS 2027 — Application Interactions (Alpine.js v3)
 */

document.addEventListener('alpine:init', () => {

  // Global Navigation State
  Alpine.data('navbar', () => ({
    mobileOpen: false,
    scrolled: false,
    init() {
      this.checkScroll();
      window.addEventListener('scroll', () => this.checkScroll());
    },
    checkScroll() {
      this.scrolled = window.pageYOffset > 20;
    },
    closeMobile() {
      this.mobileOpen = false;
    }
  }));

  // Live Event Countdown Timer (targeting 13 April 2027, 00:00:00 Morocco time)
  Alpine.data('countdown', () => ({
    target: Date.parse('2027-04-13T00:00:00+01:00'),
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
    init() {
      this.tick();
      setInterval(() => this.tick(), 1000);
    },
    tick() {
      const now = Date.now();
      if (isNaN(this.target)) {
        this.days = '00';
        this.hours = '00';
        this.minutes = '00';
        this.seconds = '00';
        return;
      }
      const diff = this.target - now;
      if (diff <= 0) {
        this.days = '00';
        this.hours = '00';
        this.minutes = '00';
        this.seconds = '00';
        return;
      }
      this.days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
      this.hours = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
      this.minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
      this.seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
    }
  }));

  // Interactive 4-Day Program Tab Navigator
  Alpine.data('programTabs', () => ({
    activeDay: 1,
    setDay(day) {
      this.activeDay = day;
    }
  }));

  // Practical FAQ Accordion
  Alpine.data('faqAccordion', () => ({
    activeAccordion: 1,
    toggle(id) {
      this.activeAccordion = this.activeAccordion === id ? null : id;
    }
  }));

  // Back to Top Floating Button
  Alpine.data('scrollTop', () => ({
    visible: false,
    init() {
      window.addEventListener('scroll', () => {
        this.visible = window.pageYOffset > 400;
      });
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }));

});

document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('[data-count-up]');
  if (!counters.length || !('IntersectionObserver' in window)) return;

  const formatter = new Intl.NumberFormat(document.documentElement.lang || undefined);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      observer.unobserve(counter);

      const target = Number(counter.dataset.countUp);
      if (!Number.isFinite(target)) return;

      const prefix = counter.dataset.countPrefix || '';
      const suffix = counter.dataset.countSuffix || '';
      const render = (value) => {
        counter.textContent = `${prefix}${formatter.format(value)}${suffix}`;
      };

      if (reducedMotion) {
        render(target);
        return;
      }

      const duration = 1400;
      const start = performance.now();
      const animate = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        render(Math.floor(target * easedProgress));

        if (progress < 1) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    });
  }, { threshold: 0.3 });

  counters.forEach((counter) => observer.observe(counter));
});
