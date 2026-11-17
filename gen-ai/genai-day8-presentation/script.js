/**
 * Node.js GenAI – Day 8: Function Calling / Tool Calling
 * Presentation Engine & Interactive Sandboxes Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Presentation State ---
  const totalSlides = 20;
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

  // Slide Metadata for Table of Contents
  const slideTitles = [
    "Introduction to Function Calling",
    "What Is Function Calling?",
    "Normal LLM vs Function Calling",
    "How Does Function Calling Work?",
    "What Is a Tool?",
    "What Is a Tool Schema?",
    "Understanding JSON Schema for Tools",
    "What Are Tool Arguments?",
    "What Is Zod and Why Do We Need It?",
    "Connecting Tool Schema with Zod",
    "How Does the LLM Select a Tool?",
    "Practical: Sending Tools to Groq",
    "Understanding the Tool Call Response",
    "How to Execute a Tool in Node.js",
    "Tool Result: Sending Data Back to the LLM",
    "Tool Execution: Error Handling",
    "The Complete Tool Calling Cycle",
    "Practical Project: AI Student Assistant",
    "Practical Code: Setup & Tool Definitions (Part 1)",
    "Practical Code: Tool Execution & Express API (Part 2)"
  ];

  // Initialize Navigation & TOC
  function initNavigation() {
    if (slideSelect) {
      slideSelect.innerHTML = '';
      for (let i = 1; i <= totalSlides; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i}. ${slideTitles[i - 1] || 'Slide ' + i}`;
        slideSelect.appendChild(option);
      }
    }

    if (tocList) {
      tocList.innerHTML = '';
      slideTitles.forEach((title, idx) => {
        const li = document.createElement('li');
        li.className = 'toc-item';
        li.dataset.slide = idx + 1;
        li.innerHTML = `
          <span class="toc-num">${idx + 1}</span>
          <span class="toc-label">${title}</span>
        `;
        li.addEventListener('click', () => {
          goToSlide(idx + 1);
          closeTOC();
        });
        tocList.appendChild(li);
      });
    }

    // Check Hash in URL
    const hash = window.location.hash;
    const match = hash.match(/slide-(\d+)/);
    if (match) {
      const parsed = parseInt(match[1], 10);
      if (parsed >= 1 && parsed <= totalSlides) {
        currentSlide = parsed;
      }
    }

    updateSlideView();
  }

  // Go to specific slide
  function goToSlide(slideNum) {
    if (slideNum < 1) slideNum = 1;
    if (slideNum > totalSlides) slideNum = totalSlides;

    currentSlide = slideNum;
    window.location.hash = `slide-${currentSlide}`;
    updateSlideView();
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

  // Update View & Controls
  function updateSlideView() {
    slides.forEach((s, idx) => {
      const slideIndex = idx + 1;
      if (slideIndex === currentSlide) {
        s.classList.add('active');
        s.scrollTop = 0;
      } else {
        s.classList.remove('active');
      }
    });

    if (slideCounter) {
      slideCounter.textContent = `${currentSlide} / ${totalSlides}`;
    }

    if (progressBar) {
      const pct = (currentSlide / totalSlides) * 100;
      progressBar.style.width = `${pct}%`;
    }

    if (prevBtn) prevBtn.disabled = currentSlide === 1;
    if (nextBtn) nextBtn.disabled = currentSlide === totalSlides;

    if (slideSelect) slideSelect.value = currentSlide;

    // Highlight TOC
    if (tocList) {
      const items = tocList.querySelectorAll('.toc-item');
      items.forEach(item => {
        if (parseInt(item.dataset.slide, 10) === currentSlide) {
          item.classList.add('current');
        } else {
          item.classList.remove('current');
        }
      });
    }
  }

  // Fullscreen Handler
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn(`Fullscreen error: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  // TOC Drawer handlers
  function openTOC() {
    if (tocOverlay) tocOverlay.classList.add('active');
  }

  function closeTOC() {
    if (tocOverlay) tocOverlay.classList.remove('active');
  }

  // Help Modal handlers
  function openHelp() {
    if (helpModal) helpModal.classList.add('active');
  }

  function closeHelp() {
    if (helpModal) helpModal.classList.remove('active');
  }

  // Toast Notice
  function showToast(message) {
    if (!toastNotice) return;
    toastNotice.textContent = message;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 2200);
  }

  // Event Listeners for Presentation Controls
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);
  if (tocBtn) tocBtn.addEventListener('click', openTOC);
  if (tocClose) tocClose.addEventListener('click', closeTOC);
  if (helpBtn) helpBtn.addEventListener('click', openHelp);
  if (helpClose) helpClose.addEventListener('click', closeHelp);

  if (slideSelect) {
    slideSelect.addEventListener('change', (e) => {
      goToSlide(parseInt(e.target.value, 10));
    });
  }

  if (tocOverlay) {
    tocOverlay.addEventListener('click', (e) => {
      if (e.target === tocOverlay) closeTOC();
    });
  }

  if (helpModal) {
    helpModal.addEventListener('click', (e) => {
      if (e.target === helpModal) closeHelp();
    });
  }

  // Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    const activeEl = document.activeElement;
    const isEditing = activeEl && (
      activeEl.tagName === 'INPUT' ||
      activeEl.tagName === 'TEXTAREA' ||
      activeEl.isContentEditable ||
      activeEl.tagName === 'SELECT'
    );

    if (e.key === 'Escape') {
      closeTOC();
      closeHelp();
      return;
    }

    if (isEditing) return;

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
        e.preventDefault();
        toggleFullscreen();
        break;
      case 't':
      case 'T':
        e.preventDefault();
        if (tocOverlay && tocOverlay.classList.contains('active')) closeTOC();
        else openTOC();
        break;
      case '?':
        e.preventDefault();
        if (helpModal && helpModal.classList.contains('active')) closeHelp();
        else openHelp();
        break;
    }
  });

  // Touch Swipe
  let touchStartX = 0;
  let touchEndX = 0;

  window.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff < 0) nextSlide();
      else prevSlide();
    }
  }, { passive: true });

  // Copy Code Buttons
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const codePanel = btn.closest('.code-panel');
      if (!codePanel) return;
      const codeBlock = codePanel.querySelector('pre code') || codePanel.querySelector('pre');
      if (!codeBlock) return;

      const codeText = codeBlock.innerText;
      try {
        await navigator.clipboard.writeText(codeText);
        const originalText = btn.innerHTML;
        btn.innerHTML = `✓ Copied!`;
        btn.style.background = 'var(--accent-green)';
        btn.style.color = '#FFFFFF';
        showToast("Code copied to clipboard!");
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = '';
          btn.style.color = '';
        }, 2000);
      } catch (err) {
        const textArea = document.createElement('textarea');
        textArea.value = codeText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast("Code copied to clipboard!");
      }
    });
  });

  // ==========================================================================
  // Interactive Sandboxes for Day 8
  // ==========================================================================

  // --- In-Memory Student Database for Sandboxes ---
  const studentsDB = [
    { id: 101, name: "Arun", course: "MERN Stack", attendance: 85 },
    { id: 102, name: "Rahul", course: "Python", attendance: 72 }
  ];

  function dbGetStudent(id) {
    return studentsDB.find(s => s.id === id) || null;
  }

  function dbGetAttendance(id) {
    const s = dbGetStudent(id);
    if (!s) return { error: "Student not found" };
    return { studentId: id, name: s.name, attendance: s.attendance };
  }

  // --- Sandbox 1: Slide 3 Workflow Comparator ---
  const s3BtnNormal = document.getElementById('s3BtnNormal');
  const s3BtnTool = document.getElementById('s3BtnTool');
  const s3WorkflowDisplay = document.getElementById('s3WorkflowDisplay');

  if (s3BtnNormal && s3BtnTool && s3WorkflowDisplay) {
    s3BtnNormal.addEventListener('click', () => {
      s3BtnNormal.classList.add('active');
      s3BtnTool.classList.remove('active');
      s3WorkflowDisplay.innerHTML = `
        <div class="flow-steps" style="margin-bottom: 10px;">
          <div class="flow-node">User: "What is 25 × 4?"</div>
          <div class="flow-arrow">➔</div>
          <div class="flow-node primary">Groq LLM</div>
          <div class="flow-arrow">➔</div>
          <div class="flow-node success">"The answer is 100."</div>
        </div>
        <p style="font-size: 0.82rem; color: var(--text-main); margin-top: 6px;">
          • The model generates the answer directly from its internal pre-trained weights.<br>
          • No external database lookup or function execution took place.
        </p>
      `;
    });

    s3BtnTool.addEventListener('click', () => {
      s3BtnTool.classList.add('active');
      s3BtnNormal.classList.remove('active');
      s3WorkflowDisplay.innerHTML = `
        <div class="flow-steps" style="margin-bottom: 10px;">
          <div class="flow-node">User: "Attendance of 101?"</div>
          <div class="flow-arrow">➔</div>
          <div class="flow-node primary">LLM requests get_attendance(101)</div>
          <div class="flow-arrow">➔</div>
          <div class="flow-node" style="background:#FEF3C7; border-color:#F59E0B;">Node.js runs function</div>
          <div class="flow-arrow">➔</div>
          <div class="flow-node success">Returns { attendance: 85 }</div>
          <div class="flow-arrow">➔</div>
          <div class="flow-node primary">LLM: "Arun has 85% attendance."</div>
        </div>
        <p style="font-size: 0.82rem; color: var(--text-main); margin-top: 6px;">
          • The LLM <strong>did not guess</strong>. It requested your Node.js function.<br>
          • Node.js queried the database and passed real-time data back to the LLM.
        </p>
      `;
    });
  }

  // --- Sandbox 2: Slide 6 Tool Schema Inspector ---
  const s6TabStudent = document.getElementById('s6TabStudent');
  const s6TabAttendance = document.getElementById('s6TabAttendance');
  const s6SchemaView = document.getElementById('s6SchemaView');

  const s6Schemas = {
    student: {
      type: "function",
      function: {
        name: "get_student",
        description: "Get student details using student ID",
        parameters: {
          type: "object",
          properties: {
            studentId: {
              type: "number",
              description: "The unique student ID"
            }
          },
          required: ["studentId"]
        }
      }
    },
    attendance: {
      type: "function",
      function: {
        name: "get_attendance",
        description: "Get attendance percentage using student ID",
        parameters: {
          type: "object",
          properties: {
            studentId: {
              type: "integer",
              description: "Unique student ID"
            }
          },
          required: ["studentId"]
        }
      }
    }
  };

  if (s6TabStudent && s6TabAttendance && s6SchemaView) {
    s6TabStudent.addEventListener('click', () => {
      s6TabStudent.classList.add('active');
      s6TabAttendance.classList.remove('active');
      s6SchemaView.textContent = JSON.stringify(s6Schemas.student, null, 2);
    });

    s6TabAttendance.addEventListener('click', () => {
      s6TabAttendance.classList.add('active');
      s6TabStudent.classList.remove('active');
      s6SchemaView.textContent = JSON.stringify(s6Schemas.attendance, null, 2);
    });
  }

  // --- Sandbox 3: Slide 9 Zod Validator Simulator ---
  const s9InputVal = document.getElementById('s9InputVal');
  const s9TestBtn = document.getElementById('s9TestBtn');
  const s9Result = document.getElementById('s9Result');

  if (s9TestBtn && s9InputVal && s9Result) {
    s9TestBtn.addEventListener('click', () => {
      const raw = s9InputVal.value.trim();
      let candidate;
      try {
        candidate = JSON.parse(raw);
      } catch (e) {
        candidate = raw;
      }

      // Mimic z.object({ studentId: z.number().int().positive() })
      let passed = false;
      let msg = "";

      if (typeof candidate !== 'object' || candidate === null) {
        msg = "Validation failed: Expected object containing { studentId }";
      } else if (!('studentId' in candidate)) {
        msg = "Validation failed: Missing required property 'studentId'";
      } else if (typeof candidate.studentId !== 'number' || isNaN(candidate.studentId)) {
        msg = `Validation failed: Expected number for 'studentId', received ${typeof candidate.studentId}`;
      } else if (!Number.isInteger(candidate.studentId)) {
        msg = "Validation failed: 'studentId' must be an integer, received float";
      } else if (candidate.studentId <= 0) {
        msg = "Validation failed: 'studentId' must be positive (> 0)";
      } else {
        passed = true;
      }

      if (passed) {
        s9Result.className = 'sandbox-result card-green';
        s9Result.textContent = `// studentSchema.safeParse(${JSON.stringify(candidate)})\n\n{\n  "success": true,\n  "data": {\n    "studentId": ${candidate.studentId}\n  }\n}\n\n✅ Safe to execute database query!`;
      } else {
        s9Result.className = 'sandbox-result card-rose';
        s9Result.textContent = `// studentSchema.safeParse(${JSON.stringify(candidate)})\n\n{\n  "success": false,\n  "error": {\n    "message": "${msg}"\n  }\n}\n\n❌ Blocked execution! Prevents database crashes.`;
      }
    });
  }

  // --- Sandbox 4: Slide 11 Tool Selection Simulator ---
  const s11PromptInput = document.getElementById('s11PromptInput');
  const s11SelectBtn = document.getElementById('s11SelectBtn');
  const s11ChoiceSelect = document.getElementById('s11ChoiceSelect');
  const s11DecisionBox = document.getElementById('s11DecisionBox');
  const s11PresetBtns = document.querySelectorAll('.s11-preset');

  s11PresetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (s11PromptInput) s11PromptInput.value = btn.dataset.prompt;
    });
  });

  if (s11SelectBtn && s11PromptInput && s11DecisionBox) {
    s11SelectBtn.addEventListener('click', () => {
      const q = s11PromptInput.value.toLowerCase();
      const choiceMode = s11ChoiceSelect ? s11ChoiceSelect.value : "auto";

      let decision = "";
      let toolName = "none";
      let args = {};

      if (choiceMode === "none") {
        decision = "Tool Choice is forced to 'none'. Model will generate text directly without calling tools.";
      } else if (/attendance/i.test(q)) {
        toolName = "get_attendance";
        const idMatch = q.match(/\b(10[12])\b/);
        args = { studentId: idMatch ? parseInt(idMatch[1], 10) : 101 };
        decision = `LLM inspected description: 'Get attendance percentage using student ID'. Selected tool: ${toolName}.`;
      } else if (/who is|student|details|course/i.test(q)) {
        toolName = "get_student";
        const idMatch = q.match(/\b(10[12])\b/);
        args = { studentId: idMatch ? parseInt(idMatch[1], 10) : 101 };
        decision = `LLM inspected description: 'Get student details using student ID'. Selected tool: ${toolName}.`;
      } else {
        if (choiceMode === "required") {
          toolName = "get_student";
          args = { studentId: 101 };
          decision = "tool_choice: 'required' forces tool use even for general queries.";
        } else {
          decision = "General conversational query. Model determines no available tool is needed.";
        }
      }

      s11DecisionBox.textContent = `Model Tool Decision Analysis:\n• tool_choice mode: "${choiceMode}"\n• Selected Tool: "${toolName}"\n• Inferred Arguments: ${JSON.stringify(args)}\n• Reasoning: ${decision}`;
    });
  }

  // --- Sandbox 5: Slide 14 Tool Execution Simulator ---
  const s14ToolSelect = document.getElementById('s14ToolSelect');
  const s14StudentIdSelect = document.getElementById('s14StudentIdSelect');
  const s14ExecBtn = document.getElementById('s14ExecBtn');
  const s14ExecResult = document.getElementById('s14ExecResult');

  if (s14ExecBtn && s14ToolSelect && s14StudentIdSelect && s14ExecResult) {
    s14ExecBtn.addEventListener('click', () => {
      const toolName = s14ToolSelect.value;
      const id = parseInt(s14StudentIdSelect.value, 10);

      const availableTools = {
        get_student: dbGetStudent,
        get_attendance: dbGetAttendance
      };

      const fn = availableTools[toolName];
      if (!fn) {
        s14ExecResult.textContent = `Error: Unknown tool "${toolName}"`;
        return;
      }

      const res = fn(id);
      s14ExecResult.textContent = `// JavaScript Execution in Node.js:\nconst result = availableTools["${toolName}"](${id});\n\nResult:\n${JSON.stringify(res, null, 2)}`;
    });
  }

  // --- Sandbox 6: Slide 16 Safe Execution Tester ---
  const s16ScenarioSelect = document.getElementById('s16ScenarioSelect');
  const s16TestBtn = document.getElementById('s16TestBtn');
  const s16ResultBox = document.getElementById('s16ResultBox');

  if (s16TestBtn && s16ScenarioSelect && s16ResultBox) {
    s16TestBtn.addEventListener('click', () => {
      const scenario = s16ScenarioSelect.value;
      let output = "";

      switch (scenario) {
        case "valid":
          output = JSON.stringify({
            status: "SUCCESS",
            result: dbGetStudent(101)
          }, null, 2);
          s16ResultBox.className = 'sandbox-result card-green';
          break;
        case "unknown_tool":
          output = JSON.stringify({
            error: true,
            message: "Unknown tool 'delete_database'"
          }, null, 2);
          s16ResultBox.className = 'sandbox-result card-rose';
          break;
        case "invalid_arg":
          output = JSON.stringify({
            error: true,
            message: "Invalid tool arguments: Expected integer, received 'hello'"
          }, null, 2);
          s16ResultBox.className = 'sandbox-result card-rose';
          break;
        case "not_found":
          output = JSON.stringify({
            status: "TOOL_RETURNED_NULL",
            result: null,
            note: "Student ID 999 does not exist in records"
          }, null, 2);
          s16ResultBox.className = 'sandbox-result card-amber';
          break;
      }

      s16ResultBox.textContent = `// Safe Execution Output:\n${output}`;
    });
  }

  // --- Sandbox 7: Slide 20 AI Student Assistant Interactive Chat Simulator ---
  const s20InputQuery = document.getElementById('s20InputQuery');
  const s20ChatBtn = document.getElementById('s20ChatBtn');
  const s20PresetBtns = document.querySelectorAll('.s20-preset');
  const s20ChatLog = document.getElementById('s20ChatLog');

  s20PresetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (s20InputQuery) s20InputQuery.value = btn.dataset.query;
    });
  });

  if (s20ChatBtn && s20InputQuery && s20ChatLog) {
    s20ChatBtn.addEventListener('click', () => {
      const query = s20InputQuery.value.trim();
      if (!query) return;

      s20ChatLog.innerHTML = `<div style="color: #60A5FA;">[1/4] Sending question to Groq LLM (openai/gpt-oss-120b) with tools...</div>`;

      setTimeout(() => {
        let toolNeeded = null;
        let inferredId = 101;
        if (/102/.test(query)) inferredId = 102;

        if (/attendance/i.test(query)) {
          toolNeeded = { name: "get_attendance", args: { studentId: inferredId } };
        } else if (/who is|student|course|mern|python/i.test(query)) {
          toolNeeded = { name: "get_student", args: { studentId: inferredId } };
        }

        if (!toolNeeded) {
          s20ChatLog.innerHTML = `
            <div style="color: #94A3B8;">[1/2] Model evaluated question. No tool needed.</div>
            <div style="color: #34D399; margin-top: 6px;"><strong>Assistant:</strong> I am the AI Student Assistant. You can ask me to look up details or attendance records for student 101 or 102!</div>
          `;
          return;
        }

        // Tool selected
        let toolData = null;
        if (toolNeeded.name === "get_student") {
          toolData = dbGetStudent(toolNeeded.args.studentId);
        } else {
          toolData = dbGetAttendance(toolNeeded.args.studentId);
        }

        let finalAnswer = "";
        if (toolNeeded.name === "get_student") {
          finalAnswer = `Student ${toolData.id} is ${toolData.name}. They are enrolled in the ${toolData.course} course.`;
        } else {
          finalAnswer = `${toolData.name}'s attendance is ${toolData.attendance}%. ${toolData.attendance >= 75 ? 'Their attendance meets the 75% requirement.' : 'Their attendance is below 75%.'}`;
        }

        s20ChatLog.innerHTML = `
          <div style="color: #38BDF8;">[1/4] <strong>Groq LLM Request:</strong> tool_calls: [{ name: "${toolNeeded.name}", arguments: '${JSON.stringify(toolNeeded.args)}' }]</div>
          <div style="color: #FBBF24; margin-top: 4px;">[2/4] <strong>Node.js Validation:</strong> Zod safeParse passed! Running ${toolNeeded.name}(${toolNeeded.args.studentId})...</div>
          <div style="color: #A78BFA; margin-top: 4px;">[3/4] <strong>Tool Result:</strong> ${JSON.stringify(toolData)} returned with role: "tool"</div>
          <div style="color: #34D399; margin-top: 8px; padding-top: 8px; border-top: 1px solid #334155;">
            <strong>[4/4] Final Synthesized Answer:</strong><br>
            "${finalAnswer}"
          </div>
        `;
      }, 600);
    });
  }

  // Initial Run
  initNavigation();
});
