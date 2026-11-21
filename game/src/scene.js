export function drawScene(ctx, width, height, variant) {
  // Initialize rendering context and viewport scaling transform
  ctx.save();
  ctx.clearRect(0, 0, width, height);
  ctx.scale(width / 640, height / 480);

  // Render background canvas atmosphere
  // 1. Dusk sky gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, 250);
  skyGrad.addColorStop(0, '#0f1026');
  skyGrad.addColorStop(0.5, '#4a2545');
  skyGrad.addColorStop(1, '#ffb76b');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, 640, 250);

  // 2. Moon with soft glow
  ctx.fillStyle = 'rgba(255, 249, 230, 0.2)';
  ctx.beginPath();
  ctx.arc(530, 80, 50, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#fff9e6';
  ctx.beginPath();
  ctx.arc(530, 80, 25, 0, Math.PI * 2);
  ctx.fill();

  // 3. Distant skyline of dark rooftops
  ctx.fillStyle = '#1c1b33';
  ctx.beginPath();
  ctx.moveTo(0, 230);
  ctx.lineTo(80, 200);
  ctx.lineTo(140, 220);
  ctx.lineTo(210, 190);
  ctx.lineTo(280, 215);
  ctx.lineTo(350, 185);
  ctx.lineTo(420, 210);
  ctx.lineTo(500, 180);
  ctx.lineTo(580, 205);
  ctx.lineTo(640, 195);
  ctx.lineTo(640, 250);
  ctx.lineTo(0, 250);
  ctx.closePath();
  ctx.fill();

  // 4. Harbor water band & reflection
  const waterGrad = ctx.createLinearGradient(0, 320, 0, 480);
  waterGrad.addColorStop(0, '#1a4a52');
  waterGrad.addColorStop(1, '#0b242b');
  ctx.fillStyle = waterGrad;
  ctx.fillRect(0, 320, 640, 160);

  // Soft gold reflection column under moon
  const reflGrad = ctx.createLinearGradient(500, 320, 560, 480);
  reflGrad.addColorStop(0, 'rgba(255, 215, 128, 0.4)');
  reflGrad.addColorStop(1, 'rgba(255, 215, 128, 0.05)');
  ctx.fillStyle = reflGrad;
  ctx.fillRect(495, 320, 70, 160);

  // 5. Wooden pier on left
  ctx.fillStyle = '#5c3a21';
  ctx.fillRect(0, 340, 180, 30);
  ctx.fillStyle = '#3d2514';
  ctx.fillRect(30, 370, 15, 70);
  ctx.fillRect(90, 370, 15, 70);
  ctx.fillRect(150, 370, 15, 70);

  // Large pictorial sign on pier
  ctx.fillStyle = '#3d2514';
  ctx.fillRect(57, 270, 6, 70);
  ctx.fillStyle = '#4a2f13';
  ctx.beginPath();
  ctx.arc(60, 270, 28, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#e6af2e';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(60, 270, 28, 0, Math.PI * 2);
  ctx.stroke();

  if (variant === 0) {
    // Big fish silhouette (bright gold)
    ctx.fillStyle = '#e6af2e';
    ctx.beginPath();
    ctx.ellipse(58, 270, 16, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(42, 270); ctx.lineTo(32, 258); ctx.lineTo(32, 282); ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(60, 260); ctx.lineTo(66, 248); ctx.lineTo(70, 260); ctx.closePath();
    ctx.fill();
  } else {
    // Big teapot silhouette (bright red)
    ctx.fillStyle = '#d93838';
    ctx.beginPath();
    ctx.ellipse(60, 273, 14, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(54, 259, 12, 3);
    ctx.beginPath();
    ctx.arc(60, 258, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(72, 270); ctx.lineTo(84, 260); ctx.lineTo(82, 268); ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#d93838';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.arc(46, 273, 7, Math.PI * 0.5, Math.PI * 1.5, false);
    ctx.stroke();
  }

  // Crate near pier
  ctx.fillStyle = '#8b5a2b';
  ctx.fillRect(140, 320, 40, 35);
  ctx.strokeStyle = '#5c3a21';
  ctx.lineWidth = 2;
  ctx.strokeRect(140, 320, 40, 35);
  // Crate cross lines
  ctx.beginPath();
  ctx.moveTo(140, 320); ctx.lineTo(180, 355);
  ctx.moveTo(180, 320); ctx.lineTo(140, 355);
  ctx.stroke();

  // Cat on crate (only in variant 1) - enlarged with glowing eyes
  if (variant === 1) {
    ctx.fillStyle = '#d97736';
    // Cat body
    ctx.beginPath();
    ctx.ellipse(160, 320, 18, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    // Cat head
    ctx.beginPath();
    ctx.arc(170, 303, 11, 0, Math.PI * 2);
    ctx.fill();
    // Cat ears
    ctx.beginPath();
    ctx.moveTo(163, 294); ctx.lineTo(167, 286); ctx.lineTo(171, 294);
    ctx.moveTo(173, 294); ctx.lineTo(177, 286); ctx.lineTo(181, 294);
    ctx.fill();
    // Glowing eyes
    ctx.fillStyle = '#ffe869';
    ctx.beginPath();
    ctx.arc(167, 301, 2, 0, Math.PI * 2);
    ctx.arc(174, 301, 2, 0, Math.PI * 2);
    ctx.fill();
    // Tail
    ctx.strokeStyle = '#d97736';
    ctx.lineWidth = 4.5;
    ctx.beginPath();
    ctx.moveTo(144, 320);
    ctx.quadraticCurveTo(132, 312, 136, 298);
    ctx.stroke();
  }

  // 6. Market stalls & stilt houses along water edge
  // Stall 1 (Left)
  ctx.fillStyle = '#7a3b2e';
  ctx.fillRect(190, 260, 80, 70);
  // Roof 1
  ctx.fillStyle = '#421f18';
  ctx.beginPath();
  ctx.moveTo(180, 260); ctx.lineTo(230, 220); ctx.lineTo(280, 260); ctx.closePath();
  ctx.fill();
  // Awning 1
  ctx.fillStyle = '#e6af2e';
  ctx.beginPath();
  ctx.moveTo(185, 275); ctx.lineTo(275, 275); ctx.lineTo(270, 295); ctx.lineTo(190, 295); ctx.closePath();
  ctx.fill();
  // Hanging lantern 1 (Missing in variant 1)
  if (variant === 0) {
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(240, 275); ctx.lineTo(240, 285); ctx.stroke();
    ctx.fillStyle = '#ffaa33';
    ctx.beginPath(); ctx.arc(240, 290, 10, 0, Math.PI * 2); ctx.fill();
  }

  // Stall 2 (Middle)
  ctx.fillStyle = '#614124';
  ctx.fillRect(290, 255, 100, 75);
  // Roof 2
  ctx.fillStyle = '#382210';
  ctx.beginPath();
  ctx.moveTo(280, 255); ctx.lineTo(340, 210); ctx.lineTo(400, 255); ctx.closePath();
  ctx.fill();
  // Awning 2 (Variant 0: teal, Variant 1: rose)
  ctx.fillStyle = (variant === 1) ? '#d9536e' : '#2e8b9e';
  ctx.beginPath();
  ctx.moveTo(285, 270); ctx.lineTo(395, 270); ctx.lineTo(390, 290); ctx.lineTo(290, 290); ctx.closePath();
  ctx.fill();

  // Stall 3 (Right)
  ctx.fillStyle = '#5c4033';
  ctx.fillRect(410, 260, 90, 70);
  // Roof 3
  ctx.fillStyle = '#362319';
  ctx.beginPath();
  ctx.moveTo(400, 260); ctx.lineTo(455, 215); ctx.lineTo(510, 260); ctx.closePath();
  ctx.fill();
  // Awning 3
  ctx.fillStyle = '#d9822b';
  ctx.beginPath();
  ctx.moveTo(415, 275); ctx.lineTo(495, 275); ctx.lineTo(490, 295); ctx.lineTo(420, 295); ctx.closePath();
  ctx.fill();
  // Windows on Stall 3
  // Window 1 (lit)
  ctx.fillStyle = '#ffd700';
  ctx.fillRect(430, 295, 20, 25);
  // Window 2 (Lit in variant 0, dark in variant 1)
  ctx.fillStyle = (variant === 1) ? '#222' : '#ffd700';
  ctx.fillRect(465, 295, 20, 25);

  // Stilt houses further right
  ctx.fillStyle = '#4a3324';
  ctx.fillRect(520, 250, 100, 80);
  ctx.fillStyle = '#2b1b12';
  ctx.beginPath();
  ctx.moveTo(510, 250); ctx.lineTo(570, 205); ctx.lineTo(630, 250); ctx.closePath();
  ctx.fill();
  // Wooden stilt poles underneath
  ctx.strokeStyle = '#2b1b12';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(530, 330); ctx.lineTo(530, 360);
  ctx.moveTo(600, 330); ctx.lineTo(600, 360);
  ctx.stroke();

  // 7. Small sailboats on water
  // Boat 1 (left)
  drawBoat(ctx, 230, 390, 0.9);
  // Boat 2 (middle) - Missing in variant 1
  if (variant === 0) {
    drawBoat(ctx, 380, 410, 1.0);
  }
  // Boat 3 (right)
  drawBoat(ctx, 520, 395, 0.8);

  // 8. Wire strung across upper-left with birds
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, 80);
  ctx.quadraticCurveTo(120, 140, 250, 120);
  ctx.stroke();

  // Bird 1 (always present)
  drawBird(ctx, 90, 105);

  // Flock of birds in sky (only in variant 1)
  if (variant === 1) {
    drawBirdFlock(ctx, 450, 120);
  }

  ctx.restore();
}

function drawBirdFlock(ctx, cx, cy) {
  const offsets = [
    {x: 0, y: -15},
    {x: -35, y: -5},
    {x: -70, y: 5},
    {x: 35, y: -5},
    {x: 70, y: 5}
  ];
  ctx.strokeStyle = '#1c1b33';
  ctx.lineWidth = 3.5;
  for (const pt of offsets) {
    const fx = cx + pt.x;
    const fy = cy + pt.y;
    ctx.beginPath();
    ctx.moveTo(fx - 12, fy + 6);
    ctx.quadraticCurveTo(fx, fy - 10, fx + 12, fy + 6);
    ctx.stroke();
  }
}

// Subroutine to render scaled sailboat hulls, masts, and sails
function drawBoat(ctx, x, y, scale) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  // Hull
  ctx.fillStyle = '#8b4513';
  ctx.beginPath();
  ctx.moveTo(-25, 0);
  ctx.lineTo(25, 0);
  ctx.lineTo(18, 15);
  ctx.lineTo(-18, 15);
  ctx.closePath();
  ctx.fill();

  // Mast
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -35);
  ctx.stroke();

  // Sail
  ctx.fillStyle = '#fdfdfd';
  ctx.beginPath();
  ctx.moveTo(2, -32);
  ctx.lineTo(25, -10);
  ctx.lineTo(2, -5);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

// Helper method to render harbor birds on wire
function drawBird(ctx, x, y) {
  ctx.fillStyle = '#111';
  ctx.beginPath();
  // Body
  ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.fill();
  // Head & beak
  ctx.beginPath();
  ctx.arc(x + 4, y - 3, 3.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x + 7, y - 3);
  ctx.lineTo(x + 11, y - 2);
  ctx.lineTo(x + 7, y - 1);
  ctx.closePath();
  ctx.fill();
}
