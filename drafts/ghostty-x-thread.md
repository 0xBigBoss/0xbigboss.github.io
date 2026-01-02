# X Thread Draft

---

## Tweet 1 (Hook)

Mitchell Hashimoto called out my contributions to Ghostty. 4 crash bugs fixed. 327K views.

The twist: zero terminal development experience. I wasn't trying to contribute. I was trying to stop my terminal from crashing.

Thread on how AI tutoring + human humility = real contributions 🧵

---

## Tweet 2 (Origin)

December 5th. Posted in #help: "Ghostty just exit 3 times this week without the dialog confirming all terminal sessions will be terminated."

I'm a heavy Ghostty user. Claude Code sessions spanning days. Random crashes were killing me.

Upgraded to tip. Still crashing. Fine, I'll build it myself.

---

## Tweet 3 (What I knew)

What I knew: Zig, macOS dev.

What I didn't know:
- viewport vs page-relative coordinates
- CircBuf resize/reflow semantics
- PageList architecture
- renderer active/inactive states

The gap wasn't programming skill. It was domain knowledge.

---

## Tweet 4 (First patch)

December 16th. Posted my first patch with full transparency:

"Obviously, it's all AI generated, but it's been working for me so far."

Mitchell's response: get the AI to write a test that fails without the patch, passes with it.

Then he arrived at the identical diff independently.

---

## Tweet 5 (The exchange)

The exchange that stuck with me:

Me: "opus 4.5 and codex 5.1 high are amazing models. I can only take credit for the prompts haha"

Mitchell: "it still requires the right prompts"

That's it. The models are powerful. But they need direction.

---

## Tweet 6 (More patches)

December 26th. Two more crashes found. Also shared a crash triage skill I'd built.

Mitchell: "high quality AI work is always appreciated. the actual crash analysis and stack trace inspection is good"

The patches were at the wrong layer. But the analysis was solid.

---

## Tweet 7 (Full circle)

December 27th. Finally caught the original bug from December 5th.

Viewport pin overflow in getBottomRight after resize. A month of investigation. Full circle.

4 bugs total:
- 3 in renderer (linkCells, bounds, viewport)
- 1 in data structures (CircBuf underflow)

---

## Tweet 8 (What it demonstrates)

What this actually demonstrates:

Not "non-programmer uses AI to write code."

"Experienced programmer uses AI to learn new domain fast."

AI for rapid learning. Humans for validation. Both required.

---

## Tweet 9 (The takeaway)

The takeaway:

"it still requires the right prompts"

I can only take credit for the prompts. But the prompts are the hard part.

Full writeup with Discord screenshots, all 155 AI session transcripts, and the crash triage skill: [blog link]

---

## Alt versions

**Tweet 1 alt (shorter hook):**

Mitchell Hashimoto on my Ghostty contributions: "they drove an AI with expert skill" and "navigated the terrain with expert skill as well"

4 bugs fixed. Zero terminal experience going in.

Here's how 🧵

**Tweet 9 alt (with quote):**

Mitchell's full take: "People like this give me hope for what is possible. But it really, really depends on high quality people like this."

Full writeup: [blog link]

---

## Notes

- Consider adding images to key tweets (Mitchell's post, Discord screenshots)
- Thread length: 9 tweets (can trim to 7 if needed)
- No hashtags per style guide
- Minimal emojis (just 🧵 in hook)
