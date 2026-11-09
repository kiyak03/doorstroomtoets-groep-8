// public/js/app.js - Hoofdcontroller voor de Doorstroomtoets App (Cito / Leerling in beeld)
(function () {
  // State
  let currentTest = null;
  let currentQuestionIndex = 0;
  let userAnswers = {};
  let hintsUsed = {};
  let flaggedQuestions = {};
  let timerInterval = null;
  let secondsElapsed = 0;
  let studentName = localStorage.getItem('doorstroomtoets_name') || 'Mijn Kind';
  let currentTheme = localStorage.getItem('doorstroomtoets_theme') || 'default';
  let selectedSubTopic = 'all';
  let growthPoints = 0;
  let growthStreak = 0;
  let growthLevel = 1;
  let maxGrowthLevel = 1;
  let questionFeedbackExtra = {};
  let networkInfo = null;

  // DOM Elements
  const views = {
    home: document.getElementById('view-home'),
    quiz: document.getElementById('view-quiz'),
    results: document.getElementById('view-results'),
    history: document.getElementById('view-history')
  };

  function switchView(viewName) {
    Object.keys(views).forEach(v => {
      if (views[v]) views[v].classList.remove('active');
    });
    if (views[viewName]) {
      views[viewName].classList.add('active');
      window.scrollTo(0, 0);
    }
  }

  // Thema Management
  function applyTheme(themeName) {
    currentTheme = themeName;
    document.body.classList.remove('theme-pink', 'theme-mint', 'theme-lavender', 'theme-peach', 'theme-dyslexia', 'theme-dark');
    if (themeName && themeName !== 'default') {
      document.body.classList.add(`theme-${themeName}`);
    }
    localStorage.setItem('doorstroomtoets_theme', themeName);

    // Update active card in modal
    document.querySelectorAll('.theme-option-card').forEach(card => {
      card.classList.toggle('active', card.dataset.theme === themeName);
    });
  }

  // Session Storage & Resume Handling
  function saveSession() {
    if (!currentTest) return;
    const session = {
      test: currentTest,
      currentQuestionIndex,
      userAnswers,
      hintsUsed,
      flaggedQuestions,
      secondsElapsed,
      growthPoints,
      growthStreak,
      growthLevel,
      maxGrowthLevel,
      questionFeedbackExtra,
      highlights: window.Highlighter ? Highlighter.getSavedHighlights() : {},
      savedAt: Date.now()
    };
    try {
      localStorage.setItem('doorstroomtoets_active_session', JSON.stringify(session));
    } catch (e) {
      console.warn('Kon sessie niet opslaan in localStorage:', e);
    }
  }

  function clearSession() {
    try {
      localStorage.removeItem('doorstroomtoets_active_session');
    } catch (e) {}
    checkResumeBanner();
  }

  function checkResumeBanner() {
    const banner = document.getElementById('resume-banner');
    const textEl = document.getElementById('resume-banner-text');
    if (!banner) return;

    const raw = localStorage.getItem('doorstroomtoets_active_session');
    if (!raw) {
      banner.style.display = 'none';
      return;
    }

    try {
      const session = JSON.parse(raw);
      if (session && session.test && session.test.questions && session.test.questions.length > 0) {
        const answeredCount = Object.keys(session.userAnswers || {}).length;
        const totalQ = session.test.totalQuestions || session.test.questions.length;
        const domainLabel = getDomainLabel(session.test.domain);
        const currentQNum = (session.currentQuestionIndex || 0) + 1;

        textEl.innerHTML = `Je was bezig met een toets: <strong>${domainLabel}</strong> (Vraag ${currentQNum} van de ${totalQ}, ${answeredCount} al beantwoord). Wil je direct verder gaan?`;
        banner.style.display = 'flex';
      } else {
        banner.style.display = 'none';
      }
    } catch (e) {
      banner.style.display = 'none';
    }
  }

  function resumeSession() {
    const raw = localStorage.getItem('doorstroomtoets_active_session');
    if (!raw) return;

    try {
      const session = JSON.parse(raw);
      currentTest = session.test;
      currentQuestionIndex = session.currentQuestionIndex || 0;
      userAnswers = session.userAnswers || {};
      hintsUsed = session.hintsUsed || {};
      flaggedQuestions = session.flaggedQuestions || {};
      secondsElapsed = session.secondsElapsed || 0;
      growthPoints = session.growthPoints || 0;
      growthStreak = session.growthStreak || 0;
      growthLevel = session.growthLevel || 1;
      maxGrowthLevel = session.maxGrowthLevel || 1;
      questionFeedbackExtra = session.questionFeedbackExtra || {};

      if (session.highlights && window.Highlighter) {
        Highlighter.setSavedHighlights(session.highlights);
      }

      startTimer();
      renderQuestionNavigator();
      renderCurrentQuestion();
      switchView('quiz');
    } catch (e) {
      alert('Kon toets niet hervatten: ' + e.message);
    }
  }

  // Expose AppStorage globally for Highlighter
  window.AppStorage = {
    saveSession
  };

  // Init
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(currentTheme);
    Kladblok.init();
    if (window.Highlighter) {
      Highlighter.init();
    }
    fetchNetworkInfo();
    setupEventListeners();
    updateStudentNameDisplay();
    updateCountPillsForDomain('all');
    checkResumeBanner();
  });

  // Fetch Network Info & QR Code
  async function fetchNetworkInfo() {
    try {
      const res = await fetch('/api/network-info');
      networkInfo = await res.json();

      const wifiBadge = document.getElementById('header-wifi-badge');
      if (wifiBadge && networkInfo.fullUrl) {
        const hostLabel = networkInfo.port ? `${networkInfo.localIp}:${networkInfo.port}` : networkInfo.localIp;
        wifiBadge.innerHTML = `📱 <strong>iPad:</strong> ${hostLabel}`;
      }

      const modalQr = document.getElementById('qr-modal-image');
      const modalUrl = document.getElementById('qr-modal-url');
      if (modalQr && networkInfo.qrCodeDataUrl) {
        modalQr.src = networkInfo.qrCodeDataUrl;
      }
      if (modalUrl && networkInfo.fullUrl) {
        modalUrl.textContent = networkInfo.fullUrl;
      }
    } catch (e) {
      console.warn('Kon netwerkinformatie niet ophalen:', e);
    }
  }

  // Dynamische Cito Presets per vakgebied & subonderwerp
  function updateCountPillsForDomain(domain, subTopic = 'all') {
    const container = document.getElementById('count-pills-container');
    if (!container) return;

    let presets = [];
    if (domain === 'rekenen' && subTopic && subTopic !== 'all') {
      // Specifiek rekenonderwerp gekozen: handige aantallen voor gericht trainen
      presets = [
        { count: 20, label: '🎯 Uitgebreid Trainen (20 sommen)', selected: false },
        { count: 15, label: '⚖️ Onderwerp Training (15 sommen)', selected: true },
        { count: 10, label: '⚡ Snel Oefenen (10 sommen)', selected: false }
      ];
    } else if (domain === 'rekenen') {
      presets = [
        { count: 44, label: '🏆 Cito Toets (44 vragen)', selected: true },
        { count: 22, label: '⚖️ Halve Toets (22 vragen)', selected: false },
        { count: 10, label: '⚡ Snel Oefenen (10 vragen)', selected: false }
      ];
    } else if (domain === 'begrijpendLezen' || domain === 'taalverzorging') {
      presets = [
        { count: 40, label: '🏆 Cito Toets (40 vragen)', selected: true },
        { count: 20, label: '⚖️ Halve Toets (20 vragen)', selected: false },
        { count: 10, label: '⚡ Snel Oefenen (10 vragen)', selected: false }
      ];
    } else {
      // Doorstroomtoets Mix
      presets = [
        { count: 60, label: '🏆 Cito Toets (60 vragen)', selected: true },
        { count: 30, label: '⚖️ Halve Toets (30 vragen)', selected: false },
        { count: 10, label: '⚡ Snel Oefenen (10 vragen)', selected: false }
      ];
    }

    container.innerHTML = '';
    presets.forEach(p => {
      const pill = document.createElement('div');
      pill.className = `pill-option ${p.selected ? 'selected' : ''}`;
      pill.dataset.count = p.count;
      pill.textContent = p.label;
      pill.addEventListener('click', () => {
        container.querySelectorAll('.pill-option').forEach(el => el.classList.remove('selected'));
        pill.classList.add('selected');
      });
      container.appendChild(pill);
    });
  }

  function setupEventListeners() {
    // Header navigatie
    document.getElementById('brand-btn')?.addEventListener('click', () => {
      if (currentTest) {
        saveSession();
      }
      stopTimer();
      checkResumeBanner();
      switchView('home');
    });

    // Thema Modal Buttons
    document.getElementById('btn-show-theme-modal')?.addEventListener('click', () => {
      document.getElementById('theme-modal')?.classList.add('active');
    });
    document.getElementById('btn-close-theme-modal')?.addEventListener('click', () => {
      document.getElementById('theme-modal')?.classList.remove('active');
    });
    document.getElementById('btn-save-theme')?.addEventListener('click', () => {
      document.getElementById('theme-modal')?.classList.remove('active');
    });

    // Theme opties klik
    document.querySelectorAll('.theme-option-card').forEach(card => {
      card.addEventListener('click', () => {
        applyTheme(card.dataset.theme);
      });
    });

    // Resume banner buttons
    document.getElementById('btn-resume-session')?.addEventListener('click', resumeSession);
    document.getElementById('btn-discard-session')?.addEventListener('click', () => {
      if (confirm('Weet je zeker dat je de opgeslagen toets wilt wissen en opnieuw wilt beginnen?')) {
        currentTest = null;
        clearSession();
      }
    });

    // Wi-Fi Modal
    document.getElementById('btn-show-wifi-modal')?.addEventListener('click', () => {
      document.getElementById('wifi-modal')?.classList.add('active');
    });
    document.getElementById('btn-close-wifi-modal')?.addEventListener('click', () => {
      document.getElementById('wifi-modal')?.classList.remove('active');
    });

    // History Detail Modal
    document.getElementById('btn-close-history-detail-modal')?.addEventListener('click', () => {
      document.getElementById('history-detail-modal')?.classList.remove('active');
    });

    // Resultaten & Geschiedenis
    document.getElementById('btn-show-stats')?.addEventListener('click', loadHistoryView);
    document.getElementById('btn-back-from-history')?.addEventListener('click', () => {
      checkResumeBanner();
      switchView('home');
    });

    // Student naam wijzigen
    document.getElementById('student-name-badge')?.addEventListener('click', () => {
      const nieuw = prompt('Hoe heet de leerling?', studentName);
      if (nieuw && nieuw.trim()) {
        studentName = nieuw.trim();
        localStorage.setItem('doorstroomtoets_name', studentName);
        updateStudentNameDisplay();
      }
    });

    // Keuzeopties op startscherm
    const domainCards = document.querySelectorAll('.domain-choice');
    const subtopicSection = document.getElementById('rekenen-subtopic-section');
    domainCards.forEach(card => {
      card.addEventListener('click', () => {
        domainCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        const chosenDomain = card.dataset.domain;
        if (subtopicSection) {
          subtopicSection.style.display = chosenDomain === 'rekenen' ? 'block' : 'none';
        }
        updateCountPillsForDomain(chosenDomain, chosenDomain === 'rekenen' ? selectedSubTopic : 'all');
      });
    });

    // Sub-onderwerp kaartjes voor Rekenen
    const subtopicPills = document.querySelectorAll('.subtopic-pill');
    subtopicPills.forEach(pill => {
      pill.addEventListener('click', () => {
        subtopicPills.forEach(p => p.classList.remove('selected'));
        pill.classList.add('selected');
        selectedSubTopic = pill.dataset.subtopic || 'all';
        updateCountPillsForDomain('rekenen', selectedSubTopic);
      });
    });

    setupSelectionCards('.mode-card', 'selected');

    // Start knop
    document.getElementById('btn-start-test')?.addEventListener('click', startStandardTest);

    // AI modal
    document.getElementById('btn-open-ai-modal')?.addEventListener('click', () => {
      document.getElementById('ai-modal')?.classList.add('active');
    });
    document.getElementById('btn-close-ai-modal')?.addEventListener('click', () => {
      document.getElementById('ai-modal')?.classList.remove('active');
    });
    document.getElementById('btn-generate-ai')?.addEventListener('click', startAiTest);

    // Quiz controls
    document.getElementById('btn-prev-question')?.addEventListener('click', prevQuestion);
    document.getElementById('btn-next-question')?.addEventListener('click', nextQuestion);
    
    // Inleveren & Cito Overzicht
    document.getElementById('btn-finish-test')?.addEventListener('click', openCitoOverview);
    document.getElementById('btn-open-cito-overview')?.addEventListener('click', openCitoOverview);
    document.getElementById('btn-close-cito-overview')?.addEventListener('click', closeCitoOverview);
    document.getElementById('btn-cito-resume')?.addEventListener('click', closeCitoOverview);
    document.getElementById('btn-cito-confirm-submit')?.addEventListener('click', () => {
      closeCitoOverview();
      submitTest();
    });

    // Vraag markeren (Flag)
    document.getElementById('btn-quiz-flag')?.addEventListener('click', toggleFlagCurrentQuestion);

    // Hint knop
    document.getElementById('btn-quiz-hint')?.addEventListener('click', toggleHint);
    document.getElementById('btn-show-hint-step2')?.addEventListener('click', revealHintStep2);

    // Kladblok knop
    document.getElementById('btn-quiz-scratchpad')?.addEventListener('click', () => {
      Kladblok.show();
    });

    // Voorleesknop
    document.getElementById('btn-quiz-speak')?.addEventListener('click', speakCurrentQuestion);

    // Resultaten knoppen
    document.getElementById('btn-new-test')?.addEventListener('click', () => {
      checkResumeBanner();
      switchView('home');
    });
    document.getElementById('btn-view-history-from-results')?.addEventListener('click', loadHistoryView);
  }

  function setupSelectionCards(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      el.addEventListener('click', () => {
        const parent = el.parentElement;
        parent.querySelectorAll(selector).forEach(sibling => sibling.classList.remove(activeClass));
        el.classList.add(activeClass);
      });
    });
  }

  function updateStudentNameDisplay() {
    const el = document.getElementById('student-name-badge');
    if (el) {
      el.textContent = `👤 ${studentName}`;
    }
  }

  // Test Starten
  async function startStandardTest() {
    const selectedDomain = document.querySelector('.domain-choice.selected')?.dataset.domain || 'all';
    const selectedCount = document.querySelector('.pill-option.selected')?.dataset.count || 10;
    const selectedMode = document.querySelector('.mode-card.selected')?.dataset.mode || 'practice';

    const btn = document.getElementById('btn-start-test');
    const originalText = btn.innerHTML;
    btn.innerHTML = '⏳ Toets wordt klaargezet...';
    btn.disabled = true;

    const seenKey = selectedMode === 'exam' ? 'doorstroomtoets_seen_texts_exam' : 'doorstroomtoets_seen_texts_practice';
    let excludeTextIds = [];
    try {
      excludeTextIds = JSON.parse(localStorage.getItem(seenKey) || '[]');
    } catch (e) {
      excludeTextIds = [];
    }

    try {
      const res = await fetch('/api/generate-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: selectedDomain,
          subTopic: selectedDomain === 'rekenen' ? selectedSubTopic : 'all',
          count: parseInt(selectedCount),
          mode: selectedMode,
          excludeTextIds
        })
      });

      if (!res.ok) throw new Error('Kon toets niet ophalen');
      const test = await res.json();
      initTestSession(test);
    } catch (err) {
      alert('Er ging iets mis bij het starten van de toets: ' + err.message);
    } finally {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  }

  // AI Test Starten
  async function startAiTest() {
    const apiKey = document.getElementById('ai-api-key')?.value.trim();
    const theme = document.getElementById('ai-theme')?.value.trim();
    const domain = document.getElementById('ai-domain')?.value || 'all';
    const count = parseInt(document.getElementById('ai-count')?.value || '10');

    if (!apiKey) {
      alert('Voer eerst een geldige Google Gemini API Key in.');
      return;
    }

    const btn = document.getElementById('btn-generate-ai');
    btn.innerHTML = '🧠 Gemini bedenkt unieke toets... Even geduld!';
    btn.disabled = true;

    try {
      const res = await fetch('/api/generate-ai-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey,
          theme,
          domain,
          count,
          mode: 'practice'
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Genereren mislukt');
      }

      const test = await res.json();
      document.getElementById('ai-modal')?.classList.remove('active');
      initTestSession(test);
    } catch (err) {
      alert('AI Toets fout: ' + err.message);
    } finally {
      btn.innerHTML = 'Toets Genereren met AI 🚀';
      btn.disabled = false;
    }
  }

  function initTestSession(test) {
    currentTest = test;
    currentQuestionIndex = 0;
    userAnswers = {};
    hintsUsed = {};
    flaggedQuestions = {};
    secondsElapsed = 0;
    growthPoints = 0;
    growthStreak = 0;
    growthLevel = 1;
    maxGrowthLevel = 1;
    questionFeedbackExtra = {};

    // Sla geziene leesteksten lokaal op dit eigen apparaat op (zodat elk kind een eigen tekstrotatie heeft)
    try {
      const seenKey = test.mode === 'exam' ? 'doorstroomtoets_seen_texts_exam' : 'doorstroomtoets_seen_texts_practice';
      const prevSeen = JSON.parse(localStorage.getItem(seenKey) || '[]');
      const newTitles = Array.from(
        new Set((test.questions || []).map(q => q.passageTitle).filter(Boolean))
      );
      if (newTitles.length > 0) {
        const merged = [...prevSeen.filter(t => !newTitles.includes(t)), ...newTitles];
        // Houd de laatste 16 van de 20 teksten vast zodat er altijd een frisse cyclus is
        localStorage.setItem(seenKey, JSON.stringify(merged.slice(-16)));
      }
    } catch (e) {
      // Negeer als localStorage niet beschikbaar is
    }

    startTimer();
    renderQuestionNavigator();
    renderCurrentQuestion();
    saveSession();
    switchView('quiz');
  }

  // Hulpfuncties voor de Opbouwende Groei-modus (Punten & Levels)
  function getGrowthThresholds(totalQuestions = 10) {
    // Schaal de drempels mee met de lengte van de sessie zodat je bij 10 vragen al na 2 goede antwoorden stijgt
    const level2Points = Math.max(40, Math.min(100, Math.round(totalQuestions * 0.22) * 20));
    const level3Points = Math.max(95, Math.min(240, Math.round(totalQuestions * 0.50) * 20));
    return { level2Points, level3Points };
  }

  function activateQuestionVariantForGrowth(q, targetLevel) {
    if (!q || !q.variants || !q.variants[targetLevel]) return;
    // Alleen aanpassen zolang de vraag nog NIET beantwoord is
    if (userAnswers[q.id] !== undefined) return;
    if (q.activeGrowthLevel === targetLevel) return;

    const variant = q.variants[targetLevel];
    q.subCategory = variant.subCategory;
    q.question = variant.question;
    q.options = variant.options;
    q.correctIndex = variant.correctIndex;
    q.visual = variant.visual;
    q.hint1 = variant.hint1;
    q.hint2 = variant.hint2;
    q.explanation = variant.explanation;
    q.difficultyLevel = variant.difficultyLevel || targetLevel;
    q.levelLabel = variant.levelLabel;
    if (variant.passage) q.passage = variant.passage;
    if (variant.passageTitle) q.passageTitle = variant.passageTitle;
    q.activeGrowthLevel = targetLevel;
  }

  function updateGrowthStatusBar() {
    const bar = document.getElementById('growth-status-bar');
    if (!bar || !currentTest) return;

    if (currentTest.mode !== 'growth') {
      bar.style.display = 'none';
      return;
    }

    bar.style.display = 'flex';
    const badgeEl = document.getElementById('growth-level-badge');
    const pointsEl = document.getElementById('growth-points-pill');
    const streakEl = document.getElementById('growth-streak-pill');
    const nextTextEl = document.getElementById('growth-next-level-text');
    const fillEl = document.getElementById('growth-level-progress-fill');

    const levelNames = {
      1: '🌱 Level 1: Makkelijk (1F Basis)',
      2: '🌿 Level 2: Gemiddeld (1F+ Doorstroom)',
      3: '🏆 Level 3: Pittig (1S/2F Havo-Vwo)'
    };

    if (badgeEl) {
      badgeEl.className = `growth-level-badge level-${growthLevel}`;
      badgeEl.textContent = levelNames[growthLevel] || levelNames[1];
    }

    if (pointsEl) {
      pointsEl.textContent = `⭐ ${growthPoints} punten`;
    }

    if (streakEl) {
      if (growthStreak >= 2) {
        streakEl.style.display = 'inline-block';
        streakEl.textContent = `🔥 ${growthStreak} goed op rij!`;
      } else {
        streakEl.style.display = 'none';
      }
    }

    const { level2Points, level3Points } = getGrowthThresholds(currentTest.totalQuestions || 10);

    if (growthLevel === 1) {
      const remaining = Math.max(0, level2Points - growthPoints);
      const pct = Math.min(100, Math.round((growthPoints / level2Points) * 100));
      if (nextTextEl) nextTextEl.textContent = `Nog ${remaining} pt tot Level 2 🌿 (Gemiddeld)`;
      if (fillEl) fillEl.style.width = `${pct}%`;
    } else if (growthLevel === 2) {
      const remaining = Math.max(0, level3Points - growthPoints);
      const span = Math.max(1, level3Points - level2Points);
      const pct = Math.min(100, Math.max(0, Math.round(((growthPoints - level2Points) / span) * 100)));
      if (nextTextEl) nextTextEl.textContent = `Nog ${remaining} pt tot Level 3 🏆 (Havo/Vwo)`;
      if (fillEl) fillEl.style.width = `${pct}%`;
    } else {
      if (nextTextEl) nextTextEl.textContent = `🏆 Hoogste Level bereikt! Blijf punten scoren!`;
      if (fillEl) fillEl.style.width = '100%';
    }
  }

  // Timer
  function startTimer() {
    stopTimer();
    const timerEl = document.getElementById('quiz-timer');
    timerInterval = setInterval(() => {
      secondsElapsed++;
      const m = Math.floor(secondsElapsed / 60);
      const s = secondsElapsed % 60;
      if (timerEl) {
        timerEl.textContent = `⏱️ ${m}:${s < 10 ? '0' : ''}${s}`;
      }
      if (secondsElapsed % 5 === 0) {
        saveSession();
      }
    }, 1000);
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  // Vlag / Markeer functionaliteit (Cito)
  function toggleFlagCurrentQuestion() {
    if (!currentTest || !currentTest.questions[currentQuestionIndex]) return;
    const q = currentTest.questions[currentQuestionIndex];
    flaggedQuestions[q.id] = !flaggedQuestions[q.id];

    updateFlagButton();
    renderQuestionNavigator();
    saveSession();
  }

  function updateFlagButton() {
    const btn = document.getElementById('btn-quiz-flag');
    if (!btn || !currentTest) return;
    const q = currentTest.questions[currentQuestionIndex];
    const isFlagged = Boolean(flaggedQuestions[q.id]);
    btn.classList.toggle('active', isFlagged);
    btn.innerHTML = isFlagged ? '🚩 Gemarkeerd' : '🚩 Markeren';
  }

  // Vragen Navigator Dots
  function renderQuestionNavigator() {
    const container = document.getElementById('question-dots-grid');
    if (!container || !currentTest) return;

    container.innerHTML = '';
    currentTest.questions.forEach((q, idx) => {
      const dot = document.createElement('button');
      dot.className = 'dot-btn question-dot';
      dot.textContent = idx + 1;
      dot.dataset.index = idx;

      if (idx === currentQuestionIndex) dot.classList.add('current');
      if (flaggedQuestions[q.id]) dot.classList.add('flagged');

      if (userAnswers[q.id] !== undefined) {
        dot.classList.add('answered');
        if (currentTest.mode === 'practice' || currentTest.mode === 'growth') {
          const isCorrect = Number(userAnswers[q.id]) === Number(q.correctIndex);
          dot.classList.add(isCorrect ? 'correct' : 'wrong');
        }
      }

      dot.addEventListener('click', () => {
        currentQuestionIndex = idx;
        renderCurrentQuestion();
        saveSession();
      });

      container.appendChild(dot);
    });
  }

  // Huidige Vraag Renderen
  function renderCurrentQuestion() {
    if (!currentTest || !currentTest.questions[currentQuestionIndex]) return;
    const q = currentTest.questions[currentQuestionIndex];
    const isGrowthMode = currentTest.mode === 'growth';
    const isPracticeMode = currentTest.mode === 'practice' || isGrowthMode;

    // In Opbouwende Groei-modus: pas de vraagvariant aan op het huidige growthLevel (zolang nog niet beantwoord)
    if (isGrowthMode) {
      activateQuestionVariantForGrowth(q, growthLevel);
    }
    updateGrowthStatusBar();

    // Stop eventueel actieve voorlezer
    Voorlezer.stop();

    // 🔒 BELANGRIJK: Hint knop ALLEEN tonen in Oefenmodus en Groei-modus!
    // In Toetsmodus (Cito simulatie) is de hintknop volledig verborgen.
    const hintBtn = document.getElementById('btn-quiz-hint');
    if (hintBtn) {
      hintBtn.style.display = isPracticeMode ? 'inline-flex' : 'none';
    }

    // Update vlaggenknop status
    updateFlagButton();

    // Update navigatieknoppen & teller
    document.getElementById('question-counter-text').textContent = `Vraag ${currentQuestionIndex + 1} van ${currentTest.totalQuestions}`;
    const pct = Math.round(((currentQuestionIndex + 1) / currentTest.totalQuestions) * 100);
    document.getElementById('progress-bar-fill').style.width = `${pct}%`;

    // Leestekst paneel (Begrijpend Lezen) met markeerstift ondersteuning
    const passageCard = document.getElementById('quiz-passage-card');
    if (q.passage) {
      passageCard.style.display = 'block';
      document.getElementById('passage-title').textContent = q.passageTitle || 'Leestekst';
      if (window.Highlighter) {
        Highlighter.restorePassageHighlights(q.passageTitle, q.passage);
      } else {
        document.getElementById('passage-body').textContent = q.passage;
      }
    } else {
      passageCard.style.display = 'none';
    }

    // Vraag meta, level badge & tekst
    document.getElementById('question-subcat-badge').textContent = `${getDomainEmoji(q.domain)} ${q.subCategory || q.domain}`;
    const levelBadgeEl = document.getElementById('question-level-badge');
    if (levelBadgeEl) {
      if (isGrowthMode || q.levelLabel) {
        const lvl = q.difficultyLevel || growthLevel || 1;
        levelBadgeEl.className = `level-tag-badge level-${lvl}`;
        levelBadgeEl.textContent = q.levelLabel || `Level ${lvl}`;
        levelBadgeEl.style.display = 'inline-block';
      } else {
        levelBadgeEl.style.display = 'none';
      }
    }
    document.getElementById('question-text').innerHTML = formatMarkdown(q.question);

    // ✨ Visueel Plaatje Renderen (Rechthoek, Box3D, Verhoudingstabel, Breukenstrook etc.)
    const questionVisualContainer = document.getElementById('question-visual-container');
    if (questionVisualContainer) {
      if (q.visual && window.VisualRenderer) {
        // BELANGRIJK: isSolution = false zodat het antwoord NOOIT in de vraag staat!
        questionVisualContainer.innerHTML = VisualRenderer.render(q.visual, false);
        questionVisualContainer.style.display = 'block';
      } else {
        questionVisualContainer.innerHTML = '';
        questionVisualContainer.style.display = 'none';
      }
    }

    // Hint verbergen bij nieuwe vraag
    hideHint();

    // Opties renderen
    const optionsGrid = document.getElementById('options-grid');
    optionsGrid.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    const currentAnswer = userAnswers[q.id];

    q.options.forEach((optText, optIdx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.dataset.index = optIdx;

      btn.innerHTML = `
        <span class="option-letter">${letters[optIdx]}</span>
        <span class="option-content">${formatMarkdown(String(optText))}</span>
      `;

      if (currentAnswer !== undefined) {
        if (Number(currentAnswer) === optIdx) {
          btn.classList.add('selected');
        }

        if (isPracticeMode) {
          // Direct feedback
          if (optIdx === Number(q.correctIndex)) {
            btn.classList.add('correct');
          } else if (Number(currentAnswer) === optIdx) {
            btn.classList.add('wrong');
          }
        }
      }

      btn.addEventListener('click', () => handleOptionSelect(q, optIdx));
      optionsGrid.appendChild(btn);
    });

    // Feedback box (alleen in oefenmodus of groeimodus als er al geantwoord is)
    const feedbackBox = document.getElementById('feedback-box');
    if (isPracticeMode && currentAnswer !== undefined) {
      const isCorrect = Number(currentAnswer) === Number(q.correctIndex);
      const extraGrowthHtml = questionFeedbackExtra[q.id]
        ? `<div style="margin-bottom: 10px; padding: 8px 12px; border-radius: 8px; background: rgba(255,255,255,0.75); border: 1px solid #cbd5e1; font-weight: 700;">${questionFeedbackExtra[q.id]}</div>`
        : '';
      feedbackBox.className = `feedback-box ${isCorrect ? 'correct' : 'wrong'}`;
      feedbackBox.innerHTML = `
        <div class="feedback-title">${isCorrect ? '🎉 Helemaal Goed!' : '💡 Niet helemaal goed, maar geen probleem!'}</div>
        ${extraGrowthHtml}
        <div class="feedback-explanation">
          <strong>Uitleg:</strong><br>${formatMarkdown(q.explanation || 'Geen toelichting beschikbaar.')}
        </div>
      `;
      feedbackBox.style.display = 'block';
    } else {
      feedbackBox.style.display = 'none';
    }

    // Knoppen update
    document.getElementById('btn-prev-question').disabled = currentQuestionIndex === 0;

    const isLast = currentQuestionIndex === currentTest.totalQuestions - 1;
    const nextBtn = document.getElementById('btn-next-question');
    const finishBtn = document.getElementById('btn-finish-test');

    if (isLast) {
      nextBtn.style.display = 'none';
      finishBtn.style.display = 'inline-flex';
    } else {
      nextBtn.style.display = 'inline-flex';
      finishBtn.style.display = 'none';
    }

    renderQuestionNavigator();
  }

  // Antwoord selecteren
  function handleOptionSelect(question, selectedIdx) {
    const isGrowthMode = currentTest.mode === 'growth';
    const isPracticeMode = currentTest.mode === 'practice' || isGrowthMode;

    // In oefenmodus en groeimodus: als je al beantwoord hebt, kun je niet meer switchen
    if (isPracticeMode && userAnswers[question.id] !== undefined) {
      return;
    }

    userAnswers[question.id] = selectedIdx;

    if (isGrowthMode) {
      const isCorrect = Number(selectedIdx) === Number(question.correctIndex);
      const { level2Points, level3Points } = getGrowthThresholds(currentTest.totalQuestions || 10);
      const oldLevel = growthLevel;

      if (isCorrect) {
        growthStreak++;
        const basePts = hintsUsed[question.id] ? 15 : 20;
        const streakBonus = growthStreak >= 2 ? 5 : 0;
        const levelBonus = (growthLevel - 1) * 5;
        const earned = basePts + streakBonus + levelBonus;
        growthPoints += earned;

        let newLevel = 1;
        if (growthPoints >= level3Points) newLevel = 3;
        else if (growthPoints >= level2Points) newLevel = 2;

        growthLevel = newLevel;
        if (growthLevel > maxGrowthLevel) maxGrowthLevel = growthLevel;

        let msg = `⭐ <strong>+${earned} punten verdiend!</strong> (Totaal: ${growthPoints} pt)`;
        if (streakBonus > 0) {
          msg += ` &nbsp;•&nbsp; 🔥 Reeks van ${growthStreak} goed op rij (+${streakBonus} bonus)!`;
        }
        if (newLevel > oldLevel) {
          const levelTitle = newLevel === 2 ? '🌿 Level 2: Gemiddeld (1F+)' : '🏆 Level 3: Pittig (1S/2F Havo-Vwo)';
          msg += `<br><span style="color: #b45309; display: inline-block; margin-top: 4px;">🚀 <strong>LEVEL UP!</strong> Je bent gestegen naar <strong>${levelTitle}</strong>! De volgende vragen worden een stapje uitdagender!</span>`;
        }
        questionFeedbackExtra[question.id] = msg;
      } else {
        growthStreak = 0;
        if (growthLevel > 1) {
          growthPoints = Math.max(0, growthPoints - 10);
        }
        let newLevel = 1;
        if (growthPoints >= level3Points) newLevel = 3;
        else if (growthPoints >= level2Points) newLevel = 2;
        growthLevel = newLevel;

        if (newLevel < oldLevel) {
          questionFeedbackExtra[question.id] = `🌱 We doen even één stapje terug naar <strong>Level ${newLevel}</strong> zodat je weer rustig punten kunt opbouwen!`;
        } else {
          questionFeedbackExtra[question.id] = `💪 Geen zorgen! Lees de uitleg hieronder rustig door en pak bij de volgende vraag weer punten (${growthPoints} pt).`;
        }
      }
    }

    saveSession();
    renderCurrentQuestion();
  }

  // Hint Toggle (Alleen in oefenmodus)
  function toggleHint() {
    if (currentTest && currentTest.mode === 'exam') return;
    const hintCard = document.getElementById('quiz-hint-card');
    if (hintCard.style.display === 'block') {
      hideHint();
    } else {
      showHint();
    }
  }

  function showHint() {
    if (currentTest && currentTest.mode === 'exam') return;
    if (!currentTest || !currentTest.questions[currentQuestionIndex]) return;
    const q = currentTest.questions[currentQuestionIndex];
    hintsUsed[q.id] = true;
    saveSession();

    const hintCard = document.getElementById('quiz-hint-card');
    document.getElementById('hint-step1-content').innerHTML = formatMarkdown(q.hint1 || 'Lees de vraag nog eens rustig door.');
    document.getElementById('hint-step2-wrapper').style.display = 'none';
    hintCard.style.display = 'block';
  }

  function revealHintStep2() {
    if (currentTest && currentTest.mode === 'exam') return;
    if (!currentTest || !currentTest.questions[currentQuestionIndex]) return;
    const q = currentTest.questions[currentQuestionIndex];
    document.getElementById('hint-step2-content').innerHTML = formatMarkdown(q.hint2 || q.explanation || 'Kijk goed naar de regels van deze som.');

    // ✨ Toon visual in de hint indien beschikbaar (isSolution = true)
    const hintVisualContainer = document.getElementById('hint-visual-container');
    if (hintVisualContainer) {
      if ((q.hintVisual || q.visual) && window.VisualRenderer) {
        hintVisualContainer.innerHTML = VisualRenderer.render(q.hintVisual || q.visual, true);
        hintVisualContainer.style.display = 'block';
      } else {
        hintVisualContainer.innerHTML = '';
        hintVisualContainer.style.display = 'none';
      }
    }

    document.getElementById('hint-step2-wrapper').style.display = 'block';
    saveSession();
  }

  function hideHint() {
    const hintCard = document.getElementById('quiz-hint-card');
    if (hintCard) hintCard.style.display = 'none';
  }

  // Cito Inlever-Overzicht Modal
  function openCitoOverview() {
    if (!currentTest) return;
    const modal = document.getElementById('cito-overview-modal');
    if (!modal) return;

    let answeredCount = 0;
    let unansweredCount = 0;
    let flaggedCount = 0;

    const grid = document.getElementById('cito-overview-grid');
    grid.innerHTML = '';

    currentTest.questions.forEach((q, idx) => {
      const isAnswered = userAnswers[q.id] !== undefined;
      const isFlagged = Boolean(flaggedQuestions[q.id]);

      if (isAnswered) answeredCount++;
      else unansweredCount++;
      if (isFlagged) flaggedCount++;

      const cell = document.createElement('div');
      cell.className = `cito-q-cell ${isAnswered ? 'status-answered' : 'status-unanswered'} ${isFlagged ? 'is-flagged' : ''}`;
      cell.textContent = idx + 1;
      cell.title = `Vraag ${idx + 1}: ${isAnswered ? 'Beantwoord' : 'Nog open'}${isFlagged ? ' (Gemarkeerd 🚩)' : ''}`;

      cell.addEventListener('click', () => {
        closeCitoOverview();
        currentQuestionIndex = idx;
        renderCurrentQuestion();
        saveSession();
      });

      grid.appendChild(cell);
    });

    document.getElementById('cito-stat-answered').textContent = answeredCount;
    document.getElementById('cito-stat-unanswered').textContent = unansweredCount;
    document.getElementById('cito-stat-flagged').textContent = flaggedCount;

    const warningBanner = document.getElementById('cito-unanswered-warning');
    if (warningBanner) {
      warningBanner.style.display = unansweredCount > 0 ? 'flex' : 'none';
    }

    modal.classList.add('active');
  }

  function closeCitoOverview() {
    document.getElementById('cito-overview-modal')?.classList.remove('active');
  }

  // Voorlezen van de vraag
  function speakCurrentQuestion() {
    if (!currentTest || !currentTest.questions[currentQuestionIndex]) return;
    const q = currentTest.questions[currentQuestionIndex];
    const btn = document.getElementById('btn-quiz-speak');

    if (Voorlezer.isSpeaking()) {
      Voorlezer.stop();
      btn.textContent = '🔊 Voorlezen';
      return;
    }

    let speechText = '';
    if (q.passage) {
      speechText += `Leestekst: ${q.passageTitle}. ${q.passage}. `;
    }
    speechText += `Vraag: ${q.question}. `;

    btn.textContent = '⏹️ Stoppen';
    Voorlezer.speak(speechText, (isSpeaking) => {
      btn.textContent = isSpeaking ? '⏹️ Stoppen' : '🔊 Voorlezen';
    });
  }

  function prevQuestion() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      renderCurrentQuestion();
      saveSession();
    }
  }

  function nextQuestion() {
    if (currentQuestionIndex < currentTest.totalQuestions - 1) {
      currentQuestionIndex++;
      renderCurrentQuestion();
      saveSession();
    }
  }

  // Toets Inleveren & Resultaten
  async function submitTest() {
    stopTimer();
    Voorlezer.stop();

    try {
      const res = await fetch('/api/submit-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testId: currentTest.id,
          studentName,
          domain: currentTest.domain,
          subTopic: currentTest.subTopic || 'all',
          subTopicInfo: currentTest.subTopicInfo || null,
          mode: currentTest.mode,
          growthStats: currentTest.mode === 'growth' ? {
            points: growthPoints,
            maxLevel: maxGrowthLevel,
            finalLevel: growthLevel
          } : null,
          timeSpentSeconds: secondsElapsed,
          questions: currentTest.questions,
          userAnswers,
          hintsUsed
        })
      });

      if (!res.ok) throw new Error('Kon resultaten niet verwerken');
      const resultData = await res.json();

      // Bewaar resultaat ook lokaal in de browser (zodat het op Vercel / iPad altijd behouden blijft)
      try {
        const localHist = JSON.parse(localStorage.getItem('doorstroomtoets_local_history') || '[]');
        localHist.unshift(resultData);
        localStorage.setItem('doorstroomtoets_local_history', JSON.stringify(localHist.slice(0, 50)));
      } catch (e) {}

      // Clear active in-progress session
      clearSession();
      currentTest = null;

      renderResults(resultData);
      switchView('results');
    } catch (err) {
      alert('Fout bij het inleveren: ' + err.message);
    }
  }

  function renderResults(res) {
    document.getElementById('result-student-name').textContent = res.studentName || studentName;
    document.getElementById('result-score-text').textContent = `${res.score} / ${res.totalQuestions}`;
    let pctSubText = `(${res.percentage}% goed)`;
    if (res.growthStats) {
      const lvlIcons = { 1: '🌱 Level 1', 2: '🌿 Level 2', 3: '🏆 Level 3 (Havo/Vwo)' };
      pctSubText += `  •  ⭐ ${res.growthStats.points} punten  •  Hoogste niveau: ${lvlIcons[res.growthStats.maxLevel] || 'Level 1'}`;
    }
    document.getElementById('result-percentage-text').textContent = pctSubText;

    // Advies badge
    const advies = res.schooladvies;
    const badgeEl = document.getElementById('result-advies-badge');
    badgeEl.textContent = advies.niveau;
    badgeEl.style.backgroundColor = advies.kleur || '#4f46e5';

    document.getElementById('result-advies-desc').textContent = advies.beschrijving;

    // ✨ Cito Referentieniveaus (1F / 1S / 2F)
    const referentieContainer = document.getElementById('result-referentie-container');
    if (referentieContainer) {
      referentieContainer.innerHTML = '';
      if (advies.referentieniveaus) {
        const ref1F = advies.referentieniveaus.niveau1F;
        const refStreef = advies.referentieniveaus.streefniveau;

        referentieContainer.innerHTML = `
          <div class="referentie-card">
            <div class="ref-title">${ref1F.label}</div>
            <div class="ref-status ${ref1F.behaald ? 'behaald' : 'ontwikkeling'}">
              ${ref1F.omschrijving}
            </div>
            <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">
              Basisbeheersing van de kerndoelen (min. 50%)
            </div>
          </div>
          <div class="referentie-card">
            <div class="ref-title">${refStreef.label}</div>
            <div class="ref-status ${refStreef.behaald ? 'behaald' : 'ontwikkeling'}">
              ${refStreef.omschrijving}
            </div>
            <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">
              Gevorderd niveau voor havo/vwo (min. 75%)
            </div>
          </div>
        `;
      }
    }

    // Domein breakdown
    const breakdownContainer = document.getElementById('domain-scores-container');
    breakdownContainer.innerHTML = '';
    const domainLabels = {
      rekenen: '🧮 Rekenen',
      begrijpendLezen: '📖 Begrijpend Lezen',
      taalverzorging: '✍️ Taalverzorging'
    };

    if (res.domainBreakdown) {
      Object.keys(res.domainBreakdown).forEach(d => {
        const item = res.domainBreakdown[d];
        if (item.total > 0) {
          const pct = Math.round((item.correct / item.total) * 100);
          const card = document.createElement('div');
          card.className = 'domain-score-card';
          card.innerHTML = `
            <div><strong>${domainLabels[d] || d}</strong></div>
            <div class="domain-score-pct">${pct}%</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">${item.correct} van de ${item.total} goed</div>
          `;
          breakdownContainer.appendChild(card);
        }
      });
    }

    // Filterknoppen & Review lijst (alle vragen en gemaakte keuzes)
    const reviewList = document.getElementById('review-questions-list');
    let currentResultFilter = 'all';

    const countTotal = res.reviewDetails.length;
    const countCorrect = res.reviewDetails.filter(d => d.isCorrect).length;
    const countWrong = countTotal - countCorrect;

    const btnAll = document.getElementById('btn-filter-res-all');
    const btnWrong = document.getElementById('btn-filter-res-wrong');
    const btnCorrect = document.getElementById('btn-filter-res-correct');

    if (btnAll) btnAll.textContent = `Alle Vragen (${countTotal})`;
    if (btnWrong) btnWrong.textContent = `❌ Alleen Fout (${countWrong})`;
    if (btnCorrect) btnCorrect.textContent = `✅ Alleen Goed (${countCorrect})`;

    renderQuestionReviewItems(reviewList, res.reviewDetails, currentResultFilter);

    // Event listeners voor filterknoppen op resultatenpagina
    const pills = document.querySelectorAll('#results-filter-pills .pill-option');
    pills.forEach(pill => {
      pill.onclick = () => {
        pills.forEach(p => p.classList.remove('selected'));
        pill.classList.add('selected');
        currentResultFilter = pill.dataset.filter;
        renderQuestionReviewItems(reviewList, res.reviewDetails, currentResultFilter);
      };
    });
  }

  // Generieke functie om lijst met vraagbeoordelingen te renderen
  function renderQuestionReviewItems(container, items, filter = 'all') {
    if (!container) return;
    container.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    const filtered = (items || []).filter(item => {
      if (filter === 'wrong') return !item.isCorrect;
      if (filter === 'correct') return item.isCorrect;
      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 28px; color: var(--text-muted); font-size: 0.95rem;">
          ${filter === 'wrong' ? '🎉 Geweldig! Alle vragen in deze toets zijn goed beantwoord!' : 'Geen vragen gevonden voor deze selectie.'}
        </div>
      `;
      return;
    }

    filtered.forEach((item, idx) => {
      const reviewItem = document.createElement('div');
      reviewItem.className = 'review-item';

      const hasValidUserChoice = item.userSelectedIndex !== undefined && 
                                 item.userSelectedIndex !== null && 
                                 item.options && 
                                 item.options[item.userSelectedIndex] !== undefined;

      const userChoiceText = hasValidUserChoice
        ? `${letters[item.userSelectedIndex] || '?'}: ${item.options[item.userSelectedIndex]}` 
        : 'Geen antwoord gegeven';

      const hasValidCorrectChoice = item.correctIndex !== undefined && 
                                    item.correctIndex !== null && 
                                    item.options && 
                                    item.options[item.correctIndex] !== undefined;

      const correctChoiceText = hasValidCorrectChoice
        ? `${letters[item.correctIndex] || '?'}: ${item.options[item.correctIndex]}`
        : 'Onbekend';

      reviewItem.innerHTML = `
        <div class="review-header">
          <strong>Vraag ${item.number || (idx + 1)} (${item.subCategory || item.domain})${item.levelLabel ? ` <span class="level-tag-badge level-${item.difficultyLevel || 1}">${item.levelLabel}</span>` : ''}</strong>
          <span class="review-status ${item.isCorrect ? 'correct' : 'wrong'}">
            ${item.isCorrect ? '✅ Goed' : '❌ Fout'}
          </span>
        </div>
        ${item.passageTitle ? `<div style="font-size: 0.85rem; font-weight: 700; color: var(--primary); margin-bottom: 4px;">📖 Tekst: ${item.passageTitle}</div>` : ''}
        <div style="margin-bottom: 8px; font-weight: 600;">
          ${formatMarkdown(item.question)}
        </div>
        <div style="font-size: 0.9rem; margin-bottom: 4px;">
          Jouw antwoord: <span style="font-weight: 700; color: ${item.isCorrect ? '#166534' : '#991b1b'};">${userChoiceText}</span>
        </div>
        ${!item.isCorrect ? `<div style="font-size: 0.9rem; margin-bottom: 6px;">Juiste antwoord: <span style="font-weight: 700; color: #166534;">${correctChoiceText}</span></div>` : ''}
        <div style="font-size: 0.85rem; color: #334155; background: #f8fafc; border-radius: 6px; padding: 10px; margin-top: 6px; border: 1px dashed #cbd5e1;">
          <strong>💡 Uitwerking:</strong> ${formatMarkdown(item.explanation || 'Geen toelichting beschikbaar.')}
          ${item.visual && window.VisualRenderer ? `<div style="margin-top: 10px;">${VisualRenderer.render(item.visual, true)}</div>` : ''}
        </div>
      `;

      container.appendChild(reviewItem);
    });
  }

  // Modal openen om eerdere toets in detail na te kijken
  let activeModalHistoryDetails = [];
  let currentModalFilter = 'all';

  async function openHistoryDetailModal(testId) {
    const modal = document.getElementById('history-detail-modal');
    const titleEl = document.getElementById('history-detail-title');
    const summaryBar = document.getElementById('history-detail-summary-bar');
    const listEl = document.getElementById('history-detail-questions-list');

    titleEl.textContent = '⏳ Toetsdetails laden...';
    summaryBar.innerHTML = '';
    listEl.innerHTML = '<div style="text-align: center; padding: 30px;">Vragen ophalen...</div>';
    modal?.classList.add('active');

    try {
      let data = null;
      try {
        const localHist = JSON.parse(localStorage.getItem('doorstroomtoets_local_history') || '[]');
        data = localHist.find(r => r.id === testId) || null;
      } catch (e) {}

      if (!data) {
        const res = await fetch(`/api/history/${testId}`);
        if (!res.ok) throw new Error('Toetsresultaat kon niet worden geladen');
        data = await res.json();
      }

      activeModalHistoryDetails = data.reviewDetails || [];
      currentModalFilter = 'all';

      const dateStr = new Date(data.date).toLocaleDateString('nl-NL', {
        day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
      });

      titleEl.innerHTML = `📋 Toets Nakijken: ${getDomainLabel(data.domain)} <span style="font-size: 0.85rem; font-weight: normal; color: var(--text-muted); margin-left: 6px;">(${dateStr})</span>`;

      const correctCount = data.score;
      const wrongCount = data.totalQuestions - data.score;

      summaryBar.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
          <div>
            <span style="font-size: 1.15rem; font-weight: 800; color: var(--primary);">${data.score} / ${data.totalQuestions} goed (${data.percentage}%)</span>
            <span style="margin-left: 10px; background: ${data.schooladvies?.kleur || '#4f46e5'}; color: white; padding: 3px 10px; border-radius: 999px; font-size: 0.8rem; font-weight: 700;">
              ${data.schooladvies?.niveau || 'Indicatie'}
            </span>
          </div>
          <div style="font-size: 0.9rem;">
            <span style="color: #166534; font-weight: 700; background: #dcfce7; padding: 4px 10px; border-radius: 6px;">✅ ${correctCount} Goed</span>
            <span style="color: #991b1b; font-weight: 700; background: #fee2e2; padding: 4px 10px; border-radius: 6px; margin-left: 6px;">❌ ${wrongCount} Fout</span>
          </div>
        </div>
      `;

      // Update modal filter pills
      const btnAll = document.getElementById('btn-hist-filter-all');
      const btnWrong = document.getElementById('btn-hist-filter-wrong');
      const btnCorrect = document.getElementById('btn-hist-filter-correct');

      if (btnAll) btnAll.textContent = `Alle Vragen (${data.totalQuestions})`;
      if (btnWrong) btnWrong.textContent = `❌ Alleen Fout (${wrongCount})`;
      if (btnCorrect) btnCorrect.textContent = `✅ Alleen Goed (${correctCount})`;

      document.querySelectorAll('#history-modal-filter-pills .pill-option').forEach(p => {
        p.classList.toggle('selected', p.dataset.filter === 'all');
      });

      renderQuestionReviewItems(listEl, activeModalHistoryDetails, 'all');

      // Setup filter knoppen in modal
      document.querySelectorAll('#history-modal-filter-pills .pill-option').forEach(pill => {
        pill.onclick = () => {
          document.querySelectorAll('#history-modal-filter-pills .pill-option').forEach(p => p.classList.remove('selected'));
          pill.classList.add('selected');
          currentModalFilter = pill.dataset.filter;
          renderQuestionReviewItems(listEl, activeModalHistoryDetails, currentModalFilter);
        };
      });

    } catch (err) {
      listEl.innerHTML = `<div style="color: #dc2626; padding: 20px;">Fout bij laden: ${err.message}</div>`;
    }
  }

  // Geschiedenis & Statistieken weergave
  async function loadHistoryView() {
    switchView('history');
    const statsContainer = document.getElementById('history-stats-box');
    const tableBody = document.getElementById('history-table-body');

    try {
      const [historyRes] = await Promise.all([
        fetch('/api/history')
      ]);

      const serverHistory = await historyRes.json();
      let localHistory = [];
      try {
        localHistory = JSON.parse(localStorage.getItem('doorstroomtoets_local_history') || '[]');
      } catch (e) {}

      // Voeg server- en browsergeschiedenis ontdubbeld samen op ID
      const seenIds = new Set();
      const historyData = [];
      [...localHistory, ...(Array.isArray(serverHistory) ? serverHistory : [])].forEach(item => {
        if (item && item.id && !seenIds.has(item.id)) {
          seenIds.add(item.id);
          historyData.push(item);
        }
      });

      const totalTests = historyData.length;
      const totalQuestions = historyData.reduce((acc, r) => acc + (r.totalQuestions || 0), 0);
      const totalCorrect = historyData.reduce((acc, r) => acc + (r.score || 0), 0);
      const averagePercentage = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
      const statsData = { totalTests, totalQuestions, totalCorrect, averagePercentage };

      // Stats
      statsContainer.innerHTML = `
        <div class="domain-scores" style="margin-bottom: 0;">
          <div class="domain-score-card">
            <div>Totaal Toetsen Gemaakt</div>
            <div class="domain-score-pct">${statsData.totalTests}</div>
          </div>
          <div class="domain-score-card">
            <div>Gemiddelde Score</div>
            <div class="domain-score-pct">${statsData.averagePercentage}%</div>
          </div>
          <div class="domain-score-card">
            <div>Vragen Goed Beantwoord</div>
            <div class="domain-score-pct">${statsData.totalCorrect} / ${statsData.totalQuestions}</div>
          </div>
        </div>
      `;

      // History Table
      tableBody.innerHTML = '';
      if (historyData.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 24px; color: var(--text-muted);">Nog geen eerdere toetsen gevonden. Maak eerst een toets!</td></tr>';
        return;
      }

      historyData.forEach(h => {
        const dateStr = new Date(h.date).toLocaleDateString('nl-NL', {
          day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
        });
        const correctCount = h.correctCount !== undefined ? h.correctCount : h.score;
        const wrongCount = h.wrongCount !== undefined ? h.wrongCount : Math.max(0, h.totalQuestions - h.score);

        const domainDisplay = (h.domain === 'rekenen' && h.subTopicInfo && h.subTopicInfo.id !== 'all')
          ? `🧮 Rekenen: ${h.subTopicInfo.icon} ${h.subTopicInfo.label}`
          : getDomainLabel(h.domain);
        const modeDisplay = h.mode === 'growth'
          ? `🌱🏆 Groei${h.growthStats ? ` (${h.growthStats.points} pt)` : ''}`
          : (h.mode === 'practice' ? '🟢 Oefen' : '🔵 Toets');

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td style="padding: 10px; border-bottom: 1px solid var(--border); white-space: nowrap;">${dateStr}</td>
          <td style="padding: 10px; border-bottom: 1px solid var(--border); font-weight: 600;">${domainDisplay}</td>
          <td style="padding: 10px; border-bottom: 1px solid var(--border); white-space: nowrap;">
            <span style="color: #166534; font-weight: 700; background: #dcfce7; padding: 2px 6px; border-radius: 4px;">✅ ${correctCount}</span>
            <span style="color: #991b1b; font-weight: 700; background: #fee2e2; padding: 2px 6px; border-radius: 4px; margin-left: 4px;">❌ ${wrongCount}</span>
          </td>
          <td style="padding: 10px; border-bottom: 1px solid var(--border); font-weight: 700;">${h.score} / ${h.totalQuestions} (${h.percentage}%)</td>
          <td style="padding: 10px; border-bottom: 1px solid var(--border);">
            <span style="background: ${h.schooladvies?.kleur || '#4f46e5'}; color: white; padding: 2px 8px; border-radius: 999px; font-size: 0.75rem; font-weight: 700;">
              ${h.schooladvies?.niveau || '-'}
            </span>
          </td>
          <td style="padding: 10px; border-bottom: 1px solid var(--border); white-space: nowrap;">${modeDisplay}</td>
          <td style="padding: 10px; border-bottom: 1px solid var(--border); text-align: center;">
            <button class="btn-nav btn-view-past-test" data-id="${h.id}" style="padding: 6px 12px; font-size: 0.8rem; background: var(--bg-card); border: 1px solid var(--border); cursor: pointer; border-radius: 6px;">
              🔍 Vragen Inzien
            </button>
          </td>
        `;
        tableBody.appendChild(tr);
      });

      // Koppel knoppen om eerdere toets in te zien
      document.querySelectorAll('.btn-view-past-test').forEach(btn => {
        btn.addEventListener('click', () => {
          const testId = btn.dataset.id;
          if (testId) openHistoryDetailModal(testId);
        });
      });

    } catch (e) {
      tableBody.innerHTML = `<tr><td colspan="7">Fout bij laden van geschiedenis: ${e.message}</td></tr>`;
    }
  }

  // Helpers
  function getDomainEmoji(domain) {
    if (domain === 'rekenen') return '🧮';
    if (domain === 'begrijpendLezen') return '📖';
    if (domain === 'taalverzorging') return '✍️';
    return '🌟';
  }

  function getDomainLabel(domain) {
    if (domain === 'rekenen') return '🧮 Rekenen';
    if (domain === 'begrijpendLezen') return '📖 Begrijpend Lezen';
    if (domain === 'taalverzorging') return '✍️ Taalverzorging';
    return '🌟 Doorstroomtoets (Mix)';
  }

  function formatMarkdown(text) {
    if (!text) return '';
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  }
})();
