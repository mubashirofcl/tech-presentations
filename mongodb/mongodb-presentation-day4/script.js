/**
 * ==============================================================================
 * MongoDB Day 4 — CRUD Operations Using Mongoose
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
    3: "CRUD Fundamentals",
    4: "Day 3 Quick Revision",
    5: "Project Structure",
    6: "Student Schema & Model",
    7: "CRUD Overview",
    8: "CREATE — create()",
    9: "CREATE — Flow Diagram",
    10: "CREATE — new Model() + save()",
    11: "CREATE — insertMany()",
    12: "READ — Overview",
    13: "READ — find()",
    14: "READ — find() with Filter",
    15: "READ — findOne()",
    16: "READ — findById()",
    17: "READ — Field Selection (.select)",
    18: "UPDATE — Overview",
    19: "UPDATE — updateOne()",
    20: "UPDATE — $set Operator",
    21: "UPDATE — updateMany()",
    22: "UPDATE — findOneAndUpdate()",
    23: "UPDATE — findByIdAndUpdate()",
    24: "UPDATE — Validation (runValidators)",
    25: "DELETE — Overview",
    26: "DELETE — deleteOne()",
    27: "DELETE — deleteMany()",
    28: "DELETE — findOneAndDelete()",
    29: "DELETE — findByIdAndDelete()",
    30: "CRUD Method Cheat Sheet",
    31: "MongoDB Shell vs Mongoose",
    32: "Complete CRUD Program (app.js)",
    33: "Interactive CRUD Data Flow",
    34: "Common Beginner Mistakes",
    35: "Practical Classroom Exercise",
    36: "Final Summary & Mental Model"
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

    // Attach global keyboard listeners
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
    if (nextBtn) {
      if (this.currentSlide === this.totalSlides) {
        nextBtn.disabled = true;
      } else {
        nextBtn.disabled = false;
      }
    }

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

  // Interactive CRUD Data Flow Widget on Slide 33
  setFlow(type, tabBtn) {
    // Update active tab buttons
    const tabs = document.querySelectorAll('.flow-tab-btn');
    tabs.forEach(t => t.classList.remove('active'));
    if (tabBtn) tabBtn.classList.add('active');

    const descNode = document.getElementById('stage-node-desc');
    const descModel = document.getElementById('stage-model-desc');
    const descMongo = document.getElementById('stage-mongo-desc');
    const descColl = document.getElementById('stage-coll-desc');
    const arrow1 = document.getElementById('flow-arrow-1');
    const arrow2 = document.getElementById('flow-arrow-2');
    const arrow3 = document.getElementById('flow-arrow-3');
    const summaryBox = document.getElementById('flowSummaryBox');
    const summaryText = document.getElementById('flowSummaryText');

    if (!summaryBox || !summaryText) return;

    if (type === 'create') {
      arrow1.innerHTML = '&rarr;';
      arrow2.innerHTML = '&rarr;';
      arrow3.innerHTML = '&rarr;';
      arrow1.style.color = 'var(--mongo-green)';
      arrow2.style.color = 'var(--mongo-green)';
      arrow3.style.color = 'var(--mongo-green)';
      descNode.innerText = "Student.create({ name: 'Rahul' })";
      descModel.innerText = "Runs schema validation";
      descMongo.innerText = "Writes BSON document";
      descColl.innerText = "Stored in students collection";
      summaryBox.className = "callout callout-blue";
      summaryText.innerHTML = "<strong>CREATE Flow:</strong> Data moves forward from Node.js &rarr; Model Validation &rarr; MongoDB Storage &rarr; Document Stored with generated <code>_id</code>.";
    } else if (type === 'read') {
      arrow1.innerHTML = '&larr;';
      arrow2.innerHTML = '&larr;';
      arrow3.innerHTML = '&larr;';
      arrow1.style.color = 'var(--accent-cyan)';
      arrow2.style.color = 'var(--accent-cyan)';
      arrow3.style.color = 'var(--accent-cyan)';
      descNode.innerText = "Receives [ { student } ] array";
      descModel.innerText = "Hydrates BSON into Mongoose Doc";
      descMongo.innerText = "Performs collection query";
      descColl.innerText = "Matches { course: 'MERN' }";
      summaryBox.className = "callout callout-blue";
      summaryText.innerHTML = "<strong>READ Flow:</strong> Filter sent &rarr; Collection scanned &rarr; Matching records fetched &rarr; Streamed back to Node.js as an array or object.";
    } else if (type === 'update') {
      arrow1.innerHTML = '&harr;';
      arrow2.innerHTML = '&harr;';
      arrow3.innerHTML = '&harr;';
      arrow1.style.color = 'var(--accent-amber)';
      arrow2.style.color = 'var(--accent-amber)';
      arrow3.style.color = 'var(--accent-amber)';
      descNode.innerText = "Student.findOneAndUpdate(...)";
      descModel.innerText = "runValidators checks rules";
      descMongo.innerText = "Applies $set modification";
      descColl.innerText = "Document updated, returns doc";
      summaryBox.className = "callout callout-amber";
      summaryText.innerHTML = "<strong>UPDATE Flow:</strong> Filter + changes sent &rarr; Target matched &rarr; Fields modified &rarr; If <code>{ new: true }</code>, updated document is returned to Node.js.";
    } else if (type === 'delete') {
      arrow1.innerHTML = '&rarr;';
      arrow2.innerHTML = '&rarr;';
      arrow3.innerHTML = '&cross;';
      arrow1.style.color = 'var(--accent-rose)';
      arrow2.style.color = 'var(--accent-rose)';
      arrow3.style.color = 'var(--accent-rose)';
      descNode.innerText = "Student.findOneAndDelete(...)";
      descModel.innerText = "Model triggers delete command";
      descMongo.innerText = "Removes BSON from storage";
      descColl.innerText = "Document permanently erased";
      summaryBox.className = "callout callout-rose";
      summaryText.innerHTML = "<strong>DELETE Flow:</strong> Filter sent &rarr; Target identified &rarr; Record permanently expunged &rarr; Deleted document object returned.";
    }
  },

  // Attach DOM Event Listeners
  attachEvents() {
    // Header Buttons
    const openSimBtn = document.getElementById('openSimBtn');
    if (openSimBtn) openSimBtn.addEventListener('click', () => this.openModal('simModal'));

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
      // If user is typing in any input or textarea, ignore
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
// 2. Interactive CRUD Simulator Engine (Frontend Educational Sandbox)
// ==============================================================================
const Sim = {
  // Simulated Collection in Memory
  collection: [],

  init() {
    this.render();
  },

  createStudent() {
    // Check if Rahul already exists
    const existing = this.collection.find(s => s.email === 'rahul@gmail.com');
    if (existing) {
      this.updateTerminal(
        `// Mongoose Duplicate Key Error Simulation\n` +
        `await Student.create({\n  name: "Rahul",\n  email: "rahul@gmail.com"\n});`,
        `<span style="color: var(--accent-rose);">MongoServerError: E11000 duplicate key error collection: collegeDB.students index: email_1 dup key: { email: "rahul@gmail.com" }</span>`,
        'Duplicate Key Error'
      );
      Deck.showToast('Validation Error: Email already exists!');
      return;
    }

    const newStudent = {
      _id: "66f81a7b8e3d09a12c84ef11",
      name: "Rahul",
      email: "rahul@gmail.com",
      age: 21,
      course: "MERN",
      mark: 85,
      active: true,
      __v: 0,
      _status: 'created'
    };

    this.collection.push(newStudent);
    this.render();

    this.updateTerminal(
      `const student = await Student.create({\n` +
      `  name: "Rahul",\n` +
      `  email: "rahul@gmail.com",\n` +
      `  age: 21,\n` +
      `  course: "MERN",\n` +
      `  mark: 85\n` +
      `});\nconsole.log(student);`,
      JSON.stringify(newStudent, null, 2),
      'Student Created Successfully'
    );

    Deck.showToast('CREATE: Student Rahul inserted into collection!');
  },

  readStudents() {
    if (this.collection.length === 0) {
      this.updateTerminal(
        `const students = await Student.find();\nconsole.log(students);`,
        `[] // Empty array. No documents in collection.`,
        'Collection is empty'
      );
      Deck.showToast('READ: Collection is currently empty.');
      return;
    }

    this.render();

    this.updateTerminal(
      `const students = await Student.find();\nconsole.log(students);`,
      JSON.stringify(this.collection.map(({ _status, ...rest }) => rest), null, 2),
      `Retrieved ${this.collection.length} Document(s)`
    );

    Deck.showToast(`READ: Found ${this.collection.length} student document(s)!`);
  },

  updateStudent() {
    const student = this.collection.find(s => s.email === 'rahul@gmail.com');
    if (!student) {
      this.updateTerminal(
        `const student = await Student.findOneAndUpdate(\n` +
        `  { email: "rahul@gmail.com" },\n` +
        `  { mark: 95 },\n` +
        `  { new: true }\n` +
        `);`,
        `null // No student found with email: rahul@gmail.com`,
        'Student not found'
      );
      Deck.showToast('UPDATE: Rahul not found! Click CREATE first.');
      return;
    }

    const previousMark = student.mark;
    student.mark = (previousMark === 85) ? 95 : 85; // toggle between 85 and 95
    student._status = 'updated';
    student._prevMark = previousMark;

    this.render();

    this.updateTerminal(
      `const updatedStudent = await Student.findOneAndUpdate(\n` +
      `  { email: "rahul@gmail.com" },\n` +
      `  { mark: ${student.mark} },\n` +
      `  { new: true, runValidators: true }\n` +
      `);\nconsole.log(updatedStudent);`,
      JSON.stringify({
        _id: student._id,
        name: student.name,
        email: student.email,
        course: student.course,
        mark: student.mark,
        active: student.active
      }, null, 2),
      `Updated mark: ${previousMark} → ${student.mark}`
    );

    Deck.showToast(`UPDATE: Rahul's mark updated to ${student.mark}!`);
  },

  deleteStudent() {
    const index = this.collection.findIndex(s => s.email === 'rahul@gmail.com');
    if (index === -1) {
      this.updateTerminal(
        `const deleted = await Student.findOneAndDelete({\n  email: "rahul@gmail.com"\n});`,
        `null // No document found to delete.`,
        'Student not found'
      );
      Deck.showToast('DELETE: Rahul is not in the collection.');
      return;
    }

    const deletedDoc = { ...this.collection[index] };
    delete deletedDoc._status;

    // Trigger visual fadeout animation before removal
    const cardEl = document.querySelector(`[data-id="${deletedDoc._id}"]`);
    if (cardEl) {
      cardEl.classList.add('deleted');
    }

    setTimeout(() => {
      this.collection.splice(index, 1);
      this.render();
    }, 450);

    this.updateTerminal(
      `const deletedStudent = await Student.findOneAndDelete({\n` +
      `  email: "rahul@gmail.com"\n` +
      `});\nconsole.log("Deleted:", deletedStudent);`,
      JSON.stringify(deletedDoc, null, 2),
      'Student Removed from Collection'
    );

    Deck.showToast('DELETE: Student Rahul removed from collection!');
  },

  reset() {
    this.collection = [];
    this.render();
    this.updateTerminal(
      `// Simulated MongoDB students collection reset\nawait Student.deleteMany({});`,
      `{ acknowledged: true, deletedCount: 0 }`,
      'Simulation Reset'
    );
    Deck.showToast('Simulator reset: collection cleared.');
  },

  updateTerminal(code, result, status) {
    const codeEl = document.getElementById('simCodeDisplay');
    const resultEl = document.getElementById('simResultDisplay');
    const statusEl = document.getElementById('simStatusTag');

    if (codeEl) {
      codeEl.innerHTML = `<pre style="margin:0; font-family: var(--font-mono); white-space:pre-wrap;">${this.escapeHtml(code)}</pre>`;
    }
    if (resultEl) {
      resultEl.innerHTML = `<pre style="margin:0; font-family: var(--font-mono); color: var(--mongo-green); white-space:pre-wrap;">${result}</pre>`;
    }
    if (statusEl) {
      statusEl.textContent = status;
      statusEl.style.color = 'var(--mongo-green)';
    }
  },

  render() {
    const container = document.getElementById('simCollectionContainer');
    const countEl = document.getElementById('simDocCount');
    if (countEl) countEl.textContent = `Documents: ${this.collection.length}`;
    if (!container) return;

    if (this.collection.length === 0) {
      container.innerHTML = `
        <div style="padding: 2rem 1rem; text-align: center; color: var(--text-dim); font-size: 0.82rem; font-family: var(--font-mono); border: 1px dashed var(--border-subtle); border-radius: var(--radius-sm);">
          (students collection is currently empty)<br>
          <span style="font-size: 0.72rem; color: var(--text-muted); margin-top: 0.35rem; display: block;">
            Click <strong>[+ CREATE (Rahul)]</strong> above to add the first document!
          </span>
        </div>
      `;
      return;
    }

    container.innerHTML = '';
    this.collection.forEach((student) => {
      const card = document.createElement('div');
      card.className = `student-card ${student._status || ''}`;
      card.setAttribute('data-id', student._id);

      let markDisplay = `<span style="color: var(--text-primary);">${student.mark}</span>`;
      if (student._status === 'updated' && student._prevMark !== undefined) {
        markDisplay = `
          <span class="mark-diff">
            <span class="old-val">${student._prevMark}</span>
            <span class="arrow">&rarr;</span>
            <span class="new-val">${student.mark}</span>
          </span>
        `;
      }

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.25rem;">
          <span style="color: var(--mongo-green); font-weight: 700;">${student.name}</span>
          <span style="font-size: 0.68rem; color: var(--text-dim);">${student._id}</span>
        </div>
        <div style="font-size: 0.75rem; color: var(--text-secondary); display: grid; grid-template-columns: 1fr 1fr; gap: 0.2rem; margin-top: 0.2rem;">
          <div>email: <span style="color: var(--accent-cyan);">${student.email}</span></div>
          <div>course: <span style="color: var(--accent-purple);">${student.course}</span></div>
          <div>age: <span style="color: var(--syn-num);">${student.age}</span></div>
          <div>mark: ${markDisplay}</div>
          <div>active: <span style="color: var(--syn-bool);">${student.active}</span></div>
          <div>__v: <span style="color: var(--text-muted);">${student.__v}</span></div>
        </div>
      `;

      container.appendChild(card);
    });
  },

  escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
};

// ==============================================================================
// 3. Initialize Presentation Engine on Window Load
// ==============================================================================
window.addEventListener('DOMContentLoaded', () => {
  Deck.init();
  Sim.init();
});
