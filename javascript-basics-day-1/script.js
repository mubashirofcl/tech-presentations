/**
 * JavaScript Basics – Day 1: Introduction to JavaScript (for Python Students)
 * Presentation Engine & Interactive Sandboxes Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Presentation State ---
  const totalSlides = 19;
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

  // Slide Metadata for Table of Contents
  const slideTitles = [
    "Introduction to JavaScript",
    "What Is JavaScript?",
    "Python vs JavaScript: Core Differences",
    "How to Run JavaScript Code",
    "What Are Variables?",
    "var, let, and const",
    "Practical: Student Profile",
    "What Is a Function?",
    "Function Parameters and Arguments",
    "Return Statement",
    "Types of Functions in JavaScript",
    "Practical: Create a Calculator Function",
    "What Are Arithmetic Operators?",
    "Understanding Modulus and Increment",
    "Operator Precedence",
    "Practical: Build a Unit Converter",
    "What Is Scope?",
    "What Is a Closure?",
    "Final Practical: Calculator + Unit Converter"
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

    // Check Hash in URL
    const hash = window.location.hash;
    const match = hash.match(/slide-(\d+)/);
    if (match) {
      const parsed = parseInt(match[1], 10);
      if (parsed >= 1 && parsed <= totalSlides) {
        currentSlide = parsed;
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

  // Update UI & Controls
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

    // Highlight TOC Item
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
        console.warn(`Fullscreen error: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  function openTOC() {
    if (tocOverlay) tocOverlay.classList.add('active');
  }

  function closeTOC() {
    if (tocOverlay) tocOverlay.classList.remove('active');
  }

  function openHelp() {
    if (helpModal) helpModal.classList.add('active');
  }

  function closeHelp() {
    if (helpModal) helpModal.classList.remove('active');
  }

  function showToast(message) {
    if (!toastNotice) return;
    toastNotice.textContent = message;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 2200);
  }

  // Event Listeners for Controls
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

  // Global Keyboard Navigation
  window.addEventListener('keydown', (e) => {
    const activeEl = document.activeElement;
    const isEditing = activeEl && (
      activeEl.tagName === 'INPUT' ||
      activeEl.tagName === 'TEXTAREA' ||
      activeEl.isContentEditable ||
      activeEl.tagName === 'SELECT'
    );

    if (e.key === 'Escape') {
      closeTOC();
      closeHelp();
      return;
    }

    if (isEditing) return;

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
    }
  });

  // Touch Swipe
  let touchStartX = 0;
  let touchEndX = 0;

  window.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff < 0) nextSlide();
      else prevSlide();
    }
  }, { passive: true });

  // Copy Code Buttons
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const codePanel = btn.closest('.code-panel');
      if (!codePanel) return;
      const codeBlock = codePanel.querySelector('pre code') || codePanel.querySelector('pre');
      if (!codeBlock) return;

      const codeText = codeBlock.innerText;
      try {
        await navigator.clipboard.writeText(codeText);
        const originalText = btn.innerHTML;
        btn.innerHTML = `✓ Copied!`;
        btn.style.background = 'var(--accent-green)';
        btn.style.color = '#FFFFFF';
        showToast("Code copied to clipboard!");
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = '';
          btn.style.color = '';
        }, 2000);
      } catch (err) {
        const textArea = document.createElement('textarea');
        textArea.value = codeText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast("Code copied to clipboard!");
      }
    });
  });

  // ==========================================================================
  // Interactive Sandboxes for Day 1
  // ==========================================================================

  // --- Sandbox 1: Slide 2 Python vs JS Code Viewer ---
  const s2TabPy = document.getElementById('s2TabPy');
  const s2TabJs = document.getElementById('s2TabJs');
  const s2CodePy = document.getElementById('s2CodePy');
  const s2CodeJs = document.getElementById('s2CodeJs');

  if (s2TabPy && s2TabJs && s2CodePy && s2CodeJs) {
    s2TabPy.addEventListener('click', () => {
      s2TabPy.classList.add('active');
      s2TabJs.classList.remove('active');
      s2CodePy.style.display = 'block';
      s2CodeJs.style.display = 'none';
    });
    s2TabJs.addEventListener('click', () => {
      s2TabJs.classList.add('active');
      s2TabPy.classList.remove('active');
      s2CodeJs.style.display = 'block';
      s2CodePy.style.display = 'none';
    });
  }

  // --- Sandbox 1.5: Slide 3 Python vs JS Behavioral Differences ---
  const btnDiffCoercionAdd = document.getElementById('btnDiffCoercionAdd');
  const btnDiffCoercionSub = document.getElementById('btnDiffCoercionSub');
  const btnDiffEquality = document.getElementById('btnDiffEquality');
  const btnDiffNullUndefined = document.getElementById('btnDiffNullUndefined');
  const btnDiffScopeLeak = document.getElementById('btnDiffScopeLeak');
  const diffTitle = document.getElementById('diffTitle');
  const diffPyOutput = document.getElementById('diffPyOutput');
  const diffJsOutput = document.getElementById('diffJsOutput');

  function showDiffScenario(title, pyCode, pyResult, jsCode, jsResult) {
    if (diffTitle) diffTitle.textContent = title;
    if (diffPyOutput) {
      diffPyOutput.innerHTML = `<code>${pyCode}</code><br><span style="color:#FCA5A5;">➜ ${pyResult}</span>`;
    }
    if (diffJsOutput) {
      diffJsOutput.innerHTML = `<code>${jsCode}</code><br><span style="color:#86EFAC;">➜ ${jsResult}</span>`;
    }
  }

  function setActiveDiffBtn(activeBtn) {
    [btnDiffCoercionAdd, btnDiffCoercionSub, btnDiffEquality, btnDiffNullUndefined, btnDiffScopeLeak].forEach(b => {
      if (b) {
        if (b === activeBtn) {
          b.classList.remove('btn-secondary');
          b.classList.add('btn-primary');
        } else {
          b.classList.remove('btn-primary');
          b.classList.add('btn-secondary');
        }
      }
    });
  }

  if (btnDiffCoercionAdd) {
    btnDiffCoercionAdd.addEventListener('click', () => {
      setActiveDiffBtn(btnDiffCoercionAdd);
      showDiffScenario(
        '1. String + Number ("5" + 2)',
        '"5" + 2',
        'TypeError: can only concatenate str (not "int") to str',
        '"5" + 2',
        '"52" (number 2 implicitly coerced to string, then concatenated)'
      );
    });
  }

  if (btnDiffCoercionSub) {
    btnDiffCoercionSub.addEventListener('click', () => {
      setActiveDiffBtn(btnDiffCoercionSub);
      showDiffScenario(
        '2. String - Number ("5" - 2)',
        '"5" - 2',
        'TypeError: unsupported operand type(s) for -: \'str\' and \'int\'',
        '"5" - 2',
        '3 (math minus operator implicitly coerces string "5" to number 5!)'
      );
    });
  }

  if (btnDiffEquality) {
    btnDiffEquality.addEventListener('click', () => {
      setActiveDiffBtn(btnDiffEquality);
      showDiffScenario(
        '3. Equality: 5 == "5" vs 5 === "5"',
        '5 == "5"',
        'False (Python enforces strict type comparison with ==)',
        '5 == "5" is true (loose: coerces string to number)\n5 === "5" is false (strict: compares both value AND type)',
        'Best Practice: Always use === in JavaScript!'
      );
    });
  }

  if (btnDiffNullUndefined) {
    btnDiffNullUndefined.addEventListener('click', () => {
      setActiveDiffBtn(btnDiffNullUndefined);
      showDiffScenario(
        '4. Emptiness: None vs null & undefined',
        'x = None\nprint(type(x))  # <class \'NoneType\'>',
        'Python uses one canonical None singleton',
        'let a;         // undefined (variable declared, no value yet)\nlet b = null;  // null (intentional absence of object value)',
        'Two distinct primitive types representing missing values!'
      );
    });
  }

  if (btnDiffScopeLeak) {
    btnDiffScopeLeak.addEventListener('click', () => {
      setActiveDiffBtn(btnDiffScopeLeak);
      showDiffScenario(
        '5. Block Scope: if statement variable leak',
        'if True:\n    x = 10\nprint(x)  # prints 10! (Variables leak outside if/for)',
        'Python only scopes variables to Functions, not { } blocks!',
        'if (true) {\n    let x = 10;\n}\nconsole.log(x); // ReferenceError: x is not defined',
        'let and const are strictly confined to { } block scope!'
      );
    });
    // Trigger default selection on initial load
    btnDiffCoercionAdd.click();
  }

  // --- Sandbox 2: Slide 6 var, let, const Tester ---
  const s5TypeSelect = document.getElementById('s5TypeSelect');
  const s5TestBtn = document.getElementById('s5TestBtn');
  const s5Result = document.getElementById('s5Result');

  if (s5TestBtn && s5TypeSelect && s5Result) {
    s5TestBtn.addEventListener('click', () => {
      const type = s5TypeSelect.value;
      if (type === 'var') {
        s5Result.className = 'sandbox-result card-green';
        s5Result.textContent = `// Code:\nvar name = "Arun";\nname = "Rahul";\nconsole.log(name);\n\nOutput: "Rahul"\nExplanation: var permits reassignment and function-scope redeclaration.`;
      } else if (type === 'let') {
        s5Result.className = 'sandbox-result card-green';
        s5Result.textContent = `// Code:\nlet age = 22;\nage = 23;\nconsole.log(age);\n\nOutput: 23\nExplanation: let permits reassignment and enforces block scope {}.`;
      } else {
        s5Result.className = 'sandbox-result card-rose';
        s5Result.textContent = `// Code:\nconst country = "India";\ncountry = "USA"; // Error!\n\nOutput:\nTypeError: Assignment to constant variable.\nExplanation: const variables CANNOT be reassigned! Use const by default.`;
      }
    });
  }

  // --- Sandbox 3: Slide 6 Student Profile Live Updater ---
  const s6NameInput = document.getElementById('s6NameInput');
  const s6AgeInput = document.getElementById('s6AgeInput');
  const s6CourseInput = document.getElementById('s6CourseInput');
  const s6MarksInput = document.getElementById('s6MarksInput');
  const s6RunBtn = document.getElementById('s6RunBtn');
  const s6Output = document.getElementById('s6Output');

  if (s6RunBtn && s6Output) {
    s6RunBtn.addEventListener('click', () => {
      const name = s6NameInput ? s6NameInput.value : "Arun";
      const age = s6AgeInput ? s6AgeInput.value : 22;
      const course = s6CourseInput ? s6CourseInput.value : "MERN Stack";
      let marks = s6MarksInput ? parseInt(s6MarksInput.value, 10) : 75;

      const initialMarks = marks;
      marks += 10; // Updated marks demonstration

      s6Output.textContent = `Student: ${name}\nAge: ${age}\nCourse: ${course}\nMarks: ${initialMarks}\nUpdated Marks (let marks = marks + 10): ${marks}`;
    });
  }

  // --- Sandbox 4: Slide 10 Function Types Comparator ---
  const s10Btns = document.querySelectorAll('.s10-type-btn');
  const s10CodeDisplay = document.getElementById('s10CodeDisplay');

  const s10Snippets = {
    declaration: `// 1. Function Declaration (Hoisted, classic style)\nfunction add(a, b) {\n  return a + b;\n}\nconsole.log(add(10, 20)); // Output: 30`,
    expression: `// 2. Function Expression (Assigned to a variable)\nconst subtract = function(a, b) {\n  return a - b;\n};\nconsole.log(subtract(20, 10)); // Output: 10`,
    arrow: `// 3. Arrow Function (Modern ES6 syntax, standard in React)\nconst multiply = (a, b) => {\n  return a * b;\n};\nconsole.log(multiply(5, 4)); // Output: 20\n\n// Concise one-line arrow function (implicit return):\nconst divide = (a, b) => a / b;\nconsole.log(divide(20, 5)); // Output: 4`
  };

  s10Btns.forEach(btn => {
    btn.addEventListener('click', () => {
      s10Btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const type = btn.dataset.type;
      if (s10Snippets[type] && s10CodeDisplay) {
        s10CodeDisplay.textContent = s10Snippets[type];
      }
    });
  });

  // --- Sandbox 5: Slide 11 Calculator Sandbox ---
  const s11NumA = document.getElementById('s11NumA');
  const s11NumB = document.getElementById('s11NumB');
  const s11Op = document.getElementById('s11Op');
  const s11CalcBtn = document.getElementById('s11CalcBtn');
  const s11Result = document.getElementById('s11Result');

  if (s11CalcBtn && s11Result) {
    s11CalcBtn.addEventListener('click', () => {
      const a = parseFloat(s11NumA ? s11NumA.value : 0);
      const b = parseFloat(s11NumB ? s11NumB.value : 0);
      const op = s11Op ? s11Op.value : "+";

      let res;
      if (op === "+") res = a + b;
      else if (op === "-") res = a - b;
      else if (op === "*") res = a * b;
      else if (op === "/") {
        if (b === 0) res = "Cannot divide by zero";
        else res = a / b;
      }

      s11Result.textContent = `// calculate(${a}, ${b}, "${op}")\nResult: ${res}`;
    });
  }

  // --- Sandbox 6: Slide 15 Unit Converter Sandbox ---
  const s15Type = document.getElementById('s15Type');
  const s15Input = document.getElementById('s15Input');
  const s15Btn = document.getElementById('s15Btn');
  const s15Result = document.getElementById('s15Result');

  if (s15Btn && s15Result) {
    s15Btn.addEventListener('click', () => {
      const type = s15Type ? s15Type.value : "c2f";
      const val = parseFloat(s15Input ? s15Input.value : 0);

      let res, formula;
      if (type === "c2f") {
        res = (val * 9 / 5) + 32;
        formula = `(${val}°C × 9/5) + 32 = ${res.toFixed(2)}°F`;
      } else if (type === "f2c") {
        res = (val - 32) * 5 / 9;
        formula = `(${val}°F - 32) × 5/9 = ${res.toFixed(2)}°C`;
      } else {
        res = val * 0.621371;
        formula = `${val} km × 0.621371 = ${res.toFixed(5)} miles`;
      }

      s15Result.textContent = formula;
    });
  }

  // --- Sandbox 7: Slide 17 Closure Counter ---
  let closureCount = 0;
  const s17CountBtn = document.getElementById('s17CountBtn');
  const s17ResetBtn = document.getElementById('s17ResetBtn');
  const s17Output = document.getElementById('s17Output');

  if (s17CountBtn && s17Output) {
    s17CountBtn.addEventListener('click', () => {
      closureCount++;
      s17Output.textContent = `// Call counter();\ncount value in closure: ${closureCount}\nOutput: ${closureCount}`;
    });
  }

  if (s17ResetBtn && s17Output) {
    s17ResetBtn.addEventListener('click', () => {
      closureCount = 0;
      s17Output.textContent = `// Counter reset to 0\nCall counter() to increment.`;
    });
  }

  // --- Sandbox 8: Slide 18 Complete Project Demo ---
  const s18RunAllBtn = document.getElementById('s18RunAllBtn');
  const s18Output = document.getElementById('s18Output');

  if (s18RunAllBtn && s18Output) {
    s18RunAllBtn.addEventListener('click', () => {
      let log = "Calculator:\n";
      const add = (a, b) => a + b;
      const mult = (a, b) => a * b;
      const div = (a, b) => b === 0 ? "Cannot divide by zero" : a / b;

      log += `${add(10, 5)}\n`;
      log += `${mult(10, 5)}\n`;
      log += `${div(10, 0)}\n\n`;

      log += "Temperature (25°C to °F):\n";
      log += `${(25 * 9 / 5) + 32}\n\n`;

      log += "Distance (10 km to miles):\n";
      log += `${10 * 0.621371}\n\n`;

      log += "Counter using closure:\n";
      let cnt = 0;
      log += `${++cnt}\n`;
      log += `${++cnt}\n`;
      log += `${++cnt}\n`;

      s18Output.textContent = log;
    });
  }

  // Initialize
  initNavigation();
});
