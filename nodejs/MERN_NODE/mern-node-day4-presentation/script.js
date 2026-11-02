/**
 * Node.js Day 4 — Express Setup, API Development & Postman
 * Interactive Presentation Engine (Vanilla JavaScript)
 */

(function () {
  'use strict';

  // Section Mapping for all 15 slides
  const SLIDE_SECTIONS = [
    { start: 1, end: 4, name: 'Section 1: Setting Up Express & First Routes' },
    { start: 5, end: 8, name: 'Section 2: API Architecture & HTTP Methods' },
    { start: 9, end: 12, name: 'Section 3: Testing APIs with Postman' },
    { start: 13, end: 15, name: 'Section 4: Data Formats & Student Management API' },
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
   * Determine the current section name based on 1-indexed slide number
   */
  function getSectionName(slideNum) {
    for (const sec of SLIDE_SECTIONS) {
      if (slideNum >= sec.start && slideNum <= sec.end) {
        return sec.name;
      }
    }
    return 'Node.js Day 4 (Express)';
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

    // Update Slide Counter (e.g. 01 / 15)
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
        // Fallback for strict browser file:// schemes
      }
    }

    // Update active state in Table of Contents
    const tocItems = document.querySelectorAll('.toc-item');
    tocItems.forEach((item, idx) => {
      if (idx === currentIndex) {
        item.classList.add('active');
        item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
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
   * Populate Table of Contents Drawer dynamically
   */
  function initTableOfContents() {
    if (!tocList) return;
    tocList.innerHTML = '';

    slides.forEach((slide, idx) => {
      const slideNum = idx + 1;

      // Check if this slide starts a new section
      const sec = SLIDE_SECTIONS.find((s) => s.start === slideNum);
      if (sec) {
        const secHeader = document.createElement('div');
        secHeader.className = 'toc-section-header';
        secHeader.textContent = sec.name;
        tocList.appendChild(secHeader);
      }

      // Slide Title
      let titleText = `Slide ${slideNum}`;
      const titleElem = slide.querySelector('.slide-title');
      if (titleElem) {
        titleText = titleElem.textContent.trim().replace(/\s+/g, ' ');
      } else if (slide.querySelector('.hero-main-title')) {
        titleText = 'Title: Express Setup, API Development & Postman';
      }

      const item = document.createElement('div');
      item.className = 'toc-item' + (idx === currentIndex ? ' active' : '');
      item.setAttribute('data-index', idx);
      item.innerHTML = `
        <span class="item-num">${slideNum < 10 ? '0' + slideNum : slideNum}</span>
        <span class="item-text">${titleText}</span>
      `;

      item.addEventListener('click', () => {
        goToSlide(idx);
        closeToc();
      });

      tocList.appendChild(item);
    });
  }

  function openToc() {
    if (tocOverlay) tocOverlay.classList.add('open');
  }

  function closeToc() {
    if (tocOverlay) tocOverlay.classList.remove('open');
  }

  function openHelp() {
    if (helpModalOverlay) helpModalOverlay.classList.add('open');
  }

  function closeHelp() {
    if (helpModalOverlay) helpModalOverlay.classList.remove('open');
  }

  /**
   * Fullscreen API toggle
   */
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn('Fullscreen request failed:', err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  /**
   * Copy-to-Clipboard for code blocks
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
          btn.classList.add('copied');
          btn.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Copied!</span>
          `;

          setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = originalHTML;
          }, 2000);
        } catch (err) {
          console.error('Failed to copy code: ', err);
        }
      });
    });
  }

  /**
   * Keyboard Navigation
   */
  function initKeyboardNavigation() {
    window.addEventListener('keydown', (e) => {
      // Do not intercept if user is typing in form inputs or editable elements
      const activeTag = document.activeElement ? document.activeElement.tagName : '';
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(activeTag) || (document.activeElement && document.activeElement.isContentEditable)) {
        return;
      }

      // Close overlays on Escape
      if (e.key === 'Escape') {
        closeToc();
        closeHelp();
        return;
      }

      // If overlays are open, don't navigate
      if (tocOverlay && tocOverlay.classList.contains('open')) return;
      if (helpModalOverlay && helpModalOverlay.classList.contains('open')) return;

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
          e.preventDefault();
          toggleFullscreen();
          break;

        case 't':
        case 'T':
        case 'm':
        case 'M':
          e.preventDefault();
          openToc();
          break;

        case '?':
        case 'h':
        case 'H':
          e.preventDefault();
          openHelp();
          break;
      }
    });
  }

  /**
   * Hash change sync (#slide-1 to #slide-15)
   */
  function initHashNavigation() {
    function handleHash() {
      const hash = window.location.hash;
      const match = hash.match(/#slide-(\d+)/);
      if (match) {
        const slideNum = parseInt(match[1], 10);
        if (slideNum >= 1 && slideNum <= totalSlides) {
          goToSlide(slideNum - 1, false);
          return;
        }
      }
      goToSlide(0, false);
    }

    window.addEventListener('hashchange', handleHash);
    handleHash();
  }

  /**
   * Interactive Simulator: Slide 4 Browser Route Tester
   */
  function initRouteTester() {
    const routeBtns = document.querySelectorAll('.route-test-btn');
    const browserUrl = document.getElementById('browser-mock-url');
    const browserBody = document.getElementById('browser-mock-body');
    if (!routeBtns.length || !browserUrl || !browserBody) return;

    routeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const path = btn.getAttribute('data-path');
        const responseText = btn.getAttribute('data-response');
        browserUrl.textContent = `http://localhost:3000${path}`;
        browserBody.textContent = responseText;

        routeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  /**
   * Interactive Simulator: Slide 7 HTTP Methods Explorer
   */
  function initHttpMethodsExplorer() {
    const methodBtns = document.querySelectorAll('.method-explore-btn');
    const displayEndpoint = document.getElementById('method-explorer-endpoint');
    const displayAction = document.getElementById('method-explorer-action');
    const displayResponse = document.getElementById('method-explorer-response');
    if (!methodBtns.length || !displayEndpoint) return;

    const methodData = {
      GET: {
        endpoint: 'GET /students',
        action: 'Fetch and retrieve all student records from database.',
        response: 'Get all students'
      },
      POST: {
        endpoint: 'POST /students',
        action: 'Create and register a new student using request body.',
        response: 'Create a new student'
      },
      PUT: {
        endpoint: 'PUT /students/101',
        action: 'Replace or update all details for student with ID 101.',
        response: 'Update student 101'
      },
      PATCH: {
        endpoint: 'PATCH /students/101',
        action: 'Partially update student with ID 101 (e.g. email or course).',
        response: 'Partially update student 101'
      },
      DELETE: {
        endpoint: 'DELETE /students/101',
        action: 'Remove student with ID 101 permanently from collection.',
        response: 'Delete student 101'
      }
    };

    methodBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const method = btn.getAttribute('data-method');
        const data = methodData[method];
        if (!data) return;

        methodBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        displayEndpoint.textContent = data.endpoint;
        displayAction.textContent = data.action;
        displayResponse.textContent = `res.send("${data.response}");`;
      });
    });
  }

  /**
   * Interactive Simulator: Slide 10/11/12 Postman Mock Client
   */
  function initPostmanSimulator() {
    const sendBtn = document.getElementById('postman-sim-send');
    const methodSelect = document.getElementById('postman-sim-method');
    const urlInput = document.getElementById('postman-sim-url');
    const bodyTab = document.getElementById('postman-tab-body');
    const paramsTab = document.getElementById('postman-tab-params');
    const bodyContent = document.getElementById('postman-body-input');
    const statusPill = document.getElementById('postman-sim-status');
    const timePill = document.getElementById('postman-sim-time');
    const responseBox = document.getElementById('postman-sim-response');

    if (!sendBtn || !methodSelect || !urlInput || !responseBox) return;

    // Student database mock in memory for the simulator
    let mockStudents = [
      { id: 1, name: "Anu", course: "MERN" },
      { id: 2, name: "Rahul", course: "Python" },
      { id: 3, name: "Neha", course: "MERN" }
    ];

    methodSelect.addEventListener('change', () => {
      const method = methodSelect.value;
      if (method === 'GET') {
        urlInput.value = 'http://localhost:3000/api/students';
        if (bodyContent) bodyContent.style.display = 'none';
      } else if (method === 'POST') {
        urlInput.value = 'http://localhost:3000/api/students';
        if (bodyContent) {
          bodyContent.style.display = 'block';
          bodyContent.value = JSON.stringify({ name: "Mubashir", course: "MERN Stack" }, null, 2);
        }
      } else if (method === 'PUT') {
        urlInput.value = 'http://localhost:3000/api/students/1';
        if (bodyContent) {
          bodyContent.style.display = 'block';
          bodyContent.value = JSON.stringify({ name: "Mubashir Updated", course: "Node.js" }, null, 2);
        }
      } else if (method === 'DELETE') {
        urlInput.value = 'http://localhost:3000/api/students/1';
        if (bodyContent) bodyContent.style.display = 'none';
      }
    });

    if (bodyTab && paramsTab && bodyContent) {
      bodyTab.addEventListener('click', () => {
        bodyTab.classList.add('active');
        paramsTab.classList.remove('active');
        bodyContent.style.display = 'block';
      });
      paramsTab.addEventListener('click', () => {
        paramsTab.classList.add('active');
        bodyTab.classList.remove('active');
        bodyContent.style.display = 'none';
      });
    }

    sendBtn.addEventListener('click', () => {
      sendBtn.disabled = true;
      sendBtn.textContent = 'Sending...';
      const method = methodSelect.value;
      const url = urlInput.value.trim();

      setTimeout(() => {
        const randomTime = Math.floor(Math.random() * 20) + 12; // 12ms - 32ms
        timePill.textContent = `Time: ${randomTime} ms`;

        if (method === 'GET') {
          statusPill.innerHTML = '<span class="status-badge status-200">200 OK</span>';
          responseBox.textContent = JSON.stringify({
            success: true,
            data: mockStudents
          }, null, 2);
        } else if (method === 'POST') {
          let parsedBody = { name: "Mubashir", course: "MERN Stack" };
          try {
            if (bodyContent && bodyContent.value.trim()) {
              parsedBody = JSON.parse(bodyContent.value);
            }
          } catch (e) {
            // fallback
          }

          const newStudent = {
            id: mockStudents.length + 1,
            name: parsedBody.name || "New Student",
            course: parsedBody.course || "MERN"
          };
          mockStudents.push(newStudent);

          statusPill.innerHTML = '<span class="status-badge status-201">201 Created</span>';
          responseBox.textContent = JSON.stringify({
            message: "Student created successfully",
            data: newStudent
          }, null, 2);
        } else if (method === 'PUT') {
          const match = url.match(/\/(\d+)$/);
          const id = match ? parseInt(match[1], 10) : 1;
          const student = mockStudents.find(s => s.id === id);

          if (!student) {
            statusPill.innerHTML = '<span class="status-badge status-404">404 Not Found</span>';
            responseBox.textContent = JSON.stringify({ message: "Student not found" }, null, 2);
          } else {
            let parsedBody = {};
            try {
              if (bodyContent && bodyContent.value.trim()) parsedBody = JSON.parse(bodyContent.value);
            } catch (e) {}
            if (parsedBody.name) student.name = parsedBody.name;
            if (parsedBody.course) student.course = parsedBody.course;

            statusPill.innerHTML = '<span class="status-badge status-200">200 OK</span>';
            responseBox.textContent = JSON.stringify({
              message: "Student updated successfully",
              data: student
            }, null, 2);
          }
        } else if (method === 'DELETE') {
          const match = url.match(/\/(\d+)$/);
          const id = match ? parseInt(match[1], 10) : 1;
          const index = mockStudents.findIndex(s => s.id === id);

          if (index === -1) {
            statusPill.innerHTML = '<span class="status-badge status-404">404 Not Found</span>';
            responseBox.textContent = JSON.stringify({ message: "Student not found" }, null, 2);
          } else {
            const deleted = mockStudents.splice(index, 1)[0];
            statusPill.innerHTML = '<span class="status-badge status-200">200 OK</span>';
            responseBox.textContent = JSON.stringify({
              message: "Student deleted successfully",
              data: deleted
            }, null, 2);
          }
        }

        sendBtn.disabled = false;
        sendBtn.textContent = 'Send';
      }, 300);
    });
  }

  /**
   * Interactive Simulator: Slide 14 Data Format Inspector
   */
  function initDataFormatInspector() {
    const formatBtns = document.querySelectorAll('.format-switch-btn');
    const headerDisplay = document.getElementById('format-header-display');
    const codeDisplay = document.getElementById('format-code-display');
    const previewDisplay = document.getElementById('format-preview-display');
    if (!formatBtns.length || !headerDisplay || !codeDisplay) return;

    const formatData = {
      json: {
        header: 'Content-Type: application/json; charset=utf-8',
        code: `app.get("/json", (req, res) => {\n  res.json({\n    name: "Anu",\n    course: "MERN"\n  });\n});`,
        preview: `{\n  "name": "Anu",\n  "course": "MERN"\n}`
      },
      text: {
        header: 'Content-Type: text/plain; charset=utf-8',
        code: `app.get("/text", (req, res) => {\n  res.type("text/plain").send("Welcome to Express");\n});`,
        preview: `Welcome to Express`
      },
      html: {
        header: 'Content-Type: text/html; charset=utf-8',
        code: `app.get("/html", (req, res) => {\n  res.type("html").send(\`\n    <h1>Welcome to Express</h1>\n    <p>This is an HTML response</p>\n  \`);\n});`,
        preview: `<h1>Welcome to Express</h1>\n<p>This is an HTML response</p>`
      },
      xml: {
        header: 'Content-Type: application/xml; charset=utf-8',
        code: `app.get("/xml", (req, res) => {\n  res.type("application/xml").send(\`\n    <student>\n      <name>Anu</name>\n      <course>MERN</course>\n    </student>\n  \`);\n});`,
        preview: `<student>\n  <name>Anu</name>\n  <course>MERN</course>\n</student>`
      }
    };

    formatBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const fmt = btn.getAttribute('data-fmt');
        const data = formatData[fmt];
        if (!data) return;

        formatBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        headerDisplay.textContent = data.header;
        codeDisplay.textContent = data.code;
        previewDisplay.textContent = data.preview;
      });
    });
  }

  /**
   * Initialize App
   */
  function init() {
    initTableOfContents();
    initCopyButtons();
    initKeyboardNavigation();
    initHashNavigation();

    // Attach button listeners
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

    // Attach interactive educational widgets
    initRouteTester();
    initHttpMethodsExplorer();
    initPostmanSimulator();
    initDataFormatInspector();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
