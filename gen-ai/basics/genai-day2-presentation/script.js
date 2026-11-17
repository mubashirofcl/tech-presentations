/**
 * Node.js – Gen-AI Day 2 Presentation Engine
 * Interactive 20-slide deck + 4 hands-on LLM Playground sandboxes
 */
(() => {
  'use strict';

  const TOTAL_SLIDES = 20;

  const slideCategories = {
    1: 'Section 1 • Introduction',
    2: 'Section 1 • LLM Basics',
    3: 'Section 1 • Learning Process',
    4: 'Section 1 • Training vs Inference',
    5: 'Section 2 • Practical: First Inference',
    6: 'Section 2 • Practical: Prompt & Usage',
    7: 'Section 3 • Tokens & Tokenization',
    8: 'Section 3 • Practical: Tokenization',
    9: 'Section 4 • Context Window',
    10: 'Section 4 • Practical: Context Management',
    11: 'Section 5 • Parameters & Weights',
    12: 'Section 5 • Temperature',
    13: 'Section 5 • Practical: Temperature',
    14: 'Section 5 • Max Output Tokens',
    15: 'Section 6 • Hallucinations',
    16: 'Section 6 • Practical: Grounding Context',
    17: 'Section 6 • Knowledge Cutoff',
    18: 'Section 7 • Transformer Architecture',
    19: 'Section 7 • Attention & Variants',
    20: 'Section 8 • Recap & Playground Challenge'
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

  // Helper: Escape HTML for safe rendering in sandbox widgets
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
      sectionIndicator.textContent = slideCategories[currentSlide] || 'Gen-AI Day 2';
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
  // Interactive Sandbox 1: Token Estimator (Slide 8)
  // -------------------------------------------------------
  function setupTokenSandbox() {
    const input = document.getElementById('tokenSimInput');
    const btn = document.getElementById('tokenSimBtn');
    const charsEl = document.getElementById('tokenSimChars');
    const estEl = document.getElementById('tokenSimEst');
    const chipsEl = document.getElementById('tokenSimChips');
    const usageEl = document.getElementById('tokenSimUsage');

    if (!input || !btn || !charsEl || !estEl || !chipsEl || !usageEl) return;

    const palette = ['c1', 'c2', 'c3', 'c4', 'c5'];

    // Educational visual splitter (matches ~4 chars/word-piece intuition)
    function splitVisualPieces(text) {
      if (!text) return [];
      const pieces = [];
      const rawWords = text.match(/\S+|\s+/g) || [];
      rawWords.forEach((chunk) => {
        if (/^\s+$/.test(chunk)) {
          pieces.push(chunk);
          return;
        }
        if (chunk.length <= 5) {
          pieces.push(chunk);
        } else {
          for (let i = 0; i < chunk.length; i += 4) {
            pieces.push(chunk.slice(i, i + 4));
          }
        }
      });
      return pieces;
    }

    function runEstimate() {
      const text = input.value;
      const charCount = text.length;
      const approxTokens = Math.ceil(charCount / 4);

      charsEl.textContent = `${charCount} chars`;
      estEl.textContent = `~${approxTokens} estimated tokens`;

      const pieces = splitVisualPieces(text);
      if (pieces.length === 0) {
        chipsEl.innerHTML = '<span style="color:var(--text-muted);font-size:0.82rem;">Type a prompt to see estimated token pieces...</span>';
      } else {
        chipsEl.innerHTML = pieces
          .map((piece, idx) => {
            if (/^\s+$/.test(piece)) return ' ';
            const colorCls = palette[idx % palette.length];
            return `<span class="token-chip ${colorCls}" title="Approx piece #${idx + 1}">${escapeHtml(piece)}</span>`;
          })
          .join('');
      }

      const simOutputTokens = charCount > 0 ? Math.max(12, Math.round(approxTokens * 2.2)) : 0;
      const simTotal = approxTokens + simOutputTokens;
      usageEl.textContent = JSON.stringify(
        {
          educational_estimate: {
            formula: 'Math.ceil(text.length / 4)',
            input_characters: charCount,
            estimated_input_tokens: approxTokens
          },
          sample_sdk_response_usage: {
            input_tokens: approxTokens,
            output_tokens: simOutputTokens,
            total_tokens: simTotal
          }
        },
        null,
        2
      );
    }

    btn.addEventListener('click', runEstimate);
    input.addEventListener('input', runEstimate);
    runEstimate();
  }

  // -------------------------------------------------------
  // Interactive Sandbox 2: Temperature & Max Tokens (Slide 13)
  // -------------------------------------------------------
  function setupTemperatureSandbox() {
    const slider = document.getElementById('tempSimSlider');
    const valBadge = document.getElementById('tempSimVal');
    const maxTokensInput = document.getElementById('tempSimMaxTokens');
    const runBtn = document.getElementById('tempSimRunBtn');
    const outputBox = document.getElementById('tempSimOutput');

    if (!slider || !valBadge || !maxTokensInput || !runBtn || !outputBox) return;

    function getTemperatureSample(temp) {
      if (temp <= 0.25) {
        return {
          mode: 'Focused & Deterministic (Low Temperature)',
          text:
            'Node.js is an open-source JavaScript runtime built on Chrome\'s V8 engine that executes server-side code using an event-driven, non-blocking I/O model.'
        };
      }
      if (temp <= 0.75) {
        return {
          mode: 'Balanced & Clear (Medium Temperature)',
          text:
            'Think of Node.js as a kitchen with one fast waiter: instead of waiting at the stove for one order, it takes new orders immediately and serves each dish as soon as it is ready.'
        };
      }
      return {
        mode: 'Varied & Creative (High Temperature)',
        text:
          'Imagine an orchestra conductor who never stalls on one violin solo—Node.js cues databases, APIs, and files concurrently, weaving thousands of tiny requests into one smooth rhythm!'
      };
    }

    function applyTokenCap(fullText, maxTokens) {
      const words = fullText.split(/\s+/);
      // Approximate ~1.3 tokens per word for demonstration
      const maxWords = Math.max(4, Math.floor(maxTokens / 1.35));
      if (words.length <= maxWords) {
        return { text: fullText, truncated: false, estOutTokens: Math.ceil(fullText.length / 4) };
      }
      const cut = words.slice(0, maxWords).join(' ') + ' ... [TRUNCATED AT max_output_tokens]';
      return { text: cut, truncated: true, estOutTokens: maxTokens };
    }

    function runTempSimulation() {
      const temp = parseFloat(slider.value);
      const maxTokens = Math.max(10, Math.min(500, parseInt(maxTokensInput.value, 10) || 150));
      valBadge.textContent = temp.toFixed(1);

      const sample = getTemperatureSample(temp);
      const capped = applyTokenCap(sample.text, maxTokens);

      outputBox.textContent =
        `Mode: ${sample.mode} (temperature: ${temp.toFixed(1)}, max_output_tokens: ${maxTokens})\n` +
        `--------------------------------------------------\n` +
        `${capped.text}\n\n` +
        `Note: ${
          capped.truncated
            ? 'max_output_tokens cap reached — the model stopped early mid-answer!'
            : 'Completed within max_output_tokens budget. Remember: higher temperature adds variety, not extra intelligence.'
        }`;
    }

    slider.addEventListener('input', () => {
      valBadge.textContent = parseFloat(slider.value).toFixed(1);
    });
    runBtn.addEventListener('click', runTempSimulation);
    runTempSimulation();
  }

  // -------------------------------------------------------
  // Interactive Sandbox 3: Context Grounding Guard (Slide 16)
  // -------------------------------------------------------
  function setupRagGuardSandbox() {
    const questionEl = document.getElementById('ragGuardQuestion');
    const toggleEl = document.getElementById('ragGuardToggle');
    const btn = document.getElementById('ragGuardBtn');
    const statusEl = document.getElementById('ragGuardStatus');
    const outputEl = document.getElementById('ragGuardOutput');

    if (!questionEl || !toggleEl || !btn || !statusEl || !outputEl) return;

    const scenarios = {
      campus: {
        q: 'What is the tuition fee for GenAI Batch 7 at HACA?',
        ungrounded:
          'Simulated Ungrounded Reply:\n"GenAI Batch 7 at HACA costs ₹45,000 and includes a 6-week internship."  <-- FABRICATED! The model guessed plausible-looking details with confidence.',
        grounded:
          'Simulated Context-Grounded Reply:\n"I do not know from the provided context. My reference notes only list Day 2 API topics, not Batch 7 tuition pricing."'
      },
      policy: {
        q: 'What does our Node.js Playground /ask endpoint return?',
        ungrounded:
          'Simulated Ungrounded Reply:\n"It connects to MongoDB and returns { answer, modelVersion, cached: true }."  <-- INACCURATE GUESS!',
        grounded:
          'Simulated Context-Grounded Reply:\n"Based on the provided context, POST /ask calls client.responses.create with gpt-4.1-mini and returns { answer, usage }."'
      },
      latest: {
        q: 'Who won the tech conference keynote award yesterday?',
        ungrounded:
          'Simulated Ungrounded Reply:\n"The keynote award was won by Dr. Elena Vance for Autonomous Code Agents."  <-- HALLUCINATED PERSON & EVENT!',
        grounded:
          'Simulated Context-Grounded Reply:\n"I do not know from the provided context. The provided notes do not contain yesterday\'s event results."'
      }
    };

    function updateGuardDemo() {
      const key = questionEl.value;
      const useContext = toggleEl.checked;
      const data = scenarios[key] || scenarios.campus;

      if (useContext) {
        statusEl.className = 'status-pill status-pill-success';
        statusEl.textContent = 'Context Grounded (Lower Hallucination Risk)';
        outputEl.textContent = data.grounded + '\n\nNote: Grounding reduces hallucinations but cannot guarantee zero errors — always validate critical outputs.';
      } else {
        statusEl.className = 'status-pill status-pill-danger';
        statusEl.textContent = 'No Context Provided (High Hallucination Risk)';
        outputEl.textContent = data.ungrounded;
      }
    }

    btn.addEventListener('click', updateGuardDemo);
    toggleEl.addEventListener('change', updateGuardDemo);
    questionEl.addEventListener('change', updateGuardDemo);
    updateGuardDemo();
  }

  // -------------------------------------------------------
  // Interactive Sandbox 4: Final Playground POST /ask (Slide 20)
  // -------------------------------------------------------
  function setupPlaygroundSimulator() {
    const qInput = document.getElementById('pgQuestionInput');
    const tempInput = document.getElementById('pgTempInput');
    const maxInput = document.getElementById('pgMaxTokensInput');
    const ctxInput = document.getElementById('pgContextInput');
    const sendBtn = document.getElementById('pgSendBtn');
    const badgeEl = document.getElementById('pgStatusBadge');
    const outputEl = document.getElementById('pgOutputBox');

    if (!qInput || !tempInput || !maxInput || !ctxInput || !sendBtn || !badgeEl || !outputEl) return;

    function runPlaygroundRequest() {
      const question = qInput.value.trim();
      const temperature = parseFloat(tempInput.value) || 0.7;
      const maxTokens = Math.max(16, Math.min(2048, parseInt(maxInput.value, 10) || 150));
      const context = ctxInput.value.trim();

      if (!question) {
        badgeEl.className = 'status-pill status-pill-danger';
        badgeEl.textContent = '400 Bad Request';
        outputEl.textContent = JSON.stringify({ error: 'Question is required' }, null, 2);
        return;
      }

      const fullPrompt = context
        ? `Answer ONLY using this context. If the answer is not in the context, say "I do not know from the provided context."\n\nContext:\n${context}\n\nQuestion:\n${question}`
        : question;

      let answerText = '';
      if (context) {
        answerText = `From your context: ${context.split('.').slice(0, 2).join('.').trim()}.`;
      } else if (/token/i.test(question)) {
        answerText =
          'Tokens are small chunks of text (pieces of words, whole words, or spaces) that an LLM processes and bills on. Both input and output tokens share your context window budget.';
      } else if (/temperature/i.test(question)) {
        answerText =
          temperature <= 0.3
            ? 'Low temperature keeps token probabilities tight, producing consistent, focused responses.'
            : 'Higher temperature widens token sampling, producing more varied wording without making facts smarter.';
      } else {
        answerText =
          'Your Express backend validates input, builds the prompt, calls client.responses.create({ model: "gpt-4.1-mini", ... }), and returns answer + usage tokens.';
      }

      // Apply approximate max_output_tokens limit
      const words = answerText.split(/\s+/);
      const wordCap = Math.max(5, Math.floor(maxTokens / 1.35));
      if (words.length > wordCap) {
        answerText = words.slice(0, wordCap).join(' ') + ' ...[truncated by max_output_tokens]';
      }

      const estInput = Math.ceil(fullPrompt.length / 4);
      const estOutput = Math.ceil(answerText.length / 4);

      badgeEl.className = 'status-pill status-pill-success';
      badgeEl.textContent = '200 OK • gpt-4.1-mini';
      outputEl.textContent = JSON.stringify(
        {
          answer: answerText,
          usage: {
            input_tokens: estInput,
            output_tokens: estOutput,
            total_tokens: estInput + estOutput
          },
          request_config_used: {
            model: 'gpt-4.1-mini',
            temperature,
            max_output_tokens: maxTokens,
            grounded_with_context: Boolean(context)
          }
        },
        null,
        2
      );
    }

    sendBtn.addEventListener('click', runPlaygroundRequest);
    runPlaygroundRequest();
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

    // Keyboard shortcuts
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

    // Touch swipe navigation (skip horizontal code blocks)
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
    setupTokenSandbox();
    setupTemperatureSandbox();
    setupRagGuardSandbox();
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
