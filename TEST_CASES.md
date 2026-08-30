# ZOMBIE.CODE — Manual Test Cases

Manual QA test suite for practicing test execution against the running game.

**Setup:** `npm install && npm run dev`, open the printed local URL in a browser.
**Browser scope:** all test cases below have been executed against **Chromium-based browsers** only (Chrome, Edge, and Chromium via Playwright). Firefox and Safari/WebKit have not been tested — treat results as unverified on those engines until run.
**Status legend:** fill in `Pass` / `Fail` / `Blocked` after each run, plus any notes in Actual Result.

---

## A. Title Screen & Navigation

### TC-01 — Title screen renders correctly
**Priority:** High
**Preconditions:** App freshly loaded, no prior localStorage data.
**Steps:**
1. Load the app.
**Expected Result:** "ZOMBIE.CODE" title, subtitle "A CODING HORROR EXPERIENCE", and three buttons ([ START SHIFT ], [ HIGH SCORES ], [ HOW TO PLAY ]) are visible with retro CRT/scanline styling.
**Actual Result:**
**Status:** ☐ Pass ☐ Fail

### TC-02 — High Scores panel with no prior data
**Steps:**
1. On the title screen, click [ HIGH SCORES ].
**Expected Result:** A panel appears reading "NO RECORDS FOUND. THE SHIFT AWAITS." Clicking the button again hides it.
**Actual Result:**
**Status:** ☐ Pass ☐ Fail

### TC-03 — How To Play screen
**Steps:**
1. Click [ HOW TO PLAY ].
2. Click [ BACK ].
**Expected Result:** Instructions screen shows rules and control scheme (1–4, ENTER, ESC). [ BACK ] returns to the title screen; [ START SHIFT ] on this screen also starts the game.
**Actual Result:**
**Status:** ☐ Pass ☐ Fail

### TC-04 — Start Shift begins the game
**Steps:**
1. From the title screen, click [ START SHIFT ].
**Expected Result:** Game screen loads showing "INCIDENT 01 / 30", a question terminal with code, 4 answer options, and the zombie character panel.
**Actual Result:**
**Status:** ☐ Pass ☐ Fail

---

## B. Answering Questions

### TC-05 — Question content is complete
**Steps:**
1. Start a game and inspect the current question.
**Expected Result:** The terminal shows an incident number, a language tag (C#/JAVASCRIPT/PYTHON), a difficulty tag (EASY/MEDIUM/HARD), a creepy incident title, the question text, a code snippet, and exactly 4 answer options.
**Actual Result:**
**Status:** ☐ Pass ☐ Fail

### TC-06 — Mouse click selects and submits an answer
**Steps:**
1. Click any answer button.
**Expected Result:** The answer locks in immediately; correct answer is highlighted green, an incorrect pick (if selected) is highlighted red, other options dim, and a feedback panel appears (CORRECT/INCORRECT) with the explanation.
**Actual Result:**
**Status:** ☐ Pass ☐ Fail

### TC-07 — Correct answer feedback
**Steps:**
1. Answer a question correctly.
**Expected Result:** Feedback panel shows "CORRECT", the XP gained (+100/+125/+150/+175 depending on difficulty and speed), and the zombification % gained. Score and zombification % update in the HUD.
**Actual Result:**
**Status:** ☐ Pass ☐ Fail

### TC-08 — Incorrect answer feedback
**Steps:**
1. Deliberately answer a question incorrectly.
**Expected Result:** Feedback panel shows "INCORRECT", the correct answer, and the explanation. Score/zombification do not increase.
**Actual Result:**
**Status:** ☐ Pass ☐ Fail

### TC-09 — Auto-advance to the next question
**Steps:**
1. Answer a question and wait without pressing anything.
**Expected Result:** After a few seconds, the game automatically advances to the next incident (or the next screen, if a milestone was reached).
**Actual Result:**
**Status:** ☐ Pass ☐ Fail

### TC-10 — Keyboard select + confirm
**Steps:**
1. Press a number key `1`–`4`.
2. Press `Enter`.
**Expected Result:** Pressing a number highlights that answer as selected without submitting. Pressing `Enter` submits it and shows feedback, same as a mouse click.
**Actual Result:**
**Status:** ☐ Pass ☐ Fail

### TC-11 — Enter with no selection does nothing
**Steps:**
1. On a fresh question, press `Enter` without pressing 1–4 first.
**Expected Result:** Nothing happens; the question remains unanswered.
**Actual Result:**
**Status:** ☐ Pass ☐ Fail

### TC-12 — Input is locked after submitting
**Steps:**
1. Answer a question.
2. Immediately try clicking another answer button or pressing a different number key.
**Expected Result:** No further input is accepted until the next question loads.
**Actual Result:**
**Status:** ☐ Pass ☐ Fail

---

## C. Timer

### TC-13 — Timer counts down
**Steps:**
1. Watch the HUD timer on a fresh question.
**Expected Result:** A numeric countdown (e.g. "30s") and a shrinking bar both count down once per second.
**Actual Result:**
**Status:** ☐ Pass ☐ Fail

### TC-14 — Timer warning state
**Steps:**
1. Let the timer run down to 5 seconds or fewer without answering.
**Expected Result:** The timer number and bar turn red and flash/pulse.
**Actual Result:**
**Status:** ☐ Pass ☐ Fail

### TC-15 — Time expires without an answer
**Steps:**
1. Let the timer reach 0 without selecting anything.
**Expected Result:** Feedback panel shows "TIME EXPIRED" / "THE BUG WON.", then the correct answer and explanation. This counts as a wrong answer (wrong count increases, score/zombification do not).
**Actual Result:**
**Status:** ☐ Pass ☐ Fail

---

## D. Zombie Progression & Scoring

### TC-16 — Zombification only increases on correct answers
**Steps:**
1. Answer several questions, mixing correct and incorrect.
**Expected Result:** ZOMBIFICATION % in the HUD increases only after correct answers; it never increases (or decreases) after a wrong/timeout answer.
**Actual Result:**
**Status:** ☐ Pass ☐ Fail

### TC-17 — Zombie character changes appearance by stage
**Steps:**
1. Play through enough correct answers to cross 16%, 31%, 51%, 71%, 86%, and 100% zombification.
**Expected Result:** At each threshold, the zombie character's appearance and label change (e.g. NORMAL DEVELOPER → SLEEP DEPRIVED → INFECTED → ZOMBIE DEVELOPER → UNDEAD SENIOR → ZOMBIE ARCHITECT → FINAL FORM), accompanied by a brief glitch/sound.
**Actual Result:**
**Status:** ☐ Pass ☐ Fail

### TC-18 — Score reflects difficulty and speed
**Steps:**
1. Answer an easy/medium question correctly with time to spare, then again slowly (close to timeout).
2. Repeat for a hard question.
**Expected Result:** Fast easy/medium = +125, slow easy/medium = +100. Fast hard = +175, slow hard = +150. Wrong/timeout = +0.
**Actual Result:**
**Status:** ☐ Pass ☐ Fail

---

## E. Story Structure & Completion

### TC-19 — Story transitions appear on schedule
**Steps:**
1. Answer through incidents 5, 10, 15, 20, and 25.
**Expected Result:** After each of those incidents, a full-screen story beat appears with a heading (e.g. "DAY 1 — 02:43 AM") and flavor text, with a [ CONTINUE ] button to proceed.
**Actual Result:**
**Status:** ☐ Pass ☐ Fail

### TC-20 — Exactly 30 incidents, all three languages
**Steps:**
1. Play a full run and note the language tag on every question.
**Expected Result:** The run has exactly 30 incidents total; C#, JavaScript, and Python questions all appear.
**Actual Result:**
**Status:** ☐ Pass ☐ Fail

### TC-21 — Final boss sequence
**Steps:**
1. Complete incident 30.
**Expected Result:** A "FINAL INCIDENT / PRODUCTION" screen appears with a boss figure and narrative text, ending in "YOU SHIPPED IT." or "PRODUCTION SURVIVED. SOMEHOW." depending on performance, with a [ CONTINUE ] button.
**Actual Result:**
**Status:** ☐ Pass ☐ Fail

### TC-22 — Results screen accuracy
**Steps:**
1. Continue past the final boss to the results screen.
2. Compare the displayed stats to what was actually answered during the run.
**Expected Result:** "SHIFT COMPLETE" screen shows correct INCIDENTS (X/30), per-language correct/total, SCORE, ZOMBIFICATION %, HUMANITY % (100 − zombification), and a RANK matching the score.
**Actual Result:**
**Status:** ☐ Pass ☐ Fail

---

## F. Pause & Session Controls

### TC-23 — Pause via ESC
**Steps:**
1. During a question (before answering), press `Esc`.
**Expected Result:** A "PAUSED" overlay appears with [ RESUME ] and [ MAIN MENU ]; the timer stops counting down while paused.
**Actual Result:**
**Status:** ☐ Pass ☐ Fail

### TC-24 — Resume from pause
**Steps:**
1. While paused, click [ RESUME ].
**Expected Result:** The game returns to the same question with the timer continuing from where it was paused.
**Actual Result:**
**Status:** ☐ Pass ☐ Fail

### TC-25 — Pause is disabled mid-feedback
**Steps:**
1. Answer a question, then immediately press `Esc` while the feedback panel is showing.
**Expected Result:** Esc does not pause while feedback/auto-advance is in progress.
**Actual Result:**
**Status:** ☐ Pass ☐ Fail

### TC-26 — Abandon run from pause
**Steps:**
1. Pause mid-game, click [ MAIN MENU ].
**Expected Result:** Returns to the title screen; the in-progress run is discarded.
**Actual Result:**
**Status:** ☐ Pass ☐ Fail

---

## G. Persistence

### TC-27 — High score saves after a completed run
**Steps:**
1. Complete a full run to the results screen.
2. Return to the main menu and open [ HIGH SCORES ].
**Expected Result:** The panel now shows the score, rank, zombification %, and date just achieved.
**Actual Result:**
**Status:** ☐ Pass ☐ Fail

### TC-28 — High score only updates when beaten
**Steps:**
1. Complete a run with a high score.
2. Complete a second run with a deliberately lower score.
**Expected Result:** [ HIGH SCORES ] still shows the higher of the two scores.
**Actual Result:**
**Status:** ☐ Pass ☐ Fail

### TC-29 — Achievements persist across a page refresh
**Steps:**
1. Unlock at least one achievement (e.g. answer a question correctly for FIRST BLOOD).
2. Refresh the browser page.
3. Trigger the same condition again.
**Expected Result:** The achievement popup does not fire again for an already-unlocked achievement after refresh (it is remembered, not re-awarded).
**Actual Result:**
**Status:** ☐ Pass ☐ Fail

### TC-30 — Play Again starts a fresh, reshuffled run
**Steps:**
1. From the results screen, click [ PLAY AGAIN ].
2. Note the question order versus the previous run.
**Expected Result:** Game state resets to incident 1/30, score 0, zombification 0%, and the question order differs from the previous run (random shuffle).
**Actual Result:**
**Status:** ☐ Pass ☐ Fail

---

## H. Responsive Design & Accessibility

### TC-31 — Playable on a phone-sized screen
**Steps:**
1. Open the game in a mobile browser (or DevTools device emulation) at ~375×812 portrait.
2. Play through a few questions using touch/tap.
**Expected Result:** No horizontal scrolling appears anywhere; HUD, question terminal, and answers are readable and tappable; the zombie panel and achievement popups do not overlap important text.
**Actual Result:**
**Status:** ☐ Pass ☐ Fail

### TC-32 — Reduced motion is respected
**Steps:**
1. Enable "reduce motion" in the OS/browser accessibility settings.
2. Reload the game and answer a few questions, including one that triggers a zombie stage change.
**Expected Result:** Screen-shake, flicker, and glitch animations are suppressed or significantly reduced; the game remains fully playable.
**Actual Result:**
**Status:** ☐ Pass ☐ Fail

### TC-33 — Keyboard focus is visible
**Steps:**
1. Using only `Tab`, navigate through the title screen buttons.
**Expected Result:** A visible focus outline appears on the focused button at every step.
**Actual Result:**
**Status:** ☐ Pass ☐ Fail

---

## I. Resilience

### TC-34 — No console errors during a full playthrough
**Steps:**
1. Open the browser DevTools console.
2. Play a complete run from title screen to results screen.
**Expected Result:** No errors are logged to the console at any point.
**Actual Result:**
**Status:** ☐ Pass ☐ Fail

### TC-35 — Game still works with localStorage unavailable
**Steps:**
1. Open the game in a private/incognito window with storage blocked (or via browser settings that disable localStorage).
2. Play through a full run.
**Expected Result:** The game does not crash; it simply does not persist a high score or achievements between sessions.
**Actual Result:**
**Status:** ☐ Pass ☐ Fail
