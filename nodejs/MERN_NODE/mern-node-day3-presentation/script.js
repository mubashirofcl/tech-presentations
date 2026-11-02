/**
 * Node.js Day 3 — Promises & Async/Await
 * Day 3 — MERN Stack Development
 * Interactive Presentation Engine (Vanilla JavaScript)
 */

(function () {
  'use strict';

  // Section Mapping for all 20 slides
  const SLIDE_SECTIONS = [
    { start: 1, end: 3, name: 'Section 1: Introduction to Promises' },
    { start: 4, end: 7, name: 'Section 2: Understanding Promises' },
    { start: 8, end: 11, name: 'Section 3: Handling Promises' },
    { start: 12, end: 15, name: 'Section 4: Understanding async/await' },
    { start: 16, end: 17, name: 'Section 5: Error Handling with async/await' },
    { start: 18, end: 20, name: 'Section 6: Final Practical Implementation' },
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
    return 'Node.js Day 3 (MERN)';
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

    // Update Slide Counter (e.g. 01 / 20)
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
      try {
        history.replaceState(null, '', `#slide-${slideNumber}`);
      } catch (err) {
        // Some browsers restrict history updates on file:// URLs; navigation still works.
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
        titleText = 'Title: Node.js Day 3 — Promises & Async/Await';
      }

      const item = document.createElement('div');
      item.className = 'toc-item' + (idx === currentIndex ? ' active' : '');
      item.setAttribute('data-index', idx);
      const numSpan = document.createElement('span');
      numSpan.className = 'item-num';
      numSpan.textContent = slideNum < 10 ? '0' + slideNum : String(slideNum);
      const textSpan = document.createElement('span');
      textSpan.className = 'item-text';
      textSpan.textContent = titleText;
      item.appendChild(numSpan);
      item.appendChild(textSpan);

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
   * Clipboard helper with a fallback for browsers/contexts without the async API
   */
  async function writeToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return;
      } catch (err) {
        // fall through to legacy copy
      }
    }
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-1000px';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    if (!ok) throw new Error('Copy command failed');
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
          await writeToClipboard(textToCopy);
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
      // Leave browser shortcuts (Ctrl/Cmd/Alt combos) alone
      if (e.ctrlKey || e.metaKey || e.altKey) return;

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
   * Hash change sync (#slide-1 to #slide-20)
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
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

