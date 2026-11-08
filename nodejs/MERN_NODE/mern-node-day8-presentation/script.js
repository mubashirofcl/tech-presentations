/**
 * MERN Node.js Day 8 — Implementing User Sessions
 * Interactive Presentation Controller & Lab Sandboxes
 * Features:
 * - 18 Slides Navigation with Progress Tracking & Keyboard Shortcuts
 * - Dynamic Table of Contents & Help Modal
 * - 1-Click Code Copying
 * - Simulator 1: Express Session Visit Counter (Slide 7)
 * - Simulator 2: Interactive Student Session API Console (Slide 17)
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // SLIDE CONTROLLER & STATE
  // =========================================================================
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  let currentSlide = 1;

  // DOM Elements
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const slideCounter = document.getElementById('slideCounter');
  const progressFill = document.getElementById('progressFill');
  const sectionIndicator = document.getElementById('sectionIndicator');
  const tocBtn = document.getElementById('tocBtn');
  const tocOverlay = document.getElementById('tocOverlay');
  const tocClose = document.getElementById('tocClose');
  const tocList = document.getElementById('tocList');
  const helpBtn = document.getElementById('helpBtn');
  const helpModal = document.getElementById('helpModal');
  const helpClose = document.getElementById('helpClose');
  const fullscreenBtn = document.getElementById('fullscreenBtn');

  // Slide categories map for the top bar indicator
  const slideCategories = {
    1: 'Welcome & Overview',
    2: 'What Is a User Session?',
    3: 'JWT vs Sessions Comparison',
    4: 'Cookies & Security Flags',
    5: 'Session Authentication Flow',
    6: 'express-session Middleware',
    7: 'Hands-on: First Session & Visits',
    8: 'Project Architecture & Setup',
    9: 'Hands-on: MongoStore Config',
    10: 'Server Session vs Browser Cookie',
    11: 'API: User Registration',
    12: 'API: Login & Session Creation',
    13: 'Auth Middleware Gatekeeper',
    14: 'Hands-on: authMiddleware.js',
    15: 'API: Protected /profile Route',
    16: 'API: Logout & Session Destruction',
    17: 'Postman Testing & Simulator Lab',
    18: 'Recap & Student Challenges'
  };

  /**
   * Initialize Presentation
   */
  function initPresentation() {
    buildTableOfContents();
    handleHashNavigation();
    setupEventListeners();
    initVisitSandbox();
    initSessionApiConsole();
    setupCopyButtons();
  }

  /**
   * Switch to a specific slide (1 to 18)
   */
  function goToSlide(slideNum) {
    if (slideNum < 1) slideNum = 1;
    if (slideNum > totalSlides) slideNum = totalSlides;

    currentSlide = slideNum;

    // Toggle active class on slides
    slides.forEach((slide, index) => {
      if (index + 1 === currentSlide) {
        slide.classList.add('active');
        slide.scrollTop = 0; // Reset scroll to top
      } else {
        slide.classList.remove('active');
      }
    });

    // Update Counter: e.g. "01 / 18"
    if (slideCounter) {
      const curFormatted = String(currentSlide).padStart(2, '0');
      const totFormatted = String(totalSlides).padStart(2, '0');
      slideCounter.textContent = `${curFormatted} / ${totFormatted}`;
    }

    // Update Progress Bar
    if (progressFill) {
      const progressPercent = ((currentSlide - 1) / (totalSlides - 1)) * 100;
      progressFill.style.width = `${progressPercent}%`;
    }

    // Update Section Category Indicator
    if (sectionIndicator) {
      sectionIndicator.textContent = slideCategories[currentSlide] || 'MERN Node.js Day 8';
    }

    // Update Navigation Buttons Disabled state
    if (prevBtn) prevBtn.disabled = currentSlide === 1;
    if (nextBtn) {
      if (currentSlide === totalSlides) {
        nextBtn.innerHTML = `<span>Complete</span> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l5 5L20 7"/></svg>`;
      } else {
        nextBtn.innerHTML = `<span>Next</span> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>`;
      }
    }

    // Update Table of Contents active highlight
    updateTocActiveItem();

    // Update URL hash
    history.replaceState(null, null, `#slide-${currentSlide}`);
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

  /**
   * Build Table of Contents Drawer dynamically from slide titles
   */
  function buildTableOfContents() {
    if (!tocList) return;
    tocList.innerHTML = '';

    slides.forEach((slide, index) => {
      const slideNum = index + 1;
      const titleElem = slide.querySelector('.slide-title');
      const title = titleElem ? titleElem.innerText.replace(/[\n\r]+/g, ' ').trim() : `Slide ${slideNum}`;

      const item = document.createElement('div');
      item.className = 'toc-item';
      item.dataset.slide = slideNum;
      item.innerHTML = `
        <span class="toc-item-num">${String(slideNum).padStart(2, '0')}</span>
        <span class="toc-item-title">${title}</span>
      `;

      item.addEventListener('click', () => {
        goToSlide(slideNum);
        closeToc();
      });

      tocList.appendChild(item);
    });
  }

  function updateTocActiveItem() {
    if (!tocList) return;
    const items = tocList.querySelectorAll('.toc-item');
    items.forEach(item => {
      const slideNum = parseInt(item.dataset.slide, 10);
      if (slideNum === currentSlide) {
        item.classList.add('active');
        item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else {
        item.classList.remove('active');
      }
    });
  }

  function openToc() {
    if (tocOverlay) {
      tocOverlay.classList.add('active');
      tocOverlay.style.display = 'block';
    }
  }

  function closeToc() {
    if (tocOverlay) {
      tocOverlay.classList.remove('active');
      setTimeout(() => {
        if (!tocOverlay.classList.contains('active')) {
          tocOverlay.style.display = 'none';
        }
      }, 200);
    }
  }

  function openHelp() {
    if (helpModal) {
      helpModal.classList.add('active');
      helpModal.style.display = 'flex';
    }
  }

  function closeHelp() {
    if (helpModal) {
      helpModal.classList.remove('active');
      setTimeout(() => {
        if (!helpModal.classList.contains('active')) {
          helpModal.style.display = 'none';
        }
      }, 200);
    }
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  /**
   * Handle hash navigation on page load & hash changes
   */
  function handleHashNavigation() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#slide-')) {
      const target = parseInt(hash.replace('#slide-', ''), 10);
      if (!isNaN(target) && target >= 1 && target <= totalSlides) {
        goToSlide(target);
        return;
      }
    }
    goToSlide(1);
  }

  /**
   * Event listeners for keyboard, buttons, and popups
   */
  function setupEventListeners() {
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    if (tocBtn) tocBtn.addEventListener('click', openToc);
    if (tocClose) tocClose.addEventListener('click', closeToc);
    if (tocOverlay) {
      tocOverlay.addEventListener('click', (e) => {
        if (e.target === tocOverlay) closeToc();
      });
    }

    if (helpBtn) helpBtn.addEventListener('click', openHelp);
    if (helpClose) helpClose.addEventListener('click', closeHelp);
    if (helpModal) {
      helpModal.addEventListener('click', (e) => {
        if (e.target === helpModal) closeHelp();
      });
    }

    if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        if (e.key === 'Escape') document.activeElement.blur();
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
        case 'PageDown':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
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
        case 't':
        case 'T':
          e.preventDefault();
          if (tocOverlay && tocOverlay.classList.contains('active')) closeToc();
          else openToc();
          break;
        case '?':
        case 'h':
        case 'H':
          e.preventDefault();
          if (helpModal && helpModal.classList.contains('active')) closeHelp();
          else openHelp();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'Escape':
          closeToc();
          closeHelp();
          break;
      }
    });

    window.addEventListener('hashchange', () => {
      handleHashNavigation();
    });
  }

  /**
   * Code block 1-click copy handler
   */
  function setupCopyButtons() {
    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const container = btn.closest('.code-container');
        if (!container) return;
        const codeElement = container.querySelector('code');
        if (!codeElement) return;

        const textToCopy = codeElement.innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalText = btn.innerHTML;
          btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Copied!`;
          btn.style.color = '#10b981';
          btn.style.borderColor = '#10b981';

          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.color = '';
            btn.style.borderColor = '';
          }, 2000);
        }).catch(err => {
          console.error('Copy failed: ', err);
        });
      });
    });
  }

  // =========================================================================
  // SIMULATOR 1: SESSION VISIT COUNTER SANDBOX (Slide 7)
  // =========================================================================
  function initVisitSandbox() {
    const visitBtn = document.getElementById('visitSendBtn');
    const resetBtn = document.getElementById('visitResetBtn');
    const visitCountBadge = document.getElementById('visitCountBadge');
    const cookieDisplay = document.getElementById('visitCookieDisplay');
    const outputResult = document.getElementById('visitOutputResult');
    const explainBox = document.getElementById('visitExplainBox');

    let visitCount = 0;
    let sessionId = 's%3A_9dFk3M1zP8L2qR5wX7yB0vN4aC6eT8u.gH5jK9mN1pQ3sU5w';

    function updateView() {
      if (visitCountBadge) {
        visitCountBadge.textContent = `visits: ${visitCount}`;
      }
      if (cookieDisplay) {
        if (visitCount === 0) {
          cookieDisplay.textContent = '// No session cookie stored yet';
        } else {
          cookieDisplay.textContent = `Cookie: connect.sid=${sessionId}`;
        }
      }
    }

    if (visitBtn) {
      visitBtn.addEventListener('click', () => {
        visitCount++;
        visitBtn.disabled = true;
        visitBtn.innerHTML = `<span>Requesting...</span>`;

        setTimeout(() => {
          updateView();

          if (outputResult) {
            outputResult.textContent = JSON.stringify({
              message: "Session example",
              visits: visitCount
            }, null, 2);
          }

          if (explainBox) {
            if (visitCount === 1) {
              explainBox.innerHTML = `
                <div class="callout callout-info" style="font-size:0.8rem; padding:0.5rem 0.75rem;">
                  <strong>Request 1:</strong> Server created a new session in memory, set <code>req.session.visits = 1</code>, and sent header: <code>Set-Cookie: connect.sid=...</code>.
                </div>
              `;
            } else {
              explainBox.innerHTML = `
                <div class="callout callout-tip" style="font-size:0.8rem; padding:0.5rem 0.75rem;">
                  <strong>Request ${visitCount}:</strong> Browser automatically sent <code>Cookie: connect.sid</code>. Server found the existing session and incremented <code>visits</code> to <strong>${visitCount}</strong>!
                </div>
              `;
            }
          }

          visitBtn.disabled = false;
          visitBtn.innerHTML = `<span>Send GET /visit</span>`;
        }, 180);
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        visitCount = 0;
        sessionId = 's%3A' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        updateView();

        if (outputResult) {
          outputResult.textContent = '// Click "Send GET /visit" to trigger session middleware';
        }
        if (explainBox) {
          explainBox.innerHTML = `<span style="font-size:0.8rem; color:var(--text-muted);">Session reset. Next request will create a brand new session.</span>`;
        }
      });
    }

    updateView();
  }

  // =========================================================================
  // SIMULATOR 2: INTERACTIVE STUDENT SESSION API CONSOLE (Slide 17)
  // =========================================================================
  function initSessionApiConsole() {
    const tabs = document.querySelectorAll('.postman-tab');
    const methodBadge = document.getElementById('pmMethodBadge');
    const urlInput = document.getElementById('pmUrlInput');
    const sendBtn = document.getElementById('pmSendBtn');
    const reqBodyText = document.getElementById('pmReqBody');
    const headerDisplay = document.getElementById('pmHeaderDisplay');
    const statusBadge = document.getElementById('pmStatusBadge');
    const timeBadge = document.getElementById('pmTimeBadge');
    const resBody = document.getElementById('pmResBody');
    const cookieJarBadge = document.getElementById('pmCookieJarBadge');

    // In-memory simulated database and session state
    let registeredUsers = [
      { id: 101, name: 'John Doe', email: 'john@gmail.com', passwordHash: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW' }
    ];

    let currentSessionCookie = null; // null means no active session cookie in browser
    let activeServerSessions = {};   // simulated MongoStore: { sessionId: { userId, email } }

    const tabConfig = {
      register: {
        method: 'POST',
        url: 'http://localhost:3000/register',
        methodClass: 'badge-post',
        body: JSON.stringify({
          name: 'Sarah Connor',
          email: 'sarah@college.edu',
          password: 'student123'
        }, null, 2),
        headers: () => 'Content-Type: application/json'
      },
      login: {
        method: 'POST',
        url: 'http://localhost:3000/login',
        methodClass: 'badge-post',
        body: JSON.stringify({
          email: 'john@gmail.com',
          password: 'student123'
        }, null, 2),
        headers: () => 'Content-Type: application/json'
      },
      profileWithCookie: {
        method: 'GET',
        url: 'http://localhost:3000/profile',
        methodClass: 'badge-get',
        body: '// GET request: no body payload sent',
        headers: () => currentSessionCookie
          ? `Cookie: student.sid=${currentSessionCookie}\nAccept: application/json`
          : '// Warning: No cookie in browser jar. Request will be rejected.'
      },
      logout: {
        method: 'POST',
        url: 'http://localhost:3000/logout',
        methodClass: 'badge-post',
        body: '// POST request to destroy session',
        headers: () => currentSessionCookie
          ? `Cookie: student.sid=${currentSessionCookie}`
          : 'Content-Type: application/json'
      },
      profileAfterLogout: {
        method: 'GET',
        url: 'http://localhost:3000/profile',
        methodClass: 'badge-get',
        body: '// Attempting to access profile after logout',
        headers: () => '// No Cookie: student.sid sent (cleared by logout)'
      }
    };

    let currentAction = 'register';

    function updateCookieJarIndicator() {
      if (!cookieJarBadge) return;
      if (currentSessionCookie) {
        cookieJarBadge.textContent = `Cookie Jar: student.sid (${currentSessionCookie.slice(0, 10)}...)`;
        cookieJarBadge.className = 'status-pill status-pill-success';
      } else {
        cookieJarBadge.textContent = 'Cookie Jar: Empty (No Active Session)';
        cookieJarBadge.className = 'status-pill';
      }
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentAction = tab.dataset.action;

        const cfg = tabConfig[currentAction];
        if (!cfg) return;

        if (methodBadge) {
          methodBadge.textContent = cfg.method;
          methodBadge.className = `status-badge ${cfg.methodClass}`;
        }
        if (urlInput) urlInput.value = cfg.url;
        if (reqBodyText) reqBodyText.value = cfg.body;
        if (headerDisplay) {
          headerDisplay.textContent = typeof cfg.headers === 'function' ? cfg.headers() : cfg.headers;
        }

        // Reset response state
        if (statusBadge) {
          statusBadge.textContent = 'Status: Waiting';
          statusBadge.className = 'status-pill';
        }
        if (timeBadge) timeBadge.textContent = '0 ms';
        if (resBody) resBody.textContent = '// Click "Send Request" to test simulated Express endpoint';
      });
    });

    if (sendBtn) {
      sendBtn.addEventListener('click', () => {
        sendBtn.innerHTML = `<span>Sending...</span>`;
        sendBtn.disabled = true;

        const startTime = performance.now();

        setTimeout(() => {
          const latency = Math.round(performance.now() - startTime + Math.random() * 20 + 15);
          if (timeBadge) timeBadge.textContent = `${latency} ms`;

          switch (currentAction) {
            case 'register': {
              let parsed;
              try {
                parsed = JSON.parse(reqBodyText.value);
              } catch (e) {
                renderResponse(400, '400 Bad Request', 'status-pill-error', { message: 'Invalid JSON body' });
                return;
              }

              const existing = registeredUsers.find(u => u.email === parsed.email);
              if (existing) {
                renderResponse(409, '409 Conflict', 'status-pill-error', {
                  message: 'User already exists'
                });
              } else {
                const newId = Date.now();
                registeredUsers.push({
                  id: newId,
                  name: parsed.name || 'New Student',
                  email: parsed.email,
                  passwordHash: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW'
                });

                renderResponse(201, '201 Created', 'status-pill-success', {
                  message: 'Registration successful'
                });
              }
              break;
            }

            case 'login': {
              let parsed;
              try {
                parsed = JSON.parse(reqBodyText.value);
              } catch (e) {
                renderResponse(400, '400 Bad Request', 'status-pill-error', { message: 'Invalid JSON body' });
                return;
              }

              const user = registeredUsers.find(u => u.email === parsed.email);
              if (!user || parsed.password !== 'student123') {
                renderResponse(401, '401 Unauthorized', 'status-pill-error', {
                  message: 'Invalid email or password'
                });
              } else {
                // Generate new session ID (session fixation defense)
                const newSid = 's%3A' + Math.random().toString(36).substring(2, 14) + '.' + Math.random().toString(36).substring(2, 10);
                currentSessionCookie = newSid;

                // Save in simulated MongoStore
                activeServerSessions[newSid] = {
                  userId: user.id,
                  email: user.email,
                  createdAt: new Date().toISOString()
                };

                updateCookieJarIndicator();

                renderResponse(200, '200 OK', 'status-pill-success', {
                  message: 'Login successful'
                });
              }
              break;
            }

            case 'profileWithCookie': {
              if (!currentSessionCookie || !activeServerSessions[currentSessionCookie]) {
                renderResponse(401, '401 Unauthorized', 'status-pill-error', {
                  message: 'Please login first'
                });
              } else {
                const sessionData = activeServerSessions[currentSessionCookie];
                const user = registeredUsers.find(u => u.id === sessionData.userId) || {
                  id: 101,
                  name: 'John Doe',
                  email: 'john@gmail.com'
                };

                renderResponse(200, '200 OK', 'status-pill-success', {
                  message: 'Welcome to your profile',
                  user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                  }
                });
              }
              break;
            }

            case 'logout': {
              if (currentSessionCookie && activeServerSessions[currentSessionCookie]) {
                delete activeServerSessions[currentSessionCookie];
              }
              currentSessionCookie = null;
              updateCookieJarIndicator();

              renderResponse(200, '200 OK', 'status-pill-success', {
                message: 'Logout successful'
              });
              break;
            }

            case 'profileAfterLogout': {
              renderResponse(401, '401 Unauthorized', 'status-pill-error', {
                message: 'Please login first'
              });
              break;
            }
          }

          sendBtn.innerHTML = `<span>Send Request</span> <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;
          sendBtn.disabled = false;
        }, 180);
      });
    }

    function renderResponse(code, text, badgeClass, data) {
      if (statusBadge) {
        statusBadge.textContent = `Status: ${text}`;
        statusBadge.className = `status-pill ${badgeClass}`;
      }
      if (resBody) {
        resBody.textContent = JSON.stringify(data, null, 2);
      }
    }

    updateCookieJarIndicator();
  }

  // Launch!
  initPresentation();
});

