/**
 * JavaScript Complete Masterclass Interactive Presentation Engine
 * With Fully Working State-Driven Event Loop Simulator
 */

document.addEventListener('DOMContentLoaded', () => {
  // Presentation State
  let currentSlideIndex = 0;
  const slides = Array.from(document.querySelectorAll('.slide'));
  const totalSlides = slides.length;

  // DOM Elements
  const currentSlideEl = document.getElementById('current-slide-num');
  const totalSlidesEl = document.getElementById('total-slides-num');
  const progressBarFill = document.getElementById('progress-bar-fill');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const headerDayTitle = document.getElementById('header-day-title');
  const headerSectionBadge = document.getElementById('header-section-badge');
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  const tocBtn = document.getElementById('toc-btn');
  const mentorBtn = document.getElementById('mentor-btn');

  // Drawers & Overlays
  const drawerOverlay = document.getElementById('drawer-overlay');
  const tocDrawer = document.getElementById('toc-drawer');
  const mentorDrawer = document.getElementById('mentor-drawer');
  const tocList = document.getElementById('toc-list');
  const mentorNoteContent = document.getElementById('mentor-note-content');
  const closeDrawerBtns = document.querySelectorAll('.close-drawer-btn');

  // Initialize Counter
  if (totalSlidesEl) totalSlidesEl.textContent = totalSlides;

  // Render Table of Contents
  renderTableOfContents();

  // Get Slide Index from Hash
  function getSlideIndexFromHash() {
    const hash = window.location.hash;
    if (hash) {
      if (hash === '#session-js-event-loop') {
        const simSlide = document.querySelector('[data-day="EVENT LOOP SESSION"]');
        if (simSlide) {
          const idx = slides.indexOf(simSlide);
          if (idx !== -1) return idx;
        }
      } else if (hash.startsWith('#slide-')) {
        const num = parseInt(hash.replace('#slide-', ''), 10);
        if (!isNaN(num) && num >= 1 && num <= totalSlides) {
          return num - 1;
        }
      }
    }
    return 0;
  }

  // Go to Slide Function
  function goToSlide(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;

    slides.forEach((slide, idx) => {
      if (idx === index) {
        slide.classList.add('active');
        slide.scrollTop = 0;
      } else {
        slide.classList.remove('active');
      }
    });

    currentSlideIndex = index;
    updateUI();

    const activeSlide = slides[currentSlideIndex];
    if (activeSlide && activeSlide.getAttribute('data-day') === 'EVENT LOOP SESSION') {
      window.location.hash = '#session-js-event-loop';
    } else {
      window.location.hash = `#slide-${currentSlideIndex + 1}`;
    }
  }

  // Update Navigation UI & Header Metadata
  function updateUI() {
    if (currentSlideEl) currentSlideEl.textContent = currentSlideIndex + 1;

    const progressPercent = ((currentSlideIndex + 1) / totalSlides) * 100;
    if (progressBarFill) progressBarFill.style.width = `${progressPercent}%`;

    if (prevBtn) prevBtn.disabled = currentSlideIndex === 0;
    if (nextBtn) nextBtn.disabled = currentSlideIndex === totalSlides - 1;

    const activeSlide = slides[currentSlideIndex];
    if (activeSlide) {
      const dayText = activeSlide.getAttribute('data-day') || 'Module Overview';
      const tagEl = activeSlide.querySelector('.slide-tag');
      const tagText = tagEl ? tagEl.textContent : 'JavaScript Module';

      if (headerDayTitle) headerDayTitle.textContent = dayText;
      if (headerSectionBadge) headerSectionBadge.textContent = tagText;
    }

    updateMentorNotesContent();
    updateActiveTOC();
  }

  // Next & Previous Slide
  function nextSlide() {
    if (currentSlideIndex < totalSlides - 1) {
      goToSlide(currentSlideIndex + 1);
    }
  }

  function prevSlide() {
    if (currentSlideIndex > 0) {
      goToSlide(currentSlideIndex - 1);
    }
  }

  // Keyboard Navigation Handler
  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;

    switch (e.key) {
      case 'ArrowRight':
      case 'Space':
        e.preventDefault();
        nextSlide();
        break;
      case 'ArrowLeft':
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
      case 'Escape':
        closeDrawers();
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
        break;
    }
  });

  // Touch Swipe Gesture Detection
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      nextSlide();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      prevSlide();
    }
  }

  // Fullscreen API Toggle
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);

  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  if (tocBtn) tocBtn.addEventListener('click', () => openDrawer(tocDrawer));
  if (mentorBtn) mentorBtn.addEventListener('click', () => openDrawer(mentorDrawer));

  function openDrawer(drawer) {
    closeDrawers();
    if (drawerOverlay) drawerOverlay.classList.add('active');
    if (drawer) drawer.classList.add('active');
  }

  function closeDrawers() {
    if (drawerOverlay) drawerOverlay.classList.remove('active');
    if (tocDrawer) tocDrawer.classList.remove('active');
    if (mentorDrawer) mentorDrawer.classList.remove('active');
  }

  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawers);
  closeDrawerBtns.forEach(btn => btn.addEventListener('click', closeDrawers));

  function renderTableOfContents() {
    if (!tocList) return;
    tocList.innerHTML = '';

    slides.forEach((slide, idx) => {
      const day = slide.getAttribute('data-day') || `Slide ${idx + 1}`;
      const titleEl = slide.querySelector('.slide-title');
      const titleText = titleEl ? titleEl.textContent : 'Untitled Slide';

      const li = document.createElement('li');
      li.className = 'toc-item';
      li.setAttribute('data-slide-index', idx);

      li.innerHTML = `
        <div>
          <div class="toc-day">${escapeHTML(day)}</div>
          <div class="toc-title">${escapeHTML(titleText)}</div>
        </div>
        <div class="toc-num" style="font-size:0.82rem; font-weight:700; color:var(--text-muted);">${idx + 1}</div>
      `;

      li.addEventListener('click', () => {
        goToSlide(idx);
        closeDrawers();
      });

      tocList.appendChild(li);
    });
  }

  function updateActiveTOC() {
    const items = document.querySelectorAll('.toc-item');
    items.forEach((item, idx) => {
      if (idx === currentSlideIndex) {
        item.classList.add('active');
        item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else {
        item.classList.remove('active');
      }
    });
  }

  function updateMentorNotesContent() {
    if (!mentorNoteContent) return;
    const activeSlide = slides[currentSlideIndex];
    const noteEl = activeSlide ? activeSlide.querySelector('.mentor-note') : null;

    if (noteEl) {
      mentorNoteContent.innerHTML = noteEl.innerHTML;
    } else {
      mentorNoteContent.innerHTML = `
        <div class="mentor-note-card">
          <strong>MENTOR NOTE:</strong><br>
          No specific notes for this slide. Emphasize bullet points, read code line-by-line, and pause for student questions.
        </div>
      `;
    }
  }

  // Code Copy-to-Clipboard Handler
  document.addEventListener('click', (e) => {
    const copyBtn = e.target.closest('.copy-btn');
    if (!copyBtn) return;

    const codeContainer = copyBtn.closest('.code-container') || copyBtn.closest('.sim-code-box');
    if (!codeContainer) return;

    const codeEl = codeContainer.querySelector('code') || codeContainer.querySelector('.sim-code-lines');
    if (!codeEl) return;

    const textToCopy = codeEl.innerText;

    navigator.clipboard.writeText(textToCopy).then(() => {
      const originalHTML = copyBtn.innerHTML;
      copyBtn.innerHTML = `<i data-lucide="check" style="width:14px;height:14px;color:#16A34A;"></i> Copied ✓`;
      if (window.lucide) lucide.createIcons();

      setTimeout(() => {
        copyBtn.innerHTML = originalHTML;
        if (window.lucide) lucide.createIcons();
      }, 1500);
    }).catch(err => {
      console.error('Failed to copy code: ', err);
    });
  });

  // Reveal Explanation Handler
  document.addEventListener('click', (e) => {
    const revealBtn = e.target.closest('.reveal-btn');
    if (!revealBtn) return;

    const quizCard = revealBtn.closest('.quiz-card') || revealBtn.closest('.slide-content');
    if (!quizCard) return;

    const explanationCard = quizCard.querySelector('.explanation-card');
    if (explanationCard) {
      explanationCard.classList.toggle('visible');
      revealBtn.textContent = explanationCard.classList.contains('visible')
        ? 'Hide Explanation'
        : 'Reveal Answer & Explanation';
    }
  });

  // MCQ Quiz Engine
  let quizAnswers = {};

  document.addEventListener('click', (e) => {
    const optionBtn = e.target.closest('.option-btn');
    if (!optionBtn) return;

    const optionsGrid = optionBtn.closest('.options-grid');
    if (!optionsGrid) return;

    const qCard = optionBtn.closest('.quiz-card');
    if (!qCard) return;

    const qId = qCard.getAttribute('data-question-id');
    const correctOption = qCard.getAttribute('data-correct-option');
    const selectedOption = optionBtn.getAttribute('data-option');

    const siblings = optionsGrid.querySelectorAll('.option-btn');
    siblings.forEach(btn => btn.classList.remove('selected-correct', 'selected-wrong'));

    if (selectedOption === correctOption) {
      optionBtn.classList.add('selected-correct');
      if (qId) quizAnswers[qId] = true;
    } else {
      optionBtn.classList.add('selected-wrong');
      const correctBtn = optionsGrid.querySelector(`[data-option="${correctOption}"]`);
      if (correctBtn) correctBtn.classList.add('selected-correct');
      if (qId) quizAnswers[qId] = false;
    }

    const exp = qCard.querySelector('.explanation-card');
    if (exp) exp.classList.add('visible');

    calculateQuizScore();
  });

  function calculateQuizScore() {
    const scoreDisplay = document.getElementById('quiz-score-display');
    const scoreBadge = document.getElementById('quiz-badge-display');
    if (!scoreDisplay) return;

    const totalQuestions = document.querySelectorAll('[data-question-id]').length;
    let correctCount = 0;

    Object.values(quizAnswers).forEach(val => {
      if (val === true) correctCount++;
    });

    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    scoreDisplay.innerHTML = `Score: <strong>${correctCount} / ${totalQuestions}</strong> (${percentage}%)`;

    if (scoreBadge) {
      if (percentage >= 90) {
        scoreBadge.className = 'pill-badge';
        scoreBadge.style.background = '#DCFCE7';
        scoreBadge.style.color = '#16A34A';
        scoreBadge.textContent = '🌟 Excellent — Outstanding Mastery!';
      } else if (percentage >= 75) {
        scoreBadge.className = 'pill-badge';
        scoreBadge.style.background = '#F0F9FF';
        scoreBadge.style.color = '#0EA5E9';
        scoreBadge.textContent = '👍 Good Job — Ready for Building Projects!';
      } else if (percentage >= 50) {
        scoreBadge.className = 'pill-badge';
        scoreBadge.style.background = '#FEF3C7';
        scoreBadge.style.color = '#D97706';
        scoreBadge.textContent = '📖 Needs Revision — Review Key Concepts!';
      } else {
        scoreBadge.className = 'pill-badge';
        scoreBadge.style.background = '#FEE2E2';
        scoreBadge.style.color = '#DC2626';
        scoreBadge.textContent = '⚠️ Review Fundamentals';
      }
    }
  }

  // ==========================================================================
  // EVENT LOOP INTERACTIVE SIMULATOR ENGINE (STATE-DRIVEN)
  // ==========================================================================

  const SIM_EXAMPLES = [
    {
      id: "ex1",
      title: "1. Classic Timers + Promises",
      codeLines: [
        'console.log("A");',
        'setTimeout(() => {',
        '  console.log("B");',
        '}, 0);',
        'Promise.resolve().then(() => {',
        '  console.log("C");',
        '});',
        'console.log("D");'
      ],
      steps: [
        { activeLine: -1, callStack: [], webApis: [], microtasks: [], tasks: [], output: [], log: "[00] Program initialized", loopStatus: "Idle" },
        { activeLine: 0, callStack: ["console.log('A')"], webApis: [], microtasks: [], tasks: [], output: [], log: "[01] Pushed console.log('A') to Call Stack", loopStatus: "Executing Stack" },
        { activeLine: 0, callStack: [], webApis: [], microtasks: [], tasks: [], output: ["A"], log: "[02] Executed console.log('A') -> Printed 'A'", loopStatus: "Executing Stack" },
        { activeLine: 1, callStack: ["setTimeout(cb, 0)"], webApis: [], microtasks: [], tasks: [], output: ["A"], log: "[03] Pushed setTimeout(0) to Call Stack", loopStatus: "Executing Stack" },
        { activeLine: 1, callStack: [], webApis: ["Timer (0ms)"], microtasks: [], tasks: [], output: ["A"], log: "[04] Handed timer to Web API", loopStatus: "Delegating Web API" },
        { activeLine: 1, callStack: [], webApis: [], microtasks: [], tasks: ["Callback: log('B')"], output: ["A"], log: "[05] Timer (0ms) completed -> Queued callback in Task Queue", loopStatus: "Task Queued" },
        { activeLine: 4, callStack: ["Promise.resolve()"], webApis: [], microtasks: [], tasks: ["Callback: log('B')"], output: ["A"], log: "[06] Pushed Promise.resolve() to Call Stack", loopStatus: "Executing Stack" },
        { activeLine: 4, callStack: [], webApis: [], microtasks: ["Promise cb: log('C')"], tasks: ["Callback: log('B')"], output: ["A"], log: "[07] Promise resolved -> Queued callback in Microtask Queue", loopStatus: "Microtask Queued" },
        { activeLine: 7, callStack: ["console.log('D')"], webApis: [], microtasks: ["Promise cb: log('C')"], tasks: ["Callback: log('B')"], output: ["A"], log: "[08] Pushed console.log('D') to Call Stack", loopStatus: "Executing Stack" },
        { activeLine: 7, callStack: [], webApis: [], microtasks: ["Promise cb: log('C')"], tasks: ["Callback: log('B')"], output: ["A", "D"], log: "[09] Executed console.log('D') -> Printed 'D'. Stack is EMPTY!", loopStatus: "Stack Empty" },
        { activeLine: -1, callStack: [], webApis: [], microtasks: ["Promise cb: log('C')"], tasks: ["Callback: log('B')"], output: ["A", "D"], log: "[10] Event Loop checks Microtask Queue FIRST", loopStatus: "Event Loop: Checking Microtasks" },
        { activeLine: 4, callStack: ["Promise cb: log('C')"], webApis: [], microtasks: [], tasks: ["Callback: log('B')"], output: ["A", "D"], log: "[11] Moved Microtask callback to Call Stack", loopStatus: "Executing Microtask" },
        { activeLine: 4, callStack: [], webApis: [], microtasks: [], tasks: ["Callback: log('B')"], output: ["A", "D", "C"], log: "[12] Executed Microtask -> Printed 'C'. Microtask Queue cleared!", loopStatus: "Microtasks Cleared" },
        { activeLine: -1, callStack: [], webApis: [], microtasks: [], tasks: ["Callback: log('B')"], output: ["A", "D", "C"], log: "[13] Event Loop checks Task Queue next", loopStatus: "Event Loop: Checking Tasks" },
        { activeLine: 1, callStack: ["Callback: log('B')"], webApis: [], microtasks: [], tasks: [], output: ["A", "D", "C"], log: "[14] Moved Task callback to Call Stack", loopStatus: "Executing Task" },
        { activeLine: 1, callStack: [], webApis: [], microtasks: [], tasks: [], output: ["A", "D", "C", "B"], log: "[15] Executed Task -> Printed 'B'. Execution Complete!", loopStatus: "Completed" }
      ]
    },
    {
      id: "ex2",
      title: "2. Simple Timers (1, 3, 2)",
      codeLines: [
        'console.log("1");',
        'setTimeout(() => {',
        '  console.log("2");',
        '}, 0);',
        'console.log("3");'
      ],
      steps: [
        { activeLine: -1, callStack: [], webApis: [], microtasks: [], tasks: [], output: [], log: "[00] Program initialized", loopStatus: "Idle" },
        { activeLine: 0, callStack: ["console.log('1')"], webApis: [], microtasks: [], tasks: [], output: [], log: "[01] Pushed console.log('1') to Call Stack", loopStatus: "Executing Stack" },
        { activeLine: 0, callStack: [], webApis: [], microtasks: [], tasks: [], output: ["1"], log: "[02] Printed '1'", loopStatus: "Executing Stack" },
        { activeLine: 1, callStack: ["setTimeout(cb, 0)"], webApis: [], microtasks: [], tasks: [], output: ["1"], log: "[03] Pushed setTimeout(0)", loopStatus: "Executing Stack" },
        { activeLine: 1, callStack: [], webApis: ["Timer (0ms)"], microtasks: [], tasks: [], output: ["1"], log: "[04] Handed timer to Web API", loopStatus: "Delegating Web API" },
        { activeLine: 1, callStack: [], webApis: [], microtasks: [], tasks: ["Callback: log('2')"], output: ["1"], log: "[05] Timer expired -> Queued callback in Task Queue", loopStatus: "Task Queued" },
        { activeLine: 4, callStack: ["console.log('3')"], webApis: [], microtasks: [], tasks: ["Callback: log('2')"], output: ["1"], log: "[06] Pushed console.log('3')", loopStatus: "Executing Stack" },
        { activeLine: 4, callStack: [], webApis: [], microtasks: [], tasks: ["Callback: log('2')"], output: ["1", "3"], log: "[07] Printed '3'. Call Stack is EMPTY!", loopStatus: "Stack Empty" },
        { activeLine: 1, callStack: ["Callback: log('2')"], webApis: [], microtasks: [], tasks: [], output: ["1", "3"], log: "[08] Event Loop moved Task callback to Call Stack", loopStatus: "Executing Task" },
        { activeLine: 1, callStack: [], webApis: [], microtasks: [], tasks: [], output: ["1", "3", "2"], log: "[09] Printed '2'. Execution Complete!", loopStatus: "Completed" }
      ]
    },
    {
      id: "ex3",
      title: "3. Multiple Promises & Timers (A, E, B, D, C)",
      codeLines: [
        'console.log("A");',
        'Promise.resolve().then(() => console.log("B"));',
        'setTimeout(() => console.log("C"), 0);',
        'Promise.resolve().then(() => console.log("D"));',
        'console.log("E");'
      ],
      steps: [
        { activeLine: -1, callStack: [], webApis: [], microtasks: [], tasks: [], output: [], log: "[00] Program initialized", loopStatus: "Idle" },
        { activeLine: 0, callStack: ["console.log('A')"], webApis: [], microtasks: [], tasks: [], output: ["A"], log: "[01] Printed 'A'", loopStatus: "Executing Stack" },
        { activeLine: 1, callStack: [], webApis: [], microtasks: ["Promise 1: log('B')"], tasks: [], output: ["A"], log: "[02] Promise 1 resolved -> Microtask Queue: ['B']", loopStatus: "Microtask Queued" },
        { activeLine: 2, callStack: [], webApis: [], microtasks: ["Promise 1: log('B')"], tasks: ["Timer: log('C')"], output: ["A"], log: "[03] setTimeout(0) -> Task Queue: ['C']", loopStatus: "Task Queued" },
        { activeLine: 3, callStack: [], webApis: [], microtasks: ["Promise 1: log('B')", "Promise 2: log('D')"], tasks: ["Timer: log('C')"], output: ["A"], log: "[04] Promise 2 resolved -> Microtask Queue: ['B', 'D']", loopStatus: "Microtask Queued" },
        { activeLine: 4, callStack: ["console.log('E')"], webApis: [], microtasks: ["Promise 1: log('B')", "Promise 2: log('D')"], tasks: ["Timer: log('C')"], output: ["A", "E"], log: "[05] Printed 'E'. Stack is EMPTY!", loopStatus: "Stack Empty" },
        { activeLine: 1, callStack: ["Promise 1: log('B')"], webApis: [], microtasks: ["Promise 2: log('D')"], tasks: ["Timer: log('C')"], output: ["A", "E", "B"], log: "[06] Executed Microtask 1 -> Printed 'B'", loopStatus: "Executing Microtask" },
        { activeLine: 3, callStack: ["Promise 2: log('D')"], webApis: [], microtasks: [], tasks: ["Timer: log('C')"], output: ["A", "E", "B", "D"], log: "[07] Executed Microtask 2 -> Printed 'D'. Microtasks empty!", loopStatus: "Executing Microtask" },
        { activeLine: 2, callStack: ["Timer: log('C')"], webApis: [], microtasks: [], tasks: [], output: ["A", "E", "B", "D", "C"], log: "[08] Executed Task -> Printed 'C'. Done!", loopStatus: "Completed" }
      ]
    },
    {
      id: "ex4",
      title: "4. Nested Microtasks (A, D, B, C)",
      codeLines: [
        'console.log("A");',
        'Promise.resolve().then(() => {',
        '  console.log("B");',
        '  Promise.resolve().then(() => console.log("C"));',
        '});',
        'console.log("D");'
      ],
      steps: [
        { activeLine: -1, callStack: [], webApis: [], microtasks: [], tasks: [], output: [], log: "[00] Program initialized", loopStatus: "Idle" },
        { activeLine: 0, callStack: ["console.log('A')"], webApis: [], microtasks: [], tasks: [], output: ["A"], log: "[01] Printed 'A'", loopStatus: "Executing Stack" },
        { activeLine: 1, callStack: [], webApis: [], microtasks: ["Outer Promise: log('B')"], tasks: [], output: ["A"], log: "[02] Outer Promise resolved -> Microtask Queue", loopStatus: "Microtask Queued" },
        { activeLine: 5, callStack: ["console.log('D')"], webApis: [], microtasks: ["Outer Promise: log('B')"], tasks: [], output: ["A", "D"], log: "[03] Printed 'D'. Stack is EMPTY!", loopStatus: "Stack Empty" },
        { activeLine: 1, callStack: ["Outer Promise"], webApis: [], microtasks: [], tasks: [], output: ["A", "D", "B"], log: "[04] Executed Outer Promise -> Printed 'B' & queued Inner Promise!", microtasks: ["Inner Promise: log('C')"], loopStatus: "Executing Microtask" },
        { activeLine: 3, callStack: ["Inner Promise: log('C')"], webApis: [], microtasks: [], tasks: [], output: ["A", "D", "B", "C"], log: "[05] Executed Inner Promise -> Printed 'C'. Done!", loopStatus: "Completed" }
      ]
    },
    {
      id: "ex5",
      title: "5. async / await Microtasks (C, A, D, B)",
      codeLines: [
        'async function test() {',
        '  console.log("A");',
        '  await Promise.resolve();',
        '  console.log("B");',
        '}',
        'console.log("C");',
        'test();',
        'console.log("D");'
      ],
      steps: [
        { activeLine: -1, callStack: [], webApis: [], microtasks: [], tasks: [], output: [], log: "[00] Program initialized", loopStatus: "Idle" },
        { activeLine: 5, callStack: ["console.log('C')"], webApis: [], microtasks: [], tasks: [], output: ["C"], log: "[01] Printed 'C'", loopStatus: "Executing Stack" },
        { activeLine: 6, callStack: ["test()", "console.log('A')"], webApis: [], microtasks: [], tasks: [], output: ["C", "A"], log: "[02] Called test() -> Printed 'A'", loopStatus: "Executing Stack" },
        { activeLine: 2, callStack: [], webApis: [], microtasks: ["test() continuation: log('B')"], tasks: [], output: ["C", "A"], log: "[03] Encountered await -> Paused test() & queued continuation in Microtask Queue", loopStatus: "Microtask Queued" },
        { activeLine: 7, callStack: ["console.log('D')"], webApis: [], microtasks: ["test() continuation: log('B')"], tasks: [], output: ["C", "A", "D"], log: "[04] Printed 'D'. Stack is EMPTY!", loopStatus: "Stack Empty" },
        { activeLine: 3, callStack: ["test() continuation"], webApis: [], microtasks: [], tasks: [], output: ["C", "A", "D", "B"], log: "[05] Resumed async function -> Printed 'B'. Complete!", loopStatus: "Completed" }
      ]
    }
  ];

  // Simulator State Machine Variable
  let currentExampleIdx = 0;
  let currentStepIdx = 0;
  let isPlayRunning = false;
  let playIntervalId = null;
  let animSpeedMs = 800; // Normal speed default

  // DOM Elements for Simulator
  const simExampleSelect = document.getElementById('sim-example-select');
  const simCodeLines = document.getElementById('sim-code-lines');
  const simCallStackContent = document.getElementById('sim-call-stack-content');
  const simWebApisContent = document.getElementById('sim-web-apis-content');
  const simMicrotasksContent = document.getElementById('sim-microtasks-content');
  const simTasksContent = document.getElementById('sim-tasks-content');
  const simConsoleOutput = document.getElementById('sim-console-output');
  const simExecutionLog = document.getElementById('sim-execution-log');
  const simStepBadge = document.getElementById('sim-step-badge');
  const simWheel = document.getElementById('sim-wheel');
  const simStatusText = document.getElementById('sim-status-text');

  // Simulator Buttons
  const simPlayBtn = document.getElementById('sim-play-btn');
  const simPauseBtn = document.getElementById('sim-pause-btn');
  const simStepPrevBtn = document.getElementById('sim-step-prev-btn');
  const simStepNextBtn = document.getElementById('sim-step-next-btn');
  const simResetBtn = document.getElementById('sim-reset-btn');
  const simSpeedSelect = document.getElementById('sim-speed-select');

  // Initialize Simulator
  initSimulator();

  function initSimulator() {
    if (!simExampleSelect || !simCodeLines) return;

    // Populate Example Selector
    simExampleSelect.innerHTML = '';
    SIM_EXAMPLES.forEach((ex, idx) => {
      const opt = document.createElement('option');
      opt.value = idx;
      opt.textContent = ex.title;
      simExampleSelect.appendChild(opt);
    });

    simExampleSelect.addEventListener('change', (e) => {
      currentExampleIdx = parseInt(e.target.value, 10);
      resetSimulator();
    });

    if (simSpeedSelect) {
      simSpeedSelect.addEventListener('change', (e) => {
        animSpeedMs = parseInt(e.target.value, 10);
        if (isPlayRunning) {
          pauseSimulator();
          playSimulator();
        }
      });
    }

    if (simPlayBtn) simPlayBtn.addEventListener('click', playSimulator);
    if (simPauseBtn) simPauseBtn.addEventListener('click', pauseSimulator);
    if (simStepNextBtn) simStepNextBtn.addEventListener('click', stepNext);
    if (simStepPrevBtn) simStepPrevBtn.addEventListener('click', stepPrev);
    if (simResetBtn) simResetBtn.addEventListener('click', resetSimulator);

    loadExample(currentExampleIdx);
  }

  function loadExample(index) {
    const ex = SIM_EXAMPLES[index];
    if (!ex) return;

    currentStepIdx = 0;

    // Render Code Lines
    simCodeLines.innerHTML = '';
    ex.codeLines.forEach((line, lineIdx) => {
      const li = document.createElement('li');
      li.className = 'sim-code-line';
      li.setAttribute('data-line-idx', lineIdx);
      li.innerHTML = `
        <span class="sim-line-num">${lineIdx + 1}</span>
        <code>${escapeHTML(line)}</code>
      `;
      simCodeLines.appendChild(li);
    });

    renderStepState();
  }

  function renderStepState() {
    const ex = SIM_EXAMPLES[currentExampleIdx];
    if (!ex) return;

    const step = ex.steps[currentStepIdx] || ex.steps[0];

    // Highlight Code Line
    const lines = simCodeLines.querySelectorAll('.sim-code-line');
    lines.forEach((li, lIdx) => {
      if (lIdx === step.activeLine) {
        li.classList.add('active-line');
      } else {
        li.classList.remove('active-line');
      }
    });

    // Render Call Stack
    renderBoxContent(simCallStackContent, step.callStack, 'exec', 'EXECUTING');

    // Render Web APIs
    renderBoxContent(simWebApisContent, step.webApis, 'task', 'WAITING');

    // Render Microtask Queue
    renderBoxContent(simMicrotasksContent, step.microtasks, 'micro', 'QUEUED');

    // Render Task Queue
    renderBoxContent(simTasksContent, step.tasks, 'task', 'QUEUED');

    // Render Output Console
    if (simConsoleOutput) {
      simConsoleOutput.innerHTML = step.output.length > 0
        ? step.output.map(item => `<div>&gt; ${escapeHTML(item)}</div>`).join('')
        : `<span style="color:#64748B;">[ Console Output ]</span>`;
    }

    // Render Execution Log
    if (simExecutionLog) {
      simExecutionLog.innerHTML = ex.steps.slice(0, currentStepIdx + 1).map(s => `
        <div class="sim-log-entry">
          <span class="num">${escapeHTML(s.log.substring(0, 4))}</span>
          ${escapeHTML(s.log.substring(5))}
        </div>
      `).join('');
      simExecutionLog.scrollTop = simExecutionLog.scrollHeight;
    }

    // Update Counter Badge & Wheel
    if (simStepBadge) simStepBadge.textContent = `STEP ${currentStepIdx} / ${ex.steps.length - 1}`;
    if (simStatusText) simStatusText.textContent = step.loopStatus || 'Checking Call Stack...';

    if (simWheel) {
      if (step.loopStatus === 'Completed' || step.loopStatus === 'Idle') {
        simWheel.classList.add('paused');
      } else {
        simWheel.classList.remove('paused');
      }
    }
  }

  function renderBoxContent(container, itemsArray, badgeClass, badgeText) {
    if (!container) return;
    if (!itemsArray || itemsArray.length === 0) {
      container.innerHTML = `<span style="font-size:0.8rem; color:#94A3B8; text-align:center; padding:0.5rem;">[ Empty ]</span>`;
      return;
    }

    container.innerHTML = itemsArray.map(item => `
      <div class="runtime-card ${badgeClass}">
        <span>${escapeHTML(item)}</span>
        <span class="runtime-badge ${badgeClass}">${badgeText}</span>
      </div>
    `).join('');
  }

  function stepNext() {
    const ex = SIM_EXAMPLES[currentExampleIdx];
    if (currentStepIdx < ex.steps.length - 1) {
      currentStepIdx++;
      renderStepState();
    } else {
      pauseSimulator();
    }
  }

  function stepPrev() {
    if (currentStepIdx > 0) {
      currentStepIdx--;
      renderStepState();
    }
  }

  function playSimulator() {
    if (isPlayRunning) return;
    isPlayRunning = true;
    if (simPlayBtn) simPlayBtn.disabled = true;
    if (simPauseBtn) simPauseBtn.disabled = false;

    const ex = SIM_EXAMPLES[currentExampleIdx];
    if (currentStepIdx >= ex.steps.length - 1) {
      currentStepIdx = 0;
    }

    playIntervalId = setInterval(() => {
      if (currentStepIdx < ex.steps.length - 1) {
        stepNext();
      } else {
        pauseSimulator();
      }
    }, animSpeedMs);
  }

  function pauseSimulator() {
    isPlayRunning = false;
    if (playIntervalId) clearInterval(playIntervalId);
    if (simPlayBtn) simPlayBtn.disabled = false;
    if (simPauseBtn) simPauseBtn.disabled = true;
  }

  function resetSimulator() {
    pauseSimulator();
    loadExample(currentExampleIdx);
  }

  // Handle Hash Change
  window.addEventListener('hashchange', () => {
    const targetIdx = getSlideIndexFromHash();
    if (targetIdx !== currentSlideIndex) {
      goToSlide(targetIdx);
    }
  });

  // Initial Load
  const initialIndex = getSlideIndexFromHash();
  goToSlide(initialIndex);

  if (window.lucide) lucide.createIcons();
  if (window.hljs) hljs.highlightAll();

  // ==========================================================================
  // DUAL-MODE DEFINITION SYSTEM HANDLER (SIMPLE VS DEEP DIVE)
  // ==========================================================================
  document.addEventListener('click', (e) => {
    const toggleBtn = e.target.closest('.def-toggle-btn');
    if (!toggleBtn) return;

    const container = toggleBtn.closest('.def-mode-container');
    if (!container) return;

    const deepText = container.querySelector('.def-deep-text');
    if (!deepText) return;

    const targetMode = toggleBtn.getAttribute('data-mode');
    const siblingBtns = container.querySelectorAll('.def-toggle-btn');
    siblingBtns.forEach(btn => btn.classList.remove('active'));
    toggleBtn.classList.add('active');

    if (targetMode === 'deep') {
      deepText.classList.add('visible');
    } else {
      deepText.classList.remove('visible');
    }
  });

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
});

