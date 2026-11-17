/**
 * Node.js GenAI – Day 6: LLM API Integration & Production Basics
 * Interactive Presentation Engine & Demonstration Sandboxes
 * Pure Vanilla JavaScript (Zero External Dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Slide Configuration ---
  const TOTAL_SLIDES = 20;
  let currentSlide = 1;

  // Slide Metadata for Table of Contents & Category Headings
  const SLIDE_DATA = [
    { num: 1, title: 'Title – LLM API Integration & Production Basics', section: 'Overview' },
    { num: 2, title: 'How Does an LLM API Integration Work?', section: 'Architecture' },
    { num: 3, title: 'What Is an SDK? Introduction to Groq SDK', section: 'SDK Basics' },
    { num: 4, title: 'API Keys and Environment Variables (.env)', section: 'Security & Config' },
    { num: 5, title: 'Practical – Make Your First Groq API Request', section: 'Hands-On' },
    { num: 6, title: 'Understanding Chat Completion Messages', section: 'Chat Structure' },
    { num: 7, title: 'Model Parameters – Introduction', section: 'Parameters' },
    { num: 8, title: 'Temperature – Control Response Randomness', section: 'Parameters' },
    { num: 9, title: 'Maximum Completion Tokens', section: 'Parameters' },
    { num: 10, title: 'Synchronous vs Asynchronous LLM Calls', section: 'Async I/O' },
    { num: 11, title: 'Promises and async/await with LLM APIs', section: 'Async I/O' },
    { num: 12, title: 'Error Handling in LLM API Integration', section: 'Production Basics' },
    { num: 13, title: 'Retries, Timeouts and Rate Limits', section: 'Production Basics' },
    { num: 14, title: 'What Is Streaming in LLM Applications?', section: 'Streaming' },
    { num: 15, title: 'Server-Sent Events (SSE)', section: 'Streaming' },
    { num: 16, title: 'Node.js Practical – Create a Streaming LLM API', section: 'Streaming' },
    { num: 17, title: 'Practical – Receive Streaming Data in Frontend', section: 'Streaming' },
    { num: 18, title: 'Token Usage – Monitor Your API Usage', section: 'Monitoring' },
    { num: 19, title: 'Cost Awareness – Control LLM Usage', section: 'Cost & Budget' },
    { num: 20, title: 'Final Practical Project – AI Chat API', section: 'Capstone Lab' },
  ];

  // DOM Elements
  const slides = document.querySelectorAll('.slide');
  const slideCounter = document.getElementById('slideCounter');
  const progressBar = document.getElementById('progressBar');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const tocBtn = document.getElementById('tocBtn');
  const helpBtn = document.getElementById('helpBtn');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const tocModal = document.getElementById('tocModal');
  const helpModal = document.getElementById('helpModal');
  const solutionModal = document.getElementById('solutionModal');
  const tocGrid = document.getElementById('tocGrid');
  const toast = document.getElementById('toast');

  // --- Slide Navigation Core ---
  function goToSlide(slideNum) {
    if (slideNum < 1 || slideNum > TOTAL_SLIDES) return;

    slides.forEach((slide) => {
      const idx = parseInt(slide.dataset.slide, 10);
      slide.classList.remove('active', 'prev');
      if (idx === slideNum) {
        slide.classList.add('active');
        slide.scrollTop = 0;
      } else if (idx < slideNum) {
        slide.classList.add('prev');
      }
    });

    currentSlide = slideNum;
    updateUI();
  }

  function nextSlide() {
    if (currentSlide < TOTAL_SLIDES) {
      goToSlide(currentSlide + 1);
    }
  }

  function prevSlide() {
    if (currentSlide > 1) {
      goToSlide(currentSlide - 1);
    }
  }

  function updateUI() {
    // Update Counter
    if (slideCounter) {
      slideCounter.textContent = `${currentSlide} / ${TOTAL_SLIDES}`;
    }

    // Update Progress Bar
    if (progressBar) {
      const pct = ((currentSlide - 1) / (TOTAL_SLIDES - 1)) * 100;
      progressBar.style.width = `${pct}%`;
    }

    // Update Button Disabled States
    if (prevBtn) prevBtn.disabled = currentSlide === 1;
    if (nextBtn) nextBtn.disabled = currentSlide === TOTAL_SLIDES;

    // Update Hash in URL
    history.replaceState(null, null, `#slide-${currentSlide}`);

    // Update TOC active state
    if (tocGrid) {
      const items = tocGrid.querySelectorAll('.toc-item');
      items.forEach((item, idx) => {
        if (idx + 1 === currentSlide) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  }

  // --- Toast Notification ---
  let toastTimer = null;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  }

  // --- Copy Code Snippets ---
  function setupCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const container = btn.closest('.code-container');
        if (!container) return;
        const codeBlock = container.querySelector('pre.code-block');
        if (!codeBlock) return;

        const textToCopy = codeBlock.innerText;
        try {
          await navigator.clipboard.writeText(textToCopy);
          const originalHTML = btn.innerHTML;
          btn.classList.add('copied');
          btn.innerHTML = '✓ Copied!';
          showToast('Code copied to clipboard!');
          setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = originalHTML;
          }, 2000);
        } catch (err) {
          // Fallback
          const textarea = document.createElement('textarea');
          textarea.value = textToCopy;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          showToast('Code copied to clipboard!');
        }
      });
    });
  }

  // --- Dynamic Table of Contents Generation ---
  function buildTOC() {
    if (!tocGrid) return;
    tocGrid.innerHTML = '';
    SLIDE_DATA.forEach((s) => {
      const item = document.createElement('div');
      item.className = `toc-item ${s.num === currentSlide ? 'active' : ''}`;
      item.innerHTML = `
        <div class="toc-item-num">${s.num}</div>
        <div>
          <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--primary-accent); font-weight: 700;">${s.section}</div>
          <div class="toc-item-title">${s.title}</div>
        </div>
      `;
      item.addEventListener('click', () => {
        goToSlide(s.num);
        closeModals();
      });
      tocGrid.appendChild(item);
    });
  }

  // --- Fullscreen Toggle ---
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {
        showToast('Fullscreen not permitted by browser');
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  // --- Modal Management ---
  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('open');
  }

  function closeModals() {
    [tocModal, helpModal, solutionModal].forEach((m) => {
      if (m) m.classList.remove('open');
    });
  }

  // ==========================================
  // INTERACTIVE SANDBOXES
  // ==========================================

  // --- Sandbox 1: Temperature Playground (Slide 8) ---
  function setupTemperatureSandbox() {
    const slider = document.getElementById('tempSlider');
    const valDisplay = document.getElementById('tempValDisplay');
    const runBtn = document.getElementById('runTempTestBtn');
    const outputBox = document.getElementById('tempOutputBox');

    if (!slider || !runBtn || !outputBox) return;

    slider.addEventListener('input', () => {
      if (valDisplay) valDisplay.textContent = slider.value;
    });

    const SAMPLES = {
      low: [
        "1. CodeSync Analytics: Real-time code quality and deployment monitoring platform.",
        "2. DevFlow Automations: CI/CD workflow optimization and pipeline management.",
        "3. NodeMetrics Hub: Application performance and server latency tracker."
      ],
      high: [
        "1. QuantumNebula Labs: Hyper-dimensional dream-weaving for distributed nodes.",
        "2. VelocityWhiz: Cybernetic synapse engine powering electric coffee makers.",
        "3. PixelPirate AI: Galactic bounty-hunting algorithms for lost semicolon bugs."
      ]
    };

    runBtn.addEventListener('click', () => {
      const temp = parseFloat(slider.value);
      outputBox.innerHTML = '';

      if (temp <= 0.4) {
        outputBox.innerHTML = `
          <div style="color: #60A5FA; font-weight: bold; margin-bottom: 4px;">Temperature = ${temp} (Focused & Deterministic)</div>
          <div style="color: #E2E8F0; font-size: 11.5px; line-height: 1.5;">${SAMPLES.low.join('<br>')}</div>
          <div style="color: #A7F3D0; font-size: 10.5px; margin-top: 6px;">Notice: Factual, professional, standard tech naming patterns.</div>
        `;
      } else if (temp >= 1.0) {
        outputBox.innerHTML = `
          <div style="color: #F472B6; font-weight: bold; margin-bottom: 4px;">Temperature = ${temp} (High Entropy & Creative)</div>
          <div style="color: #E2E8F0; font-size: 11.5px; line-height: 1.5;">${SAMPLES.high.join('<br>')}</div>
          <div style="color: #FDE68A; font-size: 10.5px; margin-top: 6px;">Notice: Wild, novel metaphors with unexpected word pairings!</div>
        `;
      } else {
        outputBox.innerHTML = `
          <div style="color: #FBBF24; font-weight: bold; margin-bottom: 4px;">Temperature = ${temp} (Balanced General Chat)</div>
          <div style="color: #E2E8F0; font-size: 11.5px; line-height: 1.5;">
            1. CloudPulse: Real-time cloud health monitor.<br>
            2. LogicStream: Workflow automation studio.<br>
            3. StackCraft: Developer toolkit for modern web teams.
          </div>
          <div style="color: #94A3B8; font-size: 10.5px; margin-top: 6px;">Good default for general-purpose assistants.</div>
        `;
      }
    });
  }

  // --- Sandbox 2: Maximum Completion Tokens Simulator (Slide 9) ---
  function setupMaxTokensSandbox() {
    const tokenInput = document.getElementById('maxTokensSelect');
    const runBtn = document.getElementById('runTokensTestBtn');
    const outputBox = document.getElementById('maxTokensOutput');

    if (!tokenInput || !runBtn || !outputBox) return;

    const TEXT_FULL = "Node.js is an open-source, cross-platform JavaScript runtime built on Chrome's V8 engine. It uses an event-driven, non-blocking I/O model that makes it lightweight and efficient for real-time web applications, REST APIs, and microservices.";

    runBtn.addEventListener('click', () => {
      const limit = parseInt(tokenInput.value, 10);
      outputBox.innerHTML = '';

      if (limit <= 15) {
        // Truncated severely
        outputBox.innerHTML = `
          <div style="color: #EF4444; font-weight: bold; margin-bottom: 4px;">⚠️ Truncated Mid-Sentence (max_completion_tokens: ${limit})</div>
          <div style="color: #E2E8F0; font-family: monospace; font-size: 11.5px;">"Node.js is an open-source, cross-platform JavaScript runtime built on Chrome's..."</div>
          <div style="color: #FECDD3; font-size: 10.5px; margin-top: 6px;">Finish reason: <code>length</code>. Generation was forcefully cut off before finishing thought!</div>
        `;
      } else if (limit <= 50) {
        outputBox.innerHTML = `
          <div style="color: #FBBF24; font-weight: bold; margin-bottom: 4px;">Moderate Length (max_completion_tokens: ${limit})</div>
          <div style="color: #E2E8F0; font-family: monospace; font-size: 11.5px;">"Node.js is an open-source JavaScript runtime built on Chrome's V8 engine. It uses non-blocking I/O for lightweight, efficient web APIs."</div>
          <div style="color: #94A3B8; font-size: 10.5px; margin-top: 6px;">Finish reason: <code>stop</code>. Completed concise summary.</div>
        `;
      } else {
        outputBox.innerHTML = `
          <div style="color: #4ADE80; font-weight: bold; margin-bottom: 4px;">✓ Full Length Output (max_completion_tokens: ${limit})</div>
          <div style="color: #E2E8F0; font-family: monospace; font-size: 11.5px;">"${TEXT_FULL}"</div>
          <div style="color: #10B981; font-size: 10.5px; margin-top: 6px;">Finish reason: <code>stop</code>. Consumed ~68 tokens without interruption.</div>
        `;
      }
    });
  }

  // --- Sandbox 3: Promise Lifecycle Simulator (Slide 11) ---
  function setupPromiseSandbox() {
    const triggerBtn = document.getElementById('runPromiseDemoBtn');
    const outputBox = document.getElementById('promiseDemoOutput');

    if (!triggerBtn || !outputBox) return;

    triggerBtn.addEventListener('click', () => {
      outputBox.innerHTML = `
        <div style="color: #FBBF24; font-weight: bold;">[State: PENDING ⏳]</div>
        <div style="color: #94A3B8; font-size: 11px;">groq.chat.completions.create() dispatched over HTTPS...</div>
      `;

      setTimeout(() => {
        outputBox.innerHTML += `
          <div style="color: #60A5FA; font-weight: bold; margin-top: 6px;">[Network: AWAITING RESOLUTION 🌐]</div>
          <div style="color: #CBD5E1; font-size: 11px;">Node.js continues serving other HTTP requests concurrently!</div>
        `;

        setTimeout(() => {
          outputBox.innerHTML += `
            <div style="color: #4ADE80; font-weight: bold; margin-top: 6px;">[State: FULFILLED (Resolved) ✓]</div>
            <div style="color: #E2E8F0; font-size: 11px;">Response choices unpacked: <code>response.choices[0].message.content</code></div>
          `;
          outputBox.scrollTop = outputBox.scrollHeight;
        }, 500);
      }, 500);
    });
  }

  // --- Sandbox 4: Exponential Backoff & Retry Simulator (Slide 13) ---
  function setupRetrySandbox() {
    const runBtn = document.getElementById('runRetryDemoBtn');
    const outputBox = document.getElementById('retryDemoOutput');

    if (!runBtn || !outputBox) return;

    runBtn.addEventListener('click', () => {
      outputBox.innerHTML = `<div style="color: #EF4444;">[Attempt 1] POST /chat/completions &rarr; HTTP 429 (Rate Limit Exceeded)</div>`;

      setTimeout(() => {
        outputBox.innerHTML += `
          <div style="color: #FBBF24; margin-top: 4px;">⏳ Groq SDK Exponential Backoff: Waiting 1000ms with jitter...</div>
        `;

        setTimeout(() => {
          outputBox.innerHTML += `<div style="color: #EF4444; margin-top: 4px;">[Attempt 2] POST /chat/completions &rarr; HTTP 503 (Temporary Provider Load)</div>`;

          setTimeout(() => {
            outputBox.innerHTML += `
              <div style="color: #FBBF24; margin-top: 4px;">⏳ Groq SDK Exponential Backoff: Waiting 2000ms with jitter...</div>
            `;

            setTimeout(() => {
              outputBox.innerHTML += `
                <div style="color: #4ADE80; font-weight: bold; margin-top: 6px;">[Attempt 3] POST /chat/completions &rarr; HTTP 200 OK! ✓</div>
                <div style="color: #A7F3D0; font-size: 10.5px;">Recovered automatically without crashing server or requiring manual code!</div>
              `;
              outputBox.scrollTop = outputBox.scrollHeight;
            }, 600);
          }, 400);
        }, 500);
      }, 400);
    });
  }

  // --- Sandbox 5: Real-Time SSE Streaming Reader Simulator (Slide 16 / 17) ---
  function setupStreamingSandbox() {
    const promptInput = document.getElementById('streamPromptInput');
    const streamBtn = document.getElementById('runStreamDemoBtn');
    const outputBox = document.getElementById('streamOutputBox');
    const statusPill = document.getElementById('streamStatusPill');

    if (!promptInput || !streamBtn || !outputBox) return;

    const STREAM_TOKENS = [
      "Node.js ", "is ", "an ", "asynchronous ", "event-driven ", "JavaScript ",
      "runtime ", "designed ", "to ", "build ", "scalable ", "network ", "applications.\n\n",
      "Because ", "I/O ", "is ", "non-blocking, ", "it ", "handles ", "thousands ",
      "of ", "concurrent ", "connections ", "efficiently!"
    ];

    let isStreaming = false;

    streamBtn.addEventListener('click', () => {
      if (isStreaming) return;
      isStreaming = true;
      outputBox.textContent = '';
      if (statusPill) {
        statusPill.textContent = 'Streaming SSE...';
        statusPill.style.color = '#38BDF8';
      }

      let i = 0;
      const interval = setInterval(() => {
        if (i < STREAM_TOKENS.length) {
          outputBox.textContent += STREAM_TOKENS[i];
          outputBox.scrollTop = outputBox.scrollHeight;
          i++;
        } else {
          clearInterval(interval);
          isStreaming = false;
          if (statusPill) {
            statusPill.textContent = 'Stream Completed [DONE]';
            statusPill.style.color = '#4ADE80';
          }
        }
      }, 80);
    });
  }

  // --- Sandbox 6: Token Usage & Cost Calculator (Slide 18 / 19) ---
  function setupCostCalculator() {
    const inputTokensEl = document.getElementById('calcInputTokens');
    const outputTokensEl = document.getElementById('calcOutputTokens');
    const calcBtn = document.getElementById('runCostCalcBtn');
    const outputBox = document.getElementById('costCalcOutput');

    if (!inputTokensEl || !outputTokensEl || !calcBtn || !outputBox) return;

    calcBtn.addEventListener('click', () => {
      const inTok = parseInt(inputTokensEl.value, 10) || 100000;
      const outTok = parseInt(outputTokensEl.value, 10) || 50000;

      // Illustrative pricing model ($0.10 / 1M in, $0.20 / 1M out)
      const inPricePerM = 0.10;
      const outPricePerM = 0.20;

      const inCost = (inTok / 1000000) * inPricePerM;
      const outCost = (outTok / 1000000) * outPricePerM;
      const totalCost = inCost + outCost;

      outputBox.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px;">
          <div>Input Tokens: <strong style="color: #60A5FA;">${inTok.toLocaleString()}</strong></div>
          <div>Input Cost (@$0.10/M): <strong style="color: #E2E8F0;">$${inCost.toFixed(4)}</strong></div>
          <div>Output Tokens: <strong style="color: #FBBF24;">${outTok.toLocaleString()}</strong></div>
          <div>Output Cost (@$0.20/M): <strong style="color: #E2E8F0;">$${outCost.toFixed(4)}</strong></div>
        </div>
        <div style="border-top: 1px solid #1E293B; padding-top: 6px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: bold; color: #FFFFFF;">Total Estimated Cost:</span>
          <span style="font-size: 15px; font-weight: 800; color: #4ADE80;">$${totalCost.toFixed(4)}</span>
        </div>
        <div style="color: #94A3B8; font-size: 10px; margin-top: 4px;">*Prices are illustrative for mathematical calculation purposes.</div>
      `;
    });
  }

  // --- Keyboard & Event Listeners ---
  function setupEventListeners() {
    document.addEventListener('keydown', (e) => {
      // Don't intercept if typing in form elements
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        if (e.key === 'Escape') document.activeElement.blur();
        return;
      }

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
          goToSlide(1);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(TOTAL_SLIDES);
          break;
        case 't':
        case 'T':
          e.preventDefault();
          if (tocModal) {
            tocModal.classList.contains('open') ? closeModals() : openModal(tocModal);
          }
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case '?':
          e.preventDefault();
          if (helpModal) {
            helpModal.classList.contains('open') ? closeModals() : openModal(helpModal);
          }
          break;
        case 'Escape':
          closeModals();
          break;
      }
    });

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    if (tocBtn && tocModal) {
      tocBtn.addEventListener('click', () => openModal(tocModal));
    }
    if (helpBtn && helpModal) {
      helpBtn.addEventListener('click', () => openModal(helpModal));
    }
    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', toggleFullscreen);
    }

    document.querySelectorAll('.modal-close-btn').forEach((btn) => {
      btn.addEventListener('click', closeModals);
    });

    [tocModal, helpModal, solutionModal].forEach((modal) => {
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) closeModals();
        });
      }
    });

    const openSolutionBtn = document.getElementById('openSolutionBtn');
    if (openSolutionBtn && solutionModal) {
      openSolutionBtn.addEventListener('click', () => openModal(solutionModal));
    }

    // Touch Swipe
    let touchStartX = 0;
    let touchEndX = 0;
    const viewport = document.querySelector('.slide-viewport');

    if (viewport) {
      viewport.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      viewport.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });
    }

    function handleSwipe() {
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 50) {
        if (diff < 0) nextSlide();
        else prevSlide();
      }
    }

    window.addEventListener('hashchange', () => {
      const match = window.location.hash.match(/slide-(\d+)/);
      if (match) {
        const target = parseInt(match[1], 10);
        if (target >= 1 && target <= TOTAL_SLIDES && target !== currentSlide) {
          goToSlide(target);
        }
      }
    });
  }

  // --- Initializer ---
  function init() {
    buildTOC();
    setupCopyButtons();
    setupTemperatureSandbox();
    setupMaxTokensSandbox();
    setupPromiseSandbox();
    setupRetrySandbox();
    setupStreamingSandbox();
    setupCostCalculator();
    setupEventListeners();

    const match = window.location.hash.match(/slide-(\d+)/);
    if (match) {
      const target = parseInt(match[1], 10);
      if (target >= 1 && target <= TOTAL_SLIDES) {
        goToSlide(target);
        return;
      }
    }
    goToSlide(1);
  }

  init();
});
