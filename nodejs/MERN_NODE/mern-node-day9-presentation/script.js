/**
 * MERN Node.js Day 9 — File Uploads, Axios & Environment Variables
 * Interactive Slide Presentation Controller & Student Lab Sandboxes
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // SLIDE CONTROLLER & STATE
  // =========================================================================
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  let currentSlide = 1;

  // DOM Elements
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const slideCounter = document.getElementById('slideCounter');
  const progressFill = document.getElementById('progressFill');
  const sectionIndicator = document.getElementById('sectionIndicator');
  const tocBtn = document.getElementById('tocBtn');
  const tocOverlay = document.getElementById('tocOverlay');
  const tocClose = document.getElementById('tocClose');
  const tocList = document.getElementById('tocList');
  const helpBtn = document.getElementById('helpBtn');
  const helpModal = document.getElementById('helpModal');
  const helpClose = document.getElementById('helpClose');
  const fullscreenBtn = document.getElementById('fullscreenBtn');

  // Slide categories map for the top bar indicator
  const slideCategories = {
    1: 'Welcome & Overview',
    2: 'Student Profile Architecture',
    3: 'Environment Variables (dotenv)',
    4: 'Installing & Loading dotenv',
    5: 'Practical: dotenv & .gitignore',
    6: 'File Uploads & multipart',
    7: 'What Is Multer Middleware',
    8: 'Disk vs Memory Storage',
    9: 'Hands-on: File Upload API',
    10: 'Understanding req.file',
    11: 'File Validation & Error Handling',
    12: 'Introduction to Axios',
    13: 'Axios HTTP Methods',
    14: 'Practical: Connect React & Express',
    15: 'Axios POST & Error Handling',
    16: 'Practical: Upload with Axios',
    17: 'Full Student Profile Integration',
    18: 'Recap & Practical Challenge'
  };

  /**
   * Initialize Presentation
   */
  function initPresentation() {
    buildToc();
    handleHashNavigation();
    updateUI();
  }

  /**
   * Navigate to a specific slide index (1-based)
   */
  function goToSlide(slideNum) {
    if (slideNum < 1 || slideNum > totalSlides) return;

    // Remove active state from current slide
    const currentElem = document.querySelector(`.slide[data-slide="${currentSlide}"]`);
    if (currentElem) {
      currentElem.classList.remove('active');
    }

    currentSlide = slideNum;

    // Activate new slide
    const newElem = document.querySelector(`.slide[data-slide="${currentSlide}"]`);
    if (newElem) {
      newElem.classList.add('active');
      newElem.scrollTop = 0;
    }

    // Update URL Hash without reload
    window.location.hash = `#slide-${currentSlide}`;

    updateUI();
  }

  /**
   * Advance to next slide
   */
  function nextSlide() {
    if (currentSlide < totalSlides) {
      goToSlide(currentSlide + 1);
    }
  }

  /**
   * Go back to previous slide
   */
  function prevSlide() {
    if (currentSlide > 1) {
      goToSlide(currentSlide - 1);
    }
  }

  /**
   * Update Progress Bar, Counters, and Buttons
   */
  function updateUI() {
    // Update Counter
    if (slideCounter) {
      const formattedCurrent = String(currentSlide).padStart(2, '0');
      const formattedTotal = String(totalSlides).padStart(2, '0');
      slideCounter.textContent = `${formattedCurrent} / ${formattedTotal}`;
    }

    // Update Progress Fill
    if (progressFill) {
      const percentage = (currentSlide / totalSlides) * 100;
      progressFill.style.width = `${percentage}%`;
    }

    // Update Section Indicator
    if (sectionIndicator) {
      sectionIndicator.textContent = slideCategories[currentSlide] || 'MERN Day 9';
    }

    // Update Button Disabled States
    if (prevBtn) prevBtn.disabled = currentSlide === 1;
    if (nextBtn) nextBtn.disabled = currentSlide === totalSlides;

    // Update Active TOC Item
    const tocItems = document.querySelectorAll('.toc-item');
    tocItems.forEach((item, index) => {
      if (index + 1 === currentSlide) {
        item.classList.add('active-slide');
      } else {
        item.classList.remove('active-slide');
      }
    });
  }

  /**
   * Build Table of Contents Drawer
   */
  function buildToc() {
    if (!tocList) return;
    tocList.innerHTML = '';

    slides.forEach((slide) => {
      const slideNum = parseInt(slide.dataset.slide, 10);
      const titleElem = slide.querySelector('.slide-title');
      const titleText = titleElem ? titleElem.innerText.replace(/\s+/g, ' ').trim() : `Slide ${slideNum}`;

      const item = document.createElement('div');
      item.className = `toc-item ${slideNum === currentSlide ? 'active-slide' : ''}`;
      item.innerHTML = `
        <span style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--primary); font-weight: 700;">
          ${String(slideNum).padStart(2, '0')}.
        </span>
        <span style="flex: 1; margin-left: 0.75rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 0.9rem;">
          ${titleText}
        </span>
        <span style="font-size: 0.75rem; color: var(--text-light); font-weight: 600;">Go ↵</span>
      `;

      item.addEventListener('click', () => {
        goToSlide(slideNum);
        closeToc();
      });

      tocList.appendChild(item);
    });
  }

  /**
   * Read #slide-N on initial page load or back/forward
   */
  function handleHashNavigation() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#slide-')) {
      const num = parseInt(hash.replace('#slide-', ''), 10);
      if (!isNaN(num) && num >= 1 && num <= totalSlides) {
        goToSlide(num);
        return;
      }
    }
    goToSlide(1);
  }

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#slide-')) {
      const num = parseInt(hash.replace('#slide-', ''), 10);
      if (!isNaN(num) && num !== currentSlide) {
        goToSlide(num);
      }
    }
  });

  // =========================================================================
  // MODALS & HELP
  // =========================================================================
  function openToc() {
    if (tocOverlay) tocOverlay.classList.add('active');
  }

  function closeToc() {
    if (tocOverlay) tocOverlay.classList.remove('active');
  }

  function openHelp() {
    if (helpModal) helpModal.classList.add('active');
  }

  function closeHelp() {
    if (helpModal) helpModal.classList.remove('active');
  }

  if (tocBtn) tocBtn.addEventListener('click', openToc);
  if (tocClose) tocClose.addEventListener('click', closeToc);
  if (helpBtn) helpBtn.addEventListener('click', openHelp);
  if (helpClose) helpClose.addEventListener('click', closeHelp);

  [tocOverlay, helpModal].forEach((overlay) => {
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          closeToc();
          closeHelp();
        }
      });
    }
  });

  // =========================================================================
  // KEYBOARD CONTROLS
  // =========================================================================
  document.addEventListener('keydown', (e) => {
    // Ignore keystrokes inside form controls
    const activeTag = document.activeElement ? document.activeElement.tagName : '';
    if (activeTag === 'INPUT' || activeTag === 'TEXTAREA' || activeTag === 'SELECT') {
      return;
    }

    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'Home') {
      e.preventDefault();
      goToSlide(1);
    } else if (e.key === 'End') {
      e.preventDefault();
      goToSlide(totalSlides);
    } else if (e.key === 'f' || e.key === 'F') {
      e.preventDefault();
      toggleFullscreen();
    } else if (e.key === 't' || e.key === 'T') {
      e.preventDefault();
      if (tocOverlay && tocOverlay.classList.contains('active')) {
        closeToc();
      } else {
        openToc();
      }
    } else if (e.key === '?' || (e.shiftKey && e.key === '/')) {
      e.preventDefault();
      if (helpModal && helpModal.classList.contains('active')) {
        closeHelp();
      } else {
        openHelp();
      }
    } else if (e.key === 'Escape') {
      closeToc();
      closeHelp();
    }
  });

  // Button clicks
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  // =========================================================================
  // FULLSCREEN TOGGLE
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

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', toggleFullscreen);
  }

  // =========================================================================
  // TOUCH SWIPE NAVIGATION (Mobile / Tablet)
  // =========================================================================
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

    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }, { passive: true });

  // =========================================================================
  // ONE-CLICK CODE COPYING
  // =========================================================================
  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const container = btn.closest('.code-container');
      const codeElem = container ? container.querySelector('code') : null;
      if (!codeElem) return;

      const codeText = codeElem.innerText;
      try {
        await navigator.clipboard.writeText(codeText);
        const originalHTML = btn.innerHTML;
        btn.innerHTML = `<span style="color:#34d399">✓ Copied!</span>`;
        btn.style.borderColor = '#34d399';
        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.style.borderColor = '';
        }, 2000);
      } catch (err) {
        btn.textContent = 'Failed';
        setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
      }
    });
  });

  // =========================================================================
  // SIMULATOR 1: Multer Upload & req.file Inspector Sandbox (Slide 9 & 10)
  // =========================================================================
  const multerSimFileSelect = document.getElementById('multerSimFile');
  const multerSimFieldInput = document.getElementById('multerSimField');
  const multerSimStorageSelect = document.getElementById('multerSimStorage');
  const multerSimValidateCheck = document.getElementById('multerSimValidate');
  const multerSimSendBtn = document.getElementById('multerSimSend');
  const multerSimOutput = document.getElementById('multerSimOutput');
  const multerSimStatusBadge = document.getElementById('multerSimStatus');

  if (multerSimSendBtn && multerSimOutput) {
    multerSimSendBtn.addEventListener('click', () => {
      const selectedOption = multerSimFileSelect ? multerSimFileSelect.options[multerSimFileSelect.selectedIndex] : null;
      const fileName = selectedOption ? selectedOption.value : 'student-photo.png';
      const fileMime = selectedOption ? selectedOption.dataset.mime : 'image/png';
      const fileSize = selectedOption ? parseInt(selectedOption.dataset.size, 10) : 1048576; // bytes
      const fieldName = multerSimFieldInput ? multerSimFieldInput.value.trim() : 'file';
      const storageMode = multerSimStorageSelect ? multerSimStorageSelect.value : 'disk';
      const isValidateChecked = multerSimValidateCheck ? multerSimValidateCheck.checked : true;

      // 1. Check Field Name Match
      if (fieldName !== 'file') {
        if (multerSimStatusBadge) {
          multerSimStatusBadge.className = 'status-pill status-pill-warning';
          multerSimStatusBadge.textContent = '400 Bad Request';
        }
        multerSimOutput.textContent = JSON.stringify({
          error: `MulterError: Unexpected field '${fieldName}'. Expected field 'file' in upload.single('file').`
        }, null, 2);
        return;
      }

      // 2. Check File Size Limit (2 MB = 2,097,152 bytes)
      if (fileSize > 2 * 1024 * 1024) {
        if (multerSimStatusBadge) {
          multerSimStatusBadge.className = 'status-pill status-pill-warning';
          multerSimStatusBadge.textContent = 'LIMIT_FILE_SIZE (400)';
        }
        multerSimOutput.textContent = JSON.stringify({
          error: "MulterError: File too large",
          code: "LIMIT_FILE_SIZE",
          message: `File size (${(fileSize / (1024 * 1024)).toFixed(2)} MB) exceeds allowed limit of 2 MB.`
        }, null, 2);
        return;
      }

      // 3. Check File Type Filter (image/*)
      if (isValidateChecked && !fileMime.startsWith('image/')) {
        if (multerSimStatusBadge) {
          multerSimStatusBadge.className = 'status-pill status-pill-warning';
          multerSimStatusBadge.textContent = 'Validation Rejected (400)';
        }
        multerSimOutput.textContent = JSON.stringify({
          error: "Error: Only image files are allowed",
          mimetypeReceived: fileMime,
          validationRule: "file.mimetype.startsWith('image/')"
        }, null, 2);
        return;
      }

      // 4. Successful Multer Processing
      const timestamp = Date.now();
      const storedFileName = `${timestamp}-${fileName}`;

      let reqFileResult = {};
      if (storageMode === 'disk') {
        reqFileResult = {
          fieldname: "file",
          originalname: fileName,
          encoding: "7bit",
          mimetype: fileMime,
          destination: "uploads/",
          filename: storedFileName,
          path: `uploads/${storedFileName}`,
          size: fileSize
        };
      } else {
        reqFileResult = {
          fieldname: "file",
          originalname: fileName,
          encoding: "7bit",
          mimetype: fileMime,
          buffer: `<Buffer 89 50 4e 47 0d 0a 1a 0a ... ${fileSize} bytes>`,
          size: fileSize
        };
      }

      if (multerSimStatusBadge) {
        multerSimStatusBadge.className = 'status-pill status-pill-success';
        multerSimStatusBadge.textContent = '200 OK (Uploaded)';
      }

      multerSimOutput.textContent = `// Express req.file populated by Multer:\n` + JSON.stringify({
        message: "File uploaded successfully",
        storageType: storageMode === 'disk' ? 'DiskStorage (Saved to disk)' : 'MemoryStorage (In-memory Buffer)',
        file: reqFileResult
      }, null, 2);
    });
  }

  // =========================================================================
  // SIMULATOR 2: Full Student Profile Upload Flow (Slide 16 & 17)
  // =========================================================================
  const studentNameInput = document.getElementById('studentName');
  const studentEmailInput = document.getElementById('studentEmail');
  const studentAvatarSelect = document.getElementById('studentAvatar');
  const studentSubmitBtn = document.getElementById('studentSubmitBtn');
  const studentResetBtn = document.getElementById('studentResetBtn');
  const studentReqHeaderBox = document.getElementById('studentReqHeader');
  const studentFormDataBox = document.getElementById('studentFormData');
  const studentResStatus = document.getElementById('studentResStatus');
  const studentResBox = document.getElementById('studentResBox');

  if (studentSubmitBtn) {
    studentSubmitBtn.addEventListener('click', () => {
      const name = studentNameInput ? studentNameInput.value.trim() : '';
      const email = studentEmailInput ? studentEmailInput.value.trim() : '';
      const avatarOption = studentAvatarSelect ? studentAvatarSelect.options[studentAvatarSelect.selectedIndex] : null;
      const avatarFile = avatarOption ? avatarOption.value : '';

      // Validate inputs
      if (!name || !email) {
        if (studentResStatus) {
          studentResStatus.className = 'status-pill status-pill-warning';
          studentResStatus.textContent = '400 Bad Request';
        }
        if (studentResBox) {
          studentResBox.textContent = JSON.stringify({
            message: "Student name and email are required fields."
          }, null, 2);
        }
        return;
      }

      if (!avatarFile) {
        if (studentResStatus) {
          studentResStatus.className = 'status-pill status-pill-warning';
          studentResStatus.textContent = '400 Bad Request';
        }
        if (studentResBox) {
          studentResBox.textContent = JSON.stringify({
            message: "Profile image is required (upload.single('image') found no file)."
          }, null, 2);
        }
        return;
      }

      // Generate simulated multipart boundary
      const boundary = "----WebKitFormBoundary" + Math.random().toString(36).substring(2, 14);

      // Display Request Headers
      if (studentReqHeaderBox) {
        studentReqHeaderBox.textContent = 
`POST /students HTTP/1.1
Host: localhost:3000
Content-Type: multipart/form-data; boundary=${boundary}
Accept: application/json`;
      }

      // Display FormData Payload
      if (studentFormDataBox) {
        studentFormDataBox.textContent = 
`--${boundary}
Content-Disposition: form-data; name="name"

${name}
--${boundary}
Content-Disposition: form-data; name="email"

${email}
--${boundary}
Content-Disposition: form-data; name="image"; filename="${avatarFile}"
Content-Type: image/png

[Binary Image Buffer (${avatarOption.dataset.size || '842 KB'})]
--${boundary}--`;
      }

      // Simulated Express + Multer Response
      const timestamp = Date.now();
      const savedImageName = `${timestamp}-${avatarFile}`;

      if (studentResStatus) {
        studentResStatus.className = 'status-pill status-pill-success';
        studentResStatus.textContent = '201 Created';
      }

      if (studentResBox) {
        studentResBox.textContent = JSON.stringify({
          message: "Student profile created successfully",
          student: {
            id: "std_" + Math.floor(100 + Math.random() * 900),
            name: name,
            email: email,
            image: savedImageName,
            imageUrl: `http://localhost:3000/uploads/${savedImageName}`
          }
        }, null, 2);
      }
    });

    if (studentResetBtn) {
      studentResetBtn.addEventListener('click', () => {
        if (studentNameInput) studentNameInput.value = 'Arun Kumar';
        if (studentEmailInput) studentEmailInput.value = 'arun@example.com';
        if (studentAvatarSelect) studentAvatarSelect.selectedIndex = 0;
        if (studentReqHeaderBox) studentReqHeaderBox.textContent = '// Click "Submit via Axios (FormData)" to trigger request';
        if (studentFormDataBox) studentFormDataBox.textContent = '// FormData payload will appear here';
        if (studentResBox) studentResBox.textContent = '// JSON response from Express + Multer will appear here';
        if (studentResStatus) {
          studentResStatus.className = 'status-pill status-pill-info';
          studentResStatus.textContent = 'Ready';
        }
      });
    }
  }

  // Kickstart presentation
  initPresentation();
});

