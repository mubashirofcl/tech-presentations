/**
 * ==============================================================================
 * MongoDB Day 8 — Search, Indexing & Pagination
 * Interactive Presentation Engine & Demonstration Studio
 * ==============================================================================
 */

// ==============================================================================
// 1. Presentation Deck Controller
// ==============================================================================
const Deck = {
  currentSlide: 1,
  totalSlides: 53,
  slides: [],
  topicMap: {
    1: { section: "FUNDAMENTALS", topic: "MongoDB Search & Pagination — Title" },
    2: { section: "FUNDAMENTALS", topic: "Learning Objectives" },
    3: { section: "FUNDAMENTALS", topic: "What Is Search? Exact vs Partial vs Text" },
    4: { section: "FULL-TEXT SEARCH", topic: "What Is Full-Text Search?" },
    5: { section: "FULL-TEXT SEARCH", topic: "Why Not Use Normal Find?" },
    6: { section: "FULL-TEXT SEARCH", topic: "Create a Text Index" },
    7: { section: "FULL-TEXT SEARCH", topic: "Using $text Search Operator" },
    8: { section: "FULL-TEXT SEARCH", topic: "Searching Multiple Words" },
    9: { section: "FULL-TEXT SEARCH", topic: "Text Search vs Exact Search" },
    10: { section: "TEXTSCORE", topic: "What Is textScore?" },
    11: { section: "TEXTSCORE", topic: "Getting textScore with $meta" },
    12: { section: "TEXTSCORE", topic: "Sorting by textScore Relevance" },
    13: { section: "TEXTSCORE", topic: "Real-World $text Example" },
    14: { section: "PARTIAL SEARCH", topic: "What Is Partial Search?" },
    15: { section: "PARTIAL SEARCH", topic: "Basic $regex with Case-Insensitive 'i'" },
    16: { section: "PARTIAL SEARCH", topic: "Regex Patterns: Starts-With, Contains, Ends-With" },
    17: { section: "PARTIAL SEARCH", topic: "Practical $regex Example" },
    18: { section: "PARTIAL SEARCH", topic: "$text vs $regex Feature Comparison" },
    19: { section: "PARTIAL SEARCH", topic: "$regex Performance Warning (Leading Wildcard)" },
    20: { section: "ATLAS SEARCH", topic: "What Is Atlas Search?" },
    21: { section: "ATLAS SEARCH", topic: "What Is Autocomplete?" },
    22: { section: "ATLAS SEARCH", topic: "Autocomplete Architecture Flow" },
    23: { section: "ATLAS SEARCH", topic: "Atlas Search Autocomplete Concept" },
    24: { section: "ATLAS SEARCH", topic: "Search Strategy: Choosing the Right Tool" },
    25: { section: "INDEXING", topic: "What Is a Database Index?" },
    26: { section: "INDEXING", topic: "Simple Index Example" },
    27: { section: "INDEXING", topic: "Index Direction: Ascending (1) vs Descending (-1)" },
    28: { section: "INDEXING", topic: "Common Index Types Overview" },
    29: { section: "INDEXING", topic: "Compound Indexes (Multiple Fields)" },
    30: { section: "INDEXING", topic: "5-Step Indexing Strategy" },
    31: { section: "INDEXING", topic: "Too Many Indexes? Trade-offs & Write Overhead" },
    32: { section: "INDEXING", topic: "Check Query Performance with .explain()" },
    33: { section: "PAGINATION", topic: "What Is Pagination?" },
    34: { section: "PAGINATION", topic: "Why Pagination? Payload Size & Performance" },
    35: { section: "PAGINATION", topic: "Understanding limit()" },
    36: { section: "PAGINATION", topic: "Understanding skip()" },
    37: { section: "PAGINATION", topic: "Page-Based Pagination Formula" },
    38: { section: "PAGINATION", topic: "Mongoose API Pagination Example" },
    39: { section: "PAGINATION", topic: "The Problem With Large skip() Values" },
    40: { section: "CURSOR PAGINATION", topic: "Better Approach: Cursor / Range-Based Pagination" },
    41: { section: "CURSOR PAGINATION", topic: "Cursor Pagination Example & Next Cursor Token" },
    42: { section: "CURSOR PAGINATION", topic: "Cursor Query Concept ($gt with _id)" },
    43: { section: "CURSOR PAGINATION", topic: "Offset vs Cursor Pagination Comparison" },
    44: { section: "REAL-WORLD API", topic: "Product Search & Pagination API Contract" },
    45: { section: "REAL-WORLD API", topic: "Complete Search Flow Architecture" },
    46: { section: "PRACTICAL PROJECT", topic: "Mini Project: Product Search & Pagination API" },
    47: { section: "PRACTICAL PROJECT", topic: "Product Search Endpoint Implementation" },
    48: { section: "PRACTICAL PROJECT", topic: "Pagination API Implementation" },
    49: { section: "PRACTICAL PROJECT", topic: "Practical Indexes for the Project" },
    50: { section: "REVIEW", topic: "Common Mistakes & Anti-Patterns" },
    51: { section: "REVIEW", topic: "Quick Concept Comparison Matrix" },
    52: { section: "REVIEW", topic: "Interactive Classroom Quiz" },
    53: { section: "REVIEW", topic: "Summary & Final Takeaways" }
  },

  init() {
    this.slides = Array.from(document.querySelectorAll('.slide'));
    this.totalSlides = this.slides.length || 53;

    const totalEl = document.getElementById('totalSlidesNum');
    if (totalEl) totalEl.textContent = this.totalSlides;

    this.buildTocDrawer();

    // Check URL hash for direct slide linking (#slide-14)
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

    // Update active slide class
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

    // Update counter display
    const currentNumEl = document.getElementById('currentSlideNum');
    if (currentNumEl) currentNumEl.textContent = this.currentSlide;

    // Update header topic badge
    const info = this.topicMap[this.currentSlide] || { section: "MONGODB", topic: `Slide ${this.currentSlide}` };
    const secTag = document.getElementById('headerSectionTag');
    const topicEl = document.getElementById('headerTopic');
    if (secTag) secTag.textContent = info.section;
    if (topicEl) topicEl.textContent = info.topic;

    // Update URL hash without jitter
    history.replaceState(null, '', `#slide-${this.currentSlide}`);

    // Update prev/next button states
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
      // Don't intercept typing in input fields
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

// Sample products dataset for Demos
const PRODUCTS_DATASET = [
  { id: "p1", name: "iPhone 15", category: "Smartphones", price: 799, desc: "Apple smartphone with Dynamic Island and 48MP main camera" },
  { id: "p2", name: "iPhone 15 Pro", category: "Smartphones", price: 999, desc: "Premium Apple smartphone with titanium frame and A17 Pro chip" },
  { id: "p3", name: "Samsung Galaxy S24", category: "Smartphones", price: 849, desc: "Android flagship smartphone with Galaxy AI capabilities" },
  { id: "p4", name: "Phone Case", category: "Accessories", price: 29, desc: "Shockproof protective silicone mobile case for iPhone" },
  { id: "p5", name: "Laptop Stand", category: "Accessories", price: 45, desc: "Ergonomic aluminum cooling riser for laptop and MacBook" },
  { id: "p6", name: "Gaming Laptop", category: "Computers", price: 1499, desc: "High performance RTX 4070 laptop with 240Hz screen" },
  { id: "p7", name: "Laptop Bag", category: "Accessories", price: 39, desc: "Waterproof commuter backpack and laptop carrying bag" },
  { id: "p8", name: "Nike Running Shoes", category: "Footwear", price: 120, desc: "Lightweight breathable cushioned running shoes for marathons" },
  { id: "p9", name: "JavaScript Complete Guide", category: "Books", price: 35, desc: "Learn JavaScript from basics to advanced modern concepts" },
  { id: "p10", name: "Wireless Bluetooth Earbuds", category: "Audio", price: 89, desc: "Active noise cancelling wireless phone earphones" }
];

// --- DEMO 1: $text Search ---
const DemoTextSearch = {
  init() {
    const input = document.getElementById('demo1Input');
    const btn = document.getElementById('demo1Btn');
    if (input) {
      input.addEventListener('input', () => this.run());
    }
    if (btn) {
      btn.addEventListener('click', () => this.run());
    }
    this.run();
  },

  run() {
    const input = document.getElementById('demo1Input');
    const container = document.getElementById('demo1Results');
    const countEl = document.getElementById('demo1Count');
    const pipeStep3 = document.getElementById('demo1PipelineStep3');
    if (!input || !container) return;

    const query = input.value.trim().toLowerCase();
    const words = query.split(/\s+/).filter(w => w.length > 0);

    let matches = [];
    if (words.length === 0) {
      matches = PRODUCTS_DATASET.slice(0, 4);
    } else {
      // MongoDB $text matches complete words in text fields
      matches = PRODUCTS_DATASET.filter(p => {
        const fullText = `${p.name} ${p.desc}`.toLowerCase();
        // Check if any search word matches whole word in text
        return words.some(w => {
          const regex = new RegExp(`\\b${w}`, 'i');
          return regex.test(fullText);
        });
      });
    }

    if (countEl) countEl.textContent = `${matches.length} matching document(s)`;
    if (pipeStep3) pipeStep3.textContent = `${matches.length} Documents`;

    if (matches.length === 0) {
      container.innerHTML = `
        <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.88rem;">
          No documents matched the text query "<strong>${input.value}</strong>".
          <br><span style="font-size: 0.78rem; color: var(--text-dim);">Remember: $text operates on word boundaries!</span>
        </div>
      `;
      return;
    }

    container.innerHTML = matches.map(p => `
      <div class="demo-result-item highlighted">
        <div>
          <div class="demo-result-name">${this.highlightWords(p.name, words)}</div>
          <div class="demo-result-desc">${this.highlightWords(p.desc, words)}</div>
        </div>
        <div class="demo-score-badge">
          <span>Match</span>
        </div>
      </div>
    `).join('');
  },

  highlightWords(text, words) {
    if (!words || words.length === 0) return text;
    let result = text;
    words.forEach(w => {
      const regex = new RegExp(`(${w})`, 'gi');
      result = result.replace(regex, '<span style="color: var(--mongo-green); font-weight:700; text-decoration: underline;">$1</span>');
    });
    return result;
  }
};

// --- DEMO 2: textScore Ranking ---
const DemoTextScore = {
  init() {
    const input = document.getElementById('demo2Input');
    if (input) {
      input.addEventListener('input', () => this.run());
    }
    this.run();
  },

  run() {
    const input = document.getElementById('demo2Input');
    const container = document.getElementById('demo2Results');
    if (!container) return;

    const query = (input ? input.value : 'iphone').trim().toLowerCase();
    const words = query.split(/\s+/).filter(w => w.length > 0);

    // Calculate simulated textScore: title matches = 2.0 per word, desc matches = 0.8 per word
    const scoredList = PRODUCTS_DATASET.map(p => {
      let score = 0;
      const nameLower = p.name.toLowerCase();
      const descLower = p.desc.toLowerCase();

      words.forEach(w => {
        if (nameLower.includes(w)) score += 2.0;
        if (descLower.includes(w)) score += 0.75;
      });

      // Bonus if exact match in name
      if (nameLower === query) score += 1.5;

      return { ...p, score: parseFloat(score.toFixed(2)) };
    })
    .filter(p => p.score > 0)
    .sort((a, b) => b.score - a.score);

    if (scoredList.length === 0) {
      container.innerHTML = `
        <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.88rem;">
          No scored documents for "${query}". Try searching "iphone", "laptop", or "shoes".
        </div>
      `;
      return;
    }

    container.innerHTML = scoredList.map((p, idx) => {
      const stars = p.score >= 3.5 ? '★★★★★' : p.score >= 2.0 ? '★★★★☆' : p.score >= 1.0 ? '★★★☆☆' : '★★☆☆☆';
      return `
        <div class="demo-result-item ${idx === 0 ? 'highlighted' : ''}">
          <div>
            <div class="demo-result-name">
              <span style="font-family: var(--font-mono); color: var(--text-muted); margin-right: 0.4rem;">#${idx + 1}</span>
              ${p.name}
            </div>
            <div class="demo-result-desc">${p.desc}</div>
          </div>
          <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 0.2rem;">
            <div class="demo-score-badge">
              <span>textScore: <strong>${p.score}</strong></span>
            </div>
            <span style="color: var(--accent-amber); font-size: 0.75rem; letter-spacing: 1px;">${stars}</span>
          </div>
        </div>
      `;
    }).join('');
  }
};

// --- DEMO 3: $regex Partial Search ---
const DemoRegex = {
  currentPattern: 'contains', // 'starts', 'contains', 'ends'

  init() {
    const input = document.getElementById('demo3Input');
    const startBtn = document.getElementById('demo3StartBtn');
    const contBtn = document.getElementById('demo3ContBtn');
    const endBtn = document.getElementById('demo3EndBtn');

    if (input) {
      input.addEventListener('input', () => this.run());
    }

    if (startBtn) {
      startBtn.addEventListener('click', () => {
        this.setPattern('starts', startBtn);
      });
    }
    if (contBtn) {
      contBtn.addEventListener('click', () => {
        this.setPattern('contains', contBtn);
      });
    }
    if (endBtn) {
      endBtn.addEventListener('click', () => {
        this.setPattern('ends', endBtn);
      });
    }

    this.run();
  },

  setPattern(mode, btn) {
    this.currentPattern = mode;
    document.querySelectorAll('.pattern-toggle-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    this.run();
  },

  run() {
    const input = document.getElementById('demo3Input');
    const container = document.getElementById('demo3Results');
    const queryDisplay = document.getElementById('demo3QueryDisplay');
    if (!input || !container) return;

    const val = input.value.trim();
    let regexStr = val;
    if (this.currentPattern === 'starts') regexStr = `^${val}`;
    if (this.currentPattern === 'ends') regexStr = `${val}$`;

    if (queryDisplay) {
      queryDisplay.innerHTML = `db.products.find({ name: { <span class="op-mongo">$regex</span>: <span class="str">"${regexStr}"</span>, <span class="op-mongo">$options</span>: <span class="str">"i"</span> } })`;
    }

    let regex;
    try {
      regex = new RegExp(regexStr, 'i');
    } catch (e) {
      container.innerHTML = `<div style="padding: 1rem; color: var(--accent-rose);">Invalid Regex Pattern</div>`;
      return;
    }

    const matches = PRODUCTS_DATASET.filter(p => regex.test(p.name));

    if (matches.length === 0) {
      container.innerHTML = `
        <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.88rem;">
          No products matched the regex <code>${regexStr}</code>.
        </div>
      `;
      return;
    }

    container.innerHTML = matches.map(p => {
      const highlightedName = p.name.replace(regex, match => `<span style="background: rgba(56, 189, 248, 0.25); color: var(--accent-cyan); font-weight:700; padding: 0 2px; border-radius: 2px;">${match}</span>`);
      return `
        <div class="demo-result-item">
          <div>
            <div class="demo-result-name">${highlightedName}</div>
            <div class="demo-result-desc">${p.desc}</div>
          </div>
          <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-cyan); background: var(--accent-cyan-bg); border: 1px solid var(--accent-cyan-border); padding: 0.2rem 0.5rem; border-radius: 4px;">
            Regex Match
          </div>
        </div>
      `;
    }).join('');
  }
};

// --- DEMO 4: Atlas Search Autocomplete Simulation ---
const DemoAutocomplete = {
  allTerms: [
    "iPhone", "iPhone 15", "iPhone 15 Pro", "iPhone 15 Pro Max", "iPhone 14", "iPhone 14 Case",
    "Java", "JavaScript", "JavaScript Complete Guide", "Java Programming", "Java Course",
    "Laptop", "Gaming Laptop", "Laptop Stand", "Laptop Bag",
    "Running Shoes", "Nike Running Shoes"
  ],

  init() {
    const input = document.getElementById('demo4Input');
    const dropdown = document.getElementById('demo4Dropdown');
    if (!input || !dropdown) return;

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      if (!q) {
        dropdown.style.display = 'none';
        return;
      }

      const matches = this.allTerms.filter(t => t.toLowerCase().includes(q));
      if (matches.length === 0) {
        dropdown.style.display = 'block';
        dropdown.innerHTML = `<div class="autocomplete-item" style="color: var(--text-muted);">No suggestions found</div>`;
        return;
      }

      dropdown.style.display = 'block';
      dropdown.innerHTML = matches.slice(0, 5).map(term => {
        const regex = new RegExp(`(${q})`, 'gi');
        const highlighted = term.replace(regex, '<span class="autocomplete-match">$1</span>');
        return `
          <div class="autocomplete-item" onclick="DemoAutocomplete.select('${term}')">
            <span>${highlighted}</span>
            <span style="font-size: 0.72rem; color: var(--text-dim); font-family: var(--font-mono);">Atlas Search</span>
          </div>
        `;
      }).join('');
    });

    document.addEventListener('click', (e) => {
      if (!input.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = 'none';
      }
    });
  },

  select(term) {
    const input = document.getElementById('demo4Input');
    const dropdown = document.getElementById('demo4Dropdown');
    if (input) input.value = term;
    if (dropdown) dropdown.style.display = 'none';
  }
};

// --- DEMO 5: Index Visualizer (COLLSCAN vs IXSCAN) ---
const DemoIndexVis = {
  docs: [
    { id: 1, email: "alex@yahoo.com" },
    { id: 2, email: "david@outlook.com" },
    { id: 3, email: "emma@gmail.com" },
    { id: 4, email: "john@apple.com" },
    { id: 5, email: "lisa@domain.com" },
    { id: 6, email: "maria@corp.io" },
    { id: 7, email: "student@gmail.com", target: true },
    { id: 8, email: "tim@tech.org" },
    { id: 9, email: "will@code.net" },
    { id: 10, email: "zack@mongo.com" },
    { id: 11, email: "zoe@dev.io" },
    { id: 12, email: "kyle@cloud.com" }
  ],
  animating: false,

  init() {
    this.renderDocs();
  },

  renderDocs() {
    const container = document.getElementById('demo5DocGrid');
    if (!container) return;
    container.innerHTML = this.docs.map(d => `
      <div class="vis-doc" id="visDoc${d.id}">
        <div style="font-size: 0.65rem; color: var(--text-dim);">Doc #${d.id}</div>
        <div style="margin-top: 0.2rem; font-size: 0.7rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${d.email.split('@')[0]}</div>
      </div>
    `).join('');
  },

  resetGrid() {
    this.docs.forEach(d => {
      const el = document.getElementById(`visDoc${d.id}`);
      if (el) {
        el.className = 'vis-doc';
      }
    });
  },

  runCollscan() {
    if (this.animating) return;
    this.animating = true;
    this.resetGrid();

    const stageEl = document.getElementById('visStatStage');
    const examEl = document.getElementById('visStatExamined');
    const retEl = document.getElementById('visStatReturned');
    const timeEl = document.getElementById('visStatTime');

    if (stageEl) stageEl.textContent = 'COLLSCAN (Collection Scan)';
    if (stageEl) stageEl.style.color = 'var(--accent-rose)';
    if (examEl) examEl.textContent = '0';
    if (retEl) retEl.textContent = '0';
    if (timeEl) timeEl.textContent = 'Scanning...';

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < this.docs.length) {
        const d = this.docs[idx];
        const el = document.getElementById(`visDoc${d.id}`);
        if (el) {
          if (d.target) {
            el.className = 'vis-doc match';
            if (retEl) retEl.textContent = '1';
          } else {
            el.className = 'vis-doc scanned';
          }
        }
        idx++;
        if (examEl) examEl.textContent = String(idx);
      } else {
        clearInterval(interval);
        this.animating = false;
        if (timeEl) timeEl.textContent = '14.2 ms (Slow)';
        if (timeEl) timeEl.style.color = 'var(--accent-rose)';
      }
    }, 150);
  },

  runIxscan() {
    if (this.animating) return;
    this.animating = true;
    this.resetGrid();

    const stageEl = document.getElementById('visStatStage');
    const examEl = document.getElementById('visStatExamined');
    const retEl = document.getElementById('visStatReturned');
    const timeEl = document.getElementById('visStatTime');

    if (stageEl) stageEl.textContent = 'IXSCAN (Index B-Tree Scan)';
    if (stageEl) stageEl.style.color = 'var(--mongo-green)';
    if (examEl) examEl.textContent = '1';
    if (retEl) retEl.textContent = '1';
    if (timeEl) timeEl.textContent = '0.04 ms (Instant)';
    if (timeEl) timeEl.style.color = 'var(--mongo-green)';

    // Directly highlight target and dim others
    this.docs.forEach(d => {
      const el = document.getElementById(`visDoc${d.id}`);
      if (el) {
        if (d.target) {
          el.className = 'vis-doc match';
        } else {
          el.className = 'vis-doc bypassed';
        }
      }
    });

    this.animating = false;
  }
};

// --- DEMO 6: Interactive Offset Pagination ---
const DemoPagination = {
  currentPage: 1,
  pageSize: 10,
  totalItems: 50,
  mockProducts: [],

  init() {
    // Generate 50 mock items
    const categories = ["Smartphones", "Laptops", "Audio", "Accessories", "Footwear"];
    for (let i = 1; i <= 50; i++) {
      this.mockProducts.push({
        id: `PROD-${String(i).padStart(3, '0')}`,
        name: `Product Item ${i}`,
        category: categories[i % categories.length],
        price: `$${(20 + (i * 15)).toFixed(2)}`,
        stock: 50 + (i % 30)
      });
    }

    this.render();
  },

  goTo(page) {
    if (page < 1 || page > 5) return;
    this.currentPage = page;
    this.render();
  },

  render() {
    const listEl = document.getElementById('demo6List');
    const infoEl = document.getElementById('demo6Info');
    const prevBtn = document.getElementById('demo6Prev');
    const nextBtn = document.getElementById('demo6Next');

    if (!listEl) return;

    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    const pageItems = this.mockProducts.slice(start, end);

    listEl.innerHTML = `
      <table style="width: 100%; border-collapse: collapse; font-size: 0.84rem; text-align: left;">
        <thead>
          <tr style="border-bottom: 1px solid var(--border-medium); color: var(--text-muted); font-family: var(--font-mono);">
            <th style="padding: 0.4rem 0.6rem;">ID</th>
            <th style="padding: 0.4rem 0.6rem;">NAME</th>
            <th style="padding: 0.4rem 0.6rem;">CATEGORY</th>
            <th style="padding: 0.4rem 0.6rem;">PRICE</th>
            <th style="padding: 0.4rem 0.6rem;">STOCK</th>
          </tr>
        </thead>
        <tbody>
          ${pageItems.map(p => `
            <tr style="border-bottom: 1px solid var(--border-subtle);">
              <td style="padding: 0.45rem 0.6rem; font-family: var(--font-mono); color: var(--accent-cyan);">${p.id}</td>
              <td style="padding: 0.45rem 0.6rem; font-weight: 600;">${p.name}</td>
              <td style="padding: 0.45rem 0.6rem; color: var(--text-secondary);">${p.category}</td>
              <td style="padding: 0.45rem 0.6rem; font-family: var(--font-mono); color: var(--mongo-green);">${p.price}</td>
              <td style="padding: 0.45rem 0.6rem; font-family: var(--font-mono);">${p.stock}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    if (infoEl) {
      infoEl.textContent = `Showing ${start + 1}–${end} of ${this.totalItems} products (Page ${this.currentPage} of 5)`;
    }

    if (prevBtn) prevBtn.disabled = this.currentPage === 1;
    if (nextBtn) nextBtn.disabled = this.currentPage === 5;

    // Update active page button styles
    for (let i = 1; i <= 5; i++) {
      const pBtn = document.getElementById(`demo6Page${i}`);
      if (pBtn) {
        if (i === this.currentPage) {
          pBtn.classList.add('active');
        } else {
          pBtn.classList.remove('active');
        }
      }
    }
  }
};

// --- DEMO 7: skip + limit Calculator ---
const DemoSkipLimit = {
  init() {
    const pageInput = document.getElementById('demo7PageInput');
    const limitInput = document.getElementById('demo7LimitInput');

    if (pageInput) pageInput.addEventListener('input', () => this.update());
    if (limitInput) limitInput.addEventListener('change', () => this.update());

    this.update();
  },

  update() {
    const pageInput = document.getElementById('demo7PageInput');
    const limitInput = document.getElementById('demo7LimitInput');
    const formulaDisplay = document.getElementById('demo7FormulaDisplay');
    const queryDisplay = document.getElementById('demo7QueryDisplay');
    const chunksContainer = document.getElementById('demo7Chunks');

    if (!pageInput || !limitInput || !chunksContainer) return;

    let page = parseInt(pageInput.value, 10);
    if (isNaN(page) || page < 1) page = 1;
    if (page > 10) page = 10;
    pageInput.value = page;

    const limit = parseInt(limitInput.value, 10) || 10;
    const skip = (page - 1) * limit;

    if (formulaDisplay) {
      formulaDisplay.innerHTML = `
        <span style="color: var(--text-muted);">skip = (${page} - 1) × ${limit} = </span>
        <span style="color: var(--mongo-green); font-weight: 800; font-size: 1.15rem;">${skip}</span>
      `;
    }

    if (queryDisplay) {
      queryDisplay.innerHTML = `db.products.find().<span class="fn">skip</span>(<span class="num">${skip}</span>).<span class="fn">limit</span>(<span class="num">${limit}</span>)`;
    }

    // Render 5 visual chunks
    let chunksHtml = '';
    const totalChunks = 5;
    for (let c = 1; c <= totalChunks; c++) {
      const cStart = (c - 1) * limit + 1;
      const cEnd = c * limit;
      let statusClass = 'pending';
      let tagText = 'Upcoming Docs';

      if (c < page) {
        statusClass = 'skipped';
        tagText = '❌ SKIPPED (Loaded & Discarded)';
      } else if (c === page) {
        statusClass = 'current';
        tagText = '✅ CURRENT PAGE (Returned to Client)';
      }

      chunksHtml += `
        <div class="chunk-block ${statusClass}">
          <div>
            <span style="color: var(--text-muted); font-size: 0.78rem;">Chunk #${c}:</span>
            <strong style="margin-left: 0.5rem;">Docs ${cStart} – ${cEnd}</strong>
          </div>
          <span style="font-size: 0.75rem; font-weight: 600;">${tagText}</span>
        </div>
      `;
    }

    chunksContainer.innerHTML = chunksHtml;
  }
};

// --- DEMO 8: Cursor Pagination Simulator ---
const DemoCursor = {
  step: 1,
  batches: [
    { page: 1, range: "Products 1–10", lastId: "66f123000010", query: "db.products.find().sort({ _id: 1 }).limit(10)" },
    { page: 2, range: "Products 11–20", lastId: "66f123000020", query: `db.products.find({ _id: { $gt: ObjectId("66f123000010") } }).sort({ _id: 1 }).limit(10)` },
    { page: 3, range: "Products 21–30", lastId: "66f123000030", query: `db.products.find({ _id: { $gt: ObjectId("66f123000020") } }).sort({ _id: 1 }).limit(10)` }
  ],

  init() {
    this.render();
  },

  nextBatch() {
    if (this.step < 3) {
      this.step++;
    } else {
      this.step = 1;
    }
    this.render();
  },

  render() {
    const queryEl = document.getElementById('demo8Query');
    const container = document.getElementById('demo8Chain');
    const nextBtn = document.getElementById('demo8NextBtn');

    if (queryEl) {
      const current = this.batches[this.step - 1];
      queryEl.innerHTML = current.query
        .replace('$gt', '<span class="op-mongo">$gt</span>')
        .replace('find', '<span class="fn">find</span>')
        .replace('sort', '<span class="fn">sort</span>')
        .replace('limit', '<span class="fn">limit</span>');
    }

    if (nextBtn) {
      nextBtn.textContent = this.step === 3 ? "↺ Reset Simulator" : `Fetch Batch #${this.step + 1} via Cursor →`;
    }

    if (container) {
      container.innerHTML = this.batches.map((b, idx) => {
        const isActive = idx + 1 === this.step;
        const isPast = idx + 1 < this.step;
        return `
          <div class="cursor-card ${isActive ? 'active-cursor' : ''}" style="${isPast ? 'opacity: 0.6;' : ''}">
            <div>
              <div style="font-weight: 700; font-size: 0.92rem; color: var(--text-primary);">
                ${idx === 0 ? 'Initial Request' : `Next Request (Batch #${b.page})`}
                ${isActive ? '<span style="color: var(--mongo-green); margin-left: 0.5rem; font-size: 0.75rem; text-transform: uppercase;">● ACTIVE BATCH</span>' : ''}
              </div>
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">
                Fetches ${b.range} (Limit: 10)
              </div>
            </div>
            <div style="text-align: right;">
              <span class="cursor-token">lastId: ${b.lastId}</span>
            </div>
          </div>
        `;
      }).join('');
    }
  }
};

// ==============================================================================
// 3. Interactive Classroom Quiz (Slide 52)
// ==============================================================================
const Quiz = {
  currentQ: 0,
  score: 0,
  questions: [
    {
      q: "1. Which operator is used for MongoDB text search?",
      options: ["$search", "$text", "$find", "$word"],
      correct: 1,
      exp: "MongoDB uses the $text operator in find queries to search text fields covered by a text index."
    },
    {
      q: "2. What does textScore represent in MongoDB?",
      options: [
        "The total character length of the matched document",
        "The relevance score calculated by MongoDB for a matching document",
        "The total number of index entries created in the collection",
        "The execution time of the full-text search in milliseconds"
      ],
      correct: 1,
      exp: "textScore indicates how well a document matches the specified search terms, allowing results to be sorted by relevance."
    },
    {
      q: "3. Which operator is used for partial character and regex pattern matching?",
      options: ["$text", "$regex", "$where", "$partial"],
      correct: 1,
      exp: "MongoDB provides $regex to execute regular expression pattern matching on string fields for partial matching."
    },
    {
      q: "4. Why do we create database indexes?",
      options: [
        "To speed up collection write operations",
        "To locate matching documents faster without inspecting every document",
        "To automatically compress collection storage size",
        "To prevent duplicate collections from being created"
      ],
      correct: 1,
      exp: "Indexes provide high-performance data structures (B-trees) so MongoDB can locate matching records without scanning the entire collection."
    },
    {
      q: "5. What is the primary function of limit()?",
      options: [
        "It skips a specified number of documents",
        "It limits the size of each document to a maximum byte limit",
        "It restricts the maximum number of documents returned by a query",
        "It sets a timeout for long-running database queries"
      ],
      correct: 2,
      exp: "limit(N) instructs MongoDB to return at most N documents from the result set."
    },
    {
      q: "6. What performance problem is caused by very large skip() values?",
      options: [
        "MongoDB throws a syntax error when skip exceeds 1,000",
        "MongoDB still has to scan and discard documents, leading to high latency and memory overhead",
        "MongoDB permanently drops the collection index",
        "MongoDB automatically deletes the skipped documents"
      ],
      correct: 1,
      exp: "With large skip(N), MongoDB still examines and walks through N documents before returning results, making deep offset pagination slow."
    },
    {
      q: "7. Which approach is better suited for infinite scrolling over large datasets?",
      options: [
        "Offset pagination using skip() + limit()",
        "Cursor-based / range-based pagination using document IDs ($gt)",
        "Random document sampling ($sample)",
        "Sorting in reverse order without limit"
      ],
      correct: 1,
      exp: "Cursor-based pagination (e.g. _id > lastId) provides stable O(1) indexed jumps without scanning through preceding documents."
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
          <h3 style="font-size: 1.5rem; color: var(--mongo-green); margin-bottom: 0.5rem;">Quiz Completed!</h3>
          <p style="color: var(--text-secondary); font-size: 1rem; margin-bottom: 1.5rem;">
            You scored <strong style="color: var(--mongo-green); font-size: 1.25rem;">${this.score}</strong> out of <strong>${this.questions.length}</strong> questions correctly!
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

    // Disable multiple selections
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
  DemoTextSearch.init();
  DemoTextScore.init();
  DemoRegex.init();
  DemoAutocomplete.init();
  DemoIndexVis.init();
  DemoPagination.init();
  DemoSkipLimit.init();
  DemoCursor.init();
  Quiz.init();
});
