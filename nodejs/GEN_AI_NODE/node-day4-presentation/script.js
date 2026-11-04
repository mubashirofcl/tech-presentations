/**
 * Gen-AI Node.js – Day 4 Presentation
 * Interactive Classroom Presentation Engine & Simulators
 * Pure Vanilla JavaScript (ES6+)
 */

(function () {
  'use strict';

  // Section Mapping for all 18 slides
  const SLIDE_SECTIONS = [
    { start: 1, end: 2, name: 'Overview & Our Mission' },
    { start: 3, end: 7, name: 'Section 1: Streaming & SSE' },
    { start: 8, end: 10, name: 'Section 2: File Uploads with Multer' },
    { start: 11, end: 12, name: 'Section 3: Understanding Buffers' },
    { start: 13, end: 16, name: 'Section 4: Reading Documents' },
    { start: 17, end: 18, name: 'Section 5: AI Document App & Recap' }
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
    return 'Gen-AI Node.js Day 4';
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

    // Update Counter (01 / 18)
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
        title = 'Title: Streaming, Files & Documents';
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
     INTERACTIVE SANDBOX 1: Browser ReadableStream Simulator (Slide 7)
     ========================================================================== */
  function initStreamingSimulator() {
    const startBtn = document.getElementById('demo-start-stream');
    const resetBtn = document.getElementById('demo-reset-stream');
    const outputDiv = document.getElementById('demo-stream-output');
    const statusText = document.getElementById('demo-stream-status');

    if (!startBtn || !outputDiv) return;

    let isStreaming = false;

    const messages = [
      "data: Hello Students!\n\n",
      "data: Welcome to Node.js!\n\n",
      "data: Streaming completed!\n\n"
    ];

    async function runStream() {
      if (isStreaming) return;
      isStreaming = true;
      startBtn.disabled = true;
      outputDiv.innerHTML = "";
      if (statusText) statusText.textContent = "Connecting to SSE stream...";

      // Simulate network reader chunks arriving with 1-second delay
      for (let i = 0; i < messages.length; i++) {
        if (statusText) statusText.textContent = `Receiving Chunk ${i + 1} of ${messages.length}...`;
        await new Promise(r => setTimeout(r, 1000));
        const chunkText = messages[i];
        
        const p = document.createElement('div');
        p.style.padding = "0.4rem 0.6rem";
        p.style.marginBottom = "0.3rem";
        p.style.borderRadius = "4px";
        p.style.background = "#0b1329";
        p.style.color = "#38bdf8";
        p.style.fontFamily = "var(--font-mono)";
        p.style.fontSize = "0.85rem";
        p.textContent = chunkText;
        outputDiv.appendChild(p);
      }

      if (statusText) statusText.textContent = "Stream finished (done: true).";
      isStreaming = false;
      startBtn.disabled = false;
    }

    startBtn.addEventListener('click', runStream);

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        outputDiv.innerHTML = '<span style="color:var(--text-subtle); font-style:italic;">Click "Start Streaming" above to watch chunks appear.</span>';
        if (statusText) statusText.textContent = "Ready";
      });
    }
  }

  /* ==========================================================================
     INTERACTIVE SANDBOX 2: Buffer & Text Converter (Slide 11 & 12)
     ========================================================================== */
  function initBufferSimulator() {
    const inputEl = document.getElementById('buffer-demo-input');
    const hexOutput = document.getElementById('buffer-demo-hex');
    const lenOutput = document.getElementById('buffer-demo-len');
    const backOutput = document.getElementById('buffer-demo-back');

    if (!inputEl || !hexOutput) return;

    function updateBuffer() {
      const text = inputEl.value;
      const encoder = new TextEncoder();
      const bytes = encoder.encode(text);

      let hexStr = "<Buffer";
      for (let i = 0; i < bytes.length; i++) {
        const hex = bytes[i].toString(16).padStart(2, '0');
        hexStr += " " + hex;
      }
      hexStr += ">";

      hexOutput.textContent = hexStr;
      if (lenOutput) lenOutput.textContent = `${bytes.length} bytes`;
      if (backOutput) backOutput.textContent = text;
    }

    inputEl.addEventListener('input', updateBuffer);
    updateBuffer();
  }

  /* ==========================================================================
     INTERACTIVE SANDBOX 3: Final Practical Document Reader (Slide 17)
     ========================================================================== */
  function initDocumentReaderDemo() {
    const fileTypeSelect = document.getElementById('doc-demo-type');
    const runBtn = document.getElementById('doc-demo-btn');
    const stepMulter = document.getElementById('step-multer');
    const stepBuffer = document.getElementById('step-buffer');
    const stepParser = document.getElementById('step-parser');
    const resultBox = document.getElementById('doc-demo-result');

    if (!fileTypeSelect || !runBtn || !resultBox) return;

    const mockResults = {
      pdf: {
        library: "pdf-parse@1.1.1",
        method: "pdfParse(req.file.buffer)",
        extracted: {
          message: "PDF read successfully",
          text: "My name is Anu. I am a MERN Stack developer with 2 years of Node.js experience."
        }
      },
      docx: {
        library: "Mammoth",
        method: "mammoth.extractRawText({ buffer: req.file.buffer })",
        extracted: {
          message: "DOCX read successfully",
          text: "Anu\nMERN Stack Developer\nSkills: React, Node.js, MongoDB, Express"
        }
      },
      csv: {
        library: "csv-parse/sync",
        method: "parse(req.file.buffer, { columns: true, skip_empty_lines: true, trim: true })",
        extracted: {
          message: "CSV read successfully",
          data: [
            { name: "Anu", email: "anu@gmail.com", course: "MERN" },
            { name: "Rahul", email: "rahul@gmail.com", course: "Python" }
          ]
        }
      }
    };

    async function simulatePipeline() {
      const selected = fileTypeSelect.value;
      const data = mockResults[selected];

      runBtn.disabled = true;
      resultBox.textContent = "Processing file through Express pipeline...";

      // Reset step indicators
      [stepMulter, stepBuffer, stepParser].forEach(el => {
        if (el) el.style.background = "#f1f5f9";
      });

      // Step 1: Multer
      if (stepMulter) stepMulter.style.background = "#fef3c7";
      await new Promise(r => setTimeout(r, 600));

      // Step 2: Buffer
      if (stepBuffer) stepBuffer.style.background = "#e0f2fe";
      await new Promise(r => setTimeout(r, 600));

      // Step 3: Document Parser
      if (stepParser) {
        stepParser.style.background = "#dcfce7";
        stepParser.textContent = `4. ${data.library}`;
      }
      await new Promise(r => setTimeout(r, 600));

      // Result
      resultBox.textContent = JSON.stringify(data.extracted, null, 2);
      runBtn.disabled = false;
    }

    runBtn.addEventListener('click', simulatePipeline);
  }

  /**
   * Initialize on DOM Ready
   */
  function init() {
    buildToc();
    initCopyButtons();
    initStreamingSimulator();
    initBufferSimulator();
    initDocumentReaderDemo();

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
