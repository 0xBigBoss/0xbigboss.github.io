# Ghostty Contribution Post - Index

Everything needed to publish the blog post and X thread.

## Status: DRAFT (local only)

---

## Main Content

| File | Description |
|------|-------------|
| `ghostty-blog-draft.md` | Main blog post |
| `ghostty-x-thread.md` | X thread version (quick summary) |
| `ghostty-blog-outline.md` | Original outline |

## Supporting Data

| File | Description |
|------|-------------|
| `ghostty-discord-notes.md` | Discord story arc with quotes |
| `ghostty-contribution-notes.md` | Main research notes |
| `ghostty-contribution-analysis.md` | Claude Code session analysis |

## AI Session Data

| File | Description |
|------|-------------|
| `ghostty-session-summaries.md` | 98 Claude Code session summaries |
| `ghostty-codex-summaries.md` | 57 Codex CLI session summaries |
| `ghostty-codex-analysis.md` | Codex prompt engineering patterns |
| `ghostty-codex-key-findings.md` | Technical crash investigation findings |
| `ghostty-transcripts/` | Raw Claude Code sessions (98 files) |
| `ghostty-codex-sessions/` | Raw Codex CLI sessions (57 files) |
| `ghostty-key-transcripts/` | Curated key transcripts |

## Crash Triage Skill

| File | Description |
|------|-------------|
| `ghostty-crash-triage-skill/` | The skill shared with Ghostty community |

## Images

All images go in `/images/ghostty/`:

| File | Description |
|------|-------------|
| `screenshot-x-mitchellh-post.png` | Mitchell's X post (the hook) |
| `screenshot-discord-1-help-thread.png` | Origin story - Dec 5 help post |
| `screenshot-discord-2-first-patch-submitted-bigboss-intro.png` | First patch + AI transparency |
| `screenshot-discord-3-bigboss-finds-2-more-patches.png` | Two more patches + skill share |
| `screenshot-discord-4-patch-4-submitted.png` | Final bug - full circle |

## Reference Links

**X Posts:**
- Mitchell's post: https://x.com/mitchellh/status/2006114026191769924

**GitHub:**
- Ghostty: https://github.com/ghostty-org/ghostty
- Discussion #9957: https://github.com/ghostty-org/ghostty/discussions/9957
- Discussion #10032: https://github.com/ghostty-org/ghostty/discussions/10032
- Discussion #10063: https://github.com/ghostty-org/ghostty/discussions/10063
- Discussion #10074: https://github.com/ghostty-org/ghostty/discussions/10074
- PR #9959: https://github.com/ghostty-org/ghostty/pull/9959
- Crash triage skill: https://github.com/0xbigboss/ghostty-crash-triage

**Tools:**
- Ghostty: https://ghostty.org
- Claude Code: https://docs.anthropic.com/en/docs/claude-code
- Codex: https://openai.com/index/introducing-codex/
- Opus 4.5: https://www.anthropic.com/claude/opus

---

## Publishing Checklist

- [ ] Finalize blog post draft
- [ ] Finalize X thread
- [ ] Verify all images in `/images/ghostty/`
- [ ] Verify crash triage skill repo is public
- [ ] Decide what transcripts to make available (all? curated?)
- [ ] Move blog post from `drafts/` to `_posts/`
- [ ] Post X thread
- [ ] Cross-link blog and X thread

---

## Data Availability Options

**Option A: Link to GitHub gist/repo with all transcripts**
- Pros: Full transparency, reproducible
- Cons: Large, potentially overwhelming

**Option B: Curated key transcripts only**
- Pros: Focused, easier to digest
- Cons: Less complete picture

**Option C: Summary stats + link to full data on request**
- Pros: Clean post, data available for serious readers
- Cons: Extra step for interested readers

Current recommendation: Option B with note that full data available on request.

---

## Transcript Viewer Components

Added to `features/mdx-components.tsx`. Use in MDX posts:

### TranscriptViewer

Individual transcript with expand/collapse:

```mdx
<TranscriptViewer
  title="Session 47: CircBuf Crash Investigation"
  tool="claude-code"
  date="December 26, 2025"
  summary="Investigated integer underflow in CircBuf during resize operations"
>
{`> user: look at this crash in CircBuf.zig

The crash occurs during resize when the head pointer wraps around...`}
</TranscriptViewer>
```

Props:
- `title` (required): Session title
- `tool`: `'claude-code'` | `'codex'` | custom string
- `date`: Session date
- `summary`: Brief description shown in collapsed state
- `children`: Full transcript content

### TranscriptGroup

Groups multiple transcripts with expand/collapse header:

```mdx
<TranscriptGroup title="Claude Code Sessions" count={98}>
  <TranscriptViewer title="Session 1" tool="claude-code">
    ...
  </TranscriptViewer>
  <TranscriptViewer title="Session 2" tool="claude-code">
    ...
  </TranscriptViewer>
</TranscriptGroup>
```

Props:
- `title` (required): Group header
- `count`: Optional count badge
- `children`: TranscriptViewer components
