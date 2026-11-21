// Array storing interactive difference metadata and bounding coordinates
export const DIFFERENCES = [
  {
    id: 'lantern',
    name: 'Missing lantern',
    x: 240,
    y: 290,
    r: 22
  },
  {
    id: 'awning',
    name: 'Changed awning color',
    x: 342,
    y: 280,
    r: 25
  },
  {
    id: 'cat',
    name: 'Extra cat on crate',
    x: 160,
    y: 320,
    r: 26
  },
  {
    id: 'sign',
    name: 'Pictorial sign (fish / teapot)',
    x: 60,
    y: 270,
    r: 28
  },
  {
    id: 'boat',
    name: 'Missing boat',
    x: 380,
    y: 410,
    r: 25
  },
  {
    id: 'window',
    name: 'Darkened window',
    x: 475,
    y: 307,
    r: 20
  },
  {
    id: 'bird',
    name: 'Flock of birds in the sky',
    x: 450,
    y: 120,
    r: 35
  }
];

// Utility to evaluate click radius intersections against remaining differences
export function hitTest(x, y, foundIds) {
  for (const diff of DIFFERENCES) {
    if (foundIds && foundIds.includes(diff.id)) {
      continue;
    }
    const dx = x - diff.x;
    const dy = y - diff.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist <= diff.r) {
      return diff;
    }
  }
  return null;
}
