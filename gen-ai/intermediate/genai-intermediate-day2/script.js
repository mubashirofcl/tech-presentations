/**
 * Intermediate AI/LLM – Day 2 (Simplified & Focused on RAG)
 * Agent Workflows, RAG Fundamentals & Document Processing
 * Interactive Presentation Engine & Simulation Sandboxes
 * Total Slides: 24
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Presentation State ---
  const totalSlides = 24;
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
  const tocDrawer = document.getElementById('tocDrawer');
  const tocList = document.getElementById('tocList');
  const helpBtn = document.getElementById('helpBtn');
  const helpClose = document.getElementById('helpClose');
  const helpModal = document.getElementById('helpModal');
  const toastNotice = document.getElementById('toastNotice');

  // Exact 24 Simplified Slide Titles
  const slideTitles = [
    "Introduction & Today's Roadmap",
    "What is an Agent Workflow?",
    "Sequential vs Parallel Workflows",
    "The Router Pattern & Human-in-the-Loop",
    "What is RAG? (The Open-Book Exam)",
    "Why LLMs Need RAG",
    "What is Hallucination?",
    "The 3 Steps of RAG: Retrieve → Augment → Generate",
    "Real-World Example: Employee Leave Policy",
    "The Two Halves of RAG: Ingestion vs Question Answering",
    "RAG vs Fine-Tuning Made Simple",
    "Why RAG is the #1 Skill in Enterprise AI",
    "What is Document Processing?",
    "The Ingestion Pipeline: Load → Clean → Chunk → Tag",
    "Step 1: Loading Documents in Node.js",
    "Step 2: Cleaning the Text",
    "Step 3: What is Text Chunking?",
    "Step 4: Chunk Size & Chunk Overlap",
    "Practical: Writing a Simple Chunking Function",
    "Interactive Tool: Live Chunk & Overlap Visualizer",
    "Step 5: Adding Metadata to Chunks",
    "Putting It All Together: Complete Document Processor",
    "Mini Project: Run the Document Processor Live!",
    "Summary & What's Coming Next"
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
      currentSlide++;
      updateSlideDisplay();
    }
  }

  function prevSlide() {
    if (currentSlide > 1) {
      currentSlide--;
      updateSlideDisplay();
    }
  }

  // Navigation Event Listeners
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  if (slideSelect) {
    slideSelect.addEventListener('change', (e) => {
      goToSlide(parseInt(e.target.value, 10));
    });
  }

  // Keyboard Navigation
  document.addEventListener('keydown', (e) => {
    // Ignore key shortcuts if focus is inside an input or textarea
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
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
        e.preventDefault();
        toggleFullscreen();
        break;
      case 't':
      case 'T':
        e.preventDefault();
        toggleTOC();
        break;
      case '?':
        e.preventDefault();
        toggleHelpModal();
        break;
      case 'Escape':
        closeTOC();
        closeHelpModal();
        break;
    }
  });

  // Fullscreen Controller
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);

  // Table of Contents Drawer
  function openTOC() {
    if (tocDrawer) tocDrawer.classList.add('active');
    if (tocOverlay) tocOverlay.classList.add('active');
  }

  function closeTOC() {
    if (tocDrawer) tocDrawer.classList.remove('active');
    if (tocOverlay) tocOverlay.classList.remove('active');
  }

  function toggleTOC() {
    if (tocDrawer && tocDrawer.classList.contains('active')) {
      closeTOC();
    } else {
      openTOC();
    }
  }

  if (tocBtn) tocBtn.addEventListener('click', toggleTOC);
  if (tocClose) tocClose.addEventListener('click', closeTOC);
  if (tocOverlay) tocOverlay.addEventListener('click', closeTOC);

  // Help Modal
  function openHelpModal() {
    if (helpModal) helpModal.classList.add('active');
  }

  function closeHelpModal() {
    if (helpModal) helpModal.classList.remove('active');
  }

  function toggleHelpModal() {
    if (helpModal && helpModal.classList.contains('active')) {
      closeHelpModal();
    } else {
      openHelpModal();
    }
  }

  if (helpBtn) helpBtn.addEventListener('click', openHelpModal);
  if (helpClose) helpClose.addEventListener('click', closeHelpModal);
  if (helpModal) {
    helpModal.addEventListener('click', (e) => {
      if (e.target === helpModal) closeHelpModal();
    });
  }

  // Toast Notice Function
  window.showToast = function(msg) {
    if (!toastNotice) return;
    toastNotice.textContent = msg;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 2200);
  };

  // Global Copy Code Handler
  window.copyCode = function(button) {
    const codePanel = button.closest('.code-panel');
    if (!codePanel) return;
    const codeElem = codePanel.querySelector('code');
    if (!codeElem) return;

    const textToCopy = codeElem.innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
      const originalText = button.innerHTML;
      button.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
        Copied!
      `;
      button.style.borderColor = '#10B981';
      button.style.color = '#10B981';

      window.showToast('Code copied to clipboard!');

      setTimeout(() => {
        button.innerHTML = originalText;
        button.style.borderColor = '';
        button.style.color = '';
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  // =========================================================================
  // SIMULATOR 1: CHUNKING & OVERLAP VISUALIZER (Slide 20)
  // =========================================================================
  const simChunkInputText = document.getElementById('simChunkInputText');
  const simSliderChunkSize = document.getElementById('simSliderChunkSize');
  const simSliderChunkOverlap = document.getElementById('simSliderChunkOverlap');
  const lblChunkSize = document.getElementById('lblChunkSize');
  const lblChunkOverlap = document.getElementById('lblChunkOverlap');
  const btnRunChunking = document.getElementById('btnRunChunking');
  const simChunkResults = document.getElementById('simChunkResults');
  const simChunkMetrics = document.getElementById('simChunkMetrics');

  function updateChunkSliders() {
    if (simSliderChunkSize && lblChunkSize) {
      lblChunkSize.textContent = `${simSliderChunkSize.value} chars`;
    }
    if (simSliderChunkOverlap && lblChunkOverlap) {
      // Ensure overlap is strictly less than half of chunk size
      const maxOverlap = Math.floor(parseInt(simSliderChunkSize.value, 10) * 0.45);
      simSliderChunkOverlap.max = maxOverlap;
      if (parseInt(simSliderChunkOverlap.value, 10) > maxOverlap) {
        simSliderChunkOverlap.value = maxOverlap;
      }
      lblChunkOverlap.textContent = `${simSliderChunkOverlap.value} chars`;
    }
  }

  if (simSliderChunkSize) {
    simSliderChunkSize.addEventListener('input', () => {
      updateChunkSliders();
      runChunkSimulation();
    });
  }

  if (simSliderChunkOverlap) {
    simSliderChunkOverlap.addEventListener('input', () => {
      updateChunkSliders();
      runChunkSimulation();
    });
  }

  function runChunkSimulation() {
    if (!simChunkInputText || !simChunkResults) return;
    const text = simChunkInputText.value.trim();
    if (!text) {
      simChunkResults.innerHTML = '<span style="color: #DC2626;">Please enter text to chunk.</span>';
      return;
    }

    const chunkSize = parseInt(simSliderChunkSize.value, 10);
    const overlap = parseInt(simSliderChunkOverlap.value, 10);
    const step = chunkSize - overlap;

    const rawChunks = [];
    let start = 0;

    while (start < text.length) {
      const end = Math.min(start + chunkSize, text.length);
      const chunkStr = text.substring(start, end);
      rawChunks.push({
        index: rawChunks.length + 1,
        start,
        end,
        text: chunkStr
      });
      if (end >= text.length) break;
      start += step;
    }

    if (simChunkMetrics) {
      simChunkMetrics.textContent = `Total Index Cards: ${rawChunks.length} | Advance Step: ${step} chars`;
    }

    simChunkResults.innerHTML = '';
    rawChunks.forEach((c, idx) => {
      const div = document.createElement('div');
      div.className = 'chunk-card';

      // Visual highlight of overlap text if not first chunk
      let displayText = c.text;
      if (idx > 0 && overlap > 0) {
        const overlapText = c.text.substring(0, overlap);
        const restText = c.text.substring(overlap);
        displayText = `<mark class="chunk-overlap-highlight" title="Overlapping from Card ${idx}">[Overlap: ${escapeHtml(overlapText)}]</mark>${escapeHtml(restText)}`;
      } else {
        displayText = escapeHtml(displayText);
      }

      div.innerHTML = `
        <div style="display: flex; justify-content: space-between; font-size: 0.68rem; color: #64748B; margin-bottom: 2px;">
          <strong>Card #${c.index} (Chars ${c.start} &rarr; ${c.end})</strong>
          <span>${c.text.length} chars</span>
        </div>
        <div style="font-size: 0.72rem; line-height: 1.45;">${displayText}</div>
      `;
      simChunkResults.appendChild(div);
    });
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  if (btnRunChunking) btnRunChunking.addEventListener('click', runChunkSimulation);

  // =========================================================================
  // SIMULATOR 2: DOCUMENT PROCESSOR PIPELINE RUNNER (Slide 23)
  // =========================================================================
  const simDocSelect = document.getElementById('simDocSelect');
  const btnRunPipeline = document.getElementById('btnRunPipeline');
  const simPipelineOutput = document.getElementById('simPipelineOutput');
  const stepLoad = document.getElementById('stepLoad');
  const stepClean = document.getElementById('stepClean');
  const stepChunk = document.getElementById('stepChunk');
  const stepTag = document.getElementById('stepTag');

  const sampleDocs = {
    hr: {
      source: "HR_Leave_Policy_2025.pdf",
      dept: "Human Resources",
      rawText: "Company  HR Policy 2025\\r\\n\\r\\nSection 4.2: Employees may carry forward a maximum of 5 unused annual leave days into the next calendar year. Any unused balance beyond 5 days will lapse automatically on December 31.\\r\\n\\r\\nSection 4.3: Sick leave accrues at 1.25 days per month and requires medical practitioner certification for consecutive absences exceeding three calendar days."
    },
    support: {
      source: "Customer_Support_FAQ.csv",
      dept: "Customer Care",
      rawText: "Q: How do I reset my API key? A: Navigate to Settings > API Keys and click Generate New Secret.\\r\\nQ: What are webhook retry intervals? A: Retries occur exponentially at 5s, 30s, and 5m before dead-letter archiving."
    },
    tech: {
      source: "Engineering_Handbook.txt",
      dept: "Engineering",
      rawText: "Deployment Guidelines: All microservices must pass unit tests before triggering staging deployments. Database schema migrations must run in backward-compatible mode during active business hours."
    }
  };

  function setBadgeState(badge, active, done) {
    if (!badge) return;
    if (done) {
      badge.style.background = '#ECFDF5';
      badge.style.color = '#059669';
      badge.style.fontWeight = '700';
    } else if (active) {
      badge.style.background = '#EFF6FF';
      badge.style.color = '#2563EB';
      badge.style.fontWeight = '700';
    } else {
      badge.style.background = '#E2E8F0';
      badge.style.color = '#64748B';
      badge.style.fontWeight = '500';
    }
  }

  function runDocumentPipelineSimulation() {
    if (!simDocSelect || !simPipelineOutput) return;
    const docKey = simDocSelect.value;
    const docData = sampleDocs[docKey] || sampleDocs.hr;

    // Reset badges
    setBadgeState(stepLoad, false, false);
    setBadgeState(stepClean, false, false);
    setBadgeState(stepChunk, false, false);
    setBadgeState(stepTag, false, false);

    simPipelineOutput.innerHTML = '<span style="color: var(--primary-blue);">Initiating document processing pipeline...</span>';

    // Step 1: Load
    setTimeout(() => {
      setBadgeState(stepLoad, true, false);
      simPipelineOutput.innerHTML = `<span>[1/4] Loaded file <code>${docData.source}</code> (${docData.rawText.length} raw characters)...</span>`;

      // Step 2: Clean
      setTimeout(() => {
        setBadgeState(stepLoad, false, true);
        setBadgeState(stepClean, true, false);
        const cleaned = docData.rawText.replace(/\\r\\n/g, ' ').replace(/\s{2,}/g, ' ');
        simPipelineOutput.innerHTML = `<span>[2/4] Cleaned text: normalized whitespace and linebreaks (${cleaned.length} clean chars)...</span>`;

        // Step 3: Chunk
        setTimeout(() => {
          setBadgeState(stepClean, false, true);
          setBadgeState(stepChunk, true, false);

          const chunkSize = 160;
          const overlap = 30;
          const step = chunkSize - overlap;
          const chunks = [];
          let start = 0;

          while (start < cleaned.length) {
            const end = Math.min(start + chunkSize, cleaned.length);
            chunks.push(cleaned.substring(start, end));
            if (end >= cleaned.length) break;
            start += step;
          }

          simPipelineOutput.innerHTML = `<span>[3/4] Cut into ${chunks.length} index cards with ${overlap}-char overlap...</span>`;

          // Step 4: Tag Metadata
          setTimeout(() => {
            setBadgeState(stepChunk, false, true);
            setBadgeState(stepTag, false, true);

            const docId = docData.source.replace(/\.[^/.]+$/, "").toLowerCase();
            const chunkObjects = chunks.map((chunk, i) => ({
              chunkId: `${docId}_chk_${String(i).padStart(3, '0')}`,
              source: docData.source,
              department: docData.dept,
              chunkIndex: i,
              text: chunk
            }));

            simPipelineOutput.innerHTML = `
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <strong style="color: #059669; font-size: 0.74rem;">Ready for Search: ${chunkObjects.length} Tagged Chunks</strong>
                <button class="btn-copy" onclick="copyPipelineJSON()" style="padding: 2px 8px; font-size: 0.65rem;">Copy Output JSON</button>
              </div>
              <pre id="pipelineJsonData" style="font-family: var(--font-mono); font-size: 0.68rem; color: #1E293B; background: #F8FAFC; padding: 8px; border-radius: 4px; overflow-x: auto; max-height: 80px;">${JSON.stringify(chunkObjects, null, 2)}</pre>
            `;

            window.copyPipelineJSON = function() {
              const data = JSON.stringify(chunkObjects, null, 2);
              navigator.clipboard.writeText(data).then(() => {
                window.showToast('Pipeline JSON copied!');
              });
            };

          }, 200);
        }, 200);
      }, 200);
    }, 150);
  }

  if (btnRunPipeline) btnRunPipeline.addEventListener('click', runDocumentPipelineSimulation);

  // Initialize navigation & default simulator states
  initializeNavigation();
  updateSlideDisplay();
  updateChunkSliders();
  runChunkSimulation();
});
