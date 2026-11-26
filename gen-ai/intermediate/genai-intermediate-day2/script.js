/**
 * Intermediate AI/LLM – Day 2
 * Agent Workflows, RAG Fundamentals & Document Processing
 * Interactive Presentation Engine & Simulation Sandboxes
 * Total Slides: 28
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Presentation State ---
  const totalSlides = 28;
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

  // Exact 28 Slide Titles
  const slideTitles = [
    "Introduction to Agent Workflows",
    "Why Do We Need Agent Workflows?",
    "Sequential Workflow (A → B → C)",
    "Practical: Sequential Workflow in Node.js",
    "Parallel Workflow",
    "Practical: Promise.all() in Node.js",
    "Sequential vs Parallel Workflow",
    "Router Pattern",
    "Practical: Build a Simple Router in Node.js",
    "Human-in-the-Loop (HITL)",
    "Practical: Human Approval Using Express",
    "Agent Workflow Recap",
    "What is RAG?",
    "Why Do We Need RAG?",
    "What is Hallucination?",
    "RAG Architecture: Retrieval, Augmentation, Generation",
    "How Does RAG Work? (Employee Policy Walkthrough)",
    "RAG Architecture: Document Processing vs Question Answering",
    "RAG vs Fine-Tuning",
    "What is Document Processing?",
    "Node.js Document Processing Libraries",
    "Practical: Load PDF, TXT, DOCX and CSV",
    "Document Cleaning",
    "Text Splitting / Chunking",
    "Chunk Size and Chunk Overlap",
    "Practical: Build a Text Chunking Function",
    "Metadata in RAG",
    "Mini Project: RAG Document Processor Pipeline"
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
  // SIMULATOR 1: ROUTER PATTERN (Slide 9)
  // =========================================================================
  const simRouterInput = document.getElementById('simRouterInput');
  const btnRunRouter = document.getElementById('btnRunRouter');
  const simRouterOutput = document.getElementById('simRouterOutput');

  window.setRouterSample = function(text) {
    if (simRouterInput) {
      simRouterInput.value = text;
      runRouterSimulation();
    }
  };

  function runRouterSimulation() {
    if (!simRouterInput || !simRouterOutput) return;
    const text = simRouterInput.value.trim();
    if (!text) {
      simRouterOutput.innerHTML = '<span style="color: #DC2626;">Please enter a query to test the router.</span>';
      return;
    }

    simRouterOutput.innerHTML = '<span style="color: var(--primary-blue);">Routing query through classification gate...</span>';

    setTimeout(() => {
      const lower = text.toLowerCase();
      let route = 'general';
      let confidence = '92.4%';
      let handler = 'handleGeneralInquiry';
      let badgeClass = 'badge-warning';
      let responseText = '';

      if (/refund|invoice|charge|bill|stripe|subscription|credit/i.test(lower)) {
        route = 'billing';
        confidence = '98.7%';
        handler = 'handleBillingSupport';
        badgeClass = 'badge-agent';
        responseText = 'Billing Handler dispatched: Authenticated Stripe account, pulled customer invoice #INV-9281, and initiated automated refund authorization check.';
      } else if (/error|bug|500|api|database|fail|crash|connection|query/i.test(lower)) {
        route = 'technical';
        confidence = '97.2%';
        handler = 'handleTechnicalSupport';
        badgeClass = 'badge-tool';
        responseText = 'Technical Support Handler dispatched: Inspected PostgreSQL connection pool logs, parsed ECONNREFUSED socket state, and generated DB restart script.';
      } else {
        route = 'general';
        confidence = '91.5%';
        handler = 'handleGeneralInquiry';
        badgeClass = 'badge-warning';
        responseText = 'General Inquiries Handler dispatched: Retrieved public knowledge base FAQ regarding business hours, office locations, and service tiers.';
      }

      simRouterOutput.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #E2E8F0; padding-bottom: 4px;">
          <div>
            <span class="badge ${badgeClass}" style="text-transform: uppercase;">Route: ${route}</span>
            <span style="font-size: 0.70rem; color: #64748B; margin-left: 6px;">Handler: <code>${handler}()</code></span>
          </div>
          <span style="font-size: 0.70rem; font-weight: 700; color: #059669;">Confidence: ${confidence}</span>
        </div>
        <div style="font-size: 0.73rem; color: #1E293B; margin-top: 4px; line-height: 1.4;">
          ${responseText}
        </div>
      `;
    }, 250);
  }

  if (btnRunRouter) btnRunRouter.addEventListener('click', runRouterSimulation);

  // =========================================================================
  // SIMULATOR 2: HUMAN-IN-THE-LOOP (HITL) (Slide 11)
  // =========================================================================
  const simExpenseItem = document.getElementById('simExpenseItem');
  const simExpenseAmount = document.getElementById('simExpenseAmount');
  const btnSubmitExpense = document.getElementById('btnSubmitExpense');
  const simExpenseOutput = document.getElementById('simExpenseOutput');
  const simManagerActions = document.getElementById('simManagerActions');
  const btnApproveExpense = document.getElementById('btnApproveExpense');
  const btnRejectExpense = document.getElementById('btnRejectExpense');

  let currentExpense = null;

  window.setExpenseSample = function(item, amount) {
    if (simExpenseItem) simExpenseItem.value = item;
    if (simExpenseAmount) simExpenseAmount.value = amount;
    submitExpenseSimulation();
  };

  function submitExpenseSimulation() {
    if (!simExpenseItem || !simExpenseAmount || !simExpenseOutput) return;
    const item = simExpenseItem.value.trim() || 'Miscellaneous Item';
    const amount = parseFloat(simExpenseAmount.value) || 0;
    const expenseId = 'exp_' + Math.floor(1000 + Math.random() * 9000);

    const isHighRisk = amount > 500;
    const status = isHighRisk ? 'PENDING_HUMAN_APPROVAL' : 'AUTO_APPROVED';

    currentExpense = { id: expenseId, item, amount, status };

    if (!isHighRisk) {
      if (simManagerActions) simManagerActions.style.display = 'none';
      simExpenseOutput.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <strong style="color: #059669;">[${expenseId}] AUTO_APPROVED</strong>
          <span style="font-size: 0.70rem; color: #64748B;">Amount: $${amount.toFixed(2)}</span>
        </div>
        <div style="font-size: 0.72rem; color: #1E293B; margin-top: 4px;">
          Expense for "${item}" is &le; $500 threshold. System automatically approved and dispatched payment voucher.
        </div>
      `;
    } else {
      if (simManagerActions) simManagerActions.style.display = 'flex';
      simExpenseOutput.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <strong style="color: #D97706;">[${expenseId}] PENDING_HUMAN_APPROVAL</strong>
          <span style="font-size: 0.70rem; font-weight: 700; color: #B45309;">Amount: $${amount.toFixed(2)} (&gt; $500 Gate)</span>
        </div>
        <div style="font-size: 0.72rem; color: #1E293B; margin-top: 4px;">
          High-value transaction for "${item}" requires supervisory authorization. Execution paused at approval gate.
        </div>
      `;
    }
  }

  if (btnSubmitExpense) btnSubmitExpense.addEventListener('click', submitExpenseSimulation);

  if (btnApproveExpense) {
    btnApproveExpense.addEventListener('click', () => {
      if (!currentExpense) return;
      currentExpense.status = 'APPROVED_BY_MANAGER';
      if (simManagerActions) simManagerActions.style.display = 'none';
      simExpenseOutput.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <strong style="color: #059669;">[${currentExpense.id}] APPROVED_BY_MANAGER</strong>
          <span style="font-size: 0.70rem; color: #059669;">Manual Override OK</span>
        </div>
        <div style="font-size: 0.72rem; color: #1E293B; margin-top: 4px;">
          Manager approved $${currentExpense.amount.toFixed(2)} for "${currentExpense.item}". Workflow resumed and funds disbursed.
        </div>
      `;
    });
  }

  if (btnRejectExpense) {
    btnRejectExpense.addEventListener('click', () => {
      if (!currentExpense) return;
      currentExpense.status = 'REJECTED_BY_MANAGER';
      if (simManagerActions) simManagerActions.style.display = 'none';
      simExpenseOutput.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <strong style="color: #DC2626;">[${currentExpense.id}] REJECTED_BY_MANAGER</strong>
          <span style="font-size: 0.70rem; color: #DC2626;">Action Blocked</span>
        </div>
        <div style="font-size: 0.72rem; color: #1E293B; margin-top: 4px;">
          Manager declined expense for "${currentExpense.item}". Transaction aborted and notification emailed to employee.
        </div>
      `;
    });
  }

  // =========================================================================
  // SIMULATOR 3: CHUNKING & OVERLAP VISUALIZER (Slide 26)
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
      lblChunkSize.textContent = simSliderChunkSize.value;
    }
    if (simSliderChunkOverlap && lblChunkOverlap) {
      // Ensure overlap is always strictly less than chunk size
      const maxOverlap = Math.floor(parseInt(simSliderChunkSize.value, 10) * 0.5);
      simSliderChunkOverlap.max = maxOverlap;
      if (parseInt(simSliderChunkOverlap.value, 10) > maxOverlap) {
        simSliderChunkOverlap.value = maxOverlap;
      }
      lblChunkOverlap.textContent = simSliderChunkOverlap.value;
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
      simChunkMetrics.textContent = `Total Chunks: ${rawChunks.length} | Step Size: ${step} chars`;
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
        displayText = `<mark class="chunk-overlap-highlight" title="Overlapping from Chunk ${idx}">[Overlap: ${escapeHtml(overlapText)}]</mark>${escapeHtml(restText)}`;
      } else {
        displayText = escapeHtml(displayText);
      }

      div.innerHTML = `
        <div style="display: flex; justify-content: space-between; font-size: 0.68rem; color: #64748B; margin-bottom: 2px;">
          <strong>Chunk ${c.index} (Chars ${c.start} &rarr; ${c.end})</strong>
          <span>${c.text.length} chars</span>
        </div>
        <div style="font-size: 0.70rem; line-height: 1.4;">${displayText}</div>
      `;
      simChunkResults.appendChild(div);
    });
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  if (btnRunChunking) btnRunChunking.addEventListener('click', runChunkSimulation);

  // =========================================================================
  // SIMULATOR 4: DOCUMENT PROCESSOR PIPELINE (Slide 28)
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
      source: "Cloud_Architecture_Spec.docx",
      dept: "Engineering",
      rawText: "Microservice Ingestion Architecture: Text extractors run as worker tasks with 512MB RAM allocations. All extracted text is sanitized before invoking the chunking service. Vector embeddings are produced in batches of 64 chunks."
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
      simPipelineOutput.innerHTML = `<span>[1/4] Loaded buffer for <code>${docData.source}</code> (${docData.rawText.length} raw bytes)...</span>`;

      // Step 2: Clean
      setTimeout(() => {
        setBadgeState(stepLoad, false, true);
        setBadgeState(stepClean, true, false);
        const cleaned = docData.rawText.replace(/\\r\\n/g, ' ').replace(/\s{2,}/g, ' ');
        simPipelineOutput.innerHTML = `<span>[2/4] Sanitized text: removed control characters & normalized whitespace (${cleaned.length} clean chars)...</span>`;

        // Step 3: Chunk
        setTimeout(() => {
          setBadgeState(stepClean, false, true);
          setBadgeState(stepChunk, true, false);

          const chunkSize = 180;
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

          simPipelineOutput.innerHTML = `<span>[3/4] Chunked into ${chunks.length} segments with ${overlap}-char overlap...</span>`;

          // Step 4: Tag Metadata
          setTimeout(() => {
            setBadgeState(stepChunk, false, true);
            setBadgeState(stepTag, false, true);

            const docId = docData.source.replace(/\.[^/.]+$/, "").toLowerCase();
            const chunkObjects = chunks.map((chunk, i) => ({
              chunkId: `${docId}_chk_${String(i).padStart(3, '0')}`,
              docId: docId,
              source: docData.source,
              chunkIndex: i,
              charCount: chunk.length,
              department: docData.dept,
              text: chunk,
              createdAt: new Date().toISOString()
            }));

            simPipelineOutput.innerHTML = `
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <strong style="color: #059669; font-size: 0.74rem;">Pipeline Completed: ${chunkObjects.length} Chunks Produced</strong>
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
