/**
 * Node.js Day 1 — Interactive Presentation Engine
 * Pure Vanilla JavaScript: Navigation, Keyboard, Fullscreen, Copy-Code, TOC & Interactive Widgets
 */

(function () {
  'use strict';

  // Section Mapping for all 37 slides
  const SLIDE_SECTIONS = [
    { start: 1, end: 9, name: 'Section 1: Introduction to Node.js & Architecture' },
    { start: 10, end: 13, name: 'Section 2: Runtime, npm & Project Setup' },
    { start: 14, end: 17, name: 'Section 3: Node.js Modules' },
    { start: 18, end: 20, name: 'Section 4: Modern JavaScript for Backend' },
    { start: 21, end: 23, name: 'Section 5: Objects & JavaScript Pitfalls' },
    { start: 24, end: 25, name: 'Section 6: Environment Variables & Watch Mode' },
    { start: 26, end: 33, name: 'Section 7: Practical — Smart Student Analyzer' },
    { start: 34, end: 36, name: 'Section 8: Node.js for AI & LLM Applications' },
    { start: 37, end: 37, name: 'Section 9: Final Revision & Oral Questions' },
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
    return 'Node.js Day 1';
  }

  /**
   * Navigate to a slide index (0 to totalSlides - 1)
   */
  function goToSlide(targetIndex, updateHash = true) {
    if (targetIndex < 0 || targetIndex >= totalSlides) return;

    // Remove active class from current slide
    slides[currentIndex].classList.remove('active');

    // Update index
    currentIndex = targetIndex;
    const slideNumber = currentIndex + 1;

    // Activate new slide
    slides[currentIndex].classList.add('active');
    slides[currentIndex].scrollTop = 0; // scroll to top if needed

    // Update Slide Counter
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

    // Update URL hash
    if (updateHash) {
      history.replaceState(null, '', `#slide-${slideNumber}`);
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
   * Initialize Table of Contents list items from slide titles
   */
  function buildTableOfContents() {
    if (!tocList) return;
    tocList.innerHTML = '';

    let currentSecIndex = -1;

    slides.forEach((slide, index) => {
      const slideNum = index + 1;
      const titleElem = slide.querySelector('.slide-title');
      const title = titleElem ? titleElem.textContent.trim() : `Slide ${slideNum}`;

      // Check if this slide starts a new section
      const secIdx = SLIDE_SECTIONS.findIndex(s => s.start === slideNum);
      if (secIdx !== -1) {
        currentSecIndex = secIdx;
        const heading = document.createElement('div');
        heading.className = 'toc-section-heading';
        heading.textContent = SLIDE_SECTIONS[secIdx].name;
        tocList.appendChild(heading);
      }

      const item = document.createElement('a');
      item.className = 'toc-item';
      if (index === currentIndex) item.classList.add('active');

      const pad = (n) => (n < 10 ? '0' + n : n);
      item.innerHTML = `
        <span class="toc-item-num">${pad(slideNum)}</span>
        <span class="toc-item-text">${title}</span>
      `;

      item.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(index);
        closeToc();
      });

      tocList.appendChild(item);
    });
  }

  function openToc() {
    if (tocOverlay) {
      tocOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeToc() {
    if (tocOverlay) {
      tocOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  function openHelp() {
    if (helpModalOverlay) {
      helpModalOverlay.classList.add('open');
    }
  }

  function closeHelp() {
    if (helpModalOverlay) {
      helpModalOverlay.classList.remove('open');
    }
  }

  /**
   * Fullscreen Toggle
   */
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn(`Fullscreen error: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  /**
   * Copy Code to Clipboard Functionality
   */
  function initCopyButtons() {
    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const container = btn.closest('.code-container');
        if (!container) return;

        const codeBlock = container.querySelector('pre.code-block');
        if (!codeBlock) return;

        // Clean out any formatting HTML tags, get raw text
        const codeText = codeBlock.innerText.trim();

        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(codeText);
          } else {
            // Fallback for non-secure / file protocol
            const textArea = document.createElement('textarea');
            textArea.value = codeText;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            textArea.remove();
          }

          // Visual Feedback
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
          console.error('Copy failed:', err);
        }
      });
    });
  }

  /**
   * Keyboard Navigation
   */
  function handleKeyDown(e) {
    // Ignore key events inside inputs, textareas or contenteditable elements
    const tag = e.target.tagName.toLowerCase();
    if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) {
      return;
    }

    // Modal close with Escape
    if (e.key === 'Escape') {
      if (tocOverlay && tocOverlay.classList.contains('open')) {
        closeToc();
        return;
      }
      if (helpModalOverlay && helpModalOverlay.classList.contains('open')) {
        closeHelp();
        return;
      }
      return;
    }

    switch (e.key) {
      case 'ArrowRight':
      case 'PageDown':
      case ' ': // Spacebar
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
        if (tocOverlay && tocOverlay.classList.contains('open')) {
          closeToc();
        } else {
          openToc();
        }
        break;

      case '?':
      case 'h':
      case 'H':
        e.preventDefault();
        if (helpModalOverlay && helpModalOverlay.classList.contains('open')) {
          closeHelp();
        } else {
          openHelp();
        }
        break;
    }
  }

  /**
   * URL Hash Sync & Initial Slide Routing
   */
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
    // Default to first slide
    goToSlide(0, false);
  }

  /**
   * Interactive Widget: Slide 17 Truthy / Falsy & Equality Tester
   */
  function initSlide17Tester() {
    const testBtns = document.querySelectorAll('.test-val-btn');
    const resultBox = document.getElementById('tester-output-box');
    if (!testBtns.length || !resultBox) return;

    testBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        testBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        const valType = btn.getAttribute('data-type');
        let booleanVal = false;
        let explanation = '';

        switch (valType) {
          case 'empty-string':
            booleanVal = Boolean("");
            explanation = 'Empty string "" contains 0 characters. It is 1 of the 8 falsy values.';
            break;
          case 'zero':
            booleanVal = Boolean(0);
            explanation = 'Numeric 0 represents no quantity. It is falsy in JavaScript.';
            break;
          case 'empty-array':
            booleanVal = Boolean([]);
            explanation = 'Empty array [] is an object reference in memory! In JavaScript, ALL objects/arrays are TRUTHY (unlike Python!).';
            break;
          case 'empty-object':
            booleanVal = Boolean({});
            explanation = 'Empty object {} is an object reference. In JavaScript, ALL objects are TRUTHY!';
            break;
          case 'null':
            booleanVal = Boolean(null);
            explanation = 'null represents intentional absence of value. It is falsy.';
            break;
          case 'undefined':
            booleanVal = Boolean(undefined);
            explanation = 'undefined represents an unassigned variable or missing property. It is falsy.';
            break;
          case 'nan':
            booleanVal = Boolean(NaN);
            explanation = 'NaN (Not-a-Number) results from invalid math (e.g. 0 / 0). It is falsy.';
            break;
          case 'str-hello':
            booleanVal = Boolean("Hello");
            explanation = 'Non-empty string has length > 0. Always truthy!';
            break;
        }

        resultBox.innerHTML = `
          <div style="display:flex; align-items:center; gap:0.6rem; margin-bottom:0.4rem;">
            <strong style="color:var(--text-main);">Boolean(${btn.textContent.trim()}):</strong>
            <span style="font-weight:800; font-family:var(--font-mono); padding:0.15rem 0.55rem; border-radius:4px; ${booleanVal ? 'background:#ecfdf5; color:#059669; border:1px solid #a7f3d0;' : 'background:#fff1f2; color:#e11d48; border:1px solid #fecdd3;'}">
              ${booleanVal ? 'TRUE (Truthy)' : 'FALSE (Falsy)'}
            </span>
          </div>
          <div style="font-size:0.86rem; color:var(--text-muted); line-height:1.45;">
            💡 <strong>Why:</strong> ${explanation}
          </div>
        `;
      });
    });
  }

  /**
   * Interactive Widget: Slide 31 Student Performance Analyzer Simulator
   */
  function initStudentAnalyzerWidget() {
    const passInput = document.getElementById('analyzer-pass-input');
    const applyBtn = document.getElementById('analyzer-apply-btn');
    const passedListEl = document.getElementById('analyzer-passed-list');
    const passRateEl = document.getElementById('analyzer-pass-rate');
    const presetBtns = document.querySelectorAll('.pass-preset-btn');

    if (!passInput || !passedListEl || !passRateEl) return;

    const sampleStudents = [
      { name: "Anu", marks: 85 },
      { name: "Rahul", marks: 42 },
      { name: "Meera", marks: 92 },
      { name: "Arjun", marks: 65 },
      { name: "Diya", marks: 35 },
    ];

    function updateMetrics(mark) {
      const passThreshold = Number(mark);
      if (isNaN(passThreshold)) return;
      const passed = sampleStudents.filter(s => s.marks >= passThreshold);
      const rate = ((passed.length / sampleStudents.length) * 100).toFixed(1);

      passedListEl.textContent = passed.map(s => s.name).join(', ') || 'None';
      passRateEl.textContent = `${rate}% (${passed.length}/${sampleStudents.length})`;
    }

    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        updateMetrics(passInput.value);
      });
    }

    passInput.addEventListener('input', () => {
      updateMetrics(passInput.value);
    });

    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-pass');
        passInput.value = val;
        updateMetrics(val);
      });
    });

    // Initial calculation
    updateMetrics(passInput.value || 50);
  }

  /**
   * Initialization
   */
  function init() {
    // Nav Buttons
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Fullscreen
    if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);

    // TOC
    if (tocBtn) tocBtn.addEventListener('click', openToc);
    if (tocCloseBtn) tocCloseBtn.addEventListener('click', closeToc);
    if (tocOverlay) {
      tocOverlay.addEventListener('click', (e) => {
        if (e.target === tocOverlay) closeToc();
      });
    }

    // Help Modal
    if (helpBtn) helpBtn.addEventListener('click', openHelp);
    if (helpModalClose) helpModalClose.addEventListener('click', closeHelp);
    if (helpModalOverlay) {
      helpModalOverlay.addEventListener('click', (e) => {
        if (e.target === helpModalOverlay) closeHelp();
      });
    }

    // Keyboard listener
    window.addEventListener('keydown', handleKeyDown);

    // Build TOC drawer
    buildTableOfContents();

    // Copy buttons
    initCopyButtons();

    // Interactive widgets
    initSlide17Tester();
    initStudentAnalyzerWidget();

    // Listen to hash changes (back/forward in browser)
    window.addEventListener('hashchange', handleHash);

    // Trigger initial slide
    handleHash();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
