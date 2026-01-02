# How I Contributed to Ghostty with No Terminal Developer Experience Driving Claude Code and Codex

> **Purpose:** This directory contains **research notes and source materials** for writing a blog post. This is NOT the blog post itself - it is the input material the author will use to write the post.

**Working Title** - Draft Notes

**See also:**
- [Claude Code Analysis](./ghostty-contribution-analysis.md) - Synthesized research from 98 Claude Code sessions
- [Codex Analysis](./ghostty-codex-analysis.md) - Prompt engineering patterns from 57 Codex CLI sessions
- [Codex Key Findings](./ghostty-codex-key-findings.md) - Technical discoveries from Codex crash investigation

---

## The Recognition

Mitchell Hashimoto (creator of Vagrant, Terraform, Vault, and now Ghostty) posted about this contribution on X:

> **@mitchellh** (Dec 30, 2025) - 324.7K views, 4.8K likes, 491 retweets

Key quotes from Mitchell's post:
- "Slop drives me crazy and it feels like 95+% of bug reports, but man, AI code analysis is getting really good."
- "There are users out there reporting bugs that don't know ANYTHING about our stack, but are *great* AI drivers and producing some high quality issue reports."
- "This person (linked below) was experiencing Ghostty crashes and took it upon themselves to use AI to write a python script that can decode our crash files, match them up with our dsym files, and analyze the codebase for attempting to find the root cause, and extracted that into an Agent Skill."
- "They then came into Discord, warned us they don't know Zig at all, don't know macOS dev at all, don't know terminals at all, and that they used AI, but that they thought critically about the issues and believed they were real and *asked if we'd accept them*."
- "I took a look at one, was impressed, and said *send them all*."
- "This fixed 4 real crashing cases that I was able to manually verify and write a fix for from someone who -- on paper -- had no fucking clue what they were talking about. And yet, they drove an AI with expert skill."
- "I want to call out that in addition to driving AI with expert skill, they **navigated the terrain with expert skill as well**. They didn't just toss slop up on our repo. They came to Discord as a human, reached out as a human, and talked to other humans about what they've done. They were careful and thoughtful about the process."
- "People like this give me hope for what is possible."

Source: https://x.com/mitchellh/status/2006114026191769924

---

## The 4 Crash Reports (GitHub Discussions)

All filed as Issue Triage, all Closed & Answered:

1. **linkCells assertion failure with large scrollback when hovering hyperlinks**
   - https://github.com/ghostty-org/ghostty/discussions/9957
   - 1 upvote, 1 comment (Dec 18, 2025 - the first one filed)
   - **Root cause:** viewport-relative y coords passed where page-relative expected
   - **Component:** Terminal renderer (`src/terminal/render.zig`)

2. **Crash: OSC8 hyperlink hover during resize causes index-out-of-bounds panic in linkCells**
   - https://github.com/ghostty-org/ghostty/discussions/10032
   - 1 upvote, 1 comment (Dec 23, 2025)
   - **Root cause:** Viewport point exceeds grid bounds during resize/render-state lag
   - **Component:** Terminal renderer (`src/terminal/render.zig`)
   - **Note:** Different bug from #9957, though both in `linkCells` function

3. **Search thread crash: integer underflow in CircBuf.getPtrSlice**
   - https://github.com/ghostty-org/ghostty/discussions/10063
   - 1 upvote, 2 comments (Dec 26, 2025)
   - **Root cause:** Zero-length slice requests caused integer underflow
   - **Component:** Data structures (`src/datastruct/circ_buf.zig`) - NOT renderer

4. **Renderer crash: viewport pin overflow in getBottomRight after resize**
   - https://github.com/ghostty-org/ghostty/discussions/10074
   - 3 upvotes, 2 comments (Dec 26, 2025)
   - **Root cause:** Viewport pin positioned past valid bounds after resize
   - **Component:** Terminal page list (`src/terminal/PageList.zig`)

**Summary:** 4 discussions filed, representing **4 distinct bugs**. Three are renderer/terminal related (#9957, #10032, #10074), one is in the data structures layer (#10063).

Source: https://github.com/ghostty-org/ghostty/discussions?discussions_q=is%3Aclosed+crash+author%3A0xBigBoss

---

## The Process / Story Arc

### Background
- No experience with: Zig, macOS development, terminal emulators
- Was experiencing crashes while using Ghostty
- Decided to investigate using AI tools (Claude Code, Codex)

### What I Built
- Python script to decode crash files
- Matched crash files with dsym files
- Analyzed codebase to find root causes
- Extracted the workflow into a reusable Agent Skill

### The Approach
- Used AI as a driver/collaborator, not just a code generator
- Thought critically about the AI's analysis
- Verified the issues seemed real before reporting
- Reached out on Discord first to ask if reports would be welcome
- Was transparent about using AI and lack of domain expertise

### Key Lessons
- "Driving AI with expert skill" - what does this mean?
- Navigating the human/social terrain is just as important
- Being transparent about AI usage and limitations
- Asking permission before dumping issues
- Quality over quantity

---

## Session Transcripts

### Claude Code Sessions

98 Claude Code sessions saved to:
`/Users/allen/0xbigboss/0xbigboss.github.io/drafts/ghostty-transcripts/`

Total size: 30MB

Largest sessions (likely the most substantive work):
- `2967cad7-8cec-4ea2-8537-1ba88d6f40e3.jsonl` - 13MB (Dec 26)
- `8caea3d6-0afc-413f-bc44-14844fd6f44f.jsonl` - 3.2MB (Dec 18)
- `87bb4fdf-8200-40f9-bbfa-60be10dd5a81.jsonl` - 1.7MB (Dec 19)
- `9f8a0219-dcb2-4a62-82c4-4829c95a6b79.jsonl` - 1.6MB (Dec 18)
- `3d2f7fc3-95f9-4197-b304-b0506281f487.jsonl` - 1.5MB (Dec 26)

### Codex CLI Sessions

57 Codex CLI sessions from the investigation period saved to:
`/Users/allen/0xbigboss/0xbigboss.github.io/drafts/ghostty-codex-sessions/`

Total size: ~25MB

**Note:** Only **30 of these 57 sessions** were run in the Ghostty working directory and contain direct crash investigation work. The remaining 27 are from other projects during the same timeframe.

Key observations:
- Codex used for single-turn analysis and review tasks
- Highly structured prompts with XML tags (`<role>`, `<context>`, `<current_state>`)
- Crash symbolication and verification work
- Architecture reviews and fix validation

Sessions span: Nov 17, 2025 - Jan 1, 2026

---

## Potential Blog Structure

1. **Hook**: Mitchell's tweet and the recognition
2. **The Problem**: Experiencing crashes, no domain expertise
3. **The Approach**: How I used AI tools to investigate
4. **The Technical Work**: Building the crash analysis workflow
5. **The Human Element**: Discord, asking permission, being transparent
6. **The Results**: 4 distinct bugs fixed (3 renderer/terminal, 1 data structures)
7. **Lessons Learned**: What "driving AI with expert skill" really means
8. **Conclusion**: The future of AI-assisted contribution

---

## Deliverable Status

This task was to **gather research and notes** for a future blog post. All research deliverables are complete:

| Deliverable | Status | Location |
|-------------|--------|----------|
| Mitchell's X post quotes | Complete | This file (above) |
| GitHub discussion URLs | Complete | This file (above) |
| Session transcript excerpts | Complete | [analysis doc](./ghostty-contribution-analysis.md) |
| Crash triage skill source | Complete | `drafts/ghostty-crash-triage-skill/` |
| Claude Code raw transcripts | Complete | `drafts/ghostty-transcripts/` (98 files) |
| Claude Code session summaries | Complete | `drafts/ghostty-session-summaries.md` (98 sessions) |
| Claude Code AI strategy analysis | Complete | [analysis doc](./ghostty-contribution-analysis.md) |
| Codex CLI raw sessions | Complete | `drafts/ghostty-codex-sessions/` (57 files) |
| Codex CLI session summaries | Complete | `drafts/ghostty-codex-summaries.md` (57 sessions) |
| Codex prompt engineering analysis | Complete | [codex analysis](./ghostty-codex-analysis.md) |
| Codex technical findings | Complete | [codex findings](./ghostty-codex-key-findings.md) |

**Note:** Writing the actual blog post is a separate future task that will use these materials as input.

---

## Notes

- The term "slop" refers to low-quality AI-generated content dumped without thought
- Mitchell emphasizes the *human* skills as much as the AI driving skills
- The ask-first approach was critical to acceptance
