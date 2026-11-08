/**
 * Node.js + Generative AI — Day 1: Foundations of GenAI
 * Interactive Slide Presentation Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // DOM Elements
  // -------------------------------------------------------------------------
  const slides = Array.from(document.querySelectorAll('.slide'));
  const totalSlides = slides.length;
  let currentSlideIndex = 0;

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const slideCounter = document.getElementById('slideCounter');
  const progressBar = document.getElementById('progressBar');

  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const tocBtn = document.getElementById('tocBtn');
  const tocModal = document.getElementById('tocModal');
  const tocCloseBtn = document.getElementById('tocCloseBtn');
  const tocList = document.getElementById('tocList');

  const helpBtn = document.getElementById('helpBtn');
  const helpModal = document.getElementById('helpModal');
  const helpCloseBtn = document.getElementById('helpCloseBtn');

  // -------------------------------------------------------------------------
  // Populate Table of Contents
  // -------------------------------------------------------------------------
  if (tocList) {
    tocList.innerHTML = '';
    slides.forEach((slide, index) => {
      const titleElem = slide.querySelector('.slide-title');
      const titleText = titleElem ? titleElem.innerText.replace(/\s+/g, ' ').trim() : `Slide ${index + 1}`;
      
      const item = document.createElement('div');
      item.className = `toc-item ${index === 0 ? 'active-slide' : ''}`;
      item.dataset.index = index;
      item.innerHTML = `
        <span style="font-family: var(--font-mono); font-weight:700; color:var(--accent-cyan);">
          ${String(index + 1).padStart(2, '0')}.
        </span>
        <span style="flex:1; margin-left:0.75rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
          ${titleText}
        </span>
        <span style="font-size:0.8rem; color:var(--text-muted);">Jump ↵</span>
      `;
      item.addEventListener('click', () => {
        goToSlide(index);
        closeModals();
      });
      tocList.appendChild(item);
    });
  }

  // -------------------------------------------------------------------------
  // Slide Navigation Functions
  // -------------------------------------------------------------------------
  function updateSlide(index) {
    if (index < 0 || index >= totalSlides) return;

    // Remove active class from old slide
    slides[currentSlideIndex].classList.remove('active');
    
    // Update current index
    currentSlideIndex = index;

    // Activate new slide
    slides[currentSlideIndex].classList.add('active');

    // Update Counter (e.g. 03 / 12)
    if (slideCounter) {
      slideCounter.textContent = `${String(currentSlideIndex + 1).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}`;
    }

    // Update Progress Bar
    if (progressBar) {
      const pct = ((currentSlideIndex + 1) / totalSlides) * 100;
      progressBar.style.width = `${pct}%`;
    }

    // Update Button States
    if (prevBtn) prevBtn.disabled = currentSlideIndex === 0;
    if (nextBtn) nextBtn.disabled = currentSlideIndex === totalSlides - 1;

    // Update active state in TOC
    if (tocList) {
      const items = tocList.querySelectorAll('.toc-item');
      items.forEach((item, idx) => {
        if (idx === currentSlideIndex) {
          item.classList.add('active-slide');
        } else {
          item.classList.remove('active-slide');
        }
      });
    }

    // Update Hash in URL
    window.location.hash = `#${currentSlideIndex + 1}`;

    // Highlight code blocks on current slide if Prism is available
    if (window.Prism) {
      Prism.highlightAllUnder(slides[currentSlideIndex]);
    }
  }

  function nextSlide() {
    if (currentSlideIndex < totalSlides - 1) {
      updateSlide(currentSlideIndex + 1);
    }
  }

  function prevSlide() {
    if (currentSlideIndex > 0) {
      updateSlide(currentSlideIndex - 1);
    }
  }

  function goToSlide(index) {
    updateSlide(index);
  }

  // -------------------------------------------------------------------------
  // Event Listeners for Nav Buttons
  // -------------------------------------------------------------------------
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  // -------------------------------------------------------------------------
  // Keyboard Shortcuts
  // -------------------------------------------------------------------------
  document.addEventListener('keydown', (e) => {
    // If inside an input or textarea, ignore shortcuts
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

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
      toggleToc();
    } else if (e.key === '?' || (e.shiftKey && e.key === '/')) {
      e.preventDefault();
      toggleHelp();
    } else if (e.key === 'Escape') {
      closeModals();
    }
  });

  // -------------------------------------------------------------------------
  // Touch / Swipe Navigation for Mobile
  // -------------------------------------------------------------------------
  let touchStartX = 0;
  let touchStartY = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    // Minimum swipe threshold of 50px and mostly horizontal
    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        nextSlide(); // Swiped left -> next
      } else {
        prevSlide(); // Swiped right -> prev
      }
    }
  }, { passive: true });

  // -------------------------------------------------------------------------
  // Fullscreen Management
  // -------------------------------------------------------------------------
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

  // -------------------------------------------------------------------------
  // Modals (TOC and Help)
  // -------------------------------------------------------------------------
  function closeModals() {
    if (tocModal) tocModal.classList.remove('active');
    if (helpModal) helpModal.classList.remove('active');
  }

  function toggleToc() {
    if (tocModal) {
      const isActive = tocModal.classList.contains('active');
      closeModals();
      if (!isActive) tocModal.classList.add('active');
    }
  }

  function toggleHelp() {
    if (helpModal) {
      const isActive = helpModal.classList.contains('active');
      closeModals();
      if (!isActive) helpModal.classList.add('active');
    }
  }

  if (tocBtn) tocBtn.addEventListener('click', toggleToc);
  if (tocCloseBtn) tocCloseBtn.addEventListener('click', closeModals);
  if (helpBtn) helpBtn.addEventListener('click', toggleHelp);
  if (helpCloseBtn) helpCloseBtn.addEventListener('click', closeModals);

  // Close modals when clicking backdrop
  [tocModal, helpModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModals();
      });
    }
  });

  // -------------------------------------------------------------------------
  // Code Copy Buttons
  // -------------------------------------------------------------------------
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const codeContainer = btn.closest('.code-container');
      const codeElem = codeContainer ? codeContainer.querySelector('code') : null;
      if (!codeElem) return;

      const codeText = codeElem.innerText;
      try {
        await navigator.clipboard.writeText(codeText);
        const originalText = btn.innerHTML;
        btn.innerHTML = `<span style="color:var(--accent-emerald)">✓ Copied!</span>`;
        btn.style.borderColor = 'var(--accent-emerald)';
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.borderColor = '';
        }, 2000);
      } catch (err) {
        btn.textContent = 'Failed';
        setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
      }
    });
  });

  // -------------------------------------------------------------------------
  // Handle URL Hash on Load
  // -------------------------------------------------------------------------
  function handleHash() {
    const hash = window.location.hash.replace('#', '');
    const slideNum = parseInt(hash, 10);
    if (!isNaN(slideNum) && slideNum >= 1 && slideNum <= totalSlides) {
      updateSlide(slideNum - 1);
    } else {
      updateSlide(0);
    }
  }

  window.addEventListener('hashchange', handleHash);
  handleHash();
});

