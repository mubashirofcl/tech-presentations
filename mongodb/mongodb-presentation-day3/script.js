/**
 * ============================================================================
 * MongoDB Day 3 — Mongoose Educational Masterclass Engine
 * Pure Vanilla JavaScript ES6+
 * ============================================================================
 * Features:
 * 1. Slide Navigation Engine (Keyboard, Buttons, URL Hash, Progress Bar, Counter)
 * 2. Dynamic Table of Contents (Syllabus) Drawer
 * 3. Live Presentation Slide Search
 * 4. Clipboard Code Copy Buttons with visual feedback
 * 5. Interactive Mongoose Architecture Stepper & Inspector
 * 6. Interactive MongoDB Connection String Visualizer
 * 7. Interactive Educational Schema Builder Simulator
 * 8. Interactive Student Validation Sandbox (Mongoose Rule Simulation)
 * 9. Graded 15-Question Interactive Quiz Engine (Slide & Modal sync)
 * 10. Searchable Mongoose Cheat Sheet
 * 11. Modal & Drawer Management with Keyboard Shortcuts
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. CORE DOM SELECTIONS
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
  const brandHomeBtn = document.getElementById('brand-home-btn');

  // Navigation Buttons
  const slideCounter = document.getElementById('slide-counter');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const firstSlideBtn = document.getElementById('first-slide-btn');
  const lastSlideBtn = document.getElementById('last-slide-btn');

  // Drawers & Modals
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const tocBtn = document.getElementById('toc-btn');
  const tocDrawer = document.getElementById('toc-drawer');
  const closeTocBtn = document.getElementById('close-toc-btn');
  const tocList = document.getElementById('toc-list');

  const schemaBuilderBtn = document.getElementById('schema-builder-btn');
  const schemaBuilderModal = document.getElementById('schema-builder-modal');
  const closeSchemaBuilderBtn = document.getElementById('close-schema-builder-btn');

  const validationDemoBtn = document.getElementById('validation-demo-btn');
  const validationModal = document.getElementById('validation-modal');
  const closeValidationBtn = document.getElementById('close-validation-btn');

  const cheatSheetBtn = document.getElementById('cheat-sheet-btn');
  const cheatSheetModal = document.getElementById('cheat-sheet-modal');
  const closeCheatSheetBtn = document.getElementById('close-cheat-sheet-btn');
  const modalCheatSearch = document.getElementById('modal-cheat-search');
  const slideCheatSearch = document.getElementById('slide-cheat-search');

  const quizModalBtn = document.getElementById('quiz-modal-btn');
  const quizModal = document.getElementById('quiz-modal');
  const closeQuizModalBtn = document.getElementById('close-quiz-modal-btn');

  // =========================================================================
  // 2. SLIDE NAVIGATION ENGINE
  // =========================================================================
  window.goToSlide = function(index) {
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
  };

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
      const percentage = (currentSlideIndex / (totalSlides - 1)) * 100;
      progressBarFill.style.width = `${percentage}%`;
    }

    // Section Badge & Title
    const sectionName = activeSlide.getAttribute('data-section') || 'MongoDB Day 3';
    const slideTitle = activeSlide.getAttribute('data-title') || 'Mongoose';

    if (headerSectionBadge) headerSectionBadge.textContent = sectionName;
    if (headerSlideTitle) headerSlideTitle.textContent = slideTitle;

    // Update Drawer Active Item
    document.querySelectorAll('.toc-item').forEach((item, idx) => {
      if (idx === currentSlideIndex) {
        item.classList.add('active');
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        item.classList.remove('active');
      }
    });

    // Disable / Enable Prev & Next buttons
    if (prevBtn) prevBtn.disabled = (currentSlideIndex === 0);
    if (firstSlideBtn) firstSlideBtn.disabled = (currentSlideIndex === 0);
    if (nextBtn) {
      if (currentSlideIndex === totalSlides - 1) {
        nextBtn.innerHTML = '<span>Finish Deck</span>';
      } else {
        nextBtn.innerHTML = '<span>Next Slide</span> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>';
      }
    }
  }

  // Bind Buttons
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (firstSlideBtn) firstSlideBtn.addEventListener('click', () => goToSlide(0));
  if (lastSlideBtn) lastSlideBtn.addEventListener('click', () => goToSlide(totalSlides - 1));
  if (brandHomeBtn) brandHomeBtn.addEventListener('click', () => goToSlide(0));

  // =========================================================================
  // 3. KEYBOARD SHORTCUTS
  // =========================================================================
  document.addEventListener('keydown', (e) => {
    // If typing in input or textarea, ignore hotkeys
    const targetTag = e.target.tagName.toLowerCase();
    if (targetTag === 'input' || targetTag === 'textarea' || targetTag === 'select') {
      if (e.key === 'Escape') {
        e.target.blur();
        closeAllModals();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowRight':
      case ' ':
        e.preventDefault();
        nextSlide();
        break;
      case 'ArrowLeft':
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
      case 't':
      case 'T':
        e.preventDefault();
        toggleDrawer(tocDrawer);
        break;
      case 's':
      case 'S':
        e.preventDefault();
        toggleModal(schemaBuilderModal);
        break;
      case 'v':
      case 'V':
        e.preventDefault();
        toggleModal(validationModal);
        break;
      case 'c':
      case 'C':
        e.preventDefault();
        toggleModal(cheatSheetModal);
        break;
      case 'q':
      case 'Q':
        e.preventDefault();
        toggleModal(quizModal);
        break;
      case 'f':
      case 'F':
        e.preventDefault();
        toggleFullscreen();
        break;
      case 'Escape':
        closeAllModals();
        break;
    }
  });

  // =========================================================================
  // 4. DRAWERS & MODALS LOGIC
  // =========================================================================
  function openDrawer(drawer) {
    if (typeof drawer === 'string') drawer = document.getElementById(drawer);
    if (!drawer) return;
    drawer.classList.add('open');
    if (drawerBackdrop) drawerBackdrop.classList.add('open');
  }

  function closeDrawer(drawer) {
    if (typeof drawer === 'string') drawer = document.getElementById(drawer);
    if (!drawer) return;
    drawer.classList.remove('open');
    if (drawerBackdrop) drawerBackdrop.classList.remove('open');
  }

  function toggleDrawer(drawer) {
    if (drawer.classList.contains('open')) {
      closeDrawer(drawer);
    } else {
      closeAllModals();
      openDrawer(drawer);
    }
  }

  window.openModal = function(modal) {
    if (typeof modal === 'string') modal = document.getElementById(modal);
    if (!modal) return;
    closeAllModals();
    modal.classList.add('open');
  };

  window.closeModal = function(modal) {
    if (typeof modal === 'string') modal = document.getElementById(modal);
    if (!modal) return;
    modal.classList.remove('open');
  };

  function toggleModal(modal) {
    if (modal.classList.contains('open')) {
      closeModal(modal);
    } else {
      openModal(modal);
    }
  }

  function closeAllModals() {
    document.querySelectorAll('.drawer').forEach(d => d.classList.remove('open'));
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
    if (drawerBackdrop) drawerBackdrop.classList.remove('open');
  }

  // Drawer / Modal Listeners
  if (tocBtn) tocBtn.addEventListener('click', () => toggleDrawer(tocDrawer));
  if (closeTocBtn) closeTocBtn.addEventListener('click', () => closeDrawer(tocDrawer));
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeAllModals);

  if (schemaBuilderBtn) schemaBuilderBtn.addEventListener('click', () => toggleModal(schemaBuilderModal));
  if (closeSchemaBuilderBtn) closeSchemaBuilderBtn.addEventListener('click', () => closeModal(schemaBuilderModal));

  if (validationDemoBtn) validationDemoBtn.addEventListener('click', () => toggleModal(validationModal));
  if (closeValidationBtn) closeValidationBtn.addEventListener('click', () => closeModal(validationModal));

  if (cheatSheetBtn) cheatSheetBtn.addEventListener('click', () => toggleModal(cheatSheetModal));
  if (closeCheatSheetBtn) closeCheatSheetBtn.addEventListener('click', () => closeModal(cheatSheetModal));

  if (quizModalBtn) quizModalBtn.addEventListener('click', () => toggleModal(quizModal));
  if (closeQuizModalBtn) closeQuizModalBtn.addEventListener('click', () => closeModal(quizModal));

  // Close modals on clicking overlay background
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  // =========================================================================
  // 5. FULLSCREEN TOGGLE
  // =========================================================================
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
  if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);

  // =========================================================================
  // 6. BUILD TABLE OF CONTENTS (SYLLABUS)
  // =========================================================================
  function buildTOC() {
    if (!tocList) return;
    tocList.innerHTML = '';

    let currentSection = '';

    slides.forEach((slide, idx) => {
      const section = slide.getAttribute('data-section') || 'Section';
      const title = slide.getAttribute('data-title') || `Slide ${idx + 1}`;

      if (section !== currentSection) {
        currentSection = section;
        const sectionHeader = document.createElement('div');
        sectionHeader.className = 'toc-section-title';
        sectionHeader.textContent = currentSection;
        tocList.appendChild(sectionHeader);
      }

      const item = document.createElement('div');
      item.className = 'toc-item';
      if (idx === currentSlideIndex) item.classList.add('active');

      item.innerHTML = `
        <span class="toc-num">${idx + 1}.</span>
        <span style="flex:1;">${title}</span>
      `;

      item.addEventListener('click', () => {
        goToSlide(idx);
        closeDrawer(tocDrawer);
      });

      tocList.appendChild(item);
    });
  }

  // =========================================================================
  // 7. PRESENTATION SLIDE SEARCH
  // =========================================================================
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      if (!query) return;

      // Find first slide that contains query
      const matchIndex = slides.findIndex(slide => {
        const text = slide.innerText.toLowerCase();
        const title = (slide.getAttribute('data-title') || '').toLowerCase();
        return title.includes(query) || text.includes(query);
      });

      if (matchIndex !== -1) {
        goToSlide(matchIndex);
      }
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        searchInput.blur();
      }
    });
  }

  // =========================================================================
  // 8. CLIPBOARD COPY UTILITIES
  // =========================================================================
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      let codeToCopy = btn.getAttribute('data-code');

      if (!codeToCopy) {
        const codeContainer = btn.closest('.code-container');
        if (codeContainer) {
          const body = codeContainer.querySelector('.code-body');
          if (body) codeToCopy = body.innerText;
        }
      }

      if (codeToCopy) {
        try {
          await navigator.clipboard.writeText(codeToCopy);
          const originalText = btn.textContent;
          btn.textContent = 'Copied!';
          btn.classList.add('copied');

          setTimeout(() => {
            btn.textContent = originalText;
            btn.classList.remove('copied');
          }, 2000);
        } catch (err) {
          console.error('Failed to copy text: ', err);
        }
      }
    });
  });

  // =========================================================================
  // 9. INTERACTIVE ARCHITECTURE STEPPER
  // =========================================================================
  const archDescriptions = {
    app: {
      title: "Layer 1: Node.js Application (server.js)",
      desc: "Your application entry point. Gathers client request parameters and calls Mongoose Model functions (e.g. Student.create, Student.find)."
    },
    mongoose: {
      title: "Layer 2: Mongoose ODM Library",
      desc: "The Object Data Modeling bridge singleton in Node.js. Orchestrates connections, applies type casting, coordinates middleware hooks, and delegates to Schemas and Models."
    },
    schema: {
      title: "Layer 3: Schema (Blueprint)",
      desc: "Defines the exact shape of your document: field names, SchemaTypes (String, Number, Boolean), default fallback values, and built-in or custom validation rules."
    },
    model: {
      title: "Layer 4: Model (Compiled Constructor)",
      desc: "The compiled JavaScript class interface constructed from a Schema. Provides CRUD methods like create(), find(), updateOne(), and deleteOne()."
    },
    mongodb: {
      title: "Layer 5: MongoDB Server (mongod)",
      desc: "The actual database daemon running on disk (127.0.0.1:27017 or Atlas cloud cluster) that receives serialized BSON network packets over wire protocol."
    },
    collection: {
      title: "Layer 6: Collection ('students')",
      desc: "The container inside MongoDB. Mongoose automatically maps Model 'Student' to lowercase plural collection 'students'."
    },
    documents: {
      title: "Layer 7: BSON Documents",
      desc: "Individual binary JSON records containing actual student properties, automatic unique _id ObjectId, and internal version __v."
    }
  };

  const archNodes = document.querySelectorAll('.pipeline-node[data-layer]');
  const archLayerTitle = document.getElementById('arch-layer-title');
  const archLayerDesc = document.getElementById('arch-layer-desc');

  window.selectArchLayer = function(layerKey) {
    archNodes.forEach(node => {
      if (node.getAttribute('data-layer') === layerKey) {
        node.classList.add('active-node');
      } else {
        node.classList.remove('active-node');
      }
    });

    const info = archDescriptions[layerKey];
    if (info && archLayerTitle && archLayerDesc) {
      archLayerTitle.textContent = info.title;
      archLayerDesc.textContent = info.desc;
    }
  };

  let currentArchIndex = 0;
  const archKeys = ['app', 'mongoose', 'schema', 'model', 'mongodb', 'collection', 'documents'];

  window.stepThroughArch = function() {
    currentArchIndex = (currentArchIndex + 1) % archKeys.length;
    selectArchLayer(archKeys[currentArchIndex]);
  };

  // =========================================================================
  // 10. INTERACTIVE CONNECTION STRING VISUALIZER
  // =========================================================================
  const connDescriptions = {
    protocol: {
      title: "Protocol Scheme: mongodb://",
      desc: "Specifies the standard MongoDB wire protocol used by Mongoose driver. For Atlas cloud replica sets, this becomes 'mongodb+srv://'."
    },
    host: {
      title: "Host Address: 127.0.0.1",
      desc: "Points directly to your local loopback IPv4 address. Mongoose explicitly recommends 127.0.0.1 over 'localhost' in Node.js 18+ to avoid IPv6 resolution delays and connection timeouts."
    },
    port: {
      title: "Default Port: 27017",
      desc: "The default listening TCP port for the MongoDB daemon server. Unless explicitly reconfigured in mongod.cfg, MongoDB always listens on 27017."
    },
    db: {
      title: "Database Name: collegeDB",
      desc: "The target database for this connection. If 'collegeDB' does not exist yet, MongoDB will lazily create it automatically the moment your first document is inserted!"
    }
  };

  window.selectConnSegment = function(segmentKey) {
    document.querySelectorAll('.conn-part').forEach(p => {
      if (p.getAttribute('data-segment') === segmentKey) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });

    const info = connDescriptions[segmentKey];
    const detailTitle = document.getElementById('conn-detail-title');
    const detailText = document.getElementById('conn-detail-text');

    if (info && detailTitle && detailText) {
      detailTitle.textContent = info.title;
      detailText.textContent = info.desc;
    }
  };

  // =========================================================================
  // 11. INTERACTIVE EDUCATIONAL SCHEMA BUILDER SIMULATOR
  // =========================================================================
  const sbFieldName = document.getElementById('sb-field-name');
  const sbFieldType = document.getElementById('sb-field-type');
  const sbMin = document.getElementById('sb-min');
  const sbMax = document.getElementById('sb-max');
  const sbMinLen = document.getElementById('sb-min-len');
  const sbMaxLen = document.getElementById('sb-max-len');
  const sbDefault = document.getElementById('sb-default');
  const sbRequired = document.getElementById('sb-required');
  const sbTrim = document.getElementById('sb-trim');
  const sbLowercase = document.getElementById('sb-lowercase');
  const sbUnique = document.getElementById('sb-unique');

  const sbNumOptions = document.getElementById('sb-num-options');
  const sbStrOptions = document.getElementById('sb-str-options');
  const sbGeneratedCode = document.getElementById('sb-generated-code');
  const sbSampleJson = document.getElementById('sb-sample-json');

  function updateSchemaBuilder() {
    if (!sbFieldName || !sbFieldType || !sbGeneratedCode) return;

    const fName = sbFieldName.value.trim() || 'field';
    const fType = sbFieldType.value;

    // Toggle number vs string options visibility
    if (fType === 'Number') {
      if (sbNumOptions) sbNumOptions.style.display = 'grid';
      if (sbStrOptions) sbStrOptions.style.display = 'none';
    } else if (fType === 'String') {
      if (sbNumOptions) sbNumOptions.style.display = 'none';
      if (sbStrOptions) sbStrOptions.style.display = 'grid';
    } else {
      if (sbNumOptions) sbNumOptions.style.display = 'none';
      if (sbStrOptions) sbStrOptions.style.display = 'none';
    }

    // Build Schema Definition
    const lines = [`  type: ${fType === 'Array' ? '[String]' : fType}`];

    if (sbRequired && sbRequired.checked) {
      lines.push('  required: true');
    }

    if (fType === 'Number') {
      if (sbMin && sbMin.value !== '') lines.push(`  min: ${sbMin.value}`);
      if (sbMax && sbMax.value !== '') lines.push(`  max: ${sbMax.value}`);
    }

    if (fType === 'String') {
      if (sbMinLen && sbMinLen.value !== '') lines.push(`  minLength: ${sbMinLen.value}`);
      if (sbMaxLen && sbMaxLen.value !== '') lines.push(`  maxLength: ${sbMaxLen.value}`);
      if (sbTrim && sbTrim.checked) lines.push('  trim: true');
      if (sbLowercase && sbLowercase.checked) lines.push('  lowercase: true');
    }

    if (sbUnique && sbUnique.checked) {
      lines.push('  unique: true // Creates MongoDB Unique Index');
    }

    if (sbDefault && sbDefault.value.trim() !== '') {
      const defVal = sbDefault.value.trim();
      if (defVal === 'Date.now' || defVal === 'true' || defVal === 'false' || !isNaN(Number(defVal))) {
        lines.push(`  default: ${defVal}`);
      } else {
        lines.push(`  default: "${defVal}"`);
      }
    }

    sbGeneratedCode.textContent = `${fName}: {\n${lines.join(',\n')}\n}`;

    // Sample Document JSON
    let sampleVal = '"Rahul"';
    if (fType === 'Number') sampleVal = 22;
    if (fType === 'Boolean') sampleVal = true;
    if (fType === 'Date') sampleVal = '"2026-09-24T18:00:00.000Z"';
    if (fType === 'Array') sampleVal = '["React", "Node.js"]';
    if (fType === 'ObjectId') sampleVal = '"65f2a1b98c3e4a001..."';

    if (sbSampleJson) {
      sbSampleJson.textContent = `{\n  "${fName}": ${sampleVal}\n}`;
    }
  }

  [sbFieldName, sbFieldType, sbMin, sbMax, sbMinLen, sbMaxLen, sbDefault, sbRequired, sbTrim, sbLowercase, sbUnique].forEach(input => {
    if (input) {
      input.addEventListener('input', updateSchemaBuilder);
      input.addEventListener('change', updateSchemaBuilder);
    }
  });

  // =========================================================================
  // 12. INTERACTIVE STUDENT VALIDATION SANDBOX
  // =========================================================================
  const vsName = document.getElementById('vs-name');
  const vsEmail = document.getElementById('vs-email');
  const vsAge = document.getElementById('vs-age');
  const vsCourse = document.getElementById('vs-course');
  const vsMark = document.getElementById('vs-mark');
  const vsGender = document.getElementById('vs-gender');
  const runSandboxBtn = document.getElementById('run-sandbox-btn');
  const vsOutputBox = document.getElementById('vs-output-box');

  const sandboxPresets = {
    valid: {
      name: "  Rahul Sharma  ",
      email: "RAHUL@GMAIL.COM",
      age: 22,
      course: "MERN",
      mark: 88,
      gender: "Male"
    },
    missing_name: {
      name: "",
      email: "sneha@gmail.com",
      age: 21,
      course: "Python",
      mark: 92,
      gender: "Female"
    },
    bad_email: {
      name: "Kiran Das",
      email: "not-an-email-address",
      age: 23,
      course: "Java",
      mark: 75,
      gender: "Other"
    },
    underage: {
      name: "Young Coder",
      email: "young@school.com",
      age: 14,
      course: "MERN",
      mark: 90,
      gender: "Male"
    },
    bad_course: {
      name: "Anand R",
      email: "anand@gmail.com",
      age: 25,
      course: "Robotics",
      mark: 80,
      gender: "Male"
    },
    bad_mark: {
      name: "Pooja V",
      email: "pooja@gmail.com",
      age: 24,
      course: "MERN",
      mark: 150,
      gender: "Female"
    },
    defaults_test: {
      name: "Deepak Menon",
      email: "deepak@gmail.com",
      age: 26,
      course: "",
      mark: "",
      gender: ""
    }
  };

  window.loadSandboxPreset = function(presetKey) {
    const data = sandboxPresets[presetKey];
    if (!data) return;

    if (vsName) vsName.value = data.name;
    if (vsEmail) vsEmail.value = data.email;
    if (vsAge) vsAge.value = data.age;
    if (vsCourse) vsCourse.value = data.course;
    if (vsMark) vsMark.value = data.mark;
    if (vsGender) vsGender.value = data.gender;

    runValidationSimulation();
  };

  function runValidationSimulation() {
    if (!vsOutputBox) return;

    let rawName = vsName ? vsName.value : '';
    let rawEmail = vsEmail ? vsEmail.value : '';
    let rawAge = vsAge ? vsAge.value : '';
    let rawCourse = vsCourse ? vsCourse.value : '';
    let rawMark = vsMark ? vsMark.value : '';
    let rawGender = vsGender ? vsGender.value : '';

    const errors = [];

    // 1. Name Check (required, minLength: 3, trim)
    const trimmedName = rawName.trim();
    if (!trimmedName) {
      errors.push('name: Name is required');
    } else if (trimmedName.length < 3) {
      errors.push(`name: Path \`name\` (\`${trimmedName}\`) is shorter than the minimum allowed length (3).`);
    } else if (trimmedName.length > 50) {
      errors.push('name: Name cannot exceed 50 characters');
    }

    // 2. Email Check (required, lowercase, match regex)
    const processedEmail = rawEmail.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!processedEmail) {
      errors.push('email: Email is required');
    } else if (!emailRegex.test(processedEmail)) {
      errors.push('email: Please provide a valid email');
    }

    // 3. Age Check (required, min: 18, max: 100)
    if (rawAge === '' || rawAge === null || isNaN(Number(rawAge))) {
      errors.push('age: Age is required');
    } else {
      const numAge = Number(rawAge);
      if (numAge < 18) {
        errors.push(`age: Path \`age\` (${numAge}) is less than minimum allowed value (18).`);
      } else if (numAge > 100) {
        errors.push(`age: Path \`age\` (${numAge}) is more than maximum allowed value (100).`);
      }
    }

    // 4. Course Check (enum: MERN, Python, Java, default: MERN)
    const allowedCourses = ['MERN', 'Python', 'Java'];
    let finalCourse = rawCourse.trim();
    if (!finalCourse) {
      finalCourse = 'MERN'; // Default applied!
    } else if (!allowedCourses.includes(finalCourse)) {
      errors.push(`course: \`${finalCourse}\` is not a valid enum value for path \`course\`.`);
    }

    // 5. Mark Check (min: 0, max: 100, default: 0)
    let finalMark = 0;
    if (rawMark === '' || rawMark === null) {
      finalMark = 0; // Default applied!
    } else {
      finalMark = Number(rawMark);
      if (isNaN(finalMark) || finalMark < 0) {
        errors.push(`mark: Path \`mark\` (${finalMark}) is less than minimum allowed value (0).`);
      } else if (finalMark > 100) {
        errors.push(`mark: Path \`mark\` (${finalMark}) is more than maximum allowed value (100).`);
      }
    }

    // 6. Gender Check (enum: Male, Female, Other)
    const allowedGenders = ['Male', 'Female', 'Other', ''];
    if (rawGender && !allowedGenders.includes(rawGender)) {
      errors.push(`gender: \`${rawGender}\` is not a valid enum value for path \`gender\`.`);
    }

    // Render Output
    if (errors.length > 0) {
      vsOutputBox.innerHTML = `
        <div style="color: #FB7185; font-weight: 700; margin-bottom: 0.5rem;">
          &cross; Mongoose ValidationError (${errors.length} violation${errors.length > 1 ? 's' : ''}):
        </div>
        <div style="color: #FECDD3; line-height: 1.6;">
          Student validation failed:<br>
          ${errors.map(err => `&bull; <span style="color: #F43F5E;">${err}</span>`).join('<br>')}
        </div>
        <div style="margin-top: 0.75rem; color: #94A3B8; font-size: 0.75rem;">
          STATUS: Document REJECTED in memory &bull; MongoDB database was NOT touched!
        </div>
      `;
    } else {
      const simulatedDoc = {
        _id: "ObjectId('65f3c19b02a9b4001a4e" + Math.floor(1000 + Math.random() * 9000) + "')",
        name: trimmedName,
        email: processedEmail,
        age: Number(rawAge),
        gender: rawGender || undefined,
        course: finalCourse,
        mark: finalMark,
        skills: ["JavaScript", "React"],
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0
      };

      vsOutputBox.innerHTML = `
        <div style="color: #00ED64; font-weight: 700; margin-bottom: 0.5rem;">
          &check; Validation Passed! Document Successfully Prepared &amp; Saved to MongoDB:
        </div>
        <pre style="color: #E2E8F0; line-height: 1.5; font-size: 0.8rem; overflow-x: auto;">${JSON.stringify(simulatedDoc, null, 2)}</pre>
        <div style="margin-top: 0.75rem; color: #38BDF8; font-size: 0.75rem;">
          NOTE: Applied trim on name, lowercase on email, defaults on course &amp; mark, auto-generated _id &amp; timestamps!
        </div>
      `;
    }
  }

  if (runSandboxBtn) runSandboxBtn.addEventListener('click', runValidationSimulation);

  // =========================================================================
  // 13. GRADED 15-QUESTION INTERACTIVE QUIZ ENGINE
  // =========================================================================
  const quizData = [
    {
      id: 1,
      q: "What is Mongoose?",
      options: [
        "A relational SQL database management system",
        "An Object Data Modeling (ODM) library for MongoDB and Node.js",
        "A CSS framework for building dark developer dashboards",
        "The command-line shell used to manage MongoDB servers"
      ],
      correct: 1,
      exp: "Mongoose is an ODM library designed for Node.js applications to structure, cast, and validate MongoDB documents."
    },
    {
      id: 2,
      q: "What does ODM stand for?",
      options: [
        "Online Database Management",
        "Object Data Modeling",
        "Ordered Document Mapping",
        "Operational Driver Module"
      ],
      correct: 1,
      exp: "ODM stands for Object Data Modeling. It maps JavaScript objects in Node.js memory to BSON documents in MongoDB."
    },
    {
      id: 3,
      q: "What is a Mongoose Schema?",
      options: [
        "The compiled interface used to perform queries like find()",
        "The physical disk file where MongoDB stores documents",
        "A blueprint defining the shape, fields, types, and rules of documents",
        "An environment variable storing the database URI"
      ],
      correct: 2,
      exp: "A Schema is the architectural blueprint. It defines document structure, types, default values, and validation rules."
    },
    {
      id: 4,
      q: "What is a Mongoose Model?",
      options: [
        "A compiled JavaScript constructor created from a Schema used to create and query documents",
        "A raw JSON file stored on disk",
        "A MongoDB command line command",
        "The connection string used to connect to port 27017"
      ],
      correct: 0,
      exp: "A Model is compiled via mongoose.model(name, schema) and gives you methods like create(), find(), and updateOne()."
    },
    {
      id: 5,
      q: "What is the difference between a Schema and a Document?",
      options: [
        "Schema is a database; Document is a collection",
        "Schema is the blueprint/rulebook; Document is the actual stored data record",
        "Schema is written in C++; Document is written in Python",
        "There is no difference; they are identical terms in Mongoose"
      ],
      correct: 1,
      exp: "Schema defines the rules and structure; a Document is an individual data record satisfying that schema."
    },
    {
      id: 6,
      q: "What does mongoose.connect() do?",
      options: [
        "Compiles a new Schema into a Model",
        "Establishes an asynchronous network connection between Node.js and MongoDB",
        "Creates a new collection on disk",
        "Exports the server entry point"
      ],
      correct: 1,
      exp: "mongoose.connect() opens the primary connection pool to the specified MongoDB database."
    },
    {
      id: 7,
      q: "What is port 27017 in a connection string?",
      options: [
        "The HTTP port used by Node.js web servers",
        "The default TCP port on which MongoDB server listens",
        "The process ID of the Node.js daemon",
        "The unique student enrollment ID"
      ],
      correct: 1,
      exp: "Port 27017 is the official default network port assigned to MongoDB."
    },
    {
      id: 8,
      q: "Why should we use .env and dotenv for the MongoDB URI?",
      options: [
        "To make Node.js run 10x faster",
        "To prevent committing sensitive credentials and passwords into public Git repositories",
        "Because Mongoose crashes if you don't install dotenv",
        "To automatically compile TypeScript code"
      ],
      correct: 1,
      exp: "Storing database URIs in .env prevents exposing secret passwords or cloud cluster URLs in source control."
    },
    {
      id: 9,
      q: "What does the required: true validator do?",
      options: [
        "Guarantees that the field cannot be omitted or undefined when saving a document",
        "Encrypts the field using AES-256",
        "Creates a unique index in MongoDB",
        "Forces the field to be a number"
      ],
      correct: 0,
      exp: "required enforces that a field must have a defined value before Mongoose allows the document to be saved."
    },
    {
      id: 10,
      q: "When does Mongoose apply a default value?",
      options: [
        "Only when the value is strictly null",
        "When the field is omitted or strictly undefined",
        "Whenever a validation error occurs",
        "Every time a document is read from disk"
      ],
      correct: 1,
      exp: "Defaults are triggered exclusively when a property is strictly undefined. If the caller passes null, the default is NOT applied!"
    },
    {
      id: 11,
      q: "What is the difference between min and minLength?",
      options: [
        "min applies to numbers/dates (value >= min); minLength applies to strings (char count >= minLength)",
        "min applies to strings; minLength applies to numbers",
        "Both do the exact same thing interchangeably",
        "min is for MongoDB; minLength is for MySQL"
      ],
      correct: 0,
      exp: "min constrains numeric values or dates, while minLength constrains the string character length."
    },
    {
      id: 12,
      q: "What does the enum validator do?",
      options: [
        "Converts lowercase strings to uppercase",
        "Restricts a string to a predefined whitelist of allowed values",
        "Counts the number of documents in a collection",
        "Removes duplicate values from an array"
      ],
      correct: 1,
      exp: "enum ensures that a string field only accepts one of the specific allowed options (e.g. ['Male', 'Female', 'Other'])."
    },
    {
      id: 13,
      q: "What does the trim: true schema modifier do?",
      options: [
        "Deletes empty documents from the collection",
        "Removes leading and trailing whitespace from string input",
        "Limits the string to 10 characters",
        "Converts spaces into hyphens"
      ],
      correct: 1,
      exp: "trim sanitizes text inputs by stripping unwanted extra spaces from the beginning and end of strings."
    },
    {
      id: 14,
      q: "Is unique: true a Mongoose validator?",
      options: [
        "Yes, it is a built-in schema validator that returns ValidationError",
        "No! It is an instruction to MongoDB to create a unique index; duplicates throw an E11000 database error",
        "Yes, it only works on number fields",
        "No, unique was deprecated in Mongoose 5"
      ],
      correct: 1,
      exp: "Crucial rule: unique is NOT a validator. It creates a MongoDB unique index, and duplicate violations throw MongoDB driver error E11000."
    },
    {
      id: 15,
      q: "What does { timestamps: true } provide when passed to a Schema?",
      options: [
        "Limits queries to 10 milliseconds",
        "Automatically generates and updates createdAt and updatedAt date fields",
        "Deletes records older than 30 days",
        "Converts all dates to Unix epoch seconds"
      ],
      correct: 1,
      exp: "timestamps: true tells Mongoose to automatically create and update createdAt and updatedAt fields on every document."
    }
  ];

  function renderQuiz(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = quizData.map((item, idx) => `
      <div class="quiz-card" id="${containerId}-q-${idx}">
        <div class="quiz-q-num">Question ${idx + 1} of ${quizData.length}</div>
        <div class="quiz-question-text">${item.q}</div>
        <div class="quiz-options">
          ${item.options.map((opt, oIdx) => `
            <label class="quiz-option" id="${containerId}-opt-${idx}-${oIdx}">
              <input type="radio" name="${containerId}-q-${idx}" value="${oIdx}">
              <span>${opt}</span>
            </label>
          `).join('')}
        </div>
        <div class="quiz-explanation" id="${containerId}-exp-${idx}">
          <strong>Explanation:</strong> ${item.exp}
        </div>
      </div>
    `).join('');

    // Attach click highlight
    container.querySelectorAll('.quiz-option').forEach(label => {
      label.addEventListener('click', () => {
        const parent = label.closest('.quiz-options');
        parent.querySelectorAll('.quiz-option').forEach(l => l.classList.remove('selected'));
        label.classList.add('selected');
      });
    });
  }

  function gradeQuiz(containerId, statusId, resetBtnId, submitBtnId) {
    let score = 0;
    let answeredCount = 0;

    quizData.forEach((item, idx) => {
      const selected = document.querySelector(`input[name="${containerId}-q-${idx}"]:checked`);
      const card = document.getElementById(`${containerId}-q-${idx}`);
      const exp = document.getElementById(`${containerId}-exp-${idx}`);

      if (selected) {
        answeredCount++;
        const val = parseInt(selected.value, 10);
        if (val === item.correct) {
          score++;
          if (card) {
            card.classList.add('correct');
            card.classList.remove('incorrect');
          }
          if (exp) {
            exp.classList.add('show');
            exp.style.background = 'rgba(0, 237, 100, 0.1)';
            exp.style.border = '1px solid rgba(0, 237, 100, 0.3)';
            exp.style.color = '#D1FAE5';
          }
        } else {
          if (card) {
            card.classList.add('incorrect');
            card.classList.remove('correct');
          }
          if (exp) {
            exp.classList.add('show');
            exp.style.background = 'rgba(251, 113, 133, 0.1)';
            exp.style.border = '1px solid rgba(251, 113, 133, 0.3)';
            exp.style.color = '#FFE4E6';
          }
        }
      } else {
        if (card) {
          card.classList.add('incorrect');
        }
        if (exp) {
          exp.classList.add('show');
          exp.style.background = 'rgba(251, 191, 36, 0.1)';
          exp.style.border = '1px solid rgba(251, 191, 36, 0.3)';
          exp.style.color = '#FEF3C7';
        }
      }
    });

    const statusEl = document.getElementById(statusId);
    const percentage = Math.round((score / quizData.length) * 100);

    if (statusEl) {
      statusEl.innerHTML = `
        <span style="font-weight: 700; color: ${percentage >= 70 ? '#00ED64' : '#FB7185'}; font-size: 1rem;">
          Your Score: ${score} / ${quizData.length} (${percentage}%)
        </span> &bull; ${percentage >= 70 ? 'Excellent! You have mastered Day 3 Mongoose fundamentals!' : 'Review the red explanations and try again!'}
      `;
    }

    const resetBtn = document.getElementById(resetBtnId);
    const submitBtn = document.getElementById(submitBtnId);
    if (resetBtn) resetBtn.style.display = 'inline-flex';
    if (submitBtn) submitBtn.textContent = 'Recalculate Grade';
  }

  function resetQuiz(containerId, statusId, resetBtnId, submitBtnId) {
    renderQuiz(containerId);
    const statusEl = document.getElementById(statusId);
    if (statusEl) statusEl.textContent = '15 questions total. Select answers and click Submit.';
    const resetBtn = document.getElementById(resetBtnId);
    const submitBtn = document.getElementById(submitBtnId);
    if (resetBtn) resetBtn.style.display = 'none';
    if (submitBtn) submitBtn.textContent = 'Submit Quiz & Grade';
  }

  // Bind Quiz in Slide 63
  const submitSlideQuizBtn = document.getElementById('submit-slide-quiz-btn');
  const resetSlideQuizBtn = document.getElementById('reset-slide-quiz-btn');
  if (submitSlideQuizBtn) {
    submitSlideQuizBtn.addEventListener('click', () => {
      gradeQuiz('slide-quiz-container', 'slide-quiz-status', 'reset-slide-quiz-btn', 'submit-slide-quiz-btn');
    });
  }
  if (resetSlideQuizBtn) {
    resetSlideQuizBtn.addEventListener('click', () => {
      resetQuiz('slide-quiz-container', 'slide-quiz-status', 'reset-slide-quiz-btn', 'submit-slide-quiz-btn');
    });
  }

  // Bind Quiz in Modal
  const modalSubmitQuizBtn = document.getElementById('modal-submit-quiz-btn');
  const modalResetQuizBtn = document.getElementById('modal-reset-quiz-btn');
  if (modalSubmitQuizBtn) {
    modalSubmitQuizBtn.addEventListener('click', () => {
      gradeQuiz('modal-quiz-container', 'modal-quiz-status', 'modal-reset-quiz-btn', 'modal-submit-quiz-btn');
    });
  }
  if (modalResetQuizBtn) {
    modalResetQuizBtn.addEventListener('click', () => {
      resetQuiz('modal-quiz-container', 'modal-quiz-status', 'modal-reset-quiz-btn', 'modal-submit-quiz-btn');
    });
  }

  // =========================================================================
  // 14. SEARCHABLE CHEAT SHEET
  // =========================================================================
  const cheatItemsData = [
    {
      cat: "Setup & Dependencies",
      items: [
        { label: "Install Mongoose", code: "npm install mongoose" },
        { label: "Install dotenv", code: "npm install dotenv" },
        { label: "Load .env in Node", code: "require('dotenv').config()" },
        { label: "Import Mongoose", code: "const mongoose = require('mongoose')" }
      ]
    },
    {
      cat: "Connection Logic",
      items: [
        { label: "Connect (Local 127.0.0.1)", code: "mongoose.connect('mongodb://127.0.0.1:27017/collegeDB')" },
        { label: "Connect via .env", code: "mongoose.connect(process.env.MONGODB_URI)" },
        { label: "Connection Error Exit", code: "process.exit(1)" },
        { label: "Atlas srv Protocol", code: "mongodb+srv://user:pass@cluster.mongodb.net/db" }
      ]
    },
    {
      cat: "Schemas & Models",
      items: [
        { label: "Create Schema", code: "const schema = new mongoose.Schema({...})" },
        { label: "Compile Model", code: "const Student = mongoose.model('Student', schema)" },
        { label: "Create Document", code: "await Student.create({ name: 'Rahul' })" },
        { label: "New Instance & Save", code: "const doc = new Student({...}); await doc.save()" }
      ]
    },
    {
      cat: "Built-in Validators",
      items: [
        { label: "Required Field", code: "required: [true, 'Name is required']" },
        { label: "Numeric Minimum", code: "min: [18, 'Age must be at least 18']" },
        { label: "Numeric Maximum", code: "max: [100, 'Age cannot exceed 100']" },
        { label: "String Min Length", code: "minLength: [3, 'Minimum 3 chars']" },
        { label: "String Max Length", code: "maxLength: [50, 'Max 50 chars']" },
        { label: "Allowed Whitelist", code: "enum: ['Male', 'Female', 'Other']" },
        { label: "Regex Pattern Match", code: "match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email']" },
        { label: "Custom Validator", code: "validate: { validator: fn, message: '...' }" }
      ]
    },
    {
      cat: "Defaults & Modifiers",
      items: [
        { label: "Boolean Default", code: "default: true" },
        { label: "Number Default", code: "default: 0" },
        { label: "String Default", code: "default: 'student'" },
        { label: "Date.now Default", code: "default: Date.now" },
        { label: "Trim Whitespace", code: "trim: true" },
        { label: "Lowercase String", code: "lowercase: true" },
        { label: "Uppercase String", code: "uppercase: true" }
      ]
    },
    {
      cat: "Constraints & Options",
      items: [
        { label: "Unique Index (Not validator!)", code: "unique: true" },
        { label: "Immutable Field", code: "immutable: true" },
        { label: "Timestamps Option", code: "{ timestamps: true }" },
        { label: "Custom Collection Name", code: "mongoose.model('Student', schema, 'custom_name')" }
      ]
    }
  ];

  function renderCheatGrid(targetId, filter = '') {
    const container = document.getElementById(targetId);
    if (!container) return;

    const lowerFilter = filter.toLowerCase();

    const filteredCats = cheatItemsData.map(group => {
      const filteredItems = group.items.filter(item => {
        return item.label.toLowerCase().includes(lowerFilter) || item.code.toLowerCase().includes(lowerFilter);
      });
      return { cat: group.cat, items: filteredItems };
    }).filter(group => group.items.length > 0);

    if (filteredCats.length === 0) {
      container.innerHTML = '<div style="color: var(--text-muted); padding: 1rem;">No matching commands found.</div>';
      return;
    }

    container.innerHTML = filteredCats.map(group => `
      <div class="cheat-card">
        <h4>${group.cat}</h4>
        ${group.items.map(item => `
          <div class="cheat-item">
            <span>${item.label}</span>
            <code>${item.code}</code>
          </div>
        `).join('')}
      </div>
    `).join('');
  }

  if (modalCheatSearch) {
    modalCheatSearch.addEventListener('input', (e) => {
      renderCheatGrid('modal-cheat-grid', e.target.value);
    });
  }

  if (slideCheatSearch) {
    slideCheatSearch.addEventListener('input', (e) => {
      renderCheatGrid('slide-cheat-grid', e.target.value);
    });
  }

  // =========================================================================
  // 15. INITIALIZATION
  // =========================================================================
  function init() {
    buildTOC();
    renderQuiz('slide-quiz-container');
    renderQuiz('modal-quiz-container');
    renderCheatGrid('modal-cheat-grid');
    renderCheatGrid('slide-cheat-grid');
    updateSchemaBuilder();

    // Check URL Hash for initial slide (e.g. #slide-15)
    if (window.location.hash) {
      const match = window.location.hash.match(/#slide-(\d+)/);
      if (match && match[1]) {
        const slideNum = parseInt(match[1], 10) - 1;
        if (slideNum >= 0 && slideNum < totalSlides) {
          goToSlide(slideNum);
          return;
        }
      }
    }

    // Default to first slide
    goToSlide(0);
  }

  init();

});
