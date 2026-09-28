/**
 * ==============================================================================
 * MongoDB Day 5 — Mongoose Schema Methods & Relationships
 * Interactive Presentation Engine & Simulation Studio
 * ==============================================================================
 */

// ==============================================================================
// 1. Master Presentation Deck Controller
// ==============================================================================
const Deck = {
  currentSlide: 1,
  totalSlides: 43,
  slides: [],
  topicMap: {
    1: "MongoDB Day 5 Introduction",
    2: "Learning Objectives",
    3: "What is a Schema Method?",
    4: "Why Use Schema Methods?",
    5: "Creating a Schema Method",
    6: "Using the Schema Method",
    7: "Understanding this Keyword",
    8: "Multiple Schema Methods",
    9: "Practical Schema Method Demo",
    10: "What is a Relationship?",
    11: "Why Do We Need Relationships?",
    12: "Types of Relationships",
    13: "One-to-One (1:1) Relationship",
    14: "One-to-One JSON Example",
    15: "One-to-One Mongoose Reference",
    16: "One-to-Many (1:N) Relationship",
    17: "One-to-Many Data Model",
    18: "Referencing in One-to-Many",
    19: "What is ObjectId Reference?",
    20: "What is Embedding?",
    21: "Defining an Embedded Schema",
    22: "When to Use Embedding",
    23: "What is Referencing?",
    24: "Embedding vs Referencing Side-by-Side",
    25: "When to Use Each Pattern",
    26: "Embedding vs Referencing Example",
    27: "What is populate()?",
    28: "How ref Enables populate()",
    29: "Creating Referenced Documents",
    30: "Reading Without populate()",
    31: "Reading With populate() Live Demo",
    32: "Populating Specific Fields",
    33: "Populating Multiple Documents",
    34: "populate() vs SQL JOIN",
    35: "Complete Mini Project Structure",
    36: "Complete Course Model",
    37: "Complete Student Model",
    38: "Complete Practical Flow (app.js)",
    39: "Complete Relationship Flow",
    40: "Common Beginner Mistakes",
    41: "Practical Classroom Assignment",
    42: "Day 5 Syntax Cheat Sheet",
    43: "Final Concept Map & Takeaways"
  },

  init() {
    this.slides = Array.from(document.querySelectorAll('.slide'));
    this.totalSlides = this.slides.length || 43;

    // Set total slides count in DOM
    const totalEl = document.getElementById('totalSlidesNum');
    if (totalEl) totalEl.textContent = this.totalSlides;

    // Build drawer index list
    this.buildTocDrawer();

    // Check URL hash for starting slide (e.g. #7)
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
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
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

        case 's':
        case 'S':
          e.preventDefault();
          const simModal = document.getElementById('simModal');
          if (simModal && simModal.classList.contains('active')) {
            Deck.closeModal('simModal');
          } else {
            Deck.openModal('simModal');
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
    const simBtn = document.getElementById('openSimBtn');
    if (simBtn) {
      simBtn.addEventListener('click', () => Deck.openModal('simModal'));
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
  // Slide 9: Schema Methods Interactive Tester
  getDocValues() {
    const name = document.getElementById('demoStudentName')?.value.trim() || "Rahul";
    const course = document.getElementById('demoStudentCourse')?.value.trim() || "MERN";
    const mark = parseInt(document.getElementById('demoStudentMark')?.value, 10) || 0;
    return { name, course, mark };
  },

  setOutput(text, color = "#00ED64") {
    const outEl = document.getElementById('demoMethodOutput');
    if (outEl) {
      outEl.style.color = color;
      outEl.innerHTML = text;
    }
  },

  runGetDetails() {
    const { name, course, mark } = this.getDocValues();
    // Simulate student.getDetails()
    const result = `${name} - ${course} - ${mark}`;
    this.setOutput(
      `<span>student.getDetails() &rarr; <strong>"${result}"</strong></span><br>` +
      `<span style="color: #64748B; font-size: 0.72rem;">Inside method: this.name="${name}", this.course="${course}", this.mark=${mark}</span>`
    );
  },

  runIsPassed() {
    const { name, mark } = this.getDocValues();
    const passed = mark >= 40;
    const color = passed ? "#00ED64" : "#FB7185";
    this.setOutput(
      `<span>student.isPassed() &rarr; <strong style="color: ${color};">${passed}</strong> (Mark: ${mark}, Passing: &gt;= 40)</span><br>` +
      `<span style="color: #64748B; font-size: 0.72rem;">Inside method: return this.mark &gt;= 40 (${mark} &gt;= 40 &rarr; ${passed})</span>`,
      color
    );
  },

  runGetResult() {
    const { name, mark } = this.getDocValues();
    const passed = mark >= 40;
    const result = passed ? "Passed" : "Failed";
    const color = passed ? "#00ED64" : "#FB7185";
    this.setOutput(
      `<span>student.getResult() &rarr; <strong style="color: ${color};">"${result}"</strong></span><br>` +
      `<span style="color: #64748B; font-size: 0.72rem;">Evaluated if(this.mark &gt;= 40) for student ${name}</span>`,
      color
    );
  },

  // Slide 31: Interactive Populate Demo
  togglePopulate(isPopulated) {
    const box = document.getElementById('popDemoResult');
    if (!box) return;

    if (isPopulated) {
      box.style.border = "1px solid var(--mongo-green)";
      box.style.boxShadow = "0 0 16px var(--mongo-green-glow)";
      box.innerHTML = `{\n  <span style="color: #E2E8F0;">"_id"</span>: <span style="color: #34D399;">"64abc201"</span>,\n  <span style="color: #E2E8F0;">"name"</span>: <span style="color: #34D399;">"Rahul"</span>,\n  <span style="color: #00ED64; font-weight: bold;">"course": {</span>\n    <span style="color: #E2E8F0;">"_id"</span>: <span style="color: #FBBF24;">"64abc101"</span>,\n    <span style="color: #E2E8F0;">"name"</span>: <span style="color: #34D399;">"MERN Stack"</span>,\n    <span style="color: #E2E8F0;">"duration"</span>: <span style="color: #FBBF24;">6</span>\n  <span style="color: #00ED64; font-weight: bold;">}</span>\n}`;
      Deck.showToast('.populate("course") resolved Course document!');
    } else {
      box.style.border = "1px solid var(--border-subtle)";
      box.style.boxShadow = "none";
      box.innerHTML = `{\n  <span style="color: #E2E8F0;">"_id"</span>: <span style="color: #34D399;">"64abc201"</span>,\n  <span style="color: #E2E8F0;">"name"</span>: <span style="color: #34D399;">"Rahul"</span>,\n  <span style="color: #FBBF24;">"course"</span>: ObjectId(<span style="color: #34D399;">"64abc101"</span>)\n}`;
      Deck.showToast('Reset to raw ObjectId reference.');
    }
  }
};

// ==============================================================================
// 3. Educational Simulator Studio (Modal 'S')
// ==============================================================================
const Sim = {
  courses: [],
  students: [],

  updateUI() {
    // Update counts
    const countsEl = document.getElementById('simCounts');
    if (countsEl) {
      countsEl.textContent = `Courses: ${this.courses.length} | Students: ${this.students.length}`;
    }

    // Render courses
    const courseList = document.getElementById('simCoursesList');
    if (courseList) {
      if (this.courses.length === 0) {
        courseList.innerHTML = `<div style="font-size: 0.75rem; color: var(--text-dim); font-style: italic;">No courses created yet. Click button 1.</div>`;
      } else {
        courseList.innerHTML = this.courses.map(c => `
          <div class="sim-card">
            <div style="display: flex; justify-content: space-between; color: var(--accent-cyan); font-weight: bold;">
              <span>${c.name}</span>
              <span style="color: var(--accent-amber); font-size: 0.7rem;">_id: ${c._id}</span>
            </div>
            <div style="color: var(--text-muted); font-size: 0.72rem;">Duration: ${c.duration} months</div>
          </div>
        `).join('');
      }
    }

    // Render students
    const studentList = document.getElementById('simStudentsList');
    if (studentList) {
      if (this.students.length === 0) {
        studentList.innerHTML = `<div style="font-size: 0.75rem; color: var(--text-dim); font-style: italic;">No students created yet. Click button 2.</div>`;
      } else {
        studentList.innerHTML = this.students.map(s => `
          <div class="sim-card" id="sim-student-${s._id}">
            <div style="display: flex; justify-content: space-between; color: var(--mongo-green); font-weight: bold;">
              <span>${s.name}</span>
              <span style="color: var(--text-dim); font-size: 0.7rem;">_id: ${s._id}</span>
            </div>
            <div style="color: var(--text-secondary); font-size: 0.72rem;">${s.email}</div>
            <div style="margin-top: 0.2rem; font-size: 0.7rem; color: var(--text-muted);">
              course: <span style="color: var(--accent-amber); background: rgba(251, 191, 36, 0.1); padding: 1px 4px; border-radius: 3px;">ObjectId("${s.course}")</span>
            </div>
          </div>
        `).join('');
      }
    }
  },

  setCode(code) {
    const codeEl = document.getElementById('simCodeDisplay');
    if (codeEl) codeEl.textContent = code;
  },

  setResult(resultText, isPopulated = false) {
    const resEl = document.getElementById('simResultDisplay');
    if (resEl) {
      resEl.textContent = resultText;
      if (isPopulated) {
        resEl.style.borderColor = "var(--mongo-green)";
        resEl.style.color = "var(--mongo-green)";
      } else {
        resEl.style.borderColor = "var(--border-subtle)";
        resEl.style.color = "#94A3B8";
      }
    }
  },

  createCourse() {
    if (this.courses.length > 0) {
      Deck.showToast('Course already created (MERN Stack).');
      return;
    }

    const course = {
      _id: "64a01c8f0001",
      name: "MERN Stack",
      duration: 6
    };
    this.courses.push(course);

    this.setCode(
`// Step 1: Create Course
const course = await Course.create({
  name: "MERN Stack",
  duration: 6
});`
    );

    this.setResult(
`Course Created Successfully:
${JSON.stringify(course, null, 2)}`
    );

    const badge = document.getElementById('simStatusBadge');
    if (badge) badge.textContent = "Course Created";

    this.updateUI();
    Deck.showToast('Course "MERN Stack" created with _id: 64a01c8f0001');
  },

  createStudent() {
    if (this.courses.length === 0) {
      Deck.showToast('Please create a Course first (Button 1)!');
      return;
    }
    if (this.students.length > 0) {
      Deck.showToast('Student already created.');
      return;
    }

    const courseId = this.courses[0]._id;
    const student = {
      _id: "64b02d9a0002",
      name: "Rahul",
      email: "rahul@gmail.com",
      course: courseId
    };
    this.students.push(student);

    this.setCode(
`// Step 2: Create Student linked to Course _id
const student = await Student.create({
  name: "Rahul",
  email: "rahul@gmail.com",
  course: "${courseId}" // 👈 Stored ObjectId reference
});`
    );

    this.setResult(
`Student Created Successfully:
${JSON.stringify(student, null, 2)}`
    );

    const badge = document.getElementById('simStatusBadge');
    if (badge) badge.textContent = "Student Linked to Course";

    this.updateUI();
    Deck.showToast('Student "Rahul" created and linked to Course!');
  },

  runSchemaMethod() {
    if (this.students.length === 0) {
      Deck.showToast('Please create a Student first (Button 2)!');
      return;
    }

    const s = this.students[0];
    // Schema method getStudentInfo()
    const methodResult = `${s.name} - ${s.email}`;

    this.setCode(
`// Step 3: Calling Schema Method
studentSchema.methods.getStudentInfo = function () {
  return \`\${this.name} - \${this.email}\`;
};

const output = student.getStudentInfo();`
    );

    this.setResult(
`Method Output (Evaluated on student instance):
"${methodResult}"`
    );

    const badge = document.getElementById('simStatusBadge');
    if (badge) badge.textContent = "Method Executed";

    Deck.showToast(`getStudentInfo() returned: "${methodResult}"`);
  },

  queryWithoutPopulate() {
    if (this.students.length === 0) {
      Deck.showToast('Please create a Student first (Button 2)!');
      return;
    }

    const rawStudent = { ...this.students[0] };

    this.setCode(
`// Step 4: Query WITHOUT populate
const student = await Student.findOne({ name: "Rahul" });

console.log(student.course); // Returns ObjectId only!`
    );

    this.setResult(
`Result Without populate():
${JSON.stringify(rawStudent, null, 2)}

Notice that 'course' contains only the reference ID ("${rawStudent.course}").
student.course.name is undefined!`
    );

    const badge = document.getElementById('simStatusBadge');
    if (badge) badge.textContent = "Raw Query (No populate)";

    Deck.showToast('Query returned raw student with ObjectId reference.');
  },

  queryWithPopulate() {
    if (this.students.length === 0) {
      Deck.showToast('Please create a Student first (Button 2)!');
      return;
    }

    const courseDoc = this.courses[0];
    const populatedStudent = {
      _id: this.students[0]._id,
      name: this.students[0].name,
      email: this.students[0].email,
      course: {
        _id: courseDoc._id,
        name: courseDoc.name,
        duration: courseDoc.duration
      }
    };

    this.setCode(
`// Step 5: Query WITH .populate("course")
const student = await Student.findOne({ name: "Rahul" })
  .populate("course");

console.log(student.course.name); // "${courseDoc.name}"`
    );

    this.setResult(
`Result WITH populate("course"):
${JSON.stringify(populatedStudent, null, 2)}

✨ Mongoose replaced the ObjectId with the full Course document!
student.course.name is now "${courseDoc.name}".`,
      true
    );

    // Add pulse glow to student card in UI
    const cardEl = document.getElementById(`sim-student-${this.students[0]._id}`);
    if (cardEl) {
      cardEl.classList.remove('pop-glow');
      void cardEl.offsetWidth; // trigger reflow
      cardEl.classList.add('pop-glow');
    }

    const badge = document.getElementById('simStatusBadge');
    if (badge) badge.textContent = "Populated Successfully!";

    Deck.showToast('Populated! Course document resolved into student.course.');
  },

  reset() {
    this.courses = [];
    this.students = [];
    this.updateUI();

    this.setCode('// Database reset to initial empty state.');
    this.setResult('Waiting for action...');

    const badge = document.getElementById('simStatusBadge');
    if (badge) badge.textContent = "Reset Done";

    Deck.showToast('Simulated database reset.');
  }
};

// ==============================================================================
// 4. Initialize Deck on DOM Loaded
// ==============================================================================
document.addEventListener('DOMContentLoaded', () => {
  Deck.init();
});
