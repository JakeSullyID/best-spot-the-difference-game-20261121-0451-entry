// Shared cursor position and active state for keyboard navigation

let cursor = {
  x: 320,
  y: 240,
  panel: 0, // 0 = left (original), 1 = right (variant)
  active: false
};

export function getCursor() {
  return cursor;
}

export function initInput(canvas, callback) {
  // Map click coordinates relative to canvas bounding box and split panels
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const canvasX = (e.clientX - rect.left) * scaleX;
    const canvasY = (e.clientY - rect.top) * scaleY;

    let panel = 0;
    let sceneX = canvasX;
    const sceneY = Math.max(0, Math.min(480, canvasY));

    if (canvasX >= 640) {
      panel = 1;
      sceneX = canvasX - 640;
    }
    sceneX = Math.max(0, Math.min(640, sceneX));

    cursor.x = sceneX;
    cursor.y = sceneY;
    cursor.panel = panel;
    cursor.active = false;

    if (callback) {
      callback(sceneX, sceneY, panel);
    }
  });

  // Keyboard navigation listener
  window.addEventListener('keydown', (e) => {
    let handled = false;

    if (e.key === 'ArrowUp') {
      cursor.y = Math.max(10, cursor.y - 12);
      cursor.active = true;
      handled = true;
    } else if (e.key === 'ArrowDown') {
      cursor.y = Math.min(470, cursor.y + 12);
      cursor.active = true;
      handled = true;
    } else if (e.key === 'ArrowRight') {
      cursor.x += 12;
      cursor.active = true;
      if (cursor.x > 640) {
        if (cursor.panel === 0) {
          cursor.panel = 1;
          cursor.x = 0;
        } else {
          cursor.x = 640;
        }
      }
      handled = true;
    } else if (e.key === 'ArrowLeft') {
      cursor.x -= 12;
      cursor.active = true;
      if (cursor.x < 0) {
        if (cursor.panel === 1) {
          cursor.panel = 0;
          cursor.x = 640;
        } else {
          cursor.x = 0;
        }
      }
      handled = true;
    } else if (e.key === 'Tab') {
      e.preventDefault();
      cursor.panel = cursor.panel === 0 ? 1 : 0;
      cursor.active = true;
      handled = true;
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      cursor.active = true;
      if (callback) {
        callback(cursor.x, cursor.y, cursor.panel);
      }
      handled = true;
    }

    if (handled) {
      // Trigger a render or event if needed
    }
  });
}
