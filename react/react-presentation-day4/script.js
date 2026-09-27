/**
 * ==============================================================================
 * React Day 4 — Tailwind CSS, Virtual DOM, Diffing & Reconciliation
 * Interactive Presentation Engine & Simulation Studio
 * ==============================================================================
 */

// ==============================================================================
// 1. Master Presentation Deck Controller
// ==============================================================================
const Deck = {
  currentSlide: 1,
  totalSlides: 36,
  slides: [],
  topicMap: {
    1: "Course Introduction",
    2: "Learning Objectives",
    3: "What is Tailwind CSS?",
    4: "Utility-First Philosophy",
    5: "Traditional CSS vs Tailwind",
    6: "Modern Vite Setup (Tailwind v4)",
    7: "class vs className in JSX",
    8: "Common Tailwind Utilities",
    9: "Colors & Shade Spectrum",
    10: "Spacing (p, m, px, py)",
    11: "Flexbox Layout with Tailwind",
    12: "Responsive Breakpoints",
    13: "Student Card Component Example",
    14: "Tailwind Mini Challenge",
    15: "What is the DOM?",
    16: "Real DOM & Direct Manipulation",
    17: "Why DOM Updates Matter",
    18: "What is the Virtual DOM?",
    19: "Real DOM vs Virtual DOM",
    20: "Virtual DOM JS Object Tree",
    21: "Why Virtual DOM?",
    22: "What is Diffing?",
    23: "Tree Diffing Example",
    24: "Diffing: Element Type Changes",
    25: "Diffing: Props Changes",
    26: "Lists & The 'key' Prop",
    27: "Why Index as Key is Bad",
    28: "What is Reconciliation?",
    29: "Diffing vs Reconciliation",
    30: "Complete React Update Flow",
    31: "Step-by-Step Update Walkthrough",
    32: "Interactive Diffing Demo",
    33: "Connecting Tailwind + React + VDOM",
    34: "Common Misconceptions Debunked",
    35: "Practical Classroom Assignment",
    36: "Final Cheat Sheet & Summary"
  },

  init() {
    this.slides = Array.from(document.querySelectorAll('.slide'));
    this.totalSlides = this.slides.length || 36;
    
    // Set total slides in DOM
    const totalEl = document.getElementById('totalSlidesNum');
    if (totalEl) totalEl.textContent = this.totalSlides;

    // Build drawer list
    this.buildTocDrawer();

    // Check URL hash for starting slide (e.g. #14)
    const hash = window.location.hash.replace('#', '');
    const initialSlide = parseInt(hash, 10);
    if (!isNaN(initialSlide) && initialSlide >= 1 && initialSlide <= this.totalSlides) {
      this.goToSlide(initialSlide);
    } else {
      this.goToSlide(1);
    }

    // Attach global events
    this.attachEvents();
  },

  goToSlide(slideNumber) {
    if (slideNumber < 1) slideNumber = 1;
    if (slideNumber > this.totalSlides) slideNumber = this.totalSlides;

    this.currentSlide = slideNumber;

    // Update active class on slides
    this.slides.forEach((slide) => {
      const num = parseInt(slide.dataset.slide, 10);
      if (num === this.currentSlide) {
        slide.classList.add('active');
        slide.scrollTop = 0;
      } else {
        slide.classList.remove('active');
      }
    });

    // Update Slide Counter
    const currentNumEl = document.getElementById('currentSlideNum');
    if (currentNumEl) currentNumEl.textContent = this.currentSlide;

    // Update Progress Bar
    const progressEl = document.getElementById('progressBar');
    if (progressEl) {
      const percentage = ((this.currentSlide - 1) / (this.totalSlides - 1)) * 100;
      progressEl.style.width = `${percentage}%`;
    }

    // Update Top Header Topic
    const topicEl = document.getElementById('headerTopic');
    if (topicEl && this.topicMap[this.currentSlide]) {
      topicEl.textContent = this.topicMap[this.currentSlide];
    }

    // Update Previous / Next Buttons state
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    if (prevBtn) prevBtn.disabled = (this.currentSlide === 1);
    if (nextBtn) nextBtn.disabled = (this.currentSlide === this.totalSlides);

    // Update TOC Drawer active item
    const tocItems = document.querySelectorAll('.drawer-item');
    tocItems.forEach((item, index) => {
      if (index + 1 === this.currentSlide) {
        item.classList.add('active');
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.classList.remove('active');
      }
    });

    // Update URL hash without polluting history
    history.replaceState(null, '', `#${this.currentSlide}`);
  },

  nextSlide() {
    if (this.currentSlide < this.totalSlides) {
      this.goToSlide(this.currentSlide + 1);
    }
  },

  prevSlide() {
    if (this.currentSlide > 1) {
      this.goToSlide(this.currentSlide - 1);
    }
  },

  firstSlide() {
    this.goToSlide(1);
  },

  lastSlide() {
    this.goToSlide(this.totalSlides);
  },

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  },

  // Modal helpers
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
    }
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
    }
  },

  closeAllModals() {
    document.querySelectorAll('.modal-backdrop').forEach((m) => {
      m.classList.remove('active');
    });
    this.closeDrawer();
  },

  // Drawer (Table of Contents)
  openDrawer() {
    const drawer = document.getElementById('tocDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    if (drawer) drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('active');
  },

  closeDrawer() {
    const drawer = document.getElementById('tocDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
  },

  toggleDrawer() {
    const drawer = document.getElementById('tocDrawer');
    if (drawer && drawer.classList.contains('open')) {
      this.closeDrawer();
    } else {
      this.openDrawer();
    }
  },

  buildTocDrawer() {
    const list = document.getElementById('drawerList');
    if (!list) return;
    list.innerHTML = '';

    for (let i = 1; i <= this.totalSlides; i++) {
      const li = document.createElement('li');
      li.className = 'drawer-item' + (i === this.currentSlide ? ' active' : '');
      li.innerHTML = `
        <span class="slide-num-badge">${String(i).padStart(2, '0')}</span>
        <span>${this.topicMap[i] || `Slide ${i}`}</span>
      `;
      li.addEventListener('click', () => {
        this.goToSlide(i);
        this.closeDrawer();
      });
      list.appendChild(li);
    }
  },

  // Code copy utility with feedback
  copyCode(btnElement) {
    const codeBox = btnElement.closest('.code-box');
    if (!codeBox) return;

    const pre = codeBox.querySelector('pre.code-content');
    if (!pre) return;

    const codeToCopy = pre.innerText;

    navigator.clipboard.writeText(codeToCopy).then(() => {
      const originalText = btnElement.innerText;
      btnElement.innerText = 'Copied!';
      btnElement.classList.add('copied');

      Deck.showToast('Code copied to clipboard!');

      setTimeout(() => {
        btnElement.innerText = originalText;
        btnElement.classList.remove('copied');
      }, 2000);
    }).catch(() => {
      Deck.showToast('Unable to copy code.');
    });
  },

  // Toast notification
  showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.2s';
      setTimeout(() => toast.remove(), 250);
    }, 2200);
  },

  // Interactive React Update Flow Widget (Slide 30)
  setUpdateStage(stageNum, stageEl) {
    const row = document.getElementById('updateStagesRow');
    if (!row) return;

    const stages = row.querySelectorAll('.update-stage');
    stages.forEach(s => s.classList.remove('active-stage'));
    if (stageEl) stageEl.classList.add('active-stage');

    const descText = document.getElementById('updateStageDetailsText');
    if (!descText) return;

    const stageExplanations = {
      1: "<strong>Stage 1 — User Action:</strong> A user clicks a button, types in an input, or receives data from a server, invoking an event handler.",
      2: "<strong>Stage 2 — State / Props Change:</strong> The component calls <code>setState(...)</code> or receives updated props from its parent.",
      3: "<strong>Stage 3 — Component Re-renders:</strong> React executes the component function again and constructs a fresh Virtual DOM tree in memory.",
      4: "<strong>Stage 4 — Diffing Algorithm:</strong> React compares the new Virtual DOM tree against the previous Virtual DOM tree to isolate exact differences.",
      5: "<strong>Stage 5 — Reconciliation:</strong> React computes the minimal required DOM mutations and commits only the changed nodes to the real browser DOM.",
      6: "<strong>Stage 6 — Browser Paint:</strong> The browser redraws only the modified pixels on screen, providing an instantaneous, flicker-free user experience!"
    };

    descText.innerHTML = stageExplanations[stageNum] || stageExplanations[1];
  },

  // Attach DOM Event Listeners
  attachEvents() {
    // Header Buttons
    const openTwModalBtn = document.getElementById('openTwModalBtn');
    if (openTwModalBtn) openTwModalBtn.addEventListener('click', () => this.openModal('twModal'));

    const openDiffModalBtn = document.getElementById('openDiffModalBtn');
    if (openDiffModalBtn) openDiffModalBtn.addEventListener('click', () => this.openModal('diffModal'));

    const openTocBtn = document.getElementById('openTocBtn');
    if (openTocBtn) openTocBtn.addEventListener('click', () => this.toggleDrawer());

    const openShortcutsBtn = document.getElementById('openShortcutsBtn');
    if (openShortcutsBtn) openShortcutsBtn.addEventListener('click', () => this.openModal('shortcutsModal'));

    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (fullscreenBtn) fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());

    // Backdrop click closures
    document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          backdrop.classList.remove('active');
        }
      });
    });

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      switch (e.key) {
        case 'ArrowRight':
        case ' ': // Spacebar
        case 'PageDown':
          e.preventDefault();
          Deck.nextSlide();
          break;

        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          Deck.prevSlide();
          break;

        case 'Home':
          e.preventDefault();
          Deck.firstSlide();
          break;

        case 'End':
          e.preventDefault();
          Deck.lastSlide();
          break;

        case 'f':
        case 'F':
          e.preventDefault();
          Deck.toggleFullscreen();
          break;

        case 'w':
        case 'W':
          e.preventDefault();
          const twModal = document.getElementById('twModal');
          if (twModal && twModal.classList.contains('active')) {
            Deck.closeModal('twModal');
          } else {
            Deck.openModal('twModal');
          }
          break;

        case 'd':
        case 'D':
          e.preventDefault();
          const diffModal = document.getElementById('diffModal');
          if (diffModal && diffModal.classList.contains('active')) {
            Deck.closeModal('diffModal');
          } else {
            Deck.openModal('diffModal');
          }
          break;

        case 't':
        case 'T':
        case 'm':
        case 'M':
          e.preventDefault();
          Deck.toggleDrawer();
          break;

        case '?':
          e.preventDefault();
          Deck.openModal('shortcutsModal');
          break;

        case 'Escape':
          Deck.closeAllModals();
          break;

        default:
          break;
      }
    });
  }
};

// ==============================================================================
// 2. Interactive Tailwind Utility Sandbox Engine
// ==============================================================================
const TwSandbox = {
  state: {
    pad: 'p-4',
    round: 'rounded-lg',
    shadow: 'shadow-lg',
    bg: 'bg-blue-500'
  },

  cssMap: {
    // Padding
    'p-2': '8px',
    'p-4': '16px',
    'p-8': '32px',
    // Rounded
    'rounded-none': '0px',
    'rounded-lg': '8px',
    'rounded-full': '9999px',
    // Shadow
    'shadow-none': 'none',
    'shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.4)',
    'shadow-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.65)',
    // Background
    'bg-blue-500': '#3b82f6',
    'bg-emerald-500': '#10b981',
    'bg-purple-600': '#9333ea'
  },

  setOption(prop, value, btnEl) {
    this.state[prop] = value;

    // Update active button state in group
    const parentGroup = btnEl.closest('.tw-btn-group');
    if (parentGroup) {
      parentGroup.querySelectorAll('.tw-option-btn').forEach(b => b.classList.remove('active'));
      btnEl.classList.add('active');
    }

    this.render();
  },

  render() {
    const liveEl = document.getElementById('twLiveElement');
    const codeEl = document.getElementById('twCodeOutput');
    if (!liveEl) return;

    // Apply styles to preview element
    liveEl.style.padding = this.cssMap[this.state.pad];
    liveEl.style.borderRadius = this.cssMap[this.state.round];
    liveEl.style.boxShadow = this.cssMap[this.state.shadow];
    liveEl.style.backgroundColor = this.cssMap[this.state.bg];

    // Update code output
    if (codeEl) {
      codeEl.textContent = `<div className="${this.state.bg} ${this.state.pad} ${this.state.round} ${this.state.shadow}">`;
    }
  }
};

// ==============================================================================
// 3. Interactive Diffing & Reconciliation Simulator Engine
// ==============================================================================
const DiffSim = {
  isChanged: false,

  toggleChange() {
    this.isChanged = !this.isChanged;
    this.render();
  },

  reset() {
    this.isChanged = false;
    this.render();
  },

  render() {
    const newTitle = this.isChanged ? 'Title: "Hello React"' : 'Title: "Hello"';
    const statusText = this.isChanged 
      ? 'Diff Calculated & Reconciled (1 Node Modified)' 
      : 'Initial Render';

    // Slide 32 elements
    const slideStatus = document.getElementById('slideSimStatus');
    const slideTitleText = document.getElementById('nextTitleText');
    const slideTitleBadge = document.getElementById('nextTitleBadge');
    const slideTitleNode = document.getElementById('nextTitleNode');
    const slideToggleBtn = document.getElementById('slideSimToggleBtn');
    const slideLogBox = document.getElementById('slideSimLogBox');
    const slideLogText = document.getElementById('slideSimLogText');

    // Modal elements
    const modalStatus = document.getElementById('modalSimStatus');
    const modalTitleText = document.getElementById('modalNextTitleText');
    const modalTitleBadge = document.getElementById('modalNextTitleBadge');
    const modalTitleNode = document.getElementById('modalNextTitleNode');
    const modalToggleBtn = document.getElementById('modalSimToggleBtn');
    const modalLogText = document.getElementById('modalSimLogText');

    if (slideStatus) slideStatus.textContent = statusText;
    if (modalStatus) modalStatus.textContent = statusText;

    if (slideTitleText) slideTitleText.textContent = newTitle;
    if (modalTitleText) modalTitleText.textContent = newTitle;

    if (this.isChanged) {
      // Changed state
      if (slideTitleNode) {
        slideTitleNode.className = 'tree-node node-changed';
      }
      if (modalTitleNode) {
        modalTitleNode.className = 'tree-node node-changed';
      }

      if (slideTitleBadge) {
        slideTitleBadge.textContent = '[CHANGED]';
        slideTitleBadge.style.color = 'var(--accent-amber)';
        slideTitleBadge.style.fontWeight = 'bold';
      }
      if (modalTitleBadge) {
        modalTitleBadge.textContent = '[CHANGED]';
        modalTitleBadge.style.color = 'var(--accent-amber)';
        modalTitleBadge.style.fontWeight = 'bold';
      }

      const diffMsg = `<strong>Diff Detected:</strong> Only <code>h1</code> text changed from <em>"Hello"</em> to <em>"Hello React"</em>.<br>` +
                      `<span style="color: var(--accent-emerald);">✔ <strong>Reconciliation:</strong> React updates a single text node in the Real DOM without touching the Card or Message!</span>`;

      if (slideLogText) slideLogText.innerHTML = diffMsg;
      if (modalLogText) modalLogText.innerHTML = diffMsg;

      if (slideToggleBtn) slideToggleBtn.innerHTML = '<span>⏪</span> Revert Title ("Hello React" &rarr; "Hello")';
      if (modalToggleBtn) modalToggleBtn.innerHTML = '<span>⏪</span> Revert Title ("Hello React" &rarr; "Hello")';

      Deck.showToast('Diffing: React detected title change & updated 1 Real DOM node!');
    } else {
      // Initial / Unchanged state
      if (slideTitleNode) {
        slideTitleNode.className = 'tree-node node-same';
      }
      if (modalTitleNode) {
        modalTitleNode.className = 'tree-node node-same';
      }

      if (slideTitleBadge) {
        slideTitleBadge.textContent = 'Text';
        slideTitleBadge.style.color = 'var(--text-dim)';
        slideTitleBadge.style.fontWeight = 'normal';
      }
      if (modalTitleBadge) {
        modalTitleBadge.textContent = 'Text';
        modalTitleBadge.style.color = 'var(--text-dim)';
        modalTitleBadge.style.fontWeight = 'normal';
      }

      const defaultMsg = `Click <strong>"Change Title"</strong> above to trigger a simulated state change and watch React diff the trees!`;
      if (slideLogText) slideLogText.innerHTML = defaultMsg;
      if (modalLogText) modalLogText.innerHTML = defaultMsg;

      if (slideToggleBtn) slideToggleBtn.innerHTML = '<span>⚡</span> Change Title ("Hello" &rarr; "Hello React")';
      if (modalToggleBtn) modalToggleBtn.innerHTML = '<span>⚡</span> Change Title ("Hello" &rarr; "Hello React")';
    }
  }
};

// ==============================================================================
// 4. Initialize Engines on Window Load
// ==============================================================================
window.addEventListener('DOMContentLoaded', () => {
  Deck.init();
  TwSandbox.render();
  DiffSim.render();
});
