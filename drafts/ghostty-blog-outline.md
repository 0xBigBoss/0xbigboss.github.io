# Blog Post Outline

**Title:** How I Contributed to Ghostty with No Terminal Developer Experience Driving Claude Code and Codex

---

## 1. The Hook

- Mitchell Hashimoto's public recognition of contributions
- 4 crash bugs fixed in Ghostty's terminal renderer and data structures
- The twist: no prior terminal development experience

---

## 2. What I Actually Knew (and Didn't Know)

- **Had:** Zig experience, macOS development experience
- **Lacked:** Terminal architecture knowledge (viewport systems, render pipelines, page lists)
- Ghostty is "a different beast" - complex multi-threaded renderer, custom data structures
- The gap wasn't programming skill, it was domain knowledge

---

## 3. AI as Tutors, Not Magic Wands

- Claude Code and Codex served as on-demand tutors for terminal concepts
- Learning how viewport coordinates relate to page-relative coordinates
- Understanding circular buffer semantics and resize/reflow cycles
- AI explained the "why" behind the architecture, not just the code

---

## 4. The Human Element: Navigating the Terrain

- Joined Discord with explicit humility: "I know nothing, plz senior devs tell me where I'm wrong"
- Community validation was critical for understanding if analysis was on track
- AI can analyze code but can't validate against institutional knowledge
- The combination: AI for rapid learning, humans for validation

---

## 5. The Technique: Structured Prompts for Learning

- XML-tagged prompts: `<role>`, `<context>`, `<current_state>`
- Codex for single-turn analysis and crash triage
- Claude Code for multi-turn implementation and iteration
- Using the ghostty-crash-triage skill for systematic investigation

---

## 6. The Results: 4 Bugs in Core Parts

**Renderer (3 bugs):**
- linkCells coordinate mismatch (#9957)
- linkCells bounds check (#10032)
- Viewport overflow in getBottomRight (#10074)

**Data structures (1 bug):**
- CircBuf integer underflow (#10063)

All with regression tests, all merged.

---

## 7. What This Actually Demonstrates

- AI accelerates domain learning for experienced developers
- The pattern: bring your programming fundamentals, use AI to learn the domain
- Human judgment still essential for community interaction and validation
- Not "AI writes code for non-programmers" but "AI teaches programmers new domains"

---

## 8. Conclusion

- The future of AI-assisted development isn't replacement, it's acceleration
- Experienced developers can enter new domains faster with AI tutors
- But the human element—humility, community, validation—remains essential

---

## Source Materials

- `ghostty-contribution-notes.md` - Main notes with deliverable status
- `ghostty-contribution-analysis.md` - Claude Code session analysis
- `ghostty-codex-analysis.md` - Codex prompt engineering patterns
- `ghostty-codex-key-findings.md` - Technical crash investigation findings
- `ghostty-session-summaries.md` - 98 Claude Code session summaries
- `ghostty-codex-summaries.md` - 57 Codex CLI session summaries
- `ghostty-transcripts/` - Raw Claude Code sessions
- `ghostty-codex-sessions/` - Raw Codex CLI sessions
- `ghostty-crash-triage-skill/` - Crash triage skill source
