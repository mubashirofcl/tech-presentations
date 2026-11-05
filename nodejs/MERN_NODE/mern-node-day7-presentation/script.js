/**
 * MERN Node.js Day 7 — User Authentication Using JSON Web Tokens (JWT)
 * Interactive Presentation Controller & Lab Sandboxes
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

  // Section categories map for top bar indicator
  const slideCategories = {
    1: 'Welcome & Overview',
    2: 'What We Are Building',
    3: 'Auth vs Authorization',
    4: 'Authentication Flow',
    5: 'Why Hash Passwords?',
    6: 'Hands-on: bcryptjs',
    7: 'JWT Architecture',
    8: 'JWT Client-Server Flow',
    9: 'Hands-on: jwt.sign()',
    10: 'jwt.verify() & Expiration',
    11: 'Project Setup & .env',
    12: 'API: User Registration',
    13: 'API: User Login',
    14: 'Auth Middleware Concept',
    15: 'Hands-on: authMiddleware',
    16: 'API: Protected Profile',
    17: 'Postman Testing & Lab',
    18: 'Recap & Student Challenges'
  };

  /**
   * Initialize Presentation
   */
  function initPresentation() {
    buildTableOfContents();
    handleHashNavigation();
    setupEventListeners();
    initBcryptSandbox();
    initJwtInspector();
    initPostmanConsole();
    setupCopyButtons();
  }

  /**
   * Switch to a specific slide (1-indexed)
   */
  function goToSlide(slideNum) {
    if (slideNum < 1) slideNum = 1;
    if (slideNum > totalSlides) slideNum = totalSlides;

    currentSlide = slideNum;

    // Toggle active class on slide elements
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
      sectionIndicator.textContent = slideCategories[currentSlide] || 'MERN Node.js Day 7';
    }

    // Update Navigation Buttons Disabled state
    if (prevBtn) prevBtn.disabled = currentSlide === 1;
    if (nextBtn) {
      if (currentSlide === totalSlides) {
        nextBtn.innerHTML = `<span>Finish</span> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l5 5L20 7"/></svg>`;
      } else {
        nextBtn.innerHTML = `<span>Next</span> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>`;
      }
    }

    // Update Table of Contents active highlight
    updateTocActiveItem();

    // Update URL hash without polluting browser history
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
      // Don't intercept typing in inputs or textareas
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        if (e.key === 'Escape') {
          document.activeElement.blur();
        }
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ': // Spacebar
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
          if (tocOverlay && tocOverlay.classList.contains('active')) {
            closeToc();
          } else {
            openToc();
          }
          break;
        case '?':
        case 'h':
        case 'H':
          e.preventDefault();
          if (helpModal && helpModal.classList.contains('active')) {
            closeHelp();
          } else {
            openHelp();
          }
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
  // SIMULATOR 1: BCRYPTJS PASSWORD HASHER & VERIFIER (Slide 6)
  // =========================================================================
  function initBcryptSandbox() {
    const inputPass = document.getElementById('bcryptInputPass');
    const costSlider = document.getElementById('bcryptCostSlider');
    const costVal = document.getElementById('bcryptCostVal');
    const hashBtn = document.getElementById('bcryptHashBtn');
    const hashOutput = document.getElementById('bcryptHashOutput');
    const hashAnatomy = document.getElementById('bcryptHashAnatomy');
    const verifyPass = document.getElementById('bcryptVerifyPass');
    const verifyBtn = document.getElementById('bcryptVerifyBtn');
    const verifyResult = document.getElementById('bcryptVerifyResult');

    let currentHash = '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW';

    if (costSlider && costVal) {
      costSlider.addEventListener('input', () => {
        costVal.textContent = costSlider.value;
      });
    }

    // Helper: deterministic hash simulation matching bcrypt string format
    function generateBcryptString(plain, rounds) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789./';
      let salt = '';
      for (let i = 0; i < 22; i++) {
        salt += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      // Simple pseudo hash string for visual demonstration
      let hashBody = '';
      for (let i = 0; i < 31; i++) {
        hashBody += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      const formattedRounds = String(rounds).padStart(2, '0');
      return `$2b$${formattedRounds}$${salt}${hashBody}`;
    }

    if (hashBtn && inputPass && hashOutput) {
      hashBtn.addEventListener('click', () => {
        const pass = inputPass.value.trim();
        if (!pass) {
          alert('Please enter a password to hash');
          return;
        }

        const rounds = costSlider ? costSlider.value : '10';
        hashBtn.innerHTML = `<span>Hashing...</span>`;
        hashBtn.disabled = true;

        setTimeout(() => {
          currentHash = generateBcryptString(pass, rounds);
          hashOutput.value = currentHash;
          hashBtn.innerHTML = `<span>Hash with bcrypt</span>`;
          hashBtn.disabled = false;

          // Render anatomy
          if (hashAnatomy) {
            const parts = currentHash.split('$');
            // parts[0] is "", parts[1] is 2b, parts[2] is rounds, parts[3] is salt + hash
            const prefix = `$${parts[1]}$`;
            const cost = `$${parts[2]}$`;
            const saltHash = parts[3] || '';
            const salt = saltHash.slice(0, 22);
            const cipher = saltHash.slice(22);

            hashAnatomy.innerHTML = `
              <div style="font-family: var(--font-mono); font-size: 0.82rem; margin-top: 0.65rem; display: flex; flex-wrap: wrap; gap: 0.4rem;">
                <span style="background: #fef2f2; color: #b91c1c; padding: 0.2rem 0.5rem; border-radius: 4px; border: 1px solid #fecdd3;" title="Algorithm identifier">Algorithm: ${prefix}</span>
                <span style="background: #fef3c7; color: #92400e; padding: 0.2rem 0.5rem; border-radius: 4px; border: 1px solid #fde68a;" title="Cost factor rounds">Cost: ${cost}</span>
                <span style="background: #ecfeff; color: #0e7490; padding: 0.2rem 0.5rem; border-radius: 4px; border: 1px solid #a5f3fc;" title="Random 22-char salt">Salt (22 chars): ${salt}</span>
                <span style="background: #f5f3ff; color: #6d28d9; padding: 0.2rem 0.5rem; border-radius: 4px; border: 1px solid #ddd6fe;" title="31-char encrypted hash">Hash: ${cipher.slice(0, 10)}...</span>
              </div>
            `;
          }

          if (verifyResult) {
            verifyResult.innerHTML = `<span style="color: var(--text-muted); font-size: 0.82rem;">Ready to compare test password against new hash.</span>`;
          }
        }, 300);
      });
    }

    if (verifyBtn && verifyPass && verifyResult) {
      verifyBtn.addEventListener('click', () => {
        const testPass = verifyPass.value.trim();
        const originPass = inputPass ? inputPass.value.trim() : 'student123';

        if (!testPass) {
          alert('Please enter a password to test');
          return;
        }

        verifyBtn.innerHTML = `<span>Checking...</span>`;
        verifyBtn.disabled = true;

        setTimeout(() => {
          verifyBtn.innerHTML = `<span>Verify Match</span>`;
          verifyBtn.disabled = false;

          if (testPass === originPass) {
            verifyResult.innerHTML = `
              <div class="callout callout-tip" style="padding: 0.6rem 0.9rem; font-size: 0.84rem; display: flex; align-items: center; gap: 0.5rem;">
                <strong style="color: #065f46;">MATCH SUCCESSFUL (true):</strong>
                <span>bcrypt.compare() extracted the salt, re-hashed '${testPass}', and matched the hash. User authenticated!</span>
              </div>
            `;
          } else {
            verifyResult.innerHTML = `
              <div class="callout callout-danger" style="padding: 0.6rem 0.9rem; font-size: 0.84rem; display: flex; align-items: center; gap: 0.5rem;">
                <strong style="color: #9f1239;">MISMATCH ERROR (false):</strong>
                <span>Passwords do NOT match! Express server sends 401 Unauthorized ("Invalid credentials").</span>
              </div>
            `;
          }
        }, 250);
      });
    }
  }

  // =========================================================================
  // SIMULATOR 2: INTERACTIVE JWT TOKEN INSPECTOR (Slide 7 & Slide 9)
  // =========================================================================
  function initJwtInspector() {
    const userIdInput = document.getElementById('jwtUserId');
    const roleInput = document.getElementById('jwtUserRole');
    const emailInput = document.getElementById('jwtUserEmail');
    const secretInput = document.getElementById('jwtSecretInput');
    const generateBtn = document.getElementById('jwtGenBtn');

    const headerPart = document.getElementById('jwtHeaderPart');
    const payloadPart = document.getElementById('jwtPayloadPart');
    const sigPart = document.getElementById('jwtSigPart');

    const decodedHeader = document.getElementById('jwtDecodedHeader');
    const decodedPayload = document.getElementById('jwtDecodedPayload');
    const decodedSig = document.getElementById('jwtDecodedSig');

    // Helper: Base64Url encoding
    function base64UrlEncode(obj) {
      const jsonStr = typeof obj === 'string' ? obj : JSON.stringify(obj);
      return btoa(unescape(encodeURIComponent(jsonStr)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
    }

    function updateJwtDisplay() {
      const uId = userIdInput ? userIdInput.value.trim() : 'std_101';
      const role = roleInput ? roleInput.value.trim() : 'student';
      const email = emailInput ? emailInput.value.trim() : 'alex@college.edu';
      const secret = secretInput ? secretInput.value.trim() : 'supersecretkey123';

      const headerObj = { alg: 'HS256', typ: 'JWT' };
      const now = Math.floor(Date.now() / 1000);
      const payloadObj = {
        userId: uId,
        role: role,
        email: email,
        iat: now,
        exp: now + 3600 // 1 hour
      };

      const hB64 = base64UrlEncode(headerObj);
      const pB64 = base64UrlEncode(payloadObj);

      // Deterministic signature simulation
      let sigSeed = hB64 + pB64 + secret;
      let hash = 0;
      for (let i = 0; i < sigSeed.length; i++) {
        hash = ((hash << 5) - hash) + sigSeed.charCodeAt(i);
        hash |= 0;
      }
      const sB64 = base64UrlEncode(`HMACSHA256(${Math.abs(hash)})`).padEnd(43, 'x').slice(0, 43);

      if (headerPart) headerPart.textContent = hB64;
      if (payloadPart) payloadPart.textContent = pB64;
      if (sigPart) sigPart.textContent = sB64;

      if (decodedHeader) decodedHeader.textContent = JSON.stringify(headerObj, null, 2);
      if (decodedPayload) decodedPayload.textContent = JSON.stringify(payloadObj, null, 2);
      if (decodedSig) {
        decodedSig.textContent = `HMACSHA256(\n  base64UrlEncode(header) + "." +\n  base64UrlEncode(payload),\n  secretKey="${secret}"\n)`;
      }
    }

    if (generateBtn) {
      generateBtn.addEventListener('click', updateJwtDisplay);
    }

    // Auto-update on typing in any input
    [userIdInput, roleInput, emailInput, secretInput].forEach(inp => {
      if (inp) {
        inp.addEventListener('input', updateJwtDisplay);
      }
    });

    // Run initial update
    updateJwtDisplay();
  }

  // =========================================================================
  // SIMULATOR 3: INTERACTIVE AUTH API CONSOLE (Built-in Postman on Slide 17)
  // =========================================================================
  function initPostmanConsole() {
    const tabs = document.querySelectorAll('.postman-tab');
    const methodBadge = document.getElementById('pmMethodBadge');
    const urlInput = document.getElementById('pmUrlInput');
    const sendBtn = document.getElementById('pmSendBtn');
    const reqBodyText = document.getElementById('pmReqBody');
    const headerDisplay = document.getElementById('pmHeaderDisplay');
    const statusBadge = document.getElementById('pmStatusBadge');
    const timeBadge = document.getElementById('pmTimeBadge');
    const resBody = document.getElementById('pmResBody');
    const copyTokenBtn = document.getElementById('pmCopyTokenBtn');

    // Simulated in-memory database and generated token
    let registeredUsers = [
      { id: '101', name: 'John Doe', email: 'john@college.edu', passwordHash: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW' }
    ];
    let activeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMDEiLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoxNzAwMDAzNjAwfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

    const tabConfig = {
      register: {
        method: 'POST',
        url: 'http://localhost:5000/api/register',
        methodClass: 'badge-post',
        body: JSON.stringify({
          name: 'Sarah Connor',
          email: 'sarah@college.edu',
          password: 'mypassword123'
        }, null, 2),
        headers: 'Content-Type: application/json'
      },
      login: {
        method: 'POST',
        url: 'http://localhost:5000/api/login',
        methodClass: 'badge-post',
        body: JSON.stringify({
          email: 'sarah@college.edu',
          password: 'mypassword123'
        }, null, 2),
        headers: 'Content-Type: application/json'
      },
      profileWithToken: {
        method: 'GET',
        url: 'http://localhost:5000/api/profile',
        methodClass: 'badge-get',
        body: '// GET requests do not send a request body',
        headers: () => `Authorization: Bearer ${activeToken.slice(0, 24)}...\nContent-Type: application/json`
      },
      profileNoToken: {
        method: 'GET',
        url: 'http://localhost:5000/api/profile',
        methodClass: 'badge-get',
        body: '// No Authorization header sent',
        headers: 'Content-Type: application/json'
      }
    };

    let currentAction = 'register';

    // Tab switching
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
        if (reqBodyText) reqBodyText.value = typeof cfg.body === 'function' ? cfg.body() : cfg.body;
        if (headerDisplay) {
          headerDisplay.textContent = typeof cfg.headers === 'function' ? cfg.headers() : cfg.headers;
        }

        // Reset response box to ready
        if (statusBadge) {
          statusBadge.textContent = 'Status: Waiting';
          statusBadge.className = 'status-pill';
        }
        if (timeBadge) timeBadge.textContent = '0 ms';
        if (resBody) resBody.textContent = '// Click "Send Request" to simulate Express API execution';
      });
    });

    // Execute Simulated Express API Request
    if (sendBtn) {
      sendBtn.addEventListener('click', () => {
        sendBtn.innerHTML = `<span>Sending...</span>`;
        sendBtn.disabled = true;

        const startTime = performance.now();

        setTimeout(() => {
          const latency = Math.round(performance.now() - startTime + Math.random() * 25 + 15);
          if (timeBadge) timeBadge.textContent = `${latency} ms`;

          switch (currentAction) {
            case 'register': {
              let parsed;
              try {
                parsed = JSON.parse(reqBodyText.value);
              } catch (e) {
                renderError(400, 'Bad Request', { error: 'Invalid JSON body' });
                return;
              }

              const existing = registeredUsers.find(u => u.email === parsed.email);
              if (existing) {
                renderError(409, '409 Conflict', {
                  success: false,
                  message: 'A student with this email already exists!'
                });
              } else {
                const newId = String(registeredUsers.length + 101);
                registeredUsers.push({
                  id: newId,
                  name: parsed.name || 'New Student',
                  email: parsed.email,
                  passwordHash: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
                });

                renderSuccess(201, '201 Created', {
                  success: true,
                  message: 'Student registered successfully!',
                  student: {
                    id: newId,
                    name: parsed.name,
                    email: parsed.email
                  }
                });
              }
              break;
            }

            case 'login': {
              let parsed;
              try {
                parsed = JSON.parse(reqBodyText.value);
              } catch (e) {
                renderError(400, 'Bad Request', { error: 'Invalid JSON body' });
                return;
              }

              const user = registeredUsers.find(u => u.email === parsed.email);
              if (!user || parsed.password !== 'mypassword123') {
                renderError(401, '401 Unauthorized', {
                  success: false,
                  message: 'Invalid email or password!'
                });
              } else {
                // Generate simulated token
                activeToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({ userId: user.id, email: user.email, role: 'student' })).replace(/=/g, '')}.fGv58Lmq_ZRt7X01KxYzL9P2M8qW3-A`;

                renderSuccess(200, '200 OK', {
                  success: true,
                  message: 'Login successful!',
                  token: activeToken
                });
              }
              break;
            }

            case 'profileWithToken': {
              renderSuccess(200, '200 OK', {
                success: true,
                message: 'Protected profile accessed successfully!',
                user: {
                  userId: '101',
                  role: 'student',
                  note: 'Decoded safely by authMiddleware from req.user'
                }
              });
              break;
            }

            case 'profileNoToken': {
              renderError(401, '401 Unauthorized', {
                success: false,
                message: 'Access denied. No authentication token provided in Authorization header!'
              });
              break;
            }
          }

          sendBtn.innerHTML = `<span>Send Request</span> <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;
          sendBtn.disabled = false;
        }, 180);
      });
    }

    function renderSuccess(statusNum, statusText, data) {
      if (statusBadge) {
        statusBadge.textContent = `Status: ${statusText}`;
        statusBadge.className = 'status-pill status-pill-success';
      }
      if (resBody) {
        resBody.textContent = JSON.stringify(data, null, 2);
      }
    }

    function renderError(statusNum, statusText, data) {
      if (statusBadge) {
        statusBadge.textContent = `Status: ${statusText}`;
        statusBadge.className = 'status-pill status-pill-error';
      }
      if (resBody) {
        resBody.textContent = JSON.stringify(data, null, 2);
      }
    }

    if (copyTokenBtn) {
      copyTokenBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(activeToken).then(() => {
          copyTokenBtn.textContent = 'Token Copied!';
          setTimeout(() => {
            copyTokenBtn.textContent = 'Copy Active Token';
          }, 1800);
        });
      });
    }
  }

  // Launch!
  initPresentation();
});
