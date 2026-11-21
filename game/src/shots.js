// Screenshot query parameter handler for automated image capture
import { setShotState } from './main.js';

function processShotParam() {
  const params = new URLSearchParams(window.location.search);
  const shot = params.get('shot');
  if (!shot) return;

  // Map known screenshot query keys to preset game states
  switch (shot) {
    case 'start':
      setShotState([], { seconds: 0, win: false });
      break;
    case 'play':
      setShotState(['sign', 'awning', 'boat'], { seconds: 83, win: false });
      break;
    case 'near':
      setShotState(['sign', 'awning', 'boat', 'lantern', 'cat', 'window'], { seconds: 161, win: false });
      break;
    case 'end':
      setShotState(['sign', 'awning', 'boat', 'lantern', 'cat', 'window', 'bird'], { seconds: 192, win: true });
      break;
    default:
      break;
  }
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', processShotParam);
} else {
  processShotParam();
}
