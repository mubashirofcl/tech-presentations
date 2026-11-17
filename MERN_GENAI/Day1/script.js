/**
 * MERN Gen-AI – Day 1 Presentation Engine
 * Interactive 15-slide deck + hands-on Generative AI & Prompt Engineering sandboxes
 */
(() => {
  'use strict';

  const TOTAL_SLIDES = 15;

  const slideCategories = {
    1: 'Section 1 • Foundations',
    2: 'Section 1 • Foundations',
    3: 'Section 1 • Foundations',
    4: 'Section 1 • Applications',
    5: 'Section 2 • LLM Concepts',
    6: 'Section 2 • How LLMs Work',
    7: 'Section 2 • Tokens & Limits',
    8: 'Section 2 • Model Providers',
    9: 'Section 3 • Prompt Engineering',
    10: 'Section 3 • Prompt Anatomy',
    11: 'Section 3 • System vs User',
    12: 'Section 4 • Prompt Techniques',
    13: 'Section 5 • Node.js Setup',
    14: 'Section 5 • AI Chat API',
    15: 'Section 6 • Practical Challenge'
  };

  let currentSlide = 1;

  // DOM Elements
  const slides = Array.from(document.querySelectorAll('.slide'));
  const progressFill = document.getElementById('progressFill');
  const sectionIndicator = document.getElementById('sectionIndicator');
  const slideCounter = document.getElementById('slideCounter');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  // Modals
  const tocBtn = document.getElementById('tocBtn');
  const tocOverlay = document.getElementById('tocOverlay');
  const tocClose = document.getElementById('tocClose');
  const tocList = document.getElementById('tocList');

  const helpBtn = document.getElementById('helpBtn');
  const helpModal = document.getElementById('helpModal');
  const helpClose = document.getElementById('helpClose');

  const fullscreenBtn = document.getElementById('fullscreenBtn');

  const solutionBtn = document.getElementById('solutionBtn');
  const solutionModal = document.getElementById('solutionModal');
  const solutionClose = document.getElementById('solutionClose');

  // Helper: Format two-digit slide number
  const pad2 = (n) => String(n).padStart(2, '0');

  // Helper: Check if user is typing inside an interactive field
  const isTypingTarget = (el) => {
    if (!el) return false;
    const tag = el.tagName ? el.tagName.toLowerCase() : '';
    return tag === 'input' || tag === 'textarea' || tag === 'select' || el.isContentEditable;
  };

  // Helper: Escape HTML for safe rendering
  const escapeHtml = (str) =>
    String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  // -------------------------------------------------------
  // Slide Navigation Engine
  // -------------------------------------------------------
  function buildTOC() {
    if (!tocList) return;
    tocList.innerHTML = '';

    slides.forEach((slideEl, idx) => {
      const num = idx + 1;
      const titleEl = slideEl.querySelector('.slide-title') || slideEl.querySelector('.title-main');
      const titleText = titleEl
        ? titleEl.textContent.replace(/\s+/g, ' ').trim()
        : `Slide ${num}`;

      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'toc-item';
      item.dataset.slide = String(num);
      item.innerHTML = `<span style="font-family:var(--font-mono);color:var(--primary);font-weight:700;margin-right:8px;">${pad2(num)}</span> ${escapeHtml(titleText)}`;

      item.addEventListener('click', () => {
        goToSlide(num);
        closeModal(tocOverlay);
      });

      tocList.appendChild(item);
    });
  }

  function highlightSlideCode(slideEl) {
    if (window.Prism && slideEl) {
      try {
        window.Prism.highlightAllUnder(slideEl);
      } catch (_) {
        // Ignore Prism edge errors
      }
    }
  }

  function goToSlide(targetNum) {
    const clamped = Math.max(1, Math.min(TOTAL_SLIDES, targetNum));
    currentSlide = clamped;

    slides.forEach((slideEl) => {
      const sNum = Number(slideEl.dataset.slide);
      const isActive = sNum === currentSlide;
      slideEl.classList.toggle('active', isActive);
      if (isActive) {
        slideEl.scrollTop = 0;
        highlightSlideCode(slideEl);
      }
    });

    if (slideCounter) {
      slideCounter.textContent = `${pad2(currentSlide)} / ${pad2(TOTAL_SLIDES)}`;
    }

    if (sectionIndicator) {
      sectionIndicator.textContent = slideCategories[currentSlide] || 'Day 1';
    }

    if (progressFill) {
      const pct = (currentSlide / TOTAL_SLIDES) * 100;
      progressFill.style.width = `${pct}%`;
    }

    if (prevBtn) prevBtn.disabled = currentSlide === 1;
    if (nextBtn) nextBtn.disabled = currentSlide === TOTAL_SLIDES;

    if (tocList) {
      tocList.querySelectorAll('.toc-item').forEach((item) => {
        item.classList.toggle('active-slide', Number(item.dataset.slide) === currentSlide);
      });
    }

    try {
      if (window.location.hash !== `#slide-${currentSlide}`) {
        history.replaceState(null, '', `#slide-${currentSlide}`);
      }
    } catch (_) {
      // Ignore file:// history edge restrictions
    }
  }

  function nextSlide() {
    if (currentSlide < TOTAL_SLIDES) goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    if (currentSlide > 1) goToSlide(currentSlide - 1);
  }

  // -------------------------------------------------------
  // Modals & Fullscreen Helpers
  // -------------------------------------------------------
  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('open');
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
  }

  function closeAllModals() {
    closeModal(tocOverlay);
    closeModal(helpModal);
    closeModal(solutionModal);
  }

  function isAnyModalOpen() {
    return (
      (tocOverlay && tocOverlay.classList.contains('open')) ||
      (helpModal && helpModal.classList.contains('open')) ||
      (solutionModal && solutionModal.classList.contains('open'))
    );
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }

  // -------------------------------------------------------
  // One-Click Copy Code Buttons
  // -------------------------------------------------------
  function setupCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const container = btn.closest('.code-container');
        const codeEl = container ? container.querySelector('pre code') : null;
        if (!codeEl) return;

        const text = codeEl.textContent || '';
        let copied = false;

        if (navigator.clipboard && navigator.clipboard.writeText) {
          try {
            await navigator.clipboard.writeText(text);
            copied = true;
          } catch (_) {
            copied = false;
          }
        }

        if (!copied) {
          const ta = document.createElement('textarea');
          ta.value = text;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          try {
            document.execCommand('copy');
            copied = true;
          } catch (_) {
            copied = false;
          }
          document.body.removeChild(ta);
        }

        if (copied) {
          const prevText = btn.textContent;
          btn.textContent = 'Copied!';
          btn.classList.add('copied');
          setTimeout(() => {
            btn.textContent = prevText;
            btn.classList.remove('copied');
          }, 1600);
        }
      });
    });
  }

  // -------------------------------------------------------
  // Interactive Lab 1: Prompt Anatomy Builder (Slide 10)
  // -------------------------------------------------------
  function setupPromptAnatomySandbox() {
    const roleCheck = document.getElementById('anaRoleCheck');
    const taskCheck = document.getElementById('anaTaskCheck');
    const contextCheck = document.getElementById('anaContextCheck');
    const instrCheck = document.getElementById('anaInstrCheck');
    const constCheck = document.getElementById('anaConstraintCheck');

    const roleInput = document.getElementById('anaRoleText');
    const taskInput = document.getElementById('anaTaskText');
    const contextInput = document.getElementById('anaContextText');
    const instrInput = document.getElementById('anaInstrText');
    const constInput = document.getElementById('anaConstraintText');

    const outputBox = document.getElementById('anaOutputBox');

    if (!roleCheck || !taskCheck || !contextCheck || !instrCheck || !constCheck || !outputBox) return;

    function buildPrompt() {
      const parts = [];

      if (roleCheck.checked && roleInput.value.trim()) {
        parts.push(`Role: ${roleInput.value.trim()}`);
      }
      if (taskCheck.checked && taskInput.value.trim()) {
        parts.push(`Task: ${taskInput.value.trim()}`);
      }
      if (contextCheck.checked && contextInput.value.trim()) {
        parts.push(`Context: ${contextInput.value.trim()}`);
      }
      if (instrCheck.checked && instrInput.value.trim()) {
        parts.push(`Instructions: ${instrInput.value.trim()}`);
      }
      if (constCheck.checked && constInput.value.trim()) {
        parts.push(`Constraints: ${constInput.value.trim()}`);
      }

      if (parts.length === 0) {
        outputBox.textContent = '// Enable at least one component to assemble your prompt...';
        return;
      }

      outputBox.textContent =
        `=== ASSEMBLED PROMPT SPECIFICATION ===\n\n` +
        parts.join('\n\n') +
        `\n\n---------------------------------------\n` +
        `Combined Prompt: "${parts.map((p) => p.split(': ')[1]).join('. ')}."`;
    }

    [roleCheck, taskCheck, contextCheck, instrCheck, constCheck].forEach((cb) => {
      if (cb) cb.addEventListener('change', buildPrompt);
    });
    [roleInput, taskInput, contextInput, instrInput, constInput].forEach((inp) => {
      if (inp) inp.addEventListener('input', buildPrompt);
    });

    buildPrompt();
  }

  // -------------------------------------------------------
  // Interactive Lab 2: Zero-Shot vs Few-Shot Classifier Simulator (Slide 12)
  // -------------------------------------------------------
  function setupClassifierSandbox() {
    const textInput = document.getElementById('clsInputText');
    const modeSelect = document.getElementById('clsModeSelect');
    const runBtn = document.getElementById('clsRunBtn');
    const statusBadge = document.getElementById('clsStatusBadge');
    const outputBox = document.getElementById('clsOutputBox');

    if (!textInput || !modeSelect || !runBtn || !statusBadge || !outputBox) return;

    function runClassification() {
      const review = textInput.value.trim();
      const mode = modeSelect.value; // 'zero' or 'few'

      if (!review) {
        statusBadge.className = 'status-pill status-pill-danger';
        statusBadge.textContent = 'Empty input';
        outputBox.textContent = 'Please enter a review statement.';
        return;
      }

      const lower = review.toLowerCase();
      let category = 'Neutral';

      if (lower.includes('great') || lower.includes('amazing') || lower.includes('excellent') || lower.includes('love') || lower.includes('helpful')) {
        category = 'Positive';
      } else if (lower.includes('terrible') || lower.includes('poor') || lower.includes('bad') || lower.includes('crashes') || lower.includes('horrible')) {
        category = 'Negative';
      } else {
        category = 'Neutral';
      }

      statusBadge.className = `status-pill ${category === 'Positive' ? 'status-pill-success' : category === 'Negative' ? 'status-pill-danger' : 'status-pill-warning'}`;
      statusBadge.textContent = `${category} (${mode === 'few' ? 'Few-Shot' : 'Zero-Shot'})`;

      if (mode === 'zero') {
        outputBox.textContent =
          `PROMPT SENT (Zero-Shot):\n` +
          `"Classify this review as Positive, Negative, or Neutral: '${review}'"\n\n` +
          `AI OUTPUT: "${category}"\n` +
          `(Note: Model classified directly without looking at demonstration examples.)`;
      } else {
        outputBox.textContent =
          `PROMPT SENT (Few-Shot):\n` +
          `Review: "Excellent service." -> Positive\n` +
          `Review: "Very poor quality." -> Negative\n` +
          `Review: "The package arrived today." -> Neutral\n` +
          `Review: "${review}" -> [Category]\n\n` +
          `AI OUTPUT: "${category}"\n` +
          `(Note: Model used 3 in-context examples to match exact format and category definitions.)`;
      }
    }

    runBtn.addEventListener('click', runClassification);
    modeSelect.addEventListener('change', runClassification);
    runClassification();
  }

  // -------------------------------------------------------
  // Interactive Lab 3: Live /api/chat Simulator (Slide 14 & 15)
  // -------------------------------------------------------
  function setupChatSimulator() {
    const qInput = document.getElementById('chatInputQuestion');
    const sendBtn = document.getElementById('chatSendBtn');
    const statusBadge = document.getElementById('chatStatusBadge');
    const outputBox = document.getElementById('chatOutputBox');

    if (!qInput || !sendBtn || !statusBadge || !outputBox) return;

    function runChatCall() {
      const question = qInput.value.trim();

      if (!question) {
        statusBadge.className = 'status-pill status-pill-danger';
        statusBadge.textContent = '400 Bad Request';
        outputBox.textContent = JSON.stringify({ message: 'Question is required' }, null, 2);
        return;
      }

      statusBadge.className = 'status-pill status-pill-success';
      statusBadge.textContent = '200 OK • POST /api/chat';

      let answer = '';
      if (/react/i.test(question)) {
        answer = 'React components are reusable building blocks of a user interface. They are JavaScript functions that return JSX (HTML-like syntax) describing what should appear on the screen.';
      } else if (/node/i.test(question)) {
        answer = 'Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a web browser, ideal for building fast, scalable backend APIs.';
      } else if (/express/i.test(question)) {
        answer = 'Express is a minimal and flexible Node.js web application framework that provides a robust set of features to develop web and mobile applications, including routing and middleware.';
      } else {
        answer = `Regarding "${question}": Generative AI models generate text token by token based on pre-trained statistical associations and the instructions provided in your prompt.`;
      }

      outputBox.textContent = JSON.stringify(
        {
          answer: answer
        },
        null,
        2
      );
    }

    sendBtn.addEventListener('click', runChatCall);
    runChatCall();
  }

  // -------------------------------------------------------
  // Event Listeners (Keyboard, Touch, Modals)
  // -------------------------------------------------------
  function setupEventListeners() {
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    if (tocBtn) tocBtn.addEventListener('click', () => openModal(tocOverlay));
    if (tocClose) tocClose.addEventListener('click', () => closeModal(tocOverlay));
    if (tocOverlay) {
      tocOverlay.addEventListener('click', (e) => {
        if (e.target === tocOverlay) closeModal(tocOverlay);
      });
    }

    if (helpBtn) helpBtn.addEventListener('click', () => openModal(helpModal));
    if (helpClose) helpClose.addEventListener('click', () => closeModal(helpModal));
    if (helpModal) {
      helpModal.addEventListener('click', (e) => {
        if (e.target === helpModal) closeModal(helpModal);
      });
    }

    if (solutionBtn) {
      solutionBtn.addEventListener('click', () => {
        openModal(solutionModal);
        if (window.Prism && solutionModal) {
          try {
            window.Prism.highlightAllUnder(solutionModal);
          } catch (_) {}
        }
      });
    }
    if (solutionClose) solutionClose.addEventListener('click', () => closeModal(solutionModal));
    if (solutionModal) {
      solutionModal.addEventListener('click', (e) => {
        if (e.target === solutionModal) closeModal(solutionModal);
      });
    }

    if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (isTypingTarget(document.activeElement)) return;

      if (e.key === 'Escape') {
        closeAllModals();
        return;
      }

      if (isAnyModalOpen()) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToSlide(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToSlide(TOTAL_SLIDES);
      } else if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        openModal(tocOverlay);
      } else if (e.key === '?') {
        e.preventDefault();
        openModal(helpModal);
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      }
    });

    // Touch swipe navigation
    let touchStartX = 0;
    let touchStartY = 0;
    let swipeBlocked = false;

    document.addEventListener(
      'touchstart',
      (e) => {
        swipeBlocked = Boolean(e.target.closest('.code-scroll-area, input, textarea, select'));
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      },
      { passive: true }
    );

    document.addEventListener(
      'touchend',
      (e) => {
        if (swipeBlocked || isAnyModalOpen()) return;
        const dx = e.changedTouches[0].screenX - touchStartX;
        const dy = e.changedTouches[0].screenY - touchStartY;
        if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) {
          if (dx < 0) nextSlide();
          else prevSlide();
        }
      },
      { passive: true }
    );
  }

  // -------------------------------------------------------
  // Bootstrap
  // -------------------------------------------------------
  function init() {
    buildTOC();
    setupCopyButtons();
    setupPromptAnatomySandbox();
    setupClassifierSandbox();
    setupChatSimulator();
    setupEventListeners();

    let startSlide = 1;
    const match = window.location.hash.match(/^#slide-(\d+)$/);
    if (match) {
      const parsed = parseInt(match[1], 10);
      if (parsed >= 1 && parsed <= TOTAL_SLIDES) startSlide = parsed;
    }
    goToSlide(startSlide);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
