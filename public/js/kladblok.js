// public/js/kladblok.js - Digitaal Kladblok voor iPad / Tablet
(function () {
  let canvas, ctx;
  let isDrawing = false;
  let currentTool = 'pen'; // 'pen' | 'eraser'
  let currentColor = '#2563eb'; // blue default
  let currentSize = 3;
  let overlay, closeBtn, clearBtn, penBtn, eraserBtn, colorDots;

  function initScratchpad() {
    overlay = document.getElementById('scratchpad-modal');
    canvas = document.getElementById('scratchpad-canvas');
    if (!canvas) return;

    ctx = canvas.getContext('2d');
    closeBtn = document.getElementById('btn-close-scratchpad');
    clearBtn = document.getElementById('btn-clear-scratchpad');
    penBtn = document.getElementById('btn-tool-pen');
    eraserBtn = document.getElementById('btn-tool-eraser');
    colorDots = document.querySelectorAll('.color-dot');

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Pointer events (Finger, Apple Pencil, Mouse)
    canvas.addEventListener('pointerdown', startDrawing);
    canvas.addEventListener('pointermove', draw);
    canvas.addEventListener('pointerup', stopDrawing);
    canvas.addEventListener('pointercancel', stopDrawing);
    canvas.addEventListener('pointerleave', stopDrawing);

    if (closeBtn) {
      closeBtn.addEventListener('click', hideScratchpad);
    }
    if (clearBtn) {
      clearBtn.addEventListener('click', clearCanvas);
    }
    if (penBtn) {
      penBtn.addEventListener('click', () => setTool('pen'));
    }
    if (eraserBtn) {
      eraserBtn.addEventListener('click', () => setTool('eraser'));
    }

    colorDots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        colorDots.forEach(d => d.classList.remove('active'));
        e.target.classList.add('active');
        currentColor = e.target.dataset.color || '#2563eb';
        setTool('pen');
      });
    });
  }

  function resizeCanvas() {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = window.devicePixelRatio || 1;
    // Save existing drawing if any
    let tempImg;
    if (canvas.width > 0 && canvas.height > 0) {
      try {
        tempImg = ctx.getImageData(0, 0, canvas.width, canvas.height);
      } catch (e) {}
    }

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    if (tempImg) {
      ctx.putImageData(tempImg, 0, 0);
    }

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }

  function getCanvasCoords(e) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  function startDrawing(e) {
    e.preventDefault();
    isDrawing = true;
    canvas.setPointerCapture(e.pointerId);
    const { x, y } = getCanvasCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function draw(e) {
    if (!isDrawing) return;
    e.preventDefault();
    const { x, y } = getCanvasCoords(e);

    ctx.lineWidth = currentTool === 'eraser' ? 24 : currentSize;
    ctx.strokeStyle = currentTool === 'eraser' ? '#ffffff' : currentColor;

    if (currentTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
    } else {
      ctx.globalCompositeOperation = 'source-over';
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function stopDrawing(e) {
    if (isDrawing) {
      isDrawing = false;
      ctx.closePath();
    }
  }

  function setTool(tool) {
    currentTool = tool;
    if (tool === 'pen') {
      penBtn?.classList.add('active');
      eraserBtn?.classList.remove('active');
    } else {
      eraserBtn?.classList.add('active');
      penBtn?.classList.remove('active');
    }
  }

  function clearCanvas() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function showScratchpad() {
    if (!overlay) overlay = document.getElementById('scratchpad-modal');
    if (overlay) {
      overlay.classList.add('active');
      setTimeout(resizeCanvas, 50);
    }
  }

  function hideScratchpad() {
    if (!overlay) overlay = document.getElementById('scratchpad-modal');
    if (overlay) {
      overlay.classList.remove('active');
    }
  }

  // Export globally
  window.Kladblok = {
    init: initScratchpad,
    show: showScratchpad,
    hide: hideScratchpad,
    clear: clearCanvas
  };
})();
