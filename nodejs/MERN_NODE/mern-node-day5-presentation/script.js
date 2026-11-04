/**
 * Node.js Day 5 — Query Parameters, Route Parameters & CRUD API
 * Interactive Classroom Presentation Engine & Live API Simulators
 * Pure Vanilla JavaScript (ES6+)
 */

(function () {
  'use strict';

  // Section Mapping for all 18 slides
  const SLIDE_SECTIONS = [
    { start: 1, end: 2, name: 'Overview & Objectives' },
    { start: 3, end: 6, name: 'Section 1: Query Parameters' },
    { start: 7, end: 9, name: 'Section 2: Route Parameters' },
    { start: 10, end: 16, name: 'Section 3: CRUD API Implementation' },
    { start: 17, end: 18, name: 'Section 4: Testing & Practical Lab' }
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
    return 'Express.js CRUD';
  }

  /**
   * Navigate to a slide index (0 to totalSlides - 1)
   */
  function goToSlide(targetIndex, updateHash = true) {
    if (targetIndex < 0 || targetIndex >= totalSlides) return;

    // Remove active class from current slide
    if (slides[currentIndex]) {
      slides[currentIndex].classList.remove('active');
    }

    // Update index
    currentIndex = targetIndex;
    const slideNumber = currentIndex + 1;

    // Activate new slide
    if (slides[currentIndex]) {
      slides[currentIndex].classList.add('active');
      slides[currentIndex].scrollTop = 0;
    }

    // Update Slide Counter (e.g., 01 / 18)
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

    // Update Nav Buttons State
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === totalSlides - 1;

    // Update URL hash safely
    if (updateHash) {
      try {
        history.replaceState(null, '', `#slide-${slideNumber}`);
      } catch (err) {
        // Fallback for file:// restricted schemes
      }
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
        title = 'Title: Query & Route Params, CRUD API';
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
        const container = btn.closest('.code-container');
        if (!container) return;
        const codeEl = container.querySelector('code') || container.querySelector('pre');
        if (!codeEl) return;

        const textToCopy = codeEl.innerText;
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
    // If typing in an input or textarea, don't trigger slide change
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
      if (e.key === 'Escape') {
        e.target.blur();
      }
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
   * Hash change / Direct deep linking support (#slide-1 to #slide-18)
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
     INTERACTIVE SANDBOX 1: Query Parameters & Pagination Simulator (Slide 4/6)
     ========================================================================== */
  function initQuerySimulator() {
    const mockStudents = [
      { id: 1, name: "Anu", course: "MERN" },
      { id: 2, name: "Rahul", course: "Python" },
      { id: 3, name: "Neha", course: "MERN" },
      { id: 4, name: "Arun", course: "React" },
      { id: 5, name: "Deepak", course: "MERN" },
      { id: 6, name: "Pooja", course: "Python" },
      { id: 7, name: "Ananya", course: "React" }
    ];

    const inputUrl = document.getElementById('query-sim-url');
    const runBtn = document.getElementById('query-sim-run');
    const outputBox = document.getElementById('query-sim-output');
    const parsedParamsBox = document.getElementById('query-sim-parsed');
    const presetBtns = document.querySelectorAll('.query-preset-btn');

    if (!inputUrl || !runBtn || !outputBox) return;

    function executeQuery() {
      const fullUrl = inputUrl.value.trim();
      const questionIndex = fullUrl.indexOf('?');
      let queryString = questionIndex !== -1 ? fullUrl.substring(questionIndex + 1) : '';

      // Parse query string into req.query object
      const reqQuery = {};
      if (queryString) {
        const pairs = queryString.split('&');
        for (const pair of pairs) {
          if (!pair) continue;
          const [key, val] = pair.split('=');
          reqQuery[decodeURIComponent(key)] = val !== undefined ? decodeURIComponent(val) : '';
        }
      }

      if (parsedParamsBox) {
        parsedParamsBox.textContent = JSON.stringify(reqQuery, null, 2);
      }

      // Filter & Pagination logic exactly matching Slide 6
      const { course, search, page = "1", limit = "5" } = reqQuery;
      let result = [...mockStudents];

      if (course) {
        result = result.filter(
          (student) => student.course.toLowerCase() === course.toLowerCase()
        );
      }

      if (search) {
        result = result.filter(
          (student) => student.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      const pageNumber = Math.max(1, Number(page) || 1);
      const pageSize = Math.max(1, Number(limit) || 5);
      const startIndex = (pageNumber - 1) * pageSize;
      const paginatedData = result.slice(startIndex, startIndex + pageSize);

      const responsePayload = {
        total: result.length,
        page: pageNumber,
        limit: pageSize,
        data: paginatedData
      };

      outputBox.textContent = JSON.stringify(responsePayload, null, 2);
    }

    runBtn.addEventListener('click', executeQuery);
    inputUrl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') executeQuery();
    });

    presetBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const url = btn.getAttribute('data-url');
        if (url) {
          inputUrl.value = url;
          executeQuery();
        }
      });
    });

    // Run once on load
    executeQuery();
  }

  /* ==========================================================================
     INTERACTIVE SANDBOX 2: Route Parameter Tester (Slide 8)
     ========================================================================== */
  function initRouteParamSimulator() {
    const mockStudents = [
      { id: 1, name: "Anu", course: "MERN" },
      { id: 2, name: "Rahul", course: "Python" },
      { id: 3, name: "Neha", course: "React" }
    ];

    const inputId = document.getElementById('param-sim-id');
    const runBtn = document.getElementById('param-sim-run');
    const statusBox = document.getElementById('param-sim-status');
    const outputBox = document.getElementById('param-sim-output');

    if (!inputId || !runBtn || !outputBox) return;

    function testRouteParam() {
      const rawId = inputId.value.trim();
      const id = Number(rawId);

      const student = mockStudents.find((s) => s.id === id);

      if (!student) {
        if (statusBox) {
          statusBox.className = 'badge-status status-404';
          statusBox.textContent = '404 Not Found';
        }
        outputBox.textContent = JSON.stringify({ message: "Student not found" }, null, 2);
      } else {
        if (statusBox) {
          statusBox.className = 'badge-status status-200';
          statusBox.textContent = '200 OK';
        }
        outputBox.textContent = JSON.stringify({ data: student }, null, 2);
      }
    }

    runBtn.addEventListener('click', testRouteParam);
    inputId.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') testRouteParam();
    });

    const presetBtns = document.querySelectorAll('.param-preset-btn');
    presetBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-id');
        if (val) {
          inputId.value = val;
          testRouteParam();
        }
      });
    });

    testRouteParam();
  }

  /* ==========================================================================
     INTERACTIVE SANDBOX 3: Student Management CRUD API Full Console (Slide 18)
     ========================================================================== */
  function initCrudApiConsole() {
    // In-memory array state
    let stateStudents = [
      { id: 1, name: "Anu", email: "anu@gmail.com", course: "MERN" },
      { id: 2, name: "Rahul", email: "rahul@gmail.com", course: "Python" },
      { id: 3, name: "Neha", email: "neha@gmail.com", course: "React" }
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

    function renderArrayState() {
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
      const fullUrl = urlInput.value.trim();

      // Parse path and query
      const urlParts = fullUrl.split('?');
      const pathname = urlParts[0].replace(/\/+$/, '') || '/';
      const queryString = urlParts[1] || '';

      // Parse Query Params
      const reqQuery = {};
      if (queryString) {
        for (const pair of queryString.split('&')) {
          if (!pair) continue;
          const [k, v] = pair.split('=');
          reqQuery[decodeURIComponent(k)] = v !== undefined ? decodeURIComponent(v) : '';
        }
      }

      // Parse JSON body
      let reqBody = {};
      if (['POST', 'PUT', 'PATCH'].includes(method)) {
        try {
          const rawText = bodyInput ? bodyInput.value.trim() : '';
          reqBody = rawText ? JSON.parse(rawText) : {};
        } catch (err) {
          setStatus(400, 'Bad Request');
          responseBox.textContent = JSON.stringify({ error: "Invalid JSON format in Request Body" }, null, 2);
          return;
        }
      }

      // 1. GET /students
      if (method === 'GET' && pathname === '/students') {
        const { course, search, page = "1", limit = "5" } = reqQuery;
        let result = [...stateStudents];

        if (course) {
          result = result.filter(s => s.course.toLowerCase() === course.toLowerCase());
        }
        if (search) {
          result = result.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
        }

        const pageNumber = Math.max(1, Number(page) || 1);
        const pageSize = Math.max(1, Number(limit) || 5);
        const startIndex = (pageNumber - 1) * pageSize;
        const paginatedData = result.slice(startIndex, startIndex + pageSize);

        setStatus(200, 'OK');
        responseBox.textContent = JSON.stringify({
          count: paginatedData.length,
          total: result.length,
          page: pageNumber,
          limit: pageSize,
          data: paginatedData
        }, null, 2);
        return;
      }

      // 2. GET /students/:id
      const matchGetOne = pathname.match(/^\/students\/(\d+)$/);
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
      if (method === 'POST' && pathname === '/students') {
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
        renderArrayState();

        setStatus(201, 'Created');
        responseBox.textContent = JSON.stringify({
          message: "Student created successfully",
          data: newStudent
        }, null, 2);
        return;
      }

      // 4. PUT /students/:id
      const matchPut = pathname.match(/^\/students\/(\d+)$/);
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
        renderArrayState();

        setStatus(200, 'OK');
        responseBox.textContent = JSON.stringify({
          message: "Student updated successfully",
          data: student
        }, null, 2);
        return;
      }

      // 5. PATCH /students/:id
      const matchPatch = pathname.match(/^\/students\/(\d+)$/);
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
        renderArrayState();

        setStatus(200, 'OK');
        responseBox.textContent = JSON.stringify({
          message: "Student partially updated",
          data: student
        }, null, 2);
        return;
      }

      // 6. DELETE /students/:id
      const matchDelete = pathname.match(/^\/students\/(\d+)$/);
      if (method === 'DELETE' && matchDelete) {
        const id = Number(matchDelete[1]);
        const index = stateStudents.findIndex(s => s.id === id);
        if (index === -1) {
          setStatus(404, 'Not Found');
          responseBox.textContent = JSON.stringify({ message: "Student not found" }, null, 2);
          return;
        }

        const deleted = stateStudents.splice(index, 1)[0];
        renderArrayState();

        setStatus(200, 'OK');
        responseBox.textContent = JSON.stringify({
          message: "Student deleted successfully",
          data: deleted
        }, null, 2);
        return;
      }

      // Fallback 404 Route Not Found
      setStatus(404, 'Not Found');
      responseBox.textContent = JSON.stringify({
        error: `Cannot ${method} ${pathname}`,
        hint: "Supported routes: GET /students, GET /students/:id, POST /students, PUT /students/:id, PATCH /students/:id, DELETE /students/:id"
      }, null, 2);
    }

    sendBtn.addEventListener('click', handleRequest);

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        stateStudents = [
          { id: 1, name: "Anu", email: "anu@gmail.com", course: "MERN" },
          { id: 2, name: "Rahul", email: "rahul@gmail.com", course: "Python" },
          { id: 3, name: "Neha", email: "neha@gmail.com", course: "React" }
        ];
        renderArrayState();
        setStatus(200, 'OK');
        responseBox.textContent = JSON.stringify({ message: "In-memory student array reset to default" }, null, 2);
      });
    }

    // Quick preset buttons for CRUD console
    const crudPresets = document.querySelectorAll('.crud-preset-btn');
    crudPresets.forEach(btn => {
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

    renderArrayState();
    handleRequest();
  }

  /**
   * Initialize on DOM Ready
   */
  function init() {
    buildToc();
    initCopyButtons();
    initQuerySimulator();
    initRouteParamSimulator();
    initCrudApiConsole();

    // Event Listeners for controls
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

    // Initial slide based on URL hash or default to 0
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
