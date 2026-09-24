/**
 * React Day 3: Events, Conditional Rendering & React Fragment
 * Masterclass Presentation Engine & Interactive Simulators
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
  const brandHomeBtn = document.getElementById('brand-home-btn');

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

  // Toast
  const toastMsg = document.getElementById('toast-msg');

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

    // Update Speaker Notes
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

  // Footer Navigation Button Listeners
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (firstSlideBtn) firstSlideBtn.addEventListener('click', () => goToSlide(0));
  if (lastSlideBtn) lastSlideBtn.addEventListener('click', () => goToSlide(totalSlides - 1));
  if (brandHomeBtn) brandHomeBtn.addEventListener('click', () => goToSlide(0));

  // =========================================================================
  // 3. Keyboard Navigation
  // =========================================================================
  document.addEventListener('keydown', (e) => {
    // Avoid interfering when typing in inputs or textareas
    const activeEl = document.activeElement;
    const isTyping = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.tagName === 'SELECT');

    if (e.key === 'Escape') {
      closeAllDrawers();
      if (searchResultsDropdown) searchResultsDropdown.style.display = 'none';
      return;
    }

    if (isTyping) return;

    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'Home') {
      e.preventDefault();
      goToSlide(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goToSlide(totalSlides - 1);
    } else if (e.key === 'f' || e.key === 'F') {
      e.preventDefault();
      toggleFullscreen();
    } else if (e.key === 't' || e.key === 'T') {
      e.preventDefault();
      toggleTocDrawer();
    } else if (e.key === 's' || e.key === 'S') {
      e.preventDefault();
      toggleSpeakerNotesDrawer();
    }
  });

  // =========================================================================
  // 4. Fullscreen Support
  // =========================================================================
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }

  if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);

  // =========================================================================
  // 5. Drawers Management (TOC & Speaker Notes)
  // =========================================================================
  function openDrawer(drawer) {
    if (drawerOverlay) drawerOverlay.classList.add('active');
    if (drawer) drawer.classList.add('active');
  }

  function closeAllDrawers() {
    if (drawerOverlay) drawerOverlay.classList.remove('active');
    if (tocDrawer) tocDrawer.classList.remove('active');
    if (speakerNotesDrawer) speakerNotesDrawer.classList.remove('active');
  }

  function toggleTocDrawer() {
    if (tocDrawer && tocDrawer.classList.contains('active')) {
      closeAllDrawers();
    } else {
      closeAllDrawers();
      openDrawer(tocDrawer);
    }
  }

  function toggleSpeakerNotesDrawer() {
    if (speakerNotesDrawer && speakerNotesDrawer.classList.contains('active')) {
      closeAllDrawers();
    } else {
      closeAllDrawers();
      updateSpeakerNotes();
      openDrawer(speakerNotesDrawer);
    }
  }

  if (tocBtn) tocBtn.addEventListener('click', toggleTocDrawer);
  if (closeTocBtn) closeTocBtn.addEventListener('click', closeAllDrawers);
  if (teacherNotesBtn) teacherNotesBtn.addEventListener('click', toggleSpeakerNotesDrawer);
  if (closeNotesBtn) closeNotesBtn.addEventListener('click', closeAllDrawers);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeAllDrawers);

  // =========================================================================
  // 6. Dynamic Table of Contents (Syllabus)
  // =========================================================================
  function buildTOC() {
    if (!tocList) return;
    tocList.innerHTML = '';

    let currentSection = '';

    slides.forEach((slide, idx) => {
      const section = slide.getAttribute('data-section') || 'General';
      const title = slide.getAttribute('data-title') || `Slide ${idx + 1}`;

      // Insert section header if changed
      if (section !== currentSection) {
        currentSection = section;
        const sectionHeader = document.createElement('div');
        sectionHeader.className = 'toc-section-title';
        sectionHeader.textContent = currentSection;
        tocList.appendChild(sectionHeader);
      }

      const item = document.createElement('div');
      item.className = 'toc-item';
      item.setAttribute('data-slide-index', idx);
      item.innerHTML = `
        <span>${title}</span>
        <span class="toc-num">${idx + 1}</span>
      `;

      item.addEventListener('click', () => {
        goToSlide(idx);
        closeAllDrawers();
      });

      tocList.appendChild(item);
    });
  }

  function updateTocActiveItem() {
    if (!tocList) return;
    const items = tocList.querySelectorAll('.toc-item');
    items.forEach((item) => {
      const idx = parseInt(item.getAttribute('data-slide-index'), 10);
      if (idx === currentSlideIndex) {
        item.classList.add('active');
        item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else {
        item.classList.remove('active');
      }
    });
  }

  // =========================================================================
  // 7. Dynamic Speaker Notes
  // =========================================================================
  function updateSpeakerNotes() {
    if (!speakerNotesContent) return;
    const activeSlide = slides[currentSlideIndex];
    if (!activeSlide) return;

    const notesWrap = activeSlide.querySelector('.speaker-notes-data');
    if (notesWrap && notesWrap.innerHTML.trim() !== '') {
      speakerNotesContent.innerHTML = `
        <div style="font-size: 0.76rem; color: var(--text-dim); text-transform: uppercase; font-weight:700; margin-bottom: 0.75rem;">
          Slide ${currentSlideIndex + 1} • ${activeSlide.getAttribute('data-title')}
        </div>
        ${notesWrap.innerHTML}
      `;
    } else {
      speakerNotesContent.innerHTML = `
        <p style="color: var(--text-muted); font-size: 0.88rem; font-style: italic;">
          No specific instructor notes recorded for this slide.
        </p>
      `;
    }
  }

  // =========================================================================
  // 8. Search Engine in Header
  // =========================================================================
  if (searchInput && searchResultsDropdown) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (!query) {
        searchResultsDropdown.style.display = 'none';
        searchResultsDropdown.innerHTML = '';
        return;
      }

      const matches = [];
      slides.forEach((slide, idx) => {
        const title = slide.getAttribute('data-title') || '';
        const section = slide.getAttribute('data-section') || '';
        const text = slide.textContent || '';

        if (title.toLowerCase().includes(query) || section.toLowerCase().includes(query) || text.toLowerCase().includes(query)) {
          matches.push({ idx, title, section });
        }
      });

      if (matches.length === 0) {
        searchResultsDropdown.innerHTML = `
          <div style="padding: 0.75rem 1rem; color: var(--text-dim); font-size: 0.82rem;">
            No matching topics found.
          </div>
        `;
        searchResultsDropdown.style.display = 'block';
        return;
      }

      searchResultsDropdown.innerHTML = matches.slice(0, 8).map(m => `
        <div class="search-result-item" data-slide-index="${m.idx}" style="padding: 0.55rem 0.85rem; border-bottom: 1px solid var(--border-subtle); cursor: pointer; transition: background 0.15s ease;">
          <div style="font-size: 0.82rem; font-weight: 600; color: var(--text-main);">${m.title}</div>
          <div style="font-size: 0.7rem; color: var(--react-cyan);">${m.section} • Slide ${m.idx + 1}</div>
        </div>
      `).join('');

      searchResultsDropdown.style.display = 'block';

      searchResultsDropdown.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('mouseenter', () => item.style.background = 'var(--bg-card-hover)');
        item.addEventListener('mouseleave', () => item.style.background = 'transparent');
        item.addEventListener('click', () => {
          const sIdx = parseInt(item.getAttribute('data-slide-index'), 10);
          goToSlide(sIdx);
          searchResultsDropdown.style.display = 'none';
          searchInput.value = '';
        });
      });
    });

    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchResultsDropdown.contains(e.target)) {
        searchResultsDropdown.style.display = 'none';
      }
    });
  }

  // =========================================================================
  // 9. Toast Notification & Copy Code Buttons
  // =========================================================================
  function showToast(text = 'Code copied to clipboard!') {
    if (!toastMsg) return;
    toastMsg.textContent = text;
    toastMsg.classList.add('show');
    setTimeout(() => {
      toastMsg.classList.remove('show');
    }, 2200);
  }

  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      let textToCopy = '';

      if (targetId) {
        const targetEl = document.getElementById(targetId);
        if (targetEl) textToCopy = targetEl.textContent;
      } else {
        const codeWrapper = btn.closest('.code-block-wrapper');
        const pre = codeWrapper ? codeWrapper.querySelector('pre') : null;
        if (pre) textToCopy = pre.textContent;
      }

      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalHTML = btn.innerHTML;
          btn.innerHTML = `✓ Copied!`;
          btn.style.color = 'var(--accent-emerald)';
          showToast();
          setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.color = '';
          }, 1800);
        }).catch(() => {
          showToast('Failed to copy');
        });
      }
    });
  });

  // =========================================================================
  // 10. Interactive onChange Simulator (Slide 8)
  // =========================================================================
  const demoOnChangeInput = document.getElementById('demo-onchange-input');
  const demoOnChangeMirror = document.getElementById('demo-onchange-mirror');
  const demoOnChangeCount = document.getElementById('demo-onchange-count');
  let onChangeEventCount = 0;

  if (demoOnChangeInput) {
    demoOnChangeInput.addEventListener('input', (e) => {
      onChangeEventCount++;
      const val = e.target.value;
      if (demoOnChangeMirror) {
        demoOnChangeMirror.textContent = val ? val : '(empty string)';
      }
      if (demoOnChangeCount) {
        demoOnChangeCount.textContent = `Characters: ${val.length} | Event triggers: ${onChangeEventCount}`;
      }
    });
  }

  // =========================================================================
  // 11. Interactive Form Submit Simulator (Slide 10)
  // =========================================================================
  const demoForm = document.getElementById('demo-prevent-default-form');
  const demoFormUsername = document.getElementById('demo-form-username');
  const demoFormLog = document.getElementById('demo-form-log');

  if (demoForm && demoFormLog) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Real prevent default
      const user = demoFormUsername ? demoFormUsername.value : 'anonymous';
      const now = new Date().toTimeString().split(' ')[0];

      const entry = document.createElement('div');
      entry.className = 'event-log-entry';
      entry.innerHTML = `
        <span class="event-log-time">${now}</span>
        <span class="event-log-tag">[Submit]</span>
        <span>event.preventDefault() executed! Form data: { username: "${user}" }</span>
      `;
      demoFormLog.prepend(entry);
    });
  }

  // =========================================================================
  // 12. Interactive Mouse Tracker Simulator (Slide 11)
  // =========================================================================
  const hoverZone = document.getElementById('interactive-hover-zone');
  const hoverZoneText = document.getElementById('hover-zone-text');
  const mouseStatusPill = document.getElementById('mouse-status-pill');
  const mouseEventLogs = document.getElementById('mouse-event-logs');

  if (hoverZone && mouseEventLogs) {
    hoverZone.addEventListener('mouseenter', () => {
      hoverZone.style.borderColor = 'var(--react-cyan)';
      hoverZone.style.background = 'rgba(0, 216, 255, 0.08)';
      if (hoverZoneText) hoverZoneText.textContent = 'Pointer Entered Zone! (onMouseEnter)';
      if (mouseStatusPill) {
        mouseStatusPill.textContent = 'Inside Box';
        mouseStatusPill.style.color = 'var(--react-cyan)';
      }

      logMouseEvent('onMouseEnter', 'Mouse cursor entered bounding rectangle');
    });

    hoverZone.addEventListener('mouseleave', () => {
      hoverZone.style.borderColor = 'var(--border-medium)';
      hoverZone.style.background = 'var(--bg-card)';
      if (hoverZoneText) hoverZoneText.textContent = 'Hover Inside This Area';
      if (mouseStatusPill) {
        mouseStatusPill.textContent = 'Outside';
        mouseStatusPill.style.color = 'var(--text-muted)';
      }

      logMouseEvent('onMouseLeave', 'Mouse cursor exited bounding rectangle');
    });

    function logMouseEvent(tag, desc) {
      const now = new Date().toTimeString().split(' ')[0];
      const entry = document.createElement('div');
      entry.className = 'event-log-entry';
      entry.innerHTML = `
        <span class="event-log-time">${now}</span>
        <span class="event-log-tag">[${tag}]</span>
        <span>${desc}</span>
      `;
      mouseEventLogs.prepend(entry);
    }
  }

  // =========================================================================
  // 13. Interactive Keyboard Keypress Inspector (Slide 12)
  // =========================================================================
  const demoKeyInput = document.getElementById('demo-key-input');
  const keyValDisplay = document.getElementById('key-val-display');
  const codeValDisplay = document.getElementById('code-val-display');
  const modifierValDisplay = document.getElementById('modifier-val-display');

  if (demoKeyInput) {
    demoKeyInput.addEventListener('keydown', (e) => {
      if (keyValDisplay) keyValDisplay.textContent = e.key;
      if (codeValDisplay) codeValDisplay.textContent = e.code;

      const mods = [];
      if (e.shiftKey) mods.push('Shift');
      if (e.ctrlKey) mods.push('Ctrl');
      if (e.altKey) mods.push('Alt');
      if (e.metaKey) mods.push('Meta/Cmd');

      if (modifierValDisplay) {
        modifierValDisplay.textContent = mods.length > 0 ? mods.join('+') : 'None';
      }
    });
  }

  // =========================================================================
  // 14. Interactive Ternary Toggle Simulator (Slide 19)
  // =========================================================================
  const demoTernaryToggle = document.getElementById('demo-ternary-toggle');
  const ternaryStateBadge = document.getElementById('ternary-state-badge');
  const demoTernaryHeading = document.getElementById('demo-ternary-heading');
  const demoTernaryBtn = document.getElementById('demo-ternary-btn');

  if (demoTernaryToggle) {
    demoTernaryToggle.addEventListener('change', (e) => {
      const isLogged = e.target.checked;
      if (ternaryStateBadge) {
        ternaryStateBadge.textContent = `isLoggedIn = ${isLogged}`;
        ternaryStateBadge.style.color = isLogged ? 'var(--accent-emerald)' : 'var(--react-cyan)';
      }
      if (demoTernaryHeading) {
        demoTernaryHeading.textContent = isLogged
          ? 'Welcome back, Rahul! (Active Session)'
          : 'Welcome, Guest! Please Sign In.';
      }
      if (demoTernaryBtn) {
        demoTernaryBtn.textContent = isLogged ? 'Logout' : 'Login';
        demoTernaryBtn.className = isLogged ? 'sim-btn secondary' : 'sim-btn';
      }
    });
  }

  // =========================================================================
  // 15. Challenge Solution Toggles (Slides 44, 45, 46)
  // =========================================================================
  function setupSolutionToggle(btnId, containerId) {
    const btn = document.getElementById(btnId);
    const container = document.getElementById(containerId);
    if (!btn || !container) return;

    btn.addEventListener('click', () => {
      const isShown = container.classList.contains('show');
      if (isShown) {
        container.classList.remove('show');
        btn.textContent = 'Show Solution';
      } else {
        container.classList.add('show');
        btn.textContent = 'Hide Solution';
      }
    });
  }

  setupSolutionToggle('btn-toggle-sol-1', 'solution-container-1');
  setupSolutionToggle('btn-toggle-sol-2', 'solution-container-2');
  setupSolutionToggle('btn-toggle-sol-3', 'solution-container-3');

  // =========================================================================
  // 16. Slide 40: Fully Interactive User Management Mini-App Simulator
  // =========================================================================
  let miniAppUsers = [
    { id: 1, name: "Rahul", email: "rahul@gmail.com", active: true, role: "Developer" },
    { id: 2, name: "Anu", email: "anu@gmail.com", active: false, role: "Designer" },
    { id: 3, name: "Priya", email: "priya@gmail.com", active: true, role: "Product Mgr" },
    { id: 4, name: "Karan", email: "karan@gmail.com", active: true, role: "DevOps" },
    { id: 5, name: "Sneha", email: "sneha@gmail.com", active: false, role: "QA Engineer" }
  ];

  let miniAppFilter = 'all'; // 'all', 'active', 'inactive'

  const simUserListContainer = document.getElementById('sim-user-list-container');
  const simAddUserForm = document.getElementById('sim-add-user-form');
  const simInputName = document.getElementById('sim-input-name');
  const simInputEmail = document.getElementById('sim-input-email');
  const simInputRole = document.getElementById('sim-input-role');
  const simStatTotal = document.getElementById('sim-stat-total');
  const simStatActive = document.getElementById('sim-stat-active');
  const simStatInactive = document.getElementById('sim-stat-inactive');
  const simResetBtn = document.getElementById('sim-reset-demo-btn');

  const filterAllBtn = document.getElementById('sim-filter-all');
  const filterActiveBtn = document.getElementById('sim-filter-active');
  const filterInactiveBtn = document.getElementById('sim-filter-inactive');

  function renderMiniApp() {
    if (!simUserListContainer) return;

    // Filter users
    let filtered = miniAppUsers;
    if (miniAppFilter === 'active') {
      filtered = miniAppUsers.filter(u => u.active);
    } else if (miniAppFilter === 'inactive') {
      filtered = miniAppUsers.filter(u => !u.active);
    }

    // Update Counters (Conditional Derived Metrics)
    const total = miniAppUsers.length;
    const activeCount = miniAppUsers.filter(u => u.active).length;
    const inactiveCount = total - activeCount;

    if (simStatTotal) simStatTotal.textContent = `Total: ${total}`;
    if (simStatActive) simStatActive.textContent = `Active: ${activeCount}`;
    if (simStatInactive) simStatInactive.textContent = `Inactive: ${inactiveCount}`;

    // Conditional Empty State
    if (filtered.length === 0) {
      simUserListContainer.innerHTML = `
        <div class="empty-user-state">
          No users match the current filter or all users were deleted!
        </div>
      `;
      return;
    }

    // Render list using simulated Fragment & conditional badges
    simUserListContainer.innerHTML = '';
    filtered.forEach(user => {
      const row = document.createElement('div');
      row.className = 'user-item-row';

      row.innerHTML = `
        <div class="user-info">
          <div class="user-name-title">
            <span>${user.name}</span>
            <span class="user-role-badge">${user.role}</span>
          </div>
          <div class="user-email-text">${user.email}</div>
        </div>

        <div style="display:flex; align-items:center; gap:0.6rem;">
          <!-- Conditional status badge -->
          <span class="status-badge ${user.active ? 'active' : 'inactive'}" style="cursor:pointer;" title="Click to toggle status">
            ${user.active ? '● Active' : '○ Inactive'}
          </span>

          <!-- Delete button passing user.id -->
          <button class="sim-btn danger" style="padding:0.3rem 0.65rem; font-size:0.75rem;" data-id="${user.id}">
            Delete
          </button>
        </div>
      `;

      // Status Toggle Event
      row.querySelector('.status-badge').addEventListener('click', () => {
        user.active = !user.active;
        renderMiniApp();
      });

      // Delete Event
      row.querySelector('.sim-btn.danger').addEventListener('click', () => {
        miniAppUsers = miniAppUsers.filter(u => u.id !== user.id);
        renderMiniApp();
      });

      simUserListContainer.appendChild(row);
    });
  }

  // Handle Add User Form Submission (e.preventDefault() + validation)
  if (simAddUserForm) {
    simAddUserForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = simInputName.value.trim();
      const email = simInputEmail.value.trim();
      const role = simInputRole.value;

      if (!name || !email) {
        showToast('Please provide both name and email!');
        return;
      }

      const newUser = {
        id: Date.now(),
        name,
        email,
        active: true,
        role
      };

      miniAppUsers.push(newUser);
      simInputName.value = '';
      simInputEmail.value = '';
      renderMiniApp();
      showToast(`User ${name} added successfully!`);
    });
  }

  // Filter Buttons
  function updateFilterButtons() {
    [filterAllBtn, filterActiveBtn, filterInactiveBtn].forEach(b => {
      if (b) b.classList.add('secondary');
    });
    if (miniAppFilter === 'all' && filterAllBtn) filterAllBtn.classList.remove('secondary');
    if (miniAppFilter === 'active' && filterActiveBtn) filterActiveBtn.classList.remove('secondary');
    if (miniAppFilter === 'inactive' && filterInactiveBtn) filterInactiveBtn.classList.remove('secondary');
  }

  if (filterAllBtn) {
    filterAllBtn.addEventListener('click', () => {
      miniAppFilter = 'all';
      updateFilterButtons();
      renderMiniApp();
    });
  }
  if (filterActiveBtn) {
    filterActiveBtn.addEventListener('click', () => {
      miniAppFilter = 'active';
      updateFilterButtons();
      renderMiniApp();
    });
  }
  if (filterInactiveBtn) {
    filterInactiveBtn.addEventListener('click', () => {
      miniAppFilter = 'inactive';
      updateFilterButtons();
      renderMiniApp();
    });
  }

  if (simResetBtn) {
    simResetBtn.addEventListener('click', () => {
      miniAppUsers = [
        { id: 1, name: "Rahul", email: "rahul@gmail.com", active: true, role: "Developer" },
        { id: 2, name: "Anu", email: "anu@gmail.com", active: false, role: "Designer" },
        { id: 3, name: "Priya", email: "priya@gmail.com", active: true, role: "Product Mgr" },
        { id: 4, name: "Karan", email: "karan@gmail.com", active: true, role: "DevOps" },
        { id: 5, name: "Sneha", email: "sneha@gmail.com", active: false, role: "QA Engineer" }
      ];
      miniAppFilter = 'all';
      updateFilterButtons();
      renderMiniApp();
      showToast('Reset back to initial 5 users.');
    });
  }

  renderMiniApp();

  // =========================================================================
  // 17. Master Quiz Engine (Slide 47 - 15 Questions)
  // =========================================================================
  const quizItems = [
    {
      q: "1. What is an event in React?",
      options: [
        "A database trigger configured in MongoDB",
        "An action performed by the user or browser that React intercepts (e.g. click, typing, submit)",
        "A special CSS style applied to animated buttons",
        "An internal React lifecycle method reserved only for class components"
      ],
      answer: 1,
      explanation: "Events are user or browser actions like clicks, keystrokes, and form submissions that React detects via synthetic event handlers."
    },
    {
      q: "2. What is wrong with writing: <button onClick={handleClick()}>Click</button>?",
      options: [
        "React requires the event to be spelled in all lowercase: onclick",
        "The function executes immediately during render instead of waiting for a click",
        "Buttons cannot take functions in React",
        "JSX requires inline styles to be defined first"
      ],
      answer: 1,
      explanation: "Adding parentheses calls the function immediately while React is rendering the JSX. You must pass the function reference: onClick={handleClick}."
    },
    {
      q: "3. What property on the event object holds the text entered into an <input />?",
      options: [
        "event.text",
        "event.target.value",
        "event.input.content",
        "event.data.string"
      ],
      answer: 1,
      explanation: "event.target references the DOM element (the input), and event.target.value holds the text typed by the user."
    },
    {
      q: "4. Why do we call event.preventDefault() inside a form onSubmit handler?",
      options: [
        "To stop the browser from performing a hard page reload or navigating away",
        "To clear all inputs automatically",
        "To prevent hackers from submitting forms",
        "To disable React re-rendering"
      ],
      answer: 0,
      explanation: "HTML forms default to reloading the browser on submission. In React SPAs, preventDefault() keeps execution inside client-side JavaScript."
    },
    {
      q: "5. How do you correctly pass an argument (e.g. user ID 10) to an event handler?",
      options: [
        "onClick={deleteUser(10)}",
        "onClick={() => deleteUser(10)}",
        "onClick={deleteUser[10]}",
        "onClick='deleteUser(10)'"
      ],
      answer: 1,
      explanation: "Wrapping the call in an arrow function ensures deleteUser(10) is only invoked when the click event fires, not during render."
    },
    {
      q: "6. What does 'Conditional Rendering' mean in React?",
      options: [
        "Writing CSS media queries for mobile devices",
        "Displaying different UI elements or components depending on conditions/state",
        "Only compiling code when running in production mode",
        "Rendering components only if the internet connection is active"
      ],
      answer: 1,
      explanation: "Conditional rendering is the ability to render different markup or components based on conditions like authentication, loading, or data availability."
    },
    {
      q: "7. Which ternary expression correctly toggles between 'Logout' and 'Login'?",
      options: [
        "{isLoggedIn ? 'Logout' : 'Login'}",
        "{isLoggedIn : 'Logout' ? 'Login'}",
        "{if (isLoggedIn) 'Logout' else 'Login'}",
        "{isLoggedIn && 'Logout' || 'Login'}"
      ],
      answer: 0,
      explanation: "The ternary operator follows: condition ? trueVal : falseVal. If isLoggedIn is true, 'Logout' is rendered; otherwise 'Login'."
    },
    {
      q: "8. What does {error && <p>Error occurred!</p>} render when error is false?",
      options: [
        "An empty <p> tag",
        "The string 'false'",
        "Nothing (React ignores boolean false)",
        "A blank white error screen"
      ],
      answer: 2,
      explanation: "React ignores booleans (false and true) in JSX. When false, nothing is rendered into the DOM."
    },
    {
      q: "9. Why can {todos.length && <TodoList />} accidentally render the number '0' on screen?",
      options: [
        "Because todos.length cannot be accessed inside JSX",
        "Because 0 is a valid number, and React renders numbers rather than ignoring them",
        "Because React has a bug in its compiler",
        "Because length is an asynchronous promise"
      ],
      answer: 1,
      explanation: "In JavaScript, 0 && <TodoList /> evaluates to 0. Since 0 is a number, React renders it! Fix by writing: todos.length > 0 && <TodoList />."
    },
    {
      q: "10. When should you prefer an 'if' statement over a ternary operator in React?",
      options: [
        "Always, ternaries are deprecated in React 18+",
        "When you have complex multi-branch logic, guard clauses, or want early returns outside JSX",
        "Never, if statements are forbidden in React projects",
        "Only when styling with Tailwind CSS"
      ],
      answer: 1,
      explanation: "Standard 'if' statements with early returns are much cleaner than nested ternaries when dealing with loading states, errors, and permissions."
    },
    {
      q: "11. Why does 'return (<h1>A</h1><p>B</p>);' fail with a JSX syntax error?",
      options: [
        "HTML elements must always be capitalized in React",
        "React components must return a single root element (functions return one value)",
        "Paragraph tags cannot follow heading tags in JSX",
        "JSX requires all tags to be closed with an exclamation mark"
      ],
      answer: 1,
      explanation: "JSX compiles to JavaScript function calls (React.createElement). A function cannot return multiple separate values, so a single enclosing root is required."
    },
    {
      q: "12. What is the main benefit of using React Fragment over a <div> wrapper?",
      options: [
        "It groups siblings without injecting an extra unnecessary element into the browser DOM",
        "It speeds up JavaScript execution by 10x",
        "It automatically applies CSS grid styles to all children",
        "It encrypts component data in browser memory"
      ],
      answer: 0,
      explanation: "React Fragment allows grouping multiple elements without polluting the real DOM tree, preventing broken tables, flexbox layouts, and div bloat."
    },
    {
      q: "13. What is the short syntax for React Fragment?",
      options: [
        "<fragment>...</fragment>",
        "<>...</>",
        "<[ ]>...</[ ]>",
        "{fragment ...}"
      ],
      answer: 1,
      explanation: "The short syntax for React Fragment is the empty tag pair <>...</>."
    },
    {
      q: "14. When MUST you use explicit <Fragment key={item.id}> instead of <>... </>?",
      options: [
        "When rendering inside a <form>",
        "When returning multiple sibling elements inside an array .map() where a key is required",
        "When using TypeScript",
        "When the component has more than 5 children"
      ],
      answer: 1,
      explanation: "The short syntax <> cannot accept any attributes or props. When mapping in a list, you must use explicit <Fragment key={...}>."
    },
    {
      q: "15. How does a child component send data back up to its parent component in React?",
      options: [
        "By modifying the parent's props directly",
        "By calling an event handler function passed down to it via props (callback pattern)",
        "By using window.postMessage()",
        "Child components can never communicate with parent components"
      ],
      answer: 1,
      explanation: "Parent passes a function prop (e.g. onDelete={handleDelete}). The child invokes that function on an event, sending data back up to the parent."
    }
  ];

  const quizContainer = document.getElementById('master-quiz-list');
  const quizScoreBadge = document.getElementById('quiz-score-display');
  const resetQuizBtn = document.getElementById('reset-quiz-btn');
  let userQuizAnswers = {};

  function renderMasterQuiz() {
    if (!quizContainer) return;
    quizContainer.innerHTML = '';
    userQuizAnswers = {};

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
          handleQuizChoice(qIdx, parseInt(btn.getAttribute('data-optindex'), 10), card);
        });
      });

      quizContainer.appendChild(card);
    });
  }

  function handleQuizChoice(qIdx, chosenOpt, card) {
    if (userQuizAnswers[qIdx] !== undefined) return;
    userQuizAnswers[qIdx] = chosenOpt;

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

    // Tally score
    let correctCount = 0;
    Object.keys(userQuizAnswers).forEach(k => {
      if (userQuizAnswers[k] === quizItems[k].answer) correctCount++;
    });

    if (quizScoreBadge) {
      quizScoreBadge.textContent = `Score: ${correctCount} / ${quizItems.length}`;
      if (Object.keys(userQuizAnswers).length === quizItems.length) {
        const pct = Math.round((correctCount / quizItems.length) * 100);
        quizScoreBadge.textContent = `Completed! ${correctCount}/${quizItems.length} (${pct}%)`;
      }
    }
  }

  if (resetQuizBtn) {
    resetQuizBtn.addEventListener('click', renderMasterQuiz);
  }

  // =========================================================================
  // 18. Searchable Cheat Sheet (Slide 50)
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
  // 19. Unified React Interactive Lab (Slide 51)
  // =========================================================================
  const labBtnClick = document.getElementById('lab-btn-click');
  const labInputType = document.getElementById('lab-input-type');
  const labBtnArg = document.getElementById('lab-btn-arg');
  const labEventFeed = document.getElementById('lab-event-feed');

  function logLabEvent(tag, message) {
    if (!labEventFeed) return;
    const now = new Date().toTimeString().split(' ')[0];
    const entry = document.createElement('div');
    entry.className = 'event-log-entry';
    entry.innerHTML = `
      <span class="event-log-time">${now}</span>
      <span class="event-log-tag">[${tag}]</span>
      <span>${message}</span>
    `;
    labEventFeed.prepend(entry);
  }

  if (labBtnClick) {
    labBtnClick.addEventListener('click', () => logLabEvent('onClick', 'Button clicked! (handler reference executed)'));
  }
  if (labInputType) {
    labInputType.addEventListener('input', (e) => logLabEvent('onChange', `Value updated: "${e.target.value}"`));
  }
  if (labBtnArg) {
    labBtnArg.addEventListener('click', () => logLabEvent('onClick(ID)', 'Arrow function executed: deleteUser(99)'));
  }

  // Tool 2: Condition Toggler
  const labToggleLoading = document.getElementById('lab-toggle-loading');
  const labToggleError = document.getElementById('lab-toggle-error');
  const labToggleAuth = document.getElementById('lab-toggle-auth');
  const labConditionOutput = document.getElementById('lab-condition-output');

  function updateLabCondition() {
    if (!labConditionOutput) return;
    if (labToggleLoading && labToggleLoading.checked) {
      labConditionOutput.innerHTML = `<span style="color:var(--accent-amber);">⏳ Loading data...</span>`;
      return;
    }
    if (labToggleError && labToggleError.checked) {
      labConditionOutput.innerHTML = `<span style="color:var(--accent-rose);">⚠️ Error: Server Unavailable!</span>`;
      return;
    }
    if (labToggleAuth && labToggleAuth.checked) {
      labConditionOutput.innerHTML = `<span style="color:var(--accent-emerald);">✓ Logged In: Welcome, Admin!</span>`;
      return;
    }
    labConditionOutput.innerHTML = `<span>Viewing as Guest (Please Login)</span>`;
  }

  if (labToggleLoading) labToggleLoading.addEventListener('change', updateLabCondition);
  if (labToggleError) labToggleError.addEventListener('change', updateLabCondition);
  if (labToggleAuth) labToggleAuth.addEventListener('change', updateLabCondition);

  // Tool 3: Fragment Inspector
  const labBtnUseDiv = document.getElementById('lab-btn-usediv');
  const labBtnUseFrag = document.getElementById('lab-btn-usefrag');
  const labFragmentDom = document.getElementById('lab-fragment-dom');

  if (labBtnUseDiv && labFragmentDom) {
    labBtnUseDiv.addEventListener('click', () => {
      labBtnUseDiv.className = 'sim-btn';
      if (labBtnUseFrag) labBtnUseFrag.className = 'sim-btn secondary';
      labFragmentDom.innerHTML = `
        &lt;div class="wrapper"&gt; <span style="color:var(--accent-rose);">&lt;!-- EXTRA DOM ELEMENT --&gt;</span><br>
        &nbsp;&nbsp;&lt;h3&gt;Title&lt;/h3&gt;<br>
        &nbsp;&nbsp;&lt;p&gt;Unnecessary div in DOM&lt;/p&gt;<br>
        &lt;/div&gt;
      `;
    });
  }

  if (labBtnUseFrag && labFragmentDom) {
    labBtnUseFrag.addEventListener('click', () => {
      labBtnUseFrag.className = 'sim-btn';
      if (labBtnUseDiv) labBtnUseDiv.className = 'sim-btn secondary';
      labFragmentDom.innerHTML = `
        &lt;&gt; <span style="color:var(--accent-emerald);">&lt;!-- ZERO EXTRA DOM NODES --&gt;</span><br>
        &nbsp;&nbsp;&lt;h3&gt;Title&lt;/h3&gt;<br>
        &nbsp;&nbsp;&lt;p&gt;Clean DOM&lt;/p&gt;<br>
        &lt;/&gt;
      `;
    });
  }

  // =========================================================================
  // 20. Initialization
  // =========================================================================
  buildTOC();
  renderMasterQuiz();
  handleHashNavigation();
});
