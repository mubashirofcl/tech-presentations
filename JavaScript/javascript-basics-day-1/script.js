/**
 * JavaScript Fundamentals – Day 1, 2 & 3 (Combined)
 * Presentation Engine & Interactive Sandboxes Controller
 * Total Slides: 30
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Presentation State ---
  const totalSlides = 30;
  let currentSlide = 1;

  // DOM Elements
  const slides = document.querySelectorAll('.slide');
  const slideCounter = document.getElementById('slideCounter');
  const progressBar = document.getElementById('progressBar');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const slideSelect = document.getElementById('slideSelect');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const tocBtn = document.getElementById('tocBtn');
  const tocClose = document.getElementById('tocClose');
  const tocOverlay = document.getElementById('tocOverlay');
  const tocList = document.getElementById('tocList');
  const helpBtn = document.getElementById('helpBtn');
  const helpClose = document.getElementById('helpClose');
  const helpModal = document.getElementById('helpModal');
  const toastNotice = document.getElementById('toastNotice');

  // Exact 30 Slide Titles
  const slideTitles = [
    "Introduction to JavaScript",
    "What Is JavaScript?",
    "How to Run JavaScript",
    "Variables – var, let and const",
    "Practical: Student Profile",
    "What Are Functions?",
    "Function Parameters and Arguments",
    "Return Statement",
    "Types of Functions",
    "ES6: Arrow Functions",
    "ES6: Template Literals",
    "Arithmetic Operators",
    "Comparison Operators – == vs ===",
    "Logical Operators – &&, ||, !",
    "Truthy and Falsy Values",
    "Conditional Statements: if and else",
    "switch and Ternary Operator",
    "Introduction to Arrays",
    "Basic Array Operations",
    "Introduction to Objects",
    "Accessing and Modifying Object Properties",
    "Object.keys, Object.values, Object.entries",
    "Nested Objects",
    "JSON-Style Objects",
    "Understanding Scope",
    "Introduction to Closures",
    "Practical Closure: Counter",
    "What Is the JavaScript Event Loop?",
    "Call Stack and Web APIs",
    "Callback Queue, Microtask Queue and Event Loop"
  ];

  // Initialize Navigation & Dropdown
  function initNavigation() {
    if (slideSelect) {
      slideSelect.innerHTML = '';
      for (let i = 1; i <= totalSlides; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i}. ${slideTitles[i - 1] || 'Slide ' + i}`;
        slideSelect.appendChild(option);
      }
    }

    if (tocList) {
      tocList.innerHTML = '';
      slideTitles.forEach((title, idx) => {
        const li = document.createElement('li');
        li.className = 'toc-item';
        li.dataset.slide = idx + 1;
        li.innerHTML = `
          <span class="toc-num">${idx + 1}</span>
          <span class="toc-label">${title}</span>
        `;
        li.addEventListener('click', () => {
          goToSlide(idx + 1);
          closeTOC();
        });
        tocList.appendChild(li);
      });
    }

    // Check URL Hash for direct slide link
    const hash = window.location.hash;
    if (hash) {
      const match = hash.match(/slide-(\d+)/);
      if (match) {
        const parsed = parseInt(match[1], 10);
        if (parsed >= 1 && parsed <= totalSlides) {
          currentSlide = parsed;
        }
      }
    }
    updateSlideView();
  }

  // Go to specific slide
  function goToSlide(slideNum) {
    if (slideNum < 1) slideNum = 1;
    if (slideNum > totalSlides) slideNum = totalSlides;

    currentSlide = slideNum;
    window.location.hash = `slide-${currentSlide}`;
    updateSlideView();
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

  // Update DOM when slide changes
  function updateSlideView() {
    slides.forEach((s, idx) => {
      const slideIndex = idx + 1;
      if (slideIndex === currentSlide) {
        s.classList.add('active');
        s.scrollTop = 0;
      } else {
        s.classList.remove('active');
      }
    });

    if (slideCounter) {
      slideCounter.textContent = `${currentSlide} / ${totalSlides}`;
    }

    if (progressBar) {
      const pct = (currentSlide / totalSlides) * 100;
      progressBar.style.width = `${pct}%`;
    }

    if (prevBtn) prevBtn.disabled = currentSlide === 1;
    if (nextBtn) nextBtn.disabled = currentSlide === totalSlides;

    if (slideSelect) slideSelect.value = currentSlide;

    // Update TOC active state
    if (tocList) {
      const items = tocList.querySelectorAll('.toc-item');
      items.forEach(item => {
        if (parseInt(item.dataset.slide, 10) === currentSlide) {
          item.classList.add('current');
        } else {
          item.classList.remove('current');
        }
      });
    }
  }

  // Fullscreen Handler
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        showToast('Fullscreen request failed');
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  // Table of Contents Drawer
  function openTOC() {
    if (tocOverlay) tocOverlay.classList.add('active');
  }

  function closeTOC() {
    if (tocOverlay) tocOverlay.classList.remove('active');
  }

  // Help Modal
  function openHelp() {
    if (helpModal) helpModal.classList.add('active');
  }

  function closeHelp() {
    if (helpModal) helpModal.classList.remove('active');
  }

  // Toast Notification
  function showToast(msg) {
    if (!toastNotice) return;
    toastNotice.textContent = msg;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 2200);
  }

  // --- Event Listeners ---
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);
  if (tocBtn) tocBtn.addEventListener('click', openTOC);
  if (tocClose) tocClose.addEventListener('click', closeTOC);
  if (helpBtn) helpBtn.addEventListener('click', openHelp);
  if (helpClose) helpClose.addEventListener('click', closeHelp);

  if (slideSelect) {
    slideSelect.addEventListener('change', (e) => {
      goToSlide(parseInt(e.target.value, 10));
    });
  }

  // Close overlays on backdrop click
  if (tocOverlay) {
    tocOverlay.addEventListener('click', (e) => {
      if (e.target === tocOverlay) closeTOC();
    });
  }
  if (helpModal) {
    helpModal.addEventListener('click', (e) => {
      if (e.target === helpModal) closeHelp();
    });
  }

  // Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    // If inside an input field, do not hijack typing
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
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
        goToSlide(totalSlides);
        break;

      case 'f':
      case 'F':
        e.preventDefault();
        toggleFullscreen();
        break;

      case 't':
      case 'T':
        e.preventDefault();
        if (tocOverlay && tocOverlay.classList.contains('active')) closeTOC();
        else openTOC();
        break;

      case '?':
        e.preventDefault();
        if (helpModal && helpModal.classList.contains('active')) closeHelp();
        else openHelp();
        break;

      case 'Escape':
        closeTOC();
        closeHelp();
        break;
    }
  });

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;
  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff < 0) nextSlide();
      else prevSlide();
    }
  }, { passive: true });

  // Initialize
  initNavigation();

  // =========================================================================
  // --- INTERACTIVE SANDBOXES & HANDLERS ---
  // =========================================================================

  // --- Sandbox 1: Slide 3 Live Console Runner ---
  const btnRunS3 = document.getElementById('btnRunS3');
  const outS3 = document.getElementById('outS3');
  if (btnRunS3 && outS3) {
    btnRunS3.addEventListener('click', () => {
      outS3.innerHTML = '<code>> Hello JavaScript<br>> 30</code>';
      showToast('Executed code in browser console!');
    });
  }

  // --- Sandbox 2: Slide 4 Reassignment Tester ---
  const btnTestLet = document.getElementById('btnTestLet');
  const btnTestConst = document.getElementById('btnTestConst');
  const outVarTest = document.getElementById('outVarTest');
  if (btnTestLet && btnTestConst && outVarTest) {
    btnTestLet.addEventListener('click', () => {
      outVarTest.innerHTML = '<span style="color:#059669; font-weight:700;">let age = 22; age = 23;</span><br>Output: 23 (Reassignment succeeded because let is mutable)';
    });
    btnTestConst.addEventListener('click', () => {
      outVarTest.innerHTML = '<span style="color:#DC2626; font-weight:700;">const country = "India"; country = "USA";</span><br><span style="color:#DC2626;">TypeError: Assignment to constant variable! (const protects data from accidental modification)</span>';
    });
  }

  // --- Sandbox 3: Slide 5 Student Profile Live Updater ---
  const s5UpdateBtn = document.getElementById('s5UpdateBtn');
  const s5NameIn = document.getElementById('s5NameIn');
  const s5MarksIn = document.getElementById('s5MarksIn');
  const s5LiveOut = document.getElementById('s5LiveOut');
  if (s5UpdateBtn && s5NameIn && s5MarksIn && s5LiveOut) {
    s5UpdateBtn.addEventListener('click', () => {
      const name = s5NameIn.value.trim() || 'Arun';
      const marks = s5MarksIn.value || '85';
      s5LiveOut.textContent = `Name: ${name} | Marks: ${marks}`;
      showToast('Updated student profile in memory!');
    });
  }

  // --- Sandbox 4: Slide 19 Fruit Array Visualizer ---
  let fruitsState = ['Apple', 'Banana'];
  const fruitTray = document.getElementById('fruitTray');
  const btnPushFruit = document.getElementById('btnPushFruit');
  const btnPopFruit = document.getElementById('btnPopFruit');
  const btnUnshiftFruit = document.getElementById('btnUnshiftFruit');
  const btnShiftFruit = document.getElementById('btnShiftFruit');

  function renderFruitTray() {
    if (!fruitTray) return;
    fruitTray.innerHTML = '';
    if (fruitsState.length === 0) {
      fruitTray.innerHTML = '<span style="color:#94A3B8; font-size:0.75rem;">Array is empty []</span>';
      return;
    }
    fruitsState.forEach((fruit, idx) => {
      const pill = document.createElement('span');
      pill.className = 'array-pill';
      pill.innerHTML = `<span class="idx">[${idx}]</span> ${fruit}`;
      fruitTray.appendChild(pill);
    });
  }

  if (btnPushFruit) {
    btnPushFruit.addEventListener('click', () => {
      fruitsState.push('Mango');
      renderFruitTray();
      showToast('fruits.push("Mango") -> Added to END');
    });
  }
  if (btnPopFruit) {
    btnPopFruit.addEventListener('click', () => {
      if (fruitsState.length > 0) {
        const removed = fruitsState.pop();
        renderFruitTray();
        showToast(`fruits.pop() -> Removed "${removed}" from END`);
      } else {
        showToast('Array is already empty!');
      }
    });
  }
  if (btnUnshiftFruit) {
    btnUnshiftFruit.addEventListener('click', () => {
      fruitsState.unshift('Orange');
      renderFruitTray();
      showToast('fruits.unshift("Orange") -> Added to BEGINNING');
    });
  }
  if (btnShiftFruit) {
    btnShiftFruit.addEventListener('click', () => {
      if (fruitsState.length > 0) {
        const removed = fruitsState.shift();
        renderFruitTray();
        showToast(`fruits.shift() -> Removed "${removed}" from BEGINNING`);
      } else {
        showToast('Array is already empty!');
      }
    });
  }

  // --- Sandbox 5: Slide 27 Closure Counter ---
  let counterInstance = (() => {
    let count = 0;
    return {
      inc: () => { count++; return count; },
      reset: () => { count = 0; return count; }
    };
  })();

  const btnClickCounter = document.getElementById('btnClickCounter');
  const btnResetCounter = document.getElementById('btnResetCounter');
  const counterDisplay = document.getElementById('counterDisplay');

  if (btnClickCounter && counterDisplay) {
    btnClickCounter.addEventListener('click', () => {
      const val = counterInstance.inc();
      counterDisplay.textContent = `Count: ${val}`;
      showToast(`counter() executed -> returned ${val}`);
    });
  }
  if (btnResetCounter && counterDisplay) {
    btnResetCounter.addEventListener('click', () => {
      counterInstance.reset();
      counterDisplay.textContent = 'Count: 0';
      showToast('Counter reset to 0');
    });
  }

  // --- Sandbox 6: Slide 30 Event Loop Step-by-Step Simulator ---
  const simStack = document.getElementById('simStack');
  const simTaskQueue = document.getElementById('simTaskQueue');
  const simMicrotaskQueue = document.getElementById('simMicrotaskQueue');
  const simConsoleOut = document.getElementById('simConsoleOut');
  const simStepLabel = document.getElementById('simStepLabel');

  const btnSimStep1 = document.getElementById('btnSimStep1');
  const btnSimStep2 = document.getElementById('btnSimStep2');
  const btnSimStep3 = document.getElementById('btnSimStep3');
  const btnSimStep4 = document.getElementById('btnSimStep4');
  const btnSimStep5 = document.getElementById('btnSimStep5');
  const btnSimStep6 = document.getElementById('btnSimStep6');
  const btnSimReset = document.getElementById('btnSimReset');

  let simLogs = [];

  function updateSimLogs(msg) {
    simLogs.push(msg);
    if (simConsoleOut) {
      simConsoleOut.innerHTML = simLogs.map(l => `> ${l}`).join('<br>');
    }
  }

  function resetSim() {
    simLogs = [];
    if (simConsoleOut) simConsoleOut.innerHTML = 'Console: Click Step 1 to trace execution...';
    if (simStepLabel) simStepLabel.textContent = 'Ready: Click Step 1';
    if (simStack) simStack.innerHTML = '<div class="el-token stack">main()</div>';
    if (simTaskQueue) simTaskQueue.innerHTML = '<span style="color:#94A3B8; font-size:0.68rem;">empty</span>';
    if (simMicrotaskQueue) simMicrotaskQueue.innerHTML = '<span style="color:#94A3B8; font-size:0.68rem;">empty</span>';
  }

  if (btnSimReset) {
    btnSimReset.addEventListener('click', resetSim);
  }

  if (btnSimStep1) {
    btnSimStep1.addEventListener('click', () => {
      if (simStepLabel) simStepLabel.textContent = 'Step 1: console.log("Start")';
      if (simStack) simStack.innerHTML = '<div class="el-token stack">console.log("Start")</div><div class="el-token stack">main()</div>';
      setTimeout(() => {
        updateSimLogs('Start');
        if (simStack) simStack.innerHTML = '<div class="el-token stack">main()</div>';
      }, 300);
    });
  }

  if (btnSimStep2) {
    btnSimStep2.addEventListener('click', () => {
      if (simStepLabel) simStepLabel.textContent = 'Step 2: setTimeout(cb, 0)';
      if (simStack) simStack.innerHTML = '<div class="el-token stack">setTimeout(cb, 0)</div><div class="el-token stack">main()</div>';
      setTimeout(() => {
        if (simTaskQueue) simTaskQueue.innerHTML = '<div class="el-token macrotask">setTimeout cb</div>';
        if (simStack) simStack.innerHTML = '<div class="el-token stack">main()</div>';
        showToast('Web API timer completed (0ms) -> Enqueued in Callback Queue!');
      }, 300);
    });
  }

  if (btnSimStep3) {
    btnSimStep3.addEventListener('click', () => {
      if (simStepLabel) simStepLabel.textContent = 'Step 3: Promise.resolve().then(cb)';
      if (simStack) simStack.innerHTML = '<div class="el-token stack">Promise.resolve().then()</div><div class="el-token stack">main()</div>';
      setTimeout(() => {
        if (simMicrotaskQueue) simMicrotaskQueue.innerHTML = '<div class="el-token microtask">Promise cb</div>';
        if (simStack) simStack.innerHTML = '<div class="el-token stack">main()</div>';
        showToast('Promise resolved -> Enqueued in Priority (Microtask) Queue!');
      }, 300);
    });
  }

  if (btnSimStep4) {
    btnSimStep4.addEventListener('click', () => {
      if (simStepLabel) simStepLabel.textContent = 'Step 4: console.log("End")';
      if (simStack) simStack.innerHTML = '<div class="el-token stack">console.log("End")</div><div class="el-token stack">main()</div>';
      setTimeout(() => {
        updateSimLogs('End');
        // Synchronous code finishes: Call Stack is now EMPTY!
        if (simStack) simStack.innerHTML = '<span style="color:#059669; font-size:0.68rem; font-weight:700;">(Stack Empty!)</span>';
        showToast('Call stack is empty! Event Loop checks queues...');
      }, 300);
    });
  }

  if (btnSimStep5) {
    btnSimStep5.addEventListener('click', () => {
      if (simStepLabel) simStepLabel.textContent = 'Step 5: Event Loop runs Microtask (High Priority)';
      if (simStack) simStack.innerHTML = '<div class="el-token microtask">Promise cb</div>';
      if (simMicrotaskQueue) simMicrotaskQueue.innerHTML = '<span style="color:#94A3B8; font-size:0.68rem;">empty</span>';
      setTimeout(() => {
        updateSimLogs('Promise');
        if (simStack) simStack.innerHTML = '<span style="color:#059669; font-size:0.68rem; font-weight:700;">(Stack Empty!)</span>';
        showToast('Microtask queue emptied first!');
      }, 300);
    });
  }

  if (btnSimStep6) {
    btnSimStep6.addEventListener('click', () => {
      if (simStepLabel) simStepLabel.textContent = 'Step 6: Event Loop runs Task Queue item';
      if (simStack) simStack.innerHTML = '<div class="el-token macrotask">setTimeout cb</div>';
      if (simTaskQueue) simTaskQueue.innerHTML = '<span style="color:#94A3B8; font-size:0.68rem;">empty</span>';
      setTimeout(() => {
        updateSimLogs('Timeout');
        if (simStack) simStack.innerHTML = '<span style="color:#059669; font-size:0.68rem; font-weight:700;">(All Done!)</span>';
        showToast('All synchronous code, microtasks, and tasks completed!');
      }, 300);
    });
  }

  // Initial reset of simulator
  resetSim();
});

// Global copy-code utility
window.copyCode = function(btn) {
  const panel = btn.closest('.code-panel');
  if (!panel) return;
  const pre = panel.querySelector('pre');
  if (!pre) return;
  const text = pre.innerText;
  navigator.clipboard.writeText(text).then(() => {
    const originalText = btn.textContent;
    btn.textContent = 'Copied!';
    btn.style.background = '#059669';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
    }, 1800);
  }).catch(() => {
    btn.textContent = 'Failed';
  });
};
