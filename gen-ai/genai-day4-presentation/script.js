/**
 * Node.js – Gen-AI Day 4 Presentation Engine
 * Interactive 18-slide deck + 4 hands-on Prompt Engineering sandboxes
 */
(() => {
  'use strict';

  const TOTAL_SLIDES = 18;

  const slideCategories = {
    1: 'Section 1 • Foundations',
    2: 'Section 1 • Foundations',
    3: 'Section 2 • Prompt Construction',
    4: 'Section 2 • Prompt Construction',
    5: 'Section 2 • Prompt Construction',
    6: 'Section 3 • Practical Setup',
    7: 'Section 3 • Practical Basic API',
    8: 'Section 3 • System Instructions',
    9: 'Section 4 • Prompt Techniques',
    10: 'Section 4 • Practical Role API',
    11: 'Section 5 • Shot Prompting',
    12: 'Section 5 • Shot Prompting',
    13: 'Section 5 • Shot Prompting',
    14: 'Section 5 • Practical Zero-Shot',
    15: 'Section 5 • Practical Few-Shot',
    16: 'Section 5 • Practical Comparison',
    17: 'Section 6 • Best Practices',
    18: 'Section 6 • Practical Challenge'
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
      sectionIndicator.textContent = slideCategories[currentSlide] || 'Gen-AI Day 4';
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
  // Interactive Lab 1: Prompt Anatomy Builder (Slide 3)
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

    const previewBtn = document.getElementById('anaPreviewBtn');
    const outputBox = document.getElementById('anaOutputBox');

    if (!roleCheck || !taskCheck || !contextCheck || !instrCheck || !constCheck || !outputBox) return;

    function buildPrompt() {
      const parts = [];

      if (roleCheck.checked && roleInput.value.trim()) {
        parts.push(`Role: Act as an ${roleInput.value.trim()}.`);
      }
      if (contextCheck.checked && contextInput.value.trim()) {
        parts.push(`Context: ${contextInput.value.trim()}`);
      }
      if (taskCheck.checked && taskInput.value.trim()) {
        parts.push(`Task: ${taskInput.value.trim()}`);
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
        `Lesson: Combining Role + Context + Constraints provides a solid target for the LLM!`;
    }

    if (previewBtn) previewBtn.addEventListener('click', buildPrompt);
    [roleCheck, taskCheck, contextCheck, instrCheck, constCheck].forEach((cb) => {
      if (cb) cb.addEventListener('change', buildPrompt);
    });
    [roleInput, taskInput, contextInput, instrInput, constInput].forEach((inp) => {
      if (inp) inp.addEventListener('input', buildPrompt);
    });

    buildPrompt();
  }

  // -------------------------------------------------------
  // Interactive Lab 2: System Instructions & Role Lab (Slide 10)
  // -------------------------------------------------------
  function setupRolePromptingSandbox() {
    const roleSelect = document.getElementById('roleSelect');
    const qInput = document.getElementById('roleQuestionInput');
    const runBtn = document.getElementById('roleRunBtn');
    const statusBadge = document.getElementById('roleStatusBadge');
    const outputBox = document.getElementById('roleOutputBox');

    if (!roleSelect || !qInput || !runBtn || !statusBadge || !outputBox) return;

    const rolePersonas = {
      senior: {
        title: 'Senior Node.js Developer',
        badge: 'Architectural & Production Focus',
        reply: (q) =>
          `[Persona: Senior Backend Engineer]\n` +
          `When implementing ${q}, always consider throughput and non-blocking I/O.\n\n` +
          `"In production Express applications, middleware functions have access to the request object (req), ` +
          `response object (res), and the next middleware function in the application’s request-response cycle. ` +
          `Ensure you handle errors with next(err) and never stall the event loop."`
      },
      teacher: {
        title: 'Beginner Programming Teacher',
        badge: 'Friendly, Analogies & Step-by-Step',
        reply: (q) =>
          `[Persona: Friendly Programming Teacher]\n` +
          `Great question! Let's understand ${q} using a simple real-life analogy!\n\n` +
          `"Imagine an airport security checkpoint: before you reach your airplane gate (your final route controller), ` +
          `you pass through ID verification and baggage screening. In Express, middleware acts like those checkpoints! ` +
          `It inspects requests, verifies tokens, and calls next() to pass you forward!"`
      },
      interviewer: {
        title: 'Technical Interviewer',
        badge: 'Rigorous & Evaluative',
        reply: (q) =>
          `[Persona: Technical Interviewer]\n` +
          `Good question to test fundamental backend concepts. Here is how I evaluate a candidate answering ${q}:\n\n` +
          `"1. Did the candidate explain the req, res, next signature?\n` +
          `2. Do they know the difference between application-level vs router-level middleware?\n` +
          `3. Did they mention error-handling middleware has 4 arguments (err, req, res, next)?\n` +
          `Follow-up challenge: What happens if you forget to call next() in a middleware?"`
      },
      dba: {
        title: 'Database Administrator',
        badge: 'Data Safety & Query Performance',
        reply: (q) =>
          `[Persona: Database Administrator]\n` +
          `From a data integrity perspective on ${q}:\n\n` +
          `"Middleware is where you must sanitize incoming SQL/NoSQL parameters before they ever touch your query layer. ` +
          `Attach your database connection pool to req.app.locals, and use middleware to log query execution latency ` +
          `and enforce connection timeouts."`
      }
    };

    function runRoleSimulation() {
      const selected = roleSelect.value;
      const question = qInput.value.trim() || 'Express middleware';
      const persona = rolePersonas[selected] || rolePersonas.senior;

      statusBadge.textContent = `${persona.title} (${persona.badge})`;
      outputBox.textContent =
        `POST http://localhost:3000/role\n` +
        `{\n  "role": "${persona.title}",\n  "question": "${question}"\n}\n\n` +
        `RESPONSE (Simulated OpenAI client.responses.create):\n` +
        `--------------------------------------------------\n` +
        persona.reply(question);
    }

    runBtn.addEventListener('click', runRoleSimulation);
    roleSelect.addEventListener('change', runRoleSimulation);
    runRoleSimulation();
  }

  // -------------------------------------------------------
  // Interactive Lab 3: Zero-Shot vs Few-Shot Comparison (Slide 16)
  // -------------------------------------------------------
  function setupZeroFewComparisonSandbox() {
    const inputEl = document.getElementById('compReviewInput');
    const runBtn = document.getElementById('compRunBtn');
    const zeroBadge = document.getElementById('compZeroBadge');
    const zeroOutput = document.getElementById('compZeroOutput');
    const fewBadge = document.getElementById('compFewBadge');
    const fewOutput = document.getElementById('compFewOutput');

    if (!inputEl || !runBtn || !zeroBadge || !zeroOutput || !fewBadge || !fewOutput) return;

    function evaluateReview() {
      const text = inputEl.value.trim().toLowerCase();

      let zeroResult = 'Positive';
      let fewResult = 'Neutral';

      if (text.includes('crashes') || text.includes('terrible') || text.includes('bad') || text.includes('slow')) {
        if (text.includes('useful') || text.includes('good') || text.includes('but')) {
          zeroResult = 'Positive'; // Zero-shot often anchors on the first positive word
          fewResult = 'Neutral';   // Few-shot pattern-matches nuanced mixed statements
        } else {
          zeroResult = 'Negative';
          fewResult = 'Negative';
        }
      } else if (text.includes('fast') || text.includes('excellent') || text.includes('helpful') || text.includes('amazing')) {
        zeroResult = 'Positive';
        fewResult = 'Positive';
      } else {
        zeroResult = 'Neutral';
        fewResult = 'Neutral';
      }

      zeroBadge.className = `status-pill ${zeroResult === 'Positive' ? 'status-pill-success' : zeroResult === 'Negative' ? 'status-pill-danger' : 'status-pill-warning'}`;
      zeroBadge.textContent = zeroResult;
      zeroOutput.textContent =
        `Zero-Shot Classification: "${zeroResult}"\n` +
        `No examples provided in prompt.\n` +
        `Relies purely on model general probability. On mixed reviews ("useful but crashes"), zero-shot can lean towards the positive adjective without strict guidance.`;

      fewBadge.className = `status-pill ${fewResult === 'Positive' ? 'status-pill-success' : fewResult === 'Negative' ? 'status-pill-danger' : 'status-pill-warning'}`;
      fewBadge.textContent = fewResult;
      fewOutput.textContent =
        `Few-Shot Classification: "${fewResult}"\n` +
        `Guided by 3 demonstration examples (Positive, Negative, Neutral).\n` +
        `Demonstrates adherence to category boundaries and accurately handles nuanced mixed sentiment.`;
    }

    runBtn.addEventListener('click', evaluateReview);
    evaluateReview();
  }

  // -------------------------------------------------------
  // Interactive Lab 4: Prompt Playground API Simulator (Slide 18)
  // -------------------------------------------------------
  function setupPlaygroundSimulator() {
    const epSelect = document.getElementById('pgEndpointSelect');
    const payloadInput = document.getElementById('pgPayloadInput');
    const sendBtn = document.getElementById('pgSendBtn');
    const statusBadge = document.getElementById('pgStatusBadge');
    const outputBox = document.getElementById('pgOutputBox');

    if (!epSelect || !payloadInput || !sendBtn || !statusBadge || !outputBox) return;

    const defaultPayloads = {
      ask: JSON.stringify({ question: 'Explain Node.js in simple English' }, null, 2),
      role: JSON.stringify({ role: 'Senior Node.js Developer', question: 'Explain Express middleware' }, null, 2),
      zeroShot: JSON.stringify({ review: 'The delivery was very fast and the product is excellent.' }, null, 2),
      fewShot: JSON.stringify({ review: 'The customer support was extremely helpful.' }, null, 2)
    };

    function updateDefaultPayload() {
      const ep = epSelect.value;
      if (defaultPayloads[ep]) {
        payloadInput.value = defaultPayloads[ep];
      }
    }

    function runEndpointCall() {
      const ep = epSelect.value;
      let parsed;

      try {
        parsed = JSON.parse(payloadInput.value);
      } catch (err) {
        statusBadge.className = 'status-pill status-pill-danger';
        statusBadge.textContent = '400 Invalid JSON';
        outputBox.textContent = JSON.stringify({ error: 'Malformed JSON payload' }, null, 2);
        return;
      }

      if (ep === 'ask') {
        if (!parsed.question) {
          statusBadge.className = 'status-pill status-pill-danger';
          statusBadge.textContent = '400 Bad Request';
          outputBox.textContent = JSON.stringify({ message: 'Question is required' }, null, 2);
          return;
        }
        statusBadge.className = 'status-pill status-pill-success';
        statusBadge.textContent = '200 OK • POST /ask';
        outputBox.textContent = JSON.stringify(
          {
            answer: 'Node.js is an open-source, cross-platform JavaScript runtime environment that lets developers execute JavaScript code on the server side using Google Chrome\'s V8 engine.'
          },
          null,
          2
        );
      } else if (ep === 'role') {
        if (!parsed.role || !parsed.question) {
          statusBadge.className = 'status-pill status-pill-danger';
          statusBadge.textContent = '400 Bad Request';
          outputBox.textContent = JSON.stringify({ message: 'Role and question are required' }, null, 2);
          return;
        }
        statusBadge.className = 'status-pill status-pill-success';
        statusBadge.textContent = '200 OK • POST /role';
        outputBox.textContent = JSON.stringify(
          {
            role: parsed.role,
            answer: `Acting as a ${parsed.role}: Express middleware functions sit between incoming requests and route controllers, enabling authentication, request logging, and error handling.`
          },
          null,
          2
        );
      } else if (ep === 'zeroShot') {
        if (!parsed.review) {
          statusBadge.className = 'status-pill status-pill-danger';
          statusBadge.textContent = '400 Bad Request';
          outputBox.textContent = JSON.stringify({ message: 'Review is required' }, null, 2);
          return;
        }
        statusBadge.className = 'status-pill status-pill-success';
        statusBadge.textContent = '200 OK • POST /zero-shot';
        outputBox.textContent = JSON.stringify(
          {
            result: 'Positive'
          },
          null,
          2
        );
      } else if (ep === 'fewShot') {
        if (!parsed.review) {
          statusBadge.className = 'status-pill status-pill-danger';
          statusBadge.textContent = '400 Bad Request';
          outputBox.textContent = JSON.stringify({ message: 'Review is required' }, null, 2);
          return;
        }
        statusBadge.className = 'status-pill status-pill-success';
        statusBadge.textContent = '200 OK • POST /few-shot';
        outputBox.textContent = JSON.stringify(
          {
            result: 'Positive'
          },
          null,
          2
        );
      }
    }

    epSelect.addEventListener('change', () => {
      updateDefaultPayload();
      runEndpointCall();
    });
    sendBtn.addEventListener('click', runEndpointCall);

    updateDefaultPayload();
    runEndpointCall();
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
    setupRolePromptingSandbox();
    setupZeroFewComparisonSandbox();
    setupPlaygroundSimulator();
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
