/**
 * ==============================================================================
 * React Day 10: Introduction to Redux & Setting Up Redux with React
 * Interactive Presentation Deck & Classroom Demonstration Engine
 * 100% Vanilla HTML5, CSS3, & JavaScript (No Frameworks or Build Tools)
 * ==============================================================================
 */

// ==============================================================================
// 1. Presentation Deck Controller
// ==============================================================================
const Deck = {
  currentSlide: 1,
  totalSlides: 22,
  slides: [],
  topicMap: {
    1: { section: "INTRODUCTION", topic: "React Day 10 — Title" },
    2: { section: "OBJECTIVES", topic: "Learning Objectives" },
    3: { section: "REACT STATE", topic: "What Is State in React?" },
    4: { section: "STATE MANAGEMENT", topic: "When Does State Management Become Difficult?" },
    5: { section: "PROP DRILLING", topic: "What Is Prop Drilling?" },
    6: { section: "REDUX CORE", topic: "What Is Redux?" },
    7: { section: "REDUX CORE", topic: "Why Use Redux?" },
    8: { section: "REDUX TOOLKIT", topic: "What Is Redux Toolkit (RTK)?" },
    9: { section: "ECOSYSTEM", topic: "Redux vs Redux Toolkit vs React Redux" },
    10: { section: "DATA FLOW", topic: "Understanding the Redux Data Flow" },
    11: { section: "CORE CONCEPTS", topic: "The Three Main Redux Concepts" },
    12: { section: "REDUX SLICE", topic: "What Is a Redux Slice?" },
    13: { section: "PROJECT SETUP", topic: "Setting Up a React Project" },
    14: { section: "DEPENDENCIES", topic: "Installing Redux Dependencies" },
    15: { section: "ARCHITECTURE", topic: "Recommended Project Structure" },
    16: { section: "IMPLEMENTATION", topic: "Step 1 — Create the Counter Slice" },
    17: { section: "IMPLEMENTATION", topic: "Step 2 — Configure the Redux Store" },
    18: { section: "IMPLEMENTATION", topic: "Step 3 — Connect Redux Using Provider" },
    19: { section: "IMPLEMENTATION", topic: "Step 4 — Read and Update Redux State" },
    20: { section: "IMPLEMENTATION", topic: "Step 5 — Display the Counter Component" },
    21: { section: "APPLICATION FLOW", topic: "How the Complete Application Works" },
    22: { section: "REVIEW & PRACTICE", topic: "Summary and Quick Questions" }
  },

  init() {
    this.slides = Array.from(document.querySelectorAll('.slide'));
    this.totalSlides = this.slides.length || 22;

    const totalEl = document.getElementById('totalSlidesNum');
    if (totalEl) totalEl.textContent = this.totalSlides;

    this.buildTocDrawer();

    // Support URL hash (#slide-5)
    const hash = window.location.hash.replace('#slide-', '').replace('#', '');
    const initialSlide = parseInt(hash, 10);
    if (!isNaN(initialSlide) && initialSlide >= 1 && initialSlide <= this.totalSlides) {
      this.goToSlide(initialSlide);
    } else {
      this.goToSlide(1);
    }

    this.attachEvents();
    this.initSimulators();
  },

  goToSlide(slideNumber) {
    if (slideNumber < 1) slideNumber = 1;
    if (slideNumber > this.totalSlides) slideNumber = this.totalSlides;

    this.currentSlide = slideNumber;

    // Toggle active slide class
    this.slides.forEach((slide) => {
      const num = parseInt(slide.dataset.slide, 10);
      if (num === this.currentSlide) {
        slide.classList.add('active');
        slide.scrollTop = 0;
      } else {
        slide.classList.remove('active');
      }
    });

    // Update progress bar
    const progressEl = document.getElementById('progressBar');
    if (progressEl) {
      const pct = (this.currentSlide / this.totalSlides) * 100;
      progressEl.style.width = `${pct}%`;
    }

    // Update bottom slide counters
    const currentNumEl = document.getElementById('currentSlideNum');
    if (currentNumEl) currentNumEl.textContent = this.currentSlide;

    // Update prev/next button disabled states
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    if (prevBtn) prevBtn.disabled = this.currentSlide === 1;
    if (nextBtn) nextBtn.disabled = this.currentSlide === this.totalSlides;

    // Update header badges
    const meta = this.topicMap[this.currentSlide] || { section: "REACT DAY 10", topic: `Slide ${this.currentSlide}` };
    const secTag = document.getElementById('headerSectionTag');
    const topicEl = document.getElementById('headerTopic');
    if (secTag) secTag.textContent = meta.section;
    if (topicEl) topicEl.textContent = meta.topic;

    // Update active highlight in Table of Contents drawer
    const drawer = document.getElementById('tocDrawer');
    const isDrawerOpen = drawer && drawer.classList.contains('open');

    const tocItems = document.querySelectorAll('.toc-item');
    tocItems.forEach((item) => {
      const num = parseInt(item.dataset.slideNum, 10);
      if (num === this.currentSlide) {
        item.classList.add('active');
        if (isDrawerOpen) {
          item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      } else {
        item.classList.remove('active');
      }
    });

    // Update URL hash without causing a page jump
    history.replaceState(null, '', `#slide-${this.currentSlide}`);
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

  buildTocDrawer() {
    const list = document.getElementById('tocList');
    if (!list) return;

    list.innerHTML = '';
    for (let i = 1; i <= this.totalSlides; i++) {
      const meta = this.topicMap[i] || { topic: `Slide ${i}`, section: "" };
      const li = document.createElement('li');
      li.className = 'toc-item' + (i === this.currentSlide ? ' active' : '');
      li.dataset.slideNum = i;

      li.innerHTML = `
        <span class="toc-num">${i < 10 ? '0' + i : i}</span>
        <div style="display: flex; flex-direction: column;">
          <span>${meta.topic}</span>
          <span style="font-size: 0.72rem; color: var(--text-dim); text-transform: uppercase;">${meta.section}</span>
        </div>
      `;

      li.addEventListener('click', () => {
        this.goToSlide(i);
        this.closeTocDrawer();
      });

      list.appendChild(li);
    }
  },

  filterToc(query) {
    const items = document.querySelectorAll('.toc-item');
    const q = query.toLowerCase().trim();

    items.forEach((item) => {
      const text = item.textContent.toLowerCase();
      if (!q || text.includes(q)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  },

  openTocDrawer() {
    const drawer = document.getElementById('tocDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    if (drawer) drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');

    // Scroll active item into view inside drawer now that it is open
    const activeItem = document.querySelector('.toc-item.active');
    if (activeItem) {
      activeItem.scrollIntoView({ block: 'nearest' });
    }

    const searchInput = document.getElementById('tocSearchInput');
    if (searchInput) {
      setTimeout(() => searchInput.focus(), 150);
    }
  },

  closeTocDrawer() {
    const drawer = document.getElementById('tocDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
  },

  toggleTocDrawer() {
    const drawer = document.getElementById('tocDrawer');
    if (drawer && drawer.classList.contains('open')) {
      this.closeTocDrawer();
    } else {
      this.openTocDrawer();
    }
  },

  openShortcutsModal() {
    const modal = document.getElementById('shortcutsModal');
    if (modal) modal.classList.add('open');
  },

  closeShortcutsModal() {
    const modal = document.getElementById('shortcutsModal');
    if (modal) modal.classList.remove('open');
  },

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  },

  copyCode(elementId) {
    const codeEl = document.getElementById(elementId);
    if (!codeEl) return;

    const text = codeEl.innerText;
    navigator.clipboard.writeText(text).then(() => {
      this.showToast();
    }).catch(() => {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.showToast();
    });
  },

  showToast() {
    const toast = document.getElementById('copyToast');
    if (!toast) return;
    toast.classList.add('show');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  },

  attachEvents() {
    // Navigation Buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    if (prevBtn) prevBtn.addEventListener('click', () => this.prevSlide());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());

    // Drawer Buttons
    const openTocBtn = document.getElementById('openTocBtn');
    const closeTocBtn = document.getElementById('closeTocBtn');
    const drawerBackdrop = document.getElementById('drawerBackdrop');
    if (openTocBtn) openTocBtn.addEventListener('click', () => this.openTocDrawer());
    if (closeTocBtn) closeTocBtn.addEventListener('click', () => this.closeTocDrawer());
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', () => this.closeTocDrawer());

    // Search input
    const tocSearchInput = document.getElementById('tocSearchInput');
    if (tocSearchInput) {
      tocSearchInput.addEventListener('input', (e) => {
        this.filterToc(e.target.value);
      });
    }

    // Shortcuts Modal Buttons
    const openShortcutsBtn = document.getElementById('openShortcutsBtn');
    const closeShortcutsBtn = document.getElementById('closeShortcutsBtn');
    const shortcutsModal = document.getElementById('shortcutsModal');
    if (openShortcutsBtn) openShortcutsBtn.addEventListener('click', () => this.openShortcutsModal());
    if (closeShortcutsBtn) closeShortcutsBtn.addEventListener('click', () => this.closeShortcutsModal());
    if (shortcutsModal) {
      shortcutsModal.addEventListener('click', (e) => {
        if (e.target === shortcutsModal) this.closeShortcutsModal();
      });
    }

    // Fullscreen Button
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (fullscreenBtn) fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());

    // Copy Buttons
    document.querySelectorAll('.copy-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const targetId = btn.getAttribute('data-target');
        if (targetId) this.copyCode(targetId);
      });
    });

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      // Don't intercept when user is typing inside an input/textarea
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        if (e.key === 'Escape') {
          this.closeTocDrawer();
          this.closeShortcutsModal();
          document.activeElement.blur();
        }
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ': // Spacebar
          e.preventDefault();
          this.nextSlide();
          break;

        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          this.prevSlide();
          break;

        case 'Home':
          e.preventDefault();
          this.goToSlide(1);
          break;

        case 'End':
          e.preventDefault();
          this.goToSlide(this.totalSlides);
          break;

        case 't':
        case 'T':
          e.preventDefault();
          this.toggleTocDrawer();
          break;

        case 'f':
        case 'F':
          e.preventDefault();
          this.toggleFullscreen();
          break;

        case '?':
          e.preventDefault();
          this.openShortcutsModal();
          break;

        case 'Escape':
          this.closeTocDrawer();
          this.closeShortcutsModal();
          break;
      }
    });

    // Interactive Q&A Toggles (Slide 22)
    document.querySelectorAll('.qa-card').forEach((card) => {
      card.addEventListener('click', () => {
        card.classList.toggle('open');
      });
    });
  },

  // ==============================================================================
  // 2. Interactive Demonstrations & Simulators
  // ==============================================================================
  initSimulators() {
    // ---------------------------------------------------------
    // Slide 10: Step-by-Step Flow Animation
    // ---------------------------------------------------------
    const simFlowBtn = document.getElementById('simulateFlowBtn');
    if (simFlowBtn) {
      let isRunning = false;
      simFlowBtn.addEventListener('click', () => {
        if (isRunning) return;
        isRunning = true;
        simFlowBtn.disabled = true;
        simFlowBtn.textContent = "⏳ Running Flow...";

        const steps = [
          document.getElementById('flowStep1'),
          document.getElementById('flowStep2'),
          document.getElementById('flowStep3'),
          document.getElementById('flowStep4'),
          document.getElementById('flowStep5')
        ];

        steps.forEach(s => s && s.classList.remove('active'));

        let stepIndex = 0;
        const interval = setInterval(() => {
          steps.forEach(s => s && s.classList.remove('active'));
          if (stepIndex < steps.length) {
            if (steps[stepIndex]) steps[stepIndex].classList.add('active');
            stepIndex++;
          } else {
            clearInterval(interval);
            isRunning = false;
            simFlowBtn.disabled = false;
            simFlowBtn.textContent = "▶ Replay Flow Animation";
          }
        }, 750);
      });
    }

    // ---------------------------------------------------------
    // Slide 20: Redux Counter Simulator Sandbox
    // ---------------------------------------------------------
    let simulatedState = {
      counter: {
        count: 0
      }
    };

    const countDisplay = document.getElementById('simCountDisplay');
    const incBtn = document.getElementById('simIncBtn');
    const decBtn = document.getElementById('simDecBtn');
    const resetBtn = document.getElementById('simResetBtn');
    const logEntries = document.getElementById('simLogEntries');

    function logAction(actionType, resultingState) {
      if (!logEntries) return;
      const entry = document.createElement('div');
      entry.className = 'log-entry';
      const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

      entry.innerHTML = `
        <span style="color: var(--text-dim);">${time}</span>
        <span class="log-action">dispatch(${actionType})</span>
        <span class="log-state">{ count: ${resultingState} }</span>
      `;

      logEntries.appendChild(entry);
      logEntries.scrollTop = logEntries.scrollHeight;
    }

    function updateCounterDisplay() {
      if (countDisplay) {
        countDisplay.textContent = simulatedState.counter.count;
      }
    }

    if (incBtn) {
      incBtn.addEventListener('click', () => {
        simulatedState.counter.count += 1;
        updateCounterDisplay();
        logAction('counter/increment', simulatedState.counter.count);
      });
    }

    if (decBtn) {
      decBtn.addEventListener('click', () => {
        simulatedState.counter.count -= 1;
        updateCounterDisplay();
        logAction('counter/decrement', simulatedState.counter.count);
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        simulatedState.counter.count = 0;
        updateCounterDisplay();
        logAction('counter/reset', simulatedState.counter.count);
      });
    }
  }
};

// Initialize when DOM content is ready
document.addEventListener('DOMContentLoaded', () => {
  Deck.init();
});
