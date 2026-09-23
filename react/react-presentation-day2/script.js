/**
 * React Day 2: Components & Props — Masterclass Presentation Engine
 * Comprehensive vanilla JavaScript controller for 52 interactive slides,
 * keyboard shortcuts, dynamic TOC, speaker notes, live sandboxes, quiz, and cheat sheet.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const slides = Array.from(document.querySelectorAll('.slide'));
  const totalSlides = slides.length;
  let currentSlideIndex = 0;

  // Header Elements
  const headerSlideTitle = document.getElementById('header-slide-title');
  const headerSectionTag = document.getElementById('header-section-tag');
  const searchInput = document.getElementById('search-input');
  const searchResultsDropdown = document.getElementById('search-results-dropdown');
  const progressBarFill = document.getElementById('progress-bar-fill');
  const tocBtn = document.getElementById('toc-btn');
  const teacherNotesBtn = document.getElementById('teacher-notes-btn');
  const fullscreenBtn = document.getElementById('fullscreen-btn');

  // Footer Navigation Elements
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const firstSlideBtn = document.getElementById('first-slide-btn');
  const lastSlideBtn = document.getElementById('last-slide-btn');
  const slideCounter = document.getElementById('slide-counter');

  // Drawers
  const drawerOverlay = document.getElementById('drawer-overlay');
  const tocDrawer = document.getElementById('toc-drawer');
  const closeTocBtn = document.getElementById('close-toc-btn');
  const tocList = document.getElementById('toc-list');

  const speakerNotesDrawer = document.getElementById('speaker-notes-drawer');
  const closeNotesBtn = document.getElementById('close-notes-btn');
  const speakerNotesContent = document.getElementById('speaker-notes-content');

  // =========================================================================
  // 1. Slide Navigation Engine
  // =========================================================================
  function goToSlide(index, updateHash = true) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;

    currentSlideIndex = index;

    // Toggle active slide
    slides.forEach((slide, idx) => {
      if (idx === currentSlideIndex) {
        slide.classList.add('active');
        slide.scrollTop = 0;
      } else {
        slide.classList.remove('active');
      }
    });

    const activeSlide = slides[currentSlideIndex];
    if (!activeSlide) return;

    // Update Header Metadata
    const slideTitle = activeSlide.getAttribute('data-title') || `Slide ${currentSlideIndex + 1}`;
    const sectionName = activeSlide.getAttribute('data-section') || 'React Masterclass';

    if (headerSlideTitle) headerSlideTitle.textContent = slideTitle;
    if (headerSectionTag) headerSectionTag.textContent = sectionName;

    // Update Progress Bar
    const percent = ((currentSlideIndex + 1) / totalSlides) * 100;
    if (progressBarFill) progressBarFill.style.width = `${percent}%`;

    // Update Slide Counter
    if (slideCounter) {
      slideCounter.textContent = `Slide ${currentSlideIndex + 1} of ${totalSlides}`;
    }

    // Update Navigation Button States
    if (prevBtn) prevBtn.disabled = currentSlideIndex === 0;
    if (nextBtn) nextBtn.disabled = currentSlideIndex === totalSlides - 1;
    if (firstSlideBtn) firstSlideBtn.disabled = currentSlideIndex === 0;
    if (lastSlideBtn) lastSlideBtn.disabled = currentSlideIndex === totalSlides - 1;

    // Sync Hash
    if (updateHash) {
      window.location.hash = `slide-${currentSlideIndex + 1}`;
    }

    // Update TOC Highlights
    updateTocActiveItem();

    // Update Speaker Notes if drawer is open or prepared
    updateSpeakerNotes();
  }

  function nextSlide() {
    if (currentSlideIndex < totalSlides - 1) {
      goToSlide(currentSlideIndex + 1);
    }
  }

  function prevSlide() {
    if (currentSlideIndex > 0) {
      goToSlide(currentSlideIndex - 1);
    }
  }

  // =========================================================================
  // 2. Hash Change & Direct URL Handling
  // =========================================================================
  function handleHashNavigation() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#slide-')) {
      const slideNum = parseInt(hash.replace('#slide-', ''), 10);
      if (!isNaN(slideNum) && slideNum >= 1 && slideNum <= totalSlides) {
        goToSlide(slideNum - 1, false);
        return;
      }
    }
    goToSlide(0, false);
  }

  window.addEventListener('hashchange', handleHashNavigation);

  // =========================================================================
  // 3. Dynamic Table of Contents (Syllabus)
  // =========================================================================
  function buildTOC() {
    if (!tocList) return;
    tocList.innerHTML = '';

    let currentSection = '';

    slides.forEach((slide, idx) => {
      const section = slide.getAttribute('data-section') || 'Overview';
      const title = slide.getAttribute('data-title') || `Slide ${idx + 1}`;

      if (section !== currentSection) {
        currentSection = section;
        const sectionHeader = document.createElement('div');
        sectionHeader.className = 'toc-section-title';
        sectionHeader.textContent = section;
        tocList.appendChild(sectionHeader);
      }

      const item = document.createElement('a');
      item.className = 'toc-item';
      item.href = `#slide-${idx + 1}`;
      item.setAttribute('data-index', idx);
      item.innerHTML = `
        <span>${title}</span>
        <span class="toc-item-number">#${idx + 1}</span>
      `;

      item.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(idx);
        closeAllDrawers();
      });

      tocList.appendChild(item);
    });
  }

  function updateTocActiveItem() {
    const tocItems = document.querySelectorAll('.toc-item');
    tocItems.forEach((item) => {
      const idx = parseInt(item.getAttribute('data-index'), 10);
      if (idx === currentSlideIndex) {
        item.classList.add('current');
        item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else {
        item.classList.remove('current');
      }
    });
  }

  // =========================================================================
  // 4. Speaker Notes Generation
  // =========================================================================
  function updateSpeakerNotes() {
    if (!speakerNotesContent) return;
    const activeSlide = slides[currentSlideIndex];
    if (!activeSlide) return;

    const notesWrap = activeSlide.querySelector('.speaker-notes-data');
    if (!notesWrap) {
      speakerNotesContent.innerHTML = `
        <div class="notes-category-box">
          <span class="notes-cat-title">Teacher Guidance</span>
          <p class="notes-cat-text">Walk students through the slide's visual diagram and ask them to trace the data flow aloud.</p>
        </div>
      `;
      return;
    }

    speakerNotesContent.innerHTML = notesWrap.innerHTML;
  }

  // =========================================================================
  // 5. Drawer Management (TOC & Notes)
  // =========================================================================
  function openDrawer(drawer) {
    if (!drawer) return;
    drawer.classList.add('active');
    if (drawerOverlay) drawerOverlay.classList.add('active');
  }

  function closeAllDrawers() {
    if (tocDrawer) tocDrawer.classList.remove('active');
    if (speakerNotesDrawer) speakerNotesDrawer.classList.remove('active');
    if (drawerOverlay) drawerOverlay.classList.remove('active');
    if (searchResultsDropdown) searchResultsDropdown.style.display = 'none';
  }

  if (tocBtn) {
    tocBtn.addEventListener('click', () => {
      if (tocDrawer.classList.contains('active')) {
        closeAllDrawers();
      } else {
        closeAllDrawers();
        openDrawer(tocDrawer);
      }
    });
  }

  if (closeTocBtn) closeTocBtn.addEventListener('click', closeAllDrawers);

  if (teacherNotesBtn) {
    teacherNotesBtn.addEventListener('click', () => {
      if (speakerNotesDrawer.classList.contains('active')) {
        closeAllDrawers();
      } else {
        closeAllDrawers();
        openDrawer(speakerNotesDrawer);
      }
    });
  }

  if (closeNotesBtn) closeNotesBtn.addEventListener('click', closeAllDrawers);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeAllDrawers);

  // =========================================================================
  // 6. Search Functionality
  // =========================================================================
  if (searchInput && searchResultsDropdown) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) {
        searchResultsDropdown.style.display = 'none';
        return;
      }

      const matches = [];
      slides.forEach((slide, idx) => {
        const title = (slide.getAttribute('data-title') || '').toLowerCase();
        const section = (slide.getAttribute('data-section') || '').toLowerCase();
        const text = slide.innerText.toLowerCase();

        if (title.includes(q) || section.includes(q) || text.includes(q)) {
          matches.push({
            index: idx,
            title: slide.getAttribute('data-title') || `Slide ${idx + 1}`,
            section: slide.getAttribute('data-section') || ''
          });
        }
      });

      if (matches.length === 0) {
        searchResultsDropdown.innerHTML = `<div style="padding: 0.75rem 1rem; color: var(--text-dim); font-size: 0.8rem;">No matching topics found.</div>`;
      } else {
        searchResultsDropdown.innerHTML = matches.slice(0, 8).map(m => `
          <div class="search-result-item" data-index="${m.index}">
            <div style="font-weight: 600; color: var(--text-main); font-size: 0.85rem;">${m.title}</div>
            <div style="font-size: 0.72rem; color: var(--react-cyan);">${m.section} • Slide #${m.index + 1}</div>
          </div>
        `).join('');

        searchResultsDropdown.querySelectorAll('.search-result-item').forEach(el => {
          el.addEventListener('click', () => {
            const idx = parseInt(el.getAttribute('data-index'), 10);
            goToSlide(idx);
            searchResultsDropdown.style.display = 'none';
            searchInput.value = '';
          });
        });
      }

      searchResultsDropdown.style.display = 'block';
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const first = searchResultsDropdown.querySelector('.search-result-item');
        if (first) {
          first.click();
        }
      }
    });

    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchResultsDropdown.contains(e.target)) {
        searchResultsDropdown.style.display = 'none';
      }
    });
  }

  // =========================================================================
  // 7. Fullscreen Toggle
  // =========================================================================
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
          console.warn(`Fullscreen request failed: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    });
  }

  // =========================================================================
  // 8. Keyboard Navigation
  // =========================================================================
  document.addEventListener('keydown', (e) => {
    // If user is focused on an input or textarea, don't hijack slide keys
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      if (e.key === 'Escape') {
        document.activeElement.blur();
        closeAllDrawers();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowRight':
      case ' ':
        e.preventDefault();
        nextSlide();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        prevSlide();
        break;
      case 'Home':
        e.preventDefault();
        goToSlide(0);
        break;
      case 'End':
        e.preventDefault();
        goToSlide(totalSlides - 1);
        break;
      case 'f':
      case 'F':
        e.preventDefault();
        if (fullscreenBtn) fullscreenBtn.click();
        break;
      case 's':
      case 'S':
        e.preventDefault();
        if (teacherNotesBtn) teacherNotesBtn.click();
        break;
      case 't':
      case 'T':
        e.preventDefault();
        if (tocBtn) tocBtn.click();
        break;
      case 'Escape':
        closeAllDrawers();
        break;
    }
  });

  // Footer Button Clicks
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (firstSlideBtn) firstSlideBtn.addEventListener('click', () => goToSlide(0));
  if (lastSlideBtn) lastSlideBtn.addEventListener('click', () => goToSlide(totalSlides - 1));

  // =========================================================================
  // 9. Code Block Copy-to-Clipboard
  // =========================================================================
  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const container = btn.closest('.code-block-container');
      if (!container) return;
      const codeEl = container.querySelector('pre.code-content');
      if (!codeEl) return;

      const codeText = codeEl.innerText;
      navigator.clipboard.writeText(codeText).then(() => {
        const originalHTML = btn.innerHTML;
        btn.classList.add('copied');
        btn.innerHTML = `<span>Copied ✓</span>`;
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = originalHTML;
        }, 2000);
      }).catch(err => {
        console.error('Clipboard copy failed:', err);
      });
    });
  });

  // =========================================================================
  // 10. Reveal / Show Answer Accordions
  // =========================================================================
  document.querySelectorAll('.reveal-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const container = trigger.closest('.reveal-box');
      if (!container) return;
      const content = container.querySelector('.reveal-content');
      if (!content) return;

      const isShown = content.classList.contains('show');
      if (isShown) {
        content.classList.remove('show');
        trigger.innerHTML = `<span>Show Answer & Explanation ▾</span>`;
      } else {
        content.classList.add('show');
        trigger.innerHTML = `<span>Hide Answer ▴</span>`;
      }
    });
  });

  // =========================================================================
  // 11. Interactive Vite CLI Terminal Simulator (Slide 4)
  // =========================================================================
  const terminalBody = document.getElementById('vite-terminal-body');
  const termNextBtn = document.getElementById('term-next-step-btn');
  const termResetBtn = document.getElementById('term-reset-btn');

  const viteSteps = [
    {
      cmd: 'npm create vite@latest',
      out: [
        'Need to install the following packages: create-vite@latest',
        'Ok to proceed? (y) y',
        '? Project name: » react-components-demo',
        '? Select a framework: » React',
        '? Select a variant: » JavaScript',
        'Scaffolding project in ./react-components-demo...',
        'Done. Now run:'
      ]
    },
    {
      cmd: 'cd react-components-demo',
      out: ['Current directory changed to react-components-demo/']
    },
    {
      cmd: 'npm install',
      out: [
        'added 84 packages, and audited 85 packages in 3s',
        'found 0 vulnerabilities'
      ]
    },
    {
      cmd: 'npm run dev',
      out: [
        '  VITE v5.4.2  ready in 238 ms',
        '  ➜  Local:   http://localhost:5173/',
        '  ➜  Network: use --host to expose',
        '  ➜  press h + enter to show help'
      ],
      isSuccess: true
    }
  ];

  let currentTermStep = 0;

  function renderTerminal() {
    if (!terminalBody) return;
    terminalBody.innerHTML = '';

    for (let i = 0; i <= currentTermStep && i < viteSteps.length; i++) {
      const step = viteSteps[i];
      const cmdLine = document.createElement('div');
      cmdLine.className = 'term-line';
      cmdLine.innerHTML = `<span class="term-p">$</span> <span class="term-c">${step.cmd}</span>`;
      terminalBody.appendChild(cmdLine);

      step.out.forEach(line => {
        const outLine = document.createElement('div');
        outLine.className = 'term-out';
        if (step.isSuccess && line.includes('http://localhost:5173/')) {
          outLine.className = 'term-out cyan';
        } else if (line.includes('Done') || line.includes('0 vulnerabilities')) {
          outLine.className = 'term-out success';
        }
        outLine.textContent = line;
        terminalBody.appendChild(outLine);
      });
    }

    if (termNextBtn) {
      if (currentTermStep >= viteSteps.length - 1) {
        termNextBtn.disabled = true;
        termNextBtn.textContent = 'Setup Complete ✓';
      } else {
        termNextBtn.disabled = false;
        termNextBtn.textContent = `Run Next: "${viteSteps[currentTermStep + 1].cmd}" ▶`;
      }
    }

    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  if (termNextBtn) {
    termNextBtn.addEventListener('click', () => {
      if (currentTermStep < viteSteps.length - 1) {
        currentTermStep++;
        renderTerminal();
      }
    });
  }

  if (termResetBtn) {
    termResetBtn.addEventListener('click', () => {
      currentTermStep = 0;
      renderTerminal();
    });
  }

  // =========================================================================
  // 12. Interactive Live Props Playground (Slide 20/22)
  // =========================================================================
  const propNameInput = document.getElementById('prop-input-name');
  const propRoleInput = document.getElementById('prop-input-role');
  const propAgeInput = document.getElementById('prop-input-age');
  const propActiveInput = document.getElementById('prop-input-active');

  const previewAvatar = document.getElementById('preview-avatar');
  const previewName = document.getElementById('preview-name');
  const previewRole = document.getElementById('preview-role');
  const previewAge = document.getElementById('preview-age');
  const previewStatus = document.getElementById('preview-status');
  const liveJsxCode = document.getElementById('live-props-jsx');

  function updatePropsPlayground() {
    if (!previewName) return;

    const nameVal = propNameInput ? propNameInput.value || 'Student' : 'Student';
    const roleVal = propRoleInput ? propRoleInput.value || 'Developer' : 'Developer';
    const ageVal = propAgeInput ? parseInt(propAgeInput.value, 10) || 20 : 20;
    const isActive = propActiveInput ? propActiveInput.checked : true;

    // Update Visual Badge
    previewName.textContent = nameVal;
    previewRole.textContent = roleVal;
    previewAge.textContent = `Age: ${ageVal}`;
    if (previewAvatar) previewAvatar.textContent = nameVal.charAt(0).toUpperCase();

    if (previewStatus) {
      previewStatus.textContent = isActive ? '● Active' : '○ Inactive';
      previewStatus.style.color = isActive ? 'var(--accent-emerald)' : 'var(--text-dim)';
    }

    // Update Live JSX Snippet
    if (liveJsxCode) {
      liveJsxCode.innerHTML = `<span class="punct">&lt;</span><span class="tag">UserCard</span>
  <span class="attr">name</span><span class="punct">=</span><span class="str">"${nameVal}"</span>
  <span class="attr">role</span><span class="punct">=</span><span class="str">"${roleVal}"</span>
  <span class="attr">age</span><span class="punct">={</span><span class="num">${ageVal}</span><span class="punct">}</span>
  <span class="attr">active</span><span class="punct">={</span><span class="bool">${isActive}</span><span class="punct">}</span>
<span class="punct">/&gt;</span>`;
    }
  }

  if (propNameInput) propNameInput.addEventListener('input', updatePropsPlayground);
  if (propRoleInput) propRoleInput.addEventListener('input', updatePropsPlayground);
  if (propAgeInput) propAgeInput.addEventListener('input', updatePropsPlayground);
  if (propActiveInput) propActiveInput.addEventListener('change', updatePropsPlayground);

  // =========================================================================
  // 13. Interactive Todo Data Flow Stepper (Slide 38 & 42)
  // =========================================================================
  const flowSteps = [
    {
      step: 1,
      title: 'Step 1: User Types & Submits Form',
      desc: 'User types "Learn Props" and clicks Add. TodoForm handles onSubmit, calls e.preventDefault(), and validates non-empty input.',
      highlight: 'todoform-node'
    },
    {
      step: 2,
      title: 'Step 2: TodoForm Calls Callback Prop',
      desc: 'TodoForm triggers onAddTodo("Learn Props") function passed down from the parent App component.',
      highlight: 'onadd-node'
    },
    {
      step: 3,
      title: 'Step 3: App Executes addTodo() & Updates State',
      desc: 'App creates new todo object { id: Date.now(), title, completed: false } and calls setTodos(prev => [...prev, newTodo]).',
      highlight: 'app-state-node'
    },
    {
      step: 4,
      title: 'Step 4: App Passes Updated Todos Array to TodoList',
      desc: 'React re-renders App. TodoList receives the new 4-item array through its todos prop.',
      highlight: 'todolist-node'
    },
    {
      step: 5,
      title: 'Step 5: TodoList Maps & Renders New TodoItem',
      desc: 'TodoList iterates with .map(), creating a new TodoItem component with unique key={todo.id} on the screen!',
      highlight: 'todoitem-node'
    }
  ];

  let currentFlowIndex = 0;
  const flowNextBtn = document.getElementById('flow-step-next');
  const flowPrevBtn = document.getElementById('flow-step-prev');
  const flowStepTitle = document.getElementById('flow-step-title');
  const flowStepDesc = document.getElementById('flow-step-desc');

  function renderFlowStep() {
    if (!flowStepTitle) return;
    const cur = flowSteps[currentFlowIndex];
    flowStepTitle.textContent = cur.title;
    flowStepDesc.textContent = cur.desc;

    document.querySelectorAll('.todo-flow-diagram .flow-node-box').forEach(el => {
      el.classList.remove('active-highlight');
    });

    const activeNode = document.getElementById(cur.highlight);
    if (activeNode) {
      activeNode.classList.add('active-highlight');
    }

    if (flowPrevBtn) flowPrevBtn.disabled = currentFlowIndex === 0;
    if (flowNextBtn) {
      flowNextBtn.textContent = currentFlowIndex === flowSteps.length - 1 ? 'Start Over ↺' : 'Next Step ▶';
    }
  }

  if (flowNextBtn) {
    flowNextBtn.addEventListener('click', () => {
      if (currentFlowIndex < flowSteps.length - 1) {
        currentFlowIndex++;
      } else {
        currentFlowIndex = 0;
      }
      renderFlowStep();
    });
  }

  if (flowPrevBtn) {
    flowPrevBtn.addEventListener('click', () => {
      if (currentFlowIndex > 0) {
        currentFlowIndex--;
        renderFlowStep();
      }
    });
  }

  // =========================================================================
  // 14. Interactive Practice Predict Questions (Slide 46/47)
  // =========================================================================
  document.querySelectorAll('.predict-opt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.predict-question-card');
      if (!parent) return;

      const isCorrect = btn.getAttribute('data-correct') === 'true';
      const feedback = parent.querySelector('.predict-feedback');

      parent.querySelectorAll('.predict-opt-btn').forEach(b => {
        b.classList.remove('correct', 'wrong');
        b.disabled = true;
      });

      if (isCorrect) {
        btn.classList.add('correct');
        if (feedback) {
          feedback.className = 'quiz-feedback show-correct';
          feedback.textContent = '✓ Correct! React replaces props.name with the string value "Rahul".';
        }
      } else {
        btn.classList.add('wrong');
        if (feedback) {
          feedback.className = 'quiz-feedback show-wrong';
          feedback.textContent = '✕ Incorrect. Remember that JSX curly braces evaluate JavaScript variables directly into the markup.';
        }
      }
    });
  });

  // =========================================================================
  // 15. Comprehensive 15+ Master Quiz Engine (Slide 49)
  // =========================================================================
  const quizItems = [
    {
      q: '1. What is a React Functional Component?',
      options: [
        'A JavaScript class that extends React.Component',
        'A JavaScript function that returns JSX',
        'An HTML file stored inside src/components',
        'A special JSON configuration object'
      ],
      answer: 1,
      explanation: 'A functional component is simply a JavaScript function that accepts props and returns JSX.'
    },
    {
      q: '2. Why must React component names always start with an uppercase letter?',
      options: [
        'JavaScript syntax errors occur if lowercase is used',
        'Vite requires uppercase for module bundling',
        'React uses capitalization to distinguish custom components from built-in HTML tags',
        'It is merely a stylistic preference with no functional difference'
      ],
      answer: 2,
      explanation: 'React treats lowercase tags like <header> or <div> as native HTML elements. Uppercase names like <Header /> tell React to render a custom component.'
    },
    {
      q: '3. What does "Props" stand for in React?',
      options: ['Propositions', 'Properties', 'Protocols', 'Procedures'],
      answer: 1,
      explanation: 'Props is short for Properties, representing inputs passed from a parent component to a child component.'
    },
    {
      q: '4. How do you correctly pass the number 25 as a prop in JSX?',
      options: [
        '<Age value="25" />',
        '<Age value={25} />',
        '<Age value=(25) />',
        '<Age value="number:25" />'
      ],
      answer: 1,
      explanation: 'To pass non-string values (numbers, booleans, arrays, objects) in JSX, you must wrap them in curly braces: value={25}.'
    },
    {
      q: '5. Can a child component directly modify the props it receives?',
      options: [
        'Yes, child components can freely reassign props',
        'Yes, as long as it uses the this keyword',
        'No, props are read-only and immutable from the child perspective',
        'Only if the parent gives permission via a special flag'
      ],
      answer: 2,
      explanation: 'Props are strictly read-only (immutable). Unidirectional data flow dictates that the parent owns the data.'
    },
    {
      q: '6. What is the modern React technique for extracting specific props from the props object?',
      options: [
        'Object Destructuring: function User({ name, age })',
        'Array Slicing: function User(props[0], props[1])',
        'Type Casting: function User(props as Object)',
        'JSON.parse(props)'
      ],
      answer: 0,
      explanation: 'ES6 object destructuring in the function parameters is the standard modern syntax for reading props.'
    },
    {
      q: '7. How does a child component send data or notify a parent component?',
      options: [
        'By modifying global window variables',
        'By calling a function passed down by the parent as a prop',
        'By mutating document.body directly',
        'Children cannot communicate with parents in React'
      ],
      answer: 1,
      explanation: 'Child-to-parent communication is achieved by passing callback functions as props (e.g. onAddTodo).'
    },
    {
      q: '8. In a class component, how do you access a prop called "title"?',
      options: ['props.title', 'this.props.title', 'getProp("title")', 'super.title'],
      answer: 1,
      explanation: 'In class components, props are stored on the class instance, accessed via this.props.title.'
    },
    {
      q: '9. When rendering a list of items using .map(), why is the "key" prop required?',
      options: [
        'To style list items with CSS',
        'To help React uniquely identify which items changed, were added, or were removed',
        'To encrypt the array items for security',
        'It is required by the JavaScript language specifications'
      ],
      answer: 1,
      explanation: 'The unique key prop enables React\'s Virtual DOM reconciliation engine to efficiently update lists without re-rendering everything.'
    },
    {
      q: '10. Which array method should you use to immutably delete an item by ID from state?',
      options: ['todos.splice()', 'todos.filter(todo => todo.id !== id)', 'delete todos[id]', 'todos.pop()'],
      answer: 1,
      explanation: 'Array.filter() returns a brand-new array excluding the matched item, preserving state immutability.'
    },
    {
      q: '11. Which array method should you use to immutably toggle an item in state?',
      options: [
        'todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t)',
        'todos.forEach(t => { if (t.id === id) t.completed = !t.completed; })',
        'todos.sort()',
        'todos.reduce()'
      ],
      answer: 0,
      explanation: 'Array.map() returns a new array with the targeted item transformed using the object spread operator.'
    },
    {
      q: '12. What is wrong with: <button onClick={handleDelete(todo.id)}>Delete</button>?',
      options: [
        'Nothing, this is the standard syntax',
        'handleDelete will be called immediately on every render instead of waiting for a click',
        'Delete button must always be an <a> link',
        'todo.id is not allowed in JSX'
      ],
      answer: 1,
      explanation: 'Calling the function with parentheses executes it immediately during render. Wrap it in an arrow function: onClick={() => handleDelete(todo.id)}.'
    },
    {
      q: '13. What is the entry point file in a modern Vite React application?',
      options: ['index.html', 'src/main.jsx', 'vite.config.js', 'src/App.css'],
      answer: 1,
      explanation: 'src/main.jsx is the JavaScript entry point where createRoot mounts the React component tree into the DOM.'
    },
    {
      q: '14. Where should the "todos" state live in our Todo application architecture?',
      options: [
        'Inside TodoItem.jsx',
        'Inside Header.jsx',
        'In the top-level parent App.jsx so both TodoForm and TodoList can access and update it',
        'Inside index.html'
      ],
      answer: 2,
      explanation: 'Lifting state up: App.jsx owns the todos state and passes data down to TodoList and handler functions to TodoForm.'
    },
    {
      q: '15. True or False: Class components are completely deprecated and removed from React.',
      options: [
        'True, React throws an error if you use class components today',
        'False, class components are still fully supported and widely seen in legacy applications, though functional components are modern standard'
      ],
      answer: 1,
      explanation: 'Class components are NOT deprecated or removed. They are still fully supported, but functional components with hooks are the modern standard.'
    }
  ];

  const quizContainer = document.getElementById('master-quiz-list');
  const quizScoreBadge = document.getElementById('quiz-score-display');
  const resetQuizBtn = document.getElementById('reset-quiz-btn');
  let userAnswers = {};

  function renderMasterQuiz() {
    if (!quizContainer) return;
    quizContainer.innerHTML = '';
    userAnswers = {};

    if (quizScoreBadge) quizScoreBadge.textContent = `Score: 0 / ${quizItems.length}`;

    quizItems.forEach((item, qIdx) => {
      const card = document.createElement('div');
      card.className = 'quiz-item-card';

      card.innerHTML = `
        <div class="quiz-q-num">Question ${qIdx + 1} of ${quizItems.length}</div>
        <div class="quiz-question-text">${item.q}</div>
        <div class="quiz-options" data-qindex="${qIdx}">
          ${item.options.map((opt, optIdx) => `
            <button class="quiz-opt-btn" data-optindex="${optIdx}">
              <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-dim);">${String.fromCharCode(65 + optIdx)})</span>
              <span>${opt}</span>
            </button>
          `).join('')}
        </div>
        <div class="quiz-feedback" id="quiz-feedback-${qIdx}"></div>
      `;

      card.querySelectorAll('.quiz-opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          handleQuizAnswer(qIdx, parseInt(btn.getAttribute('data-optindex'), 10), card);
        });
      });

      quizContainer.appendChild(card);
    });
  }

  function handleQuizAnswer(qIdx, chosenOpt, card) {
    if (userAnswers[qIdx] !== undefined) return; // already answered
    userAnswers[qIdx] = chosenOpt;

    const item = quizItems[qIdx];
    const isCorrect = chosenOpt === item.answer;
    const feedback = card.querySelector(`#quiz-feedback-${qIdx}`);

    card.querySelectorAll('.quiz-opt-btn').forEach((btn, optIdx) => {
      btn.disabled = true;
      if (optIdx === item.answer) {
        btn.classList.add('correct');
      } else if (optIdx === chosenOpt) {
        btn.classList.add('wrong');
      }
    });

    if (feedback) {
      if (isCorrect) {
        feedback.className = 'quiz-feedback show-correct';
        feedback.innerHTML = `<strong>✓ Correct!</strong> ${item.explanation}`;
      } else {
        feedback.className = 'quiz-feedback show-wrong';
        feedback.innerHTML = `<strong>✕ Incorrect.</strong> ${item.explanation}`;
      }
    }

    // Update Score
    let correctCount = 0;
    Object.keys(userAnswers).forEach(k => {
      if (userAnswers[k] === quizItems[k].answer) correctCount++;
    });

    if (quizScoreBadge) {
      quizScoreBadge.textContent = `Score: ${correctCount} / ${quizItems.length}`;
      if (Object.keys(userAnswers).length === quizItems.length) {
        const pct = Math.round((correctCount / quizItems.length) * 100);
        quizScoreBadge.textContent = `Completed! ${correctCount}/${quizItems.length} (${pct}%)`;
      }
    }
  }

  if (resetQuizBtn) {
    resetQuizBtn.addEventListener('click', renderMasterQuiz);
  }

  // =========================================================================
  // 16. Searchable Cheat Sheet (Slide 51)
  // =========================================================================
  const cheatSearchInput = document.getElementById('cheat-search-input');
  const cheatCards = document.querySelectorAll('.cheat-card');

  if (cheatSearchInput) {
    cheatSearchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      cheatCards.forEach(card => {
        const title = (card.querySelector('.cheat-title')?.textContent || '').toLowerCase();
        const cat = (card.querySelector('.cheat-category')?.textContent || '').toLowerCase();
        const code = (card.querySelector('pre')?.textContent || '').toLowerCase();

        if (title.includes(q) || cat.includes(q) || code.includes(q)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // =========================================================================
  // 17. Initialization
  // =========================================================================
  buildTOC();
  renderTerminal();
  updatePropsPlayground();
  renderFlowStep();
  renderMasterQuiz();
  handleHashNavigation();
});
