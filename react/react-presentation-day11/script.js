/**
 * ==============================================================================
 * React Day 11: Redux Actions, Reducers, and Store
 * Interactive Presentation Deck & Classroom Demonstration Engine
 * 100% Vanilla HTML5, CSS3, & JavaScript (No Frameworks or Build Tools)
 * ==============================================================================
 */

// ==============================================================================
// 1. Presentation Deck Controller
// ==============================================================================
const Deck = {
  currentSlide: 1,
  totalSlides: 18,
  slides: [],
  topicMap: {
    1: { section: "INTRODUCTION", topic: "React Day 11 — Title" },
    2: { section: "OBJECTIVES", topic: "Learning Objectives" },
    3: { section: "DATA FLOW", topic: "Understanding Redux Data Flow" },
    4: { section: "ACTIONS", topic: "What Is an Action?" },
    5: { section: "ACTION CREATORS", topic: "What Is an Action Creator?" },
    6: { section: "REDUCERS", topic: "What Is a Reducer?" },
    7: { section: "PAYLOAD", topic: "Reducers with Payload" },
    8: { section: "STORE", topic: "What Is the Redux Store?" },
    9: { section: "DATA FLOW", topic: "How Actions, Reducers, & Store Work Together" },
    10: { section: "ECOSYSTEM", topic: "Traditional Redux vs Redux Toolkit" },
    11: { section: "IMPLEMENTATION", topic: "Creating a Counter Slice" },
    12: { section: "IMPLEMENTATION", topic: "Understanding Generated Actions" },
    13: { section: "IMPLEMENTATION", topic: "Configuring the Redux Store" },
    14: { section: "REACT REDUX", topic: "Dispatching Actions from React" },
    15: { section: "STATE LIFECYCLE", topic: "How Does the Store Update the UI?" },
    16: { section: "PRACTICAL EXAMPLE", topic: "Practical Example — Shopping Cart" },
    17: { section: "BEST PRACTICES", topic: "Common Mistakes and Best Practices" },
    18: { section: "SUMMARY & TASK", topic: "Summary and Practice Task" }
  },

  init() {
    this.slides = Array.from(document.querySelectorAll('.slide'));
    this.totalSlides = this.slides.length || 18;

    const totalEl = document.getElementById('totalSlidesNum');
    if (totalEl) totalEl.textContent = this.totalSlides;

    this.buildTocDrawer();

    // Check URL hash (#slide-5)
    const hash = window.location.hash.replace('#slide-', '').replace('#', '');
    const initialSlide = parseInt(hash, 10);
    if (!isNaN(initialSlide) && initialSlide >= 1 && initialSlide <= this.totalSlides) {
      this.goToSlide(initialSlide);
    } else {
      this.goToSlide(1);
    }

    this.attachEvents();
    this.initSimulators();
    this.initFlowSteppers();
    this.initCodeCopy();
  },

  goToSlide(slideNumber) {
    if (slideNumber < 1) slideNumber = 1;
    if (slideNumber > this.totalSlides) slideNumber = this.totalSlides;

    this.currentSlide = slideNumber;

    // Toggle active slide
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

    // Update slide counter
    const currentNumEl = document.getElementById('currentSlideNum');
    if (currentNumEl) currentNumEl.textContent = this.currentSlide;

    // Update prev/next button disabled states
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    if (prevBtn) prevBtn.disabled = this.currentSlide === 1;
    if (nextBtn) nextBtn.disabled = this.currentSlide === this.totalSlides;

    // Update header badges
    const meta = this.topicMap[this.currentSlide] || { section: "REACT DAY 11", topic: `Slide ${this.currentSlide}` };
    const secTag = document.getElementById('headerSectionTag');
    const topicEl = document.getElementById('headerTopic');
    if (secTag) secTag.textContent = meta.section;
    if (topicEl) topicEl.textContent = meta.topic;

    // Update Table of Contents active item
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
          <span class="toc-item-title">${meta.topic}</span>
          <span class="toc-item-section">${meta.section}</span>
        </div>
      `;

      li.addEventListener('click', () => {
        this.goToSlide(i);
        this.closeToc();
      });

      list.appendChild(li);
    }
  },

  openToc() {
    const drawer = document.getElementById('tocDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    if (drawer) drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('active');

    const input = document.getElementById('tocSearchInput');
    if (input) {
      input.value = '';
      setTimeout(() => input.focus(), 150);
      this.filterToc('');
    }
  },

  closeToc() {
    const drawer = document.getElementById('tocDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
  },

  filterToc(query) {
    const q = query.toLowerCase().trim();
    const items = document.querySelectorAll('.toc-item');
    items.forEach((item) => {
      const title = item.querySelector('.toc-item-title')?.textContent.toLowerCase() || '';
      const section = item.querySelector('.toc-item-section')?.textContent.toLowerCase() || '';
      if (!q || title.includes(q) || section.includes(q)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  },

  openShortcuts() {
    const modal = document.getElementById('shortcutsModal');
    if (modal) modal.classList.add('open');
  },

  closeShortcuts() {
    const modal = document.getElementById('shortcutsModal');
    if (modal) modal.classList.remove('open');
  },

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn('Fullscreen request failed:', err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  },

  attachEvents() {
    // Nav buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    if (prevBtn) prevBtn.addEventListener('click', () => this.prevSlide());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());

    // Drawer toggles
    const openTocBtn = document.getElementById('openTocBtn');
    const closeTocBtn = document.getElementById('closeTocBtn');
    const backdrop = document.getElementById('drawerBackdrop');

    if (openTocBtn) openTocBtn.addEventListener('click', () => this.openToc());
    if (closeTocBtn) closeTocBtn.addEventListener('click', () => this.closeToc());
    if (backdrop) backdrop.addEventListener('click', () => this.closeToc());

    // Shortcuts modal
    const openShortcutsBtn = document.getElementById('openShortcutsBtn');
    const closeShortcutsBtn = document.getElementById('closeShortcutsBtn');
    const shortcutsModal = document.getElementById('shortcutsModal');

    if (openShortcutsBtn) openShortcutsBtn.addEventListener('click', () => this.openShortcuts());
    if (closeShortcutsBtn) closeShortcutsBtn.addEventListener('click', () => this.closeShortcuts());
    if (shortcutsModal) {
      shortcutsModal.addEventListener('click', (e) => {
        if (e.target === shortcutsModal) this.closeShortcuts();
      });
    }

    // Fullscreen toggle
    const fsBtn = document.getElementById('fullscreenBtn');
    if (fsBtn) fsBtn.addEventListener('click', () => this.toggleFullscreen());

    // Search filter
    const searchInput = document.getElementById('tocSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.filterToc(e.target.value));
    }

    // Global keyboard listener
    window.addEventListener('keydown', (e) => {
      // Don't intercept keyboard shortcuts if the user is typing into an input field!
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      if (activeTag === 'input' || activeTag === 'textarea') {
        if (e.key === 'Escape') {
          document.activeElement.blur();
          this.closeToc();
          this.closeShortcuts();
        }
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case ' ': // Spacebar
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
        case 'f':
        case 'F':
          e.preventDefault();
          this.toggleFullscreen();
          break;
        case 't':
        case 'T':
          e.preventDefault();
          const drawer = document.getElementById('tocDrawer');
          if (drawer && drawer.classList.contains('open')) {
            this.closeToc();
          } else {
            this.openToc();
          }
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

    // Touch swipe support for mobile/tablets
    let touchStartX = 0;
    let touchStartY = 0;
    window.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      const diffX = e.changedTouches[0].screenX - touchStartX;
      const diffY = e.changedTouches[0].screenY - touchStartY;
      if (Math.abs(diffX) > 60 && Math.abs(diffY) < 50) {
        if (diffX < 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }
    }, { passive: true });
  },

  // ==============================================================================
  // 2. Interactive Flow Steppers (Slide 3, Slide 9, Slide 15)
  // ==============================================================================
  initFlowSteppers() {
    // Stepper for Slide 3
    this.setupStepper('flowDiagramContainer3', 'stepperStatus3', 'stepperPrevBtn3', 'stepperNextBtn3', [
      { title: "1. User Interaction", desc: "The user clicks the 'Increment' button in the React UI." },
      { title: "2. Dispatch Action", desc: "The component calls dispatch({ type: 'counter/increment' }) to send the event." },
      { title: "3. Reducer Executes", desc: "The reducer receives current state and action, calculating state + 1 = 1." },
      { title: "4. Store Updates", desc: "The Redux store updates its state tree to { counter: { count: 1 } }." },
      { title: "5. React UI Updates", desc: "useSelector() delivers the updated count, and React re-renders the UI." }
    ]);

    // Stepper for Slide 9
    this.setupStepper('flowDiagramContainer9', 'stepperStatus9', 'stepperPrevBtn9', 'stepperNextBtn9', [
      { title: "Initial State", desc: "The store begins with { counter: { count: 0 } }." },
      { title: "Step 1: Action Dispatched", desc: "User clicks Increment -> dispatch(increment()) sends { type: 'counter/increment' }." },
      { title: "Step 2: Reducer Runs", desc: "counterSlice reducer runs: state.count += 1." },
      { title: "Step 3: Store Holds Update", desc: "The Redux store now holds { counter: { count: 1 } }." },
      { title: "Step 4: UI Displays Update", desc: "React re-renders: Count displays 1." }
    ]);

    // Stepper for Slide 15
    this.setupStepper('flowDiagramContainer15', 'stepperStatus15', 'stepperPrevBtn15', 'stepperNextBtn15', [
      { title: "1. Button Click", desc: "User clicks the 'Increment by 5' button in Counter.jsx." },
      { title: "2. Dispatch Called", desc: "onClick calls dispatch(incrementByAmount(5))." },
      { title: "3. Action Object Created", desc: "RTK generates action: { type: 'counter/incrementByAmount', payload: 5 }." },
      { title: "4. Reducer Executes", desc: "Reducer adds payload (5) to current count (10) -> next state is 15." },
      { title: "5. Store State Saved", desc: "The store updates state to { counter: { count: 15 } }." },
      { title: "6. useSelector Notified", desc: "useSelector detects that count changed from 10 to 15." },
      { title: "7. UI Re-renders", desc: "React re-renders Counter component showing Count: 15." }
    ]);
  },

  setupStepper(containerId, statusId, prevBtnId, nextBtnId, steps) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const nodes = container.querySelectorAll('.flow-node');
    const statusEl = document.getElementById(statusId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);

    let currentStep = 1;

    const updateStep = (step) => {
      currentStep = step;
      nodes.forEach((node, idx) => {
        if (idx + 1 === currentStep) {
          node.classList.add('active-step');
        } else {
          node.classList.remove('active-step');
        }
      });

      if (statusEl && steps[currentStep - 1]) {
        statusEl.innerHTML = `<strong>${steps[currentStep - 1].title}:</strong> ${steps[currentStep - 1].desc}`;
      }

      if (prevBtn) prevBtn.disabled = currentStep === 1;
      if (nextBtn) {
        if (currentStep === steps.length) {
          nextBtn.textContent = 'Restart ↺';
        } else {
          nextBtn.innerHTML = 'Next Step &rarr;';
        }
      }
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentStep > 1) updateStep(currentStep - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentStep < steps.length) {
          updateStep(currentStep + 1);
        } else {
          updateStep(1);
        }
      });
    }

    nodes.forEach((node, idx) => {
      node.addEventListener('click', () => {
        updateStep(idx + 1);
      });
    });

    updateStep(1);
  },

  // ==============================================================================
  // 3. Simulators (Slide 16 Shopping Cart & Slide 18 Assignment Counter)
  // ==============================================================================
  initSimulators() {
    this.initCartSimulator();
    this.initAssignmentCounter();
  },

  initCartSimulator() {
    const itemsContainer = document.getElementById('cartItemsContainer');
    const totalPriceEl = document.getElementById('cartTotalPrice');
    const logContainer = document.getElementById('cartActionLog');
    const addJeansBtn = document.getElementById('addJeansBtn');
    const clearCartBtn = document.getElementById('clearCartBtn');

    if (!itemsContainer || !totalPriceEl) return;

    // Simulated Redux Cart State
    let cartState = {
      items: [
        { id: 1, name: "T-Shirt", price: 500, quantity: 2 }
      ]
    };

    const renderCart = () => {
      itemsContainer.innerHTML = '';

      if (cartState.items.length === 0) {
        itemsContainer.innerHTML = `
          <div style="padding: 1rem; text-align: center; color: var(--text-dim); font-size: 0.9rem;">
            🛒 Cart is empty. Dispatch "addToCart" to add items.
          </div>
        `;
      } else {
        cartState.items.forEach((item) => {
          const row = document.createElement('div');
          row.className = 'cart-item-row';
          row.innerHTML = `
            <div class="cart-item-info">
              <span class="cart-item-name">${item.name}</span>
              <span class="cart-item-price">$${item.price.toLocaleString()} each</span>
            </div>
            <div class="cart-item-qty-controls">
              <button class="qty-btn dec-qty" data-id="${item.id}">-</button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn inc-qty" data-id="${item.id}">+</button>
            </div>
          `;
          itemsContainer.appendChild(row);
        });
      }

      // Calculate total
      const total = cartState.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      totalPriceEl.textContent = `$${total.toLocaleString()}`;

      // Attach qty buttons
      itemsContainer.querySelectorAll('.inc-qty').forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = parseInt(btn.dataset.id, 10);
          dispatchCartAction({ type: "cart/increaseQuantity", payload: id });
        });
      });

      itemsContainer.querySelectorAll('.dec-qty').forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = parseInt(btn.dataset.id, 10);
          dispatchCartAction({ type: "cart/decreaseQuantity", payload: id });
        });
      });
    };

    const logCartAction = (action) => {
      if (!logContainer) return;
      const item = document.createElement('div');
      item.className = 'sim-log-item';
      const time = new Date().toLocaleTimeString().split(' ')[0];
      item.innerHTML = `
        <span class="time">[${time}]</span>
        <span class="action-name">${action.type}</span>
        <span class="action-payload">${action.payload !== undefined ? JSON.stringify(action.payload) : ''}</span>
      `;
      logContainer.prepend(item);
    };

    // Reducer implementation
    const cartReducer = (state, action) => {
      switch (action.type) {
        case "cart/addToCart": {
          const existing = state.items.find(i => i.id === action.payload.id);
          if (existing) {
            return {
              ...state,
              items: state.items.map(i => i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i)
            };
          }
          return {
            ...state,
            items: [...state.items, { ...action.payload, quantity: 1 }]
          };
        }
        case "cart/increaseQuantity": {
          return {
            ...state,
            items: state.items.map(i => i.id === action.payload ? { ...i, quantity: i.quantity + 1 } : i)
          };
        }
        case "cart/decreaseQuantity": {
          return {
            ...state,
            items: state.items
              .map(i => i.id === action.payload ? { ...i, quantity: i.quantity - 1 } : i)
              .filter(i => i.quantity > 0)
          };
        }
        case "cart/clearCart": {
          return { ...state, items: [] };
        }
        default:
          return state;
      }
    };

    const dispatchCartAction = (action) => {
      cartState = cartReducer(cartState, action);
      logCartAction(action);
      renderCart();
    };

    if (addJeansBtn) {
      addJeansBtn.addEventListener('click', () => {
        dispatchCartAction({
          type: "cart/addToCart",
          payload: { id: 2, name: "Designer Jeans", price: 1200 }
        });
      });
    }

    if (clearCartBtn) {
      clearCartBtn.addEventListener('click', () => {
        dispatchCartAction({ type: "cart/clearCart" });
      });
    }

    renderCart();
  },

  initAssignmentCounter() {
    const valEl = document.getElementById('assignmentCountVal');
    const logEl = document.getElementById('asgActionLog');
    const incBtn = document.getElementById('asgIncBtn');
    const decBtn = document.getElementById('asgDecBtn');
    const resetBtn = document.getElementById('asgResetBtn');
    const inc5Btn = document.getElementById('asgInc5Btn');
    const dec5Btn = document.getElementById('asgDec5Btn');
    const customInput = document.getElementById('asgCustomInput');
    const customIncBtn = document.getElementById('asgCustomIncBtn');

    if (!valEl) return;

    // Simulated Redux Counter State
    let counterState = {
      count: 0
    };

    const render = () => {
      valEl.textContent = counterState.count;
    };

    const logAction = (action) => {
      if (!logEl) return;
      const row = document.createElement('div');
      row.className = 'sim-log-item';
      const time = new Date().toLocaleTimeString().split(' ')[0];
      row.innerHTML = `
        <span class="time">[${time}]</span>
        <span class="action-name">${action.type}</span>
        <span class="action-payload">${action.payload !== undefined ? `payload: ${action.payload}` : ''}</span>
      `;
      logEl.prepend(row);
    };

    // Reducer
    const counterReducer = (state, action) => {
      switch (action.type) {
        case "counter/increment":
          return { count: state.count + 1 };
        case "counter/decrement":
          return { count: state.count - 1 };
        case "counter/reset":
          return { count: 0 };
        case "counter/incrementByAmount":
          return { count: state.count + action.payload };
        case "counter/decrementByAmount":
          return { count: state.count - action.payload };
        default:
          return state;
      }
    };

    const dispatch = (action) => {
      counterState = counterReducer(counterState, action);
      logAction(action);
      render();
    };

    if (incBtn) incBtn.addEventListener('click', () => dispatch({ type: "counter/increment" }));
    if (decBtn) decBtn.addEventListener('click', () => dispatch({ type: "counter/decrement" }));
    if (resetBtn) resetBtn.addEventListener('click', () => dispatch({ type: "counter/reset" }));
    if (inc5Btn) inc5Btn.addEventListener('click', () => dispatch({ type: "counter/incrementByAmount", payload: 5 }));
    if (dec5Btn) dec5Btn.addEventListener('click', () => dispatch({ type: "counter/decrementByAmount", payload: 5 }));

    if (customIncBtn && customInput) {
      customIncBtn.addEventListener('click', () => {
        const val = parseInt(customInput.value, 10);
        if (!isNaN(val)) {
          dispatch({ type: "counter/incrementByAmount", payload: val });
        }
      });
    }

    render();
  },

  // ==============================================================================
  // 4. Code Block Clipboard Copy
  // ==============================================================================
  initCodeCopy() {
    const copyBtns = document.querySelectorAll('.code-copy-btn');
    const toast = document.getElementById('copyToast');

    copyBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.copyTarget;
        const targetEl = document.getElementById(targetId);
        if (!targetEl) return;

        const text = targetEl.textContent;
        navigator.clipboard.writeText(text).then(() => {
          btn.textContent = 'Copied!';
          setTimeout(() => { btn.textContent = 'Copy'; }, 2000);

          if (toast) {
            toast.classList.add('show');
            setTimeout(() => { toast.classList.remove('show'); }, 2200);
          }
        }).catch((err) => {
          console.warn('Clipboard write failed:', err);
        });
      });
    });
  }
};

// Initialize deck when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  Deck.init();
});
