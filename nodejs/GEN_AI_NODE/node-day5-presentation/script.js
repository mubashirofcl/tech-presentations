/**
 * Gen-AI Node.js — Day 5 Presentation Controller & Lab Sandboxes
 * Features:
 * - 20 Slides Navigation with Progress Tracking & Keyboard Shortcuts
 * - Dynamic Table of Contents & Help Modal
 * - 1-Click Code Copying
 * - Interactive Sandbox 1: MySQL Async Query Runner (Slide 6 & 7)
 * - Interactive Sandbox 2: Zod Live Schema Validator (Slide 16)
 * - Interactive Sandbox 3: SSE Streaming Simulator (Slide 19)
 * - Interactive Sandbox 4: GenAI Starter API Console (Slide 20)
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
    1: 'Introduction & Agenda',
    2: 'Starter Template Architecture',
    3: 'What Is MySQL2 & Promises',
    4: 'MySQL Database & Connection Pool',
    5: 'CRUD Operations Defined',
    6: 'Practical: CREATE & READ Queries',
    7: 'Practical: UPDATE & DELETE Queries',
    8: 'Why Reusable Database Functions?',
    9: 'Practical: studentModel.js Architecture',
    10: 'Calling Models from Express Routes',
    11: 'What Is an NPM SDK?',
    12: 'Installing AI SDK Packages',
    13: 'Reading SDK Docs & OpenAI Client',
    14: 'Anthropic, Ollama & ChromaDB Clients',
    15: 'Protecting API Keys with .env',
    16: 'Zod Request Schema Validation',
    17: 'Modern Built-in Node.js Fetch',
    18: 'Normal vs. Streaming Responses',
    19: 'Practical: Express SSE Streaming API',
    20: 'Mini Project: GenAI Starter Template'
  };

  /**
   * Initialize Presentation
   */
  function initPresentation() {
    buildTableOfContents();
    handleHashNavigation();
    setupEventListeners();
    initSqlSandbox();
    initZodSandbox();
    initSseSandbox();
    initStarterApiConsole();
    setupCopyButtons();
  }

  /**
   * Navigate to specific slide (1 to 20)
   */
  function goToSlide(slideNum) {
    if (slideNum < 1) slideNum = 1;
    if (slideNum > totalSlides) slideNum = totalSlides;

    currentSlide = slideNum;

    // Toggle active class on slides
    slides.forEach((slide, index) => {
      if (index + 1 === currentSlide) {
        slide.classList.add('active');
        slide.scrollTop = 0; // Scroll to top of slide
      } else {
        slide.classList.remove('active');
      }
    });

    // Update Counter: "01 / 20"
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
      sectionIndicator.textContent = slideCategories[currentSlide] || 'Gen-AI Node.js Day 5';
    }

    // Update Nav Buttons
    if (prevBtn) prevBtn.disabled = currentSlide === 1;
    if (nextBtn) {
      if (currentSlide === totalSlides) {
        nextBtn.innerHTML = `<span>Complete</span> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l5 5L20 7"/></svg>`;
      } else {
        nextBtn.innerHTML = `<span>Next</span> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>`;
      }
    }

    // Update Table of Contents highlight
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
   * Build Table of Contents dynamically from slide titles
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
  // SIMULATOR 1: MYSQL CRUD QUERY RUNNER (Slides 6 & 7)
  // =========================================================================
  function initSqlSandbox() {
    let mockStudents = [
      { id: 1, name: 'John Doe', email: 'john@gmail.com', course: 'MERN Stack' },
      { id: 2, name: 'Sarah Connor', email: 'sarah@college.edu', course: 'GenAI Development' }
    ];
    let nextId = 3;

    const opSelect = document.getElementById('sqlOpSelect');
    const paramInput = document.getElementById('sqlParamInput');
    const executeBtn = document.getElementById('sqlExecuteBtn');
    const queryDisplay = document.getElementById('sqlQueryDisplay');
    const resultOutput = document.getElementById('sqlResultOutput');
    const tableBody = document.getElementById('sqlTableBody');

    function renderTable() {
      if (!tableBody) return;
      tableBody.innerHTML = '';
      if (mockStudents.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text-muted); font-style:italic;">Table is currently empty</td></tr>`;
        return;
      }
      mockStudents.forEach(st => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td><strong>${st.id}</strong></td>
          <td>${st.name}</td>
          <td><code>${st.email}</code></td>
          <td><span class="status-badge badge-get">${st.course}</span></td>
        `;
        tableBody.appendChild(row);
      });
    }

    function updateQueryPreview() {
      if (!opSelect || !queryDisplay) return;
      const op = opSelect.value;
      switch (op) {
        case 'SELECT':
          queryDisplay.textContent = 'SELECT * FROM students;';
          if (paramInput) { paramInput.value = ''; paramInput.disabled = true; paramInput.placeholder = 'No parameters required'; }
          break;
        case 'INSERT':
          queryDisplay.textContent = 'INSERT INTO students (name, email, course) VALUES (?, ?, ?);';
          if (paramInput) { paramInput.disabled = false; paramInput.placeholder = 'Alex, alex@gmail.com, Node.js AI'; if (!paramInput.value) paramInput.value = 'Alex, alex@gmail.com, Node.js AI'; }
          break;
        case 'UPDATE':
          queryDisplay.textContent = 'UPDATE students SET course = ? WHERE id = ?;';
          if (paramInput) { paramInput.disabled = false; paramInput.placeholder = 'course, id (e.g. Full Stack AI, 1)'; if (!paramInput.value) paramInput.value = 'Full Stack AI, 1'; }
          break;
        case 'DELETE':
          queryDisplay.textContent = 'DELETE FROM students WHERE id = ?;';
          if (paramInput) { paramInput.disabled = false; paramInput.placeholder = 'student_id (e.g. 2)'; if (!paramInput.value) paramInput.value = '2'; }
          break;
      }
    }

    if (opSelect) {
      opSelect.addEventListener('change', updateQueryPreview);
      updateQueryPreview();
    }

    if (executeBtn) {
      executeBtn.addEventListener('click', () => {
        const op = opSelect ? opSelect.value : 'SELECT';
        const params = paramInput ? paramInput.value.trim() : '';

        executeBtn.innerHTML = `<span>Executing...</span>`;
        executeBtn.disabled = true;

        setTimeout(() => {
          let output = {};
          switch (op) {
            case 'SELECT':
              output = {
                rows: mockStudents,
                fields: ['id', 'name', 'email', 'course'],
                rowCount: mockStudents.length
              };
              break;

            case 'INSERT': {
              const parts = params.split(',').map(s => s.trim());
              const name = parts[0] || 'New Student';
              const email = parts[1] || `user${nextId}@mail.com`;
              const course = parts[2] || 'GenAI Development';

              const newRow = { id: nextId++, name, email, course };
              mockStudents.push(newRow);

              output = {
                result: {
                  fieldCount: 0,
                  affectedRows: 1,
                  insertId: newRow.id,
                  info: '',
                  serverStatus: 2,
                  warningStatus: 0
                },
                insertedRecord: newRow
              };
              break;
            }

            case 'UPDATE': {
              const parts = params.split(',').map(s => s.trim());
              const newCourse = parts[0] || 'GenAI Masterclass';
              const targetId = parseInt(parts[1], 10) || 1;

              const target = mockStudents.find(s => s.id === targetId);
              let affected = 0;
              if (target) {
                target.course = newCourse;
                affected = 1;
              }

              output = {
                result: {
                  affectedRows: affected,
                  changedRows: affected,
                  message: `(Rows matched: ${affected}  Changed: ${affected}  Warnings: 0)`
                }
              };
              break;
            }

            case 'DELETE': {
              const targetId = parseInt(params, 10) || 1;
              const initialLen = mockStudents.length;
              mockStudents = mockStudents.filter(s => s.id !== targetId);
              const affected = initialLen - mockStudents.length;

              output = {
                result: {
                  affectedRows: affected,
                  serverStatus: 2
                }
              };
              break;
            }
          }

          if (resultOutput) {
            resultOutput.textContent = JSON.stringify(output, null, 2);
          }
          renderTable();

          executeBtn.innerHTML = `<span>Execute Query</span>`;
          executeBtn.disabled = false;
        }, 180);
      });
    }

    renderTable();
  }

  // =========================================================================
  // SIMULATOR 2: ZOD LIVE SCHEMA VALIDATOR (Slide 16)
  // =========================================================================
  function initZodSandbox() {
    const zodInput = document.getElementById('zodInputPayload');
    const testValidBtn = document.getElementById('zodLoadValidBtn');
    const testInvalidBtn = document.getElementById('zodLoadInvalidBtn');
    const validateBtn = document.getElementById('zodValidateBtn');
    const zodStatus = document.getElementById('zodStatusBadge');
    const zodOutput = document.getElementById('zodOutputResult');

    const validPayload = {
      name: "John Doe",
      email: "john@gmail.com",
      course: "MERN Stack"
    };

    const invalidPayload = {
      name: "J", // invalid: min(2) required
      email: "not-an-email", // invalid email
      course: "" // invalid: min(2) required
    };

    if (testValidBtn && zodInput) {
      testValidBtn.addEventListener('click', () => {
        zodInput.value = JSON.stringify(validPayload, null, 2);
      });
    }

    if (testInvalidBtn && zodInput) {
      testInvalidBtn.addEventListener('click', () => {
        zodInput.value = JSON.stringify(invalidPayload, null, 2);
      });
    }

    if (validateBtn && zodInput && zodOutput) {
      validateBtn.addEventListener('click', () => {
        let parsed;
        try {
          parsed = JSON.parse(zodInput.value);
        } catch (e) {
          if (zodStatus) {
            zodStatus.textContent = 'JSON Parse Error';
            zodStatus.className = 'status-pill status-pill-error';
          }
          zodOutput.textContent = JSON.stringify({ error: 'Malformed JSON payload' }, null, 2);
          return;
        }

        // Simulate studentSchema.safeParse()
        const issues = [];
        if (!parsed.name || typeof parsed.name !== 'string' || parsed.name.length < 2) {
          issues.push({
            code: 'too_small',
            minimum: 2,
            type: 'string',
            path: ['name'],
            message: 'String must contain at least 2 character(s)'
          });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!parsed.email || typeof parsed.email !== 'string' || !emailRegex.test(parsed.email)) {
          issues.push({
            validation: 'email',
            code: 'invalid_string',
            path: ['email'],
            message: 'Invalid email format'
          });
        }
        if (!parsed.course || typeof parsed.course !== 'string' || parsed.course.length < 2) {
          issues.push({
            code: 'too_small',
            minimum: 2,
            type: 'string',
            path: ['course'],
            message: 'Course must contain at least 2 character(s)'
          });
        }

        if (issues.length === 0) {
          if (zodStatus) {
            zodStatus.textContent = 'safeParse: SUCCESS (true)';
            zodStatus.className = 'status-pill status-pill-success';
          }
          zodOutput.textContent = JSON.stringify({
            success: true,
            data: {
              name: parsed.name,
              email: parsed.email,
              course: parsed.course
            }
          }, null, 2);
        } else {
          if (zodStatus) {
            zodStatus.textContent = 'safeParse: FAILED (false)';
            zodStatus.className = 'status-pill status-pill-error';
          }
          zodOutput.textContent = JSON.stringify({
            success: false,
            error: {
              name: 'ZodError',
              issues: issues
            }
          }, null, 2);
        }
      });
    }
  }

  // =========================================================================
  // SIMULATOR 3: SSE STREAMING SIMULATOR (Slide 19)
  // =========================================================================
  function initSseSandbox() {
    const streamBtn = document.getElementById('sseStreamBtn');
    const clearBtn = document.getElementById('sseClearBtn');
    const sseTerminal = document.getElementById('sseTerminalOutput');
    const chunkBadge = document.getElementById('sseChunkBadge');

    let streamActive = false;

    if (streamBtn && sseTerminal) {
      streamBtn.addEventListener('click', () => {
        if (streamActive) return;
        streamActive = true;
        streamBtn.disabled = true;
        streamBtn.innerHTML = `<span>Streaming Chunks...</span>`;

        sseTerminal.innerHTML = `<span style="color:#64748b;">// Connecting to GET /stream (Content-Type: text/event-stream)...</span>\n`;

        const chunks = [
          "data: Hello\n\n",
          "data: Welcome\n\n",
          "data: To GenAI Node.js\n\n",
          "data: [DONE]\n\n"
        ];

        let index = 0;
        if (chunkBadge) chunkBadge.textContent = '0 chunks';

        const timer = setInterval(() => {
          if (index < chunks.length) {
            const chunk = chunks[index];
            const isDone = chunk.includes('[DONE]');
            const color = isDone ? '#10b981' : '#38bdf8';
            const timestamp = new Date().toLocaleTimeString();

            sseTerminal.innerHTML += `<span style="color:#64748b;">[${timestamp}]</span> <span style="color:${color}; font-weight:700;">${chunk.replace(/\n\n$/, '')}</span>\n\n`;
            sseTerminal.scrollTop = sseTerminal.scrollHeight;

            index++;
            if (chunkBadge) chunkBadge.textContent = `${index} of 4 chunks`;
          } else {
            clearInterval(timer);
            sseTerminal.innerHTML += `<span style="color:#10b981;">// Stream closed by server with res.end()</span>\n`;
            streamBtn.innerHTML = `<span>Re-run Stream</span>`;
            streamBtn.disabled = false;
            streamActive = false;
          }
        }, 900);
      });
    }

    if (clearBtn && sseTerminal) {
      clearBtn.addEventListener('click', () => {
        sseTerminal.innerHTML = `<span style="color:#64748b;">// Click "Start SSE Stream" to simulate res.write() events</span>`;
        if (chunkBadge) chunkBadge.textContent = 'Idle';
      });
    }
  }

  // =========================================================================
  // SIMULATOR 4: GENAI STARTER API CONSOLE (Slide 20)
  // =========================================================================
  function initStarterApiConsole() {
    const tabs = document.querySelectorAll('.starter-tab');
    const methodBadge = document.getElementById('stMethodBadge');
    const urlInput = document.getElementById('stUrlInput');
    const sendBtn = document.getElementById('stSendBtn');
    const reqBodyText = document.getElementById('stReqBody');
    const headerDisplay = document.getElementById('stHeaderDisplay');
    const statusBadge = document.getElementById('stStatusBadge');
    const timeBadge = document.getElementById('stTimeBadge');
    const resBody = document.getElementById('stResBody');

    let currentAction = 'getStudents';

    const tabConfig = {
      getStudents: {
        method: 'GET',
        url: 'http://localhost:3000/students',
        methodClass: 'badge-get',
        body: '// GET request: no payload sent',
        headers: 'Accept: application/json'
      },
      postStudent: {
        method: 'POST',
        url: 'http://localhost:3000/students',
        methodClass: 'badge-post',
        body: JSON.stringify({
          name: "Emily Watson",
          email: "emily@gmail.com",
          course: "GenAI Development"
        }, null, 2),
        headers: 'Content-Type: application/json'
      },
      aiPrompt: {
        method: 'GET',
        url: 'http://localhost:3000/ai?prompt=Explain%20Node.js%20in%20simple%20words',
        methodClass: 'badge-get',
        body: '// Query Param: prompt="Explain Node.js in simple words"',
        headers: 'Accept: application/json'
      }
    };

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
        if (headerDisplay) headerDisplay.textContent = cfg.headers;

        if (statusBadge) {
          statusBadge.textContent = 'Status: Ready';
          statusBadge.className = 'status-pill';
        }
        if (timeBadge) timeBadge.textContent = '0 ms';
        if (resBody) resBody.textContent = '// Click "Send Request" to test simulated endpoint';
      });
    });

    if (sendBtn) {
      sendBtn.addEventListener('click', () => {
        sendBtn.innerHTML = `<span>Sending...</span>`;
        sendBtn.disabled = true;

        const startTime = performance.now();

        setTimeout(() => {
          const latency = Math.round(performance.now() - startTime + Math.random() * 20 + 20);
          if (timeBadge) timeBadge.textContent = `${latency} ms`;

          switch (currentAction) {
            case 'getStudents':
              renderResponse(200, '200 OK', 'status-pill-success', [
                { id: 1, name: "John Doe", email: "john@gmail.com", course: "MERN Stack" },
                { id: 2, name: "Sarah Connor", email: "sarah@college.edu", course: "GenAI Development" }
              ]);
              break;

            case 'postStudent':
              let parsed;
              try {
                parsed = JSON.parse(reqBodyText.value);
              } catch (e) {
                renderResponse(400, '400 Bad Request', 'status-pill-error', { error: 'Invalid JSON body' });
                return;
              }
              // Zod validation
              if (!parsed.name || parsed.name.length < 2 || !parsed.email || !parsed.email.includes('@')) {
                renderResponse(400, '400 Bad Request', 'status-pill-error', {
                  message: "Invalid student data",
                  errors: ["Validation failed via studentSchema.safeParse()"]
                });
              } else {
                renderResponse(201, '201 Created', 'status-pill-success', {
                  message: "Student created",
                  id: 103
                });
              }
              break;

            case 'aiPrompt':
              renderResponse(200, '200 OK', 'status-pill-success', {
                answer: "Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a web browser, powered by Google's V8 engine and an event-driven, non-blocking I/O model."
              });
              break;
          }

          sendBtn.innerHTML = `<span>Send Request</span> <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;
          sendBtn.disabled = false;
        }, 150);
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
  }

  // Launch!
  initPresentation();
});
