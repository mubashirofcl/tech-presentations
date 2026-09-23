/**
 * Node.js & Express.js Interactive Presentation Engine
 * Pure Vanilla JavaScript implementation
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
  const sectionIndicator = document.getElementById('section-indicator');
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

  // Handle URL Hash Navigation
  function getSlideIndexFromHash() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#slide-')) {
      const num = parseInt(hash.replace('#slide-', ''), 10);
      if (!isNaN(num) && num >= 1 && num <= totalSlides) {
        return num - 1;
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
        // Scroll to top of slide
        slide.scrollTop = 0;
      } else {
        slide.classList.remove('active');
      }
    });

    currentSlideIndex = index;
    updateUI();
    window.location.hash = `#slide-${currentSlideIndex + 1}`;
  }

  // Update Navigation UI, Progress & Badges
  function updateUI() {
    // Update Slide Counter
    if (currentSlideEl) currentSlideEl.textContent = currentSlideIndex + 1;

    // Update Progress Bar
    const progressPercent = ((currentSlideIndex + 1) / totalSlides) * 100;
    if (progressBarFill) progressBarFill.style.width = `${progressPercent}%`;

    // Disable/Enable Nav Buttons
    if (prevBtn) prevBtn.disabled = currentSlideIndex === 0;
    if (nextBtn) nextBtn.disabled = currentSlideIndex === totalSlides - 1;

    // Update Section Indicator Badge
    const activeSlide = slides[currentSlideIndex];
    if (activeSlide && sectionIndicator) {
      const tag = activeSlide.querySelector('.slide-tag');
      const day = activeSlide.getAttribute('data-day') || (tag ? tag.textContent : 'Module Overview');
      sectionIndicator.textContent = day;
    }

    // Update Mentor Notes Panel Content
    updateMentorNotesContent();

    // Highlight Active TOC Item
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

  // Keyboard Shortcuts Handler
  document.addEventListener('keydown', (e) => {
    // Ignore key presses inside input or textarea
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

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

  // Touch Swipe Handler for Mobile / Tablet
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
      nextSlide(); // Swipe left -> next slide
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      prevSlide(); // Swipe right -> prev slide
    }
  }

  // Fullscreen Toggle
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

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', toggleFullscreen);
  }

  // Button Listeners
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  // Table of Contents Drawer Toggle
  if (tocBtn) {
    tocBtn.addEventListener('click', () => {
      openDrawer(tocDrawer);
    });
  }

  // Mentor Notes Drawer Toggle
  if (mentorBtn) {
    mentorBtn.addEventListener('click', () => {
      openDrawer(mentorDrawer);
    });
  }

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

  // Render TOC List
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
        <div class="toc-num" style="font-size:0.8rem; font-weight:700; color:var(--muted);">${idx + 1}</div>
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

  // Mentor Notes Engine
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
          No specific notes for this slide. Emphasize key bullet points, read code line-by-line, and pause for student questions.
        </div>
      `;
    }
  }

  // Code Copy-to-Clipboard Functionality
  document.addEventListener('click', (e) => {
    const copyBtn = e.target.closest('.copy-btn');
    if (!copyBtn) return;

    const codeContainer = copyBtn.closest('.code-container');
    if (!codeContainer) return;

    const codeEl = codeContainer.querySelector('code');
    if (!codeEl) return;

    const textToCopy = codeEl.innerText;

    navigator.clipboard.writeText(textToCopy).then(() => {
      const originalHTML = copyBtn.innerHTML;
      copyBtn.innerHTML = `<i data-lucide="check" style="width:14px;height:14px;color:#4ADE80;"></i> Copied ✓`;
      if (window.lucide) lucide.createIcons();

      setTimeout(() => {
        copyBtn.innerHTML = originalHTML;
        if (window.lucide) lucide.createIcons();
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy code: ', err);
    });
  });

  // Reveal Explanation Toggle for Quiz / Output Prediction
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

  // Interactive MCQ Quiz Engine
  let quizAnswers = {};

  document.addEventListener('click', (e) => {
    const optionBtn = e.target.closest('.option-btn');
    if (!optionBtn) return;

    const optionsGrid = optionBtn.closest('.options-grid');
    if (!optionsGrid) return;

    const qCard = optionBtn.closest('.quiz-card') || optionBtn.closest('.mcq-item');
    if (!qCard) return;

    const qId = qCard.getAttribute('data-question-id');
    const correctOption = qCard.getAttribute('data-correct-option');
    const selectedOption = optionBtn.getAttribute('data-option');

    // Deselect siblings
    const siblings = optionsGrid.querySelectorAll('.option-btn');
    siblings.forEach(btn => {
      btn.classList.remove('selected-correct', 'selected-wrong');
    });

    if (selectedOption === correctOption) {
      optionBtn.classList.add('selected-correct');
      if (qId) quizAnswers[qId] = true;
    } else {
      optionBtn.classList.add('selected-wrong');
      // Highlight the correct option too
      const correctBtn = optionsGrid.querySelector(`[data-option="${correctOption}"]`);
      if (correctBtn) correctBtn.classList.add('selected-correct');
      if (qId) quizAnswers[qId] = false;
    }

    // Auto-reveal explanation if present
    const exp = qCard.querySelector('.explanation-card');
    if (exp) exp.classList.add('visible');

    // Update Quiz Overall Score Card if exists
    calculateQuizScore();
  });

  function calculateQuizScore() {
    const scoreDisplay = document.getElementById('quiz-score-display');
    const scoreBadge = document.getElementById('quiz-badge-display');
    if (!scoreDisplay) return;

    const totalQuestions = document.querySelectorAll('[data-question-id]').length;
    const answeredCount = Object.keys(quizAnswers).length;
    let correctCount = 0;

    Object.values(quizAnswers).forEach(val => {
      if (val === true) correctCount++;
    });

    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    scoreDisplay.innerHTML = `Score: <strong>${correctCount} / ${totalQuestions}</strong> (${percentage}%)`;

    if (scoreBadge) {
      if (percentage >= 80) {
        scoreBadge.className = 'pill-badge';
        scoreBadge.style.background = '#DCFCE7';
        scoreBadge.style.color = '#16A33A';
        scoreBadge.textContent = '🌟 Excellent Work!';
      } else if (percentage >= 60) {
        scoreBadge.className = 'pill-badge';
        scoreBadge.style.background = '#FEF3C7';
        scoreBadge.style.color = '#D97706';
        scoreBadge.textContent = '👍 Good Job — Keep Practicing!';
      } else {
        scoreBadge.className = 'pill-badge';
        scoreBadge.style.background = '#FEE2E2';
        scoreBadge.style.color = '#DC2626';
        scoreBadge.textContent = '📖 Needs Revision — Review Key Concepts!';
      }
    }
  }

  // Handle Hash Changes
  window.addEventListener('hashchange', () => {
    const targetIdx = getSlideIndexFromHash();
    if (targetIdx !== currentSlideIndex) {
      goToSlide(targetIdx);
    }
  });

  // Initial Load
  const initialIndex = getSlideIndexFromHash();
  goToSlide(initialIndex);

  // Initialize Lucide Icons & Highlight.js if available
  if (window.lucide) {
    lucide.createIcons();
  }
  if (window.hljs) {
    hljs.highlightAll();
  }

  // ==========================================================================
  // NODE.JS EVENT LOOP WORKING SIMULATOR ENGINE
  // ==========================================================================
  const NODE_SIM_SCENARIOS = {
    'sim-1': {
      title: "Scenario 1: Basic Timers (setTimeout)",
      codeLines: [
        'console.log("A");',
        'setTimeout(() => {',
        '    console.log("B");',
        '}, 0);',
        'console.log("C");'
      ],
      steps: [
        {
          lineIndex: -1,
          callStack: [],
          nextTickQueue: [],
          microtaskQueue: [],
          timers: [],
          pollQueue: [],
          checkQueue: [],
          closeQueue: [],
          ioOps: [],
          currentPhase: 'MAIN SCRIPT',
          output: [],
          log: '[00] Simulation initialized. Click Next or Play to begin.'
        },
        {
          lineIndex: 0,
          callStack: ['main()', 'console.log("A")'],
          nextTickQueue: [],
          microtaskQueue: [],
          timers: [],
          pollQueue: [],
          checkQueue: [],
          closeQueue: [],
          ioOps: [],
          currentPhase: 'MAIN SCRIPT',
          output: ['A'],
          log: '[01] Executed line 1: console.log("A"). Printed "A".'
        },
        {
          lineIndex: 1,
          callStack: ['main()', 'setTimeout(cb, 0)'],
          nextTickQueue: [],
          microtaskQueue: [],
          timers: ['Timer(cb, 0ms) [Pending]'],
          pollQueue: [],
          checkQueue: [],
          closeQueue: [],
          ioOps: [],
          currentPhase: 'MAIN SCRIPT',
          output: ['A'],
          log: '[02] Executed setTimeout(). Callback registered with libuv timers.'
        },
        {
          lineIndex: 4,
          callStack: ['main()', 'console.log("C")'],
          nextTickQueue: [],
          microtaskQueue: [],
          timers: ['Timer(cb, 0ms) [Ready]'],
          pollQueue: [],
          checkQueue: [],
          closeQueue: [],
          ioOps: [],
          currentPhase: 'MAIN SCRIPT',
          output: ['A', 'C'],
          log: '[03] Executed line 5: console.log("C"). Printed "C".'
        },
        {
          lineIndex: -1,
          callStack: [],
          nextTickQueue: [],
          microtaskQueue: [],
          timers: ['Timer(cb, 0ms) [Ready]'],
          pollQueue: [],
          checkQueue: [],
          closeQueue: [],
          ioOps: [],
          currentPhase: 'MAIN SCRIPT',
          output: ['A', 'C'],
          log: '[04] Main script execution finished. Call Stack is now empty.'
        },
        {
          lineIndex: -1,
          callStack: [],
          nextTickQueue: [],
          microtaskQueue: [],
          timers: [],
          pollQueue: [],
          checkQueue: [],
          closeQueue: [],
          ioOps: [],
          currentPhase: 'TIMERS PHASE',
          output: ['A', 'C'],
          log: '[05] Event Loop enters TIMERS phase. Eligible timer callback found!'
        },
        {
          lineIndex: 2,
          callStack: ['cb()', 'console.log("B")'],
          nextTickQueue: [],
          microtaskQueue: [],
          timers: [],
          pollQueue: [],
          checkQueue: [],
          closeQueue: [],
          ioOps: [],
          currentPhase: 'TIMERS PHASE',
          output: ['A', 'C', 'B'],
          log: '[06] Executed timer callback: console.log("B"). Printed "B".'
        },
        {
          lineIndex: -1,
          callStack: [],
          nextTickQueue: [],
          microtaskQueue: [],
          timers: [],
          pollQueue: [],
          checkQueue: [],
          closeQueue: [],
          ioOps: [],
          currentPhase: 'POLL PHASE',
          output: ['A', 'C', 'B'],
          log: '[07] Event loop moves through Poll phase. No further callbacks. Done!'
        }
      ]
    },
    'sim-2': {
      title: "Scenario 2: process.nextTick() vs Promise vs setTimeout",
      codeLines: [
        'console.log("A");',
        'process.nextTick(() => console.log("B"));',
        'Promise.resolve().then(() => console.log("C"));',
        'console.log("D");'
      ],
      steps: [
        {
          lineIndex: -1,
          callStack: [],
          nextTickQueue: [],
          microtaskQueue: [],
          timers: [],
          pollQueue: [],
          checkQueue: [],
          closeQueue: [],
          ioOps: [],
          currentPhase: 'MAIN SCRIPT',
          output: [],
          log: '[00] Simulation initialized.'
        },
        {
          lineIndex: 0,
          callStack: ['main()', 'console.log("A")'],
          nextTickQueue: [],
          microtaskQueue: [],
          timers: [],
          pollQueue: [],
          checkQueue: [],
          closeQueue: [],
          ioOps: [],
          currentPhase: 'MAIN SCRIPT',
          output: ['A'],
          log: '[01] Executed console.log("A"). Printed "A".'
        },
        {
          lineIndex: 1,
          callStack: ['main()', 'process.nextTick()'],
          nextTickQueue: ['nextTick(cb: "B")'],
          microtaskQueue: [],
          timers: [],
          pollQueue: [],
          checkQueue: [],
          closeQueue: [],
          ioOps: [],
          currentPhase: 'MAIN SCRIPT',
          output: ['A'],
          log: '[02] process.nextTick() scheduled. Enqueued into NextTick Queue.'
        },
        {
          lineIndex: 2,
          callStack: ['main()', 'Promise.then()'],
          nextTickQueue: ['nextTick(cb: "B")'],
          microtaskQueue: ['Promise.then(cb: "C")'],
          timers: [],
          pollQueue: [],
          checkQueue: [],
          closeQueue: [],
          ioOps: [],
          currentPhase: 'MAIN SCRIPT',
          output: ['A'],
          log: '[03] Promise resolved. Callback enqueued into Microtask Queue.'
        },
        {
          lineIndex: 3,
          callStack: ['main()', 'console.log("D")'],
          nextTickQueue: ['nextTick(cb: "B")'],
          microtaskQueue: ['Promise.then(cb: "C")'],
          timers: [],
          pollQueue: [],
          checkQueue: [],
          closeQueue: [],
          ioOps: [],
          currentPhase: 'MAIN SCRIPT',
          output: ['A', 'D'],
          log: '[04] Executed console.log("D"). Printed "D".'
        },
        {
          lineIndex: -1,
          callStack: [],
          nextTickQueue: ['nextTick(cb: "B")'],
          microtaskQueue: ['Promise.then(cb: "C")'],
          timers: [],
          pollQueue: [],
          checkQueue: [],
          closeQueue: [],
          ioOps: [],
          currentPhase: 'MAIN SCRIPT',
          output: ['A', 'D'],
          log: '[05] Main script complete. Checking priority queues before event loop phase transition...'
        },
        {
          lineIndex: 1,
          callStack: ['nextTickCallback()', 'console.log("B")'],
          nextTickQueue: [],
          microtaskQueue: ['Promise.then(cb: "C")'],
          timers: [],
          pollQueue: [],
          checkQueue: [],
          closeQueue: [],
          ioOps: [],
          currentPhase: 'NEXTTICK DRAIN',
          output: ['A', 'D', 'B'],
          log: '[06] High-priority NextTick Queue drained first. Printed "B".'
        },
        {
          lineIndex: 2,
          callStack: ['promiseCallback()', 'console.log("C")'],
          nextTickQueue: [],
          microtaskQueue: [],
          timers: [],
          pollQueue: [],
          checkQueue: [],
          closeQueue: [],
          ioOps: [],
          currentPhase: 'MICROTASK DRAIN',
          output: ['A', 'D', 'B', 'C'],
          log: '[07] Microtask Queue drained next. Printed "C". Final sequence: A, D, B, C.'
        }
      ]
    },
    'sim-3': {
      title: "Scenario 3: setTimeout(0) vs setImmediate() Context",
      codeLines: [
        'setImmediate(() => {',
        '    console.log("immediate");',
        '});',
        'setTimeout(() => {',
        '    console.log("timeout");',
        '}, 0);'
      ],
      steps: [
        {
          lineIndex: -1,
          callStack: [],
          nextTickQueue: [],
          microtaskQueue: [],
          timers: [],
          pollQueue: [],
          checkQueue: [],
          closeQueue: [],
          ioOps: [],
          currentPhase: 'MAIN SCRIPT',
          output: [],
          log: '[00] Simulation initialized. Note: Order in main module depends on process start timing.'
        },
        {
          lineIndex: 0,
          callStack: ['main()', 'setImmediate()'],
          nextTickQueue: [],
          microtaskQueue: [],
          timers: [],
          pollQueue: [],
          checkQueue: ['setImmediate(cb: "immediate")'],
          closeQueue: [],
          ioOps: [],
          currentPhase: 'MAIN SCRIPT',
          output: [],
          log: '[01] setImmediate registered into CHECK phase queue.'
        },
        {
          lineIndex: 3,
          callStack: ['main()', 'setTimeout(0)'],
          nextTickQueue: [],
          microtaskQueue: [],
          timers: ['Timer(cb: "timeout")'],
          pollQueue: [],
          checkQueue: ['setImmediate(cb: "immediate")'],
          closeQueue: [],
          ioOps: [],
          currentPhase: 'MAIN SCRIPT',
          output: [],
          log: '[02] setTimeout(0) registered into TIMERS phase queue.'
        },
        {
          lineIndex: -1,
          callStack: [],
          nextTickQueue: [],
          microtaskQueue: [],
          timers: ['Timer(cb: "timeout")'],
          pollQueue: [],
          checkQueue: ['setImmediate(cb: "immediate")'],
          closeQueue: [],
          ioOps: [],
          currentPhase: 'TIMERS PHASE',
          output: [],
          log: '[03] Entering TIMERS phase. If timer loop preparation took >= 1ms, timer runs first!'
        },
        {
          lineIndex: 4,
          callStack: ['timerCb()', 'console.log("timeout")'],
          nextTickQueue: [],
          microtaskQueue: [],
          timers: [],
          pollQueue: [],
          checkQueue: ['setImmediate(cb: "immediate")'],
          closeQueue: [],
          ioOps: [],
          currentPhase: 'TIMERS PHASE',
          output: ['timeout (or immediate depending on startup speed)'],
          log: '[04] Executed timer callback. Printed "timeout".'
        },
        {
          lineIndex: -1,
          callStack: [],
          nextTickQueue: [],
          microtaskQueue: [],
          timers: [],
          pollQueue: [],
          checkQueue: ['setImmediate(cb: "immediate")'],
          closeQueue: [],
          ioOps: [],
          currentPhase: 'CHECK PHASE',
          output: ['timeout', 'immediate'],
          log: '[05] Moving to CHECK phase. Executing setImmediate callback. Printed "immediate".'
        }
      ]
    },
    'sim-4': {
      title: "Scenario 4: I/O Callback Context (fs.readFile)",
      codeLines: [
        'fs.readFile(__filename, () => {',
        '    setTimeout(() => console.log("timeout"), 0);',
        '    setImmediate(() => console.log("immediate"));',
        '});'
      ],
      steps: [
        {
          lineIndex: -1,
          callStack: [],
          nextTickQueue: [],
          microtaskQueue: [],
          timers: [],
          pollQueue: [],
          checkQueue: [],
          closeQueue: [],
          ioOps: [],
          currentPhase: 'MAIN SCRIPT',
          output: [],
          log: '[00] Initialized I/O scenario.'
        },
        {
          lineIndex: 0,
          callStack: ['main()', 'fs.readFile()'],
          nextTickQueue: [],
          microtaskQueue: [],
          timers: [],
          pollQueue: [],
          checkQueue: [],
          closeQueue: [],
          ioOps: ['libuv ThreadPool: fs.readFile()'],
          currentPhase: 'MAIN SCRIPT',
          output: [],
          log: '[01] fs.readFile offloaded to libuv Thread Pool for async disk reading.'
        },
        {
          lineIndex: -1,
          callStack: [],
          nextTickQueue: [],
          microtaskQueue: [],
          timers: [],
          pollQueue: ['Poll: fs.readFile callback ready'],
          checkQueue: [],
          closeQueue: [],
          ioOps: [],
          currentPhase: 'POLL PHASE',
          output: [],
          log: '[02] Disk I/O complete! Callback pushed to POLL phase queue.'
        },
        {
          lineIndex: 1,
          callStack: ['readFileCallback()', 'setTimeout(0)'],
          nextTickQueue: [],
          microtaskQueue: [],
          timers: ['Timer(cb: "timeout")'],
          pollQueue: [],
          checkQueue: [],
          closeQueue: [],
          ioOps: [],
          currentPhase: 'POLL PHASE',
          output: [],
          log: '[03] Inside I/O callback: setTimeout(0) enqueued into TIMERS.'
        },
        {
          lineIndex: 2,
          callStack: ['readFileCallback()', 'setImmediate()'],
          nextTickQueue: [],
          microtaskQueue: [],
          timers: ['Timer(cb: "timeout")'],
          pollQueue: [],
          checkQueue: ['setImmediate(cb: "immediate")'],
          closeQueue: [],
          ioOps: [],
          currentPhase: 'POLL PHASE',
          output: [],
          log: '[04] Inside I/O callback: setImmediate enqueued into CHECK.'
        },
        {
          lineIndex: -1,
          callStack: [],
          nextTickQueue: [],
          microtaskQueue: [],
          timers: ['Timer(cb: "timeout")'],
          pollQueue: [],
          checkQueue: ['setImmediate(cb: "immediate")'],
          closeQueue: [],
          ioOps: [],
          currentPhase: 'CHECK PHASE',
          output: [],
          log: '[05] POLL phase completes and ALWAYS advances immediately to CHECK phase next!'
        },
        {
          lineIndex: 2,
          callStack: ['immediateCb()', 'console.log("immediate")'],
          nextTickQueue: [],
          microtaskQueue: [],
          timers: ['Timer(cb: "timeout")'],
          pollQueue: [],
          checkQueue: [],
          closeQueue: [],
          ioOps: [],
          currentPhase: 'CHECK PHASE',
          output: ['immediate'],
          log: '[06] CHECK phase executes setImmediate. Printed "immediate".'
        },
        {
          lineIndex: 1,
          callStack: ['timeoutCb()', 'console.log("timeout")'],
          nextTickQueue: [],
          microtaskQueue: [],
          timers: [],
          pollQueue: [],
          checkQueue: [],
          closeQueue: [],
          ioOps: [],
          currentPhase: 'TIMERS PHASE',
          output: ['immediate', 'timeout'],
          log: '[07] Loop wraps around to TIMERS phase. Printed "timeout". In I/O context, immediate ALWAYS runs first!'
        }
      ]
    },
    'sim-5': {
      title: "Scenario 5: Async / Await Execution",
      codeLines: [
        'async function test() {',
        '    console.log("A");',
        '    await Promise.resolve();',
        '    console.log("B");',
        '}',
        'console.log("C");',
        'test();',
        'console.log("D");'
      ],
      steps: [
        {
          lineIndex: -1,
          callStack: [],
          nextTickQueue: [],
          microtaskQueue: [],
          timers: [],
          pollQueue: [],
          checkQueue: [],
          closeQueue: [],
          ioOps: [],
          currentPhase: 'MAIN SCRIPT',
          output: [],
          log: '[00] Simulation initialized for async/await.'
        },
        {
          lineIndex: 5,
          callStack: ['main()', 'console.log("C")'],
          nextTickQueue: [],
          microtaskQueue: [],
          timers: [],
          pollQueue: [],
          checkQueue: [],
          closeQueue: [],
          ioOps: [],
          currentPhase: 'MAIN SCRIPT',
          output: ['C'],
          log: '[01] Executed console.log("C"). Printed "C".'
        },
        {
          lineIndex: 6,
          callStack: ['main()', 'test()', 'console.log("A")'],
          nextTickQueue: [],
          microtaskQueue: [],
          timers: [],
          pollQueue: [],
          checkQueue: [],
          closeQueue: [],
          ioOps: [],
          currentPhase: 'MAIN SCRIPT',
          output: ['C', 'A'],
          log: '[02] Entered test(). Executed synchronous line 2: console.log("A"). Printed "A".'
        },
        {
          lineIndex: 2,
          callStack: ['main()', 'test()', 'await Promise.resolve()'],
          nextTickQueue: [],
          microtaskQueue: ['async continuation: test() [line 4]'],
          timers: [],
          pollQueue: [],
          checkQueue: [],
          closeQueue: [],
          ioOps: [],
          currentPhase: 'MAIN SCRIPT',
          output: ['C', 'A'],
          log: '[03] await pauses test(). Remaining continuation scheduled as Microtask.'
        },
        {
          lineIndex: 7,
          callStack: ['main()', 'console.log("D")'],
          nextTickQueue: [],
          microtaskQueue: ['async continuation: test() [line 4]'],
          timers: [],
          pollQueue: [],
          checkQueue: [],
          closeQueue: [],
          ioOps: [],
          currentPhase: 'MAIN SCRIPT',
          output: ['C', 'A', 'D'],
          log: '[04] Main thread unblocks and continues. Executed console.log("D"). Printed "D".'
        },
        {
          lineIndex: 3,
          callStack: ['test() continuation', 'console.log("B")'],
          nextTickQueue: [],
          microtaskQueue: [],
          timers: [],
          pollQueue: [],
          checkQueue: [],
          closeQueue: [],
          ioOps: [],
          currentPhase: 'MICROTASK DRAIN',
          output: ['C', 'A', 'D', 'B'],
          log: '[05] Main script done. Microtask queue drained. Executed line 4: console.log("B"). Printed "B". Final: C, A, D, B.'
        }
      ]
    }
  };

  // State Management for Simulator
  let activeScenarioId = 'sim-1';
  let activeStepIdx = 0;
  let simTimer = null;
  let simSpeedMs = 1200;

  // UI Elements for Simulator
  const scenarioSelect = document.getElementById('node-sim-scenario-select');
  const btnPrevStep = document.getElementById('sim-btn-prev');
  const btnNextStep = document.getElementById('sim-btn-next');
  const btnPlayPause = document.getElementById('sim-btn-play');
  const btnReset = document.getElementById('sim-btn-reset');
  const speedSelect = document.getElementById('sim-speed-select');
  const stepBadge = document.getElementById('sim-step-badge');

  const simCodeBox = document.getElementById('sim-code-display');
  const simStackBox = document.getElementById('sim-stack-display');
  const simNextTickBox = document.getElementById('sim-nexttick-display');
  const simMicrotaskBox = document.getElementById('sim-microtask-display');
  const simTimersBox = document.getElementById('sim-timers-display');
  const simPollBox = document.getElementById('sim-poll-display');
  const simCheckBox = document.getElementById('sim-check-display');
  const simConsoleOut = document.getElementById('sim-console-output');
  const simLogOut = document.getElementById('sim-log-output');

  const phaseNodes = {
    'TIMERS PHASE': document.getElementById('phase-timers'),
    'PENDING CALLBACKS': document.getElementById('phase-pending'),
    'POLL PHASE': document.getElementById('phase-poll'),
    'CHECK PHASE': document.getElementById('phase-check'),
    'CLOSE CALLBACKS': document.getElementById('phase-close')
  };

  function initNodeSimulator() {
    if (!scenarioSelect) return;

    scenarioSelect.addEventListener('change', (e) => {
      activeScenarioId = e.target.value;
      resetSim();
    });

    if (btnPrevStep) btnPrevStep.addEventListener('click', prevStep);
    if (btnNextStep) btnNextStep.addEventListener('click', nextStep);
    if (btnPlayPause) btnPlayPause.addEventListener('click', togglePlay);
    if (btnReset) btnReset.addEventListener('click', resetSim);

    if (speedSelect) {
      speedSelect.addEventListener('change', (e) => {
        simSpeedMs = parseInt(e.target.value, 10);
        if (simTimer) {
          pauseSim();
          playSim();
        }
      });
    }

    renderCurrentStep();
  }

  function renderCurrentStep() {
    const scenario = NODE_SIM_SCENARIOS[activeScenarioId];
    if (!scenario) return;

    const step = scenario.steps[activeStepIdx];
    if (!step) return;

    // Update Step Counter Badge
    if (stepBadge) {
      stepBadge.textContent = `STEP ${String(activeStepIdx + 1).padStart(2, '0')} / ${String(scenario.steps.length).padStart(2, '0')}`;
    }

    // Render Code Editor
    if (simCodeBox) {
      simCodeBox.innerHTML = scenario.codeLines.map((line, idx) => {
        const isActive = idx === step.lineIndex ? ' active-line' : '';
        return `<div class="sim-code-line${isActive}"><span style="color:#64748B; margin-right:0.6rem;">${idx + 1}</span>${escapeHTML(line)}</div>`;
      }).join('');
    }

    // Render Call Stack
    if (simStackBox) {
      if (step.callStack.length === 0) {
        simStackBox.innerHTML = `<span class="empty-state-text">Stack Empty (Thread Idle)</span>`;
      } else {
        simStackBox.innerHTML = step.callStack.map(fn => `<div class="stack-item"><span>⚡ ${escapeHTML(fn)}</span></div>`).join('');
      }
    }

    // Render Priority Queues
    if (simNextTickBox) {
      if (step.nextTickQueue.length === 0) {
        simNextTickBox.innerHTML = `<span class="empty-state-text">Empty</span>`;
      } else {
        simNextTickBox.innerHTML = step.nextTickQueue.map(item => `<div class="queue-item nexttick-item"><span>${escapeHTML(item)}</span></div>`).join('');
      }
    }

    if (simMicrotaskBox) {
      if (step.microtaskQueue.length === 0) {
        simMicrotaskBox.innerHTML = `<span class="empty-state-text">Empty</span>`;
      } else {
        simMicrotaskBox.innerHTML = step.microtaskQueue.map(item => `<div class="queue-item microtask-item"><span>${escapeHTML(item)}</span></div>`).join('');
      }
    }

    // Render Phase Queues
    if (simTimersBox) {
      simTimersBox.innerHTML = step.timers.length === 0 
        ? `<span class="empty-state-text">No timers</span>` 
        : step.timers.map(t => `<div class="queue-item">⏱️ ${escapeHTML(t)}</div>`).join('');
    }

    if (simPollBox) {
      simPollBox.innerHTML = step.pollQueue.length === 0 
        ? `<span class="empty-state-text">No I/O callbacks</span>` 
        : step.pollQueue.map(p => `<div class="queue-item">📡 ${escapeHTML(p)}</div>`).join('');
    }

    if (simCheckBox) {
      simCheckBox.innerHTML = step.checkQueue.length === 0 
        ? `<span class="empty-state-text">No setImmediate</span>` 
        : step.checkQueue.map(c => `<div class="queue-item">⚡ ${escapeHTML(c)}</div>`).join('');
    }

    // Update Event Loop Phase Indicators
    Object.keys(phaseNodes).forEach(pName => {
      const el = phaseNodes[pName];
      if (el) {
        if (step.currentPhase === pName) {
          el.classList.add('active-phase');
        } else {
          el.classList.remove('active-phase');
        }
      }
    });

    // Render Console Output
    if (simConsoleOut) {
      if (step.output.length === 0) {
        simConsoleOut.innerHTML = `<span style="color:#64748B; font-style:italic;">No stdout output yet...</span>`;
      } else {
        simConsoleOut.innerHTML = step.output.map(out => `<div>&gt; ${escapeHTML(out)}</div>`).join('');
      }
      simConsoleOut.scrollTop = simConsoleOut.scrollHeight;
    }

    // Render Execution Audit Log
    if (simLogOut) {
      const logs = scenario.steps.slice(0, activeStepIdx + 1).map(s => s.log);
      simLogOut.innerHTML = logs.map(l => `<div>${escapeHTML(l)}</div>`).join('');
      simLogOut.scrollTop = simLogOut.scrollHeight;
    }
  }

  function nextStep() {
    const scenario = NODE_SIM_SCENARIOS[activeScenarioId];
    if (!scenario) return;
    if (activeStepIdx < scenario.steps.length - 1) {
      activeStepIdx++;
      renderCurrentStep();
    } else {
      pauseSim();
    }
  }

  function prevStep() {
    if (activeStepIdx > 0) {
      activeStepIdx--;
      renderCurrentStep();
    }
  }

  function togglePlay() {
    if (simTimer) {
      pauseSim();
    } else {
      playSim();
    }
  }

  function playSim() {
    const scenario = NODE_SIM_SCENARIOS[activeScenarioId];
    if (!scenario) return;

    if (activeStepIdx >= scenario.steps.length - 1) {
      activeStepIdx = 0;
    }

    if (btnPlayPause) {
      btnPlayPause.innerHTML = `<i data-lucide="pause"></i> Pause`;
      if (window.lucide) lucide.createIcons();
    }

    simTimer = setInterval(() => {
      if (activeStepIdx < scenario.steps.length - 1) {
        nextStep();
      } else {
        pauseSim();
      }
    }, simSpeedMs);
  }

  function pauseSim() {
    if (simTimer) {
      clearInterval(simTimer);
      simTimer = null;
    }
    if (btnPlayPause) {
      btnPlayPause.innerHTML = `<i data-lucide="play"></i> Play`;
      if (window.lucide) lucide.createIcons();
    }
  }

  function resetSim() {
    pauseSim();
    activeStepIdx = 0;
    renderCurrentStep();
  }

  // Initialize simulator
  initNodeSimulator();

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

  // ==========================================================================
  // INTERACTIVE MIDDLEWARE FLOW SIMULATOR
  // ==========================================================================
  document.addEventListener('click', (e) => {
    const mwNode = e.target.closest('.mw-step-node');
    if (!mwNode) return;

    const container = mwNode.closest('.middleware-sim-container');
    if (!container) return;

    const allNodes = container.querySelectorAll('.mw-step-node');
    allNodes.forEach(node => node.classList.remove('active-mw'));
    mwNode.classList.add('active-mw');

    const descBox = container.querySelector('#mw-active-desc');
    const stepName = mwNode.getAttribute('data-mw-step');

    if (descBox) {
      const descriptions = {
        'logger': '<strong>1. Logger Middleware:</strong> Logs incoming HTTP request details (Method: GET, URL: /api/users, Timestamp). Calls <code>next()</code>.',
        'auth': '<strong>2. Auth Middleware:</strong> Inspects <code>req.headers.authorization</code> or session cookie. If valid, attaches <code>req.user</code> and calls <code>next()</code>. If invalid, sends <code>res.status(401)</code>.',
        'validation': '<strong>3. Input Validation:</strong> Validates <code>req.body</code> fields against schema rules. Calls <code>next()</code> or <code>next(validationError)</code>.',
        'controller': '<strong>4. Controller Handler:</strong> Invokes service layer, queries database, and constructs final HTTP response JSON.',
        'response': '<strong>5. HTTP Response:</strong> Sends HTTP 200 OK status code with JSON payload back to client browser/Postman.'
      };
      descBox.innerHTML = descriptions[stepName] || 'Select a middleware step above to inspect signature parameters and flow.';
    }
  });

  // Helper function
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


