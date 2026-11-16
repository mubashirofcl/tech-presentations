/**
 * Node.js – Gen-AI Day 3 Presentation Engine
 * Interactive 20-slide deck + 4 multi-provider playground sandboxes
 */
(() => {
  'use strict';

  const TOTAL_SLIDES = 20;

  const slideCategories = {
    1: 'Section 1 • Introduction',
    2: 'Section 1 • Model Licensing',
    3: 'Section 2 • Local vs Cloud',
    4: 'Section 2 • Ollama Runtime',
    5: 'Section 2 • Practical: Ollama',
    6: 'Section 2 • Llama Model Family',
    7: 'Section 3 • Selection Triangle',
    8: 'Section 3 • Model Sizing',
    9: 'Section 3 • General vs Specialized',
    10: 'Section 3 • Multimodal Models',
    11: 'Section 4 • Cloud Providers',
    12: 'Section 4 • OpenAI & Gemini',
    13: 'Section 4 • Claude & Groq',
    14: 'Section 4 • OpenAI-Compatible APIs',
    15: 'Section 5 • Practical: Project Setup',
    16: 'Section 5 • Practical: Common Service',
    17: 'Section 5 • Practical: Gemini & Ollama',
    18: 'Section 5 • Practical: Express API',
    19: 'Section 6 • Decision Matrix',
    20: 'Section 6 • Recap & Challenge'
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
      sectionIndicator.textContent = slideCategories[currentSlide] || 'Gen-AI Day 3';
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
  // Interactive Sandbox 1: Local Ollama vs Cloud Simulator (Slide 5)
  // -------------------------------------------------------
  function setupOllamaCloudSandbox() {
    const offlineCheck = document.getElementById('simOfflineCheck');
    const providerSelect = document.getElementById('simProviderSelect');
    const runBtn = document.getElementById('simRunBtn');
    const badgeEl = document.getElementById('simStatusBadge');
    const outputEl = document.getElementById('simOutputBox');

    if (!offlineCheck || !providerSelect || !runBtn || !badgeEl || !outputEl) return;

    function runSimulation() {
      const isOffline = offlineCheck.checked;
      const provider = providerSelect.value;

      if (isOffline) {
        if (provider === 'ollama') {
          badgeEl.className = 'status-pill status-pill-success';
          badgeEl.textContent = '200 OK • Localhost Offline Success';
          outputEl.textContent = JSON.stringify(
            {
              success: true,
              mode: 'LOCAL (Ollama daemon on http://localhost:11434)',
              model: 'llama3.2:latest',
              internetRequired: false,
              cloudApiCost: '$0.00',
              dataPrivacy: '100% on your local machine',
              answer: 'Node.js is an open-source JavaScript runtime environment that lets developers run JavaScript on the server outside a browser.'
            },
            null,
            2
          );
        } else {
          badgeEl.className = 'status-pill status-pill-danger';
          badgeEl.textContent = 'NETWORK_ERROR (ENOTFOUND)';
          outputEl.textContent = JSON.stringify(
            {
              success: false,
              error: 'FetchError: request to https://api.' + provider + '.com failed',
              reason: 'Internet is disconnected! Cloud LLMs require active internet connectivity.',
              tip: 'Use Ollama when offline or air-gapped operations are required.'
            },
            null,
            2
          );
        }
      } else {
        badgeEl.className = 'status-pill status-pill-info';
        badgeEl.textContent = '200 OK • Connected';
        outputEl.textContent = JSON.stringify(
          {
            success: true,
            provider: provider.toUpperCase(),
            endpoint: provider === 'ollama' ? 'http://localhost:11434/api/chat' : 'https://api.' + provider + '.com/v1',
            latencyMs: provider === 'groq' ? 140 : provider === 'ollama' ? 320 : 680,
            answer: 'Node.js enables backend event-driven asynchronous programming with non-blocking I/O.'
          },
          null,
          2
        );
      }
    }

    runBtn.addEventListener('click', runSimulation);
    offlineCheck.addEventListener('change', runSimulation);
    providerSelect.addEventListener('change', runSimulation);
    runSimulation();
  }

  // -------------------------------------------------------
  // Interactive Sandbox 2: Quality vs Latency vs Cost Matrix (Slide 7)
  // -------------------------------------------------------
  function setupSelectionMatrixSandbox() {
    const qualSel = document.getElementById('selPriorityQuality');
    const latSel = document.getElementById('selPriorityLatency');
    const costSel = document.getElementById('selPriorityCost');
    const btnRec = document.getElementById('btnRecommendModel');
    const recBadge = document.getElementById('recModelBadge');
    const recDetails = document.getElementById('recDetailsBox');

    if (!qualSel || !latSel || !costSel || !btnRec || !recBadge || !recDetails) return;

    function evaluateRecommendation() {
      const qual = qualSel.value; // 'high', 'medium', 'any'
      const lat = latSel.value;   // 'fastest', 'standard'
      const cost = costSel.value; // 'free', 'budget', 'premium'

      let recommended = {
        name: 'Groq (Llama 3.3 70B)',
        badge: 'Extreme Latency & Great Quality',
        provider: 'groq',
        rationale: 'Groq LPUs deliver hundreds of tokens per second for open-weight models at minimal cost.'
      };

      if (cost === 'free') {
        recommended = {
          name: 'Ollama (Llama 3.2 3B)',
          badge: '100% Free & Local Privacy',
          provider: 'ollama',
          rationale: 'Runs locally on your computer with zero per-token cloud costs and complete data privacy.'
        };
      } else if (qual === 'high' && cost === 'premium') {
        recommended = {
          name: 'Anthropic Claude 3.5 Sonnet / OpenAI GPT-4o',
          badge: 'Maximum Reasoning & Coding Capability',
          provider: 'claude',
          rationale: 'Industry-leading benchmark scores on complex multi-step reasoning, architecture planning, and debugging.'
        };
      } else if (lat === 'fastest') {
        recommended = {
          name: 'Groq (Llama 3.1 8B or 70B)',
          badge: 'Sub-300ms Real-time Voice/Chat',
          provider: 'groq',
          rationale: 'Hardware-accelerated LPUs produce near-instantaneous time-to-first-token.'
        };
      } else if (cost === 'budget') {
        recommended = {
          name: 'Google Gemini 2.5 Flash / OpenAI GPT-4.1-mini',
          badge: 'Best Balanced Cost & Performance',
          provider: 'gemini',
          rationale: 'Extremely cost-effective ($0.10/1M tokens) with large context windows and fast inference.'
        };
      }

      recBadge.textContent = recommended.name;
      recDetails.textContent =
        `Recommended Provider: ${recommended.name}\n` +
        `Category: ${recommended.badge}\n` +
        `--------------------------------------------------\n` +
        `Why this fits your trade-offs:\n${recommended.rationale}\n\n` +
        `Lesson Takeaway: No single model wins every scenario. Real Node.js architectures dynamically route prompts to the model that best satisfies the quality-latency-cost equation!`;
    }

    btnRec.addEventListener('click', evaluateRecommendation);
    qualSel.addEventListener('change', evaluateRecommendation);
    latSel.addEventListener('change', evaluateRecommendation);
    costSel.addEventListener('change', evaluateRecommendation);
    evaluateRecommendation();
  }

  // -------------------------------------------------------
  // Interactive Sandbox 3: OpenAI-Compatible Adapter (Slide 14)
  // -------------------------------------------------------
  function setupCompatibleSandbox() {
    const urlSel = document.getElementById('compatBaseUrlSelect');
    const promptInput = document.getElementById('compatInputPrompt');
    const runBtn = document.getElementById('compatRunBtn');
    const statusBadge = document.getElementById('compatStatusBadge');
    const snippetEl = document.getElementById('compatCodeSnippet');
    const outputEl = document.getElementById('compatOutputBox');

    if (!urlSel || !promptInput || !runBtn || !statusBadge || !snippetEl || !outputEl) return;

    const providerConfigs = {
      groq: {
        baseURL: 'https://api.groq.com/openai/v1',
        model: 'llama-3.3-70b-versatile',
        apiKey: 'process.env.GROQ_API_KEY',
        name: 'Groq Cloud'
      },
      ollama: {
        baseURL: 'http://localhost:11434/v1',
        model: 'llama3.2',
        apiKey: '"ollama" (dummy local key)',
        name: 'Local Ollama'
      },
      together: {
        baseURL: 'https://api.together.xyz/v1',
        model: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
        apiKey: 'process.env.TOGETHER_API_KEY',
        name: 'Together AI'
      },
      deepseek: {
        baseURL: 'https://api.deepseek.com/v1',
        model: 'deepseek-chat',
        apiKey: 'process.env.DEEPSEEK_API_KEY',
        name: 'DeepSeek'
      }
    };

    function runCompatibleDemo() {
      const key = urlSel.value;
      const cfg = providerConfigs[key] || providerConfigs.groq;
      const prompt = promptInput.value.trim() || 'Explain Node.js event loop';

      snippetEl.textContent =
`// Reusing the standard "openai" npm SDK with custom baseURL:
const OpenAI = require("openai");

const client = new OpenAI({
  baseURL: "${cfg.baseURL}",
  apiKey: ${cfg.apiKey}
});

const response = await client.chat.completions.create({
  model: "${cfg.model}",
  messages: [{ role: "user", content: "${prompt}" }]
});`;

      statusBadge.textContent = `Connected to ${cfg.name}`;
      outputEl.textContent = JSON.stringify(
        {
          sdkUsed: 'openai (npm)',
          routedToBaseURL: cfg.baseURL,
          selectedModel: cfg.model,
          simulatedResponse: {
            id: 'chatcmpl-' + Math.random().toString(36).substring(2, 9),
            object: 'chat.completion',
            choices: [
              {
                message: {
                  role: 'assistant',
                  content: `Response from ${cfg.name} (${cfg.model}): ${prompt} is processed through non-blocking asynchronous event queues.`
                }
              }
            ]
          }
        },
        null,
        2
      );
    }

    runBtn.addEventListener('click', runCompatibleDemo);
    urlSel.addEventListener('change', runCompatibleDemo);
    runCompatibleDemo();
  }

  // -------------------------------------------------------
  // Interactive Sandbox 4: Multi-Provider Playground POST /ask/:provider (Slide 18 & 20)
  // -------------------------------------------------------
  function setupPlaygroundSimulator() {
    const provSel = document.getElementById('pgProviderSelect');
    const qInput = document.getElementById('pgQuestionInput');
    const sendBtn = document.getElementById('pgSendBtn');
    const badgeEl = document.getElementById('pgStatusBadge');
    const outputEl = document.getElementById('pgOutputBox');

    if (!provSel || !qInput || !sendBtn || !badgeEl || !outputEl) return;

    const providerResponses = {
      openai: {
        model: 'gpt-4.1-mini',
        extractPattern: 'response.output_text',
        latency: 480,
        reply: 'OpenAI (via client.responses.create): Node.js uses an event-driven non-blocking I/O model powered by Chrome\'s V8 engine.'
      },
      gemini: {
        model: 'gemini-2.5-flash',
        extractPattern: 'response.output_text (via dynamic import)',
        latency: 390,
        reply: 'Gemini (via GoogleGenAI client.interactions.create): The Node.js event loop coordinates incoming async operations without spawning a thread per request.'
      },
      claude: {
        model: 'claude-3-5-sonnet-latest',
        extractPattern: 'response.content.filter(t => t.type === "text").map(t => t.text).join("\\n")',
        latency: 610,
        reply: 'Claude (via Anthropic client.messages.create): In Node.js, asynchronous operations are dispatched to the libuv thread pool, keeping the main JavaScript thread responsive.'
      },
      groq: {
        model: 'llama-3.3-70b-versatile',
        extractPattern: 'response.choices[0].message.content',
        latency: 145,
        reply: 'Groq (via groq-sdk client.chat.completions.create): Blazing fast inference! The Node.js event loop handles callbacks via microtask and macrotask queues.'
      },
      ollama: {
        model: 'llama3.2',
        extractPattern: 'response.message.content (via dynamic import)',
        latency: 310,
        reply: 'Ollama (via local ollama.chat on localhost:11434): Generated 100% locally with zero cloud API keys and no internet connection required!'
      }
    };

    function runPlaygroundCall() {
      const provider = provSel.value;
      const question = qInput.value.trim();

      if (!question) {
        badgeEl.className = 'status-pill status-pill-danger';
        badgeEl.textContent = '400 Bad Request';
        outputEl.textContent = JSON.stringify(
          {
            success: false,
            message: 'Question is required'
          },
          null,
          2
        );
        return;
      }

      if (provider === 'unknown') {
        badgeEl.className = 'status-pill status-pill-danger';
        badgeEl.textContent = '400 Unsupported Provider';
        outputEl.textContent = JSON.stringify(
          {
            success: false,
            message: 'Unsupported provider: unknown. Supported: openai, gemini, claude, groq, ollama'
          },
          null,
          2
        );
        return;
      }

      const info = providerResponses[provider] || providerResponses.openai;

      badgeEl.className = 'status-pill status-pill-success';
      badgeEl.textContent = `200 OK • POST /ask/${provider}`;
      outputEl.textContent = JSON.stringify(
        {
          success: true,
          provider: provider,
          model: info.model,
          latencyMs: info.latency,
          sdkAdapter: info.extractPattern,
          answer: info.reply
        },
        null,
        2
      );
    }

    sendBtn.addEventListener('click', runPlaygroundCall);
    provSel.addEventListener('change', runPlaygroundCall);
    runPlaygroundCall();
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
    setupOllamaCloudSandbox();
    setupSelectionMatrixSandbox();
    setupCompatibleSandbox();
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
