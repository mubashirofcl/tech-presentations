/**
 * Node.js Day 2: Asynchronous Programming & I/O
 * Interactive Presentation Engine
 * Pure Vanilla JavaScript: Navigation, Keyboard, Fullscreen, Copy-Code, TOC & Interactive Widgets
 */

(function () {
  'use strict';

  // Section Mapping for all 25 slides
  const SLIDE_SECTIONS = [
    { start: 1, end: 4, name: 'Section 1: Understanding Asynchronous Programming' },
    { start: 5, end: 9, name: 'Section 2: Callbacks, Promises, and async/await' },
    { start: 10, end: 12, name: 'Section 3: Parallel Operations and Error Handling' },
    { start: 13, end: 14, name: 'Section 4: Fetch API in Node.js' },
    { start: 15, end: 16, name: 'Section 5: Timeouts and AbortController' },
    { start: 17, end: 19, name: 'Section 6: Retry with Exponential Backoff' },
    { start: 20, end: 22, name: 'Section 7: File Operations with fs/promises and path' },
    { start: 23, end: 25, name: 'Section 8: Final Practical Project & Next Steps' },
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
    return 'Node.js Day 2';
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
      slides[currentIndex].scrollTop = 0; // scroll to top if needed
    }

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
   * Populate Table of Contents Drawer dynamically
   */
  function initTableOfContents() {
    if (!tocList) return;
    tocList.innerHTML = '';

    let currentSecIndex = -1;

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
        titleText = 'Title: Node.js Day 2 Asynchronous Programming & I/O';
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
   * Hash change sync (#slide-1 to #slide-25)
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
   * Interactive Simulator: Slide 4 Event Loop
   */
  function initEventLoopSimulator() {
    const btn = document.getElementById('run-event-loop-sim');
    const logOutput = document.getElementById('event-loop-sim-log');
    const statusText = document.getElementById('event-loop-step-status');
    if (!btn || !logOutput) return;

    btn.addEventListener('click', () => {
      btn.disabled = true;
      logOutput.innerHTML = '';
      if (statusText) statusText.textContent = '1. Executing synchronous code: console.log("Start")';

      logOutput.innerHTML += '<div class="cmd">&gt; node app.js</div>';
      logOutput.innerHTML += '<div class="res">Start</div>';

      setTimeout(() => {
        if (statusText) statusText.textContent = '2. setTimeout(..., 0) registered with Node.js timer queue. Synchronous code continues...';
        logOutput.innerHTML += '<div class="cmd" style="color:#94a3b8;">[Timer callback scheduled in Timer Phase]</div>';

        setTimeout(() => {
          if (statusText) statusText.textContent = '3. Executing synchronous code: console.log("End")';
          logOutput.innerHTML += '<div class="res">End</div>';

          setTimeout(() => {
            if (statusText) statusText.textContent = '4. Call Stack empty! Event loop picks timer callback and executes it:';
            logOutput.innerHTML += '<div class="res" style="color:#38bdf8; font-weight:700;">Timer callback</div>';
            if (statusText) statusText.textContent = '✓ Execution complete. Notice Timer callback printed last!';
            btn.disabled = false;
          }, 900);
        }, 900);
      }, 900);
    });
  }

  /**
   * Interactive Simulator: Slide 10 Concurrency Comparator
   */
  function initConcurrencySimulator() {
    const btn = document.getElementById('run-concurrency-sim');
    const seqBar1 = document.getElementById('seq-bar-1');
    const seqBar2 = document.getElementById('seq-bar-2');
    const parBar1 = document.getElementById('par-bar-1');
    const parBar2 = document.getElementById('par-bar-2');
    const statusEl = document.getElementById('concurrency-status');

    if (!btn || !seqBar1 || !parBar1) return;

    btn.addEventListener('click', () => {
      btn.disabled = true;
      if (statusEl) statusEl.textContent = 'Starting comparison: Sequential vs Promise.all concurrently...';

      // Reset bars
      seqBar1.style.width = '0%';
      seqBar2.style.width = '0%';
      parBar1.style.width = '0%';
      parBar2.style.width = '0%';

      // Parallel execution (runs both at once over 1s)
      parBar1.style.transition = 'width 1s linear';
      parBar2.style.transition = 'width 1s linear';
      parBar1.style.width = '100%';
      parBar2.style.width = '100%';

      // Sequential execution: first 1s for task 1, then next 1s for task 2
      seqBar1.style.transition = 'width 1s linear';
      seqBar1.style.width = '100%';

      setTimeout(() => {
        if (statusEl) statusEl.textContent = 'Promise.all finished in ~1s! Sequential task 1 complete, now starting task 2...';
        seqBar2.style.transition = 'width 1s linear';
        seqBar2.style.width = '100%';

        setTimeout(() => {
          if (statusEl) statusEl.textContent = '✓ Done: Promise.all took ~1s total. Sequential took ~2s total!';
          btn.disabled = false;
        }, 1000);
      }, 1000);
    });
  }

  /**
   * Interactive Simulator: Slide 18 Backoff Calculator
   */
  function initBackoffCalculator() {
    const attemptSelect = document.getElementById('calc-attempt-select');
    const baseInput = document.getElementById('calc-base-input');
    const formulaDisplay = document.getElementById('calc-formula-display');
    const resultDisplay = document.getElementById('calc-result-display');

    if (!attemptSelect || !baseInput || !resultDisplay) return;

    function recalculate() {
      const attempt = parseInt(attemptSelect.value, 10) || 1;
      const base = parseInt(baseInput.value, 10) || 500;
      const delayMs = base * Math.pow(2, attempt - 1);

      if (formulaDisplay) {
        formulaDisplay.textContent = `${base} * 2^(${attempt} - 1) = ${base} * ${Math.pow(2, attempt - 1)}`;
      }
      resultDisplay.textContent = `${delayMs.toLocaleString()} ms (${(delayMs / 1000).toFixed(1)}s)`;
    }

    attemptSelect.addEventListener('change', recalculate);
    baseInput.addEventListener('input', recalculate);
    recalculate();
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

    // Attach interactive widgets
    initEventLoopSimulator();
    initConcurrencySimulator();
    initBackoffCalculator();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
