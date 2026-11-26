/**
 * JavaScript Fundamentals – Day 2
 * Advanced Arrays, Objects, Higher-Order Methods & Modern ES6+
 * Presentation Engine & Interactive Sandboxes Controller
 * Total Slides: 22
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Presentation State ---
  const totalSlides = 22;
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

    // Exact 22 Slide Titles
  const slideTitles = [
    "Introduction to Day 2",
    "Reference vs Value in JavaScript",
    "Loops in JavaScript: for, for...of & for...in",
    "forEach() vs map(): Side Effects vs Pure Transformation",
    "filter(): Selecting Elements by Condition",
    "reduce(): Aggregating Data into Single Values",
    "Method Chaining: filter() + map() + reduce()",
    "Searching Arrays: find() & findIndex()",
    "Testing Conditions: some() & every()",
    "Element Lookup: includes() & indexOf()",
    "Array Immutability: slice() vs splice()",
    "Sorting Mechanics: sort() & reverse()",
    "Object Immutability: Object.freeze() vs Object.seal()",
    "Destructuring: Arrays and Objects",
    "The Spread Operator (...) in Arrays & Objects",
    "The Rest Operator (...) in Parameters & Destructuring",
    "Optional Chaining (?.): Safe Property Access",
    "Project 1: To-Do List Architecture & State Model",
    "Project 1: Interactive To-Do List Application",
    "Project 2: User Data Transformation Pipeline",
    "Practice Questions: Simple Challenges",
    "Practice Questions: Intermediate Challenges"
  ];

  // Populate Dropdown Select & TOC List
  function initializeNavigation() {
    if (slideSelect) {
      slideSelect.innerHTML = '';
      slideTitles.forEach((title, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = `${index + 1}. ${title}`;
        slideSelect.appendChild(option);
      });
    }

    if (tocList) {
      tocList.innerHTML = '';
      slideTitles.forEach((title, index) => {
        const li = document.createElement('li');
        li.className = 'toc-item';
        if (index === 0) li.classList.add('active');
        li.dataset.slide = index + 1;

        const numSpan = document.createElement('span');
        numSpan.className = 'toc-num';
        numSpan.textContent = String(index + 1).padStart(2, '0');

        const titleSpan = document.createElement('span');
        titleSpan.textContent = title;

        li.appendChild(numSpan);
        li.appendChild(titleSpan);

        li.addEventListener('click', () => {
          goToSlide(index + 1);
          closeTOC();
        });

        tocList.appendChild(li);
      });
    }
  }

  // Slide Transition Core
  function updateSlideDisplay() {
    slides.forEach((slide, index) => {
      if (index + 1 === currentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    if (slideCounter) {
      slideCounter.textContent = `${currentSlide} / ${totalSlides}`;
    }

    if (progressBar) {
      const pct = (currentSlide / totalSlides) * 100;
      progressBar.style.width = `${pct}%`;
    }

    if (slideSelect) {
      slideSelect.value = currentSlide;
    }

    if (prevBtn) {
      prevBtn.disabled = currentSlide === 1;
    }
    if (nextBtn) {
      nextBtn.disabled = currentSlide === totalSlides;
    }

    // Update TOC highlight
    if (tocList) {
      const tocItems = tocList.querySelectorAll('.toc-item');
      tocItems.forEach((item, index) => {
        if (index + 1 === currentSlide) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }

    // Scroll slide body to top
    const activeSlide = document.getElementById(`slide-${currentSlide}`);
    if (activeSlide) {
      const slideBody = activeSlide.querySelector('.slide-body');
      if (slideBody) {
        slideBody.scrollTop = 0;
      }
    }
  }

  function goToSlide(n) {
    if (n >= 1 && n <= totalSlides) {
      currentSlide = n;
      updateSlideDisplay();
    }
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

  // Event Listeners
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  if (slideSelect) {
    slideSelect.addEventListener('change', (e) => {
      goToSlide(parseInt(e.target.value, 10));
    });
  }

  // Keyboard Navigation
  document.addEventListener('keydown', (e) => {
    // Avoid interfering with form inputs
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
        toggleFullscreen();
        break;
      case 't':
      case 'T':
        toggleTOC();
        break;
      case '?':
        toggleHelp();
        break;
      case 'Escape':
        closeTOC();
        closeHelp();
        break;
    }
  });

  // Fullscreen Handler
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
  if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);

  // TOC Drawer
  function toggleTOC() {
    if (tocOverlay) {
      tocOverlay.classList.toggle('active');
    }
  }
  function closeTOC() {
    if (tocOverlay) {
      tocOverlay.classList.remove('active');
    }
  }
  if (tocBtn) tocBtn.addEventListener('click', toggleTOC);
  if (tocClose) tocClose.addEventListener('click', closeTOC);
  if (tocOverlay) {
    tocOverlay.addEventListener('click', (e) => {
      if (e.target === tocOverlay) closeTOC();
    });
  }

  // Help Modal
  function toggleHelp() {
    if (helpModal) {
      helpModal.classList.toggle('active');
    }
  }
  function closeHelp() {
    if (helpModal) {
      helpModal.classList.remove('active');
    }
  }
  if (helpBtn) helpBtn.addEventListener('click', toggleHelp);
  if (helpClose) helpClose.addEventListener('click', closeHelp);
  if (helpModal) {
    helpModal.addEventListener('click', (e) => {
      if (e.target === helpModal) closeHelp();
    });
  }

  // Toast System
  function showToast(msg) {
    if (!toastNotice) return;
    toastNotice.textContent = msg;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 2400);
  }

  // Initialize
  initializeNavigation();
  updateSlideDisplay();

  // =========================================================================
  // --- INTERACTIVE CAPSTONE 1: TO-DO LIST APPLICATION (SLIDE 23) ---
  // =========================================================================
  const liveTaskInput = document.getElementById("liveTaskInput");
  const btnLiveAddTask = document.getElementById("btnLiveAddTask");
  const liveTaskList = document.getElementById("liveTaskList");
  const liveTaskCount = document.getElementById("liveTaskCount");

  let liveTasks = [
    { id: 1, title: "Learn Array Methods", completed: true },
    { id: 2, title: "Practice map() and filter()", completed: false },
    { id: 3, title: "Build React App with Immutability", completed: false }
  ];

  function renderLiveTasks() {
    if (!liveTaskList) return;
    liveTaskList.innerHTML = "";

    liveTasks.forEach((task) => {
      const li = document.createElement("li");
      li.className = "todo-item";
      li.style.display = "flex";
      li.style.justifyContent = "space-between";
      li.style.alignItems = "center";
      li.style.padding = "6px 8px";
      li.style.background = "#FFFFFF";
      li.style.border = "1px solid var(--border-subtle)";
      li.style.borderRadius = "6px";
      li.style.marginBottom = "6px";

      const span = document.createElement("span");
      span.textContent = task.title;
      span.style.fontSize = "0.78rem";
      if (task.completed) {
        span.style.textDecoration = "line-through";
        span.style.color = "#94A3B8";
      } else {
        span.style.color = "var(--text-heading)";
      }

      const actionsDiv = document.createElement("div");
      actionsDiv.style.display = "flex";
      actionsDiv.style.gap = "4px";

      const completeBtn = document.createElement("button");
      completeBtn.className = "btn btn-secondary btn-sm";
      completeBtn.style.padding = "3px 8px";
      completeBtn.style.fontSize = "0.70rem";
      completeBtn.textContent = task.completed ? "Undo" : "Done";
      completeBtn.addEventListener("click", () => {
        toggleLiveTask(task.id);
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "btn btn-danger btn-sm";
      deleteBtn.style.padding = "3px 8px";
      deleteBtn.style.fontSize = "0.70rem";
      deleteBtn.textContent = "Del";
      deleteBtn.addEventListener("click", () => {
        deleteLiveTask(task.id);
      });

      actionsDiv.appendChild(completeBtn);
      actionsDiv.appendChild(deleteBtn);

      li.appendChild(span);
      li.appendChild(actionsDiv);
      liveTaskList.appendChild(li);
    });

    if (liveTaskCount) {
      liveTaskCount.textContent = `Total Tasks: ${liveTasks.length}`;
    }
  }

  function addLiveTask() {
    if (!liveTaskInput) return;
    const title = liveTaskInput.value.trim();

    if (title === "") {
      showToast("Please enter a task title!");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: title,
      completed: false
    };

    liveTasks.push(newTask);
    liveTaskInput.value = "";
    renderLiveTasks();
    showToast(`Added: "${title}" (array.push)`);
  }

  function toggleLiveTask(id) {
    liveTasks = liveTasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed
        };
      }
      return task;
    });
    renderLiveTasks();
    showToast("Toggled task status (map + spread)");
  }

  function deleteLiveTask(id) {
    liveTasks = liveTasks.filter((task) => task.id !== id);
    renderLiveTasks();
    showToast("Deleted task (filter)");
  }

  if (btnLiveAddTask) {
    btnLiveAddTask.addEventListener("click", addLiveTask);
  }

  if (liveTaskInput) {
    liveTaskInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        addLiveTask();
      }
    });
  }

  renderLiveTasks();

  // =========================================================================
  // --- INTERACTIVE CAPSTONE 2: USER DATA TRANSFORMATION (SLIDE 24) ---
  // =========================================================================
  const btnRunUserPipeline = document.getElementById("btnRunUserPipeline");
  const pipelineLiveOut = document.getElementById("pipelineLiveOut");

  if (btnRunUserPipeline && pipelineLiveOut) {
    btnRunUserPipeline.addEventListener("click", () => {
      const users = [
        { id: 1, name: "Ali", age: 22, active: true },
        { id: 2, name: "Sara", age: 25, active: false },
        { id: 3, name: "John", age: 28, active: true },
        { id: 4, name: "Maya", age: 24, active: true }
      ];

      // 1. Filter active users
      const activeUsers = users.filter(({ active }) => active);

      // 2. Extract names
      const names = activeUsers.map(({ name }) => name);

      // 3. Calculate total age
      const totalAge = activeUsers.reduce((total, { age }) => total + age, 0);

      // 4. Update users with spread
      const updatedUsers = activeUsers.map(user => ({
        ...user,
        role: "Member"
      }));

      pipelineLiveOut.innerHTML = `
        <span style="color:#60A5FA;">✓ Active Users (${activeUsers.length}):</span> ${names.join(", ")}<br>
        <span style="color:#FBBF24;">✓ Total Age (reduce):</span> ${totalAge} years (Avg: ${(totalAge / activeUsers.length).toFixed(1)})<br>
        <span style="color:#4ADE80;">✓ Updated Users (spread):</span><br>
        <pre style="margin:4px 0 0 0; color:#CBD5E1;">${JSON.stringify(updatedUsers, null, 2)}</pre>
      `;
      showToast("Data pipeline executed successfully!");
    });
  }
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
