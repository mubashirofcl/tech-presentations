/**
 * MongoDB & mongosh Educational Deck Engine
 * Pure Vanilla JavaScript ES6+
 * 
 * Includes:
 * 1. Slide Navigation Engine (Hash routing, keyboard controls, progress bar)
 * 2. In-Memory MongoDB Command Simulator (find, insert, update, delete, operators)
 * 3. Interactive mongosh Terminal Simulator
 * 4. Interactive Challenge Hint & Solution Reveals
 * 5. 15-Question Graded Quiz Engine with Explanations
 * 6. Searchable Command Cheat Sheet
 * 7. Real-Time Presentation Slide Search & Table of Contents Drawer
 * 8. Clipboard Copy Utilities
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. Core DOM Elements
  // =========================================================================
  const slides = Array.from(document.querySelectorAll('.slide'));
  const totalSlides = slides.length;
  let currentSlideIndex = 0;

  // Header Elements
  const headerSectionBadge = document.getElementById('header-section-badge');
  const headerSlideTitle = document.getElementById('header-slide-title');
  const progressBarFill = document.getElementById('progress-bar-fill');
  const searchInput = document.getElementById('search-input');
  const fullscreenBtn = document.getElementById('fullscreen-btn');

  // Drawers & Modals
  const tocBtn = document.getElementById('toc-btn');
  const tocDrawer = document.getElementById('toc-drawer');
  const closeTocBtn = document.getElementById('close-toc-btn');
  const tocList = document.getElementById('toc-list');
  const drawerBackdrop = document.getElementById('drawer-backdrop');

  const cheatSheetBtn = document.getElementById('cheat-sheet-btn');
  const cheatSheetModal = document.getElementById('cheat-sheet-modal');
  const closeCheatSheetBtn = document.getElementById('close-cheat-sheet-btn');
  const cheatSearchInput = document.getElementById('cheat-search-input');

  const simulatorModalBtn = document.getElementById('simulator-modal-btn');
  const simulatorModal = document.getElementById('simulator-modal');
  const closeSimulatorModalBtn = document.getElementById('close-simulator-modal-btn');

  const quizModalBtn = document.getElementById('quiz-modal-btn');
  const quizModal = document.getElementById('quiz-modal');
  const closeQuizModalBtn = document.getElementById('close-quiz-modal-btn');

  // Navigation Controls
  const slideCounter = document.getElementById('slide-counter');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const firstSlideBtn = document.getElementById('first-slide-btn');
  const lastSlideBtn = document.getElementById('last-slide-btn');

  // =========================================================================
  // 2. Slide Navigation Logic
  // =========================================================================
  function goToSlide(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;

    slides.forEach((slide, idx) => {
      if (idx === index) {
        slide.classList.add('active');
        slide.scrollTop = 0;
      } else {
        slide.classList.remove('active');
      }
    });

    currentSlideIndex = index;
    updateUI();
    window.location.hash = `#slide-${currentSlideIndex + 1}`;
  }

  function nextSlide() {
    if (currentSlideIndex < totalSlides - 1) {
      goToSlide(currentSlideIndex + 1);
    }
  }

  function prevSlide() {
    if (currentSlideIndex > 0) {
      goToSlide(currentSlideIndex - 1);
    }
  }

  function updateUI() {
    const activeSlide = slides[currentSlideIndex];
    if (!activeSlide) return;

    // Slide Counter
    if (slideCounter) {
      slideCounter.textContent = `${currentSlideIndex + 1} / ${totalSlides}`;
    }

    // Progress Bar
    if (progressBarFill) {
      const pct = totalSlides > 1 ? (currentSlideIndex / (totalSlides - 1)) * 100 : 0;
      progressBarFill.style.width = `${pct}%`;
    }

    // Header Badges
    const section = activeSlide.getAttribute('data-section') || 'MongoDB Course';
    const title = activeSlide.getAttribute('data-title') || `Slide ${currentSlideIndex + 1}`;

    if (headerSectionBadge) headerSectionBadge.textContent = section;
    if (headerSlideTitle) headerSlideTitle.textContent = title;

    // Prev / Next button states
    if (prevBtn) prevBtn.disabled = currentSlideIndex === 0;
    if (nextBtn) nextBtn.disabled = currentSlideIndex === totalSlides - 1;
    if (firstSlideBtn) firstSlideBtn.disabled = currentSlideIndex === 0;
    if (lastSlideBtn) lastSlideBtn.disabled = currentSlideIndex === totalSlides - 1;

    // Update active item in TOC
    document.querySelectorAll('.toc-item').forEach((item, idx) => {
      if (idx === currentSlideIndex) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    // If typing in input or textarea, don't trigger slide change
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      if (e.key === 'Escape') {
        document.activeElement.blur();
        closeAllModals();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowRight':
      case 'PageDown':
      case ' ':
        e.preventDefault();
        nextSlide();
        break;
      case 'ArrowLeft':
      case 'PageUp':
        e.preventDefault();
        prevSlide();
        break;
      case 'Home':
        e.preventDefault();
        goToSlide(0);
        break;
      case 'End':
        e.preventDefault();
        goToSlide(totalSlides - 1);
        break;
      case 'f':
      case 'F':
        toggleFullscreen();
        break;
      case 't':
      case 'T':
        toggleDrawer(tocDrawer);
        break;
      case 's':
      case 'S':
        toggleModal(simulatorModal);
        break;
      case 'Escape':
        closeAllModals();
        break;
    }
  });

  // Buttons Event Listeners
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (firstSlideBtn) firstSlideBtn.addEventListener('click', () => goToSlide(0));
  if (lastSlideBtn) lastSlideBtn.addEventListener('click', () => goToSlide(totalSlides - 1));

  // Fullscreen Handler
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.log(err));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
  if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);

  // =========================================================================
  // 3. Drawers & Modals Manager
  // =========================================================================
  function openDrawer(drawer) {
    if (!drawer) return;
    drawer.classList.add('open');
    if (drawerBackdrop) drawerBackdrop.classList.add('open');
  }

  function closeDrawer(drawer) {
    if (!drawer) return;
    drawer.classList.remove('open');
    if (drawerBackdrop) drawerBackdrop.classList.remove('open');
  }

  function toggleDrawer(drawer) {
    if (!drawer) return;
    if (drawer.classList.contains('open')) {
      closeDrawer(drawer);
    } else {
      closeAllModals();
      openDrawer(drawer);
    }
  }

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('open');
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
  }

  function toggleModal(modal) {
    if (!modal) return;
    if (modal.classList.contains('open')) {
      closeModal(modal);
    } else {
      closeAllModals();
      openModal(modal);
    }
  }

  function closeAllModals() {
    document.querySelectorAll('.drawer').forEach(d => d.classList.remove('open'));
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
    if (drawerBackdrop) drawerBackdrop.classList.remove('open');
  }

  if (tocBtn) tocBtn.addEventListener('click', () => toggleDrawer(tocDrawer));
  if (closeTocBtn) closeTocBtn.addEventListener('click', () => closeDrawer(tocDrawer));
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeAllModals);

  if (cheatSheetBtn) cheatSheetBtn.addEventListener('click', () => toggleModal(cheatSheetModal));
  if (closeCheatSheetBtn) closeCheatSheetBtn.addEventListener('click', () => closeModal(cheatSheetModal));

  if (simulatorModalBtn) simulatorModalBtn.addEventListener('click', () => toggleModal(simulatorModal));
  if (closeSimulatorModalBtn) closeSimulatorModalBtn.addEventListener('click', () => closeModal(simulatorModal));

  if (quizModalBtn) quizModalBtn.addEventListener('click', () => toggleModal(quizModal));
  if (closeQuizModalBtn) closeQuizModalBtn.addEventListener('click', () => closeModal(quizModal));

  // =========================================================================
  // 4. Build Dynamic Table of Contents & Search
  // =========================================================================
  function buildTOC() {
    if (!tocList) return;
    tocList.innerHTML = '';
    let currentSection = '';

    slides.forEach((slide, idx) => {
      const section = slide.getAttribute('data-section') || 'Course Module';
      const title = slide.getAttribute('data-title') || `Slide ${idx + 1}`;

      if (section !== currentSection) {
        currentSection = section;
        const sectionHeader = document.createElement('div');
        sectionHeader.className = 'toc-section-header';
        sectionHeader.textContent = section;
        tocList.appendChild(sectionHeader);
      }

      const item = document.createElement('a');
      item.className = 'toc-item';
      item.href = `#slide-${idx + 1}`;
      item.innerHTML = `
        <span>${title}</span>
        <span class="toc-slide-num">#${idx + 1}</span>
      `;

      item.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(idx);
        closeDrawer(tocDrawer);
      });

      tocList.appendChild(item);
    });
  }

  // Slide Search in Header
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (!query) return;

      // Find first slide matching query
      const matchIdx = slides.findIndex(slide => {
        const title = (slide.getAttribute('data-title') || '').toLowerCase();
        const section = (slide.getAttribute('data-section') || '').toLowerCase();
        const text = slide.textContent.toLowerCase();
        return title.includes(query) || section.includes(query) || text.includes(query);
      });

      if (matchIdx !== -1) {
        goToSlide(matchIdx);
      }
    });
  }

  // =========================================================================
  // 5. In-Memory MongoDB Command Simulator Sandbox
  // =========================================================================
  const INITIAL_STUDENTS = [
    { _id: "65f1a101", name: "Rahul", age: 21, gender: "Male", course: "MERN", mark: 85, city: "Kozhikode", skills: ["HTML", "CSS", "JavaScript"], active: true },
    { _id: "65f1a102", name: "Anu", age: 22, gender: "Female", course: "Python", mark: 78, city: "Kannur", skills: ["Python", "Django"], active: true },
    { _id: "65f1a103", name: "Arjun", age: 20, gender: "Male", course: "MERN", mark: 92, city: "Wayanad", skills: ["React", "Node.js", "MongoDB"], active: true },
    { _id: "65f1a104", name: "Meera", age: 23, gender: "Female", course: "Java", mark: 67, city: "Kochi", skills: ["Java", "Spring"], active: false },
    { _id: "65f1a105", name: "Nikhil", age: 21, gender: "Male", course: "MERN", mark: 74, city: "Kochi", skills: ["React", "Node.js"], active: true }
  ];

  let currentStudents = JSON.parse(JSON.stringify(INITIAL_STUDENTS));

  // Query Evaluator
  function matchesFilter(doc, filter) {
    if (!filter || Object.keys(filter).length === 0) return true;

    for (const key of Object.keys(filter)) {
      const filterVal = filter[key];

      // Logical operators: $or, $and, $nor
      if (key === '$or' && Array.isArray(filterVal)) {
        const anyPass = filterVal.some(cond => matchesFilter(doc, cond));
        if (!anyPass) return false;
        continue;
      }
      if (key === '$and' && Array.isArray(filterVal)) {
        const allPass = filterVal.every(cond => matchesFilter(doc, cond));
        if (!allPass) return false;
        continue;
      }
      if (key === '$nor' && Array.isArray(filterVal)) {
        const anyPass = filterVal.some(cond => matchesFilter(doc, cond));
        if (anyPass) return false;
        continue;
      }

      const docVal = doc[key];

      // Comparison / Operator object
      if (filterVal && typeof filterVal === 'object' && !Array.isArray(filterVal) && !(filterVal instanceof RegExp)) {
        for (const op of Object.keys(filterVal)) {
          const target = filterVal[op];
          if (op === '$eq') {
            if (docVal !== target) return false;
          } else if (op === '$ne') {
            if (docVal === target) return false;
          } else if (op === '$gt') {
            if (typeof docVal !== 'number' || docVal <= target) return false;
          } else if (op === '$gte') {
            if (typeof docVal !== 'number' || docVal < target) return false;
          } else if (op === '$lt') {
            if (typeof docVal !== 'number' || docVal >= target) return false;
          } else if (op === '$lte') {
            if (typeof docVal !== 'number' || docVal > target) return false;
          } else if (op === '$in') {
            if (!Array.isArray(target) || !target.includes(docVal)) return false;
          } else if (op === '$nin') {
            if (Array.isArray(target) && target.includes(docVal)) return false;
          } else if (op === '$exists') {
            const exists = docVal !== undefined;
            if (exists !== Boolean(target)) return false;
          } else if (op === '$regex') {
            const regexFlags = filterVal['$options'] || '';
            const regex = new RegExp(target, regexFlags);
            if (!regex.test(String(docVal || ''))) return false;
          }
        }
      } else {
        // Direct value comparison or Array containment
        if (Array.isArray(docVal)) {
          // If document has array of skills: ["HTML", "CSS", "JavaScript"] and query is skills: "JavaScript"
          if (!docVal.includes(filterVal)) return false;
        } else {
          if (docVal !== filterVal) return false;
        }
      }
    }

    return true;
  }

  // Projection Helper
  function applyProjection(doc, projection) {
    if (!projection || Object.keys(projection).length === 0) {
      return JSON.parse(JSON.stringify(doc));
    }
    const result = {};
    const includeId = projection._id !== 0;

    const isExclusionMode = Object.entries(projection).some(([k, v]) => k !== '_id' && v === 0);

    if (isExclusionMode) {
      Object.assign(result, doc);
      for (const [k, v] of Object.entries(projection)) {
        if (v === 0) delete result[k];
      }
    } else {
      for (const [k, v] of Object.entries(projection)) {
        if (v === 1 && doc[k] !== undefined) {
          result[k] = doc[k];
        }
      }
      if (includeId && doc._id !== undefined) {
        result._id = doc._id;
      }
    }
    return result;
  }

  // Master Simulator Query Runner
  function executeSimulatedQuery(queryStr) {
    try {
      const clean = queryStr.trim();
      if (!clean) return { success: false, error: "Please enter a MongoDB command." };

      // Check Collection prefix
      if (!clean.startsWith('db.students.') && !clean.startsWith('db.')) {
        return {
          success: false,
          error: "Commands in this simulator must begin with 'db.students.' (e.g. db.students.find({ course: 'MERN' }))"
        };
      }

      // Check method
      if (clean.includes('.find(')) {
        return handleFind(clean);
      } else if (clean.includes('.findOne(')) {
        return handleFindOne(clean);
      } else if (clean.includes('.countDocuments(')) {
        return handleCount(clean);
      } else if (clean.includes('.insertOne(')) {
        return handleInsertOne(clean);
      } else if (clean.includes('.insertMany(')) {
        return handleInsertMany(clean);
      } else if (clean.includes('.updateOne(')) {
        return handleUpdateOne(clean);
      } else if (clean.includes('.updateMany(')) {
        return handleUpdateMany(clean);
      } else if (clean.includes('.deleteOne(')) {
        return handleDeleteOne(clean);
      } else if (clean.includes('.deleteMany(')) {
        return handleDeleteMany(clean);
      } else {
        return {
          success: false,
          error: "Unsupported command in demo simulator. Supported: find, findOne, countDocuments, insertOne, insertMany, updateOne, updateMany, deleteOne, deleteMany."
        };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  // Parse arguments from inside string like db.students.find({ ... }, { ... })
  function parseArgs(callStr, methodName) {
    const startIdx = callStr.indexOf(`.${methodName}(`);
    if (startIdx === -1) return [];
    
    // Extract contents of outermost parenthesis
    let depth = 0;
    let insideArgs = false;
    let argContent = "";
    
    for (let i = startIdx + methodName.length + 1; i < callStr.length; i++) {
      const char = callStr[i];
      if (char === '(') {
        depth++;
        argContent += char;
      } else if (char === ')') {
        depth--;
        if (depth === 0) {
          // Finished outer args
          break;
        } else {
          argContent += char;
        }
      } else {
        argContent += char;
      }
    }

    argContent = argContent.trim();
    if (!argContent) return [];

    // Safely parse arguments using Function/JSON
    try {
      // Evaluate within a safe sandbox returning array of args
      const evalFn = new Function(`return [ ${argContent} ];`);
      return evalFn();
    } catch (e) {
      throw new Error(`Syntax error in query arguments: ${e.message}`);
    }
  }

  function handleFind(queryStr) {
    const args = parseArgs(queryStr, 'find');
    const filter = args[0] || {};
    const projection = args[1] || null;

    let matched = currentStudents.filter(doc => matchesFilter(doc, filter));

    // Check chaining: .sort()
    if (queryStr.includes('.sort(')) {
      const sortArgs = parseArgs(queryStr, 'sort');
      if (sortArgs[0]) {
        const sortKey = Object.keys(sortArgs[0])[0];
        const sortDir = sortArgs[0][sortKey];
        matched.sort((a, b) => {
          if (a[sortKey] < b[sortKey]) return sortDir === 1 ? -1 : 1;
          if (a[sortKey] > b[sortKey]) return sortDir === 1 ? 1 : -1;
          return 0;
        });
      }
    }

    // Check chaining: .skip()
    if (queryStr.includes('.skip(')) {
      const skipArgs = parseArgs(queryStr, 'skip');
      if (typeof skipArgs[0] === 'number') {
        matched = matched.slice(skipArgs[0]);
      }
    }

    // Check chaining: .limit()
    if (queryStr.includes('.limit(')) {
      const limitArgs = parseArgs(queryStr, 'limit');
      if (typeof limitArgs[0] === 'number') {
        matched = matched.slice(0, limitArgs[0]);
      }
    }

    const projected = matched.map(doc => applyProjection(doc, projection));
    return {
      success: true,
      count: projected.length,
      data: projected,
      meta: `Returned ${projected.length} document(s)`
    };
  }

  function handleFindOne(queryStr) {
    const args = parseArgs(queryStr, 'findOne');
    const filter = args[0] || {};
    const projection = args[1] || null;

    const matched = currentStudents.find(doc => matchesFilter(doc, filter));
    if (!matched) {
      return { success: true, count: 0, data: null, meta: "null (No matching document found)" };
    }
    const projected = applyProjection(matched, projection);
    return { success: true, count: 1, data: projected, meta: "Returned 1 document" };
  }

  function handleCount(queryStr) {
    const args = parseArgs(queryStr, 'countDocuments');
    const filter = args[0] || {};
    const count = currentStudents.filter(doc => matchesFilter(doc, filter)).length;
    return { success: true, count: count, data: count, meta: `Count result: ${count}` };
  }

  function handleInsertOne(queryStr) {
    const args = parseArgs(queryStr, 'insertOne');
    if (!args[0] || typeof args[0] !== 'object') {
      throw new Error("insertOne requires a document object.");
    }
    const newDoc = JSON.parse(JSON.stringify(args[0]));
    if (!newDoc._id) {
      newDoc._id = "65f1" + Math.floor(1000 + Math.random() * 9000);
    }
    currentStudents.push(newDoc);
    return {
      success: true,
      data: { acknowledged: true, insertedId: `ObjectId("${newDoc._id}")` },
      meta: `Successfully inserted 1 document (Total now: ${currentStudents.length})`
    };
  }

  function handleInsertMany(queryStr) {
    const args = parseArgs(queryStr, 'insertMany');
    if (!args[0] || !Array.isArray(args[0])) {
      throw new Error("insertMany requires an array of document objects.");
    }
    const insertedIds = {};
    args[0].forEach((item, idx) => {
      const doc = JSON.parse(JSON.stringify(item));
      if (!doc._id) doc._id = "65f1" + Math.floor(1000 + Math.random() * 9000);
      insertedIds[idx] = `ObjectId("${doc._id}")`;
      currentStudents.push(doc);
    });
    return {
      success: true,
      data: { acknowledged: true, insertedCount: args[0].length, insertedIds },
      meta: `Successfully inserted ${args[0].length} document(s)`
    };
  }

  function applyUpdateOperations(doc, updateOps) {
    if (updateOps.$set) {
      for (const [k, v] of Object.entries(updateOps.$set)) {
        doc[k] = v;
      }
    }
    if (updateOps.$inc) {
      for (const [k, v] of Object.entries(updateOps.$inc)) {
        doc[k] = (doc[k] || 0) + v;
      }
    }
    if (updateOps.$unset) {
      for (const k of Object.keys(updateOps.$unset)) {
        delete doc[k];
      }
    }
    if (updateOps.$rename) {
      for (const [oldKey, newKey] of Object.entries(updateOps.$rename)) {
        if (doc[oldKey] !== undefined) {
          doc[newKey] = doc[oldKey];
          delete doc[oldKey];
        }
      }
    }
  }

  function handleUpdateOne(queryStr) {
    const args = parseArgs(queryStr, 'updateOne');
    const filter = args[0] || {};
    const updateOps = args[1] || {};

    const target = currentStudents.find(doc => matchesFilter(doc, filter));
    if (!target) {
      return {
        success: true,
        data: { acknowledged: true, matchedCount: 0, modifiedCount: 0 },
        meta: "Matched 0 documents. No updates performed."
      };
    }

    applyUpdateOperations(target, updateOps);
    return {
      success: true,
      data: { acknowledged: true, matchedCount: 1, modifiedCount: 1 },
      meta: "Updated 1 document successfully."
    };
  }

  function handleUpdateMany(queryStr) {
    const args = parseArgs(queryStr, 'updateMany');
    const filter = args[0] || {};
    const updateOps = args[1] || {};

    let modifiedCount = 0;
    currentStudents.forEach(doc => {
      if (matchesFilter(doc, filter)) {
        applyUpdateOperations(doc, updateOps);
        modifiedCount++;
      }
    });

    return {
      success: true,
      data: { acknowledged: true, matchedCount: modifiedCount, modifiedCount },
      meta: `Updated ${modifiedCount} document(s) successfully.`
    };
  }

  function handleDeleteOne(queryStr) {
    const args = parseArgs(queryStr, 'deleteOne');
    const filter = args[0] || {};

    const idx = currentStudents.findIndex(doc => matchesFilter(doc, filter));
    if (idx === -1) {
      return {
        success: true,
        data: { acknowledged: true, deletedCount: 0 },
        meta: "Matched 0 documents. No documents deleted."
      };
    }

    currentStudents.splice(idx, 1);
    return {
      success: true,
      data: { acknowledged: true, deletedCount: 1 },
      meta: "Deleted 1 document successfully."
    };
  }

  function handleDeleteMany(queryStr) {
    const args = parseArgs(queryStr, 'deleteMany');
    const filter = args[0] || {};

    const prevLen = currentStudents.length;
    currentStudents = currentStudents.filter(doc => !matchesFilter(doc, filter));
    const deletedCount = prevLen - currentStudents.length;

    return {
      success: true,
      data: { acknowledged: true, deletedCount },
      meta: `Deleted ${deletedCount} document(s) from collection.`
    };
  }

  // Initialize Simulator UI Bindings
  function setupSimulatorBindings() {
    const simInput = document.getElementById('sim-query-input');
    const simRunBtn = document.getElementById('sim-run-btn');
    const simResetBtn = document.getElementById('sim-reset-btn');
    const simOutput = document.getElementById('sim-output-area');
    const chipBtns = document.querySelectorAll('.sim-chip-btn');

    if (!simInput || !simRunBtn || !simOutput) return;

    function runCurrent() {
      const q = simInput.value;
      const res = executeSimulatedQuery(q);

      if (!res.success) {
        simOutput.innerHTML = `
          <div style="color: #F87171; font-weight: 600; margin-bottom: 0.5rem;">[Simulator Error]</div>
          <div style="color: #FECACA;">${res.error}</div>
        `;
      } else {
        const jsonFormatted = JSON.stringify(res.data, null, 2);
        simOutput.innerHTML = `
          <div style="color: #00ED64; font-weight: 600; margin-bottom: 0.5rem;">/* ${res.meta} */</div>
          <pre style="margin: 0; color: #E2E8F0;">${escapeHtml(jsonFormatted)}</pre>
        `;
      }
    }

    simRunBtn.addEventListener('click', runCurrent);

    simInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        runCurrent();
      }
    });

    if (simResetBtn) {
      simResetBtn.addEventListener('click', () => {
        currentStudents = JSON.parse(JSON.stringify(INITIAL_STUDENTS));
        simOutput.innerHTML = `
          <div style="color: #38BDF8; font-weight: 600;">/* Dataset reset to initial 5 student documents */</div>
        `;
      });
    }

    chipBtns.forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-query');
        if (query) {
          simInput.value = query;
          runCurrent();
        }
      });
    });
  }

  // =========================================================================
  // 6. mongosh Terminal Sandbox Logic
  // =========================================================================
  function setupTerminalSimulator() {
    const termInput = document.getElementById('term-cmd-input');
    const termRunBtn = document.getElementById('term-run-btn');
    const termBody = document.getElementById('terminal-body-output');
    const termChips = document.querySelectorAll('.term-chip');

    if (!termInput || !termBody) return;

    let currentDb = 'test';

    function runCommand(cmd) {
      cmd = cmd.trim();
      if (!cmd) return;

      // Append command prompt line
      const cmdLine = document.createElement('div');
      cmdLine.style.color = '#38BDF8';
      cmdLine.style.marginTop = '0.5rem';
      cmdLine.innerHTML = `<span style="color: #00ED64;">${currentDb}&gt;</span> ${escapeHtml(cmd)}`;
      termBody.appendChild(cmdLine);

      const respLine = document.createElement('div');
      respLine.style.color = '#CBD5E1';
      respLine.style.marginBottom = '0.5rem';

      // Parse terminal shell commands
      if (cmd === 'cls' || cmd === 'clear') {
        termBody.innerHTML = '';
        termInput.value = '';
        return;
      } else if (cmd === 'help') {
        respLine.innerHTML = `
          <div style="color: #FBBF24;">Available Shell Commands:</div>
          <div>  show dbs          - Print a list of all databases</div>
          <div>  use &lt;database&gt;   - Switch current database context</div>
          <div>  db                - Print current database name</div>
          <div>  show collections  - Print list of collections in current DB</div>
          <div>  cls               - Clear terminal screen</div>
          <div>  exit              - Quit mongosh session</div>
        `;
      } else if (cmd === 'show dbs') {
        respLine.innerHTML = `
          admin     40.00 KiB<br>
          config    12.00 KiB<br>
          local     72.00 KiB<br>
          collegeDB 56.00 KiB
        `;
      } else if (cmd.startsWith('use ')) {
        const newDb = cmd.replace('use ', '').trim();
        if (newDb) {
          currentDb = newDb;
          respLine.style.color = '#34D399';
          respLine.textContent = `switched to db ${currentDb}`;
        }
      } else if (cmd === 'db') {
        respLine.textContent = currentDb;
      } else if (cmd === 'show collections') {
        if (currentDb === 'collegeDB') {
          respLine.innerHTML = `students<br>courses`;
        } else {
          respLine.innerHTML = `(no collections in ${currentDb} yet)`;
        }
      } else if (cmd === 'exit' || cmd === 'quit') {
        respLine.style.color = '#F472B6';
        respLine.textContent = 'Bye! mongosh session terminated.';
      } else if (cmd.startsWith('db.students.')) {
        // Delegate to in-memory query simulator
        const res = executeSimulatedQuery(cmd);
        if (res.success) {
          respLine.innerHTML = `<pre style="margin: 0; color: #E2E8F0;">${escapeHtml(JSON.stringify(res.data, null, 2))}</pre>`;
        } else {
          respLine.style.color = '#F87171';
          respLine.textContent = `MongoServerError: ${res.error}`;
        }
      } else {
        respLine.style.color = '#F87171';
        respLine.textContent = `ReferenceError: ${cmd} is not defined. Type 'help' for command list.`;
      }

      termBody.appendChild(respLine);
      termBody.scrollTop = termBody.scrollHeight;
      termInput.value = '';
    }

    if (termRunBtn) {
      termRunBtn.addEventListener('click', () => runCommand(termInput.value));
    }

    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        runCommand(termInput.value);
      }
    });

    termChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const cmd = chip.getAttribute('data-cmd');
        if (cmd) {
          termInput.value = cmd;
          runCommand(cmd);
        }
      });
    });
  }

  // =========================================================================
  // 7. Interactive Challenge Reveal Buttons
  // =========================================================================
  function setupChallengeReveals() {
    document.querySelectorAll('.btn-reveal').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const targetEl = document.getElementById(targetId);
        if (!targetEl) return;

        const isShowing = targetEl.classList.contains('show');
        if (isShowing) {
          targetEl.classList.remove('show');
          btn.classList.remove('active');
          if (btn.classList.contains('btn-solution')) {
            btn.textContent = 'Show Solution';
          } else {
            btn.textContent = 'Show Hint';
          }
        } else {
          targetEl.classList.add('show');
          btn.classList.add('active');
          if (btn.classList.contains('btn-solution')) {
            btn.textContent = 'Hide Solution';
          } else {
            btn.textContent = 'Hide Hint';
          }
        }
      });
    });
  }

  // =========================================================================
  // 8. Interactive Quiz Engine (15 Comprehensive Questions)
  // =========================================================================
  const QUIZ_QUESTIONS = [
    {
      q: "1. What is the fundamental data storage model used by MongoDB?",
      opts: [
        "Relational tables with strict columns and rows",
        "Documents stored internally as BSON grouped into collections",
        "Flat text files containing comma-separated values (CSV)",
        "Key-value pairs only with no hierarchical nesting"
      ],
      correct: 1,
      expl: "MongoDB is a document database. It groups flexible, JSON-like BSON documents into collections without rigid row/column constraints."
    },
    {
      q: "2. How are MongoDB Community Server and mongosh distributed for Windows?",
      opts: [
        "They are bundled together into a single MSI installer",
        "mongosh is an optional browser extension",
        "They are separate installations; mongosh is downloaded independently",
        "MongoDB Server is not supported on Windows"
      ],
      correct: 2,
      expl: "Official MongoDB documentation specifies that MongoDB Server (mongod) and the MongoDB Shell (mongosh) are downloaded and installed separately."
    },
    {
      q: "3. What is the default TCP network port used by MongoDB Server?",
      opts: ["3000", "8080", "27017", "5432"],
      correct: 2,
      expl: "Port 27017 is MongoDB's official default listening port for incoming client and shell connections."
    },
    {
      q: "4. What happens when you execute 'use newDB' when 'newDB' does not exist yet?",
      opts: [
        "MongoDB throws a DatabaseNotFoundError",
        "MongoDB immediately creates and locks a 1GB file on disk",
        "MongoDB switches the session context, but physically creates the DB only on first write",
        "mongosh terminates immediately"
      ],
      correct: 2,
      expl: "MongoDB uses lazy database and collection creation. The database is physically created on disk only when you insert your first document."
    },
    {
      q: "5. What unique identifier field is automatically generated for every inserted document?",
      opts: ["id", "_id", "primary_key", "uuid"],
      correct: 1,
      expl: "MongoDB automatically generates a 12-byte unique `_id` field (with type ObjectId) if not explicitly provided."
    },
    {
      q: "6. Which mongosh command retrieves all documents from the students collection?",
      opts: [
        "db.students.select(*)",
        "db.students.get()",
        "db.students.find()",
        "students.fetchAll()"
      ],
      correct: 2,
      expl: "`db.students.find()` is the official method to query documents from a collection and return a cursor."
    },
    {
      q: "7. Which query correctly finds all students with marks strictly greater than 80?",
      opts: [
        "db.students.find({ mark: > 80 })",
        "db.students.find({ mark: { $gt: 80 } })",
        "db.students.find({ mark: { $gte: 80 } })",
        "db.students.find({ $gt: { mark: 80 } })"
      ],
      correct: 1,
      expl: "In MongoDB query syntax, comparison operators are nested within field objects: `{ mark: { $gt: 80 } }`."
    },
    {
      q: "8. What does { course: { $in: ['MERN', 'Python'] } } do?",
      opts: [
        "Finds students enrolled in both MERN and Python simultaneously",
        "Matches any student whose course is either 'MERN' or 'Python'",
        "Deletes all students taking MERN or Python",
        "Renames MERN course to Python"
      ],
      correct: 1,
      expl: "The `$in` operator matches documents where the value of a field equals any value in the specified array."
    },
    {
      q: "9. How does MongoDB treat multiple fields in a query like: { course: 'MERN', city: 'Kochi' }?",
      opts: [
        "As an implicit logical AND",
        "As an implicit logical OR",
        "It triggers a syntax error unless $and is explicitly written",
        "It searches only for the second field ('city')"
      ],
      correct: 0,
      expl: "Comma-separated key-value pairs in a MongoDB query filter behave as an implicit logical AND operation."
    },
    {
      q: "10. What does the $set update operator do if the target field does not exist in the document?",
      opts: [
        "It aborts the update and throws an error",
        "It creates the new field with the specified value",
        "It deletes the document",
        "It converts the document to an array"
      ],
      correct: 1,
      expl: "If the field specified in `$set` does not exist, MongoDB automatically adds and populates the new field."
    },
    {
      q: "11. Which operator is used to decrement a numeric field by 5?",
      opts: [
        "{ $dec: { mark: 5 } }",
        "{ $minus: { mark: 5 } }",
        "{ $inc: { mark: -5 } }",
        "{ $sub: { mark: 5 } }"
      ],
      correct: 2,
      expl: "The `$inc` operator accepts positive or negative numbers. `{ mark: -5 }` decreases the numeric value by 5."
    },
    {
      q: "12. What is the catastrophic risk of executing db.students.deleteMany({})?",
      opts: [
        "It drops the database permanently",
        "An empty filter {} matches every document, deleting the entire contents of the collection",
        "It only deletes the first document",
        "It causes an error because an ID is required"
      ],
      correct: 1,
      expl: "An empty filter `{}` matches all documents in the collection without filtering, removing all records."
    },
    {
      q: "13. What is the purpose of projection in db.students.find({}, { name: 1, _id: 0 })?",
      opts: [
        "It sorts the documents by name",
        "It returns only the 'name' field while suppressing the default '_id' field",
        "It updates the name to 1",
        "It searches for name equal to 1"
      ],
      correct: 1,
      expl: "Projection specifies which fields to include (`1`) or exclude (`0`). `_id` is included by default unless explicitly set to `0`."
    },
    {
      q: "14. How do you query an array field 'skills' to find students possessing 'JavaScript'?",
      opts: [
        "db.students.find({ 'skills[0]': 'JavaScript' })",
        "db.students.find({ skills: 'JavaScript' })",
        "db.students.find({ skills: { $has: 'JavaScript' } })",
        "db.students.find({ $contains: { skills: 'JavaScript' } })"
      ],
      correct: 1,
      expl: "MongoDB allows direct equality matching on array elements: `{ skills: 'JavaScript' }` matches if the array contains 'JavaScript'."
    },
    {
      q: "15. What is the fundamental difference between db.students.drop() and db.dropDatabase()?",
      opts: [
        "drop() removes one collection; dropDatabase() removes all collections and the entire DB",
        "drop() deletes one document; dropDatabase() deletes one collection",
        "They are identical aliases",
        "drop() is only valid in SQL"
      ],
      correct: 0,
      expl: "`db.students.drop()` drops the specific collection and its indexes. `db.dropDatabase()` deletes the currently selected database entirely."
    }
  ];

  function setupQuiz() {
    const quizList = document.getElementById('quiz-questions-list');
    const quizSubmitBtn = document.getElementById('quiz-submit-btn');
    const quizScoreResult = document.getElementById('quiz-score-result');

    if (!quizList) return;

    quizList.innerHTML = '';
    const userAnswers = {};

    QUIZ_QUESTIONS.forEach((item, qIdx) => {
      const card = document.createElement('div');
      card.className = 'quiz-card';
      card.innerHTML = `
        <div class="quiz-q-num">Question ${qIdx + 1} of ${QUIZ_QUESTIONS.length}</div>
        <div class="quiz-q-text">${escapeHtml(item.q)}</div>
        <div class="quiz-options" id="quiz-opts-${qIdx}">
          ${item.opts.map((opt, oIdx) => `
            <div class="quiz-opt" data-q="${qIdx}" data-o="${oIdx}">
              <span style="font-weight: 700; width: 22px;">${String.fromCharCode(65 + oIdx)}.</span>
              <span>${escapeHtml(opt)}</span>
            </div>
          `).join('')}
        </div>
        <div class="quiz-feedback" id="quiz-fb-${qIdx}"></div>
      `;
      quizList.appendChild(card);
    });

    // Option selection listener
    quizList.addEventListener('click', (e) => {
      const opt = e.target.closest('.quiz-opt');
      if (!opt) return;

      const qIdx = parseInt(opt.getAttribute('data-q'), 10);
      const oIdx = parseInt(opt.getAttribute('data-o'), 10);

      userAnswers[qIdx] = oIdx;

      // Update UI for this question
      const parent = document.getElementById(`quiz-opts-${qIdx}`);
      parent.querySelectorAll('.quiz-opt').forEach((el, idx) => {
        if (idx === oIdx) {
          el.classList.add('selected');
        } else {
          el.classList.remove('selected');
        }
      });
    });

    if (quizSubmitBtn) {
      quizSubmitBtn.addEventListener('click', () => {
        let score = 0;

        QUIZ_QUESTIONS.forEach((item, qIdx) => {
          const userChoice = userAnswers[qIdx];
          const isCorrect = userChoice === item.correct;
          if (isCorrect) score++;

          const parent = document.getElementById(`quiz-opts-${qIdx}`);
          const fb = document.getElementById(`quiz-fb-${qIdx}`);

          parent.querySelectorAll('.quiz-opt').forEach((el, idx) => {
            el.classList.remove('selected', 'correct', 'incorrect');
            if (idx === item.correct) {
              el.classList.add('correct');
            } else if (idx === userChoice) {
              el.classList.add('incorrect');
            }
          });

          if (fb) {
            fb.classList.add('show');
            if (isCorrect) {
              fb.style.background = 'rgba(0, 237, 100, 0.1)';
              fb.style.color = '#A7F3D0';
              fb.innerHTML = `<strong>✓ Correct!</strong> ${escapeHtml(item.expl)}`;
            } else {
              fb.style.background = 'rgba(239, 68, 68, 0.1)';
              fb.style.color = '#FECACA';
              fb.innerHTML = `<strong>✗ Incorrect.</strong> Correct answer is <strong>${String.fromCharCode(65 + item.correct)}</strong>. ${escapeHtml(item.expl)}`;
            }
          }
        });

        if (quizScoreResult) {
          const pct = Math.round((score / QUIZ_QUESTIONS.length) * 100);
          quizScoreResult.style.display = 'block';
          quizScoreResult.innerHTML = `
            <div style="font-size: 1.25rem; font-weight: 800; color: ${pct >= 70 ? '#00ED64' : '#FBBF24'};">
              Final Score: ${score} / ${QUIZ_QUESTIONS.length} (${pct}%)
            </div>
            <div style="font-size: 0.85rem; color: #CBD5E1; margin-top: 0.25rem;">
              ${pct >= 70 ? '🎉 Excellent! You have mastered MongoDB and mongosh beginner fundamentals.' : 'Keep practicing the queries and review the slides!'}
            </div>
          `;
        }
      });
    }
  }

  // =========================================================================
  // 9. Searchable Cheat Sheet Filter
  // =========================================================================
  function setupCheatSheetSearch() {
    if (!cheatSearchInput) return;
    const items = document.querySelectorAll('.cheat-card');

    cheatSearchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      items.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(q)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // =========================================================================
  // 10. Code Block Copy to Clipboard
  // =========================================================================
  function setupCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const codeBlock = btn.closest('.code-container')?.querySelector('pre.code-block');
        if (!codeBlock) return;

        const textToCopy = codeBlock.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalText = btn.innerHTML;
          btn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Copied ✓`;
          btn.classList.add('copied');

          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('copied');
          }, 2000);
        }).catch(err => {
          console.error('Clipboard copy failed:', err);
        });
      });
    });
  }

  // Utility
  function escapeHtml(str) {
    if (typeof str !== 'string') return String(str);
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // =========================================================================
  // 11. Initial Startup & Hash Detection
  // =========================================================================
  buildTOC();
  setupSimulatorBindings();
  setupTerminalSimulator();
  setupChallengeReveals();
  setupQuiz();
  setupCheatSheetSearch();
  setupCopyButtons();

  // Read initial hash like #slide-5
  const hash = window.location.hash;
  if (hash && hash.startsWith('#slide-')) {
    const slideNum = parseInt(hash.replace('#slide-', ''), 10);
    if (!isNaN(slideNum) && slideNum >= 1 && slideNum <= totalSlides) {
      goToSlide(slideNum - 1);
    } else {
      goToSlide(0);
    }
  } else {
    goToSlide(0);
  }
});
