// public/js/highlighter.js - Vloeiende Woord-voor-Woord Markeerstift voor iPad & Browser
(function () {
  let isHighlighterActive = false;
  let currentColor = 'yellow'; // 'yellow' | 'green' | 'pink'
  let passageContainer = null;
  let savedHighlights = {}; // key: passageTitle -> { [wordId]: color }

  // Dragging state
  let isDragging = false;
  let dragMode = null; // 'mark' | 'erase'

  function initHighlighter() {
    passageContainer = document.getElementById('passage-body');
    setupToolbar();
    setupPointerListeners();
  }

  function setupToolbar() {
    const toggleBtn = document.getElementById('btn-toggle-highlighter');
    const colorDots = document.querySelectorAll('.highlighter-color-dot');
    const clearBtn = document.getElementById('btn-clear-highlights');

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        isHighlighterActive = !isHighlighterActive;
        toggleBtn.classList.toggle('active', isHighlighterActive);
        document.getElementById('highlighter-colors-panel')?.classList.toggle('visible', isHighlighterActive);
        passageContainer?.classList.toggle('highlight-mode', isHighlighterActive);
      });
    }

    colorDots.forEach(dot => {
      dot.addEventListener('click', () => {
        colorDots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        currentColor = dot.dataset.color || 'yellow';
      });
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (!passageContainer) return;
        const currentTitle = document.getElementById('passage-title')?.textContent || 'default';
        const words = passageContainer.querySelectorAll('.hl-word');
        words.forEach(w => {
          w.classList.remove('hl-yellow', 'hl-green', 'hl-pink');
        });
        delete savedHighlights[currentTitle];
        window.AppStorage?.saveSession();
      });
    }
  }

  // Verwerkt interacties: vegen met vinger of muis over woorden
  function setupPointerListeners() {
    if (!passageContainer) passageContainer = document.getElementById('passage-body');
    if (!passageContainer) return;

    let isUsingTouch = false;

    const getCoords = (e) => {
      if (e.touches && e.touches.length > 0) {
        return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
      }
      if (e.changedTouches && e.changedTouches.length > 0) {
        return { clientX: e.changedTouches[0].clientX, clientY: e.changedTouches[0].clientY };
      }
      return { clientX: e.clientX, clientY: e.clientY };
    };

    // Pointer down / Touch start
    const handleStart = (e) => {
      if (!isHighlighterActive) return;

      if (e.type === 'touchstart') {
        isUsingTouch = true;
      } else if (isUsingTouch && (e.type === 'pointerdown' || e.type === 'mousedown')) {
        return;
      }

      const { clientX, clientY } = getCoords(e);
      if (clientX === undefined || clientY === undefined) return;

      const targetEl = document.elementFromPoint(clientX, clientY)?.closest('.hl-word');
      if (!targetEl || !passageContainer.contains(targetEl)) return;

      // Voorkom standaard iOS selectie callout & scrollen tijdens markeren
      if (e.cancelable) e.preventDefault();

      isDragging = true;
      const hasAnyColor = targetEl.classList.contains('hl-yellow') ||
                          targetEl.classList.contains('hl-green') ||
                          targetEl.classList.contains('hl-pink');

      // Als het startwoord al gemarkeerd was, gaan we wissen (erase)!
      // Was het nog niet gemarkeerd, dan markeren we (mark).
      dragMode = hasAnyColor ? 'erase' : 'mark';

      applyWordAction(targetEl, dragMode);
    };

    // Pointer move / Touch move (vloeiend vegen met vinger over tekst)
    const handleMove = (e) => {
      if (!isDragging || !isHighlighterActive) return;
      if (isUsingTouch && (e.type === 'pointermove' || e.type === 'mousemove')) return;

      const { clientX, clientY } = getCoords(e);
      if (clientX === undefined || clientY === undefined) return;

      if (e.cancelable) e.preventDefault();

      const targetEl = document.elementFromPoint(clientX, clientY)?.closest('.hl-word');
      if (targetEl && passageContainer.contains(targetEl)) {
        applyWordAction(targetEl, dragMode);
      }
    };

    // Pointer up / Touch end
    const handleEnd = (e) => {
      if (isDragging) {
        isDragging = false;
        dragMode = null;
        saveCurrentPassageHighlights();
      }
      if (e && (e.type === 'touchend' || e.type === 'touchcancel')) {
        setTimeout(() => { isUsingTouch = false; }, 350);
      }
    };

    // Attach listeners
    passageContainer.addEventListener('pointerdown', handleStart);
    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleEnd);
    window.addEventListener('pointercancel', handleEnd);

    passageContainer.addEventListener('touchstart', handleStart, { passive: false });
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleEnd);
    window.addEventListener('touchcancel', handleEnd);
  }

  function applyWordAction(wordEl, mode) {
    if (!wordEl) return;
    if (mode === 'mark') {
      wordEl.classList.remove('hl-yellow', 'hl-green', 'hl-pink');
      wordEl.classList.add(`hl-${currentColor}`);
    } else if (mode === 'erase') {
      wordEl.classList.remove('hl-yellow', 'hl-green', 'hl-pink');
    }
  }

  function saveCurrentPassageHighlights() {
    const currentTitle = document.getElementById('passage-title')?.textContent || 'default';
    const container = document.getElementById('passage-body');
    if (!container || !currentTitle) return;

    const highlightsMap = {};
    container.querySelectorAll('.hl-word').forEach(w => {
      const wid = w.dataset.w;
      if (w.classList.contains('hl-yellow')) highlightsMap[wid] = 'yellow';
      else if (w.classList.contains('hl-green')) highlightsMap[wid] = 'green';
      else if (w.classList.contains('hl-pink')) highlightsMap[wid] = 'pink';
    });

    savedHighlights[currentTitle] = highlightsMap;
    window.AppStorage?.saveSession();
  }

  // Bouwt de passage op uit veilige woorden-spans zonder letterafbrekingen
  function restorePassageHighlights(passageTitle, rawText) {
    const container = document.getElementById('passage-body');
    if (!container) return;

    // Splits tekst in alinea's
    const paragraphs = rawText.split(/\n\s*\n/);
    let wordCounter = 0;
    const currentSaved = savedHighlights[passageTitle] || {};

    let html = '';
    paragraphs.forEach((pText) => {
      const trimmed = pText.trim();
      if (!trimmed) return;

      // Check of alinea begint met een alinea-nummer zoals [1] of [2]
      let pContent = trimmed;
      let pPrefix = '';
      const numMatch = trimmed.match(/^(\[\d+\])\s*(.*)/s);
      if (numMatch) {
        pPrefix = `<strong class="passage-para-num">${numMatch[1]}</strong> `;
        pContent = numMatch[2];
      }

      // Splits op spaties, behoud alle leestekens intact bij het woord
      const tokens = pContent.split(/(\s+)/);
      const spanTokens = tokens.map(token => {
        if (/^\s+$/.test(token)) {
          return token; // gewone spatie
        }
        const wid = `w${wordCounter++}`;
        const activeColor = currentSaved[wid];
        const colorClass = activeColor ? ` hl-${activeColor}` : '';
        return `<span class="hl-word${colorClass}" data-w="${wid}">${token}</span>`;
      });

      html += `<p class="passage-para">${pPrefix}${spanTokens.join('')}</p>`;
    });

    container.innerHTML = html;
  }

  function getSavedHighlights() {
    return savedHighlights;
  }

  function setSavedHighlights(data) {
    savedHighlights = data || {};
  }

  window.Highlighter = {
    init: initHighlighter,
    restorePassageHighlights,
    saveCurrentPassageHighlights,
    getSavedHighlights,
    setSavedHighlights
  };
})();
