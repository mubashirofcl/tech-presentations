/**
 * ==============================================================================
 * React Day 9: React Router
 * Interactive Educational Presentation Deck & Demonstration Engine
 * ==============================================================================
 */

// ==============================================================================
// 1. Presentation Deck Controller
// ==============================================================================
const Deck = {
  currentSlide: 1,
  totalSlides: 40,
  slides: [],
  topicMap: {
    1: { section: "INTRODUCTION", topic: "React Router — Title" },
    2: { section: "INTRODUCTION", topic: "Learning Objectives" },
    3: { section: "INTRODUCTION", topic: "What Is Routing?" },
    4: { section: "INTRODUCTION", topic: "Why Do We Need Routing?" },
    5: { section: "INTRODUCTION", topic: "SPA and Routing" },
    6: { section: "SETTING UP ROUTER", topic: "Installing React Router" },
    7: { section: "SETTING UP ROUTER", topic: "Basic Router Setup" },
    8: { section: "SETTING UP ROUTER", topic: "Creating Routes" },
    9: { section: "SETTING UP ROUTER", topic: "Route Structure" },
    10: { section: "SETTING UP ROUTER", topic: "Complete Basic Example & Sim" },
    11: { section: "NAVIGATION", topic: "The <Link> Component" },
    12: { section: "NAVIGATION", topic: "Why Not Use <a>?" },
    13: { section: "NAVIGATION", topic: "Building a Navigation Bar" },
    14: { section: "NAVIGATION", topic: "The <NavLink> Component" },
    15: { section: "ROUTE PARAMETERS", topic: "What Are Route Parameters?" },
    16: { section: "ROUTE PARAMETERS", topic: "Creating a Dynamic Route" },
    17: { section: "ROUTE PARAMETERS", topic: "Reading Parameters with useParams()" },
    18: { section: "ROUTE PARAMETERS", topic: "Interactive Parameter Studio" },
    19: { section: "QUERY STRINGS", topic: "What Is a Query String?" },
    20: { section: "QUERY STRINGS", topic: "Reading Query Strings with useSearchParams()" },
    21: { section: "QUERY STRINGS", topic: "Route Parameter vs Query String" },
    22: { section: "QUERY STRINGS", topic: "Interactive Query Generator" },
    23: { section: "PROGRAMMATIC NAV", topic: "Programmatic Nav with useNavigate()" },
    24: { section: "PROGRAMMATIC NAV", topic: "Back and Forward Navigation" },
    25: { section: "PROTECTED ROUTES", topic: "What Is a Protected Route?" },
    26: { section: "PROTECTED ROUTES", topic: "Why Protect Routes?" },
    27: { section: "PROTECTED ROUTES", topic: "Basic Protected Route Concept" },
    28: { section: "PROTECTED ROUTES", topic: "Using Protected Route in App.jsx" },
    29: { section: "PROTECTED ROUTES", topic: "Interactive Protected Route Demo" },
    30: { section: "MINI PROJECT", topic: "Product Store Overview" },
    31: { section: "MINI PROJECT", topic: "Project Routes Configuration" },
    32: { section: "MINI PROJECT", topic: "Product Details Flow" },
    33: { section: "MINI PROJECT", topic: "Product Search Flow" },
    34: { section: "MINI PROJECT", topic: "Project Architecture" },
    35: { section: "REVIEW", topic: "Common React Router Mistakes" },
    36: { section: "REVIEW", topic: "Visual Breakdown: Param vs Query" },
    37: { section: "REVIEW", topic: "Quick Classroom Quiz" },
    38: { section: "REVIEW", topic: "Quick Reference Cheat Sheet" },
    39: { section: "REVIEW", topic: "Complete Routing Flow" },
    40: { section: "REVIEW", topic: "Summary & Golden Rule" }
  },

  init() {
    this.slides = Array.from(document.querySelectorAll('.slide'));
    this.totalSlides = this.slides.length || 40;

    const totalEl = document.getElementById('totalSlidesNum');
    if (totalEl) totalEl.textContent = this.totalSlides;

    this.buildTocDrawer();

    // Check URL hash (#slide-5)
    const hash = window.location.hash.replace('#slide-', '').replace('#', '');
    const initialSlide = parseInt(hash, 10);
    if (!isNaN(initialSlide) && initialSlide >= 1 && initialSlide <= this.totalSlides) {
      this.goToSlide(initialSlide);
    } else {
      this.goToSlide(1);
    }

    this.attachEvents();
  },

  goToSlide(slideNumber) {
    if (slideNumber < 1) slideNumber = 1;
    if (slideNumber > this.totalSlides) slideNumber = this.totalSlides;

    this.currentSlide = slideNumber;

    // Toggle active slide
    this.slides.forEach((slide) => {
      const num = parseInt(slide.dataset.slide, 10);
      if (num === this.currentSlide) {
        slide.classList.add('active');
        slide.scrollTop = 0;
      } else {
        slide.classList.remove('active');
      }
    });

    // Update progress bar
    const progressEl = document.getElementById('progressBar');
    if (progressEl) {
      const pct = (this.currentSlide / this.totalSlides) * 100;
      progressEl.style.width = `${pct}%`;
    }

    // Update bottom counters
    const currentNumEl = document.getElementById('currentSlideNum');
    if (currentNumEl) currentNumEl.textContent = this.currentSlide;

    // Update prev/next button disabled states
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    if (prevBtn) prevBtn.disabled = this.currentSlide === 1;
    if (nextBtn) nextBtn.disabled = this.currentSlide === this.totalSlides;

    // Update header badges
    const meta = this.topicMap[this.currentSlide] || { section: "REACT ROUTER", topic: `Slide ${this.currentSlide}` };
    const secTag = document.getElementById('headerSectionTag');
    const topicEl = document.getElementById('headerTopic');
    if (secTag) secTag.textContent = meta.section;
    if (topicEl) topicEl.textContent = meta.topic;

    // Update active state in Table of Contents drawer
    const tocItems = document.querySelectorAll('.toc-item');
    tocItems.forEach((item) => {
      const num = parseInt(item.dataset.slideNum, 10);
      if (num === this.currentSlide) {
        item.classList.add('active');
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.classList.remove('active');
      }
    });

    // Update URL hash without jumping page
    history.replaceState(null, '', `#slide-${this.currentSlide}`);
  },

  nextSlide() {
    if (this.currentSlide < this.totalSlides) {
      this.goToSlide(this.currentSlide + 1);
    }
  },

  prevSlide() {
    if (this.currentSlide > 1) {
      this.goToSlide(this.currentSlide - 1);
    }
  },

  buildTocDrawer() {
    const list = document.getElementById('tocList');
    if (!list) return;

    list.innerHTML = '';
    for (let i = 1; i <= this.totalSlides; i++) {
      const meta = this.topicMap[i] || { section: 'TOPIC', topic: `Slide ${i}` };
      const li = document.createElement('li');
      li.className = 'toc-item';
      li.dataset.slideNum = i;
      li.innerHTML = `
        <span class="toc-item-num">${String(i).padStart(2, '0')}</span>
        <span>${meta.topic}</span>
      `;
      li.addEventListener('click', () => {
        this.goToSlide(i);
        this.closeTocDrawer();
      });
      list.appendChild(li);
    }

    // Filter search inside drawer
    const searchInput = document.getElementById('tocSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const items = list.querySelectorAll('.toc-item');
        items.forEach((item) => {
          const text = item.textContent.toLowerCase();
          item.style.display = text.includes(query) ? 'flex' : 'none';
        });
      });
    }
  },

  openTocDrawer() {
    document.getElementById('tocDrawer')?.classList.add('open');
    document.getElementById('drawerBackdrop')?.classList.add('open');
    setTimeout(() => {
      document.getElementById('tocSearchInput')?.focus();
    }, 150);
  },

  closeTocDrawer() {
    document.getElementById('tocDrawer')?.classList.remove('open');
    document.getElementById('drawerBackdrop')?.classList.remove('open');
  },

  openShortcutsModal() {
    document.getElementById('shortcutsModal')?.classList.add('open');
  },

  closeShortcutsModal() {
    document.getElementById('shortcutsModal')?.classList.remove('open');
  },

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  },

  attachEvents() {
    // Nav Buttons
    document.getElementById('nextBtn')?.addEventListener('click', () => this.nextSlide());
    document.getElementById('prevBtn')?.addEventListener('click', () => this.prevSlide());

    // Drawer Buttons
    document.getElementById('openTocBtn')?.addEventListener('click', () => this.openTocDrawer());
    document.getElementById('closeTocBtn')?.addEventListener('click', () => this.closeTocDrawer());
    document.getElementById('drawerBackdrop')?.addEventListener('click', () => this.closeTocDrawer());

    // Modal Buttons
    document.getElementById('openShortcutsBtn')?.addEventListener('click', () => this.openShortcutsModal());
    document.getElementById('closeShortcutsBtn')?.addEventListener('click', () => this.closeShortcutsModal());
    document.getElementById('shortcutsModal')?.addEventListener('click', (e) => {
      if (e.target.id === 'shortcutsModal') this.closeShortcutsModal();
    });

    // Fullscreen Button
    document.getElementById('fullscreenBtn')?.addEventListener('click', () => this.toggleFullscreen());

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      // Ignore if typing inside input / select
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        if (e.key === 'Escape') {
          document.activeElement.blur();
        }
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
          e.preventDefault();
          this.nextSlide();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          this.prevSlide();
          break;
        case 'Home':
          e.preventDefault();
          this.goToSlide(1);
          break;
        case 'End':
          e.preventDefault();
          this.goToSlide(this.totalSlides);
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          this.toggleFullscreen();
          break;
        case 't':
        case 'T':
          e.preventDefault();
          const drawer = document.getElementById('tocDrawer');
          if (drawer?.classList.contains('open')) {
            this.closeTocDrawer();
          } else {
            this.openTocDrawer();
          }
          break;
        case '?':
          e.preventDefault();
          this.openShortcutsModal();
          break;
        case 'Escape':
          this.closeTocDrawer();
          this.closeShortcutsModal();
          break;
      }
    });

    // Listen to browser popstate (hash change)
    window.addEventListener('popstate', () => {
      const hash = window.location.hash.replace('#slide-', '').replace('#', '');
      const num = parseInt(hash, 10);
      if (!isNaN(num) && num !== this.currentSlide) {
        this.goToSlide(num);
      }
    });
  }
};

// ==============================================================================
// 2. Code Block Copy-to-Clipboard Handler
// ==============================================================================
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');
  const toast = document.getElementById('copyToast');

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      let codeToCopy = btn.getAttribute('data-copy');
      if (!codeToCopy) {
        const pre = btn.closest('.code-editor')?.querySelector('pre');
        if (pre) codeToCopy = pre.innerText;
      }

      if (!codeToCopy) return;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(codeToCopy);
        } else {
          // Fallback for non-secure contexts
          const textArea = document.createElement('textarea');
          textArea.value = codeToCopy;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }

        // Button feedback
        const originalText = btn.textContent;
        btn.textContent = '✓ Copied!';
        btn.classList.add('copied');

        // Show Toast
        if (toast) {
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 2000);
        }

        setTimeout(() => {
          btn.textContent = originalText;
          btn.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Copy failed: ', err);
      }
    });
  });
}

// ==============================================================================
// 3. Interactive Demo 1: Routing Simulator (Slide 10)
// ==============================================================================
function initRoutingSimulator() {
  const container = document.getElementById('routingSim1');
  if (!container) return;

  const urlPath = document.getElementById('sim1Path');
  const buttons = container.querySelectorAll('.sim-nav-btn');
  const views = {
    '/': document.getElementById('simView-home'),
    '/about': document.getElementById('simView-about'),
    '/products': document.getElementById('simView-products'),
    '/contact': document.getElementById('simView-contact')
  };

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const path = btn.getAttribute('data-sim-path');
      if (!path) return;

      // Update button styles
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update address bar
      if (urlPath) {
        urlPath.textContent = path;
      }

      // Switch active component view
      Object.entries(views).forEach(([route, view]) => {
        if (view) {
          if (route === path) {
            view.classList.add('active');
          } else {
            view.classList.remove('active');
          }
        }
      });
    });
  });
}

// ==============================================================================
// 4. Interactive Demo 2: Route Parameters Simulator (Slide 18)
// ==============================================================================
function initRouteParamDemo() {
  const container = document.getElementById('paramSimBox');
  if (!container) return;

  const cards = container.querySelectorAll('.product-pick-card');
  const urlDisplay = document.getElementById('paramSimUrl');
  const objDisplay = document.getElementById('paramSimObj');
  const idDisplay = document.getElementById('paramSimIdDisplay');
  const nameDisplay = document.getElementById('paramSimName');
  const innerIdDisplay = document.getElementById('paramSimInnerId');
  const priceDisplay = document.getElementById('paramSimPrice');

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const pid = card.getAttribute('data-pid');
      const pname = card.getAttribute('data-pname');
      const pprice = card.getAttribute('data-price');

      if (urlDisplay) urlDisplay.textContent = `/products/${pid}`;
      if (objDisplay) objDisplay.textContent = `{ id: "${pid}" }`;
      if (idDisplay) idDisplay.textContent = pid;
      if (innerIdDisplay) innerIdDisplay.textContent = pid;
      if (nameDisplay) nameDisplay.textContent = pname;
      if (priceDisplay) priceDisplay.textContent = pprice;
    });
  });
}

// ==============================================================================
// 5. Interactive Demo 3: Query Strings Generator (Slide 22)
// ==============================================================================
function initQueryStringsDemo() {
  const searchInput = document.getElementById('queryInputSearch');
  const catSelect = document.getElementById('querySelectCat');
  const sortSelect = document.getElementById('querySelectSort');

  const fullStringDisplay = document.getElementById('querySimFullString');
  const extractSearch = document.getElementById('extractSearchVal');
  const extractCat = document.getElementById('extractCatVal');
  const extractSort = document.getElementById('extractSortVal');

  function updateQuerySimulation() {
    const s = searchInput?.value.trim() || 'all';
    const c = catSelect?.value || 'electronics';
    const so = sortSelect?.value || 'price';

    const encodedS = encodeURIComponent(s);
    const queryString = `search=${encodedS}&category=${c}&sort=${so}`;

    if (fullStringDisplay) fullStringDisplay.textContent = queryString;
    if (extractSearch) extractSearch.textContent = s;
    if (extractCat) extractCat.textContent = c;
    if (extractSort) extractSort.textContent = so;
  }

  searchInput?.addEventListener('input', updateQuerySimulation);
  catSelect?.addEventListener('change', updateQuerySimulation);
  sortSelect?.addEventListener('change', updateQuerySimulation);

  updateQuerySimulation();
}

// ==============================================================================
// 6. Interactive Demo 4: Protected Routes Simulator (Slide 29)
// ==============================================================================
function initProtectedRoutesDemo() {
  let isAuth = false;

  const authBadge = document.getElementById('simAuthBadge');
  const toggleBtn = document.getElementById('simToggleAuthBtn');
  const visitBtn = document.getElementById('simVisitDashboardBtn');

  const deniedView = document.getElementById('simViewRedirectAlert');
  const allowedView = document.getElementById('simViewAllowedDashboard');

  function renderAuthState() {
    if (authBadge) {
      if (isAuth) {
        authBadge.textContent = 'ON (Logged In)';
        authBadge.className = 'auth-pill on';
      } else {
        authBadge.textContent = 'OFF (Not Logged In)';
        authBadge.className = 'auth-pill off';
      }
    }
  }

  toggleBtn?.addEventListener('click', () => {
    isAuth = !isAuth;
    renderAuthState();
  });

  visitBtn?.addEventListener('click', () => {
    if (isAuth) {
      if (deniedView) deniedView.style.display = 'none';
      if (allowedView) {
        allowedView.style.display = 'block';
        allowedView.style.animation = 'none';
        void allowedView.offsetWidth; // Trigger reflow
        allowedView.style.animation = 'fadeIn 0.3s ease';
      }
    } else {
      if (allowedView) allowedView.style.display = 'none';
      if (deniedView) {
        deniedView.style.display = 'block';
        deniedView.style.animation = 'none';
        void deniedView.offsetWidth; // Trigger reflow
        deniedView.style.animation = 'fadeIn 0.3s ease';
      }
    }
  });

  renderAuthState();
}

// ==============================================================================
// 7. Interactive Mini Project Explorer (Slide 30)
// ==============================================================================
function initProjectExplorer() {
  const container = document.getElementById('projectExplorerBox');
  if (!container) return;

  const items = container.querySelectorAll('.project-route-item');
  const tagEl = document.getElementById('projViewTag');
  const titleEl = document.getElementById('projViewTitle');
  const descEl = document.getElementById('projViewDesc');

  const data = {
    '/': {
      tag: 'Active Route: /',
      comp: '<Home />',
      title: 'DevStore Home Page',
      desc: 'The public storefront showcase featuring featured gadgets, sale announcements, and instant search entry.'
    },
    '/products': {
      tag: 'Active Route: /products',
      comp: '<Products />',
      title: 'Products Catalog Grid',
      desc: 'The searchable catalog displaying all available tech hardware with filters for category, price, and specs.'
    },
    '/products/101': {
      tag: 'Active Route: /products/:id',
      comp: '<ProductDetails />',
      title: 'Dynamic Product Details (#101)',
      desc: 'Dynamic template that extracts the item ID using useParams() to fetch specific product specs, customer reviews, and pricing.'
    },
    '/login': {
      tag: 'Active Route: /login',
      comp: '<Login />',
      title: 'User Login Portal',
      desc: 'Authentication form providing credential submission. On success, programmatically navigates to /dashboard using useNavigate().'
    },
    '/dashboard': {
      tag: 'Active Route: /dashboard',
      comp: '<Dashboard />',
      title: 'Protected Account Dashboard',
      desc: 'Private user console showing order tracking, personal shipping info, and payment methods. Wrapped inside <ProtectedRoute>.'
    }
  };

  items.forEach((item) => {
    item.addEventListener('click', () => {
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const route = item.getAttribute('data-proj-route');
      const info = data[route];
      if (info) {
        if (tagEl) tagEl.textContent = `${info.tag} • ${info.comp}`;
        if (titleEl) titleEl.textContent = info.title;
        if (descEl) descEl.textContent = info.desc;
      }
    });
  });
}

// ==============================================================================
// 8. Interactive Classroom Quiz (Slide 37)
// ==============================================================================
function initClassroomQuiz() {
  const questions = [
    {
      q: "1. Which package is commonly used for browser-based routing in React?",
      options: [
        "A. react-router-dom",
        "B. react-navigation",
        "C. router-react",
        "D. react-routes"
      ],
      correct: 0,
      explanation: "react-router-dom is the official npm package used for React client-side routing in web browsers."
    },
    {
      q: "2. Which component defines the container of all route rules in React Router v6?",
      options: [
        "A. <RouterList>",
        "B. <Routes>",
        "C. <RouteList>",
        "D. <Paths>"
      ],
      correct: 1,
      explanation: "<Routes> acts as the parent container that examines all child <Route> components and selects the best matching path."
    },
    {
      q: "3. Which Hook reads dynamic route parameters (e.g. /products/:id)?",
      options: [
        "A. useRoute()",
        "B. useParams()",
        "C. usePath()",
        "D. useURL()"
      ],
      correct: 1,
      explanation: "useParams() returns an object containing key/value pairs of dynamic URL segments matched by colon wildcards."
    },
    {
      q: "4. Which Hook reads URL query strings (e.g. ?category=shoes&sort=price)?",
      options: [
        "A. useSearchParams()",
        "B. useQuery()",
        "C. useParams()",
        "D. useURLParams()"
      ],
      correct: 0,
      explanation: "useSearchParams() returns a native URLSearchParams object allowing you to read query tokens with searchParams.get('key')."
    },
    {
      q: "5. What is the primary purpose of a Protected Route in React?",
      options: [
        "A. To encrypt component files with an SSL certificate",
        "B. To check authentication conditions and redirect unauthenticated users away from private views",
        "C. To prevent the browser from caching CSS files",
        "D. To disable right-click inspect element on the webpage"
      ],
      correct: 1,
      explanation: "A protected route wraps private components (like Dashboard) and redirects unauthorized visitors to /login using <Navigate />."
    }
  ];

  let currentQ = 0;
  let score = 0;
  let answered = false;

  const badgeEl = document.getElementById('quizProgressBadge');
  const scoreEl = document.getElementById('quizScoreText');
  const titleEl = document.getElementById('quizQuestionTitle');
  const optionsContainer = document.getElementById('quizOptionsContainer');
  const feedbackBox = document.getElementById('quizFeedbackBox');
  const nextBtn = document.getElementById('quizNextBtn');

  function renderQuestion() {
    if (!optionsContainer || !titleEl) return;

    answered = false;
    const qData = questions[currentQ];

    if (badgeEl) badgeEl.textContent = `Question ${currentQ + 1} of ${questions.length}`;
    if (scoreEl) scoreEl.textContent = score;
    titleEl.textContent = qData.q;

    if (feedbackBox) {
      feedbackBox.className = 'quiz-feedback-box';
      feedbackBox.style.display = 'none';
      feedbackBox.innerHTML = '';
    }
    if (nextBtn) nextBtn.style.display = 'none';

    optionsContainer.innerHTML = '';
    qData.options.forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `<span>${optText}</span>`;
      btn.addEventListener('click', () => handleOptionSelect(idx));
      optionsContainer.appendChild(btn);
    });
  }

  function handleOptionSelect(selectedIndex) {
    if (answered) return;
    answered = true;

    const qData = questions[currentQ];
    const isCorrect = selectedIndex === qData.correct;
    if (isCorrect) score++;

    if (scoreEl) scoreEl.textContent = score;

    const btns = optionsContainer.querySelectorAll('.quiz-option-btn');
    btns.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === qData.correct) {
        btn.classList.add('correct');
      } else if (idx === selectedIndex) {
        btn.classList.add('wrong');
      }
    });

    if (feedbackBox) {
      feedbackBox.style.display = 'block';
      feedbackBox.className = `quiz-feedback-box show ${isCorrect ? 'correct' : 'wrong'}`;
      feedbackBox.innerHTML = `
        <strong>${isCorrect ? '✅ Correct!' : '❌ Incorrect.'}</strong>
        <p style="margin-top: 0.35rem; font-size: 0.92rem; line-height: 1.5;">${qData.explanation}</p>
      `;
    }

    if (nextBtn) {
      nextBtn.style.display = 'inline-flex';
      nextBtn.textContent = currentQ < questions.length - 1 ? 'Next Question →' : 'View Final Score 🏆';
    }
  }

  nextBtn?.addEventListener('click', () => {
    if (currentQ < questions.length - 1) {
      currentQ++;
      renderQuestion();
    } else {
      // Show Final Score
      if (titleEl) titleEl.textContent = '🎉 Quiz Complete!';
      if (optionsContainer) {
        optionsContainer.innerHTML = `
          <div style="text-align: center; padding: 2rem 1rem; background: var(--bg-surface); border-radius: var(--radius-sm); border: 1px solid var(--border-medium);">
            <div style="font-size: 3rem; margin-bottom: 0.5rem;">${score >= 4 ? '🌟' : '📚'}</div>
            <h3 style="font-size: 1.6rem; color: var(--text-main); margin-bottom: 0.5rem;">Your Final Score: ${score} / ${questions.length}</h3>
            <p style="color: var(--text-secondary); max-width: 480px; margin: 0 auto; line-height: 1.6;">
              ${score === 5 ? 'Perfect score! You have completely mastered React Router essentials.' : 'Great job! Review any missed concepts in the cheat sheet on the next slide.'}
            </p>
            <button class="quiz-next-btn" id="quizRestartBtn" style="margin-top: 1.25rem;">
              Restart Quiz 🔄
            </button>
          </div>
        `;
        document.getElementById('quizRestartBtn')?.addEventListener('click', () => {
          currentQ = 0;
          score = 0;
          renderQuestion();
        });
      }
      if (feedbackBox) feedbackBox.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      if (badgeEl) badgeEl.textContent = 'Completed';
    }
  });

  renderQuestion();
}

// ==============================================================================
// 9. Document Ready Initialization
// ==============================================================================
document.addEventListener('DOMContentLoaded', () => {
  Deck.init();
  initCopyButtons();
  initRoutingSimulator();
  initRouteParamDemo();
  initQueryStringsDemo();
  initProtectedRoutesDemo();
  initProjectExplorer();
  initClassroomQuiz();
});
