/**
 * ==============================================================================
 * React Day 8: Context API
 * Interactive Presentation Engine & Demonstration Studio
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
    1: { section: "INTRODUCTION", topic: "React Context API — Title" },
    2: { section: "INTRODUCTION", topic: "Learning Objectives" },
    3: { section: "PROP DRILLING", topic: "Passing Data Between Components" },
    4: { section: "PROP DRILLING", topic: "What Is Prop Drilling?" },
    5: { section: "PROP DRILLING", topic: "The Prop Drilling Problem & Demo" },
    6: { section: "INTRODUCTION", topic: "The Solution: Context" },
    7: { section: "CONTEXT API", topic: "What Is Context API?" },
    8: { section: "CONTEXT API", topic: "Interactive Context Flow" },
    9: { section: "CONTEXT API", topic: "Context Is Not Automatically Global State" },
    10: { section: "CREATING CONTEXT", topic: "createContext() Syntax & Export" },
    11: { section: "CREATING CONTEXT", topic: "Creating Context With a Default Value" },
    12: { section: "CREATING CONTEXT", topic: "Context Project File Structure" },
    13: { section: "PROVIDER", topic: "What Is a Provider?" },
    14: { section: "PROVIDER", topic: "Providing a Value via value Prop" },
    15: { section: "PROVIDER", topic: "Provider Tree Hierarchy" },
    16: { section: "PROVIDER", topic: "Provider Scope: Inside vs Outside" },
    17: { section: "CONSUMING CONTEXT", topic: "What Is useContext()?" },
    18: { section: "CONSUMING CONTEXT", topic: "Using useContext() in Components" },
    19: { section: "CONSUMING CONTEXT", topic: "Context Flow Example" },
    20: { section: "CONSUMING CONTEXT", topic: "Props vs Context Comparison" },
    21: { section: "BASIC EXAMPLE", topic: "Step 1: UserContext.jsx" },
    22: { section: "BASIC EXAMPLE", topic: "Step 2: Provider in App.jsx" },
    23: { section: "BASIC EXAMPLE", topic: "Step 3: Consuming Context in Profile.jsx" },
    24: { section: "BASIC EXAMPLE", topic: "Complete Flow: Create → Provide → Consume" },
    25: { section: "MULTIPLE VALUES", topic: "Providing Multiple Values in an Object" },
    26: { section: "MULTIPLE VALUES", topic: "Context With Functions (Logout, Actions)" },
    27: { section: "THEME EXAMPLE", topic: "Theme Context Use Case" },
    28: { section: "THEME EXAMPLE", topic: "Create Theme Context" },
    29: { section: "THEME EXAMPLE", topic: "Provide Theme in App" },
    30: { section: "THEME EXAMPLE", topic: "Consume Theme & Interactive Switcher" },
    31: { section: "PRACTICAL PROJECT", topic: "Mini Project: User Dashboard" },
    32: { section: "PRACTICAL PROJECT", topic: "Dashboard Project File Structure" },
    33: { section: "PRACTICAL PROJECT", topic: "Dashboard Architecture Flow" },
    34: { section: "PRACTICAL PROJECT", topic: "Dashboard: UserContext.jsx" },
    35: { section: "PRACTICAL PROJECT", topic: "Dashboard: Provider in App.jsx" },
    36: { section: "PRACTICAL PROJECT", topic: "Dashboard: Profile.jsx Consumer" },
    37: { section: "REVIEW", topic: "Common Context Mistakes & Pitfalls" },
    38: { section: "REVIEW", topic: "When to Use Context vs Props" },
    39: { section: "REVIEW", topic: "Quick Classroom Quiz" },
    40: { section: "REVIEW", topic: "Summary & Key Takeaways" }
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

    // Update slide counter
    const currentNumEl = document.getElementById('currentSlideNum');
    if (currentNumEl) currentNumEl.textContent = this.currentSlide;

    // Update header topic badge
    const info = this.topicMap[this.currentSlide] || { section: "REACT", topic: `Slide ${this.currentSlide}` };
    const secTag = document.getElementById('headerSectionTag');
    const topicEl = document.getElementById('headerTopic');
    if (secTag) secTag.textContent = info.section;
    if (topicEl) topicEl.textContent = info.topic;

    // Update URL hash
    history.replaceState(null, '', `#slide-${this.currentSlide}`);

    // Update navigation buttons state
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    if (prevBtn) prevBtn.disabled = this.currentSlide === 1;
    if (nextBtn) nextBtn.disabled = this.currentSlide === this.totalSlides;

    // Update active item in TOC drawer
    const tocItems = document.querySelectorAll('.toc-item');
    tocItems.forEach(item => {
      const slideNum = parseInt(item.dataset.slide, 10);
      if (slideNum === this.currentSlide) {
        item.classList.add('active');
        item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else {
        item.classList.remove('active');
      }
    });
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
    const tocList = document.getElementById('tocList');
    if (!tocList) return;

    tocList.innerHTML = '';
    let currentSec = '';

    for (let i = 1; i <= this.totalSlides; i++) {
      const info = this.topicMap[i] || { section: "GENERAL", topic: `Slide ${i}` };

      if (info.section !== currentSec) {
        currentSec = info.section;
        const secHeader = document.createElement('div');
        secHeader.className = 'toc-section-header';
        secHeader.textContent = currentSec;
        tocList.appendChild(secHeader);
      }

      const li = document.createElement('li');
      li.className = 'toc-item';
      li.dataset.slide = i;
      li.innerHTML = `
        <span class="toc-num">${String(i).padStart(2, '0')}</span>
        <span class="toc-name">${info.topic}</span>
      `;
      li.addEventListener('click', () => {
        this.goToSlide(i);
        this.closeToc();
      });
      tocList.appendChild(li);
    }
  },

  filterToc(query) {
    const q = query.toLowerCase().trim();
    const items = document.querySelectorAll('.toc-item');
    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(q) ? 'flex' : 'none';
    });
  },

  openToc() {
    const drawer = document.getElementById('tocDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    if (drawer) drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    const searchInput = document.getElementById('tocSearchInput');
    if (searchInput) {
      searchInput.value = '';
      this.filterToc('');
      setTimeout(() => searchInput.focus(), 200);
    }
  },

  closeToc() {
    const drawer = document.getElementById('tocDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
  },

  openShortcuts() {
    const modal = document.getElementById('shortcutsModal');
    if (modal) modal.classList.add('open');
  },

  closeShortcuts() {
    const modal = document.getElementById('shortcutsModal');
    if (modal) modal.classList.remove('open');
  },

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn(`Fullscreen error: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  },

  showToast(msg) {
    let toast = document.getElementById('deckToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'deckToast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>✓</span> <span>${msg}</span>`;
    toast.classList.add('show');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  },

  attachEvents() {
    // Nav buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    if (prevBtn) prevBtn.addEventListener('click', () => this.prevSlide());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());

    // Drawer buttons
    const openTocBtn = document.getElementById('openTocBtn');
    const closeTocBtn = document.getElementById('closeTocBtn');
    const backdrop = document.getElementById('drawerBackdrop');
    if (openTocBtn) openTocBtn.addEventListener('click', () => this.openToc());
    if (closeTocBtn) closeTocBtn.addEventListener('click', () => this.closeToc());
    if (backdrop) backdrop.addEventListener('click', () => {
      this.closeToc();
      this.closeShortcuts();
    });

    // Shortcuts modal
    const openShortcutsBtn = document.getElementById('openShortcutsBtn');
    const closeShortcutsBtn = document.getElementById('closeShortcutsBtn');
    if (openShortcutsBtn) openShortcutsBtn.addEventListener('click', () => this.openShortcuts());
    if (closeShortcutsBtn) closeShortcutsBtn.addEventListener('click', () => this.closeShortcuts());

    // Fullscreen button
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (fullscreenBtn) fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());

    // TOC search input
    const tocSearchInput = document.getElementById('tocSearchInput');
    if (tocSearchInput) {
      tocSearchInput.addEventListener('input', (e) => this.filterToc(e.target.value));
    }

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        if (e.key === 'Escape') {
          e.target.blur();
          this.closeToc();
          this.closeShortcuts();
        }
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ':
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
          if (drawer && drawer.classList.contains('open')) {
            this.closeToc();
          } else {
            this.openToc();
          }
          break;
        case '?':
          e.preventDefault();
          this.openShortcuts();
          break;
        case 'Escape':
          this.closeToc();
          this.closeShortcuts();
          break;
      }
    });

    // Attach copy button listeners to all code blocks
    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const codePanel = btn.closest('.code-panel');
        if (!codePanel) return;
        const codeEl = codePanel.querySelector('.code-body');
        if (!codeEl) return;
        const text = codeEl.innerText;
        navigator.clipboard.writeText(text).then(() => {
          const originalText = btn.innerHTML;
          btn.classList.add('copied');
          btn.innerHTML = `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!`;
          this.showToast('Code copied to clipboard!');
          setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = originalText;
          }, 2000);
        }).catch(err => {
          console.error('Failed to copy: ', err);
        });
      });
    });
  }
};

// ==============================================================================
// 2. Interactive Demonstrations
// ==============================================================================

// --- DEMO 1: Prop Drilling Simulator (Slide 5) ---
const DemoPropDrilling = {
  isAnimating: false,
  nodes: ['drillApp', 'drillHeader', 'drillMenu', 'drillProfile', 'drillAvatar'],

  run() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const statusEl = document.getElementById('drillStatusText');
    const quoteEl = document.getElementById('drillQuoteBox');
    if (statusEl) statusEl.textContent = 'Passing username through every level...';
    if (quoteEl) quoteEl.style.opacity = '0';

    // Reset all nodes
    this.nodes.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('active-drill');
      const badge = document.getElementById(id + 'Badge');
      if (badge) badge.style.display = 'none';
    });

    let step = 0;
    const interval = setInterval(() => {
      if (step < this.nodes.length) {
        const currentId = this.nodes[step];
        const el = document.getElementById(currentId);
        if (el) el.classList.add('active-drill');
        const badge = document.getElementById(currentId + 'Badge');
        if (badge) badge.style.display = 'inline-block';
        step++;
      } else {
        clearInterval(interval);
        this.isAnimating = false;
        if (statusEl) statusEl.textContent = 'Prop arrived at Avatar!';
        if (quoteEl) {
          quoteEl.style.opacity = '1';
          quoteEl.innerHTML = `<strong>"Every intermediate component has to forward the prop, even though only Avatar needed it!"</strong>`;
        }
      }
    }, 400);
  }
};

// --- DEMO 2: Context Direct Broadcast (Slide 6) ---
const DemoContextDirect = {
  isAnimating: false,

  run() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const providerEl = document.getElementById('ctxProviderNode');
    const profileEl = document.getElementById('ctxProfileNode');
    const avatarEl = document.getElementById('ctxAvatarNode');
    const headerEl = document.getElementById('ctxHeaderNode');
    const statusEl = document.getElementById('ctxStatusText');

    if (providerEl) providerEl.classList.add('active-context');
    if (statusEl) statusEl.textContent = 'Provider broadcasts value to tree...';

    setTimeout(() => {
      // Direct access in Profile & Avatar without touching Header
      if (profileEl) profileEl.classList.add('active-context');
      if (avatarEl) avatarEl.classList.add('active-context');
      if (headerEl) headerEl.style.opacity = '0.4'; // Unaffected intermediate node!

      const badge = document.getElementById('ctxProfileBadge');
      if (badge) badge.style.display = 'inline-block';

      if (statusEl) {
        statusEl.innerHTML = `<span style="color:var(--react-cyan); font-weight:700;">Direct Access!</span> Profile consumes user with <code>useContext()</code>. Zero props passed through intermediate nodes!`;
      }
      this.isAnimating = false;
    }, 500);
  },

  reset() {
    const providerEl = document.getElementById('ctxProviderNode');
    const profileEl = document.getElementById('ctxProfileNode');
    const avatarEl = document.getElementById('ctxAvatarNode');
    const headerEl = document.getElementById('ctxHeaderNode');
    const badge = document.getElementById('ctxProfileBadge');
    const statusEl = document.getElementById('ctxStatusText');

    if (providerEl) providerEl.classList.remove('active-context');
    if (profileEl) profileEl.classList.remove('active-context');
    if (avatarEl) avatarEl.classList.remove('active-context');
    if (headerEl) headerEl.style.opacity = '1';
    if (badge) badge.style.display = 'none';
    if (statusEl) statusEl.textContent = 'Click "Provide User" to observe direct context access.';
  }
};

// --- DEMO 3: Create → Provide → Consume Interactive Stage Cards (Slide 24) ---
const DemoThreeStages = {
  stages: {
    create: {
      title: "1. CREATE: createContext()",
      snippet: `import { createContext } from "react";\n\nconst UserContext = createContext(null);\nexport default UserContext;`,
      desc: "Creates a Context object. Call this outside your components, typically in its own dedicated file (e.g. UserContext.jsx)."
    },
    provide: {
      title: "2. PROVIDE: <Context.Provider value={...}>",
      snippet: `function App() {\n  const user = { name: "Mubashir", role: "Developer" };\n\n  return (\n    <UserContext.Provider value={user}>\n      <Profile />\n    </UserContext.Provider>\n  );\n}`,
      desc: "Wraps the component tree and passes the data through the 'value' prop. All children inside can now access this value."
    },
    consume: {
      title: "3. CONSUME: useContext(Context)",
      snippet: `import { useContext } from "react";\nimport UserContext from "./context/UserContext";\n\nfunction Profile() {\n  const user = useContext(UserContext);\n  return <h2>Hello, {user.name}!</h2>;\n}`,
      desc: "Reads the nearest context value above it in the component tree. No props needed in intermediate components!"
    }
  },

  select(stageKey) {
    document.querySelectorAll('.stage-card').forEach(c => c.classList.remove('active'));
    const targetCard = document.getElementById(`stageCard-${stageKey}`);
    if (targetCard) targetCard.classList.add('active');

    const info = this.stages[stageKey];
    const titleEl = document.getElementById('stageDetailTitle');
    const snippetEl = document.getElementById('stageDetailSnippet');
    const descEl = document.getElementById('stageDetailDesc');

    if (titleEl) titleEl.textContent = info.title;
    if (snippetEl) snippetEl.textContent = info.snippet;
    if (descEl) descEl.textContent = info.desc;
  }
};

// --- DEMO 4: Live User Context Simulator (Slide 25) ---
const DemoLiveUserContext = {
  init() {
    const nameInput = document.getElementById('simUserName');
    const roleInput = document.getElementById('simUserRole');
    const emailInput = document.getElementById('simUserEmail');

    if (nameInput) nameInput.addEventListener('input', () => this.update());
    if (roleInput) roleInput.addEventListener('input', () => this.update());
    if (emailInput) emailInput.addEventListener('input', () => this.update());

    this.update();
  },

  update() {
    const nameInput = document.getElementById('simUserName');
    const roleInput = document.getElementById('simUserRole');
    const emailInput = document.getElementById('simUserEmail');

    const name = nameInput ? nameInput.value || 'Guest' : 'Mubashir';
    const role = roleInput ? roleInput.value || 'Student' : 'MERN Developer';
    const email = emailInput ? emailInput.value || 'user@example.com' : 'mubashir@gmail.com';

    // Update Consumer Display
    const previewName = document.getElementById('previewConsumerName');
    const previewRole = document.getElementById('previewConsumerRole');
    const previewEmail = document.getElementById('previewConsumerEmail');

    if (previewName) previewName.textContent = name;
    if (previewRole) previewRole.textContent = role;
    if (previewEmail) previewEmail.textContent = email;

    // Update Provider Code Snippet
    const providerCode = document.getElementById('simProviderSnippet');
    if (providerCode) {
      providerCode.innerHTML = `&lt;<span class="tag">UserContext.Provider</span> <span class="prop">value</span>={{
  <span class="prop">name</span>: <span class="str">"${name}"</span>,
  <span class="prop">role</span>: <span class="str">"${role}"</span>,
  <span class="prop">email</span>: <span class="str">"${email}"</span>
}}&gt;`;
    }
  }
};

// --- DEMO 5: Theme Context Switcher (Slide 30) ---
const DemoThemeSwitcher = {
  currentTheme: 'dark',

  toggle() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.render();
  },

  setTheme(t) {
    this.currentTheme = t;
    this.render();
  },

  render() {
    const container = document.getElementById('themeDemoBox');
    const badge = document.getElementById('themeDemoBadge');
    const providerSnippet = document.getElementById('themeProviderSnippet');
    const toggleBtn = document.getElementById('themeToggleBtn');

    if (container) {
      container.className = `theme-switch-container theme-${this.currentTheme}`;
    }

    if (badge) {
      badge.textContent = `Theme: ${this.currentTheme.toUpperCase()}`;
    }

    if (toggleBtn) {
      toggleBtn.innerHTML = this.currentTheme === 'dark' ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode';
    }

    if (providerSnippet) {
      providerSnippet.innerHTML = `&lt;<span class="tag">ThemeContext.Provider</span> <span class="prop">value</span>=<span class="str">"${this.currentTheme}"</span>&gt;`;
    }
  }
};

// --- Interactive Context Flow Diagram (Slide 8) ---
const DemoContextFlow = {
  nodes: {
    create: "Step 1: createContext() initializes the shared context container.",
    provider: "Step 2: Provider wraps the components that need access to the data.",
    value: "Step 3: The 'value' prop on <Provider> holds the actual data or state.",
    components: "Step 4: All child and descendant components inside can read the value.",
    hook: "Step 5: useContext() is the React Hook components call to read the context.",
    data: "Step 6: The component directly renders or utilizes the shared data!"
  },

  highlight(stepKey) {
    document.querySelectorAll('.flow-step').forEach(s => s.classList.remove('active-step'));
    const target = document.getElementById(`flowStep-${stepKey}`);
    if (target) target.classList.add('active-step');

    const descEl = document.getElementById('flowActiveDesc');
    if (descEl && this.nodes[stepKey]) {
      descEl.textContent = this.nodes[stepKey];
    }
  }
};

// --- Interactive Project File Explorer (Slide 12 & 32) ---
const DemoFileExplorer = {
  files: {
    userContext: {
      name: "src/context/UserContext.jsx",
      role: "Creates and exports the UserContext object using createContext(null). Cleanly separated from UI logic.",
      snippet: `import { createContext } from "react";\n\nconst UserContext = createContext(null);\nexport default UserContext;`
    },
    app: {
      name: "src/App.jsx",
      role: "Imports UserContext and renders <UserContext.Provider value={user}> wrapping Header, Sidebar, and Dashboard.",
      snippet: `import UserContext from "./context/UserContext";\n\nfunction App() {\n  const user = { name: "Mubashir", role: "Developer" };\n  return (\n    <UserContext.Provider value={user}>\n      <Header />\n      <Dashboard />\n    </UserContext.Provider>\n  );\n}`
    },
    header: {
      name: "src/components/Header.jsx",
      role: "Standard header component. Doesn't need to forward user props to anything!",
      snippet: `function Header() {\n  return <header><h1>Dashboard App</h1></header>;\n}`
    },
    sidebar: {
      name: "src/components/Sidebar.jsx",
      role: "Sidebar navigation component. Completely clean of user props.",
      snippet: `function Sidebar() {\n  return <aside><nav>Links</nav></aside>;\n}`
    },
    dashboard: {
      name: "src/components/Dashboard.jsx",
      role: "Renders the main content area and embeds <Profile />. Does NOT need to receive or forward user props!",
      snippet: `import Profile from "./Profile";\n\nfunction Dashboard() {\n  return <main><Profile /></main>;\n}`
    },
    profile: {
      name: "src/components/Profile.jsx",
      role: "The Consumer! Calls useContext(UserContext) to read user data directly from the Provider above.",
      snippet: `import { useContext } from "react";\nimport UserContext from "../context/UserContext";\n\nfunction Profile() {\n  const user = useContext(UserContext);\n  return <h2>{user.name} ({user.role})</h2>;\n}`
    },
    main: {
      name: "src/main.jsx",
      role: "Root entry point for React mounting <App /> into the index.html DOM root.",
      snippet: `import ReactDOM from "react-dom/client";\nimport App from "./App";\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`
    }
  },

  selectFile(key, containerId = 'fileDetailsBox') {
    document.querySelectorAll('.file-item').forEach(f => f.classList.remove('active'));
    const activeItem = document.getElementById(`fileItem-${key}`);
    if (activeItem) activeItem.classList.add('active');

    const info = this.files[key];
    const box = document.getElementById(containerId);
    if (!box || !info) return;

    box.innerHTML = `
      <div style="font-family:var(--font-mono); font-size:0.85rem; color:var(--react-cyan); font-weight:700; margin-bottom:0.4rem;">${info.name}</div>
      <p style="font-size:0.85rem; color:var(--text-secondary); line-height:1.5; margin-bottom:0.75rem;">${info.role}</p>
      <div class="code-panel">
        <div class="code-body" style="padding:0.6rem 0.8rem; font-size:0.8rem;">${info.snippet}</div>
      </div>
    `;
  }
};

// ==============================================================================
// 3. Interactive Classroom Quiz (Slide 39)
// ==============================================================================
const Quiz = {
  currentQ: 0,
  score: 0,
  questions: [
    {
      q: "1. What problem does Context API help solve?",
      options: [
        "CSS and styling issues",
        "Prop drilling",
        "Database querying",
        "Page routing"
      ],
      correct: 1,
      exp: "Context API eliminates 'prop drilling', where data must be passed manually through intermediate components that don't need it."
    },
    {
      q: "2. Which function creates a new context object in React?",
      options: [
        "createState()",
        "createContext()",
        "useContext()",
        "createProvider()"
      ],
      correct: 1,
      exp: "createContext() is imported from 'react' to create the context object (e.g. const UserContext = createContext(null))."
    },
    {
      q: "3. Which React Hook is used to consume/read a context value?",
      options: [
        "useState()",
        "useEffect()",
        "useContext()",
        "useProps()"
      ],
      correct: 2,
      exp: "useContext(ContextObject) reads the current value provided by the nearest <Context.Provider> above it."
    },
    {
      q: "4. What is the primary role of a Context Provider?",
      options: [
        "It automatically fetches data from a backend server",
        "It makes a context value available to all descendant components below it in the tree",
        "It prevents components from re-rendering",
        "It converts functional components into class components"
      ],
      correct: 1,
      exp: "<Context.Provider value={data}> acts as a broadcaster, making data available to any child component inside its tree."
    },
    {
      q: "5. Can a component located outside the Provider access its value?",
      options: [
        "Yes, context is automatically available everywhere in the window",
        "No, only components rendered inside the Provider tree can access the provided value",
        "Only if the component is an arrow function",
        "Only when running in production mode"
      ],
      correct: 1,
      exp: "Provider controls scope! Components outside the Provider tree cannot read the Provider's value (they will fall back to default or undefined)."
    }
  ],

  init() {
    this.render();
  },

  render() {
    const box = document.getElementById('quizBox');
    if (!box) return;

    if (this.currentQ >= this.questions.length) {
      box.innerHTML = `
        <div style="text-align: center; padding: 2rem 1rem;">
          <div style="font-size: 3rem; margin-bottom: 0.5rem;">🎉</div>
          <h3 style="font-size: 1.5rem; color: var(--react-cyan); margin-bottom: 0.5rem;">Quiz Completed!</h3>
          <p style="color: var(--text-secondary); font-size: 1rem; margin-bottom: 1.5rem;">
            You scored <strong style="color: var(--react-cyan); font-size: 1.25rem;">${this.score}</strong> out of <strong>${this.questions.length}</strong> questions correctly!
          </p>
          <button class="nav-btn primary" onclick="Quiz.restart()">↺ Restart Quiz</button>
        </div>
      `;
      return;
    }

    const item = this.questions[this.currentQ];
    const letters = ['A', 'B', 'C', 'D'];

    box.innerHTML = `
      <div class="quiz-header-bar">
        <span class="quiz-counter">Question ${this.currentQ + 1} of ${this.questions.length}</span>
        <span class="quiz-score-badge">Score: <strong>${this.score}</strong></span>
      </div>
      <div class="quiz-question-text">${item.q}</div>
      <div class="quiz-options" id="quizOptions">
        ${item.options.map((opt, idx) => `
          <div class="quiz-option" onclick="Quiz.selectAnswer(${idx})">
            <span class="quiz-opt-letter">${letters[idx]}</span>
            <span>${opt}</span>
          </div>
        `).join('')}
      </div>
      <div class="quiz-feedback" id="quizFeedback"></div>
      <div class="quiz-actions" id="quizActions" style="display: none;">
        <button class="nav-btn primary" onclick="Quiz.next()">Next Question →</button>
      </div>
    `;
  },

  selectAnswer(idx) {
    const item = this.questions[this.currentQ];
    const options = document.querySelectorAll('.quiz-option');
    const feedback = document.getElementById('quizFeedback');
    const actions = document.getElementById('quizActions');

    options.forEach(opt => opt.classList.add('disabled'));

    const isCorrect = idx === item.correct;
    if (isCorrect) {
      this.score++;
      options[idx].classList.add('correct');
      feedback.className = 'quiz-feedback show';
      feedback.innerHTML = `<strong>✅ Correct!</strong> ${item.exp}`;
    } else {
      options[idx].classList.add('incorrect');
      options[item.correct].classList.add('correct');
      feedback.className = 'quiz-feedback show wrong';
      feedback.innerHTML = `<strong>❌ Incorrect.</strong> The correct answer is <strong>${item.options[item.correct]}</strong>.<br>${item.exp}`;
    }

    if (actions) actions.style.display = 'flex';
  },

  next() {
    this.currentQ++;
    this.render();
  },

  restart() {
    this.currentQ = 0;
    this.score = 0;
    this.render();
  }
};

// ==============================================================================
// 4. Global DOM Content Loaded Initialization
// ==============================================================================
document.addEventListener('DOMContentLoaded', () => {
  Deck.init();
  DemoLiveUserContext.init();
  DemoThemeSwitcher.render();
  Quiz.init();
});
