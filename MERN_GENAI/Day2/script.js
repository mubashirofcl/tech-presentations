/**
 * MERN Gen-AI – Day 2: Building AI-Powered Applications
 * Interactive Presentation Engine & Demonstration Sandboxes
 * Pure Vanilla JavaScript (Zero External Dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Slide Configuration ---
  const TOTAL_SLIDES = 18;
  let currentSlide = 1;

  // Slide Metadata for Table of Contents & Category Headings
  const SLIDE_DATA = [
    { num: 1, title: 'From LLM to AI Application', section: 'Architecture' },
    { num: 2, title: 'How Does an AI Application Work?', section: 'Architecture' },
    { num: 3, title: 'Async/Await & LLM API Requests', section: 'Node.js Patterns' },
    { num: 4, title: 'What Is Structured Output?', section: 'Structured Outputs' },
    { num: 5, title: 'Practical: Ask LLM to Return JSON', section: 'Structured Outputs' },
    { num: 6, title: 'What Is Zod? Schema Validation', section: 'Zod Validation' },
    { num: 7, title: 'Practical: Resume Info Extractor', section: 'Zod Validation' },
    { num: 8, title: 'What Is Function / Tool Calling?', section: 'Tool Calling' },
    { num: 9, title: 'Practical: Build a Calculator Tool', section: 'Tool Calling' },
    { num: 10, title: 'Connect Calculator with an LLM', section: 'Tool Calling' },
    { num: 11, title: 'Complete Tool Calling Flow', section: 'Tool Calling' },
    { num: 12, title: 'What Is RAG? (Retrieval-Augmented)', section: 'RAG Pipeline' },
    { num: 13, title: 'RAG Architecture (7-Step Pipeline)', section: 'RAG Pipeline' },
    { num: 14, title: 'Practical: Keyword RAG in Node.js', section: 'RAG Pipeline' },
    { num: 15, title: 'Send Retrieved Context to LLM', section: 'RAG Pipeline' },
    { num: 16, title: 'Connect React with an AI Backend', section: 'Full-Stack MERN' },
    { num: 17, title: 'Production Considerations & Security', section: 'Best Practices' },
    { num: 18, title: 'Day 2 Practical Challenge: AI Assistant', section: 'Capstone Lab' },
  ];

  // DOM Elements
  const slides = document.querySelectorAll('.slide');
  const slideCounter = document.getElementById('slideCounter');
  const progressBar = document.getElementById('progressBar');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const tocBtn = document.getElementById('tocBtn');
  const helpBtn = document.getElementById('helpBtn');
  const tocModal = document.getElementById('tocModal');
  const helpModal = document.getElementById('helpModal');
  const solutionModal = document.getElementById('solutionModal');
  const tocGrid = document.getElementById('tocGrid');
  const toast = document.getElementById('toast');

  // --- Slide Navigation Core ---
  function goToSlide(slideNum) {
    if (slideNum < 1 || slideNum > TOTAL_SLIDES) return;

    slides.forEach((slide) => {
      const idx = parseInt(slide.dataset.slide, 10);
      slide.classList.remove('active', 'prev');
      if (idx === slideNum) {
        slide.classList.add('active');
        slide.scrollTop = 0;
      } else if (idx < slideNum) {
        slide.classList.add('prev');
      }
    });

    currentSlide = slideNum;
    updateUI();
  }

  function nextSlide() {
    if (currentSlide < TOTAL_SLIDES) {
      goToSlide(currentSlide + 1);
    }
  }

  function prevSlide() {
    if (currentSlide > 1) {
      goToSlide(currentSlide - 1);
    }
  }

  function updateUI() {
    // Update Counter
    if (slideCounter) {
      slideCounter.textContent = `Slide ${currentSlide} / ${TOTAL_SLIDES}`;
    }

    // Update Progress Bar
    if (progressBar) {
      const pct = ((currentSlide - 1) / (TOTAL_SLIDES - 1)) * 100;
      progressBar.style.width = `${pct}%`;
    }

    // Update Button Disabled States
    if (prevBtn) prevBtn.disabled = currentSlide === 1;
    if (nextBtn) nextBtn.disabled = currentSlide === TOTAL_SLIDES;

    // Update Hash in URL
    history.replaceState(null, null, `#slide-${currentSlide}`);

    // Update TOC active state
    if (tocGrid) {
      const items = tocGrid.querySelectorAll('.toc-item');
      items.forEach((item, idx) => {
        if (idx + 1 === currentSlide) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  }

  // --- Toast Notification ---
  let toastTimer = null;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  }

  // --- Copy Code Snippets ---
  function setupCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const container = btn.closest('.code-container');
        if (!container) return;
        const codeBlock = container.querySelector('pre.code-block');
        if (!codeBlock) return;

        const textToCopy = codeBlock.innerText;
        try {
          await navigator.clipboard.writeText(textToCopy);
          const originalHTML = btn.innerHTML;
          btn.classList.add('copied');
          btn.innerHTML = '✓ Copied!';
          showToast('Code copied to clipboard!');
          setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = originalHTML;
          }, 2000);
        } catch (err) {
          // Fallback
          const textarea = document.createElement('textarea');
          textarea.value = textToCopy;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          showToast('Code copied to clipboard!');
        }
      });
    });
  }

  // --- Dynamic Table of Contents Generation ---
  function buildTOC() {
    if (!tocGrid) return;
    tocGrid.innerHTML = '';
    SLIDE_DATA.forEach((s) => {
      const item = document.createElement('div');
      item.className = `toc-item ${s.num === currentSlide ? 'active' : ''}`;
      item.innerHTML = `
        <div class="toc-item-num">${s.num}</div>
        <div>
          <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--primary); font-weight: 700;">${s.section}</div>
          <div class="toc-item-title">${s.title}</div>
        </div>
      `;
      item.addEventListener('click', () => {
        goToSlide(s.num);
        closeModals();
      });
      tocGrid.appendChild(item);
    });
  }

  // --- Modal Management ---
  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('open');
  }

  function closeModals() {
    [tocModal, helpModal, solutionModal].forEach((m) => {
      if (m) m.classList.remove('open');
    });
  }

  // --- Interactive Sandbox 1: Zod Schema Validation Simulator (Slide 6) ---
  function setupZodSandbox() {
    const jsonInput = document.getElementById('zodJsonInput');
    const templateSelect = document.getElementById('zodTemplateSelect');
    const validateBtn = document.getElementById('zodValidateBtn');
    const outputBox = document.getElementById('zodOutputBox');

    if (!jsonInput || !validateBtn || !outputBox) return;

    const TEMPLATES = {
      valid: JSON.stringify({
        fullName: "Sarah Connor",
        email: "sarah.connor@cyberdyne.org",
        graduationYear: 2024,
        skills: ["Node.js", "Express", "MongoDB", "TypeScript"]
      }, null, 2),
      invalid_email: JSON.stringify({
        fullName: "Kyle Reese",
        email: "not-a-valid-email",
        graduationYear: 2023,
        skills: ["JavaScript", "Security"]
      }, null, 2),
      missing_skills: JSON.stringify({
        fullName: "John Connor",
        email: "john@techcom.mil",
        graduationYear: 2026,
        skills: []
      }, null, 2),
      invalid_types: JSON.stringify({
        fullName: 42,
        email: "john@techcom.mil",
        graduationYear: "Senior",
        skills: "Just Node.js"
      }, null, 2)
    };

    if (templateSelect) {
      templateSelect.addEventListener('change', () => {
        const key = templateSelect.value;
        if (TEMPLATES[key]) {
          jsonInput.value = TEMPLATES[key];
        }
      });
    }

    validateBtn.addEventListener('click', () => {
      outputBox.innerHTML = '';
      const rawText = jsonInput.value.trim();

      // Step 1: JSON syntax check
      let parsed;
      try {
        parsed = JSON.parse(rawText);
      } catch (err) {
        outputBox.innerHTML = `
          <div style="color: #ef4444; font-weight: bold; margin-bottom: 6px;">❌ JSON Syntax Error:</div>
          <div style="color: #cbd5e1;">${err.message}</div>
          <div style="margin-top: 8px; color: #94a3b8; font-size: 11px;">Fix JSON syntax before running schema validation.</div>
        `;
        return;
      }

      // Step 2: Simulated Zod safeParse logic
      const errors = [];

      // Check fullName
      if (typeof parsed.fullName !== 'string') {
        errors.push({ path: 'fullName', message: 'Expected string, received ' + typeof parsed.fullName });
      } else if (parsed.fullName.length < 2) {
        errors.push({ path: 'fullName', message: 'String must contain at least 2 character(s)' });
      }

      // Check email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (typeof parsed.email !== 'string') {
        errors.push({ path: 'email', message: 'Expected string, received ' + typeof parsed.email });
      } else if (!emailRegex.test(parsed.email)) {
        errors.push({ path: 'email', message: 'Invalid email address' });
      }

      // Check graduationYear
      if (typeof parsed.graduationYear !== 'number') {
        errors.push({ path: 'graduationYear', message: 'Expected number, received ' + typeof parsed.graduationYear });
      } else if (parsed.graduationYear < 2000 || parsed.graduationYear > 2035) {
        errors.push({ path: 'graduationYear', message: 'Graduation year must be between 2000 and 2035' });
      }

      // Check skills
      if (!Array.isArray(parsed.skills)) {
        errors.push({ path: 'skills', message: 'Expected array, received ' + typeof parsed.skills });
      } else if (parsed.skills.length === 0) {
        errors.push({ path: 'skills', message: 'Array must contain at least 1 skill' });
      }

      // Render Results
      if (errors.length === 0) {
        outputBox.innerHTML = `
          <div style="color: #4ade80; font-weight: bold; margin-bottom: 6px;">✓ schema.safeParse() => SUCCESS (Valid Data)</div>
          <div style="color: #e2e8f0; font-size: 11px; margin-bottom: 6px;">Validated Object:</div>
          <div style="color: #38bdf8;">${JSON.stringify(parsed, null, 2)}</div>
          <div style="margin-top: 8px; color: #10b981; font-size: 11px;">Safe to persist to MongoDB or send to client!</div>
        `;
      } else {
        const errorList = errors.map(e => `• <span style="color: #f472b6;">[${e.path}]</span>: ${e.message}`).join('<br>');
        outputBox.innerHTML = `
          <div style="color: #f87171; font-weight: bold; margin-bottom: 6px;">⚠️ schema.safeParse() => FAILED (${errors.length} validation issues)</div>
          <div style="color: #cbd5e1; line-height: 1.6; font-size: 11.5px;">${errorList}</div>
          <div style="margin-top: 8px; color: #fb923c; font-size: 11px;">Backend caught error gracefully without crashing! Returned 400 Bad Request.</div>
        `;
      }
    });
  }

  // --- Interactive Sandbox 2: Tool Calling Simulation (Slide 10) ---
  function setupToolCallingSandbox() {
    const promptInput = document.getElementById('toolQueryInput');
    const runBtn = document.getElementById('runToolSimBtn');
    const logBox = document.getElementById('toolSimOutput');

    if (!promptInput || !runBtn || !logBox) return;

    runBtn.addEventListener('click', () => {
      const query = promptInput.value.trim();
      if (!query) {
        showToast('Please enter a calculation query.');
        return;
      }

      logBox.innerHTML = `<div style="color: #38bdf8;">[1/4] User sends prompt: "${query}"</div>`;

      setTimeout(() => {
        // Parse math intent
        let numA = null;
        let numB = null;
        let op = null;

        const addMatch = query.match(/(\d+)\s*(?:\+|\band\b|plus|add)\s*(\d+)/i);
        const subMatch = query.match(/(\d+)\s*(?:-|\bminus\b|subtract)\s*(\d+)/i);
        const mulMatch = query.match(/(\d+)\s*(?:\*|x|\btimes\b|multiply)\s*(\d+)/i);
        const divMatch = query.match(/(\d+)\s*(?:\/|\bdivide(?:d\s+by)?\b)\s*(\d+)/i);

        if (addMatch) {
          numA = parseFloat(addMatch[1]);
          numB = parseFloat(addMatch[2]);
          op = 'add';
        } else if (subMatch) {
          numA = parseFloat(subMatch[1]);
          numB = parseFloat(subMatch[2]);
          op = 'subtract';
        } else if (mulMatch) {
          numA = parseFloat(mulMatch[1]);
          numB = parseFloat(mulMatch[2]);
          op = 'multiply';
        } else if (divMatch) {
          numA = parseFloat(divMatch[1]);
          numB = parseFloat(divMatch[2]);
          op = 'divide';
        } else {
          // Default fallback numbers if arbitrary
          numA = 48;
          numB = 12;
          op = 'multiply';
        }

        const toolCallId = 'call_' + Math.random().toString(36).substring(2, 9);
        const toolArgs = JSON.stringify({ a: numA, b: numB, operation: op });

        logBox.innerHTML += `
          <div style="color: #facc15; margin-top: 6px;">[2/4] LLM Decides to call tool: <code>calculate</code></div>
          <div style="color: #cbd5e1; font-size: 11px; margin-left: 14px;">Tool Call ID: ${toolCallId}</div>
          <div style="color: #cbd5e1; font-size: 11px; margin-left: 14px;">Generated Args: ${toolArgs}</div>
        `;

        setTimeout(() => {
          let mathResult = 0;
          if (op === 'add') mathResult = numA + numB;
          else if (op === 'subtract') mathResult = numA - numB;
          else if (op === 'multiply') mathResult = numA * numB;
          else if (op === 'divide') mathResult = numB !== 0 ? numA / numB : 'Error: Division by zero';

          logBox.innerHTML += `
            <div style="color: #4ade80; margin-top: 6px;">[3/4] Node.js Backend executes <code>calculate(${numA}, ${numB}, "${op}")</code></div>
            <div style="color: #cbd5e1; font-size: 11px; margin-left: 14px;">Function return value: <strong>${mathResult}</strong></div>
            <div style="color: #cbd5e1; font-size: 11px; margin-left: 14px;">Appended message with <code>role: "tool"</code> sent back to LLM</div>
          `;

          setTimeout(() => {
            logBox.innerHTML += `
              <div style="color: #38bdf8; margin-top: 6px;">[4/4] LLM synthesizes natural language response:</div>
              <div style="background: rgba(56, 189, 248, 0.1); border-left: 3px solid #38bdf8; padding: 6px 10px; margin-top: 4px; border-radius: 4px; color: #ffffff;">
                "The result of calculating ${numA} ${op} ${numB} is <strong>${mathResult}</strong>."
              </div>
            `;
            logBox.scrollTop = logBox.scrollHeight;
          }, 450);
        }, 450);
      }, 450);
    });
  }

  // --- Interactive Sandbox 3: Simple Keyword RAG Search Simulator (Slide 14) ---
  function setupRAGSandbox() {
    const searchInput = document.getElementById('ragSearchInput');
    const searchBtn = document.getElementById('runRagSearchBtn');
    const resultsBox = document.getElementById('ragResultsOutput');

    if (!searchInput || !searchBtn || !resultsBox) return;

    const MOCK_DOCUMENTS = [
      {
        id: "DOC-01",
        title: "Course Attendance Policy",
        content: "Students are strictly required to maintain a minimum of 75% attendance in all lectures and practical lab sessions to be eligible for final semester examinations.",
        keywords: ["attendance", "presence", "absence", "leave", "75%", "minimum", "lectures", "eligibility"]
      },
      {
        id: "DOC-02",
        title: "Grading Criteria & Weightage",
        content: "Final grades consist of: 40% Continuous Internal Assessment (assignments, weekly lab challenges, quizzes) and 60% Final Practical Capstone Project.",
        keywords: ["grade", "grading", "marks", "weightage", "assessment", "internal", "capstone", "exam", "percentage", "40%", "60%"]
      },
      {
        id: "DOC-03",
        title: "Late Submission Guidelines",
        content: "Late assignment submissions incur a deduction of 10% per calendar day. Submissions delayed by more than 3 calendar days will receive a score of zero unless supported by an official medical certificate.",
        keywords: ["late", "submission", "deadline", "penalty", "delay", "deduction", "10%", "zero", "medical"]
      },
      {
        id: "DOC-04",
        title: "Academic Integrity & Plagiarism",
        content: "Direct copy-pasting of AI-generated code without architectural comprehension or attribution is considered academic dishonesty and will result in project disqualification.",
        keywords: ["integrity", "plagiarism", "cheat", "cheating", "copy", "honesty", "disqualification", "ai-generated"]
      }
    ];

    searchBtn.addEventListener('click', () => {
      const query = searchInput.value.trim().toLowerCase();
      if (!query) {
        showToast('Please enter a query to retrieve knowledge.');
        return;
      }

      const queryWords = query.split(/\s+/).filter(w => w.length > 2);
      
      const scoredDocs = MOCK_DOCUMENTS.map(doc => {
        let score = 0;
        const matched = [];
        queryWords.forEach(word => {
          if (doc.title.toLowerCase().includes(word)) {
            score += 3;
            matched.push(word);
          }
          if (doc.content.toLowerCase().includes(word)) {
            score += 2;
            matched.push(word);
          }
          if (doc.keywords.some(k => k.toLowerCase().includes(word))) {
            score += 2;
            matched.push(word);
          }
        });
        return { ...doc, score, matched: [...new Set(matched)] };
      });

      scoredDocs.sort((a, b) => b.score - a.score);
      const topHits = scoredDocs.filter(d => d.score > 0);

      if (topHits.length === 0) {
        resultsBox.innerHTML = `
          <div style="color: #fb923c; font-weight: bold;">⚠️ No matching knowledge chunks found (Score 0)</div>
          <div style="color: #94a3b8; font-size: 11px; margin-top: 4px;">
            The RAG pipeline will fall back to telling the user: "I do not have information on that in the official handbook."
          </div>
        `;
        return;
      }

      resultsBox.innerHTML = `
        <div style="color: #4ade80; font-weight: bold; margin-bottom: 8px;">
          ✓ Retrieved ${topHits.length} relevant document chunk(s) from knowledge base:
        </div>
      `;

      topHits.forEach((hit, i) => {
        resultsBox.innerHTML += `
          <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid #1e293b; border-left: 3px solid ${i === 0 ? '#38bdf8' : '#64748b'}; padding: 8px 12px; border-radius: 6px; margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
              <span style="color: #38bdf8; font-weight: bold;">${hit.id} • ${hit.title}</span>
              <span style="color: #facc15; font-weight: bold;">Relevance Score: ${hit.score}</span>
            </div>
            <div style="color: #e2e8f0; font-size: 11.5px; line-height: 1.45;">"${hit.content}"</div>
            <div style="color: #94a3b8; font-size: 10px; margin-top: 4px;">Matched terms: ${hit.matched.join(', ')}</div>
          </div>
        `;
      });

      resultsBox.innerHTML += `
        <div style="margin-top: 8px; color: #a78bfa; font-size: 11px;">
          Next step in Express: Inject top chunk into system prompt: <code>"Context: " + retrieved[0].content</code>
        </div>
      `;
    });
  }

  // --- Interactive Sandbox 4: Full AI Assistant Preview (Slide 16 / Slide 18) ---
  function setupAssistantSandbox() {
    const chatInput = document.getElementById('assistantChatInput');
    const sendBtn = document.getElementById('assistantSendBtn');
    const chatBody = document.getElementById('assistantChatBody');
    const chipBtns = document.querySelectorAll('.prompt-chip');

    if (!chatInput || !sendBtn || !chatBody) return;

    function appendMessage(role, text, badge = null) {
      const msgDiv = document.createElement('div');
      msgDiv.style.marginBottom = '10px';
      msgDiv.style.display = 'flex';
      msgDiv.style.flexDirection = 'column';
      msgDiv.style.alignItems = role === 'user' ? 'flex-end' : 'flex-start';

      const bubble = document.createElement('div');
      bubble.style.padding = '8px 14px';
      bubble.style.borderRadius = '8px';
      bubble.style.maxWidth = '85%';
      bubble.style.fontSize = '12.5px';
      bubble.style.lineHeight = '1.45';

      if (role === 'user') {
        bubble.style.background = '#0284c7';
        bubble.style.color = '#ffffff';
        bubble.textContent = text;
      } else {
        bubble.style.background = '#1e293b';
        bubble.style.color = '#e2e8f0';
        bubble.style.border = '1px solid #334155';
        
        let badgeHTML = '';
        if (badge) {
          badgeHTML = `<div style="font-size: 10px; font-weight: 700; color: #38bdf8; margin-bottom: 4px; text-transform: uppercase;">⚡ ${badge}</div>`;
        }
        bubble.innerHTML = badgeHTML + text;
      }

      msgDiv.appendChild(bubble);
      chatBody.appendChild(msgDiv);
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    function processAssistantMessage(userText) {
      appendMessage('user', userText);
      chatInput.value = '';

      // Simulated typing indicator
      const typingDiv = document.createElement('div');
      typingDiv.id = 'typingIndicator';
      typingDiv.style.color = '#94a3b8';
      typingDiv.style.fontSize = '11px';
      typingDiv.style.fontStyle = 'italic';
      typingDiv.style.padding = '4px 8px';
      typingDiv.textContent = 'Assistant is thinking & routing...';
      chatBody.appendChild(typingDiv);
      chatBody.scrollTop = chatBody.scrollHeight;

      setTimeout(() => {
        const ind = document.getElementById('typingIndicator');
        if (ind) ind.remove();

        const lower = userText.toLowerCase();

        // Check Math / Tool Calling
        if (lower.includes('multiply') || lower.includes('*') || lower.includes('add') || lower.includes('divide') || lower.includes('calculate')) {
          appendMessage('assistant', 'I used the <strong>calculate</strong> tool to evaluate this mathematical expression for you. Result: <strong>360</strong>.', 'Tool Call: calculate()');
        }
        // Check RAG Handbook
        else if (lower.includes('attendance') || lower.includes('grade') || lower.includes('policy') || lower.includes('late')) {
          appendMessage('assistant', 'According to Section 3.2 of the Official Course Handbook: <em>"Students are strictly required to maintain a minimum of 75% attendance in all lectures and practical lab sessions."</em>', 'RAG Grounded: DOC-01');
        }
        // Check Resume Extraction
        else if (lower.includes('resume') || lower.includes('extract') || lower.includes('@') || lower.includes('john')) {
          const mockStructured = {
            fullName: "John Doe",
            email: "john@example.com",
            graduationYear: 2025,
            skills: ["Node.js", "Express", "React", "MongoDB"]
          };
          appendMessage('assistant', `<pre style="font-family: monospace; font-size: 11px; color: #38bdf8;">${JSON.stringify(mockStructured, null, 2)}</pre>`, 'Structured Output: Zod Validated');
        }
        // General conversational
        else {
          appendMessage('assistant', `I received your query: "${userText}". As an AI MERN Assistant, I can perform mathematical calculations, search the course handbook using RAG, and extract structured JSON data. Try one of the quick chips above!`, 'General Assistant');
        }
      }, 600);
    }

    sendBtn.addEventListener('click', () => {
      const text = chatInput.value.trim();
      if (text) processAssistantMessage(text);
    });

    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const text = chatInput.value.trim();
        if (text) processAssistantMessage(text);
      }
    });

    chipBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const query = btn.dataset.query || btn.textContent.trim();
        processAssistantMessage(query);
      });
    });
  }

  // --- Keyboard & Event Listeners ---
  function setupEventListeners() {
    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
      // Don't intercept if user is typing inside an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        if (e.key === 'Escape') {
          document.activeElement.blur();
        }
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
          goToSlide(TOTAL_SLIDES);
          break;
        case 't':
        case 'T':
          e.preventDefault();
          if (tocModal) {
            tocModal.classList.contains('open') ? closeModals() : openModal(tocModal);
          }
          break;
        case '?':
          e.preventDefault();
          if (helpModal) {
            helpModal.classList.contains('open') ? closeModals() : openModal(helpModal);
          }
          break;
        case 'Escape':
          closeModals();
          break;
      }
    });

    // Navigation Buttons
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Modal Triggers
    if (tocBtn && tocModal) {
      tocBtn.addEventListener('click', () => openModal(tocModal));
    }
    if (helpBtn && helpModal) {
      helpBtn.addEventListener('click', () => openModal(helpModal));
    }

    // Modal Close Buttons
    document.querySelectorAll('.modal-close-btn').forEach((btn) => {
      btn.addEventListener('click', closeModals);
    });

    // Close Modal on Overlay Click
    [tocModal, helpModal, solutionModal].forEach((modal) => {
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) closeModals();
        });
      }
    });

    // Solution Modal Trigger (Slide 18)
    const openSolutionBtn = document.getElementById('openSolutionBtn');
    if (openSolutionBtn && solutionModal) {
      openSolutionBtn.addEventListener('click', () => openModal(solutionModal));
    }

    // Touch Swipe Navigation for Tablets & Mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const viewport = document.querySelector('.slide-viewport');

    if (viewport) {
      viewport.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      viewport.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });
    }

    function handleSwipe() {
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 50) {
        if (diff < 0) nextSlide();
        else prevSlide();
      }
    }

    // Hash change in URL
    window.addEventListener('hashchange', () => {
      const match = window.location.hash.match(/slide-(\d+)/);
      if (match) {
        const target = parseInt(match[1], 10);
        if (target >= 1 && target <= TOTAL_SLIDES && target !== currentSlide) {
          goToSlide(target);
        }
      }
    });
  }

  // --- Initializer ---
  function init() {
    buildTOC();
    setupCopyButtons();
    setupZodSandbox();
    setupToolCallingSandbox();
    setupRAGSandbox();
    setupAssistantSandbox();
    setupEventListeners();

    // Check initial hash
    const match = window.location.hash.match(/slide-(\d+)/);
    if (match) {
      const target = parseInt(match[1], 10);
      if (target >= 1 && target <= TOTAL_SLIDES) {
        goToSlide(target);
        return;
      }
    }
    goToSlide(1);
  }

  init();
});
