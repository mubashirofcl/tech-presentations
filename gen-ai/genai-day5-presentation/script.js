/**
 * Node.js GenAI – Day 5: Prompt Engineering & Prompt Security
 * Interactive Presentation Engine & Demonstration Sandboxes
 * Pure Vanilla JavaScript (Zero External Dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Slide Configuration ---
  const TOTAL_SLIDES = 20;
  let currentSlide = 1;

  // Slide Metadata for Table of Contents & Category Headings
  const SLIDE_DATA = [
    { num: 1, title: 'Title – Prompt Engineering & Prompt Security', section: 'Overview' },
    { num: 2, title: 'What Is Prompt Engineering?', section: 'Foundations' },
    { num: 3, title: 'Prompt Templates – JS Template Literals', section: 'Templates' },
    { num: 4, title: 'LangChain.js PromptTemplate', section: 'Templates' },
    { num: 5, title: 'Few-Shot Prompting', section: 'Few-Shot' },
    { num: 6, title: 'Node.js Practical – Build a Few-Shot Prompt', section: 'Few-Shot' },
    { num: 7, title: 'Output Formatting – Control AI Responses', section: 'Formatting' },
    { num: 8, title: 'Node.js Practical – Generate and Validate JSON', section: 'Formatting' },
    { num: 9, title: 'Delimiters – Separate Prompt Sections', section: 'Structure' },
    { num: 10, title: 'Node.js Practical – Build a Delimited Prompt', section: 'Structure' },
    { num: 11, title: 'Context Injection – Provide Relevant Info', section: 'Context' },
    { num: 12, title: 'Node.js Practical – Inject Dynamic Context', section: 'Context' },
    { num: 13, title: 'Task Decomposition – Break Down Tasks', section: 'Workflows' },
    { num: 14, title: 'Node.js Practical – Task Decomposition', section: 'Workflows' },
    { num: 15, title: 'Prompt Chaining – Connect Multiple Prompts', section: 'Workflows' },
    { num: 16, title: 'Node.js Practical – Implement Prompt Chaining', section: 'Workflows' },
    { num: 17, title: 'Reasoning-Oriented Prompting', section: 'Advanced' },
    { num: 18, title: 'RAG and Agent Prompt Design', section: 'Advanced' },
    { num: 19, title: 'Prompt Injection Awareness & Security', section: 'Security' },
    { num: 20, title: 'Security Demonstration & Day 5 Challenge', section: 'Security & Lab' },
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

  // --- Sandbox 1: Template Literals (Slide 3) ---
  function setupTemplateSandbox() {
    const topicInput = document.getElementById('tplTopicInput');
    const levelSelect = document.getElementById('tplLevelSelect');
    const langInput = document.getElementById('tplLangInput');
    const buildBtn = document.getElementById('runTplBuildBtn');
    const outputBox = document.getElementById('tplOutputBox');

    if (!topicInput || !buildBtn || !outputBox) return;

    function buildTemplate() {
      const topic = topicInput.value.trim() || 'Node.js';
      const level = levelSelect.value || 'beginner';
      const lang = langInput.value.trim() || 'simple English';

      const compiled = `You are a programming teacher. Explain ${topic} to a ${level} student. Use ${lang} and provide one practical example.`;
      outputBox.textContent = compiled;
    }

    buildBtn.addEventListener('click', buildTemplate);
    [topicInput, levelSelect, langInput].forEach(el => {
      if (el) el.addEventListener('input', buildTemplate);
    });
    buildTemplate();
  }

  // --- Sandbox 2: Few-Shot Sentiment Prompt Builder (Slide 6) ---
  function setupFewShotSandbox() {
    const reviewInput = document.getElementById('fewShotMsgInput');
    const generateBtn = document.getElementById('generateFewShotBtn');
    const outputBox = document.getElementById('fewShotOutputBox');

    if (!reviewInput || !generateBtn || !outputBox) return;

    const examples = [
      { message: "I love this course.", result: "Positive" },
      { message: "The class was confusing.", result: "Negative" },
      { message: "The mentor explains very well.", result: "Positive" }
    ];

    generateBtn.addEventListener('click', () => {
      const msg = reviewInput.value.trim() || "The class is very interesting.";
      const exampleText = examples.map((item, index) => {
        return `Example ${index + 1}:\nMessage: ${item.message}\nOutput: ${item.result}`;
      }).join("\n\n");

      const finalPrompt = `Classify the message as Positive or Negative.\n\n${exampleText}\n\nNew Message: ${msg}\nOutput:`;
      outputBox.textContent = finalPrompt;
    });
  }

  // --- Sandbox 3: JSON Validator Simulator (Slide 8) ---
  function setupJsonValidatorSandbox() {
    const presetSelect = document.getElementById('jsonPresetSelect');
    const jsonInput = document.getElementById('jsonTestInput');
    const testBtn = document.getElementById('runJsonTestBtn');
    const outputBox = document.getElementById('jsonValidationOutput');

    if (!jsonInput || !testBtn || !outputBox) return;

    const PRESETS = {
      valid: JSON.stringify({
        name: "Rahul",
        course: "MERN",
        email: "rahul@gmail.com"
      }, null, 2),
      syntax_err: '{\n  "name": "Rahul",\n  "course": "MERN",\n  "email": rahul@gmail.com\n}',
      missing_field: JSON.stringify({
        name: "Rahul",
        course: "MERN"
      }, null, 2),
      wrong_type: JSON.stringify({
        name: "Rahul",
        course: 101,
        email: "rahul@gmail.com"
      }, null, 2)
    };

    if (presetSelect) {
      presetSelect.addEventListener('change', () => {
        const val = presetSelect.value;
        if (PRESETS[val]) {
          jsonInput.value = PRESETS[val];
        }
      });
    }

    testBtn.addEventListener('click', () => {
      outputBox.innerHTML = '';
      const raw = jsonInput.value.trim();

      // 1. JSON.parse test
      let parsed;
      try {
        parsed = JSON.parse(raw);
      } catch (err) {
        outputBox.innerHTML = `
          <div style="color: #EF4444; font-weight: bold; margin-bottom: 4px;">❌ Syntax Error (JSON.parse failed):</div>
          <div style="color: #E2E8F0;">${err.message}</div>
          <div style="color: #94A3B8; font-size: 11px; margin-top: 6px;">The model returned unquoted strings or truncated JSON syntax.</div>
        `;
        return;
      }

      // 2. Field Type Validation
      if (
        typeof parsed.name !== "string" ||
        typeof parsed.course !== "string" ||
        typeof parsed.email !== "string"
      ) {
        outputBox.innerHTML = `
          <div style="color: #F87171; font-weight: bold; margin-bottom: 4px;">⚠️ Field Validation Error:</div>
          <div style="color: #E2E8F0;">Required fields [name, course, email] must all be valid strings.</div>
          <div style="color: #FBBF24; font-size: 11px; margin-top: 6px;">Received: ${JSON.stringify(parsed)}</div>
        `;
        return;
      }

      // Passed
      outputBox.innerHTML = `
        <div style="color: #4ADE80; font-weight: bold; margin-bottom: 4px;">✓ Validated Student Object:</div>
        <div style="color: #60A5FA;">${JSON.stringify(parsed, null, 2)}</div>
        <div style="color: #10B981; font-size: 11px; margin-top: 6px;">Safe to persist to database or send to client!</div>
      `;
    });
  }

  // --- Sandbox 4: Delimited Document Summarizer (Slide 10) ---
  function setupDelimitedSandbox() {
    const docInput = document.getElementById('delimitedDocInput');
    const buildBtn = document.getElementById('runDelimitedBuildBtn');
    const outputBox = document.getElementById('delimitedOutputBox');

    if (!docInput || !buildBtn || !outputBox) return;

    buildBtn.addEventListener('click', () => {
      const doc = docInput.value.trim() || "Node.js is a JavaScript runtime. It is commonly used to build backend applications.";
      const prompt = `You are a document summarization assistant.

TASK: Summarize the provided document.

DOCUMENT:
<document>
${doc}
</document>

RULES:
- Use simple English.
- Return exactly 3 bullet points.
- Do not invent information.`;

      outputBox.textContent = prompt;
    });
  }

  // --- Sandbox 5: Context Injection Simulator (Slide 12) ---
  function setupContextSandbox() {
    const qInput = document.getElementById('ctxQuestionInput');
    const ctxInput = document.getElementById('ctxDataInput');
    const buildBtn = document.getElementById('runCtxBuildBtn');
    const outputBox = document.getElementById('ctxOutputBox');

    if (!qInput || !ctxInput || !buildBtn || !outputBox) return;

    buildBtn.addEventListener('click', () => {
      const question = qInput.value.trim() || "What is the course duration?";
      const context = ctxInput.value.trim() || "Course: MERN Stack\nDuration: 6 months\nMode: Hybrid";

      const prompt = `You are a course information assistant.
Answer the question using the provided context.

<context>
${context}
</context>

Question: ${question}

If the answer is not available in the context, say "I don't have that information."`;

      outputBox.textContent = prompt;
    });
  }

  // --- Sandbox 6: Task Decomposition Calculator (Slide 14) ---
  function setupDecompSandbox() {
    const jsInput = document.getElementById('marksJs');
    const reactInput = document.getElementById('marksReact');
    const nodeInput = document.getElementById('marksNode');
    const calcBtn = document.getElementById('runDecompCalcBtn');
    const outputBox = document.getElementById('decompOutputBox');

    if (!jsInput || !calcBtn || !outputBox) return;

    calcBtn.addEventListener('click', () => {
      const marks = {
        JavaScript: parseFloat(jsInput.value) || 80,
        React: parseFloat(reactInput.value) || 65,
        Node: parseFloat(nodeInput.value) || 90
      };

      const values = Object.values(marks);
      const total = values.reduce((sum, m) => sum + m, 0);
      const avg = Number((total / values.length).toFixed(2));
      const sorted = Object.entries(marks).sort((a, b) => a[1] - b[1]);
      const weak = sorted[0];

      const report = {
        name: "Rahul",
        average: avg,
        weakSubject: weak[0],
        lowestScore: weak[1]
      };

      outputBox.textContent = JSON.stringify(report, null, 2);
    });
  }

  // --- Sandbox 7: Prompt Chaining Workflow (Slide 16) ---
  function setupChainingSandbox() {
    const resumeInput = document.getElementById('chainResumeInput');
    const runBtn = document.getElementById('runChainWorkflowBtn');
    const outputBox = document.getElementById('chainOutputBox');

    if (!resumeInput || !runBtn || !outputBox) return;

    runBtn.addEventListener('click', () => {
      const resume = resumeInput.value.trim() || "I know JavaScript, React, Node.js and MongoDB.";
      outputBox.innerHTML = '';

      outputBox.innerHTML += `<div style="color: #60A5FA;">[Step 1: Extract Skills Prompt]</div>`;
      const step1 = `Extract technical skills from: ${resume}`;
      outputBox.innerHTML += `<div style="color: #E2E8F0; margin-bottom: 8px;">-> "${step1}"</div>`;

      setTimeout(() => {
        outputBox.innerHTML += `<div style="color: #FBBF24;">[Step 2: Analyze Skills Prompt]</div>`;
        const step2 = `Analyze these skills: ${step1}`;
        outputBox.innerHTML += `<div style="color: #E2E8F0; margin-bottom: 8px;">-> "${step2}"</div>`;

        setTimeout(() => {
          outputBox.innerHTML += `<div style="color: #4ADE80;">[Step 3: Generate Feedback Prompt]</div>`;
          const step3 = `Generate improvement feedback: ${step2}`;
          outputBox.innerHTML += `<div style="color: #E2E8F0;">-> "${step3}"</div>`;
          outputBox.scrollTop = outputBox.scrollHeight;
        }, 300);
      }, 300);
    });
  }

  // --- Sandbox 8: Tool Allowlist & Security Simulator (Slide 20) ---
  function setupSecuritySandbox() {
    const toolSelect = document.getElementById('secToolSelect');
    const userInput = document.getElementById('secUserInput');
    const testBtn = document.getElementById('runSecTestBtn');
    const outputBox = document.getElementById('secOutputBox');

    if (!toolSelect || !testBtn || !outputBox) return;

    const allowedTools = ["getStudentDetails", "getCourseDetails"];

    testBtn.addEventListener('click', () => {
      const selectedTool = toolSelect.value;

      outputBox.innerHTML = '';

      // 1. Delimited Prompt Demonstration
      outputBox.innerHTML += `
        <div style="color: #60A5FA; font-weight: bold;">[1] Structured Prompt Construction:</div>
        <div style="color: #94A3B8; font-size: 11px; margin-bottom: 8px;">
          Instructions kept separate from &lt;user_message&gt; to reduce injection risk.
        </div>
      `;

      // 2. Application-Level Tool Permission Enforcement
      outputBox.innerHTML += `<div style="color: #FBBF24; font-weight: bold; margin-top: 6px;">[2] Application Tool Permission Check:</div>`;
      if (!allowedTools.includes(selectedTool)) {
        outputBox.innerHTML += `
          <div style="color: #EF4444; font-weight: bold; margin-top: 4px;">❌ ACCESS DENIED: Tool "${selectedTool}" is NOT in the allowed list!</div>
          <div style="color: #E2E8F0; font-size: 11px; margin-top: 4px;">
            The application rejected the operation safely. Model cannot grant itself unauthorized capabilities.
          </div>
        `;
      } else {
        outputBox.innerHTML += `
          <div style="color: #4ADE80; font-weight: bold; margin-top: 4px;">✓ Tool Allowed: "${selectedTool}"</div>
          <div style="color: #E2E8F0; font-size: 11px; margin-top: 4px;">
            Executing authorized tool with validated parameters.
          </div>
        `;
      }
    });
  }

  // --- Keyboard & Event Listeners ---
  function setupEventListeners() {
    document.addEventListener('keydown', (e) => {
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
    setupTemplateSandbox();
    setupFewShotSandbox();
    setupJsonValidatorSandbox();
    setupDelimitedSandbox();
    setupContextSandbox();
    setupDecompSandbox();
    setupChainingSandbox();
    setupSecuritySandbox();
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
