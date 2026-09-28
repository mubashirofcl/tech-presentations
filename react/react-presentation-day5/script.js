/**
 * ==============================================================================
 * React Day 5 — React Hooks, State, useState & Controlled Components
 * Presentation Deck Controller & Interactive Simulation Engine
 * ==============================================================================
 */

// ==============================================================================
// 1. Master Presentation Deck Controller
// ==============================================================================
const Deck = {
  currentSlide: 1,
  totalSlides: 40,
  slides: [],
  topicMap: {
    1: "React Hooks Introduction",
    2: "Learning Objectives",
    3: "What Are React Hooks?",
    4: "Why Were Hooks Introduced?",
    5: "Functional Components Before State",
    6: "What Is State in React?",
    7: "Props vs State Comparison",
    8: "Why Do We Need State?",
    9: "What Is useState()?",
    10: "Understanding the 3 Parts of useState",
    11: "First useState Counter Demo",
    12: "How State Updates Work",
    13: "Separating Handlers from JSX",
    14: "Different Types of State",
    15: "Updating String State Demo",
    16: "Updating Boolean State Demo",
    17: "Updating Array State Demo",
    18: "Updating Object State & Spread",
    19: "Functional State Updates",
    20: "Common useState Mistakes",
    21: "The Two Rules of Hooks",
    22: "What Is a Controlled Component?",
    23: "Normal vs Controlled Inputs",
    24: "Basic Controlled Input Demo",
    25: "Understanding onChange & e.target.value",
    26: "Controlled Input Data Flow Diagram",
    27: "Controlled Textarea & Char Counter",
    28: "Controlled Select Dropdowns",
    29: "Controlled Checkbox & e.target.checked",
    30: "Multiple Form Fields in One State",
    31: "Handling Form Submit & preventDefault",
    32: "Complete Controlled Form Code",
    33: "Mini Project: Student Registration",
    34: "Mini Project Data Flow",
    35: "Display Submitted Data Sandbox",
    36: "Common Form & State Mistakes",
    37: "useState & Forms Cheat Sheet",
    38: "Key Concepts & Architecture Map",
    39: "Quick Classroom Quiz (10 Questions)",
    40: "React Day 5 Summary & Takeaway"
  },

  init() {
    this.slides = Array.from(document.querySelectorAll('.slide'));
    this.totalSlides = this.slides.length || 40;

    // Set total slides count in DOM
    const totalEl = document.getElementById('totalSlidesNum');
    if (totalEl) totalEl.textContent = this.totalSlides;

    // Build drawer index list
    this.buildTocDrawer();

    // Check URL hash for starting slide (e.g. #11)
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
        slide.scrollTop = 0; // reset scroll position
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

    // Update URL hash
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
      toast.remove();
    }, 2600);
  },

  // Keyboard navigation & Shortcuts
  attachEvents() {
    document.addEventListener('keydown', (e) => {
      // If typing in an input or textarea, don't trigger slide shortcuts
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
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

        case 'p':
        case 'P':
          e.preventDefault();
          const pModal = document.getElementById('playgroundModal');
          if (pModal && pModal.classList.contains('active')) {
            Deck.closeModal('playgroundModal');
          } else {
            Deck.openModal('playgroundModal');
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
          const helpModal = document.getElementById('shortcutsModal');
          if (helpModal && helpModal.classList.contains('active')) {
            Deck.closeModal('shortcutsModal');
          } else {
            Deck.openModal('shortcutsModal');
          }
          break;

        case 'Escape':
          Deck.closeAllModals();
          break;
      }
    });

    // Header buttons
    const pBtn = document.getElementById('openPlaygroundBtn');
    if (pBtn) {
      pBtn.addEventListener('click', () => Deck.openModal('playgroundModal'));
    }

    const tocBtn = document.getElementById('openTocBtn');
    if (tocBtn) {
      tocBtn.addEventListener('click', () => Deck.toggleDrawer());
    }

    const shortcutsBtn = document.getElementById('openShortcutsBtn');
    if (shortcutsBtn) {
      shortcutsBtn.addEventListener('click', () => Deck.openModal('shortcutsModal'));
    }

    const fsBtn = document.getElementById('fullscreenBtn');
    if (fsBtn) {
      fsBtn.addEventListener('click', () => Deck.toggleFullscreen());
    }
  }
};

// ==============================================================================
// 2. Interactive In-Slide Demos
// ==============================================================================
const SlideDemos = {
  // Slide 10: Inspecting useState parts
  inspectPart(part) {
    const titleEl = document.getElementById('useStateInspectTitle');
    const descEl = document.getElementById('useStateInspectDesc');
    if (!titleEl || !descEl) return;

    if (part === 'state') {
      titleEl.innerHTML = `<span class="icon">🔍</span> 1. The State Variable (count)`;
      titleEl.style.color = "var(--react-cyan)";
      descEl.innerHTML = `
        This holds the <strong>current value</strong> of the state during the current render.
        In your JSX, you display this value using curly braces: <code style="font-family: var(--font-mono); color: var(--react-cyan);">&lt;h2&gt;{count}&lt;/h2&gt;</code>.
        React ensures this value persists across component re-renders!
      `;
    } else if (part === 'setter') {
      titleEl.innerHTML = `<span class="icon">⚡</span> 2. The Setter Function (setCount)`;
      titleEl.style.color = "var(--code-function)";
      descEl.innerHTML = `
        This is a function that updates the state variable. Calling <code style="font-family: var(--font-mono); color: var(--code-function);">setCount(newValue)</code>:
        <br>1. Updates the stored state in React's internal fiber tree.
        <br>2. Tells React to schedule a component re-render so the screen updates!
      `;
    } else if (part === 'initial') {
      titleEl.innerHTML = `<span class="icon">🌱</span> 3. The Initial Value (0)`;
      titleEl.style.color = "var(--accent-amber)";
      descEl.innerHTML = `
        The value passed into <code style="font-family: var(--font-mono); color: var(--accent-amber);">useState(initialValue)</code> is used <strong>only on the very first render</strong> (mount).
        On all subsequent re-renders, React ignores this initial value and provides the latest updated state!
      `;
    }
  },

  // Slide 11: Counter state demo
  counterState: 0,
  updateCounterUI() {
    const valEl = document.getElementById('liveCounterValue');
    const logEl = document.getElementById('counterLogBox');
    if (valEl) valEl.textContent = this.counterState;
    if (logEl) {
      logEl.innerHTML = `setCount(${this.counterState}) &rarr; React re-rendered Counter component!`;
    }
  },

  increaseCounter() {
    this.counterState++;
    this.updateCounterUI();
    Deck.showToast(`count updated to ${this.counterState}`);
  },

  decreaseCounter() {
    this.counterState--;
    this.updateCounterUI();
    Deck.showToast(`count updated to ${this.counterState}`);
  },

  resetCounter() {
    this.counterState = 0;
    this.updateCounterUI();
    Deck.showToast('Counter reset to 0');
  },

  // Slide 12: Animate Re-rendering flow
  animateStateFlow() {
    const steps = ['step1', 'step2', 'step3', 'step4', 'step5'];
    steps.forEach(s => document.getElementById(s)?.classList.remove('active-node'));

    let current = 0;
    const interval = setInterval(() => {
      if (current > 0) {
        document.getElementById(steps[current - 1])?.classList.remove('active-node');
      }
      if (current < steps.length) {
        document.getElementById(steps[current])?.classList.add('active-node');
        current++;
      } else {
        clearInterval(interval);
        document.getElementById('step5')?.classList.add('active-node');
        Deck.showToast('Re-render cycle complete!');
      }
    }, 450);
  },

  // Slide 15: String state demo
  setStringState(name) {
    const disp = document.getElementById('demoStringStateDisplay');
    const log = document.getElementById('demoStringLog');
    if (disp) disp.textContent = `"${name}"`;
    if (log) {
      log.innerHTML = `setName("${name}") called &rarr; State updated, component re-rendered!`;
    }
    Deck.showToast(`name set to "${name}"`);
  },

  // Slide 16: Boolean state demo
  boolState: false,
  toggleBooleanState() {
    this.boolState = !this.boolState;
    const valEl = document.getElementById('demoBoolStateVal');
    const btn = document.getElementById('demoToggleBtn');
    const box = document.getElementById('demoBoolDetailsBox');
    const log = document.getElementById('demoBoolLog');

    if (valEl) {
      valEl.textContent = this.boolState ? "true" : "false";
      valEl.style.color = this.boolState ? "var(--accent-emerald)" : "var(--accent-rose)";
    }
    if (btn) {
      btn.textContent = this.boolState ? "Hide Details" : "Show Details";
    }
    if (box) {
      box.style.display = this.boolState ? "block" : "none";
    }
    if (log) {
      log.innerHTML = `setIsOpen(${this.boolState}) &rarr; ${this.boolState ? "Revealed content!" : "Hid content!"}`;
    }
    Deck.showToast(`isOpen toggled to ${this.boolState}`);
  },

  // Slide 17: Array state demo
  skillsState: [],
  addSkill(skill) {
    if (this.skillsState.includes(skill)) {
      Deck.showToast(`"${skill}" already added!`);
      return;
    }
    this.skillsState = [...this.skillsState, skill];
    this.renderSkillsUI();
    Deck.showToast(`Added "${skill}" to skills state!`);
  },

  clearSkills() {
    this.skillsState = [];
    this.renderSkillsUI();
    Deck.showToast('Skills array cleared.');
  },

  renderSkillsUI() {
    const rawEl = document.getElementById('demoArrayStateRaw');
    const container = document.getElementById('demoSkillsTagsContainer');
    const log = document.getElementById('demoArrayLog');

    if (rawEl) {
      rawEl.textContent = JSON.stringify(this.skillsState);
    }
    if (container) {
      if (this.skillsState.length === 0) {
        container.innerHTML = `<span style="font-size: 0.75rem; color: var(--text-dim); font-style: italic;">No skills added yet.</span>`;
      } else {
        container.innerHTML = this.skillsState.map(s => `
          <span style="background: rgba(0, 216, 255, 0.12); color: var(--react-cyan); border: 1px solid var(--react-border); padding: 0.2rem 0.6rem; border-radius: 4px; font-family: var(--font-mono); font-size: 0.78rem;">
            ${s}
          </span>
        `).join('');
      }
    }
    if (log) {
      log.innerHTML = `setSkills([...skills, newSkill]) &rarr; Length: ${this.skillsState.length}`;
    }
  },

  // Slide 24: Controlled text input demo
  handleControlledInput(val) {
    const heading = document.getElementById('demoGreetingHeading');
    const log = document.getElementById('demoInputStateLog');
    if (heading) {
      heading.textContent = `Hello ${val.trim() ? val : "Guest"}!`;
    }
    if (log) {
      log.innerHTML = `React State: <strong>name = "${val}"</strong> (Length: ${val.length})`;
    }
  },

  // Slide 27: Controlled textarea demo
  handleTextarea(val) {
    const charEl = document.getElementById('demoCharCountDisplay');
    const log = document.getElementById('demoTextareaLog');
    if (charEl) {
      charEl.textContent = `${val.length} / 100`;
      charEl.style.color = val.length > 80 ? "var(--accent-amber)" : "var(--react-cyan)";
    }
    if (log) {
      log.innerHTML = `setMessage("${val.slice(0, 20)}${val.length > 20 ? '...' : ''}") &rarr; message.length = ${val.length}`;
    }
  },

  // Slide 28: Controlled select demo
  handleSelect(val) {
    const out = document.getElementById('demoSelectOutput');
    const log = document.getElementById('demoSelectLog');
    if (out) {
      out.textContent = val ? val : "(None)";
    }
    if (log) {
      log.innerHTML = `setCourse("${val}") &rarr; Selected course is now "${val}"`;
    }
    if (val) Deck.showToast(`Selected course: ${val}`);
  },

  // Slide 29: Controlled checkbox demo
  handleCheckbox(checked) {
    const status = document.getElementById('demoCheckboxStatus');
    const log = document.getElementById('demoCheckboxLog');
    if (status) {
      status.textContent = checked ? "Checked (true) ✅" : "Unchecked (false) ❌";
      status.style.color = checked ? "var(--accent-emerald)" : "var(--accent-rose)";
    }
    if (log) {
      log.innerHTML = `setAgree(${checked}) &rarr; e.target.checked evaluates to ${checked}`;
    }
    Deck.showToast(`agree set to ${checked}`);
  },

  // Slide 35: Student Registration Form Submit
  handleFormSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('sfName')?.value.trim();
    const email = document.getElementById('sfEmail')?.value.trim();
    const age = document.getElementById('sfAge')?.value.trim();
    const course = document.getElementById('sfCourse')?.value;
    const gender = document.getElementById('sfGender')?.value;

    const profileCard = document.getElementById('submittedProfileCard');
    const logBox = document.getElementById('formSubmissionLog');

    if (profileCard) {
      profileCard.style.border = "1px solid var(--react-border)";
      profileCard.style.background = "var(--bg-card)";
      profileCard.style.textAlign = "left";
      profileCard.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.5rem; margin-bottom: 0.75rem; width: 100%;">
          <span style="font-weight: 800; font-size: 1.1rem; color: var(--react-cyan);">${name}</span>
          <span style="background: rgba(16, 185, 129, 0.15); color: var(--accent-emerald); font-family: var(--font-mono); font-size: 0.72rem; padding: 2px 6px; border-radius: 4px; font-weight: bold;">
            Enrolled (${course})
          </span>
        </div>
        <div style="font-family: var(--font-mono); font-size: 0.8rem; display: flex; flex-direction: column; gap: 0.4rem; color: var(--text-secondary); width: 100%;">
          <div><span style="color: var(--text-muted);">Email:</span> ${email}</div>
          <div><span style="color: var(--text-muted);">Age:</span> ${age} years old</div>
          <div><span style="color: var(--text-muted);">Course:</span> ${course}</div>
          <div><span style="color: var(--text-muted);">Gender:</span> ${gender}</div>
        </div>
      `;
    }

    if (logBox) {
      logBox.innerHTML = `e.preventDefault() called! Student "${name}" rendered from React State!`;
      logBox.style.color = "var(--accent-emerald)";
    }

    Deck.showToast(`Student registered: ${name}`);
  },

  resetForm() {
    const form = document.getElementById('slideStudentForm');
    if (form) form.reset();

    const profileCard = document.getElementById('submittedProfileCard');
    if (profileCard) {
      profileCard.style.border = "1px dashed var(--border-medium)";
      profileCard.style.background = "var(--bg-surface)";
      profileCard.style.textAlign = "center";
      profileCard.innerHTML = `
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">👤</div>
        <div style="font-size: 0.85rem; color: var(--text-muted); font-style: italic;">
          No student submitted yet. Fill out the form and click Submit!
        </div>
      `;
    }

    const logBox = document.getElementById('formSubmissionLog');
    if (logBox) {
      logBox.innerHTML = "Form reset to initial state.";
      logBox.style.color = "#94A3B8";
    }

    Deck.showToast('Form reset.');
  },

  // Slide 39: Quick Quiz toggle answer
  toggleQuizAnswer(id) {
    const ans = document.getElementById(`quiz-ans-${id}`);
    if (!ans) return;
    const isShowing = ans.classList.contains('revealed');
    if (isShowing) {
      ans.classList.remove('revealed');
    } else {
      ans.classList.add('revealed');
    }
  },

  // Modal Sandbox form
  handleModalSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('mName')?.value.trim();
    const email = document.getElementById('mEmail')?.value.trim();
    const course = document.getElementById('mCourse')?.value;
    const gender = document.getElementById('mGender')?.value;

    const jsonEl = document.getElementById('modalStateJson');
    if (jsonEl) {
      const stateObj = { name, email, course, gender };
      jsonEl.textContent = JSON.stringify(stateObj, null, 2);
    }
    Deck.showToast(`Updated React state object for ${name}!`);
  }
};

// ==============================================================================
// 3. Initialize Deck on DOM Loaded
// ==============================================================================
document.addEventListener('DOMContentLoaded', () => {
  Deck.init();
});
