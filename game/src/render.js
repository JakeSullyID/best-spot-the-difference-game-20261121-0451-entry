// Primary canvas orchestrator rendering side-by-side viewports and overlays
import { drawScene } from './scene.js';
import { DIFFERENCES } from './differences.js';

export function renderGame(canvas, state) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 1. Draw Left Panel (Variant 0 - Original)
  ctx.save();
  ctx.translate(0, 0);
  drawScene(ctx, 640, 480, 0);
  ctx.restore();

  // Draw dividing line between panels
  ctx.strokeStyle = '#2b1b12';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(640, 0);
  ctx.lineTo(640, 480);
  ctx.stroke();

  // 2. Draw Right Panel (Variant 1 - Changed)
  ctx.save();
  ctx.translate(640, 0);
  drawScene(ctx, 640, 480, 1);
  ctx.restore();

  const foundIds = state.foundIds || [];

  // 3. Draw numbered gold rings for found differences on BOTH panels
  foundIds.forEach((id, index) => {
    const diff = DIFFERENCES.find((d) => d.id === id);
    if (!diff) return;

    const num = index + 1;
    const radius = Math.max(diff.r + 4, 20);

    // Draw on Left Panel
    drawGoldRing(ctx, diff.x, diff.y, radius, num);
    // Draw on Right Panel
    drawGoldRing(ctx, 640 + diff.x, diff.y, radius, num);
  });

  // 4. Draw wrong click red X if active (visible for ~500ms)
  if (state.wrongClick && state.wrongClick.active) {
    const now = performance.now();
    if (now - state.wrongClick.time < 500) {
      const wx = state.wrongClick.panel === 1 ? 640 + state.wrongClick.x : state.wrongClick.x;
      const wy = state.wrongClick.y;
      drawRedCross(ctx, wx, wy);
    } else {
      state.wrongClick.active = false;
    }
  }

  // 5. Draw keyboard cursor if active
  if (state.cursor && state.cursor.active) {
    const cx = state.cursor.panel === 1 ? 640 + state.cursor.x : state.cursor.x;
    const cy = state.cursor.y;
    drawCursorRing(ctx, cx, cy);
  }
}

function drawGoldRing(ctx, x, y, radius, num) {
  ctx.save();
  // Helper to draw hollow gold indicator ring and center digit
  ctx.strokeStyle = '#e6af2e';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();

  // Small bold number inside
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 14px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 4;
  ctx.fillText(String(num), x, y);
  ctx.restore();
}

function drawRedCross(ctx, x, y) {
  ctx.save();
  ctx.strokeStyle = '#d93838';
  ctx.lineWidth = 3.5;
  const size = 12;

  ctx.beginPath();
  ctx.moveTo(x - size, y - size);
  ctx.lineTo(x + size, y + size);
  ctx.moveTo(x + size, y - size);
  ctx.lineTo(x - size, y + size);
  ctx.stroke();
  ctx.restore();
}

function drawCursorRing(ctx, x, y) {
  ctx.save();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, 14, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}
