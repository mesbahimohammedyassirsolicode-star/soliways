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

  // Live Event Countdown Timer (targeting 13 April 2027, 09:00:00)
  Alpine.data('countdown', () => ({
    target: new Date('2027-04-13T09:00:00').getTime(),
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
    init() {
      this.tick();
      setInterval(() => this.tick(), 1000);
    },
    tick() {
      const now = new Date().getTime();
      const diff = Math.max(0, this.target - now);
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

  // Priority Registration Notification Modal
  Alpine.data('notificationModal', () => ({
    open: false,
    email: '',
    hasError: false,
    submitted: false,
    errorMessage: '',
    init() {
      window.addEventListener('open-notify-modal', () => {
        this.open = true;
        this.submitted = false;
        this.email = '';
        this.hasError = false;
      });
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') this.close();
      });
    },
    close() {
      this.open = false;
    },
    submit() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email || !emailPattern.test(this.email)) {
        this.hasError = true;
        this.errorMessage = 'Veuillez saisir une adresse email valide.';
        return;
      }
      this.hasError = false;
      this.submitted = true;
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
