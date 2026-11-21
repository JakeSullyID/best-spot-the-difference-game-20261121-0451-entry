[![make.fun · best-spot-the-difference-game-20261121-0451](https://make.fun/badge/best-spot-the-difference-game-20261121-0451.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)
[![rank](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/JakeSullyID/best-spot-the-difference-game-20261121-0451-entry/rank.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)
[![reward](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/JakeSullyID/best-spot-the-difference-game-20261121-0451-entry/reward.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451/reward?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)

# Harbor Lights — Spot the Difference

A complete spot-the-difference game that runs in a desktop browser from static files, with no network request. Two near-identical pictures of a night-market harbor at dusk sit side by side; find all 7 differences. Click a difference in either picture and a numbered gold ring appears on both, the counter drops, and a soft chime plays. Wrong clicks get a red X and a time penalty. Keyboard and mouse both work (arrow keys move the cursor, Enter/Space selects). All art is drawn fresh by code; no binary is copied from another entry.

## The 7 differences

1. A missing lantern
2. A different-colored awning
3. An extra cat on a crate (glowing eyes)
4. A large pictorial shop sign (fish vs teapot)
5. A missing boat
6. A different window (lit vs dark)
7. A flock of birds in the sky

## Run

```bash
npx tsx main.ts
```

Then open `game/index.html` in desktop Chrome and play. The screenshots under `screenshots/` are real renders of the game's own code: start (0/7), mid-game (3/7), near-win (6/7), and win screen (7/7).
