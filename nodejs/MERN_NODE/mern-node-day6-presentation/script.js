/**
 * Node.js Day 6 (CRUD, Middleware & MVC Architecture)
 * Interactive Presentation Engine & Simulators
 * Pure Vanilla JavaScript (ES6+)
 */

(function () {
  'use strict';

  // Section Mapping for all 18 slides
  const SLIDE_SECTIONS = [
    { start: 1, end: 3, name: 'Overview & What is CRUD?' },
    { start: 4, end: 10, name: 'Section 1: Implementing CRUD API' },
    { start: 11, end: 15, name: 'Section 2: Express Middleware' },
    { start: 16, end: 18, name: 'Section 3: MVC Architecture' }
  ];

  // DOM Elements
  const slides = Array.from(document.querySelectorAll('.slide'));
  const totalSlides = slides.length;
  let currentIndex = 0;

  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const slideCounter = document.getElementById('slide-counter');
  const progressBar = document.getElementById('progress-bar');
  const sectionIndicator = document.getElementById('section-indicator');
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  const tocBtn = document.getElementById('toc-btn');
  const tocOverlay = document.getElementById('toc-overlay');
  const tocCloseBtn = document.getElementById('toc-close');
  const tocList = document.getElementById('toc-list');
  const helpBtn = document.getElementById('help-btn');
  const helpModalOverlay = document.getElementById('help-modal-overlay');
  const helpModalClose = document.getElementById('help-modal-close');

  /**
   * Determine section label based on slide number
   */
  function getSectionName(slideNum) {
    for (const sec of SLIDE_SECTIONS) {
      if (slideNum >= sec.start && slideNum <= sec.end) {
        return sec.name;
      }
    }
    return 'Express CRUD & MVC';
  }

  /**
   * Navigate to a slide index (0 to totalSlides - 1)
   */
  function goToSlide(targetIndex, updateHash = true) {
    if (targetIndex < 0 || targetIndex >= totalSlides) return;

    if (slides[currentIndex]) {
      slides[currentIndex].classList.remove('active');
    }

    currentIndex = targetIndex;
    const slideNumber = currentIndex + 1;

    if (slides[currentIndex]) {
      slides[currentIndex].classList.add('active');
      slides[currentIndex].scrollTop = 0;
    }

    // Update Counter (e.g., 01 / 18)
    const pad = (n) => (n < 10 ? '0' + n : n);
    if (slideCounter) {
      slideCounter.textContent = `${pad(slideNumber)} / ${pad(totalSlides)}`;
    }

    // Update Progress Bar
    if (progressBar) {
      const percentage = (slideNumber / totalSlides) * 100;
      progressBar.style.width = `${percentage}%`;
    }

    // Update Section Indicator
    if (sectionIndicator) {
      sectionIndicator.textContent = getSectionName(slideNumber);
    }

    // Update Button Disabled States
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === totalSlides - 1;

    // Update URL hash
    if (updateHash) {
      try {
        history.replaceState(null, '', `#slide-${slideNumber}`);
      } catch (err) {}
    }

    // Update active state in Table of Contents
    const tocItems = document.querySelectorAll('.toc-item');
    tocItems.forEach((item, idx) => {
      if (idx === currentIndex) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  function nextSlide() {
    if (currentIndex < totalSlides - 1) {
      goToSlide(currentIndex + 1);
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    }
  }

  /**
   * Build Table of Contents dynamically from slide titles
   */
  function buildToc() {
    if (!tocList) return;
    tocList.innerHTML = '';

    slides.forEach((slide, idx) => {
      const num = idx + 1;
      let title = `Slide ${num}`;

      const titleElem = slide.querySelector('.slide-title');
      if (titleElem) {
        title = titleElem.textContent.trim();
      } else if (slide.querySelector('.hero-title')) {
        title = 'Title: CRUD API, Middleware & MVC';
      }

      const li = document.createElement('li');
      li.className = `toc-item ${idx === currentIndex ? 'active' : ''}`;
      li.innerHTML = `
        <span class="toc-item-num">${num < 10 ? '0' + num : num}</span>
        <span class="toc-item-title">${title}</span>
      `;

      li.addEventListener('click', () => {
        goToSlide(idx);
        closeToc();
      });

      tocList.appendChild(li);
    });
  }

  function openToc() {
    if (tocOverlay) {
      buildToc();
      tocOverlay.classList.add('active');
    }
  }

  function closeToc() {
    if (tocOverlay) {
      tocOverlay.classList.remove('active');
    }
  }

  function openHelp() {
    if (helpModalOverlay) helpModalOverlay.classList.add('active');
  }

  function closeHelp() {
    if (helpModalOverlay) helpModalOverlay.classList.remove('active');
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }

  /**
   * Initialize Copy Code Buttons
   */
  function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const container = btn.closest('.code-container') || btn.closest('.mvc-tab-container');
        if (!container) return;
        const activeBlock = container.querySelector('.mvc-tab-content.active pre code') ||
                            container.querySelector('code') ||
                            container.querySelector('pre');
        if (!activeBlock) return;

        const textToCopy = activeBlock.innerText;
        try {
          await navigator.clipboard.writeText(textToCopy);
          const originalHTML = btn.innerHTML;
          btn.innerHTML = `
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span style="color:#4ade80">Copied!</span>
          `;
          setTimeout(() => {
            btn.innerHTML = originalHTML;
          }, 2000);
        } catch (err) {
          console.warn('Clipboard write failed:', err);
        }
      });
    });
  }

  /**
   * Keyboard Shortcuts Handler
   */
  function handleKeydown(e) {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
      if (e.key === 'Escape') e.target.blur();
      return;
    }

    switch (e.key) {
      case 'ArrowRight':
      case 'Space':
      case 'PageDown':
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
        e.preventDefault();
        toggleFullscreen();
        break;
      case 't':
      case 'T':
      case 'm':
      case 'M':
        e.preventDefault();
        if (tocOverlay && tocOverlay.classList.contains('active')) {
          closeToc();
        } else {
          openToc();
        }
        break;
      case '?':
      case 'h':
      case 'H':
        e.preventDefault();
        if (helpModalOverlay && helpModalOverlay.classList.contains('active')) {
          closeHelp();
        } else {
          openHelp();
        }
        break;
      case 'Escape':
        closeToc();
        closeHelp();
        break;
      default:
        break;
    }
  }

  /**
   * Hash change deep linking support (#slide-1 to #slide-18)
   */
  function handleHash() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#slide-')) {
      const num = parseInt(hash.replace('#slide-', ''), 10);
      if (!isNaN(num) && num >= 1 && num <= totalSlides) {
        goToSlide(num - 1, false);
      }
    }
  }

  /* ==========================================================================
     INTERACTIVE SANDBOX 1: Complete CRUD API Simulator (Slide 10)
     ========================================================================== */
  function initCrudSimulator() {
    let stateStudents = [
      { id: 1, name: "Anu", email: "anu@gmail.com", course: "MERN" },
      { id: 2, name: "Rahul", email: "rahul@gmail.com", course: "Python" }
    ];

    const methodSelect = document.getElementById('crud-sim-method');
    const urlInput = document.getElementById('crud-sim-url');
    const bodyInput = document.getElementById('crud-sim-body');
    const sendBtn = document.getElementById('crud-sim-send');
    const resetBtn = document.getElementById('crud-sim-reset');
    const statusBadge = document.getElementById('crud-sim-status');
    const responseBox = document.getElementById('crud-sim-response');
    const arrayView = document.getElementById('crud-sim-array-view');

    if (!methodSelect || !urlInput || !sendBtn || !responseBox) return;

    function renderState() {
      if (arrayView) {
        arrayView.textContent = JSON.stringify(stateStudents, null, 2);
      }
    }

    function setStatus(code, text) {
      if (!statusBadge) return;
      statusBadge.className = `badge-status status-${code}`;
      statusBadge.textContent = `${code} ${text}`;
    }

    function handleRequest() {
      const method = methodSelect.value;
      const fullUrl = urlInput.value.trim().replace(/\/+$/, '') || '/';

      let reqBody = {};
      if (['POST', 'PUT', 'PATCH'].includes(method)) {
        try {
          const raw = bodyInput ? bodyInput.value.trim() : '';
          reqBody = raw ? JSON.parse(raw) : {};
        } catch (err) {
          setStatus(400, 'Bad Request');
          responseBox.textContent = JSON.stringify({ error: "Invalid JSON in Request Body" }, null, 2);
          return;
        }
      }

      // 1. GET /students
      if (method === 'GET' && fullUrl === '/students') {
        setStatus(200, 'OK');
        responseBox.textContent = JSON.stringify({
          count: stateStudents.length,
          data: stateStudents
        }, null, 2);
        return;
      }

      // 2. GET /students/:id
      const matchGetOne = fullUrl.match(/^\/students\/(\d+)$/);
      if (method === 'GET' && matchGetOne) {
        const id = Number(matchGetOne[1]);
        const student = stateStudents.find(s => s.id === id);
        if (!student) {
          setStatus(404, 'Not Found');
          responseBox.textContent = JSON.stringify({ message: "Student not found" }, null, 2);
        } else {
          setStatus(200, 'OK');
          responseBox.textContent = JSON.stringify({ data: student }, null, 2);
        }
        return;
      }

      // 3. POST /students
      if (method === 'POST' && fullUrl === '/students') {
        const { name, email, course } = reqBody;
        if (!name || !email || !course) {
          setStatus(400, 'Bad Request');
          responseBox.textContent = JSON.stringify({ message: "All fields are required" }, null, 2);
          return;
        }

        const newId = stateStudents.length
          ? Math.max(...stateStudents.map(s => s.id)) + 1
          : 1;

        const newStudent = { id: newId, name, email, course };
        stateStudents.push(newStudent);
        renderState();

        setStatus(201, 'Created');
        responseBox.textContent = JSON.stringify({
          message: "Student created successfully",
          data: newStudent
        }, null, 2);
        return;
      }

      // 4. PUT /students/:id
      const matchPut = fullUrl.match(/^\/students\/(\d+)$/);
      if (method === 'PUT' && matchPut) {
        const id = Number(matchPut[1]);
        const student = stateStudents.find(s => s.id === id);
        if (!student) {
          setStatus(404, 'Not Found');
          responseBox.textContent = JSON.stringify({ message: "Student not found" }, null, 2);
          return;
        }

        const { name, email, course } = reqBody;
        if (!name || !email || !course) {
          setStatus(400, 'Bad Request');
          responseBox.textContent = JSON.stringify({ message: "All fields are required" }, null, 2);
          return;
        }

        student.name = name;
        student.email = email;
        student.course = course;
        renderState();

        setStatus(200, 'OK');
        responseBox.textContent = JSON.stringify({
          message: "Student updated successfully",
          data: student
        }, null, 2);
        return;
      }

      // 5. PATCH /students/:id
      const matchPatch = fullUrl.match(/^\/students\/(\d+)$/);
      if (method === 'PATCH' && matchPatch) {
        const id = Number(matchPatch[1]);
        const student = stateStudents.find(s => s.id === id);
        if (!student) {
          setStatus(404, 'Not Found');
          responseBox.textContent = JSON.stringify({ message: "Student not found" }, null, 2);
          return;
        }

        const allowedFields = ["name", "email", "course"];
        const updates = Object.keys(reqBody);

        if (updates.length === 0 || updates.some(f => !allowedFields.includes(f))) {
          setStatus(400, 'Bad Request');
          responseBox.textContent = JSON.stringify({ message: "Provide valid fields to update" }, null, 2);
          return;
        }

        Object.assign(student, reqBody);
        renderState();

        setStatus(200, 'OK');
        responseBox.textContent = JSON.stringify({
          message: "Student partially updated",
          data: student
        }, null, 2);
        return;
      }

      // 6. DELETE /students/:id
      const matchDelete = fullUrl.match(/^\/students\/(\d+)$/);
      if (method === 'DELETE' && matchDelete) {
        const id = Number(matchDelete[1]);
        const index = stateStudents.findIndex(s => s.id === id);
        if (index === -1) {
          setStatus(404, 'Not Found');
          responseBox.textContent = JSON.stringify({ message: "Student not found" }, null, 2);
          return;
        }

        const deleted = stateStudents.splice(index, 1)[0];
        renderState();

        setStatus(200, 'OK');
        responseBox.textContent = JSON.stringify({
          message: "Student deleted successfully",
          data: deleted
        }, null, 2);
        return;
      }

      // 404 Route Not Found
      setStatus(404, 'Not Found');
      responseBox.textContent = JSON.stringify({
        error: `Cannot ${method} ${fullUrl}`,
        supported: "GET /students, GET /students/:id, POST /students, PUT /students/:id, PATCH /students/:id, DELETE /students/:id"
      }, null, 2);
    }

    sendBtn.addEventListener('click', handleRequest);

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        stateStudents = [
          { id: 1, name: "Anu", email: "anu@gmail.com", course: "MERN" },
          { id: 2, name: "Rahul", email: "rahul@gmail.com", course: "Python" }
        ];
        renderState();
        setStatus(200, 'OK');
        responseBox.textContent = JSON.stringify({ message: "In-memory student array reset to initial 2 records." }, null, 2);
      });
    }

    const presetBtns = document.querySelectorAll('.crud-preset-btn');
    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const m = btn.getAttribute('data-method');
        const u = btn.getAttribute('data-url');
        const b = btn.getAttribute('data-body');

        if (m) methodSelect.value = m;
        if (u) urlInput.value = u;
        if (bodyInput && b !== null) bodyInput.value = b || '';
        handleRequest();
      });
    });

    renderState();
    handleRequest();
  }

  /* ==========================================================================
     INTERACTIVE SANDBOX 2: Validation Middleware Checkpoint Simulator (Slide 14)
     ========================================================================== */
  function initValidationSimulator() {
    const validBtn = document.getElementById('demo-val-valid');
    const invalidBtn = document.getElementById('demo-val-invalid');
    const flowCheck = document.getElementById('demo-val-checkpoint');
    const flowResult = document.getElementById('demo-val-result');

    if (!validBtn || !invalidBtn || !flowCheck || !flowResult) return;

    validBtn.addEventListener('click', () => {
      flowCheck.style.background = "#dcfce7";
      flowCheck.innerHTML = "<strong>Checkpoint:</strong> All fields provided! &rarr; Calling <code>next()</code>";
      flowResult.className = "badge-status status-201";
      flowResult.textContent = "201 Created (Controller Executed)";
    });

    invalidBtn.addEventListener('click', () => {
      flowCheck.style.background = "#fee2e2";
      flowCheck.innerHTML = "<strong>Checkpoint:</strong> Missing fields! &rarr; Blocked at checkpoint!";
      flowResult.className = "badge-status status-400";
      flowResult.textContent = "400 Bad Request (Halted Before Controller)";
    });
  }

  /* ==========================================================================
     INTERACTIVE SANDBOX 3: MVC Tabbed Code Explorer (Slide 18)
     ========================================================================== */
  function initMvcTabExplorer() {
    const tabBtns = document.querySelectorAll('.mvc-tab-btn');
    const tabContents = document.querySelectorAll('.mvc-tab-content');

    if (!tabBtns.length || !tabContents.length) return;

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');

        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  }

  /**
   * Initialize on DOM Ready
   */
  function init() {
    buildToc();
    initCopyButtons();
    initCrudSimulator();
    initValidationSimulator();
    initMvcTabExplorer();

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);
    if (tocBtn) tocBtn.addEventListener('click', openToc);
    if (tocCloseBtn) tocCloseBtn.addEventListener('click', closeToc);
    if (tocOverlay) {
      tocOverlay.addEventListener('click', (e) => {
        if (e.target === tocOverlay) closeToc();
      });
    }
    if (helpBtn) helpBtn.addEventListener('click', openHelp);
    if (helpModalClose) helpModalClose.addEventListener('click', closeHelp);
    if (helpModalOverlay) {
      helpModalOverlay.addEventListener('click', (e) => {
        if (e.target === helpModalOverlay) closeHelp();
      });
    }

    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('hashchange', handleHash);

    if (window.location.hash) {
      handleHash();
    } else {
      goToSlide(0);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
