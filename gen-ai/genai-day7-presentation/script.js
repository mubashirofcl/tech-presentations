/**
 * Node.js GenAI – Day 7: Structured Output, JSON Schema & Zod Validation
 * Interactive Presentation Engine & Sandbox Controller
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

  // Slide Metadata for TOC
  const slideTitles = [
    "Title: Structured Output & Data Validation",
    "Why Do We Need Structured Output?",
    "What Is JSON?",
    "JSON vs JavaScript Object",
    "JSON Output from an LLM",
    "Node.js Practical: Generate JSON Using Groq",
    "What Is JSON Schema?",
    "Practical: Understand JSON Schema Validation",
    "What Is Zod?",
    "Zod Schema: Define Student Data",
    "Zod Parsing: What Is Parse?",
    "Zod SafeParse: Validate Without Throwing",
    "Zod Validation Errors",
    "Practical: Zod Validation in Express API",
    "Zod and Type Safety",
    "Zod with TypeScript: Infer Types",
    "Zod Advanced Features: Defaults, Optional & Transform",
    "Structured Output + JSON Schema + Zod in AI Applications",
    "Practical: Validate AI-Generated Data Using Groq & Zod",
    "Final Practical Project: AI Student Extractor"
  ];

  // Initialize Dropdown & TOC
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

  // Update UI Elements
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

  // Setup Event Listeners for Presentation Controls
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

  // Global Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    const activeEl = document.activeElement;
    const isEditing = activeEl && (
      activeEl.tagName === 'INPUT' ||
      activeEl.tagName === 'TEXTAREA' ||
      activeEl.isContentEditable ||
      activeEl.tagName === 'SELECT'
    );

    // Escape closes overlays regardless of edit state
    if (e.key === 'Escape') {
      closeTOC();
      closeHelp();
      return;
    }

    if (isEditing) return; // Do not hijack while typing in sandboxes

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
        if (tocOverlay && tocOverlay.classList.contains('active')) {
          closeTOC();
        } else {
          openTOC();
        }
        break;
      case '?':
        e.preventDefault();
        if (helpModal && helpModal.classList.contains('active')) {
          closeHelp();
        } else {
          openHelp();
        }
        break;
    }
  });

  // Touch Swipe Support
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

  // Code Copy Buttons
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
        // Fallback for older environments
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
  // Interactive Sandboxes for Day 7 Topics
  // ==========================================================================

  // --- Sandbox 1: Slide 2 Format Comparator ---
  const formatTabBtns = document.querySelectorAll('.format-tab-btn');
  const formatDisplayBox = document.getElementById('formatDisplayBox');
  const formatAccessBox = document.getElementById('formatAccessBox');

  const formatSamples = {
    paragraph: {
      text: "The student's name is Rahul. He is 22 years old and learning MERN Stack. His email address is rahul@gmail.com.",
      access: "❌ student.name => undefined\n❌ student.age => undefined\nRequires complex and brittle regex to parse!",
      status: "Unstructured Freeform Text (Fragile)"
    },
    csv: {
      text: "Rahul, 22, MERN Stack, rahul@gmail.com",
      access: "⚠️ parts[0] => 'Rahul', parts[1] => '22'\nBreaks if user enters a comma in address or skills!",
      status: "Comma Delimited (Ambiguous & Brittle)"
    },
    bullets: {
      text: "Name: Rahul\nAge: 22\nCourse: MERN Stack\nEmail: rahul@gmail.com",
      access: "⚠️ Line split required. Breaks if LLM outputs 'Student Name' instead of 'Name'.",
      status: "Key-Value Text (Non-Standard)"
    },
    json: {
      text: '{\n  "name": "Rahul",\n  "age": 22,\n  "course": "MERN Stack",\n  "email": "rahul@gmail.com"\n}',
      access: "✅ student.name  => 'Rahul'\n✅ student.age   => 22\n✅ student.email => 'rahul@gmail.com'\nClean, typed, and directly queryable!",
      status: "Structured JSON (Production Standard)"
    }
  };

  formatTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      formatTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const format = btn.dataset.format;
      const sample = formatSamples[format];
      if (sample && formatDisplayBox && formatAccessBox) {
        formatDisplayBox.textContent = sample.text;
        formatAccessBox.textContent = `${sample.status}\n\nProperty Access Test:\n${sample.access}`;
      }
    });
  });

  // --- Sandbox 2: Slide 3 JSON Rules Inspector ---
  const jsonTestInput = document.getElementById('jsonTestInput');
  const jsonTestBtn = document.getElementById('jsonTestBtn');
  const jsonRuleResult = document.getElementById('jsonRuleResult');
  const jsonPresetSelect = document.getElementById('jsonPresetSelect');

  const jsonPresets = {
    valid: '{\n  "name": "Rahul",\n  "age": 22,\n  "isStudent": true,\n  "skills": ["JavaScript", "React", "Node.js"]\n}',
    singleQuote: "{\n  'name': 'Rahul',\n  'age': 22\n}",
    trailingComma: '{\n  "name": "Rahul",\n  "age": 22,\n}',
    unquotedKey: '{\n  name: "Rahul",\n  age: 22\n}',
    commentIncluded: '{\n  // Student info\n  "name": "Rahul",\n  "age": 22\n}'
  };

  if (jsonPresetSelect && jsonTestInput) {
    jsonPresetSelect.addEventListener('change', () => {
      const val = jsonPresetSelect.value;
      if (jsonPresets[val]) {
        jsonTestInput.value = jsonPresets[val];
        testJsonSyntax();
      }
    });
  }

  function testJsonSyntax() {
    if (!jsonTestInput || !jsonRuleResult) return;
    const raw = jsonTestInput.value.trim();

    try {
      const parsed = JSON.parse(raw);
      jsonRuleResult.className = 'sandbox-result card-green';
      jsonRuleResult.textContent = `✅ VALID JSON!\n\nParsed Type: ${typeof parsed}\nKey Count: ${Object.keys(parsed).length}\n\nFormatted Output:\n${JSON.stringify(parsed, null, 2)}`;
    } catch (err) {
      jsonRuleResult.className = 'sandbox-result card-rose';
      let hint = "";
      if (raw.includes("'")) hint += "• Hint: JSON strings and keys must use DOUBLE QUOTES (\"), not single quotes.\n";
      if (/,\s*[}\]]/.test(raw)) hint += "• Hint: Trailing commas are strictly prohibited in JSON.\n";
      if (/\/\/|\/\*/.test(raw)) hint += "• Hint: JSON does not support comments (// or /* */).\n";
      if (/[{,]\s*[a-zA-Z0-9_]+\s*:/.test(raw)) hint += "• Hint: All object property keys must be wrapped in double quotes.\n";

      jsonRuleResult.textContent = `❌ SYNTAX ERROR:\n${err.message}\n\nRule Checks:\n${hint || "• Ensure braces and brackets match properly."}`;
    }
  }

  if (jsonTestBtn) jsonTestBtn.addEventListener('click', testJsonSyntax);

  // --- Sandbox 3: Slide 4 JSON.stringify vs JSON.parse ---
  const s4ObjName = document.getElementById('s4ObjName');
  const s4ObjAge = document.getElementById('s4ObjAge');
  const s4ObjCourse = document.getElementById('s4ObjCourse');
  const s4BtnStringify = document.getElementById('s4BtnStringify');
  const s4BtnParse = document.getElementById('s4BtnParse');
  const s4JsonText = document.getElementById('s4JsonText');
  const s4ConsoleLog = document.getElementById('s4ConsoleLog');

  if (s4BtnStringify && s4JsonText) {
    s4BtnStringify.addEventListener('click', () => {
      const jsObj = {
        name: s4ObjName ? s4ObjName.value : "Rahul",
        age: s4ObjAge ? parseInt(s4ObjAge.value, 10) : 22,
        course: s4ObjCourse ? s4ObjCourse.value : "MERN Stack"
      };

      const jsonStr = JSON.stringify(jsObj, null, 2);
      s4JsonText.value = jsonStr;
      if (s4ConsoleLog) {
        s4ConsoleLog.textContent = `// Result of JSON.stringify(jsObj, null, 2):\nType: ${typeof jsonStr} (Plain Text String)\nLength: ${jsonStr.length} characters`;
      }
    });
  }

  if (s4BtnParse && s4JsonText && s4ConsoleLog) {
    s4BtnParse.addEventListener('click', () => {
      try {
        const parsed = JSON.parse(s4JsonText.value);
        s4ConsoleLog.textContent = `// Result of JSON.parse(studentJSON):\nType: ${typeof parsed} (In-Memory JavaScript Object)\nstudent.name = "${parsed.name}"\nstudent.age = ${parsed.age}\nstudent.course = "${parsed.course}"`;
      } catch (err) {
        s4ConsoleLog.textContent = `❌ SyntaxError in JSON.parse():\n${err.message}`;
      }
    });
  }

  // --- Sandbox 4: Slide 8 JSON Schema Validator ---
  const s8PresetBtns = document.querySelectorAll('.s8-preset-btn');
  const s8PayloadView = document.getElementById('s8PayloadView');
  const s8ValidationResult = document.getElementById('s8ValidationResult');

  const s8Presets = {
    valid: {
      data: {
        name: "Rahul",
        age: 22,
        course: "MERN Stack",
        email: "rahul@gmail.com"
      },
      status: "PASS",
      msg: "✅ VALID DATA: Conforms perfectly to JSON Schema.\n• name: string (Passed)\n• age: integer (Passed)\n• course: string (Passed)\n• email: valid format (Passed)\n• additionalProperties: false (Passed)"
    },
    wrongTypes: {
      data: {
        name: "Rahul",
        age: "twenty-two",
        course: "MERN Stack",
        email: "wrong-email"
      },
      status: "FAIL",
      msg: "❌ SCHEMA VIOLATION (Type & Format Mismatch):\n1. Field 'age': Expected integer, received string ('twenty-two')\n2. Field 'email': String does not match format 'email' ('wrong-email')"
    },
    missingFields: {
      data: {
        name: "Rahul",
        age: 22
      },
      status: "FAIL",
      msg: "❌ SCHEMA VIOLATION (Missing Required Properties):\n1. Missing required field: 'course'\n2. Missing required field: 'email'\nSchema requires all 4 fields to be defined!"
    }
  };

  s8PresetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      s8PresetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const type = btn.dataset.preset;
      const target = s8Presets[type];
      if (target && s8PayloadView && s8ValidationResult) {
        s8PayloadView.textContent = JSON.stringify(target.data, null, 2);
        s8ValidationResult.className = `sandbox-result ${target.status === 'PASS' ? 'card-green' : 'card-rose'}`;
        s8ValidationResult.textContent = target.msg;
      }
    });
  });

  // --- Sandbox 5: Slide 12 safeParse Evaluator ---
  const s12InputName = document.getElementById('s12InputName');
  const s12InputAge = document.getElementById('s12InputAge');
  const s12InputEmail = document.getElementById('s12InputEmail');
  const s12InputCourse = document.getElementById('s12InputCourse');
  const s12RunBtn = document.getElementById('s12RunBtn');
  const s12Output = document.getElementById('s12Output');

  // Client-side lightweight Zod mock for interactive presentation
  function mockZodSafeParse(data) {
    const issues = [];

    // name check
    if (typeof data.name !== 'string' || data.name.trim().length < 2) {
      issues.push({
        code: "too_small",
        minimum: 2,
        type: "string",
        inclusive: true,
        message: "String must contain at least 2 character(s)",
        path: ["name"]
      });
    }

    // age check
    if (typeof data.age !== 'number' || isNaN(data.age)) {
      issues.push({
        code: "invalid_type",
        expected: "number",
        received: typeof data.age === 'string' ? 'string' : 'nan',
        path: ["age"],
        message: "Expected number, received " + (typeof data.age)
      });
    } else {
      if (!Number.isInteger(data.age)) {
        issues.push({
          code: "invalid_type",
          expected: "integer",
          received: "float",
          path: ["age"],
          message: "Expected integer, received float"
        });
      } else if (data.age < 16 || data.age > 60) {
        issues.push({
          code: "too_small_or_big",
          path: ["age"],
          message: "Age must be between 16 and 60"
        });
      }
    }

    // email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof data.email !== 'string' || !emailRegex.test(data.email)) {
      issues.push({
        validation: "email",
        code: "invalid_string",
        message: "Invalid email address",
        path: ["email"]
      });
    }

    // course check
    const allowed = ["MERN Stack", "Python", "Data Science"];
    if (!allowed.includes(data.course)) {
      issues.push({
        code: "invalid_enum_value",
        options: allowed,
        path: ["course"],
        message: `Invalid enum value. Expected 'MERN Stack' | 'Python' | 'Data Science', received '${data.course}'`
      });
    }

    if (issues.length > 0) {
      return {
        success: false,
        error: { issues }
      };
    }

    return {
      success: true,
      data: {
        name: data.name,
        age: data.age,
        email: data.email,
        course: data.course
      }
    };
  }

  if (s12RunBtn && s12Output) {
    s12RunBtn.addEventListener('click', () => {
      const rawAge = s12InputAge ? s12InputAge.value : "";
      const parsedAge = isNaN(Number(rawAge)) || rawAge.trim() === "" ? rawAge : Number(rawAge);

      const candidate = {
        name: s12InputName ? s12InputName.value : "",
        age: parsedAge,
        email: s12InputEmail ? s12InputEmail.value : "",
        course: s12InputCourse ? s12InputCourse.value : ""
      };

      const result = mockZodSafeParse(candidate);

      if (result.success) {
        s12Output.className = 'sandbox-result card-green';
        s12Output.textContent = `// Result: safeParse() SUCCESS!\n{\n  "success": true,\n  "data": ${JSON.stringify(result.data, null, 2)}\n}\n\nNo exceptions thrown! result.data is safe for DB insert.`;
      } else {
        s12Output.className = 'sandbox-result card-rose';
        s12Output.textContent = `// Result: safeParse() FAILED (No exception thrown!)\n{\n  "success": false,\n  "error": {\n    "issues": ${JSON.stringify(result.error.issues, null, 2)}\n  }\n}\n\nInspect result.error.issues to provide HTTP 400/422 responses.`;
      }
    });
  }

  // --- Sandbox 6: Slide 14 Express API Simulator ---
  const s14BtnSendValid = document.getElementById('s14BtnSendValid');
  const s14BtnSendInvalid = document.getElementById('s14BtnSendInvalid');
  const s14ReqBody = document.getElementById('s14ReqBody');
  const s14ResStatus = document.getElementById('s14ResStatus');
  const s14ResBody = document.getElementById('s14ResBody');

  if (s14BtnSendValid && s14ReqBody && s14ResStatus && s14ResBody) {
    s14BtnSendValid.addEventListener('click', () => {
      const payload = {
        name: "Rahul",
        age: 22,
        email: "rahul@gmail.com",
        course: "MERN Stack"
      };
      s14ReqBody.textContent = JSON.stringify(payload, null, 2);
      s14ResStatus.textContent = "HTTP/1.1 201 Created";
      s14ResStatus.style.color = "var(--accent-green)";
      s14ResBody.textContent = JSON.stringify({
        success: true,
        message: "Student data is valid",
        data: payload
      }, null, 2);
    });
  }

  if (s14BtnSendInvalid && s14ReqBody && s14ResStatus && s14ResBody) {
    s14BtnSendInvalid.addEventListener('click', () => {
      const payload = {
        name: "R",
        age: "twenty",
        email: "invalid-email",
        course: "MERN Stack"
      };
      s14ReqBody.textContent = JSON.stringify(payload, null, 2);
      s14ResStatus.textContent = "HTTP/1.1 400 Bad Request";
      s14ResStatus.style.color = "var(--accent-rose)";
      s14ResBody.textContent = JSON.stringify({
        success: false,
        errors: [
          { path: ["name"], message: "String must contain at least 2 characters" },
          { path: ["age"], message: "Expected number, received string" },
          { path: ["email"], message: "Invalid email address" }
        ]
      }, null, 2);
    });
  }

  // --- Sandbox 7: Slide 17 Zod Advanced Transform Tester ---
  const s17InputText = document.getElementById('s17InputText');
  const s17TransformBtn = document.getElementById('s17TransformBtn');
  const s17Output = document.getElementById('s17Output');

  if (s17TransformBtn && s17InputText && s17Output) {
    s17TransformBtn.addEventListener('click', () => {
      const raw = s17InputText.value;
      const transformed = raw.trim().toUpperCase();
      s17Output.textContent = `Input: "${raw}" (length: ${raw.length})\n\nz.string().transform(v => v.trim().toUpperCase()).parse(input)\n\nOutput: "${transformed}" (length: ${transformed.length})`;
    });
  }

  // --- Sandbox 8: Slide 20 AI Student Extractor Final Project Simulator ---
  const s20InputText = document.getElementById('s20InputText');
  const s20RunBtn = document.getElementById('s20RunBtn');
  const s20Status = document.getElementById('s20Status');
  const s20Output = document.getElementById('s20Output');
  const s20SampleBtns = document.querySelectorAll('.s20-sample-btn');

  const s20Samples = {
    sample1: "Rahul is 22 years old. His email is rahul@gmail.com. He is learning MERN Stack and knows JavaScript and React.",
    sample2: "Priya Sharma (age 24, email: priya.dev@gmail.com) wants to enroll in Python for Machine Learning. She is skilled in Python, NumPy and Pandas.",
    sample3: "Aman Gupta, aman@gupta.io, 20. Learning Data Science. Knows SQL and Python."
  };

  s20SampleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const sampleKey = btn.dataset.sample;
      if (s20Samples[sampleKey] && s20InputText) {
        s20InputText.value = s20Samples[sampleKey];
      }
    });
  });

  if (s20RunBtn && s20InputText && s20Status && s20Output) {
    s20RunBtn.addEventListener('click', () => {
      const message = s20InputText.value.trim();
      if (!message) {
        s20Status.textContent = "HTTP 400 Bad Request";
        s20Status.style.color = "var(--accent-amber)";
        s20Output.textContent = JSON.stringify({
          success: false,
          message: "Student information message is required."
        }, null, 2);
        return;
      }

      s20Status.textContent = "Processing: Sending to Groq API (temperature: 0.2)...";
      s20Status.style.color = "var(--primary-accent)";
      s20Output.textContent = "// 1. Constructing System Prompt with strict JSON schema...\n// 2. Dispatching request to Groq LLM (llama-3.3-70b-versatile)...";

      setTimeout(() => {
        // Extract heuristic data from text
        const nameMatch = message.match(/([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/);
        const ageMatch = message.match(/\b(1[6-9]|[2-5][0-9]|60)\b/);
        const emailMatch = message.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
        
        let course = "MERN Stack";
        if (/python/i.test(message)) course = "Python";
        else if (/data science/i.test(message)) course = "Data Science";

        const skills = [];
        if (/javascript/i.test(message)) skills.push("JavaScript");
        if (/react/i.test(message)) skills.push("React");
        if (/node/i.test(message)) skills.push("Node.js");
        if (/python/i.test(message)) skills.push("Python");
        if (/sql/i.test(message)) skills.push("SQL");
        if (/numpy/i.test(message)) skills.push("NumPy");
        if (/pandas/i.test(message)) skills.push("Pandas");
        if (skills.length === 0) skills.push("Web Development");

        const simulatedAIResponse = {
          name: nameMatch ? nameMatch[1] : "Student",
          age: ageMatch ? parseInt(ageMatch[1], 10) : 21,
          email: emailMatch ? emailMatch[0] : "student@example.com",
          course: course,
          skills: skills
        };

        s20Status.textContent = "HTTP 200 OK (Validated with Zod)";
        s20Status.style.color = "var(--accent-green)";
        s20Output.textContent = JSON.stringify({
          success: true,
          message: "Student information extracted successfully",
          data: simulatedAIResponse
        }, null, 2);
      }, 700);
    });
  }

  // Initial Run
  initNavigation();
});
