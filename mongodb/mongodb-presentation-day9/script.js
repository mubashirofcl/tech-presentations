/**
 * ==============================================================================
 * MongoDB Day 9 — Compass, Atlas & Movie Watchlist API
 * Presentation Engine & Interactive Workshop Simulator
 * ==============================================================================
 */

// ==============================================================================
// 1. Presentation Deck Controller
// ==============================================================================
const Deck = {
  currentSlide: 1,
  totalSlides: 22,
  slides: [],
  topicMap: {
    1: { section: "COMPASS & ATLAS", topic: "Title: Compass, Atlas & Movie Watchlist API" },
    2: { section: "COMPASS", topic: "Learning Objectives" },
    3: { section: "COMPASS", topic: "What Is MongoDB Compass? (GUI vs mongosh)" },
    4: { section: "COMPASS", topic: "Compass Interface: Hierarchy & Simulator" },
    5: { section: "COMPASS", topic: "Connecting to Local MongoDB (127.0.0.1:27017)" },
    6: { section: "COMPASS", topic: "Working With Documents: Visual Collection Manager" },
    7: { section: "ATLAS", topic: "What Is MongoDB Atlas? (Cloud Platform)" },
    8: { section: "ATLAS", topic: "Local MongoDB vs MongoDB Atlas Comparison" },
    9: { section: "ATLAS", topic: "Atlas Setup Workflow (Interactive 6-Step Stepper)" },
    10: { section: "ATLAS", topic: "Atlas Connection String & Environment Security" },
    11: { section: "COMPASS + ATLAS", topic: "Compass & Atlas Together: Architecture Synergy" },
    12: { section: "COMPASS + ATLAS", topic: "GUI Inspection vs Application Code Roles" },
    13: { section: "MOVIE API", topic: "Project Overview: Movie Watchlist API" },
    14: { section: "MOVIE API", topic: "Movie Data Model & Mongoose Schema" },
    15: { section: "MOVIE API", topic: "Clean Project Directory Structure" },
    16: { section: "MOVIE API", topic: "REST API Endpoints Specification Table" },
    17: { section: "MOVIE API", topic: "Add Movie Endpoint (POST /movies)" },
    18: { section: "MOVIE API", topic: "Get Movies Endpoint (GET /movies)" },
    19: { section: "MOVIE API", topic: "Update & Delete Endpoints (PUT & DELETE)" },
    20: { section: "PRACTICAL FLOW", topic: "Complete End-to-End Architecture Flow" },
    21: { section: "PRACTICAL FLOW", topic: "Testing the API & Live CRUD Simulation" },
    22: { section: "PRACTICAL FLOW", topic: "Final Summary & Golden Developer Loop" }
  },

  init() {
    this.slides = Array.from(document.querySelectorAll('.slide'));
    this.totalSlides = this.slides.length || 22;

    const totalEl = document.getElementById('totalSlidesNum');
    if (totalEl) totalEl.textContent = this.totalSlides;

    this.buildTocDrawer();

    // Check URL hash for initial slide
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
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
      const pct = (this.currentSlide / this.totalSlides) * 100;
      progressBar.style.width = `${pct}%`;
    }

    // Update footer counter
    const currentNumEl = document.getElementById('currentSlideNum');
    if (currentNumEl) currentNumEl.textContent = this.currentSlide;

    // Update header badges
    const meta = this.topicMap[this.currentSlide] || { section: "DAY 9", topic: `Slide ${this.currentSlide}` };
    const headerSectionTag = document.getElementById('headerSectionTag');
    const headerTopic = document.getElementById('headerTopic');

    if (headerSectionTag) headerSectionTag.textContent = meta.section;
    if (headerTopic) headerTopic.textContent = meta.topic;

    // Update TOC active state
    document.querySelectorAll('.toc-item').forEach((item) => {
      const sNum = parseInt(item.dataset.slide, 10);
      if (sNum === this.currentSlide) {
        item.classList.add('active');
        item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else {
        item.classList.remove('active');
      }
    });

    // Update URL hash without jumping
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

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn(`Fullscreen error: ${err.message}`);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.warn(`Exit fullscreen error: ${err.message}`);
      });
    }
  },

  openToc() {
    const drawer = document.getElementById('tocDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    if (drawer) drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
  },

  closeToc() {
    const drawer = document.getElementById('tocDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
  },

  toggleToc() {
    const drawer = document.getElementById('tocDrawer');
    if (drawer && drawer.classList.contains('open')) {
      this.closeToc();
    } else {
      this.openToc();
    }
  },

  openShortcuts() {
    const modal = document.getElementById('shortcutsModal');
    if (modal) modal.classList.add('open');
  },

  closeShortcuts() {
    const modal = document.getElementById('shortcutsModal');
    if (modal) modal.classList.remove('open');
  },

  toggleShortcuts() {
    const modal = document.getElementById('shortcutsModal');
    if (modal && modal.classList.contains('open')) {
      this.closeShortcuts();
    } else {
      this.openShortcuts();
    }
  },

  buildTocDrawer() {
    const list = document.getElementById('tocList');
    if (!list) return;

    list.innerHTML = '';
    for (let i = 1; i <= this.totalSlides; i++) {
      const meta = this.topicMap[i] || { section: "TOPIC", topic: `Slide ${i}` };
      const li = document.createElement('li');
      li.className = 'toc-item';
      li.dataset.slide = i;
      li.innerHTML = `
        <span class="toc-item-num">${String(i).padStart(2, '0')}</span>
        <span class="toc-item-title">${meta.topic}</span>
      `;
      li.addEventListener('click', () => {
        this.goToSlide(i);
        this.closeToc();
      });
      list.appendChild(li);
    }

    // Filter input logic
    const searchInput = document.getElementById('tocSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase().trim();
        document.querySelectorAll('.toc-item').forEach((item) => {
          const text = item.textContent.toLowerCase();
          item.style.display = text.includes(val) ? 'flex' : 'none';
        });
      });
    }
  },

  attachEvents() {
    // Next / Prev buttons
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());
    if (prevBtn) prevBtn.addEventListener('click', () => this.prevSlide());

    // Drawer & Modal toggles
    const openTocBtn = document.getElementById('openTocBtn');
    const closeTocBtn = document.getElementById('closeTocBtn');
    const drawerBackdrop = document.getElementById('drawerBackdrop');
    if (openTocBtn) openTocBtn.addEventListener('click', () => this.openToc());
    if (closeTocBtn) closeTocBtn.addEventListener('click', () => this.closeToc());
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', () => this.closeToc());

    const openShortcutsBtn = document.getElementById('openShortcutsBtn');
    const closeShortcutsBtn = document.getElementById('closeShortcutsBtn');
    const shortcutsModal = document.getElementById('shortcutsModal');
    if (openShortcutsBtn) openShortcutsBtn.addEventListener('click', () => this.openShortcuts());
    if (closeShortcutsBtn) closeShortcutsBtn.addEventListener('click', () => this.closeShortcuts());
    if (shortcutsModal) {
      shortcutsModal.addEventListener('click', (e) => {
        if (e.target === shortcutsModal) this.closeShortcuts();
      });
    }

    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (fullscreenBtn) fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      // Ignore if focus is in an input field
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
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
          this.toggleToc();
          break;
        case '?':
          e.preventDefault();
          this.toggleShortcuts();
          break;
        case 'Escape':
          this.closeToc();
          this.closeShortcuts();
          break;
      }
    });
  }
};

// ==============================================================================
// 2. Feature 1: MongoDB Compass Simulation (Slide 4)
// ==============================================================================
const CompassSim = {
  currentDb: 'movieDB',
  currentCollection: 'movies',
  currentTab: 'documents',
  filterText: '{}',

  sampleDocuments: [
    {
      _id: "65f29a0b12c4e1a8a1",
      title: "Interstellar",
      genre: "Sci-Fi",
      year: 2014,
      rating: 8.7,
      watched: false
    },
    {
      _id: "65f29a0b12c5e2b9b2",
      title: "Inception",
      genre: "Sci-Fi",
      year: 2010,
      rating: 8.8,
      watched: true
    },
    {
      _id: "65f29a0b12c6e3c0c3",
      title: "The Dark Knight",
      genre: "Action",
      year: 2008,
      rating: 9.0,
      watched: true
    }
  ],

  init() {
    this.render();
  },

  selectDb(dbName) {
    this.currentDb = dbName;
    document.querySelectorAll('.compass-tree .tree-item').forEach(el => el.classList.remove('active'));
    
    if (dbName === 'movieDB') {
      const el = document.getElementById('treeMovieDB');
      if (el) el.classList.add('active');
    } else if (dbName === 'admin') {
      const el = document.getElementById('treeAdmin');
      if (el) el.classList.add('active');
    } else if (dbName === 'config') {
      const el = document.getElementById('treeConfig');
      if (el) el.classList.add('active');
    }
    this.render();
  },

  selectCollection(collName) {
    this.currentCollection = collName;
    const moviesColl = document.getElementById('treeMoviesColl');
    const usersColl = document.getElementById('treeUsersColl');
    if (collName === 'movies') {
      if (moviesColl) moviesColl.classList.add('active');
      if (usersColl) usersColl.classList.remove('active');
    } else {
      if (usersColl) usersColl.classList.add('active');
      if (moviesColl) moviesColl.classList.remove('active');
    }
    this.render();
  },

  switchTab(tabName) {
    this.currentTab = tabName;
    ['tabDocs', 'tabAggs', 'tabIndexes'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('active');
    });

    if (tabName === 'documents') {
      document.getElementById('tabDocs')?.classList.add('active');
    } else if (tabName === 'aggregations') {
      document.getElementById('tabAggs')?.classList.add('active');
    } else if (tabName === 'indexes') {
      document.getElementById('tabIndexes')?.classList.add('active');
    }

    this.render();
  },

  applyFilter() {
    const input = document.getElementById('compassFilterInput');
    if (input) {
      this.filterText = input.value.trim();
    }
    this.render();
  },

  resetFilter() {
    const input = document.getElementById('compassFilterInput');
    if (input) input.value = '{}';
    this.filterText = '{}';
    this.render();
  },

  render() {
    const viewArea = document.getElementById('compassViewArea');
    if (!viewArea) return;

    if (this.currentTab === 'documents') {
      this.renderDocuments(viewArea);
    } else if (this.currentTab === 'aggregations') {
      this.renderAggregations(viewArea);
    } else if (this.currentTab === 'indexes') {
      this.renderIndexes(viewArea);
    }
  },

  renderDocuments(container) {
    if (this.currentCollection === 'users') {
      container.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">📄</div>
          <div>Collection <strong>users</strong> has 0 documents.</div>
          <div style="font-size: 0.75rem; margin-top: 0.5rem;">Click 'movies' in the sidebar to view movie documents.</div>
        </div>
      `;
      return;
    }

    // Filter documents
    let docs = this.sampleDocuments;
    if (this.filterText && this.filterText !== '{}') {
      if (this.filterText.includes('Sci-Fi')) {
        docs = docs.filter(d => d.genre === 'Sci-Fi');
      } else if (this.filterText.includes('Action')) {
        docs = docs.filter(d => d.genre === 'Action');
      } else if (this.filterText.includes('watched: true') || this.filterText.includes('"watched": true') || this.filterText.includes('"watched":true')) {
        docs = docs.filter(d => d.watched === true);
      } else if (this.filterText.includes('watched: false') || this.filterText.includes('"watched": false') || this.filterText.includes('"watched":false')) {
        docs = docs.filter(d => d.watched === false);
      }
    }

    let html = `
      <div style="margin-bottom: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
        <span style="color: var(--mongo-green); font-size: 0.8rem; font-weight: 600;">
          Showing ${docs.length} of ${this.sampleDocuments.length} documents
        </span>
        <span style="font-size: 0.75rem; color: var(--text-dim);">JSON View</span>
      </div>
    `;

    docs.forEach((doc, idx) => {
      html += `
        <div style="background: #080F18; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.85rem 1.1rem; margin-bottom: 0.75rem; position: relative; border-left: 3px solid var(--mongo-green);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
            <span style="color: var(--accent-cyan); font-weight: 600; font-size: 0.82rem;">_id: ObjectId("${doc._id}")</span>
            <div style="display: flex; gap: 0.4rem;">
              <span style="color: var(--text-muted); cursor: pointer;" title="Edit Document">✏️</span>
              <span style="color: var(--text-muted); cursor: pointer;" title="Clone Document">📋</span>
              <span style="color: var(--text-muted); cursor: pointer;" title="Delete Document">🗑️</span>
            </div>
          </div>
          <div style="line-height: 1.6; font-size: 0.82rem;">
            <div><span style="color: var(--syn-prop);">title:</span> <span style="color: var(--syn-str);">"${doc.title}"</span></div>
            <div><span style="color: var(--syn-prop);">genre:</span> <span style="color: var(--syn-str);">"${doc.genre}"</span></div>
            <div><span style="color: var(--syn-prop);">year:</span> <span style="color: var(--syn-num);">${doc.year}</span></div>
            <div><span style="color: var(--syn-prop);">rating:</span> <span style="color: var(--syn-num);">${doc.rating}</span></div>
            <div><span style="color: var(--syn-prop);">watched:</span> <span style="color: ${doc.watched ? 'var(--mongo-green)' : 'var(--accent-rose)'};">${doc.watched}</span></div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  renderAggregations(container) {
    container.innerHTML = `
      <div style="padding: 0.5rem;">
        <div style="color: var(--accent-cyan); font-weight: 700; margin-bottom: 0.75rem; font-size: 0.9rem;">
          ⚡ Aggregation Pipeline Builder Simulation
        </div>
        <div style="background: #080F18; border: 1px solid var(--border-medium); border-radius: var(--radius-sm); padding: 1rem; margin-bottom: 1rem;">
          <div style="color: var(--accent-amber); font-weight: 600; font-size: 0.8rem; margin-bottom: 0.4rem;">
            Stage 1: $match
          </div>
          <pre style="color: var(--text-secondary); margin: 0; font-size: 0.82rem;">{ rating: { $gte: 8.8 } }</pre>
        </div>

        <div style="background: #080F18; border: 1px solid var(--border-medium); border-radius: var(--radius-sm); padding: 1rem; margin-bottom: 1rem;">
          <div style="color: var(--mongo-green); font-weight: 600; font-size: 0.8rem; margin-bottom: 0.4rem;">
            Stage 2: $project
          </div>
          <pre style="color: var(--text-secondary); margin: 0; font-size: 0.82rem;">{ title: 1, rating: 1, _id: 0 }</pre>
        </div>

        <div style="background: rgba(0, 237, 100, 0.05); border: 1px solid var(--mongo-green-border); border-radius: var(--radius-sm); padding: 0.75rem; font-size: 0.8rem;">
          <strong>Pipeline Output Preview:</strong> 2 matching documents (Inception [8.8], The Dark Knight [9.0])
        </div>
      </div>
    `;
  },

  renderIndexes(container) {
    container.innerHTML = `
      <div style="padding: 0.5rem;">
        <div style="color: var(--accent-amber); font-weight: 700; margin-bottom: 0.75rem; font-size: 0.9rem;">
          🗂️ Collection Indexes for 'movieDB.movies'
        </div>
        
        <table class="table-standard" style="font-size: 0.8rem;">
          <thead>
            <tr>
              <th>Index Name</th>
              <th>Fields &amp; Type</th>
              <th>Properties</th>
              <th>Usage Size</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="color: var(--mongo-green); font-family: var(--font-mono);">_id_</td>
              <td><code>{ _id: 1 }</code> (B-Tree)</td>
              <td><span style="color: var(--accent-cyan);">Unique, Default</span></td>
              <td>16 KB</td>
            </tr>
            <tr>
              <td style="color: var(--accent-cyan); font-family: var(--font-mono);">title_1</td>
              <td><code>{ title: 1 }</code> (Single Field)</td>
              <td><span>Standard Index</span></td>
              <td>8 KB</td>
            </tr>
          </tbody>
        </table>

        <div style="margin-top: 1rem; font-size: 0.8rem; color: var(--text-muted);">
          💡 Compass allows developers to create and drop indexes with a single click, without writing shell commands.
        </div>
      </div>
    `;
  }
};

// ==============================================================================
// 3. Feature 2: Atlas Setup Workflow Stepper (Slide 9)
// ==============================================================================
const AtlasWorkflow = {
  currentStep: 1,

  stepData: {
    1: {
      title: "Step 1: Create MongoDB Atlas Account",
      badge: "ACCOUNT REGISTRATION",
      desc: "Visit mongodb.com/cloud/atlas and sign up for a free account using your email or Google account.",
      tip: "No credit card is required to sign up or use the permanent free M0 tier.",
      code: "URL: https://www.mongodb.com/cloud/atlas\nPlan: Free M0 Sandbox (512 MB Storage forever)"
    },
    2: {
      title: "Step 2: Create a Project",
      badge: "ORGANIZATION",
      desc: "Atlas projects group related database clusters together. Name your new project 'MovieProjects'.",
      tip: "You can invite team members to collaborate on the same project with specific roles.",
      code: "Project Name: MovieProjects\nAccess Permissions: Project Owner"
    },
    3: {
      title: "Step 3: Create Free Shared Cluster",
      badge: "INFRASTRUCTURE",
      desc: "Select the 'M0 Free' tier. Pick your closest cloud provider region (e.g. AWS us-east-1 or Mumbai ap-south-1).",
      tip: "Provisioning takes ~1-2 minutes. Atlas automatically provisions a 3-node replica set in the cloud.",
      code: "Cluster Type: M0 Free\nCloud Provider: AWS / Google Cloud / Azure\nStorage: 512MB RAM & Storage included"
    },
    4: {
      title: "Step 4: Create Database User",
      badge: "SECURITY & AUTH",
      desc: "Create a database user under 'Database Access' (e.g. username 'admin' and a strong password).",
      tip: "IMPORTANT: This username/password is for database connections, NOT your personal Atlas website login!",
      code: "Username: admin\nPassword: <your_secure_password>\nBuilt-in Role: readWriteAnyDatabase"
    },
    5: {
      title: "Step 5: Configure IP Network Access",
      badge: "FIREWALL RULES",
      desc: "Under 'Network Access', add an IP entry. For learning and development, choose 'Allow Access from Anywhere' (0.0.0.0/0).",
      tip: "In strict production corporate environments, you only whitelist specific backend server IP addresses.",
      code: "IP Whitelist Entry: 0.0.0.0/0\nComment: Allow developer & student access from anywhere"
    },
    6: {
      title: "Step 6: Get SRV Connection String",
      badge: "CONNECTIVITY",
      desc: "Click 'Connect' on your cluster ➔ Choose 'Drivers' (Node.js) ➔ Copy the mongodb+srv:// connection URI.",
      tip: "Replace <password> with your database user password and specify the database name /movieDB.",
      code: "URI: mongodb+srv://admin:<password>@cluster0.mongodb.net/movieDB?retryWrites=true&w=majority"
    }
  },

  init() {
    this.goToStep(1);
  },

  goToStep(stepNum) {
    if (stepNum < 1) stepNum = 1;
    if (stepNum > 6) stepNum = 6;
    this.currentStep = stepNum;

    // Highlight step buttons
    for (let i = 1; i <= 6; i++) {
      const node = document.getElementById(`stepNode${i}`);
      if (node) {
        if (i === this.currentStep) {
          node.classList.add('active');
        } else {
          node.classList.remove('active');
        }
      }
    }

    const counter = document.getElementById('currentStepIndicator');
    if (counter) counter.textContent = this.currentStep;

    const data = this.stepData[this.currentStep];
    const panel = document.getElementById('stepDetailsPanel');
    if (panel && data) {
      panel.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
          <h3 style="color:var(--mongo-green); font-size:1.15rem; margin:0;">${data.title}</h3>
          <span class="code-badge post">${data.badge}</span>
        </div>
        <p style="font-size:0.95rem; color:var(--text-secondary); line-height:1.5; margin-bottom:1rem;">
          ${data.desc}
        </p>
        <div style="background:#05090F; border:1px solid var(--border-subtle); border-radius:var(--radius-xs); padding:0.75rem 1rem; font-family:var(--font-mono); font-size:0.82rem; color:var(--accent-cyan); white-space:pre-wrap; margin-bottom:0.85rem;">${data.code}</div>
        <div style="font-size:0.82rem; color:var(--accent-amber); display:flex; align-items:center; gap:0.4rem;">
          <span>💡</span> <span>${data.tip}</span>
        </div>
      `;
    }
  },

  nextStep() {
    if (this.currentStep < 6) this.goToStep(this.currentStep + 1);
  },

  prevStep() {
    if (this.currentStep > 1) this.goToStep(this.currentStep - 1);
  }
};

// ==============================================================================
// 4. Feature 3: Interactive Movie Collection Viewer & Filter (Slide 6)
// ==============================================================================
const MovieManager = {
  movies: [
    {
      id: "1",
      title: "Interstellar",
      genre: "Sci-Fi",
      year: 2014,
      rating: 8.7,
      watched: false
    },
    {
      id: "2",
      title: "Inception",
      genre: "Sci-Fi",
      year: 2010,
      rating: 8.8,
      watched: true
    },
    {
      id: "3",
      title: "The Dark Knight",
      genre: "Action",
      year: 2008,
      rating: 9.0,
      watched: true
    }
  ],

  activeGenre: 'all',
  searchQuery: '',

  init() {
    this.render();
  },

  filterGenre(genre) {
    this.activeGenre = genre;
    document.querySelectorAll('.genre-filter-btn').forEach(btn => btn.classList.remove('active'));
    if (genre === 'all') document.getElementById('genreAll')?.classList.add('active');
    if (genre === 'Sci-Fi') document.getElementById('genreSciFi')?.classList.add('active');
    if (genre === 'Action') document.getElementById('genreAction')?.classList.add('active');
    this.render();
  },

  handleSearch(query) {
    this.searchQuery = query.toLowerCase().trim();
    this.render();
  },

  toggleWatched(id) {
    const movie = this.movies.find(m => m.id === id);
    if (movie) {
      movie.watched = !movie.watched;
      this.render();
    }
  },

  showAddPrompt() {
    const title = prompt("Enter movie title:", "Oppenheimer");
    if (!title) return;
    const genre = prompt("Enter genre (Sci-Fi, Action, Drama, History):", "History") || "Drama";
    const year = parseInt(prompt("Enter release year:", "2023"), 10) || 2023;
    const rating = parseFloat(prompt("Enter rating (0-10):", "8.9")) || 8.5;

    const newMovie = {
      id: String(Date.now()),
      title,
      genre,
      year,
      rating,
      watched: false
    };

    this.movies.unshift(newMovie);
    this.render();
  },

  render() {
    const grid = document.getElementById('movieCardsGrid');
    if (!grid) return;

    let filtered = this.movies;

    if (this.activeGenre !== 'all') {
      filtered = filtered.filter(m => m.genre === this.activeGenre);
    }

    if (this.searchQuery) {
      filtered = filtered.filter(m => m.title.toLowerCase().includes(this.searchQuery));
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-muted);">
          No movies match your current search or genre filter.
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(movie => `
      <div class="movie-item-card">
        <div>
          <div class="movie-item-title">${movie.title}</div>
          <div class="movie-item-meta">
            <span class="movie-badge-genre">${movie.genre}</span>
            <span>${movie.year}</span>
            <span class="movie-badge-rating">★ ${movie.rating}</span>
          </div>
        </div>

        <button 
          class="watched-toggle-btn ${movie.watched ? 'watched' : 'unwatched'}"
          onclick="MovieManager.toggleWatched('${movie.id}')"
          title="Click to toggle watched status"
        >
          <span>${movie.watched ? '✓ Watched' : '⏳ Plan to Watch'}</span>
        </button>
      </div>
    `).join('');
  }
};

// ==============================================================================
// 5. Feature 4: Interactive CRUD Simulation Studio (Slide 21)
// ==============================================================================
const CrudSim = {
  currentOp: 'POST',

  init() {
    this.runOp('POST');
  },

  runOp(op) {
    this.currentOp = op;

    // Toggle active button
    ['crudBtnPost', 'crudBtnGet', 'crudBtnPut', 'crudBtnDelete'].forEach(id => {
      document.getElementById(id)?.classList.remove('active');
    });

    if (op === 'POST') document.getElementById('crudBtnPost')?.classList.add('active');
    if (op === 'GET') document.getElementById('crudBtnGet')?.classList.add('active');
    if (op === 'PUT') document.getElementById('crudBtnPut')?.classList.add('active');
    if (op === 'DELETE') document.getElementById('crudBtnDelete')?.classList.add('active');

    // Visual sequence animation through pills
    this.animateFlow(op);
  },

  animateFlow(op) {
    const pills = ['flowPillClient', 'flowPillExpress', 'flowPillAtlas', 'flowPillCompass'];
    pills.forEach(p => document.getElementById(p)?.classList.remove('active'));

    // Step 1: Client
    document.getElementById('flowPillClient')?.classList.add('active');

    setTimeout(() => {
      // Step 2: Express
      document.getElementById('flowPillExpress')?.classList.add('active');
    }, 200);

    setTimeout(() => {
      // Step 3: Atlas
      document.getElementById('flowPillAtlas')?.classList.add('active');
    }, 450);

    setTimeout(() => {
      // Step 4: Compass
      document.getElementById('flowPillCompass')?.classList.add('active');
      this.renderOutput(op);
    }, 700);
  },

  renderOutput(op) {
    const filenameEl = document.getElementById('crudTerminalFilename');
    const badgeEl = document.getElementById('crudStatusBadge');
    const bodyEl = document.getElementById('crudTerminalBody');

    if (!bodyEl) return;

    if (op === 'POST') {
      if (filenameEl) filenameEl.textContent = 'POST /movies';
      if (badgeEl) {
        badgeEl.textContent = '201 Created';
        badgeEl.className = 'code-badge post';
      }
      bodyEl.innerHTML = `
<pre><span class="syn-comment">// 1. Client sent payload:</span>
{ "title": "Oppenheimer", "genre": "History", "year": 2023, "rating": 8.9 }

<span class="syn-comment">// 2. Express Route:</span>
const movie = await Movie.create(req.body);

<span class="syn-comment">// 3. Saved to MongoDB Atlas with generated ObjectId:</span>
{
  "_id": "65f29d99e4f0a2c3b4",
  "title": "Oppenheimer",
  "genre": "History",
  "year": 2023,
  "rating": 8.9,
  "watched": false,
  "createdAt": "2026-10-06T10:00:00.000Z"
}

<span class="syn-comment">// 4. Compass Notification:</span>
✨ Document successfully added to collection 'movieDB.movies'!</pre>
      `;
    } else if (op === 'GET') {
      if (filenameEl) filenameEl.textContent = 'GET /movies';
      if (badgeEl) {
        badgeEl.textContent = '200 OK';
        badgeEl.className = 'code-badge get';
      }
      bodyEl.innerHTML = `
<pre><span class="syn-comment">// 1. Client requested: GET /movies</span>

<span class="syn-comment">// 2. Express Route:</span>
const movies = await Movie.find();
res.json(movies);

<span class="syn-comment">// 3. Response JSON Array (3 documents returned from Atlas):</span>
[
  { "title": "Interstellar", "genre": "Sci-Fi", "year": 2014, "rating": 8.7, "watched": false },
  { "title": "Inception", "genre": "Sci-Fi", "year": 2010, "rating": 8.8, "watched": true },
  { "title": "The Dark Knight", "genre": "Action", "year": 2008, "rating": 9.0, "watched": true }
]</pre>
      `;
    } else if (op === 'PUT') {
      if (filenameEl) filenameEl.textContent = 'PUT /movies/65f29a0b12c4...';
      if (badgeEl) {
        badgeEl.textContent = '200 OK';
        badgeEl.className = 'code-badge put';
      }
      bodyEl.innerHTML = `
<pre><span class="syn-comment">// 1. Client requested update:</span>
PUT /movies/65f29a0b12c4...
Body: { "watched": true, "rating": 9.1 }

<span class="syn-comment">// 2. Express Route:</span>
await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });

<span class="syn-comment">// 3. MongoDB Atlas update confirmed:</span>
{
  "_id": "65f29a0b12c4e1a8a1",
  "title": "Interstellar",
  "watched": true,      <span class="syn-comment">// ← Updated from false to true</span>
  "rating": 9.1        <span class="syn-comment">// ← Updated rating</span>
}

<span class="syn-comment">// 4. Verified in Compass: Document updated in place!</span></pre>
      `;
    } else if (op === 'DELETE') {
      if (filenameEl) filenameEl.textContent = 'DELETE /movies/65f29a0b12c5...';
      if (badgeEl) {
        badgeEl.textContent = '200 OK';
        badgeEl.className = 'code-badge delete';
      }
      bodyEl.innerHTML = `
<pre><span class="syn-comment">// 1. Client requested removal:</span>
DELETE /movies/65f29a0b12c5...

<span class="syn-comment">// 2. Express Route:</span>
await Movie.findByIdAndDelete(req.params.id);

<span class="syn-comment">// 3. Atlas deletion response:</span>
{
  "message": "Movie deleted successfully"
}

<span class="syn-comment">// 4. Compass verification: Document 65f29a0b12c5 removed from 'movies'!</span></pre>
      `;
    }
  }
};

// ==============================================================================
// DOM Content Loaded Bootstrapper
// ==============================================================================
document.addEventListener('DOMContentLoaded', () => {
  Deck.init();
  CompassSim.init();
  AtlasWorkflow.init();
  MovieManager.init();
  CrudSim.init();
});
