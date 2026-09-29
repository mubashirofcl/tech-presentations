/**
 * ==============================================================================
 * MongoDB Day 6 — Mongoose Middleware: Pre/Post Hooks, Validation & Timestamps
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
    1: "Day 6 Title & Overview",
    2: "Learning Objectives",
    3: "Section 1 — What Is Mongoose Middleware?",
    4: "Section 2 — What Is a Pre Hook?",
    5: "Understanding pre() Syntax",
    6: "Why Use Pre Hooks?",
    7: "Pre Save Hook Example (Trimming)",
    8: "What Is 'this' in a Pre Save Hook?",
    9: "Pre Hook Execution Flow Diagram",
    10: "Section 3 — What Is a Post Hook?",
    11: "Pre vs Post Hooks Comparison",
    12: "Post Save Hook Example",
    13: "Pre + Post Hooks Working Together",
    14: "Section 4 — What Is Validation?",
    15: "Built-in vs Custom Validation",
    16: "Validation Middleware & Decision Flow",
    17: "How next() Works (Continue vs Error)",
    18: "Complete Validation Example",
    19: "Important Validation Best Practice",
    20: "Section 5 — What Are Timestamps?",
    21: "Enabling Timestamps (timestamps: true)",
    22: "Example Timestamp Data in MongoDB",
    23: "Why Are Timestamps Useful?",
    24: "Custom Timestamp Field Names",
    25: "Section 6 — Mini Project: Student Management",
    26: "Project Structure (mongoose-day6)",
    27: "Student Schema Definition",
    28: "Adding Pre Hook to Student Model",
    29: "Adding Post Hook to Student Model",
    30: "Complete Student Model (Student.js)",
    31: "Creating a Student & Lifecycle Flow",
    32: "Timestamp Behavior: Interactive Timeline",
    33: "Section 7 — Complete Mongoose Execution Flow",
    34: "Pre vs Post vs Validation vs Timestamps Matrix",
    35: "Common Beginner Mistakes & Solutions",
    36: "Practical Hands-on Exercise",
    37: "Quick Classroom Quiz (10 Questions)",
    38: "Final Syntax Cheat Sheet",
    39: "Interactive Concept Map",
    40: "Summary & Key Takeaways"
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
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

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
// 3. Interactive Component: Pre Hook Flow Stepper (Slide 9)
// ==============================================================================
const PreHookFlow = {
  currentStep: 0,
  steps: [
    { title: "Student Data", desc: "User passes { name: '  Rahul  ', email: 'rahul@gmail.com' }" },
    { title: "student.save()", desc: "Mongoose begins document save lifecycle" },
    { title: "pre('save')", desc: "Pre-save middleware intercepts operation" },
    { title: "Custom Logic", desc: "this.name = this.name.trim() executes" },
    { title: "next()", desc: "Signals hook completion without errors" },
    { title: "MongoDB Save", desc: "Cleaned data written to MongoDB collection" }
  ],

  init() {
    const nextBtn = document.getElementById('flowNextBtn');
    const resetBtn = document.getElementById('flowResetBtn');
    if (nextBtn) nextBtn.addEventListener('click', () => this.advance());
    if (resetBtn) resetBtn.addEventListener('click', () => this.reset());
  },

  advance() {
    const nodes = document.querySelectorAll('#preHookFlowContainer .flow-node');
    if (this.currentStep < nodes.length) {
      nodes[this.currentStep].classList.add('active-node');
      const descEl = document.getElementById('flowStatusText');
      if (descEl) {
        descEl.innerHTML = `<strong>Step ${this.currentStep + 1}:</strong> ${this.steps[this.currentStep].desc}`;
      }
      this.currentStep++;
    }
  },

  reset() {
    this.currentStep = 0;
    const nodes = document.querySelectorAll('#preHookFlowContainer .flow-node');
    nodes.forEach(n => n.classList.remove('active-node'));
    const descEl = document.getElementById('flowStatusText');
    if (descEl) {
      descEl.textContent = "Click 'Next Step' to step through the pre-save lifecycle.";
    }
  }
};

// ==============================================================================
// 4. Interactive Component: Validation Decision & Student Demo (Slide 16 / 18)
// ==============================================================================
function initValidationDemo() {
  const runBtn = document.getElementById('runValBtn');
  const nameInput = document.getElementById('valNameInput');
  const markInput = document.getElementById('valMarkInput');
  const resultBox = document.getElementById('valResultBox');
  const noBranch = document.getElementById('valBranchNo');
  const yesBranch = document.getElementById('valBranchYes');

  if (!runBtn) return;

  runBtn.addEventListener('click', () => {
    const name = nameInput ? nameInput.value.trim() : "Rahul";
    const markStr = markInput ? markInput.value.trim() : "";
    const mark = parseFloat(markStr);

    if (isNaN(mark)) {
      resultBox.className = 'demo-result-box res-error';
      resultBox.innerHTML = `⚠️ <strong>Error:</strong> Please enter a valid numerical mark.`;
      if (noBranch) noBranch.style.opacity = '1';
      if (yesBranch) yesBranch.style.opacity = '0.35';
      return;
    }

    // Validation condition: mark < 0 || mark > 100
    if (mark < 0 || mark > 100) {
      resultBox.className = 'demo-result-box res-error';
      resultBox.innerHTML = `
        ❌ <strong>Validation failed:</strong> Mark (${mark}) is invalid! Rejected by <code>next(new Error("Mark must be between 0 and 100"))</code>. Document NOT saved.
      `;
      if (noBranch) noBranch.style.opacity = '1';
      if (yesBranch) yesBranch.style.opacity = '0.35';
    } else {
      resultBox.className = 'demo-result-box res-success';
      resultBox.innerHTML = `
        ✅ <strong>Validation passed:</strong> Student "${name}" with mark (${mark}) passed validation. <code>next()</code> called &rarr; document saved to MongoDB!
      `;
      if (yesBranch) yesBranch.style.opacity = '1';
      if (noBranch) noBranch.style.opacity = '0.35';
    }
  });

  const resetBtn = document.getElementById('resetValBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (nameInput) nameInput.value = "Rahul";
      if (markInput) markInput.value = "85";
      if (resultBox) {
        resultBox.className = 'demo-result-box';
        resultBox.textContent = "Enter student details and click 'Run Validation' to test the middleware.";
      }
      if (noBranch) noBranch.style.opacity = '0.8';
      if (yesBranch) yesBranch.style.opacity = '0.8';
    });
  }
}

// ==============================================================================
// 5. Interactive Component: Timestamp Timeline Simulator (Slide 22 / 32)
// ==============================================================================
const TimestampDemo = {
  createdTime: "2026-09-29T10:00:00.000Z",
  updatedTime: "2026-09-29T10:00:00.000Z",
  mark: 85,

  init() {
    const updateBtn = document.getElementById('simUpdateTimestampBtn');
    const resetBtn = document.getElementById('simResetTimestampBtn');

    if (updateBtn) updateBtn.addEventListener('click', () => this.simulateUpdate());
    if (resetBtn) resetBtn.addEventListener('click', () => this.reset());
  },

  simulateUpdate() {
    // Generate new current timestamp
    const now = new Date().toISOString();
    this.updatedTime = now;
    this.mark = 92;

    const afterDocEl = document.getElementById('timelineAfterDoc');
    const noteEl = document.getElementById('timestampNote');

    if (afterDocEl) {
      afterDocEl.innerHTML = `
{
  "_id": "673f8a19b4e2f90a12",
  "name": "Rahul",
  "email": "rahul@gmail.com",
  "mark": <span class="highlight-changed">92</span>,
  "course": "MERN",
  "createdAt": "<span class="highlight-same">${this.createdTime}</span>",  <span class="comment">// 🔒 UNCHANGED</span>
  "updatedAt": "<span class="highlight-changed">${this.updatedTime}</span>"   <span class="comment">// ⚡ UPDATED JUST NOW</span>
}
      `;
    }

    if (noteEl) {
      noteEl.className = 'callout callout-blue';
      noteEl.innerHTML = `
        <span class="callout-icon">⚡</span>
        <div>
          <strong>Document Updated Successfully!</strong> Notice that <code>createdAt</code> remained <strong>completely frozen</strong> at <code>10:00:00Z</code>, while <code>updatedAt</code> was automatically refreshed by Mongoose to <code>${now.split('T')[1].slice(0, 8)}Z</code>.
        </div>
      `;
    }
  },

  reset() {
    this.mark = 85;
    this.updatedTime = this.createdTime;

    const afterDocEl = document.getElementById('timelineAfterDoc');
    const noteEl = document.getElementById('timestampNote');

    if (afterDocEl) {
      afterDocEl.innerHTML = `
{
  "_id": "673f8a19b4e2f90a12",
  "name": "Rahul",
  "email": "rahul@gmail.com",
  "mark": 85,
  "course": "MERN",
  "createdAt": "<span class="highlight-same">${this.createdTime}</span>",
  "updatedAt": "<span class="highlight-same">${this.updatedTime}</span>"
}
      `;
    }

    if (noteEl) {
      noteEl.className = 'callout';
      noteEl.innerHTML = `
        <span class="callout-icon">💡</span>
        <div>Click the button above to simulate <code>student.mark = 92; await student.save();</code> and watch <code>updatedAt</code> refresh automatically.</div>
      `;
    }
  }
};

// ==============================================================================
// 6. Interactive Component: Quick Quiz (Slide 37)
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
// 7. Interactive Component: Concept Map (Slide 39)
// ==============================================================================
const ConceptMap = {
  details: {
    mongoose: "<strong>Mongoose Middleware & Timestamps Core:</strong> Extends MongoDB document lifecycle with interception hooks, data validation gates, and automatic auditing timestamps.",
    pre: "<strong>Pre Hook (schema.pre):</strong> Executes BEFORE the targeted operation (e.g. 'save'). Allows trimming strings, hashing passwords, generating slugs, and custom validation. Requires <code>next()</code> to continue or pass an error.",
    post: "<strong>Post Hook (schema.post):</strong> Executes AFTER the operation completes. Receives the saved document <code>doc</code> as its first parameter. Used for post-save logging, notifications, and event triggers.",
    validation: "<strong>Middleware Validation:</strong> Uses pre-save hooks to verify compound conditions. If invalid, calls <code>next(new Error(...))</code> to immediately halt execution and prevent writing bad data to MongoDB.",
    timestamps: "<strong>Timestamps ({ timestamps: true }):</strong> Automatically injects and manages <code>createdAt</code> (immutable creation timestamp) and <code>updatedAt</code> (refreshed on every modification)."
  },

  init() {
    const panel = document.getElementById('mapDetailPanel');
    const branches = document.querySelectorAll('.map-branch-card, .map-root');

    branches.forEach((card) => {
      card.addEventListener('click', () => {
        branches.forEach(b => b.classList.remove('active-map'));
        card.classList.add('active-map');
        const key = card.dataset.mapKey;
        if (panel && this.details[key]) {
          panel.innerHTML = this.details[key];
        }
      });
    });
  }
};

// ==============================================================================
// Initialization on DOM Ready
// ==============================================================================
document.addEventListener('DOMContentLoaded', () => {
  Deck.init();
  initCodeCopy();
  PreHookFlow.init();
  initValidationDemo();
  TimestampDemo.init();
  initQuiz();
  ConceptMap.init();
});
