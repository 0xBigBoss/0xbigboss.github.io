# Research Analysis: How I Contributed to Ghostty with AI

Synthesized from 98 Claude Code session transcripts spanning Dec 17, 2025 - Jan 1, 2026.

---

## Executive Summary

Mitchell Hashimoto's recognition highlighted two key skills: **"driving AI with expert skill"** and **"navigating the terrain with expert skill."** The analysis below documents the specific techniques that made this work.

---

## Part 1: Prompt Engineering Techniques

### Structured XML Context Framing

The initial prompts used explicit XML structure:

```xml
<role>
You are a debugger investigating a crash in the Ghostty terminal
emulator's Metal renderer.
</role>

<context>
Ghostty crashes intermittently on macOS Tahoe 26.1.0 (beta)...
</context>

<current_state>
**Done:**
- Cloned ghostty-org/ghostty
- Analyzed 3 crash dumps
- Symbolicated stack traces using atos

**In progress:**
- Need to locate the specific `unreachable` being hit
</current_state>

<key_files>
- src/renderer/generic.zig - Contains updateFrame at line 1099
- src/renderer/Metal.zig - Metal-specific implementation
</key_files>

<next_steps>
1. Read src/renderer/generic.zig starting at line 1099
2. Search for all `unreachable` statements
3. Look for switch/if branches that could fail on Tahoe
</next_steps>
```

### Why This Works

| Element | Purpose |
|---------|---------|
| `<role>` | Frames AI's identity and goal |
| `<context>` | Provides technical background |
| `<current_state>` | Prevents redundant work |
| `<key_files>` | Points AI to relevant code |
| `<next_steps>` | Provides action sequence |

### Session Handoffs

Created `/handoff` command to generate context-preserving prompts for new sessions:

```xml
<role>
You are a debugger continuing investigation of a Ghostty Metal
renderer crash on macOS Tahoe 26.1.0. Focus on the viewport row
iteration null unwrap and verify the new instrumentation logs.
</role>
```

**Key insight:** AI sessions are stateless. Explicit handoffs bridge context across conversations.

---

## Part 2: Investigation Workflow

### The Iteration Loop

```
hypothesis → instrumentation → build → test → analyze → refine
```

**Example cycle:**
1. Identify candidate `unreachable` statements
2. Add logging instrumentation to each
3. Build with `zig build -Doptimize=ReleaseSafe`
4. Run and trigger crash
5. Analyze logs to narrow down
6. Repeat with refined hypothesis

### Multi-Layer Verification

1. **Syntax check:** AI runs `zig ast-check` before claiming changes valid
2. **Build verification:** Compile to catch errors
3. **Startup marker:** Look for "LOCAL BUILD" in logs
4. **Log stream:** `sudo log stream --predicate 'subsystem=="com.mitchellh.ghostty"' | grep "LOCAL BUILD|BUG:"`

### Critical Lesson: Wrong Binary

The AI caught a major mistake:

> "That crash was from the **old Ghostty** (version 1.3.0-main+e515d0847), not your local build. There's no 'LOCAL BUILD' marker in the logs."

The startup marker pattern proved essential for distinguishing builds.

---

## Part 3: Domain Translation

### Treating AI as Subject Matter Expert

Instead of learning Zig/Metal/terminals, asked questions at the right abstraction level:

- "Is there a way to build only the version I need for Mac?"
- "Will this build get us closer to the root cause?"
- "I'm already running one version of Ghostty - will they interfere?"

### Building Mental Models Through AI

Asked for explanations to understand the codebase:

> "Look at the recent linkCells fix in the git log. Trace through the ghostty code and explain high level the architecture and why the OOB crash is even possible."

---

## Part 4: Tools Built

> **Note:** These tools were created during the investigation. A copy is included in this repo at `drafts/ghostty-crash-triage-skill/` for reference.

### ghostty-crash-triage Skill

One-command orchestrator for crash analysis. Full source included at `drafts/ghostty-crash-triage-skill/`:

```
drafts/ghostty-crash-triage-skill/
├── SKILL.md                         # Usage documentation (6.8KB)
├── scripts/
│   ├── triage.py                    # Main orchestrator (22KB)
│   ├── extract_sentry_envelope.py   # Sentry envelope parser (5.2KB)
│   ├── lldb_bt.sh                   # Symbolication wrapper (1.5KB)
│   └── config.json                  # Configuration
├── assets/                          # (empty - for screenshots)
└── references/                      # (empty - for docs)
```

**What it does:**
1. Auto-selects newest crash file from `~/.local/state/ghostty/crash/`
2. Extracts minidump and event metadata
3. Searches for matching dSYM by debug_id
4. Symbolicates with lldb (fallback to atos)
5. Generates `REPORT.md` skeleton

### dSYM Archiving Strategy

```bash
# Archive by debug_id for future symbolication
UUID=$(dwarfdump --uuid Ghostty.app.dSYM | grep arm64 | awk '{print $2}')
mkdir -p ~/.ghostty-dsyms/$UUID
cp -r Ghostty.app.dSYM ~/.ghostty-dsyms/$UUID/
```

---

## Part 5: The Crashes Fixed

The author filed **4 GitHub discussions** for crash reports, representing **4 distinct bugs**:

### 1. linkCells Coordinate Mismatch (Discussion #9957)
- **File:** `src/terminal/render.zig`
- **Root cause:** Viewport-relative y coords passed where page-relative expected
- **Trigger:** OSC8 hyperlink hover with large scrollback (200k+ lines)
- **Component:** Terminal renderer

### 2. linkCells Bounds Check (Discussion #10032)
- **File:** `src/terminal/render.zig`
- **Root cause:** Viewport point exceeds grid bounds during resize/render-state lag
- **Trigger:** Hovering over hyperlinks during window resize
- **Component:** Terminal renderer
- **Note:** Different bug from #9957, though both in `linkCells` function

### 3. Integer Underflow in CircBuf (`getPtrSlice`) (Discussion #10063)
- **File:** `src/datastruct/circ_buf.zig`
- **Root cause:** Zero-length slice requests caused underflow
- **Trigger:** Terminal search functionality
- **Component:** Data structures (NOT renderer)

### 4. Viewport Overflow Panic (`getBottomRight`) (Discussion #10074)
- **File:** `src/terminal/PageList.zig:3980`
- **Root cause:** After resize, viewport pin positioned past valid bounds
- **Arithmetic:** `rows=76, total_rows=116, pin.y=46` → `46+75=121 > 115`
- **Component:** Terminal page list

### Additional Investigation (Not Fixed)

The following were investigated but not confirmed as root causes:

- **Virtual Placement Pin Outside Viewport** (`src/renderer/generic.zig:1835`) - Instrumented with logging but crash not reproduced
- **Font Sprite MultiArrayList OOB** - Stack trace captured but root cause still under investigation

---

## Part 6: Key Quotes for Blog

### On Hypothesis Formation
> "**Hypothesis**: During window resize on macOS Tahoe, there's a timing issue where... the pin is no longer within the viewport bounds by the time `pointFromPin(.viewport, pin)` is called."

### On User Agency
> "Will this build get us closer to the root cause? Let's try with symbols enabled. I am willing to pay the performance cost."

### On Instrumentation Strategy
> "Instrument all potential crash sites rather than betting on a single hypothesis."

### On Progress Without Resolution
> "When the crash happens, you'll get exact file:line info... This will definitively tell us which unreachable is being hit."

---

## Part 7: Patterns Summary

| Pattern | Implementation |
|---------|----------------|
| **Explicit role framing** | XML tags with role, context, state |
| **State preservation** | `/handoff` prompts with Done/In-progress |
| **Hypothesis-driven iteration** | Instrument → build → test → analyze |
| **Domain abstraction** | Ask "how do I run it" vs. reading docs |
| **Multi-layer verification** | Syntax → build → marker → log stream |
| **Atomic task decomposition** | Numbered steps in prompts |
| **Subagent delegation** | Parallel investigations |
| **Reusable skills** | `ghostty-crash-triage` command |

---

## The Meta-Insight

"Driving AI with expert skill" is less about domain expertise and more about:

1. **Framing problems clearly** with structured prompts
2. **Breaking complex tasks** into verifiable steps
3. **Treating AI as domain expert** while controlling strategy
4. **Building feedback loops** that confirm real progress
5. **Creating reusable abstractions** for recurring patterns

The human brings: problem framing, verification, persistence, and social navigation.
The AI brings: domain knowledge, systematic search, code analysis, and tireless execution.
