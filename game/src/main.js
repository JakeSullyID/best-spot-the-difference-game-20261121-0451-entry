// Core runtime state tracking found differences, timer, and penalties
import { DIFFERENCES, hitTest } from './differences.js';
import { playChime, playBuzz } from './audio.js';
import { initInput, getCursor } from './input.js';
import { renderGame } from './render.js';

let gameState = {
  foundIds: [],
  startTime: performance.now(),
  penaltySeconds: 0,
  wrongClicks: 0,
  won: false,
  wrongClick: { x: 0, y: 0, panel: 0, time: 0, active: false }
};

let canvas, counterEl, pipsEl, timerEl, winOverlayEl;
let initialized = false;

// Ensure DOM elements and event handlers are bootstrapped once
function initGame() {
  if (initialized) return;
  initialized = true;

  // Locate or create canvas
  canvas = document.querySelector('canvas') || document.getElementById('game-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'game-canvas';
    canvas.width = 1280;
    canvas.height = 480;
    document.body.appendChild(canvas);
  }

  // Locate or create HUD elements
  counterEl = document.getElementById('counter') || document.querySelector('.counter');
  pipsEl = document.getElementById('pips') || document.querySelector('.pips');
  timerEl = document.getElementById('timer') || document.querySelector('.timer');
  winOverlayEl = document.getElementById('win-overlay') || document.querySelector('.win-overlay');

  if (!counterEl) {
    counterEl = document.createElement('div');
    counterEl.id = 'counter';
    document.body.insertBefore(counterEl, canvas);
  }

  if (!pipsEl) {
    pipsEl = document.createElement('div');
    pipsEl.id = 'pips';
    document.body.insertBefore(pipsEl, canvas);
  }

  if (!timerEl) {
    timerEl = document.createElement('div');
    timerEl.id = 'timer';
    document.body.insertBefore(timerEl, canvas);
  }

  if (!winOverlayEl) {
    winOverlayEl = document.createElement('div');
    winOverlayEl.id = 'win-overlay';
    winOverlayEl.style.display = 'none';
    document.body.appendChild(winOverlayEl);
  }

  // Build pips HTML structure
  updatePipsDOM(pipsEl, gameState.foundIds);

  // Evaluate user clicks on the image
  const handleSelection = (x, y, panel) => {
    if (gameState.won) return;

    const hit = hitTest(x, y, gameState.foundIds);
    if (hit) {
      gameState.foundIds.push(hit.id);
      updateCounterDOM(counterEl, gameState.foundIds.length, DIFFERENCES.length);
      playChime();

      updatePipsDOM(pipsEl, gameState.foundIds);

      if (gameState.foundIds.length === DIFFERENCES.length) {
        gameState.won = true;
        showWinOverlay(winOverlayEl, gameState);
      }
    } else {
      gameState.wrongClicks++;
      gameState.penaltySeconds += 5;
      playBuzz();

      gameState.wrongClick = {
        x,
        y,
        panel,
        time: performance.now(),
        active: true
      };
    }
  };

  initInput(canvas, handleSelection);

  // Main game loop
  function gameLoop() {
    const now = performance.now();
    const elapsedMs = gameState.won
      ? gameState.finalElapsedMs || (now - gameState.startTime)
      : (now - gameState.startTime);

    const totalSeconds = Math.floor(elapsedMs / 1000) + gameState.penaltySeconds;

    if (!gameState.won) {
      updateTimerDOM(timerEl, totalSeconds);
      updateCounterDOM(counterEl, gameState.foundIds.length, DIFFERENCES.length);
    }

    const renderState = {
      foundIds: gameState.foundIds,
      wrongClick: gameState.wrongClick,
      cursor: getCursor()
    };

    renderGame(canvas, renderState);

    requestAnimationFrame(gameLoop);
  }

  requestAnimationFrame(gameLoop);
}

// Force specific game state parameters for reproducible screenshots
export function setShotState(foundIds, options = {}) {
  initGame();
  gameState.foundIds = [...foundIds];
  gameState.penaltySeconds = 0;
  const seconds = options.seconds ?? 0;
  gameState.startTime = performance.now() - (seconds * 1000);
  gameState.won = !!options.win;
  if (gameState.won) {
    gameState.finalElapsedMs = seconds * 1000;
    showWinOverlay(winOverlayEl, gameState);
  } else {
    winOverlayEl.style.display = 'none';
  }

  if (pipsEl) updatePipsDOM(pipsEl, gameState.foundIds);
  if (counterEl) updateCounterDOM(counterEl, gameState.foundIds.length, DIFFERENCES.length);
  if (timerEl) updateTimerDOM(timerEl, seconds);

  if (canvas) {
    renderGame(canvas, {
      foundIds: gameState.foundIds,
      wrongClick: gameState.wrongClick,
      cursor: getCursor()
    });
  }
}

window.setShotState = setShotState;

// Refresh header counter display values
function updateCounterDOM(el, foundCount, totalCount) {
  const remaining = totalCount - foundCount;
  el.textContent = `Found ${foundCount} / ${totalCount} (${remaining} remaining)`;
}

function updateTimerDOM(el, totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  const pad = (n) => (n < 10 ? '0' + n : n);
  el.textContent = `Time: ${pad(mins)}:${pad(secs)}`;
}

function updatePipsDOM(container, foundIds) {
  container.innerHTML = '';
  for (let i = 0; i < DIFFERENCES.length; i++) {
    const pip = document.createElement('span');
    pip.className = 'pip' + (i < foundIds.length ? ' found' : '');
    pip.style.display = 'inline-block';
    pip.style.width = '12px';
    pip.style.height = '12px';
    pip.style.borderRadius = '50%';
    pip.style.margin = '0 4px';
    pip.style.border = '2px solid #e6af2e';
    pip.style.backgroundColor = i < foundIds.length ? '#e6af2e' : 'transparent';
    container.appendChild(pip);
  }
}

function showWinOverlay(overlayEl, state) {
  const now = performance.now();
  const elapsedMs = state.finalElapsedMs || (now - state.startTime);
  const totalSeconds = Math.floor(elapsedMs / 1000) + state.penaltySeconds;

  // Score calculation: 700 - 10 * wrongClicks - max(0, totalSeconds - 60)
  const score = Math.max(0, 700 - state.wrongClicks * 10 - Math.max(0, totalSeconds - 60));

  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  const timeStr = `${mins}m ${secs}s`;

  overlayEl.innerHTML = `
    <div class="win-content" style="background: rgba(15,16,38,0.95); border: 3px solid #e6af2e; padding: 30px; border-radius: 12px; text-align: center; color: #fff; max-width: 400px; margin: 40px auto; font-family: sans-serif;">
      <h2 style="color: #e6af2e; margin-top: 0;">You found them all!</h2>
      <p>Final Time: ${timeStr}</p>
      <p>Wrong Clicks: ${state.wrongClicks} (-${state.wrongClicks * 10} pts)</p>
      <p style="font-size: 1.2em; font-weight: bold; color: #ffd700;">Score: ${score} points</p>
      <button id="play-again-btn" style="background: #e6af2e; color: #111; border: none; padding: 10px 20px; font-weight: bold; font-size: 1em; border-radius: 6px; cursor: pointer; margin-top: 15px;">Play Again</button>
    </div>
  `;
  overlayEl.style.display = 'block';

  const playAgainBtn = document.getElementById('play-again-btn');
  if (playAgainBtn) {
    playAgainBtn.onclick = () => {
      state.foundIds = [];
      state.startTime = performance.now();
      state.penaltySeconds = 0;
      state.wrongClicks = 0;
      state.won = false;
      state.wrongClick.active = false;
      state.finalElapsedMs = undefined;
      overlayEl.style.display = 'none';
      const pipsEl = document.getElementById('pips');
      if (pipsEl) {
        updatePipsDOM(pipsEl, state.foundIds);
      }
    };
  }
}

// Automatically initialize on DOMContentLoaded
if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initGame);
} else {
  initGame();
}
