/**
 * Node.js – Gen-AI Day 1: Introduction to Generative AI & AI Application Architectures
 * Interactive Slide Presentation Controller & Interactive Lab Sandboxes
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // SLIDE CONTROLLER & STATE
  // =========================================================================
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  let currentSlide = 1;

  // DOM Elements
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const slideCounter = document.getElementById('slideCounter');
  const progressFill = document.getElementById('progressFill');
  const sectionIndicator = document.getElementById('sectionIndicator');
  const tocBtn = document.getElementById('tocBtn');
  const tocOverlay = document.getElementById('tocOverlay');
  const tocClose = document.getElementById('tocClose');
  const tocList = document.getElementById('tocList');
  const helpBtn = document.getElementById('helpBtn');
  const helpModal = document.getElementById('helpModal');
  const helpClose = document.getElementById('helpClose');
  const fullscreenBtn = document.getElementById('fullscreenBtn');

  // Slide categories map for the top bar indicator
  const slideCategories = {
    1: 'Welcome & Overview',
    2: 'What Is Artificial Intelligence?',
    3: 'What Is Generative AI?',
    4: 'AI vs ML vs DL vs GenAI',
    5: 'Traditional AI vs GenAI',
    6: 'Types of Generative AI',
    7: 'Real-World Applications',
    8: 'What Is an LLM?',
    9: 'Connect Node.js with an LLM',
    10: 'Send a Prompt to an LLM',
    11: 'What Is Prompt Engineering?',
    12: 'LLM-Based Applications',
    13: 'Build a Basic GenAI API',
    14: 'What Is RAG?',
    15: 'Simple RAG Concept in Node.js',
    16: 'What Is an AI Agent?',
    17: 'Understanding Tool Calling',
    18: 'LLM vs RAG vs Agent',
    19: 'What Is Multimodal AI?',
    20: 'Recap & Practical Challenge'
  };

  /**
   * Initialize Presentation
   */
  function initPresentation() {
    buildToc();
    handleHashNavigation();
    updateUI();
  }

  /**
   * Navigate to a specific slide index (1-based)
   */
  function goToSlide(slideNum) {
    if (slideNum < 1 || slideNum > totalSlides) return;

    // Remove active state from current slide
    const currentElem = document.querySelector(`.slide[data-slide="${currentSlide}"]`);
    if (currentElem) {
      currentElem.classList.remove('active');
    }

    currentSlide = slideNum;

    // Activate new slide
    const newElem = document.querySelector(`.slide[data-slide="${currentSlide}"]`);
    if (newElem) {
      newElem.classList.add('active');
      newElem.scrollTop = 0;
    }

    // Update URL Hash without reload
    window.location.hash = `#slide-${currentSlide}`;

    updateUI();
  }

  function nextSlide() {
    if (currentSlide < totalSlides) {
      goToSlide(currentSlide + 1);
    }
  }

  function prevSlide() {
    if (currentSlide > 1) {
      goToSlide(currentSlide - 1);
    }
  }

  function updateUI() {
    // Update Counter (01 / 20)
    if (slideCounter) {
      const formattedCurrent = String(currentSlide).padStart(2, '0');
      const formattedTotal = String(totalSlides).padStart(2, '0');
      slideCounter.textContent = `${formattedCurrent} / ${formattedTotal}`;
    }

    // Update Progress Fill
    if (progressFill) {
      const percentage = (currentSlide / totalSlides) * 100;
      progressFill.style.width = `${percentage}%`;
    }

    // Update Section Indicator
    if (sectionIndicator) {
      sectionIndicator.textContent = slideCategories[currentSlide] || 'GenAI Day 1';
    }

    // Update Button Disabled States
    if (prevBtn) prevBtn.disabled = currentSlide === 1;
    if (nextBtn) nextBtn.disabled = currentSlide === totalSlides;

    // Update Active TOC Item
    const tocItems = document.querySelectorAll('.toc-item');
    tocItems.forEach((item, index) => {
      if (index + 1 === currentSlide) {
        item.classList.add('active-slide');
      } else {
        item.classList.remove('active-slide');
      }
    });
  }

  /**
   * Build Table of Contents Drawer
   */
  function buildToc() {
    if (!tocList) return;
    tocList.innerHTML = '';

    slides.forEach((slide) => {
      const slideNum = parseInt(slide.dataset.slide, 10);
      const titleElem = slide.querySelector('.slide-title');
      const titleText = titleElem ? titleElem.innerText.replace(/\s+/g, ' ').trim() : `Slide ${slideNum}`;

      const item = document.createElement('div');
      item.className = `toc-item ${slideNum === currentSlide ? 'active-slide' : ''}`;
      item.innerHTML = `
        <span style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--primary); font-weight: 700;">
          ${String(slideNum).padStart(2, '0')}.
        </span>
        <span style="flex: 1; margin-left: 0.75rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 0.9rem;">
          ${titleText}
        </span>
        <span style="font-size: 0.75rem; color: var(--text-light); font-weight: 600;">Go ↵</span>
      `;

      item.addEventListener('click', () => {
        goToSlide(slideNum);
        closeToc();
      });

      tocList.appendChild(item);
    });
  }

  /**
   * Handle hash navigation on load/change
   */
  function handleHashNavigation() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#slide-')) {
      const num = parseInt(hash.replace('#slide-', ''), 10);
      if (!isNaN(num) && num >= 1 && num <= totalSlides) {
        goToSlide(num);
        return;
      }
    }
    goToSlide(1);
  }

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#slide-')) {
      const num = parseInt(hash.replace('#slide-', ''), 10);
      if (!isNaN(num) && num !== currentSlide) {
        goToSlide(num);
      }
    }
  });

  // =========================================================================
  // MODALS
  // =========================================================================
  function openToc() {
    if (tocOverlay) tocOverlay.classList.add('active');
  }

  function closeToc() {
    if (tocOverlay) tocOverlay.classList.remove('active');
  }

  function openHelp() {
    if (helpModal) helpModal.classList.add('active');
  }

  function closeHelp() {
    if (helpModal) helpModal.classList.remove('active');
  }

  if (tocBtn) tocBtn.addEventListener('click', openToc);
  if (tocClose) tocClose.addEventListener('click', closeToc);
  if (helpBtn) helpBtn.addEventListener('click', openHelp);
  if (helpClose) helpClose.addEventListener('click', closeHelp);

  [tocOverlay, helpModal].forEach((overlay) => {
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          closeToc();
          closeHelp();
        }
      });
    }
  });

  // =========================================================================
  // KEYBOARD CONTROLS
  // =========================================================================
  document.addEventListener('keydown', (e) => {
    const activeTag = document.activeElement ? document.activeElement.tagName : '';
    if (activeTag === 'INPUT' || activeTag === 'TEXTAREA' || activeTag === 'SELECT') {
      return;
    }

    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'Home') {
      e.preventDefault();
      goToSlide(1);
    } else if (e.key === 'End') {
      e.preventDefault();
      goToSlide(totalSlides);
    } else if (e.key === 'f' || e.key === 'F') {
      e.preventDefault();
      toggleFullscreen();
    } else if (e.key === 't' || e.key === 'T') {
      e.preventDefault();
      if (tocOverlay && tocOverlay.classList.contains('active')) {
        closeToc();
      } else {
        openToc();
      }
    } else if (e.key === '?' || (e.shiftKey && e.key === '/')) {
      e.preventDefault();
      if (helpModal && helpModal.classList.contains('active')) {
        closeHelp();
      } else {
        openHelp();
      }
    } else if (e.key === 'Escape') {
      closeToc();
      closeHelp();
    }
  });

  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  // =========================================================================
  // FULLSCREEN TOGGLE
  // =========================================================================
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', toggleFullscreen);
  }

  // =========================================================================
  // TOUCH SWIPE NAVIGATION
  // =========================================================================
  let touchStartX = 0;
  let touchStartY = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }, { passive: true });

  // =========================================================================
  // ONE-CLICK CODE COPYING
  // =========================================================================
  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const container = btn.closest('.code-container');
      const codeElem = container ? container.querySelector('code') : null;
      if (!codeElem) return;

      const codeText = codeElem.innerText;
      try {
        await navigator.clipboard.writeText(codeText);
        const originalHTML = btn.innerHTML;
        btn.innerHTML = `<span style="color:#34d399">✓ Copied!</span>`;
        btn.style.borderColor = '#34d399';
        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.style.borderColor = '';
        }, 2000);
      } catch (err) {
        btn.textContent = 'Failed';
        setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
      }
    });
  });

  // =========================================================================
  // SIMULATOR 1: GenAI Prompt & API Console (Slide 10 & 13)
  // =========================================================================
  const llmPromptInput = document.getElementById('llmPromptInput');
  const llmRoleSelect = document.getElementById('llmRoleSelect');
  const llmSendBtn = document.getElementById('llmSendBtn');
  const llmStatusBadge = document.getElementById('llmStatusBadge');
  const llmOutputBox = document.getElementById('llmOutputBox');

  if (llmSendBtn && llmOutputBox) {
    llmSendBtn.addEventListener('click', () => {
      const question = llmPromptInput ? llmPromptInput.value.trim() : '';
      const role = llmRoleSelect ? llmRoleSelect.value : 'teacher';

      if (!question) {
        if (llmStatusBadge) {
          llmStatusBadge.className = 'status-pill status-pill-warning';
          llmStatusBadge.textContent = '400 Bad Request';
        }
        llmOutputBox.textContent = JSON.stringify({
          error: "Question is required in request body (req.body.question)."
        }, null, 2);
        return;
      }

      if (llmStatusBadge) {
        llmStatusBadge.className = 'status-pill status-pill-success';
        llmStatusBadge.textContent = '200 OK (Generated)';
      }

      let simulatedAnswer = "";
      if (question.toLowerCase().includes("node")) {
        simulatedAnswer = "Node.js is an open-source, cross-platform JavaScript runtime environment that lets developers run JavaScript on the server side, outside of a browser. It is built on Google Chrome's V8 JavaScript engine and uses an event-driven, non-blocking I/O model.";
      } else if (question.toLowerCase().includes("generative") || question.toLowerCase().includes("genai")) {
        simulatedAnswer = "Generative AI is a branch of artificial intelligence that creates new, original content (such as text, code, images, and audio) by predicting statistical patterns learned from vast datasets, rather than simply analyzing or classifying existing records.";
      } else if (question.toLowerCase().includes("middleware") || question.toLowerCase().includes("express")) {
        simulatedAnswer = "Express middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle. They can execute code, modify req/res, and end the cycle.";
      } else {
        simulatedAnswer = `Here is a clear explanation answering "${question}": Generative AI models generate helpful answers by evaluating tokens and prompt context to formulate structured responses.`;
      }

      if (role === 'teacher') {
        simulatedAnswer = `🎓 [Teacher Role]: Hello student! ` + simulatedAnswer;
      } else if (role === 'concise') {
        simulatedAnswer = `⚡ [Concise Summary]: ` + simulatedAnswer.split('. ')[0] + '.';
      }

      llmOutputBox.textContent = `// Simulated OpenAI SDK Responses API Output (response.output_text):\n` + JSON.stringify({
        success: true,
        model: "gpt-4.1-mini",
        prompt: question,
        role: role,
        answer: simulatedAnswer
      }, null, 2);
    });
  }

  // =========================================================================
  // SIMULATOR 2: Simple RAG Retrieval Sandbox (Slide 15)
  // =========================================================================
  const ragQuestionInput = document.getElementById('ragQuestionInput');
  const ragRunBtn = document.getElementById('ragRunBtn');
  const ragStatusBadge = document.getElementById('ragStatusBadge');
  const ragOutputBox = document.getElementById('ragOutputBox');

  if (ragRunBtn && ragOutputBox) {
    const knowledgeBase = [
      "Node.js is a JavaScript runtime built on Chrome's V8 engine.",
      "Express.js is a lightweight web framework for Node.js backend APIs.",
      "MongoDB is a NoSQL document database that stores JSON-like records."
    ];

    ragRunBtn.addEventListener('click', () => {
      const q = ragQuestionInput ? ragQuestionInput.value.trim() : '';
      if (!q) {
        ragOutputBox.textContent = '// Enter a question to test knowledge retrieval';
        return;
      }

      const qLower = q.toLowerCase();
      // Simple keyword matching simulation as taught in curriculum
      const retrieved = knowledgeBase.filter(item => {
        const itemLower = item.toLowerCase();
        if (qLower.includes('node') && itemLower.includes('node')) return true;
        if (qLower.includes('express') && itemLower.includes('express')) return true;
        if (qLower.includes('mongo') && itemLower.includes('mongo')) return true;
        return false;
      });

      if (retrieved.length > 0) {
        if (ragStatusBadge) {
          ragStatusBadge.className = 'status-pill status-pill-success';
          ragStatusBadge.textContent = 'Context Retrieved';
        }
        ragOutputBox.textContent = 
`// 1. Retrieved Context from Local Knowledge Base:
${JSON.stringify(retrieved, null, 2)}

// 2. Final LLM Answer (Strictly grounded in retrieved context):
"According to the provided context: ${retrieved.join(" ")}"`;
      } else {
        if (ragStatusBadge) {
          ragStatusBadge.className = 'status-pill status-pill-warning';
          ragStatusBadge.textContent = 'No Match Found';
        }
        ragOutputBox.textContent = 
`// 1. Retrieved Context: [] (No keywords matched)

// 2. Final LLM Answer:
"I do not have enough information in the provided context to answer your question."`;
      }
    });
  }

  // =========================================================================
  // SIMULATOR 3: Tool Calling Simulation Sandbox (Slide 17)
  // =========================================================================
  const toolSelect = document.getElementById('toolSelectStudent');
  const toolTriggerBtn = document.getElementById('toolTriggerBtn');
  const toolOutputBox = document.getElementById('toolOutputBox');

  if (toolTriggerBtn && toolOutputBox) {
    const studentsDb = [
      { id: 1, name: "Arun", course: "MERN Stack Development", enrolled: "2026" },
      { id: 2, name: "Meera", course: "Generative AI Engineering", enrolled: "2026" },
      { id: 3, name: "Rahul", course: "Cloud & DevOps Architecture", enrolled: "2026" }
    ];

    toolTriggerBtn.addEventListener('click', () => {
      const studentId = parseInt(toolSelect ? toolSelect.value : "1", 10);
      const student = studentsDb.find(s => s.id === studentId);

      if (student) {
        toolOutputBox.textContent = 
`// 1. LLM requests Tool Call: getStudentDetails({ studentId: ${studentId} })
// 2. Node.js backend executes function and returns:
` + JSON.stringify(student, null, 2) + 
`\n\n// 3. LLM Final Generated Response:
"Student #${student.id} is ${student.name}, enrolled in the ${student.course} course."`;
      } else {
        toolOutputBox.textContent = 
`// 1. Tool Call: getStudentDetails({ studentId: ${studentId} })
// 2. Backend Result: null (Student not found)
// 3. LLM Response: "I could not find any active student with ID ${studentId}."`;
      }
    });
  }

  // Kick off presentation
  initPresentation();
});
