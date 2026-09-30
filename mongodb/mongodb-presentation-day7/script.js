/**
 * ==============================================================================
 * MongoDB Day 7 — MongoDB Aggregation: $match, $group, $project, $sort
 * Interactive Presentation Engine & Demonstration Studio
 * ==============================================================================
 */

// ==============================================================================
// 1. Presentation Deck Controller
// ==============================================================================
const Deck = {
  currentSlide: 1,
  totalSlides: 45,
  slides: [],
  topicMap: {
    1: "MongoDB Aggregation — Title & Overview",
    2: "Learning Objectives",
    3: "Section 1 — What Is Aggregation?",
    4: "Why Do We Need Aggregation?",
    5: "Aggregation Use Cases",
    6: "Section 2 — What Is an Aggregation Pipeline?",
    7: "Pipeline Stages Run in Order",
    8: "Basic Aggregation Syntax",
    9: "Section 3 — What Is $match?",
    10: "$match Interactive Example",
    11: "$match With Query Conditions",
    12: "When to Use $match",
    13: "Section 4 — What Is $group?",
    14: "Understanding _id in $group",
    15: "Counting Documents with $sum: 1",
    16: "$sum With Numeric Values",
    17: "Calculating Averages with $avg",
    18: "Finding Extremes: $min and $max",
    19: "Section 5 — What Is $project?",
    20: "Include and Exclude Fields (1 and 0)",
    21: "Renaming Fields with $project",
    22: "Creating Calculated Fields with $project",
    23: "Section 6 — What Is $sort?",
    24: "$sort Interactive Example",
    25: "Sorting by Multiple Fields",
    26: "Section 7 — Why Combine Stages?",
    27: "Complete Pipeline Example",
    28: "Understand Pipeline Step-by-Step",
    29: "Section 8 — Real-World Example 1: Course Statistics",
    30: "Real-World Example 2: Top Students",
    31: "Real-World Example 3: E-Commerce Sales",
    32: "Real-World Example 4: Revenue Report",
    33: "Real-World Example 5: Filter + Group + Sort",
    34: "Section 9 — Aggregation with Mongoose",
    35: "Aggregation vs. find()",
    36: "Important Aggregation Note (Plain JS Objects)",
    37: "Section 10 — Practical Mini Project",
    38: "Project Structure (mongodb-day7)",
    39: "Practical Aggregation Solution",
    40: "Expected Analytics Result",
    41: "Section 11 — Common Beginner Mistakes",
    42: "Quick Classroom Quiz (10 Questions)",
    43: "Aggregation Cheat Sheet",
    44: "Final Concept Map",
    45: "Summary & Key Takeaways"
  },

  init() {
    this.slides = Array.from(document.querySelectorAll('.slide'));
    this.totalSlides = this.slides.length || 45;

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
      else if (i <= 5) sectionBadge = 'Sec 1';
      else if (i <= 8) sectionBadge = 'Sec 2';
      else if (i <= 12) sectionBadge = '$match';
      else if (i <= 18) sectionBadge = '$group';
      else if (i <= 22) sectionBadge = '$project';
      else if (i <= 25) sectionBadge = '$sort';
      else if (i <= 28) sectionBadge = 'Chaining';
      else if (i <= 33) sectionBadge = 'Examples';
      else if (i <= 36) sectionBadge = 'Mongoose';
      else if (i <= 40) sectionBadge = 'Project';
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
      // Ignore if focus is in an input or textarea
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
// 2. Interactive Demo 1: $match Demo (Slide 10)
// ==============================================================================
const DemoMatch = {
  students: [
    { name: "Rahul", course: "MERN", mark: 85 },
    { name: "Arun", course: "Python", mark: 72 },
    { name: "Akhil", course: "MERN", mark: 90 },
    { name: "Neha", course: "Java", mark: 95 }
  ],
  selectedCourse: "MERN",

  setCourse(course) {
    this.selectedCourse = course;

    // Update active button styling
    const btns = {
      'MERN': 'filterMernBtn',
      'Python': 'filterPythonBtn',
      'Java': 'filterJavaBtn',
      'ALL': 'filterAllBtn'
    };

    Object.keys(btns).forEach(key => {
      const btnEl = document.getElementById(btns[key]);
      if (btnEl) {
        if (key === course) {
          btnEl.className = 'demo-btn active';
        } else {
          btnEl.className = 'demo-btn secondary';
        }
      }
    });

    this.run();
  },

  run() {
    let filtered = [];
    if (this.selectedCourse === 'ALL') {
      filtered = [...this.students];
    } else {
      filtered = this.students.filter(s => s.course === this.selectedCourse);
    }

    // Update output table
    const outputTable = document.getElementById('matchOutputTable');
    const countEl = document.getElementById('matchResultCount');
    if (countEl) countEl.textContent = filtered.length;

    if (outputTable) {
      if (filtered.length === 0) {
        outputTable.innerHTML = `<tr><td colspan="2" style="text-align: center; color: var(--text-muted);">No documents matched</td></tr>`;
      } else {
        outputTable.innerHTML = filtered.map(s => {
          let badgeClass = s.course === 'MERN' ? 'green' : (s.course === 'Python' ? 'cyan' : 'amber');
          return `<tr>
            <td><strong>${s.name}</strong></td>
            <td><span class="pill-badge ${badgeClass}">${s.course}</span></td>
          </tr>`;
        }).join('');
      }
    }
  }
};

// ==============================================================================
// 3. Interactive Demo 2: $sort Demo (Slide 24)
// ==============================================================================
const DemoSort = {
  students: [
    { name: "Neha", mark: 95 },
    { name: "Rahul", mark: 85 },
    { name: "Akhil", mark: 80 },
    { name: "Arun", mark: 72 }
  ],
  direction: -1, // -1 is descending (highest to lowest), 1 is ascending

  setDirection(dir) {
    this.direction = dir;

    const descBtn = document.getElementById('sortDescBtn');
    const ascBtn = document.getElementById('sortAscBtn');

    if (dir === -1) {
      if (descBtn) descBtn.className = 'demo-btn active';
      if (ascBtn) ascBtn.className = 'demo-btn secondary';
    } else {
      if (descBtn) descBtn.className = 'demo-btn secondary';
      if (ascBtn) ascBtn.className = 'demo-btn active';
    }

    this.run();
  },

  run() {
    const sorted = [...this.students].sort((a, b) => {
      return this.direction === -1 ? b.mark - a.mark : a.mark - b.mark;
    });

    const outputTable = document.getElementById('sortOutputTable');
    if (outputTable) {
      outputTable.innerHTML = sorted.map((s, idx) => {
        let badgeClass = s.mark >= 85 ? 'green' : (s.mark >= 80 ? 'cyan' : 'amber');
        return `<tr>
          <td><span style="font-family: var(--font-mono); color: var(--text-muted);">${idx + 1}</span></td>
          <td><strong>${s.name}</strong></td>
          <td><span class="pill-badge ${badgeClass}">${s.mark}</span></td>
        </tr>`;
      }).join('');
    }
  }
};

// ==============================================================================
// 4. Interactive Demo 3: Pipeline Step-by-Step (Slide 28)
// ==============================================================================
const DemoPipeline = {
  currentStep: 0,
  steps: [
    {
      step: 0,
      tag: "Stage 0 of 4",
      title: "Raw Student Collection",
      count: "100 Documents",
      desc: "All raw documents residing in MongoDB. Contains un-aggregated students across MERN, Python, Java, and other batches.",
      output: `[
  { "name": "Rahul", "course": "MERN", "mark": 85 },
  { "name": "Arun", "course": "Python", "mark": 72 },
  { "name": "Akhil", "course": "MERN", "mark": 90 },
  { "name": "Neha", "course": "Java", "mark": 95 },
  ... 96 more documents
]`
    },
    {
      step: 1,
      tag: "Stage 1: $match",
      title: "$match: { course: 'MERN' }",
      count: "60 Documents",
      desc: "Filters out Python, Java, and all other non-MERN documents early. Only the 60 MERN students proceed to Stage 2.",
      output: `[
  { "name": "Rahul", "course": "MERN", "mark": 85 },
  { "name": "Akhil", "course": "MERN", "mark": 90 },
  { "name": "Vikram", "course": "MERN", "mark": 78 },
  ... 57 more MERN documents
]`
    },
    {
      step: 2,
      tag: "Stage 2: $group",
      title: "$group: { _id: '$course', avg: { $avg: '$mark' }, total: { $sum: 1 } }",
      count: "1 Group Document",
      desc: "Combines all 60 MERN records into a single group document and calculates the average mark (84.5) and total student count (60).",
      output: `[
  {
    "_id": "MERN",
    "averageMark": 84.5,
    "totalStudents": 60
  }
]`
    },
    {
      step: 3,
      tag: "Stage 3: $project",
      title: "$project: { _id: 0, course: '$_id', averageMark: 1, totalStudents: 1 }",
      count: "1 Clean Document",
      desc: "Reshapes the document. Suppresses the default '_id' and maps '$_id' to the friendly 'course' key name.",
      output: `[
  {
    "course": "MERN",
    "averageMark": 84.5,
    "totalStudents": 60
  }
]`
    },
    {
      step: 4,
      tag: "Stage 4: $sort",
      title: "$sort: { averageMark: -1 }",
      count: "Final Sorted Output",
      desc: "Ensures results are ordered with highest average scores first. Ready to be sent straight to the dashboard frontend!",
      output: `[
  {
    "course": "MERN",
    "averageMark": 84.5,
    "totalStudents": 60
  }
]`
    }
  ],

  setStep(stepIndex) {
    this.currentStep = stepIndex;
    const stepData = this.steps[stepIndex];
    if (!stepData) return;

    // Update active button state
    for (let i = 0; i <= 4; i++) {
      const btn = document.getElementById(`pipeStep${i}Btn`);
      if (btn) {
        btn.className = (i === stepIndex) ? 'demo-btn active' : 'demo-btn secondary';
      }
    }

    // Update Step Card
    const tagEl = document.getElementById('pipeStepTag');
    const countEl = document.getElementById('pipeDocCount');
    const titleEl = document.getElementById('pipeStepTitle');
    const descEl = document.getElementById('pipeStepDesc');
    const outputEl = document.getElementById('pipeStepOutput');

    if (tagEl) tagEl.textContent = stepData.tag;
    if (countEl) countEl.textContent = stepData.count;
    if (titleEl) titleEl.textContent = stepData.title;
    if (descEl) descEl.textContent = stepData.desc;
    if (outputEl) outputEl.textContent = stepData.output;
  },

  nextStep() {
    const next = (this.currentStep + 1) % this.steps.length;
    this.setStep(next);
  }
};

// ==============================================================================
// 5. Interactive Quiz Helper (Slide 42)
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
// 6. Application Startup
// ==============================================================================
document.addEventListener('DOMContentLoaded', () => {
  Deck.init();
});
