/**
 * React.js Week 1 Complete Teaching Presentation Engine
 * Features:
 * - Hash-based slide navigation (#slide-1, #slide-2, ...)
 * - Full keyboard controls (Arrow keys, Space, Home, End, F, S, T, Esc)
 * - Dynamic Table of Contents (Syllabus drawer)
 * - Live Teacher Speaker Notes Drawer with 5 structured prompt categories
 * - Real-time slide search and jump
 * - Interactive Teaching Sandboxes (Live Counter & Lifting State Up)
 * - Accordion answer reveal for Revision questions
 * - Code copy-to-clipboard functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const slides = Array.from(document.querySelectorAll('.slide'));
  const totalSlides = slides.length;
  let currentSlideIndex = 0;

  // Header & Navigation Elements
  const headerDayTitle = document.getElementById('header-day-title');
  const headerSectionBadge = document.getElementById('header-section-badge');
  const progressBarFill = document.getElementById('progress-bar-fill');
  const slideCounter = document.getElementById('slide-counter');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const firstSlideBtn = document.getElementById('first-slide-btn');
  const lastSlideBtn = document.getElementById('last-slide-btn');
  const searchInput = document.getElementById('search-input');
  const fullscreenBtn = document.getElementById('fullscreen-btn');

  // Drawers
  const tocBtn = document.getElementById('toc-btn');
  const closeTocBtn = document.getElementById('close-toc-btn');
  const tocDrawer = document.getElementById('toc-drawer');
  const tocList = document.getElementById('toc-list');

  const teacherNotesBtn = document.getElementById('teacher-notes-btn');
  const closeNotesBtn = document.getElementById('close-notes-btn');
  const speakerNotesDrawer = document.getElementById('speaker-notes-drawer');
  const speakerNotesContent = document.getElementById('speaker-notes-content');
  const drawerOverlay = document.getElementById('drawer-overlay');

  // =========================================================================
  // 1. Build Dynamic Table of Contents
  // =========================================================================
  function buildTOC() {
    if (!tocList) return;
    tocList.innerHTML = '';

    let currentSection = '';

    slides.forEach((slide, idx) => {
      const section = slide.getAttribute('data-section') || 'General';
      const title = slide.getAttribute('data-title') || `Slide ${idx + 1}`;

      // Insert section header if section changes
      if (section !== currentSection) {
        currentSection = section;
        const sectionHeader = document.createElement('div');
        sectionHeader.className = 'toc-section-title';
        sectionHeader.textContent = section;
        tocList.appendChild(sectionHeader);
      }

      // Slide item button
      const item = document.createElement('a');
      item.className = 'toc-item';
      item.href = `#slide-${idx + 1}`;
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

  // =========================================================================
  // 2. Slide Navigation Logic
  // =========================================================================
  function goToSlide(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;

    slides.forEach((slide, idx) => {
      if (idx === index) {
        slide.classList.add('active');
        slide.scrollTop = 0;
      } else {
        slide.classList.remove('active');
      }
    });

    currentSlideIndex = index;
    updateUI();
    window.location.hash = `#slide-${currentSlideIndex + 1}`;
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

  function updateUI() {
    const activeSlide = slides[currentSlideIndex];
    if (!activeSlide) return;

    // Update Counter & Progress Bar
    if (slideCounter) {
      slideCounter.textContent = `Slide ${currentSlideIndex + 1} of ${totalSlides}`;
    }

    if (progressBarFill) {
      const percent = ((currentSlideIndex + 1) / totalSlides) * 100;
      progressBarFill.style.width = `${percent}%`;
    }

    // Update Header Badges
    const section = activeSlide.getAttribute('data-section') || 'React Week 1';
    const title = activeSlide.getAttribute('data-title') || 'Presentation';

    if (headerDayTitle) headerDayTitle.textContent = title;
    if (headerSectionBadge) headerSectionBadge.textContent = section;

    // Prev / Next button states
    if (prevBtn) prevBtn.disabled = currentSlideIndex === 0;
    if (nextBtn) nextBtn.disabled = currentSlideIndex === totalSlides - 1;

    // Highlight active in TOC
    const tocItems = document.querySelectorAll('.toc-item');
    tocItems.forEach((item, idx) => {
      if (idx === currentSlideIndex) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Refresh Speaker Notes
    populateSpeakerNotes(activeSlide);
  }

  // =========================================================================
  // 3. Populate Teacher Speaker Notes
  // =========================================================================
  function populateSpeakerNotes(slideEl) {
    if (!speakerNotesContent) return;

    const notesData = slideEl.querySelector('.speaker-notes-data');
    if (!notesData) {
      speakerNotesContent.innerHTML = `
        <div class="speaker-note-card">
          <div class="speaker-note-header intro">Teacher Notes</div>
          <div class="speaker-note-body">Present the concepts on this slide cleanly and encourage student questions.</div>
        </div>
      `;
      return;
    }

    const intro = notesData.querySelector('[data-intro]')?.getAttribute('data-intro') || '';
    const analogy = notesData.querySelector('[data-analogy]')?.getAttribute('data-analogy') || '';
    const misunderstand = notesData.querySelector('[data-misunderstand]')?.getAttribute('data-misunderstand') || '';
    const example = notesData.querySelector('[data-example]')?.getAttribute('data-example') || '';
    const question = notesData.querySelector('[data-question]')?.getAttribute('data-question') || '';

    speakerNotesContent.innerHTML = `
      <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-subtle); margin-bottom: 0.25rem;">
        NOTES FOR SLIDE ${currentSlideIndex + 1}: ${slideEl.getAttribute('data-title')}
      </div>

      <!-- 1. How to Introduce -->
      <div class="speaker-note-card">
        <div class="speaker-note-header intro">
          🎤 How to Introduce This Concept
        </div>
        <div class="speaker-note-body">${intro}</div>
      </div>

      <!-- 2. Real-World Analogy -->
      <div class="speaker-note-card">
        <div class="speaker-note-header analogy">
          💡 Real-World Analogy
        </div>
        <div class="speaker-note-body">${analogy}</div>
      </div>

      <!-- 3. What Students Commonly Misunderstand -->
      <div class="speaker-note-card">
        <div class="speaker-note-header misunderstand">
          ⚠️ Common Student Misunderstanding
        </div>
        <div class="speaker-note-body">${misunderstand}</div>
      </div>

      <!-- 4. Short Verbal Example -->
      <div class="speaker-note-card">
        <div class="speaker-note-header example">
          🗣️ Short Verbal Demonstration
        </div>
        <div class="speaker-note-body">${example}</div>
      </div>

      <!-- 5. Question to Ask Students -->
      <div class="speaker-note-card">
        <div class="speaker-note-header question">
          ❓ Question to Ask the Class
        </div>
        <div class="speaker-note-body"><strong>"${question}"</strong></div>
      </div>
    `;
  }

  // =========================================================================
  // 4. Hash Routing
  // =========================================================================
  function getSlideIndexFromHash() {
    const hash = window.location.hash;
    const match = hash.match(/#slide-(\d+)/);
    if (match) {
      const num = parseInt(match[1], 10) - 1;
      if (num >= 0 && num < totalSlides) return num;
    }
    return 0;
  }

  window.addEventListener('hashchange', () => {
    const targetIdx = getSlideIndexFromHash();
    if (targetIdx !== currentSlideIndex) {
      goToSlide(targetIdx);
    }
  });

  // =========================================================================
  // 5. Drawer Controls
  // =========================================================================
  function openTOC() {
    closeAllDrawers();
    if (tocDrawer) tocDrawer.classList.add('active');
    if (drawerOverlay) drawerOverlay.classList.add('active');
    if (tocBtn) tocBtn.classList.add('active');
  }

  function openSpeakerNotes() {
    closeAllDrawers();
    if (speakerNotesDrawer) speakerNotesDrawer.classList.add('active');
    if (drawerOverlay) drawerOverlay.classList.add('active');
    if (teacherNotesBtn) teacherNotesBtn.classList.add('active');
  }

  function closeAllDrawers() {
    if (tocDrawer) tocDrawer.classList.remove('active');
    if (speakerNotesDrawer) speakerNotesDrawer.classList.remove('active');
    if (drawerOverlay) drawerOverlay.classList.remove('active');
    if (tocBtn) tocBtn.classList.remove('active');
    if (teacherNotesBtn) teacherNotesBtn.classList.remove('active');
  }

  if (tocBtn) {
    tocBtn.addEventListener('click', () => {
      if (tocDrawer && tocDrawer.classList.contains('active')) {
        closeAllDrawers();
      } else {
        openTOC();
      }
    });
  }

  if (closeTocBtn) closeTocBtn.addEventListener('click', closeAllDrawers);

  if (teacherNotesBtn) {
    teacherNotesBtn.addEventListener('click', () => {
      if (speakerNotesDrawer && speakerNotesDrawer.classList.contains('active')) {
        closeAllDrawers();
      } else {
        openSpeakerNotes();
      }
    });
  }

  if (closeNotesBtn) closeNotesBtn.addEventListener('click', closeAllDrawers);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeAllDrawers);

  // =========================================================================
  // 6. Search Bar Filter
  // =========================================================================
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (!query) return;

      const foundIdx = slides.findIndex((slide) => {
        const title = (slide.getAttribute('data-title') || '').toLowerCase();
        const section = (slide.getAttribute('data-section') || '').toLowerCase();
        const text = slide.textContent.toLowerCase();
        return title.includes(query) || section.includes(query) || text.includes(query);
      });

      if (foundIdx !== -1) {
        goToSlide(foundIdx);
      }
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        searchInput.blur();
      }
    });
  }

  // =========================================================================
  // 7. Fullscreen Toggle
  // =========================================================================
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', toggleFullscreen);
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }

  // =========================================================================
  // 8. Keyboard Navigation
  // =========================================================================
  document.addEventListener('keydown', (e) => {
    // Avoid intercepting input while typing in search or live text input
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      if (e.key === 'Escape') document.activeElement.blur();
      return;
    }

    switch (e.key) {
      case 'ArrowRight':
      case 'Space':
      case 'PageDown':
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
        goToSlide(0);
        break;

      case 'End':
        e.preventDefault();
        goToSlide(totalSlides - 1);
        break;

      case 's':
      case 'S':
        e.preventDefault();
        if (speakerNotesDrawer && speakerNotesDrawer.classList.contains('active')) {
          closeAllDrawers();
        } else {
          openSpeakerNotes();
        }
        break;

      case 't':
      case 'T':
        e.preventDefault();
        if (tocDrawer && tocDrawer.classList.contains('active')) {
          closeAllDrawers();
        } else {
          openTOC();
        }
        break;

      case 'f':
      case 'F':
        e.preventDefault();
        toggleFullscreen();
        break;

      case 'Escape':
        closeAllDrawers();
        break;
    }
  });

  // Footer Button Event Listeners
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (firstSlideBtn) firstSlideBtn.addEventListener('click', () => goToSlide(0));
  if (lastSlideBtn) lastSlideBtn.addEventListener('click', () => goToSlide(totalSlides - 1));

  // Touch Swipe for Mobile / Tablets
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const threshold = 50;
    if (touchEndX < touchStartX - threshold) {
      nextSlide(); // Swipe left
    }
    if (touchEndX > touchStartX + threshold) {
      prevSlide(); // Swipe right
    }
  }

  // =========================================================================
  // 9. Interactive Teaching Sandbox: State Counter
  // =========================================================================
  let demoCount = 0;
  let demoRenderCount = 1;

  const demoCountVal = document.getElementById('demo-count-val');
  const demoRenderCountEl = document.getElementById('demo-render-count');
  const demoPrevValEl = document.getElementById('demo-prev-val');
  const demoIncBtn = document.getElementById('demo-inc-btn');
  const demoDecBtn = document.getElementById('demo-dec-btn');
  const demoResetBtn = document.getElementById('demo-reset-btn');

  function updateCounterDemo(prevVal) {
    if (demoCountVal) demoCountVal.textContent = demoCount;
    demoRenderCount++;
    if (demoRenderCountEl) demoRenderCountEl.textContent = demoRenderCount;
    if (demoPrevValEl) demoPrevValEl.textContent = prevVal;

    // Flash animation to simulate DOM patch
    if (demoCountVal) {
      demoCountVal.style.transform = 'scale(1.15)';
      demoCountVal.style.color = '#10B981';
      setTimeout(() => {
        demoCountVal.style.transform = 'scale(1)';
        demoCountVal.style.color = 'var(--primary)';
      }, 150);
    }
  }

  if (demoIncBtn) {
    demoIncBtn.addEventListener('click', () => {
      const prev = demoCount;
      demoCount++;
      updateCounterDemo(prev);
    });
  }

  if (demoDecBtn) {
    demoDecBtn.addEventListener('click', () => {
      const prev = demoCount;
      demoCount--;
      updateCounterDemo(prev);
    });
  }

  if (demoResetBtn) {
    demoResetBtn.addEventListener('click', () => {
      const prev = demoCount;
      demoCount = 0;
      updateCounterDemo(prev);
    });
  }

  // =========================================================================
  // 10. Interactive Teaching Sandbox: Lifting State Up
  // =========================================================================
  const liveSiblingInput = document.getElementById('live-sibling-input');
  const liveParentState = document.getElementById('live-parent-state');
  const liveSiblingDisplay = document.getElementById('live-sibling-display');

  if (liveSiblingInput) {
    liveSiblingInput.addEventListener('input', (e) => {
      const text = e.target.value;

      // 1. Update Parent State Box
      if (liveParentState) {
        liveParentState.textContent = text ? `Current State: "${text}"` : 'Current State: "" (empty)';
      }

      // 2. Update Sibling Display Box via Parent Props
      if (liveSiblingDisplay) {
        if (text.trim()) {
          liveSiblingDisplay.textContent = `Hello, ${text}!`;
          liveSiblingDisplay.style.color = 'var(--primary)';
        } else {
          liveSiblingDisplay.textContent = 'Waiting for input...';
          liveSiblingDisplay.style.color = 'var(--text-subtle)';
        }
      }
    });
  }

  // =========================================================================
  // 11. Revision Accordion Answer Revealer
  // =========================================================================
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');
  accordionTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      if (item) {
        item.classList.toggle('active');
      }
    });
  });

  // =========================================================================
  // 12. Initialization
  // =========================================================================
  buildTOC();
  const initialIndex = getSlideIndexFromHash();
  goToSlide(initialIndex);
});

// Global Copy Code Helper
function copyCode(btn) {
  const codeBlock = btn.closest('.code-block');
  if (!codeBlock) return;
  const pre = codeBlock.querySelector('.code-content');
  if (!pre) return;

  navigator.clipboard.writeText(pre.innerText).then(() => {
    const originalText = btn.textContent;
    btn.textContent = 'Copied!';
    btn.style.color = '#10B981';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.color = '';
    }, 1800);
  }).catch(() => {});
}
