# ZOMBIE.CODE

A retro coding-horror quiz game. You're a programmer trapped in a dying office overnight — answer 30 coding incidents in **C#**, **JavaScript**, and **Python**, and watch yourself slowly turn into a zombie with every correct answer.

Built as a small, polished browser game with a late-90s CRT/terminal aesthetic: scanlines, glitch effects, a flickering HUD, and dark developer humor throughout.

## Features

- 30 hand-written coding questions (10 each in C#/JS/Python, split across easy/medium/hard)
- Zombie transformation system — your character visibly changes as your "zombification" rises, with a real illustrated portrait (male/female) that shifts across 3 stages based on your progress and accuracy
- Story beats every 5 incidents, a final boss sequence, and a results screen with rank and stats
- 11 achievements, a top-3 local leaderboard, and per-player achievement tracking (by name)
- CRT overlay, glitch effects, retro sound via the Web Audio API (with a mute toggle)
- Installable as a PWA — works offline after the first load
- Keyboard (1–4 + Enter + Esc) and mouse/touch controls, responsive down to mobile

## Running it

```
npm install
npm run dev
```

Build for production:

```
npm run build
npm run preview
```

Run the unit tests:

```
npm test
```

## Tech stack

React + TypeScript + Vite, no backend, no accounts — everything (high scores, achievements, sound preference) is stored locally in the browser.

## Also in this repo

- `TEST_CASES.md` — manual QA test case checklist for the game
- `csharp-practice/` — a small companion C# / xUnit project for practicing unit tests, based on the game's own C# quiz questions

---

Made by Lone Coder.
