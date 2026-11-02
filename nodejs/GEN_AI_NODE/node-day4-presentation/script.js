/**
 * Gen-AI Node.js — Day 4
 * SSE Streaming, File Uploads, Buffers & Document Processing
 * Interactive Presentation Engine (Vanilla JavaScript)
 */

(function () {
  'use strict';

  // Section Mapping for all 18 slides
  const SLIDE_SECTIONS = [
    { start: 1, end: 6, name: 'Section 1: Server-Sent Events (SSE)' },
    { start: 7, end: 9, name: 'Section 2: File Upload Using Multer' },
    { start: 10, end: 11, name: 'Section 3: Node.js Buffers' },
    { start: 12, end: 16, name: 'Section 4: Document Parsing (PDF, DOCX, CSV)' },
    { start: 17, end: 18, name: 'Section 5: Final Practical & Recap' },
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
    return 'Gen-AI Node.js Day 4';
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

    // Update Slide Counter (e.g. 01 / 18)
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
        titleText = 'Title: SSE Streaming, File Uploads & Document Processing';
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
   * Hash change sync (#slide-1 to #slide-18)
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
   * Interactive Simulator: Slide 6 Live AI Stream Simulation
   */
  function initAiStreamSimulator() {
    const startBtn = document.getElementById('run-ai-stream-btn');
    const resetBtn = document.getElementById('reset-ai-stream-btn');
    const outputBox = document.getElementById('ai-stream-output');
    const rawChunksBox = document.getElementById('ai-stream-raw-chunks');
    const statusText = document.getElementById('ai-stream-status');

    if (!startBtn || !outputBox || !rawChunksBox) return;

    let isStreaming = false;

    const streamChunks = [
      { text: "Hello! ", delay: 400 },
      { text: "I am an AI assistant. ", delay: 500 },
      { text: "I can answer your questions. ", delay: 600 },
      { text: "This response is streamed using SSE!", delay: 500 }
    ];

    startBtn.addEventListener('click', async () => {
      if (isStreaming) return;
      isStreaming = true;
      startBtn.disabled = true;
      outputBox.textContent = "";
      rawChunksBox.innerHTML = '<div class="cmd">&gt; Connecting to GET /ai-stream (SSE)...</div>';
      if (statusText) statusText.textContent = "Status: Connected (HTTP 200, Content-Type: text/event-stream)";

      for (let i = 0; i < streamChunks.length; i++) {
        await new Promise(r => setTimeout(r, streamChunks[i].delay));
        const chunkData = streamChunks[i].text;
        const sseRaw = `data: ${JSON.stringify({ text: chunkData })}\n\n`;

        // Update raw stream log
        rawChunksBox.innerHTML += `<div class="res" style="color:#93c5fd;">&lt;-- [Chunk ${i + 1}]: ${sseRaw.trim()}</div>`;
        rawChunksBox.scrollTop = rawChunksBox.scrollHeight;

        // Render decoded token into terminal output
        outputBox.textContent += chunkData;
      }

      await new Promise(r => setTimeout(r, 400));
      rawChunksBox.innerHTML += '<div class="res" style="color:#a7f3d0;">&lt;-- [End Stream]: data: [DONE]\\n\\n</div>';
      rawChunksBox.innerHTML += '<div class="cmd" style="color:#fde68a;">&gt; res.end() received &mdash; stream reader closed.</div>';
      rawChunksBox.scrollTop = rawChunksBox.scrollHeight;
      if (statusText) statusText.textContent = "Status: Completed (Stream Closed)";

      isStreaming = false;
      startBtn.disabled = false;
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        outputBox.textContent = "Output will stream here...";
        rawChunksBox.innerHTML = '<div class="cmd">&gt; Ready to stream...</div>';
        if (statusText) statusText.textContent = "Status: Idle";
      });
    }
  }

  /**
   * Interactive Simulator: Slide 10/11 Live Buffer & Hex Inspector
   */
  function initBufferInspector() {
    const inputEl = document.getElementById('buffer-sim-input');
    const hexOutput = document.getElementById('buffer-sim-hex');
    const decOutput = document.getElementById('buffer-sim-dec');
    const sizeOutput = document.getElementById('buffer-sim-size');

    if (!inputEl || !hexOutput || !decOutput || !sizeOutput) return;

    function updateBuffer() {
      const text = inputEl.value || "";
      const encoder = new TextEncoder();
      const bytes = encoder.encode(text);

      let hexParts = [];
      let decParts = [];

      for (let i = 0; i < bytes.length; i++) {
        const hex = bytes[i].toString(16).padStart(2, '0');
        hexParts.push(hex);
        decParts.push(bytes[i]);
      }

      hexOutput.textContent = `<Buffer ${hexParts.join(' ')}>`;
      decOutput.textContent = `[ ${decParts.join(', ')} ]`;
      sizeOutput.textContent = `${bytes.length} bytes`;
    }

    inputEl.addEventListener('input', updateBuffer);
    updateBuffer();
  }

  /**
   * Interactive Simulator: Slide 16 Multi-Format Document Parser Explorer
   */
  function initDocParserSimulator() {
    const formatBtns = document.querySelectorAll('.parser-select-btn');
    const parserNameEl = document.getElementById('parser-lib-name');
    const parseCodeEl = document.getElementById('parser-call-code');
    const parseResultEl = document.getElementById('parser-json-output');

    if (!formatBtns.length || !parserNameEl || !parseResultEl) return;

    const parserDetails = {
      pdf: {
        lib: 'pdf-parse (v1.1.1)',
        code: `const pdfData = await pdfParse(req.file.buffer);\n// Returns: pdfData.text, pdfData.numpages, pdfData.info`,
        json: {
          message: "PDF parsed successfully",
          pages: 2,
          text: "Anu - MERN Stack Developer\nEmail: anu@gmail.com\nExperience: 2 years building React & Node.js backends.\nSkills: JavaScript, Node.js, Express, MongoDB"
        }
      },
      docx: {
        lib: 'mammoth (v1.6+)',
        code: `const result = await mammoth.extractRawText({ buffer: req.file.buffer });\n// Returns: result.value (clean unformatted string)`,
        json: {
          message: "DOCX parsed successfully",
          text: "Anu\nMERN Stack Developer\nSkills: React, Node.js, MongoDB\nProjects: AI Chatbot, Document RAG Pipeline"
        }
      },
      csv: {
        lib: 'csv-parse/sync',
        code: `const records = parse(req.file.buffer, { columns: true, skip_empty_lines: true, trim: true });\n// Returns: Array of JavaScript objects`,
        json: {
          message: "CSV parsed successfully",
          count: 3,
          data: [
            { name: "Anu", email: "anu@gmail.com", course: "MERN" },
            { name: "Rahul", email: "rahul@gmail.com", course: "Python" },
            { name: "Neha", email: "neha@gmail.com", course: "React" }
          ]
        }
      }
    };

    formatBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.getAttribute('data-type');
        const data = parserDetails[type];
        if (!data) return;

        formatBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        parserNameEl.textContent = data.lib;
        parseCodeEl.textContent = data.code;
        parseResultEl.textContent = JSON.stringify(data.json, null, 2);
      });
    });
  }

  /**
   * Interactive Simulator: Slide 17 Mini Project Document Upload Sandbox
   */
  function initMiniProjectSimulator() {
    const selectEl = document.getElementById('mini-doc-select');
    const submitBtn = document.getElementById('mini-doc-submit');
    const previewBox = document.getElementById('mini-doc-response');

    if (!selectEl || !submitBtn || !previewBox) return;

    const mockResponses = {
      pdf: {
        success: true,
        fileName: "resume.pdf",
        fileType: "pdf",
        sizeBytes: 15340,
        content: "Anu\nSenior MERN & AI Developer\nSpecialized in Vector DBs, Express APIs & LLMs."
      },
      docx: {
        success: true,
        fileName: "contract.docx",
        fileType: "docx",
        sizeBytes: 24100,
        content: "CONSULTING AGREEMENT\nBetween AI Solutions Inc and Student Services."
      },
      csv: {
        success: true,
        fileName: "students.csv",
        fileType: "csv",
        sizeBytes: 320,
        content: [
          { name: "Anu", email: "anu@gmail.com", course: "Gen-AI Node.js" },
          { name: "Rahul", email: "rahul@gmail.com", course: "Gen-AI Node.js" }
        ]
      }
    };

    submitBtn.addEventListener('click', () => {
      submitBtn.disabled = true;
      submitBtn.textContent = "Processing...";
      const type = selectEl.value;

      setTimeout(() => {
        previewBox.textContent = JSON.stringify(mockResponses[type], null, 2);
        submitBtn.disabled = false;
        submitBtn.textContent = "Upload & Extract";
      }, 350);
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
    initAiStreamSimulator();
    initBufferInspector();
    initDocParserSimulator();
    initMiniProjectSimulator();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
