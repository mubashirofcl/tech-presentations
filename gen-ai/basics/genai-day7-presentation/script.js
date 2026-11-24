/**
 * Node.js GenAI – Day 7: Structured Output, Zod Validation & Function Calling
 * Interactive Presentation Engine & Sandboxes Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Presentation State ---
  const totalSlides = 23;
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
    "Title: Structured Output, Zod & Function Calling",
    "The Problem with Unstructured LLM Text",
    "JSON & Serialization in Node.js",
    "Generating JSON from an LLM",
    "What Is JSON Schema?",
    "What Is Zod & Why Do We Need It?",
    "Defining Rich Zod Schemas",
    "Zod parse() vs safeParse()",
    "Handling Validation Errors",
    "Practical: Validating AI Structured Output",
    "From Structured Output to Function Calling",
    "How Function Calling Works (The 5 Steps)",
    "Defining Tool Schemas for Groq",
    "Tool Selection & tool_choice",
    "Inspecting the Tool Call Response",
    "Validating Tool Arguments with Zod",
    "Tool Execution via Tool Registry Map",
    "Sending Tool Results Back to the LLM",
    "Error Handling in Tool Calling",
    "The Complete Combined Architecture",
    "Capstone Project: Setup & Schemas (Part 1)",
    "Capstone Project: Execution & API (Part 2)",
    "Key Takeaways & Production Checklist"
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

  function openTOC() {
    if (tocOverlay) tocOverlay.classList.add('active');
  }

  function closeTOC() {
    if (tocOverlay) tocOverlay.classList.remove('active');
  }

  function openHelp() {
    if (helpModal) helpModal.classList.add('active');
  }

  function closeHelp() {
    if (helpModal) helpModal.classList.remove('active');
  }

  function showToast(message) {
    if (!toastNotice) return;
    toastNotice.textContent = message;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 2200);
  }

  // Event Listeners for Controls
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

  // Keyboard Navigation
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
  // Interactive Sandboxes for Combined Day 7
  // ==========================================================================

  // In-Memory Database
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

  // --- Sandbox 1: Slide 2 Format Comparator ---
  const s2Btns = document.querySelectorAll('.s2-format-btn');
  const s2Display = document.getElementById('s2Display');
  const s2Eval = document.getElementById('s2Eval');

  const s2Formats = {
    paragraph: {
      text: "The student's name is Rahul. He is 22 years old and learning MERN Stack. His email is rahul@gmail.com.",
      eval: "❌ student.name => undefined\n❌ student.age => undefined\nResult is unstructured prose. Requires fragile regex to parse."
    },
    csv: {
      text: "Rahul, 22, MERN Stack, rahul@gmail.com",
      eval: "⚠️ parts[0] => 'Rahul', parts[1] => '22'\nBreaks if user input contains commas or missing optional fields."
    },
    json: {
      text: '{\n  "name": "Rahul",\n  "age": 22,\n  "course": "MERN Stack",\n  "email": "rahul@gmail.com"\n}',
      eval: "✅ student.name  => 'Rahul'\n✅ student.age   => 22\n✅ student.email => 'rahul@gmail.com'\nClean, typed, predictable, and directly usable by Node.js!"
    }
  };

  s2Btns.forEach(btn => {
    btn.addEventListener('click', () => {
      s2Btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = s2Formats[btn.dataset.format];
      if (target && s2Display && s2Eval) {
        s2Display.textContent = target.text;
        s2Eval.textContent = target.eval;
      }
    });
  });

  // --- Sandbox 2: Slide 3 JSON Rules Tester ---
  const s3Input = document.getElementById('s3Input');
  const s3BtnValidate = document.getElementById('s3BtnValidate');
  const s3Result = document.getElementById('s3Result');
  const s3PresetSelect = document.getElementById('s3PresetSelect');

  const s3Presets = {
    valid: '{\n  "name": "Rahul",\n  "age": 22,\n  "course": "MERN Stack"\n}',
    singleQuotes: "{\n  'name': 'Rahul',\n  'age': 22\n}",
    trailingComma: '{\n  "name": "Rahul",\n  "age": 22,\n}',
    comments: '{\n  // Student data\n  "name": "Rahul",\n  "age": 22\n}'
  };

  if (s3PresetSelect && s3Input) {
    s3PresetSelect.addEventListener('change', () => {
      const val = s3PresetSelect.value;
      if (s3Presets[val]) {
        s3Input.value = s3Presets[val];
        testJsonS3();
      }
    });
  }

  function testJsonS3() {
    if (!s3Input || !s3Result) return;
    const raw = s3Input.value.trim();
    try {
      const parsed = JSON.parse(raw);
      s3Result.className = 'sandbox-result card-green';
      s3Result.textContent = `✅ VALID JSON!\nType: ${typeof parsed}\nKey Count: ${Object.keys(parsed).length}\n\nFormatted:\n${JSON.stringify(parsed, null, 2)}`;
    } catch (err) {
      s3Result.className = 'sandbox-result card-rose';
      let hint = "";
      if (raw.includes("'")) hint += "• Hint: JSON strings and keys MUST use double quotes (\").\n";
      if (/,\s*[}\]]/.test(raw)) hint += "• Hint: Trailing commas are strictly prohibited in JSON.\n";
      if (/\/\/|\/\*/.test(raw)) hint += "• Hint: JSON does not permit comments.\n";
      s3Result.textContent = `❌ SyntaxError in JSON.parse():\n${err.message}\n\n${hint}`;
    }
  }

  if (s3BtnValidate) s3BtnValidate.addEventListener('click', testJsonS3);

  // --- Sandbox 3: Slide 8 parse() vs safeParse() ---
  const s8InputName = document.getElementById('s8InputName');
  const s8InputAge = document.getElementById('s8InputAge');
  const s8BtnParse = document.getElementById('s8BtnParse');
  const s8BtnSafe = document.getElementById('s8BtnSafe');
  const s8Result = document.getElementById('s8Result');

  if (s8BtnParse && s8Result) {
    s8BtnParse.addEventListener('click', () => {
      const name = s8InputName ? s8InputName.value : "";
      const rawAge = s8InputAge ? s8InputAge.value : "";
      const age = isNaN(Number(rawAge)) || rawAge.trim() === "" ? rawAge : Number(rawAge);

      if (typeof age !== 'number' || typeof name !== 'string' || name.length < 2) {
        s8Result.className = 'sandbox-result card-rose';
        s8Result.textContent = `💥 ZodError thrown! Uncaught exception would crash your Node.js process unless caught in try/catch:\n\nZodError: [\n  { "path": ["age"], "message": "Expected number, received ${typeof age}" }\n]`;
      } else {
        s8Result.className = 'sandbox-result card-green';
        s8Result.textContent = `✅ studentSchema.parse() succeeded!\nReturns validated object:\n${JSON.stringify({ name, age }, null, 2)}`;
      }
    });
  }

  if (s8BtnSafe && s8Result) {
    s8BtnSafe.addEventListener('click', () => {
      const name = s8InputName ? s8InputName.value : "";
      const rawAge = s8InputAge ? s8InputAge.value : "";
      const age = isNaN(Number(rawAge)) || rawAge.trim() === "" ? rawAge : Number(rawAge);

      if (typeof age !== 'number' || typeof name !== 'string' || name.length < 2) {
        s8Result.className = 'sandbox-result card-amber';
        s8Result.textContent = `🛡️ safeParse() handled gracefully (NO exception thrown!):\n{\n  "success": false,\n  "error": {\n    "issues": [\n      { "path": ["age"], "message": "Expected number, received ${typeof age}" }\n    ]\n  }\n}\n\nCan directly return HTTP 400 with result.error.issues!`;
      } else {
        s8Result.className = 'sandbox-result card-green';
        s8Result.textContent = `✅ safeParse() succeeded!\n{\n  "success": true,\n  "data": ${JSON.stringify({ name, age }, null, 2)}\n}`;
      }
    });
  }

  // --- Sandbox 4: Slide 11 Normal LLM vs Function Calling ---
  const s11BtnMath = document.getElementById('s11BtnMath');
  const s11BtnStudent = document.getElementById('s11BtnStudent');
  const s11Display = document.getElementById('s11Display');

  if (s11BtnMath && s11BtnStudent && s11Display) {
    s11BtnMath.addEventListener('click', () => {
      s11BtnMath.classList.add('active');
      s11BtnStudent.classList.remove('active');
      s11Display.innerHTML = `
        <div class="flow-steps">
          <div class="flow-node">User: "What is 25 × 4?"</div>
          <div class="flow-arrow">➔</div>
          <div class="flow-node primary">Groq LLM</div>
          <div class="flow-arrow">➔</div>
          <div class="flow-node success">"The answer is 100."</div>
        </div>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 6px;">
          • The model generates text directly from internal training weights. No backend code executed.
        </p>
      `;
    });

    s11BtnStudent.addEventListener('click', () => {
      s11BtnStudent.classList.add('active');
      s11BtnMath.classList.remove('active');
      s11Display.innerHTML = `
        <div class="flow-steps">
          <div class="flow-node">User: "Attendance of 101?"</div>
          <div class="flow-arrow">➔</div>
          <div class="flow-node primary">LLM requests get_attendance(101)</div>
          <div class="flow-arrow">➔</div>
          <div class="flow-node" style="background:#FEF3C7; border-color:#F59E0B;">Node.js queries DB</div>
          <div class="flow-arrow">➔</div>
          <div class="flow-node success">Returns { attendance: 85 }</div>
          <div class="flow-arrow">➔</div>
          <div class="flow-node primary">LLM: "Arun has 85% attendance."</div>
        </div>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 6px;">
          • The LLM <strong>did not guess</strong>. It requested your Node.js function, which queried the live database!
        </p>
      `;
    });
  }

  // --- Sandbox 5: Slide 14 Tool Selection Simulator ---
  const s14Input = document.getElementById('s14Input');
  const s14BtnSelect = document.getElementById('s14BtnSelect');
  const s14ChoiceMode = document.getElementById('s14ChoiceMode');
  const s14Output = document.getElementById('s14Output');
  const s14Presets = document.querySelectorAll('.s14-preset');

  s14Presets.forEach(btn => {
    btn.addEventListener('click', () => {
      if (s14Input) s14Input.value = btn.dataset.q;
    });
  });

  if (s14BtnSelect && s14Input && s14Output) {
    s14BtnSelect.addEventListener('click', () => {
      const q = s14Input.value.toLowerCase();
      const mode = s14ChoiceMode ? s14ChoiceMode.value : "auto";
      let tool = "none";
      let args = {};

      if (mode === "none") {
        s14Output.textContent = `Decision: tool_choice is 'none'. Model forces direct natural language generation without invoking tools.`;
        return;
      }

      if (/attendance/i.test(q)) {
        tool = "get_attendance";
        const m = q.match(/\b(10[12])\b/);
        args = { studentId: m ? parseInt(m[1], 10) : 101 };
      } else if (/who is|student|details|course/i.test(q)) {
        tool = "get_student";
        const m = q.match(/\b(10[12])\b/);
        args = { studentId: m ? parseInt(m[1], 10) : 101 };
      } else {
        if (mode === "required") {
          tool = "get_student";
          args = { studentId: 101 };
        }
      }

      s14Output.textContent = `Model Decision Analysis:\n• tool_choice mode: "${mode}"\n• Selected Tool: "${tool}"\n• Inferred Arguments: ${JSON.stringify(args)}\n• Matched Description: ${tool !== 'none' ? 'Matches requested database entity lookup' : 'General conversational query; no tool needed'}`;
    });
  }

  // --- Sandbox 6: Slide 16 Zod Tool Argument Validator ---
  const s16RawArgs = document.getElementById('s16RawArgs');
  const s16BtnValidate = document.getElementById('s16BtnValidate');
  const s16Result = document.getElementById('s16Result');

  if (s16BtnValidate && s16RawArgs && s16Result) {
    s16BtnValidate.addEventListener('click', () => {
      const raw = s16RawArgs.value.trim();
      let parsed;
      try {
        parsed = JSON.parse(raw);
      } catch (err) {
        s16Result.className = 'sandbox-result card-rose';
        s16Result.textContent = `❌ JSON.parse() failed:\n${err.message}`;
        return;
      }

      // Check z.object({ studentId: z.number().int().positive() })
      if (typeof parsed.studentId !== 'number' || isNaN(parsed.studentId) || !Number.isInteger(parsed.studentId) || parsed.studentId <= 0) {
        s16Result.className = 'sandbox-result card-rose';
        s16Result.textContent = `❌ Zod Validation Failed:\n{\n  "success": false,\n  "error": "studentId must be a positive integer"\n}\n\nBlocked before running database function!`;
      } else {
        s16Result.className = 'sandbox-result card-green';
        s16Result.textContent = `✅ Zod Validation Passed!\n{\n  "success": true,\n  "data": {\n    "studentId": ${parsed.studentId}\n  }\n}\n\nSafe to execute: availableTools.get_student(${parsed.studentId})`;
      }
    });
  }

  // --- Sandbox 7: Slide 23 AI Student Assistant Interactive Chat ---
  const s23Input = document.getElementById('s23Input');
  const s23SendBtn = document.getElementById('s23SendBtn');
  const s23Presets = document.querySelectorAll('.s23-preset');
  const s23ChatLog = document.getElementById('s23ChatLog');

  s23Presets.forEach(btn => {
    btn.addEventListener('click', () => {
      if (s23Input) s23Input.value = btn.dataset.q;
    });
  });

  if (s23SendBtn && s23Input && s23ChatLog) {
    s23SendBtn.addEventListener('click', () => {
      const query = s23Input.value.trim();
      if (!query) return;

      s23ChatLog.innerHTML = `<div style="color: #60A5FA;">[1/4] Sending query to Groq LLM with tool schemas...</div>`;

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
          s23ChatLog.innerHTML = `
            <div style="color: #94A3B8;">[1/2] Model evaluated question. No tool needed.</div>
            <div style="color: #34D399; margin-top: 6px;"><strong>Assistant:</strong> Hello! I am the AI Student Assistant. You can ask me to look up details or attendance records for student 101 or 102!</div>
          `;
          return;
        }

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
          finalAnswer = `${toolData.name}'s attendance is ${toolData.attendance}%. ${toolData.attendance >= 75 ? 'Their attendance meets the minimum 75% requirement.' : 'Their attendance is below 75%.'}`;
        }

        s23ChatLog.innerHTML = `
          <div style="color: #38BDF8;">[1/4] <strong>Groq LLM Request:</strong> tool_calls: [{ name: "${toolNeeded.name}", args: '${JSON.stringify(toolNeeded.args)}' }]</div>
          <div style="color: #FBBF24; margin-top: 4px;">[2/4] <strong>Node.js Validation:</strong> Zod safeParse passed! Running ${toolNeeded.name}(${toolNeeded.args.studentId})...</div>
          <div style="color: #A78BFA; margin-top: 4px;">[3/4] <strong>Tool Result:</strong> ${JSON.stringify(toolData)} returned with role: "tool"</div>
          <div style="color: #34D399; margin-top: 8px; padding-top: 8px; border-top: 1px solid #334155;">
            <strong>[4/4] Final Synthesized Answer:</strong><br>
            "${finalAnswer}"
          </div>
        `;
      }, 500);
    });
  }

  // Initial Run
  initNavigation();
});
