/**
 * JavaScript Fundamentals – Day 3
 * DOM Manipulation, Event Handling, Asynchronous JavaScript & Modules
 * Interactive Presentation Engine & Simulation Sandboxes
 * Total Slides: 25
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Presentation State ---
  const totalSlides = 25;
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

  // Exact 25 Slide Titles
  const slideTitles = [
    "Introduction to Day 3",
    "What is the DOM?",
    "Selecting HTML Elements",
    "Modifying HTML Content",
    "Modifying CSS Using JavaScript",
    "Creating HTML Elements Dynamically",
    "Removing HTML Elements",
    "What are Browser Events?",
    "Event Listeners and Event Handling",
    "Event Object & Form Handling",
    "Practical: Interactive Student Profile",
    "Synchronous vs Asynchronous JavaScript",
    "What are Callbacks?",
    "The 'Callback Hell' Problem",
    "What is a Promise?",
    "Promise Chaining",
    "What is async/await?",
    "Callbacks vs Promises vs Async/Await",
    "What is the Fetch API?",
    "What is JSON? stringify() vs parse()",
    "Handling API Requests Using Async/Await",
    "Error Handling Using try/catch/finally",
    "What are ES Modules?",
    "Named Export vs Default Export",
    "Practical Project: User Explorer"
  ];

  // Populate Dropdown Select & Table of Contents
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

  // Slide Display Controller
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

    // Scroll active slide body to top
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

  // Event Listeners for Nav
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  if (slideSelect) {
    slideSelect.addEventListener('change', (e) => {
      goToSlide(parseInt(e.target.value, 10));
    });
  }

  // Keyboard Navigation
  document.addEventListener('keydown', (e) => {
    // Avoid capturing inputs inside form sandboxes
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

  // Table of Contents Drawer
  function toggleTOC() {
    if (tocOverlay) tocOverlay.classList.toggle('active');
  }
  function closeTOC() {
    if (tocOverlay) tocOverlay.classList.remove('active');
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
    if (helpModal) helpModal.classList.toggle('active');
  }
  function closeHelp() {
    if (helpModal) helpModal.classList.remove('active');
  }
  if (helpBtn) helpBtn.addEventListener('click', toggleHelp);
  if (helpClose) helpClose.addEventListener('click', closeHelp);
  if (helpModal) {
    helpModal.addEventListener('click', (e) => {
      if (e.target === helpModal) closeHelp();
    });
  }

  // Toast Notification System
  function showToast(msg) {
    if (!toastNotice) return;
    toastNotice.textContent = msg;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 2400);
  }

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

  // Initialize presentation
  initializeNavigation();
  updateSlideDisplay();

  // =========================================================================
  // --- INTERACTIVE SANDBOX 1: STUDENT PROFILE (SLIDE 11) ---
  // =========================================================================
  const demoStudentInput = document.getElementById("demoStudentInput");
  const btnDemoStudent = document.getElementById("btnDemoStudent");
  const demoStudentResult = document.getElementById("demoStudentResult");

  function handleStudentProfile() {
    if (!demoStudentInput || !demoStudentResult) return;
    const name = demoStudentInput.value.trim();

    if (name === "") {
      demoStudentResult.textContent = "Please enter your name";
      demoStudentResult.style.color = "#DC2626"; // Red warning
      showToast("Validation Error: Name is empty!");
      return;
    }

    demoStudentResult.textContent = `Welcome, ${name}!`;
    demoStudentResult.style.color = "#059669"; // Green success
    demoStudentInput.value = "";
    showToast(`Profile Created for ${name}!`);
  }

  if (btnDemoStudent) {
    btnDemoStudent.addEventListener("click", handleStudentProfile);
  }
  if (demoStudentInput) {
    demoStudentInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleStudentProfile();
    });
  }

  // =========================================================================
  // --- INTERACTIVE SANDBOX 2: USER EXPLORER PROJECT (SLIDE 25) ---
  // =========================================================================

  // Tabbed File Inspector
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetTabId = btn.dataset.tab;

      tabButtons.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      const targetContent = document.getElementById(targetTabId);
      if (targetContent) targetContent.classList.add("active");
    });
  });

  // User Explorer Live Execution
  const btnLiveLoadUsers = document.getElementById("btnLiveLoadUsers");
  const btnLiveClearUsers = document.getElementById("btnLiveClearUsers");
  const liveStatusText = document.getElementById("liveStatusText");
  const demoLiveStatus = document.getElementById("demoLiveStatus");
  const liveUserContainer = document.getElementById("liveUserContainer");

  // Fallback mock users in case network/CORS fails in local environment
  const fallbackUsers = [
    { id: 1, name: "Leanne Graham", email: "Sincere@april.biz" },
    { id: 2, name: "Ervin Howell", email: "Shanna@melissa.tv" },
    { id: 3, name: "Clementine Bauch", email: "Nathan@yesenia.net" },
    { id: 4, name: "Patricia Lebsack", email: "Julianne.OConner@kory.org" },
    { id: 5, name: "Chelsey Dietrich", email: "Lucio_Hettinger@annie.ca" },
    { id: 6, name: "Mrs. Dennis Schulist", email: "Karley_Dach@jasper.info" }
  ];

  async function loadUserExplorerData() {
    if (!liveStatusText || !liveUserContainer || !btnLiveLoadUsers) return;

    try {
      liveStatusText.textContent = "Loading users from API...";
      liveStatusText.style.color = "#2563EB";
      if (demoLiveStatus) {
        demoLiveStatus.textContent = "Loading...";
        demoLiveStatus.className = "badge badge-warning";
      }
      btnLiveLoadUsers.disabled = true;

      // Attempt live fetch with 3.5s timeout fallback
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      let users = [];
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users", {
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        users = await response.json();
      } catch (networkErr) {
        console.warn("Live fetch failed or timed out, using fallback mock users:", networkErr);
        users = fallbackUsers;
      }

      // Render Users using DOM methods
      liveUserContainer.replaceChildren();

      users.slice(0, 8).forEach((user) => {
        const card = document.createElement("div");
        card.className = "user-card";

        const nameEl = document.createElement("span");
        nameEl.className = "user-card-name";
        nameEl.textContent = user.name;

        const emailEl = document.createElement("span");
        emailEl.className = "user-card-email";
        emailEl.textContent = user.email;

        card.append(nameEl, emailEl);
        liveUserContainer.appendChild(card);
      });

      liveStatusText.textContent = `✓ Successfully loaded ${users.length} users!`;
      liveStatusText.style.color = "#059669";
      if (demoLiveStatus) {
        demoLiveStatus.textContent = `${users.length} Users`;
        demoLiveStatus.className = "badge badge-success";
      }
      showToast(`Loaded ${users.length} user cards!`);

    } catch (err) {
      liveStatusText.textContent = `Error: ${err.message}`;
      liveStatusText.style.color = "#DC2626";
      if (demoLiveStatus) {
        demoLiveStatus.textContent = "Error";
        demoLiveStatus.className = "badge badge-danger";
      }
      showToast("Failed to load users");
    } finally {
      btnLiveLoadUsers.disabled = false;
    }
  }

  function clearUserExplorerData() {
    if (!liveUserContainer || !liveStatusText) return;
    liveUserContainer.replaceChildren();
    liveStatusText.textContent = "Container cleared. Ready to fetch.";
    liveStatusText.style.color = "var(--text-muted)";
    if (demoLiveStatus) {
      demoLiveStatus.textContent = "Idle";
      demoLiveStatus.className = "badge badge-concept";
    }
    showToast("User list cleared (replaceChildren)");
  }

  if (btnLiveLoadUsers) {
    btnLiveLoadUsers.addEventListener("click", loadUserExplorerData);
  }
  if (btnLiveClearUsers) {
    btnLiveClearUsers.addEventListener("click", clearUserExplorerData);
  }
});
