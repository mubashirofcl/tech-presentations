/**
 * ==============================================================================
 * React Day 6: React Forms — Submission, Validation & Import/Export
 * Interactive Presentation Engine & Demonstration Studio
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
    1: "React Day 6 Title & Overview",
    2: "Learning Objectives",
    3: "Section 1 — What Happens When a Form Is Submitted?",
    4: "Basic React Form Elements",
    5: "Using the onSubmit Event",
    6: "Understanding onSubmit Flow",
    7: "Why Do We Use preventDefault()?",
    8: "Complete Basic Form Submission",
    9: "Getting Form Values (Controlled Inputs)",
    10: "Form Submission Flow Visualizer",
    11: "Multiple Form Fields in One State Object",
    12: "Section 2 — What Is Form Validation?",
    13: "Why Validate Forms? (User Feedback)",
    14: "Required Field Validation & .trim()",
    15: "Email Validation & Pattern Matching",
    16: "Number Validation & String Conversion",
    17: "The Validation Function (validateForm)",
    18: "Handling Validation Errors (errors state)",
    19: "Displaying Error Messages in UI",
    20: "Complete Validation Flow Diagram",
    21: "Step-by-Step Validation Example",
    22: "Section 3 — Student Registration Form UI",
    23: "Form State Architecture (form & errors)",
    24: "Handling Input Changes Dynamically ([name]: value)",
    25: "Complete handleSubmit Function",
    26: "Complete StudentForm Component",
    27: "Section 4 — Why Import and Export?",
    28: "Exporting a Component (export default)",
    29: "Importing a Default Export",
    30: "Named Exports (export function)",
    31: "Multiple Named Exports in One File",
    32: "Default vs Named Exports Comparison",
    33: "Exporting Utility Functions (validation.js)",
    34: "Organizing a Small React Project",
    35: "Section 5 — Mini Project Requirements",
    36: "Project Directory Structure (src/)",
    37: "Interactive Project Architecture",
    38: "Common Beginner Mistakes & Solutions",
    39: "Quick Classroom Quiz (10 Questions)",
    40: "Summary & Final Flow Recap"
  },

  init() {
    this.slides = Array.from(document.querySelectorAll('.slide'));
    this.totalSlides = this.slides.length || 40;

    const totalEl = document.getElementById('totalSlidesNum');
    if (totalEl) totalEl.textContent = this.totalSlides;

    this.buildTocDrawer();

    // Check URL hash for direct slide linking (e.g. #slide-14)
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

    // Update UI counters and progress
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

    // Update URL hash without jitter
    history.replaceState(null, '', `#slide-${this.currentSlide}`);

    // Update TOC drawer active selection
    document.querySelectorAll('.drawer-item').forEach((item) => {
      const itemNum = parseInt(item.dataset.slideTarget, 10);
      if (itemNum === this.currentSlide) {
        item.classList.add('active');
        item.scrollIntoView({ block: 'nearest' });
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
      const li = document.createElement('li');
      li.className = 'drawer-item';
      li.dataset.slideTarget = i;

      const badge = document.createElement('span');
      badge.className = 'slide-num-badge';
      badge.textContent = String(i).padStart(2, '0');

      const title = document.createElement('span');
      title.textContent = this.topicMap[i] || `Slide ${i}`;

      li.appendChild(badge);
      li.appendChild(title);

      li.addEventListener('click', () => {
        this.goToSlide(i);
        this.closeDrawer();
      });

      list.appendChild(li);
    }
  },

  openDrawer() {
    const drawer = document.getElementById('tocDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    if (drawer && backdrop) {
      drawer.classList.add('open');
      backdrop.classList.add('active');
    }
  },

  closeDrawer() {
    const drawer = document.getElementById('tocDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    if (drawer && backdrop) {
      drawer.classList.remove('open');
      backdrop.classList.remove('active');
    }
  },

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn('Fullscreen request failed:', err);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.warn('Exit fullscreen failed:', err);
      });
    }
  },

  attachEvents() {
    // Nav buttons
    const prevBtn = document.getElementById('prevSlideBtn');
    const nextBtn = document.getElementById('nextSlideBtn');
    if (prevBtn) prevBtn.addEventListener('click', () => this.prevSlide());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());

    // Drawer triggers
    const openTocBtn = document.getElementById('openTocBtn');
    const closeTocBtn = document.getElementById('closeTocBtn');
    const backdrop = document.getElementById('drawerBackdrop');
    if (openTocBtn) openTocBtn.addEventListener('click', () => this.openDrawer());
    if (closeTocBtn) closeTocBtn.addEventListener('click', () => this.closeDrawer());
    if (backdrop) backdrop.addEventListener('click', () => this.closeDrawer());

    // Shortcuts modal triggers
    const openShortcutsBtn = document.getElementById('openShortcutsBtn');
    const closeShortcutsBtn = document.getElementById('closeShortcutsBtn');
    const shortcutsModal = document.getElementById('shortcutsModal');
    if (openShortcutsBtn && shortcutsModal) {
      openShortcutsBtn.addEventListener('click', () => shortcutsModal.classList.add('active'));
    }
    if (closeShortcutsBtn && shortcutsModal) {
      closeShortcutsBtn.addEventListener('click', () => shortcutsModal.classList.remove('active'));
    }
    if (shortcutsModal) {
      shortcutsModal.addEventListener('click', (e) => {
        if (e.target === shortcutsModal) shortcutsModal.classList.remove('active');
      });
    }

    // Fullscreen button
    const fsBtn = document.getElementById('fullscreenBtn');
    if (fsBtn) fsBtn.addEventListener('click', () => this.toggleFullscreen());

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      // Don't intercept if user is typing into an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        this.nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        this.prevSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        this.goToSlide(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        this.goToSlide(this.totalSlides);
      } else if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        const drawer = document.getElementById('tocDrawer');
        if (drawer && drawer.classList.contains('open')) {
          this.closeDrawer();
        } else {
          this.openDrawer();
        }
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        this.toggleFullscreen();
      } else if (e.key === '?') {
        e.preventDefault();
        if (shortcutsModal) shortcutsModal.classList.toggle('active');
      } else if (e.key === 'Escape') {
        this.closeDrawer();
        if (shortcutsModal) shortcutsModal.classList.remove('active');
      }
    });
  }
};

// ==============================================================================
// 2. Toast Notifications & Copy to Clipboard
// ==============================================================================
function showToast(message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 2500);
}

function initCodeCopy() {
  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const codeBox = btn.closest('.code-box');
      if (!codeBox) return;
      const codeContent = codeBox.querySelector('pre.code-content');
      if (!codeContent) return;

      const text = codeContent.innerText;
      try {
        await navigator.clipboard.writeText(text);
        btn.classList.add('copied');
        btn.innerHTML = `
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Copied!
        `;
        showToast('Code copied to clipboard!');
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = `
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            Copy
          `;
        }, 2000);
      } catch (err) {
        showToast('Failed to copy code.');
      }
    });
  });
}

// ==============================================================================
// 3. Interactive Component: Form Submission Flow Stepper (Slide 10)
// ==============================================================================
const SubmissionFlow = {
  currentStep: 0,
  steps: [
    { title: "User enters data", desc: "User types into input fields in the browser" },
    { title: "Controlled Input", desc: "onChange fires and passes e.target.value" },
    { title: "React State", desc: "setForm updates state with the new value" },
    { title: "Clicks Submit", desc: "User clicks <button type='submit'> or presses Enter" },
    { title: "onSubmit", desc: "Form triggers onSubmit event listener" },
    { title: "handleSubmit()", desc: "Your custom submit function executes" },
    { title: "preventDefault()", desc: "Stops browser page refresh / reload!" },
    { title: "Validate & Process", desc: "Runs validation checks and submits data" }
  ],

  init() {
    const nextBtn = document.getElementById('submissionFlowNextBtn');
    const resetBtn = document.getElementById('submissionFlowResetBtn');
    if (nextBtn) nextBtn.addEventListener('click', () => this.advance());
    if (resetBtn) resetBtn.addEventListener('click', () => this.reset());
  },

  advance() {
    const nodes = document.querySelectorAll('#submissionFlowContainer .flow-node');
    if (this.currentStep < nodes.length) {
      nodes[this.currentStep].classList.add('active-node');
      const descEl = document.getElementById('submissionFlowStatusText');
      if (descEl) {
        descEl.innerHTML = `<strong>Step ${this.currentStep + 1}:</strong> ${this.steps[this.currentStep].desc}`;
      }
      this.currentStep++;
    }
  },

  reset() {
    this.currentStep = 0;
    const nodes = document.querySelectorAll('#submissionFlowContainer .flow-node');
    nodes.forEach(n => n.classList.remove('active-node'));
    const descEl = document.getElementById('submissionFlowStatusText');
    if (descEl) {
      descEl.textContent = "Click 'Next Step' to step through the form submission lifecycle.";
    }
  }
};

// ==============================================================================
// 4. Interactive Working Student Registration Form Demo (Slide 22)
// ==============================================================================
const StudentRegistrationDemo = {
  form: {
    name: "",
    email: "",
    age: "",
    course: ""
  },
  errors: {},

  init() {
    const formEl = document.getElementById('demoStudentForm');
    const resetBtn = document.getElementById('demoResetBtn');

    if (formEl) {
      formEl.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.reset());
    }

    // Attach input listeners for live controlled input simulation
    ['demoName', 'demoEmail', 'demoAge', 'demoCourse'].forEach((id) => {
      const input = document.getElementById(id);
      if (input) {
        input.addEventListener('input', (e) => {
          const field = e.target.name;
          this.form[field] = e.target.value;
          this.updateLiveJson();
        });
      }
    });

    this.updateLiveJson();
  },

  validateForm() {
    const errors = {};

    // 1. Name validation
    if (!this.form.name.trim()) {
      errors.name = "Name is required";
    }

    // 2. Email validation (basic pattern)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.form.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailPattern.test(this.form.email.trim())) {
      errors.email = "Enter a valid email address (e.g. user@gmail.com)";
    }

    // 3. Age validation
    if (!this.form.age.trim()) {
      errors.age = "Age is required";
    } else if (isNaN(Number(this.form.age)) || Number(this.form.age) < 18) {
      errors.age = "Age must be at least 18";
    }

    // 4. Course validation
    if (!this.form.course.trim()) {
      errors.course = "Select a course";
    }

    return errors;
  },

  handleSubmit(e) {
    // Crucial: Prevent default form submission
    e.preventDefault();

    // Run validation
    this.errors = this.validateForm();

    // Render error messages
    this.renderErrors();

    const successCard = document.getElementById('demoSuccessCard');

    if (Object.keys(this.errors).length > 0) {
      if (successCard) successCard.classList.remove('visible');
      return;
    }

    // If no errors: show success card!
    if (successCard) {
      successCard.classList.add('visible');

      document.getElementById('resName').textContent = this.form.name.trim();
      document.getElementById('resEmail').textContent = this.form.email.trim();
      document.getElementById('resAge').textContent = this.form.age.trim();
      document.getElementById('resCourse').textContent = this.form.course.trim();
    }
  },

  renderErrors() {
    const fields = ['name', 'email', 'age', 'course'];
    fields.forEach((field) => {
      const errEl = document.getElementById(`err_${field}`);
      const inputEl = document.getElementById(`demo${field.charAt(0).toUpperCase() + field.slice(1)}`);

      if (errEl) {
        errEl.textContent = this.errors[field] || "";
      }

      if (inputEl) {
        if (this.errors[field]) {
          inputEl.classList.add('input-error');
        } else {
          inputEl.classList.remove('input-error');
        }
      }
    });
  },

  reset() {
    this.form = { name: "", email: "", age: "", course: "" };
    this.errors = {};

    const formEl = document.getElementById('demoStudentForm');
    if (formEl) formEl.reset();

    this.renderErrors();

    const successCard = document.getElementById('demoSuccessCard');
    if (successCard) successCard.classList.remove('visible');

    this.updateLiveJson();
  },

  updateLiveJson() {
    const jsonEl = document.getElementById('demoLiveStateJson');
    if (jsonEl) {
      jsonEl.textContent = JSON.stringify(this.form, null, 2);
    }
  }
};

// ==============================================================================
// 5. Interactive Component: Validation Decision Tree (Slide 20)
// ==============================================================================
function initDecisionDemo() {
  const triggerYesBtn = document.getElementById('simErrorBtn');
  const triggerNoBtn = document.getElementById('simValidBtn');
  const branchYes = document.getElementById('valBranchYes');
  const branchNo = document.getElementById('valBranchNo');

  if (triggerYesBtn && branchYes && branchNo) {
    triggerYesBtn.addEventListener('click', () => {
      branchYes.style.opacity = '1';
      branchYes.style.transform = 'scale(1.03)';
      branchNo.style.opacity = '0.35';
      branchNo.style.transform = 'scale(1)';
    });
  }

  if (triggerNoBtn && branchYes && branchNo) {
    triggerNoBtn.addEventListener('click', () => {
      branchNo.style.opacity = '1';
      branchNo.style.transform = 'scale(1.03)';
      branchYes.style.opacity = '0.35';
      branchYes.style.transform = 'scale(1)';
    });
  }
}

// ==============================================================================
// 6. Interactive Component: Module Linker Visualizer (Slide 29 & 37)
// ==============================================================================
const ModuleLinker = {
  descriptions: {
    header: "<strong>Header.jsx:</strong> Exports the Header component via <code>export default Header;</code>. It defines the top visual banner of the student application.",
    exportDefault: "<strong>export default:</strong> Marks this component as the primary export of the file. Other files can import it without curly braces.",
    importHeader: "<strong>import Header from './Header':</strong> Pulls in the default export. It can then be rendered in JSX as <code>&lt;Header /&gt;</code>.",
    app: "<strong>App.jsx:</strong> The root application component that imports both <code>Header</code> and <code>StudentForm</code> to assemble the complete UI.",
    studentForm: "<strong>StudentForm.jsx:</strong> Contains state management, controlled inputs, error state, and form validation logic.",
    validation: "<strong>utils/validation.js:</strong> Exports reusable pure JavaScript validation functions like <code>validateEmail(email)</code> and <code>validateAge(age)</code>."
  },

  init() {
    const boxes = document.querySelectorAll('.module-box');
    const panel = document.getElementById('moduleExplanationPanel');

    boxes.forEach((box) => {
      box.addEventListener('click', () => {
        boxes.forEach(b => b.classList.remove('active-module'));
        box.classList.add('active-module');
        const key = box.dataset.moduleKey;
        if (panel && this.descriptions[key]) {
          panel.innerHTML = this.descriptions[key];
        }
      });
    });
  }
};

// ==============================================================================
// 7. Interactive Component: Quick Quiz (Slide 39)
// ==============================================================================
function initQuiz() {
  document.querySelectorAll('.quiz-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.quiz-card');
      if (!card) return;
      const ans = card.querySelector('.quiz-ans');
      if (!ans) return;

      const isVisible = ans.classList.contains('visible');
      if (isVisible) {
        ans.classList.remove('visible');
        btn.textContent = 'Show Answer';
      } else {
        ans.classList.add('visible');
        btn.textContent = 'Hide Answer';
      }
    });
  });

  const revealAllBtn = document.getElementById('revealQuizAllBtn');
  const hideAllBtn = document.getElementById('hideQuizAllBtn');

  if (revealAllBtn) {
    revealAllBtn.addEventListener('click', () => {
      document.querySelectorAll('.quiz-ans').forEach(a => a.classList.add('visible'));
      document.querySelectorAll('.quiz-btn').forEach(b => b.textContent = 'Hide Answer');
    });
  }

  if (hideAllBtn) {
    hideAllBtn.addEventListener('click', () => {
      document.querySelectorAll('.quiz-ans').forEach(a => a.classList.remove('visible'));
      document.querySelectorAll('.quiz-btn').forEach(b => b.textContent = 'Show Answer');
    });
  }
}

// ==============================================================================
// Initialize on DOM Ready
// ==============================================================================
document.addEventListener('DOMContentLoaded', () => {
  Deck.init();
  initCodeCopy();
  SubmissionFlow.init();
  StudentRegistrationDemo.init();
  initDecisionDemo();
  ModuleLinker.init();
  initQuiz();
});
