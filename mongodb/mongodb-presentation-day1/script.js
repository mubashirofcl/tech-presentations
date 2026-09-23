/**
 * MongoDB Week Teaching Presentation Engine
 * Features:
 * - Hash-based slide navigation (#slide-1, #slide-2, ...)
 * - Full keyboard controls (Arrow keys, Space, Home, End, F, S, T, Esc)
 * - Dynamic Table of Contents (Syllabus drawer)
 * - Live Teacher Speaker Notes Drawer with 5 structured prompt categories
 * - Real-time slide search and jump
 * - Interactive mongosh CRUD Simulator Sandbox
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

    if (slideCounter) {
      slideCounter.textContent = `Slide ${currentSlideIndex + 1} of ${totalSlides}`;
    }

    if (progressBarFill) {
      const percent = ((currentSlideIndex + 1) / totalSlides) * 100;
      progressBarFill.style.width = `${percent}%`;
    }

    const section = activeSlide.getAttribute('data-section') || 'MongoDB Week';
    const title = activeSlide.getAttribute('data-title') || 'Presentation';

    if (headerDayTitle) headerDayTitle.textContent = title;
    if (headerSectionBadge) headerSectionBadge.textContent = section;

    if (prevBtn) prevBtn.disabled = currentSlideIndex === 0;
    if (nextBtn) nextBtn.disabled = currentSlideIndex === totalSlides - 1;

    const tocItems = document.querySelectorAll('.toc-item');
    tocItems.forEach((item, idx) => {
      if (idx === currentSlideIndex) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

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
        TEACHER NOTES • SLIDE ${currentSlideIndex + 1}: ${slideEl.getAttribute('data-title')}
      </div>

      <div class="speaker-note-card">
        <div class="speaker-note-header intro">
          🎤 How to Introduce This Concept
        </div>
        <div class="speaker-note-body">${intro}</div>
      </div>

      <div class="speaker-note-card">
        <div class="speaker-note-header analogy">
          💡 Real-World Analogy
        </div>
        <div class="speaker-note-body">${analogy}</div>
      </div>

      <div class="speaker-note-card">
        <div class="speaker-note-header misunderstand">
          ⚠️ Common Student Confusion
        </div>
        <div class="speaker-note-body">${misunderstand}</div>
      </div>

      <div class="speaker-note-card">
        <div class="speaker-note-header example">
          🗣️ Practical Verbal Demonstration
        </div>
        <div class="speaker-note-body">${example}</div>
      </div>

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

  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (firstSlideBtn) firstSlideBtn.addEventListener('click', () => goToSlide(0));
  if (lastSlideBtn) lastSlideBtn.addEventListener('click', () => goToSlide(totalSlides - 1));

  // Touch Navigation for Tablets
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 50) nextSlide();
    if (touchEndX > touchStartX + 50) prevSlide();
  }, { passive: true });

  // =========================================================================
  // 9. Interactive mongosh CRUD Simulator
  // =========================================================================
  let simulatedDb = [];

  const simTerminal = document.getElementById('sim-terminal');
  const simInsertBtn = document.getElementById('sim-insert-btn');
  const simInsertManyBtn = document.getElementById('sim-insertmany-btn');
  const simFindBtn = document.getElementById('sim-find-btn');
  const simFindOneBtn = document.getElementById('sim-findone-btn');
  const simFilterBtn = document.getElementById('sim-filter-btn');
  const simUpdateBtn = document.getElementById('sim-update-btn');
  const simDeleteBtn = document.getElementById('sim-delete-btn');
  const simResetBtn = document.getElementById('sim-reset-btn');

  function appendTerminal(cmd, output) {
    if (!simTerminal) return;
    const block = document.createElement('div');
    block.style.marginTop = '0.5rem';
    block.innerHTML = `
      <div style="color: var(--term-prompt); font-weight: bold;">school&gt; <span style="color: var(--term-cmd);">${cmd}</span></div>
      <div style="color: #F8FAFC; margin-top: 0.2rem; white-space: pre;">${output}</div>
    `;
    simTerminal.appendChild(block);
    simTerminal.scrollTop = simTerminal.scrollHeight;
  }

  if (simInsertBtn) {
    simInsertBtn.addEventListener('click', () => {
      const doc = { _id: "ObjectId('6501a1b2c3d4e5f6')", name: "Mubashir", age: 23, course: "MERN", isActive: true };
      const exists = simulatedDb.find(d => d.name === "Mubashir");
      if (!exists) simulatedDb.push(doc);

      appendTerminal(
        'db.students.insertOne({ name: "Mubashir", age: 23, course: "MERN", isActive: true })',
        `{ acknowledged: true, insertedId: ${doc._id} }`
      );
    });
  }

  if (simInsertManyBtn) {
    simInsertManyBtn.addEventListener('click', () => {
      const batch = [
        { _id: "ObjectId('6501b2c3d4e5f6a1')", name: "John", age: 22, course: "MERN" },
        { _id: "ObjectId('6501c3d4e5f6a1b2')", name: "Sarah", age: 24, course: "Python" },
        { _id: "ObjectId('6501d4e5f6a1b2c3')", name: "Alex", age: 21, course: "MERN" }
      ];

      batch.forEach(item => {
        if (!simulatedDb.find(d => d.name === item.name)) simulatedDb.push(item);
      });

      appendTerminal(
        'db.students.insertMany([ { name: "John", ... }, { name: "Sarah", ... }, { name: "Alex", ... } ])',
        `{ acknowledged: true, insertedCount: ${batch.length} }`
      );
    });
  }

  if (simFindBtn) {
    simFindBtn.addEventListener('click', () => {
      if (simulatedDb.length === 0) {
        appendTerminal('db.students.find()', '/* Empty collection. Click insert first! */');
      } else {
        const jsonStr = JSON.stringify(simulatedDb, null, 2);
        appendTerminal('db.students.find()', jsonStr);
      }
    });
  }

  if (simFindOneBtn) {
    simFindOneBtn.addEventListener('click', () => {
      const doc = simulatedDb.find(d => d.name === "Mubashir");
      if (doc) {
        appendTerminal('db.students.findOne({ name: "Mubashir" })', JSON.stringify(doc, null, 2));
      } else {
        appendTerminal('db.students.findOne({ name: "Mubashir" })', 'null');
      }
    });
  }

  if (simFilterBtn) {
    simFilterBtn.addEventListener('click', () => {
      const matches = simulatedDb.filter(d => d.age > 21);
      appendTerminal('db.students.find({ age: { $gt: 21 } })', JSON.stringify(matches, null, 2));
    });
  }

  if (simUpdateBtn) {
    simUpdateBtn.addEventListener('click', () => {
      const doc = simulatedDb.find(d => d.name === "Mubashir");
      if (doc) {
        doc.age = 24;
        appendTerminal(
          'db.students.updateOne({ name: "Mubashir" }, { $set: { age: 24 } })',
          '{ acknowledged: true, matchedCount: 1, modifiedCount: 1 }'
        );
      } else {
        appendTerminal(
          'db.students.updateOne({ name: "Mubashir" }, { $set: { age: 24 } })',
          '{ acknowledged: true, matchedCount: 0, modifiedCount: 0 }'
        );
      }
    });
  }

  if (simDeleteBtn) {
    simDeleteBtn.addEventListener('click', () => {
      const idx = simulatedDb.findIndex(d => d.name === "Alex");
      if (idx !== -1) {
        simulatedDb.splice(idx, 1);
        appendTerminal('db.students.deleteOne({ name: "Alex" })', '{ acknowledged: true, deletedCount: 1 }');
      } else {
        appendTerminal('db.students.deleteOne({ name: "Alex" })', '{ acknowledged: true, deletedCount: 0 }');
      }
    });
  }

  if (simResetBtn) {
    simResetBtn.addEventListener('click', () => {
      simulatedDb = [];
      if (simTerminal) {
        simTerminal.innerHTML = `
          <div style="color: #00ED64;">Current database: school</div>
          <div style="color: var(--term-comment);">// Database reset to empty state. Click 1. insertOne to begin...</div>
        `;
      }
    });
  }

  // =========================================================================
  // 10. Revision Accordion Answer Revealer
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
  // 11. Initialize
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
    btn.style.color = '#00ED64';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.color = '';
    }, 1800);
  }).catch(() => {});
}
