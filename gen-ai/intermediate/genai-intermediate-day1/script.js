/**
 * Intermediate AI/LLM – Day 1
 * AI Agent Fundamentals, State, Memory & Context
 * Interactive Presentation Engine & Simulation Sandboxes
 * Total Slides: 26
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Presentation State ---
  const totalSlides = 26;
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

  // Exact 26 Slide Titles
  const slideTitles = [
    "Introduction to AI Agents",
    "What is an AI Agent?",
    "Chatbot vs AI Assistant vs AI Agent",
    "AI Agent Architecture",
    "What is an Agent Loop?",
    "Decision Making and Tool Selection",
    "What is Autonomous Action?",
    "Agent Instructions (System Prompt)",
    "What is Agent State?",
    "State vs Memory vs Chat History vs RAG",
    "Short-Term Memory vs Long-Term Memory",
    "What is Context?",
    "Context Window and Its Limits",
    "Context Management Techniques",
    "Building a Tool-Using AI Agent (Overview)",
    "Project Setup & Dependencies",
    "Understanding Tools and Tool Schemas",
    "Implementing Tools & The Tool Registry",
    "Sending Tools to the LLM (Groq Dispatch)",
    "Executing the Tool & Observing the Result",
    "Returning the Tool Result to the LLM",
    "The Complete Agent Loop Architecture",
    "Project 1: Tool-Using Agent & Live Simulator",
    "Building a Conversational Agent (Overview)",
    "Implementing Session Memory in Node.js",
    "Project 2: Conversational Agent & Live Simulator"
  ];

  // Initialize Dropdown & Table of Contents
  function initializeNavigation() {
    if (slideSelect) {
      slideSelect.innerHTML = '';
      slideTitles.forEach((title, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = `${index + 1}. ${title}`;
        slideSelect.appendChild(option);
      });
    }

    if (tocList) {
      tocList.innerHTML = '';
      slideTitles.forEach((title, index) => {
        const li = document.createElement('li');
        li.className = 'toc-item';
        if (index === 0) li.classList.add('active');
        li.dataset.slide = index + 1;

        const numSpan = document.createElement('span');
        numSpan.className = 'toc-num';
        numSpan.textContent = String(index + 1).padStart(2, '0');

        const titleSpan = document.createElement('span');
        titleSpan.textContent = title;

        li.appendChild(numSpan);
        li.appendChild(titleSpan);

        li.addEventListener('click', () => {
          goToSlide(index + 1);
          closeTOC();
        });

        tocList.appendChild(li);
      });
    }
  }

  // Slide Display Controller
  function updateSlideDisplay() {
    slides.forEach((slide, index) => {
      if (index + 1 === currentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    if (slideCounter) {
      slideCounter.textContent = `${currentSlide} / ${totalSlides}`;
    }

    if (progressBar) {
      const pct = (currentSlide / totalSlides) * 100;
      progressBar.style.width = `${pct}%`;
    }

    if (slideSelect) {
      slideSelect.value = currentSlide;
    }

    if (prevBtn) {
      prevBtn.disabled = currentSlide === 1;
    }
    if (nextBtn) {
      nextBtn.disabled = currentSlide === totalSlides;
    }

    // Update TOC highlight
    if (tocList) {
      const tocItems = tocList.querySelectorAll('.toc-item');
      tocItems.forEach((item, index) => {
        if (index + 1 === currentSlide) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }

    // Scroll active slide body to top
    const activeSlide = document.getElementById(`slide-${currentSlide}`);
    if (activeSlide) {
      const slideBody = activeSlide.querySelector('.slide-body');
      if (slideBody) {
        slideBody.scrollTop = 0;
      }
    }
  }

  function goToSlide(n) {
    if (n >= 1 && n <= totalSlides) {
      currentSlide = n;
      updateSlideDisplay();
    }
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

  // Event Listeners for Nav
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  if (slideSelect) {
    slideSelect.addEventListener('change', (e) => {
      goToSlide(parseInt(e.target.value, 10));
    });
  }

  // Keyboard Navigation
  document.addEventListener('keydown', (e) => {
    // Avoid capturing inputs inside sandboxes
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
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
        goToSlide(totalSlides);
        break;
      case 'f':
      case 'F':
        toggleFullscreen();
        break;
      case 't':
      case 'T':
        toggleTOC();
        break;
      case '?':
        toggleHelp();
        break;
      case 'Escape':
        closeTOC();
        closeHelp();
        break;
    }
  });

  // Fullscreen Handler
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
  if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);

  // Table of Contents Drawer
  function toggleTOC() {
    if (tocOverlay) tocOverlay.classList.toggle('active');
  }
  function closeTOC() {
    if (tocOverlay) tocOverlay.classList.remove('active');
  }
  if (tocBtn) tocBtn.addEventListener('click', toggleTOC);
  if (tocClose) tocClose.addEventListener('click', closeTOC);
  if (tocOverlay) {
    tocOverlay.addEventListener('click', (e) => {
      if (e.target === tocOverlay) closeTOC();
    });
  }

  // Help Modal
  function toggleHelp() {
    if (helpModal) helpModal.classList.toggle('active');
  }
  function closeHelp() {
    if (helpModal) helpModal.classList.remove('active');
  }
  if (helpBtn) helpBtn.addEventListener('click', toggleHelp);
  if (helpClose) helpClose.addEventListener('click', closeHelp);
  if (helpModal) {
    helpModal.addEventListener('click', (e) => {
      if (e.target === helpModal) closeHelp();
    });
  }

  // Toast System
  function showToast(msg) {
    if (!toastNotice) return;
    toastNotice.textContent = msg;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 2400);
  }

  // Global copy-code utility
  window.copyCode = function(btn) {
    const panel = btn.closest('.code-panel');
    if (!panel) return;
    const pre = panel.querySelector('pre');
    if (!pre) return;
    const text = pre.innerText;
    navigator.clipboard.writeText(text).then(() => {
      const originalText = btn.textContent;
      btn.textContent = 'Copied!';
      btn.style.background = '#059669';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
      }, 1800);
    }).catch(() => {
      btn.textContent = 'Failed';
    });
  };

  // Initialize Navigation
  initializeNavigation();
  updateSlideDisplay();

  // =========================================================================
  // --- INTERACTIVE SIMULATOR 1: TOOL-USING AGENT (SLIDE 23) ---
  // =========================================================================
  const agentInput = document.getElementById("agentInput");
  const btnRunAgent = document.getElementById("btnRunAgent");
  const agentOutput = document.getElementById("agentOutput");

  // Mock Student Database
  const mockStudents = [
    { id: 101, name: "Ali", course: "MERN Stack", grade: "A" },
    { id: 102, name: "Sara", course: "Python GenAI", grade: "A+" }
  ];

  function runAgentSimulation() {
    if (!agentInput || !agentOutput) return;
    const query = agentInput.value.trim();
    if (!query) {
      showToast("Please enter a question for the agent!");
      return;
    }

    agentOutput.innerHTML = `<span class="sandbox-log-step">[Step 1: Ingestion]</span> User asks: "${query}"<br>`;

    setTimeout(() => {
      // Analyze Query with Simulated LLM Decision Maker
      const mathMatch = query.match(/(?:add|calculate|sum|\+)\s*(\d+)\s*(?:and|\+)\s*(\d+)/i) ||
                        query.match(/(\d+)\s*(\+|\*|\-)\s*(\d+)/);
      const studentMatch = query.match(/student\s*(?:id|details|\#)?\s*(\d+)/i);

      if (mathMatch) {
        let a, b, op;
        if (mathMatch[2] === '+' || mathMatch[2] === '*' || mathMatch[2] === '-') {
          a = parseInt(mathMatch[1], 10);
          op = mathMatch[2];
          b = parseInt(mathMatch[3], 10);
        } else {
          a = parseInt(mathMatch[1], 10);
          b = parseInt(mathMatch[2], 10);
          op = '+';
        }

        agentOutput.innerHTML += `
          <span class="sandbox-log-step">[Step 2: LLM Decision]</span> Tool Required: <span class="sandbox-log-tool">'calculate'</span><br>
          <span class="sandbox-log-tool">↳ Emitted Arguments:</span> { a: ${a}, b: ${b} }<br>
        `;

        setTimeout(() => {
          let calcResult;
          if (op === '*') calcResult = a * b;
          else if (op === '-') calcResult = a - b;
          else calcResult = a + b;

          agentOutput.innerHTML += `
            <span class="sandbox-log-step">[Step 3: Node.js Execution]</span> Executing calculate(${a}, ${b}) from registry...<br>
            <span class="sandbox-log-result">↳ Tool Output Observed:</span> ${calcResult}<br>
            <span class="sandbox-log-step">[Step 4: Groq Synthesis]</span> Feeding result into context...<br>
            <span class="sandbox-log-answer">[Final Answer]</span> "The result of calculating ${a} and ${b} is ${calcResult}."
          `;
          showToast("Tool executed successfully!");
        }, 500);

      } else if (studentMatch) {
        const studentId = parseInt(studentMatch[1], 10);
        agentOutput.innerHTML += `
          <span class="sandbox-log-step">[Step 2: LLM Decision]</span> Tool Required: <span class="sandbox-log-tool">'get_student'</span><br>
          <span class="sandbox-log-tool">↳ Emitted Arguments:</span> { studentId: ${studentId} }<br>
        `;

        setTimeout(() => {
          const student = mockStudents.find(s => s.id === studentId);
          if (student) {
            agentOutput.innerHTML += `
              <span class="sandbox-log-step">[Step 3: Node.js Execution]</span> Running getStudent(${studentId})...<br>
              <span class="sandbox-log-result">↳ Tool Output Observed:</span> ${JSON.stringify(student)}<br>
              <span class="sandbox-log-step">[Step 4: Groq Synthesis]</span> Task completed. Formatting response...<br>
              <span class="sandbox-log-answer">[Final Answer]</span> "Student ${student.name} (ID: ${student.id}) is enrolled in the ${student.course} course with a grade of ${student.grade}."
            `;
          } else {
            agentOutput.innerHTML += `
              <span class="sandbox-log-step">[Step 3: Node.js Execution]</span> Running getStudent(${studentId})...<br>
              <span class="sandbox-log-result">↳ Tool Output Observed:</span> { error: "Student not found" }<br>
              <span class="sandbox-log-step">[Step 4: Groq Synthesis]</span> Explaining error without hallucinating...<br>
              <span class="sandbox-log-answer">[Final Answer]</span> "I checked our student records, but no student was found with ID ${studentId}."
            `;
          }
          showToast("Student lookup completed!");
        }, 500);

      } else {
        // Direct response without tools
        agentOutput.innerHTML += `
          <span class="sandbox-log-step">[Step 2: LLM Decision]</span> No external tool required.<br>
          <span class="sandbox-log-answer">[Final Answer]</span> "Hello! I am your AI student assistant. You can ask me to perform calculations (e.g. 'Add 250 and 450') or look up enrolled students (e.g. 'Find student 101')."
        `;
        showToast("Direct response generated (No tools needed)");
      }
    }, 400);
  }

  if (btnRunAgent) btnRunAgent.addEventListener('click', runAgentSimulation);
  if (agentInput) {
    agentInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') runAgentSimulation();
    });
  }

  // =========================================================================
  // --- INTERACTIVE SIMULATOR 2: CONVERSATIONAL AGENT (SLIDE 26) ---
  // =========================================================================
  const chatWindow = document.getElementById("chatWindow");
  const chatInput = document.getElementById("chatInput");
  const btnSendChat = document.getElementById("btnSendChat");
  const memoryInspector = document.getElementById("memoryInspector");

  // In-Memory Session Store
  const mockSessions = new Map();
  const currentSessionId = "session-101";

  // Pre-seed initial greeting in session
  mockSessions.set(currentSessionId, [
    { role: "assistant", content: "Hello! I'm your session-aware AI agent. Tell me your name or what you're learning!" }
  ]);

  function updateMemoryInspector() {
    if (!memoryInspector) return;
    const history = mockSessions.get(currentSessionId) || [];
    const recent = history.slice(-6);
    memoryInspector.innerHTML = recent.map((msg, idx) => {
      const roleColor = msg.role === 'user' ? '#60A5FA' : '#4ADE80';
      return `[${idx + 1}] <span style="color: ${roleColor};">${msg.role}</span>: "${msg.content}"`;
    }).join('<br>');
  }

  function handleUserChat() {
    if (!chatInput || !chatWindow) return;
    const userText = chatInput.value.trim();
    if (!userText) return;

    // 1. Append User Message Bubble
    const userBubble = document.createElement("div");
    userBubble.className = "chat-bubble chat-user";
    userBubble.textContent = userText;
    chatWindow.appendChild(userBubble);

    // 2. Save into Session Memory
    const history = mockSessions.get(currentSessionId);
    history.push({ role: "user", content: userText });
    updateMemoryInspector();

    chatInput.value = "";
    chatWindow.scrollTop = chatWindow.scrollHeight;

    // 3. Generate Simulated Contextual Response
    setTimeout(() => {
      let botResponse = "";

      // Extract facts from history
      let userName = null;
      let userCourse = null;

      history.forEach(m => {
        if (m.role === 'user') {
          const nameMatch = m.content.match(/my name is\s+([A-Za-z]+)/i) || m.content.match(/i am\s+([A-Za-z]+)/i);
          if (nameMatch && !["learning", "studying"].includes(nameMatch[1].toLowerCase())) {
            userName = nameMatch[1];
          }
          const courseMatch = m.content.match(/learning\s+([A-Za-z\.\s\+]+)/i) || m.content.match(/studying\s+([A-Za-z\.\s\+]+)/i);
          if (courseMatch) {
            userCourse = courseMatch[1].trim();
          }
        }
      });

      const lower = userText.toLowerCase();

      if (lower.includes("what is my name") || lower.includes("who am i")) {
        if (userName) {
          botResponse = `Based on our conversation history, your name is ${userName}!`;
        } else {
          botResponse = "You haven't mentioned your name yet in this session. What should I call you?";
        }
      } else if (lower.includes("what am i learning") || lower.includes("my course")) {
        if (userCourse) {
          botResponse = `You told me earlier that you are learning ${userCourse}!`;
        } else {
          botResponse = "You haven't told me what course you are learning yet. What topic are you studying?";
        }
      } else if (lower.includes("name is") || (lower.startsWith("i am") && !lower.includes("learning"))) {
        botResponse = `Nice to meet you, ${userName || 'friend'}! I've stored that in your session memory.`;
      } else if (lower.includes("learning") || lower.includes("studying")) {
        botResponse = `Awesome! ${userCourse || 'That subject'} is fantastic. I'll remember that for the rest of our chat.`;
      } else {
        botResponse = `Got it! I've retained that in our session context. Current active turns: ${history.length}.`;
      }

      // Append Assistant Bubble
      const botBubble = document.createElement("div");
      botBubble.className = "chat-bubble chat-assistant";
      botBubble.textContent = botResponse;
      chatWindow.appendChild(botBubble);

      // Save Assistant Response to Session
      history.push({ role: "assistant", content: botResponse });
      updateMemoryInspector();

      chatWindow.scrollTop = chatWindow.scrollHeight;
      showToast("Session context updated!");
    }, 450);
  }

  if (btnSendChat) btnSendChat.addEventListener('click', handleUserChat);
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleUserChat();
    });
  }

  updateMemoryInspector();
});
