/**
 * ==============================================================================
 * React Day 7 — React Lifecycle, useEffect & Custom Hooks
 * Interactive Presentation Engine & Demonstration Studio
 * ==============================================================================
 */

// ==============================================================================
// 1. Presentation Deck Controller
// ==============================================================================
const Deck = {
  currentSlide: 1,
  totalSlides: 40,
  slides: [],
  topicMap: {
    1: "React Lifecycle & useEffect — Title & Overview",
    2: "Learning Objectives",
    3: "Section 1 — What Is the React Lifecycle?",
    4: "Three Main Lifecycle Stages",
    5: "Stage 1: Mounting",
    6: "Stage 2: Updating",
    7: "Stage 3: Unmounting",
    8: "Interactive Lifecycle Diagram",
    9: "Section 2 — What Is a Side Effect?",
    10: "Why Do We Need useEffect?",
    11: "What Is useEffect?",
    12: "Basic useEffect (No Dependencies)",
    13: "useEffect With Empty Array []",
    14: "useEffect With Dependencies [count]",
    15: "The Dependency Array Rules",
    16: "Three Common useEffect Patterns",
    17: "Section 3 — Updating Document Title",
    18: "useEffect With a Timer",
    19: "What Is Effect Cleanup?",
    20: "Cleanup in Action: Live Simulator",
    21: "Cleaning Up Event Listeners",
    22: "Section 4 — Common useEffect Mistakes",
    23: "The Infinite Effect Loop",
    24: "useEffect Decision Guide",
    25: "Section 5 — What Is a Custom Hook?",
    26: "Why Create Custom Hooks?",
    27: "Rules for Custom Hooks",
    28: "Creating the useCounter Hook",
    29: "Using useCounter in a Component",
    30: "Custom Hook Data Flow",
    31: "Custom Hooks With useEffect",
    32: "Custom Hook Project Structure",
    33: "Section 6 — Mini Project: Counter Dashboard",
    34: "Dashboard Architecture",
    35: "Step 1: useCounter Code",
    36: "Step 2: useDocumentTitle Code",
    37: "Step 3: Using Both Hooks Together",
    38: "Section 7 — Common Mistakes to Avoid",
    39: "Quick Classroom Quiz (10 Questions)",
    40: "Final Summary & Key Takeaways"
  },

  init() {
    this.slides = Array.from(document.querySelectorAll('.slide'));
    this.totalSlides = this.slides.length || 40;

    const totalEl = document.getElementById('totalSlidesNum');
    if (totalEl) totalEl.textContent = this.totalSlides;

    this.buildTocDrawer();

    // Check URL hash for direct slide linking
    const hash = window.location.hash.replace('#slide-', '').replace('#', '');
    const initialSlide = parseInt(hash, 10);
    if (!isNaN(initialSlide) && initialSlide >= 1 && initialSlide <= this.totalSlides) {
      this.goToSlide(initialSlide);
    } else {
      this.goToSlide(1);
    }

    this.attachEvents();
  },

  goToSlide(slideNumber) {
    if (slideNumber < 1) slideNumber = 1;
    if (slideNumber > this.totalSlides) slideNumber = this.totalSlides;

    this.currentSlide = slideNumber;

    // Update active slide
    this.slides.forEach((slide) => {
      const num = parseInt(slide.dataset.slide, 10);
      if (num === this.currentSlide) {
        slide.classList.add('active');
        slide.scrollTop = 0;
      } else {
        slide.classList.remove('active');
      }
    });

    // Update UI counters and progress bar
    const currentNumEl = document.getElementById('currentSlideNum');
    if (currentNumEl) currentNumEl.textContent = this.currentSlide;

    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
      const pct = this.totalSlides > 1 ? ((this.currentSlide - 1) / (this.totalSlides - 1)) * 100 : 0;
      progressBar.style.width = `${pct}%`;
    }

    // Update Header Topic
    const topicEl = document.getElementById('headerTopic');
    if (topicEl) {
      topicEl.textContent = this.topicMap[this.currentSlide] || `Slide ${this.currentSlide}`;
    }

    // Update button states
    const prevBtn = document.getElementById('prevSlideBtn');
    const nextBtn = document.getElementById('nextSlideBtn');
    if (prevBtn) prevBtn.disabled = this.currentSlide === 1;
    if (nextBtn) nextBtn.disabled = this.currentSlide === this.totalSlides;

    // Update URL hash
    history.replaceState(null, '', `#slide-${this.currentSlide}`);

    // Update TOC item active state
    const tocItems = document.querySelectorAll('.toc-item');
    tocItems.forEach((item) => {
      const num = parseInt(item.dataset.slide, 10);
      if (num === this.currentSlide) {
        item.classList.add('active');
        item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else {
        item.classList.remove('active');
      }
    });
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
      const title = this.topicMap[i] || `Slide ${i}`;
      const item = document.createElement('div');
      item.className = `toc-item ${i === this.currentSlide ? 'active' : ''}`;
      item.dataset.slide = i;

      let sectionBadge = '';
      if (i <= 2) sectionBadge = 'Intro';
      else if (i <= 8) sectionBadge = 'Lifecycle';
      else if (i <= 16) sectionBadge = 'useEffect';
      else if (i <= 21) sectionBadge = 'Cleanup';
      else if (i <= 24) sectionBadge = 'Mistakes';
      else if (i <= 32) sectionBadge = 'Custom Hooks';
      else if (i <= 37) sectionBadge = 'Project';
      else sectionBadge = 'Review';

      item.innerHTML = `
        <div class="toc-item-left">
          <span class="toc-num">${i}</span>
          <span class="toc-title">${title}</span>
        </div>
        <span class="toc-badge">${sectionBadge}</span>
      `;

      item.addEventListener('click', () => {
        this.goToSlide(i);
        this.closeToc();
      });

      list.appendChild(item);
    }
  },

  openToc() {
    document.getElementById('tocDrawer')?.classList.add('open');
    document.getElementById('tocBackdrop')?.classList.add('open');
  },

  closeToc() {
    document.getElementById('tocDrawer')?.classList.remove('open');
    document.getElementById('tocBackdrop')?.classList.remove('open');
  },

  toggleToc() {
    const drawer = document.getElementById('tocDrawer');
    if (drawer && drawer.classList.contains('open')) {
      this.closeToc();
    } else {
      this.openToc();
    }
  },

  openShortcuts() {
    document.getElementById('shortcutsModal')?.classList.add('open');
    document.getElementById('tocBackdrop')?.classList.add('open');
  },

  closeShortcuts() {
    document.getElementById('shortcutsModal')?.classList.remove('open');
    if (!document.getElementById('tocDrawer')?.classList.contains('open')) {
      document.getElementById('tocBackdrop')?.classList.remove('open');
    }
  },

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn(`Fullscreen error: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  },

  attachEvents() {
    // Navigation buttons
    document.getElementById('prevSlideBtn')?.addEventListener('click', () => this.prevSlide());
    document.getElementById('nextSlideBtn')?.addEventListener('click', () => this.nextSlide());

    // Drawer and Modal toggles
    document.getElementById('openTocBtn')?.addEventListener('click', () => this.toggleToc());
    document.getElementById('closeTocBtn')?.addEventListener('click', () => this.closeToc());
    document.getElementById('openShortcutsBtn')?.addEventListener('click', () => this.openShortcuts());
    document.getElementById('closeShortcutsBtn')?.addEventListener('click', () => this.closeShortcuts());
    document.getElementById('fullscreenBtn')?.addEventListener('click', () => this.toggleFullscreen());
    document.getElementById('tocBackdrop')?.addEventListener('click', () => {
      this.closeToc();
      this.closeShortcuts();
    });

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'Space':
        case 'PageDown':
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
          this.toggleToc();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          this.toggleFullscreen();
          break;
        case '?':
          e.preventDefault();
          this.openShortcuts();
          break;
        case 'Escape':
          this.closeToc();
          this.closeShortcuts();
          break;
      }
    });

    // Code copy buttons
    document.querySelectorAll('.copy-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const code = btn.getAttribute('data-code');
        if (code) {
          navigator.clipboard.writeText(code).then(() => {
            const originalText = btn.textContent;
            btn.textContent = 'Copied!';
            btn.classList.add('copied');
            setTimeout(() => {
              btn.textContent = originalText;
              btn.classList.remove('copied');
            }, 2000);
          }).catch(err => {
            console.error('Copy failed: ', err);
          });
        }
      });
    });
  }
};

// ==============================================================================
// 2. Interactive Lifecycle Diagram (Slide 8)
// ==============================================================================
const DemoLifecycle = {
  stages: {
    mount: {
      title: "Mounting Phase (Birth)",
      color: "var(--react-cyan)",
      desc: "The component is created and inserted into the browser DOM for the very first time.",
      items: [
        "Function body executes to calculate initial state and JSX.",
        "React creates real browser DOM elements and mounts them into the page.",
        "Effects with empty dependencies `useEffect(() => {}, [])` execute once after DOM paint."
      ],
      code: `// 1. Mounting Phase
useEffect(() => {
  console.log("Component has mounted into DOM!");
}, []);`
    },
    update: {
      title: "Updating Phase (Re-renders)",
      color: "var(--accent-emerald)",
      desc: "The component re-renders because state changed (setState) or new props arrived from a parent.",
      items: [
        "Component function executes again with new state/props values.",
        "React computes Virtual DOM diff and applies targeted updates to real DOM.",
        "Effects whose dependencies changed `useEffect(() => {}, [count])` re-execute."
      ],
      code: `// 2. Updating Phase
useEffect(() => {
  console.log("Count updated to:", count);
}, [count]);`
    },
    unmount: {
      title: "Unmounting Phase (Death & Cleanup)",
      color: "var(--accent-rose)",
      desc: "The component is removed from the user interface (e.g., conditional rendering turns false).",
      items: [
        "React detects component is no longer rendered in the tree.",
        "Cleanup functions returned from useEffect are executed to halt timers & listeners.",
        "DOM elements are permanently removed and memory is freed."
      ],
      code: `// 3. Unmounting Phase
useEffect(() => {
  return () => {
    console.log("Component unmounting... Cleanup executed!");
  };
}, []);`
    }
  },

  showStage(stageKey) {
    const data = this.stages[stageKey];
    if (!data) return;

    // Update active tab buttons
    document.getElementById('tabMount')?.classList.toggle('active', stageKey === 'mount');
    document.getElementById('tabUpdate')?.classList.toggle('active', stageKey === 'update');
    document.getElementById('tabUnmount')?.classList.toggle('active', stageKey === 'unmount');

    // Update stage details
    const titleEl = document.getElementById('lifecycleStageTitle');
    const descEl = document.getElementById('lifecycleStageDesc');
    const itemsEl = document.getElementById('lifecycleStageItems');
    const codeEl = document.getElementById('lifecycleCodeDisplay');

    if (titleEl) {
      titleEl.textContent = data.title;
      titleEl.style.color = data.color;
    }
    if (descEl) descEl.textContent = data.desc;
    if (itemsEl) {
      itemsEl.innerHTML = data.items.map(item => `<li><span class="feature-bullet">✓</span> ${item}</li>`).join('');
    }
    if (codeEl) codeEl.textContent = data.code;
  }
};

// ==============================================================================
// 3. Live Counter & Document Title Demo (Slide 17)
// ==============================================================================
const DemoCounterTitle = {
  count: 0,

  increment() {
    this.count++;
    this.update();
  },

  decrement() {
    this.count--;
    this.update();
  },

  reset() {
    this.count = 0;
    this.update();
  },

  update() {
    const display = document.getElementById('demo1CountDisplay');
    const mockTitle = document.getElementById('mockBrowserTitle');
    const logBox = document.getElementById('demo1LogBox');

    if (display) display.textContent = this.count;
    if (mockTitle) mockTitle.textContent = `Count: ${this.count} | React Day 7`;

    // Also update actual real browser title
    document.title = `Count: ${this.count} | React Day 7 Presentation`;

    if (logBox) {
      const entry = document.createElement('div');
      entry.className = 'log-entry effect';
      entry.textContent = `➔ Effect ran: document.title = "Count: ${this.count}"`;
      logBox.appendChild(entry);
      logBox.scrollTop = logBox.scrollHeight;
    }
  }
};

// ==============================================================================
// 4. Live Cleanup Timer Simulation (Slide 20)
// ==============================================================================
const DemoTimerCleanup = {
  isMounted: false,
  seconds: 0,
  timerInterval: null,

  mount() {
    if (this.isMounted) return;
    this.isMounted = true;
    this.seconds = 0;

    const statusBadge = document.getElementById('timerStatusBadge');
    const secondsDisplay = document.getElementById('timerSecondsDisplay');
    const message = document.getElementById('timerMessage');
    const logBox = document.getElementById('timerLogBox');

    if (statusBadge) {
      statusBadge.textContent = 'Status: Mounted 🟢';
      statusBadge.className = 'slide-tag emerald';
    }
    if (secondsDisplay) secondsDisplay.textContent = '0s';
    if (message) message.textContent = 'Timer component is active and ticking...';

    if (logBox) {
      const entry = document.createElement('div');
      entry.className = 'log-entry mount';
      entry.textContent = '🟢 Component MOUNTED: setInterval() initiated';
      logBox.appendChild(entry);
      logBox.scrollTop = logBox.scrollHeight;
    }

    // Start interval
    this.timerInterval = setInterval(() => {
      this.seconds++;
      if (secondsDisplay) secondsDisplay.textContent = `${this.seconds}s`;
      if (logBox && this.seconds % 3 === 0) {
        const tickEntry = document.createElement('div');
        tickEntry.className = 'log-entry';
        tickEntry.textContent = `⏱️ Tick: ${this.seconds} seconds elapsed`;
        logBox.appendChild(tickEntry);
        logBox.scrollTop = logBox.scrollHeight;
      }
    }, 1000);
  },

  unmount() {
    if (!this.isMounted) return;
    this.isMounted = false;

    // Clear interval (CLEANUP)
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    const statusBadge = document.getElementById('timerStatusBadge');
    const secondsDisplay = document.getElementById('timerSecondsDisplay');
    const message = document.getElementById('timerMessage');
    const logBox = document.getElementById('timerLogBox');

    if (statusBadge) {
      statusBadge.textContent = 'Status: Unmounted 🛑';
      statusBadge.className = 'slide-tag rose';
    }
    if (secondsDisplay) secondsDisplay.textContent = '--';
    if (message) message.textContent = 'Component was unmounted. Cleanup stopped the timer!';

    if (logBox) {
      const entry = document.createElement('div');
      entry.className = 'log-entry cleanup';
      entry.textContent = '🛑 CLEANUP EXECUTED: clearInterval() stopped interval';
      logBox.appendChild(entry);
      logBox.scrollTop = logBox.scrollHeight;
    }
  }
};

// ==============================================================================
// 5. useCounter Component Demo (Slide 29)
// ==============================================================================
const DemoUseCounter = {
  count: 0,

  increment() {
    this.count++;
    this.render();
  },

  decrement() {
    this.count--;
    this.render();
  },

  render() {
    const el = document.getElementById('demo2CountDisplay');
    if (el) el.textContent = this.count;
  }
};

// ==============================================================================
// 6. Mini Project: Counter Dashboard Demo (Slide 37)
// ==============================================================================
const DemoProjectDashboard = {
  count: 0,

  increment() {
    this.count++;
    this.sync();
  },

  decrement() {
    this.count--;
    this.sync();
  },

  reset() {
    this.count = 0;
    this.sync();
  },

  sync() {
    const display = document.getElementById('projectCountDisplay');
    const mockTitle = document.getElementById('projectMockTitle');

    if (display) display.textContent = this.count;
    if (mockTitle) mockTitle.textContent = `Count: ${this.count}`;

    // Update real title
    document.title = `Count: ${this.count} | Counter Dashboard`;
  }
};

// ==============================================================================
// 7. Interactive Quiz Helper (Slide 39)
// ==============================================================================
const Quiz = {
  toggle(button) {
    const answer = button.nextElementSibling;
    if (!answer) return;

    if (answer.classList.contains('show')) {
      answer.classList.remove('show');
      button.textContent = 'Show Answer';
    } else {
      answer.classList.add('show');
      button.textContent = 'Hide Answer';
    }
  },

  revealAll() {
    document.querySelectorAll('.quiz-answer').forEach(ans => {
      ans.classList.add('show');
    });
    document.querySelectorAll('.quiz-toggle-btn').forEach(btn => {
      btn.textContent = 'Hide Answer';
    });
  },

  hideAll() {
    document.querySelectorAll('.quiz-answer').forEach(ans => {
      ans.classList.remove('show');
    });
    document.querySelectorAll('.quiz-toggle-btn').forEach(btn => {
      btn.textContent = 'Show Answer';
    });
  }
};

// ==============================================================================
// 8. Application Startup
// ==============================================================================
document.addEventListener('DOMContentLoaded', () => {
  Deck.init();
});
