# Codex CLI Prompt Engineering Patterns

Analysis of Codex CLI sessions from the Ghostty investigation period. Of 57 sessions collected, **30 were run directly in the Ghostty repository** and contain direct crash investigation work. The remaining 27 sessions were run from other projects during the same timeframe and are included for completeness but contain unrelated work.

---

## 1. Prompt Engineering Patterns

### Primary Pattern: Structured XML Role/Context/State Framework

Most effective Codex prompts follow a consistent three-part XML structure:

```xml
<role>
You are a [senior/specialized role] [task description]
</role>

<context>
[Problem background, investigation history, key constraints]
</context>

<current_state>
**Done:** [What has been completed]
**In progress:** [Current blockers]
**Blocked:** [What requires resolution]
</current_state>
```

**Why This Works:**
- Clear role framing establishes expected expertise level and task scope
- Context provides exactly what the AI needs without forcing reads
- Current state prevents redundant explanations and enables quick task resumption

---

## 2. Iteration Style: Codex vs Claude Code

### Codex Specialization: Single-Turn Problem Solving

- Sessions are typically short (1-5 messages average)
- User asks specific, bounded questions: "analyze this crash", "review these changes", "symbolicate this"
- Codex provides actionable analysis without requiring back-and-forth
- No iterative loops needed—work is completed immediately

### Tasks Never Delegated to Codex (vs Claude Code)

- Multi-day investigations requiring hypothesis iteration
- Long refactoring with verification loops
- Interactive debugging with trial-and-error
- Code writing requiring design discussions

### Tasks Always Delegated to Codex

- Quick analysis/reviews (crash triage, git log analysis, code review)
- Diagnostic work (symbolication, config debugging)
- Verification against existing code
- Problem diagnosis before implementation

---

## 3. Key Differences from Claude Code

| Aspect | Codex | Claude Code |
|--------|-------|------------|
| Session length | 0-5 messages, typically final | 10-50+ messages, iterative |
| Task type | Analysis, verification, diagnosis | Implementation, refactoring, design |
| Handoff style | "Here's a problem, analyze it" | "Here's a task, implement it" |
| Error recovery | Report findings, user decides next step | Iterate to fix the issue |
| Role framing | Specific expert role (reviewer, debugger) | General implementation role |
| Verification | User confirms understanding before proceeding | Built into the session (tests, builds) |
| Context setup | Detailed current_state block required | CLAUDE.md global instructions sufficient |

---

## 4. Notable Effective Prompts

### Prompt #1: Crash Diagnosis

```xml
<role>
You are a debugger investigating a crash in Ghostty's Metal renderer on macOS Tahoe 26.1.
Your goal is to build the instrumented code, reproduce the crash, capture the diagnostic
log output, and identify the root cause of the `unreachable` being hit.
</role>

<context>
[crash dump details, investigation history, code locations]
</context>

<current_state>
**Done:** [analysis work]
**In progress:** [next step]
</current_state>
```

Why effective: Clear goal, specific target system, exact next step.

### Prompt #2: Architecture Review

```xml
<role>
You are a senior engineer reviewing an architecture analysis and then auditing
for similar vulnerabilities.
</role>

<context>
[What was analyzed, why, root cause hypothesis]
</context>

<current_state>
**Done:** [Analysis summary]
**Needs verification:** [What requires validation]
**Needs investigation:** [Follow-up searches]
</current_state>
```

Why effective: Separates verification task from investigation, guides systematic audit.

### Prompt #3: Fix Verification

```xml
<role>
You are a senior engineer reviewing a bug fix for an integer underflow crash
in Ghostty's circular buffer implementation. Verify the root cause analysis is
correct and the fix is appropriate.
</role>
```

Why effective: Verification task is bounded, all context provided, Codex can certify immediately.

### Prompt #4: GitHub Context Integration

```
Analyze this github discussion, analyze the PR that mitchell tagged vs the commit
I made and breakdown the approach that mitchell took. Use my gh CLI if needed.
[GitHub links provided]
```

Why effective: Instructs AI to use tools to gather external context, then compare approaches.

---

## 5. Common Patterns in Ghostty Sessions

### Pattern A: Crash Investigation → Root Cause → Fix → Test

1. Session establishes current crash
2. Identifies root cause in code
3. Proposes fix with defensive checks
4. Verifies with regression tests
5. Reviews related vulnerabilities

### Pattern B: Stack Trace → Symbolication → Architecture Analysis

1. User provides crash dump → Codex symbolicates with atos
2. Codex maps to source files
3. Documents the multi-threaded race or timing issue
4. Guides user to next investigation step

### Pattern C: Feature/Change Audit

- Role: "Senior engineer reviewing X changes"
- Context: What changed and why
- Current state: What verification needs to happen
- Output: Findings, gaps, risks

---

## 6. Prompting Insights

### What Codex Sessions Never Do

- Wait for user confirmation during implementation
- Iterate on design decisions
- Loop on test failures
- Ask "should I do X?"

### What Makes Codex Sessions Short

- Role + context lets Codex provide complete analysis in one response
- Analysis doesn't require trial-and-error
- User can make decisions independently based on clear findings

### Structured Data in Current State

```
**Done:** Lists concrete accomplishments with file locations
**In progress:** Specific blockers or next steps (not "figure this out")
**Blocked:** What external input is needed
**Verified:** Facts that have been checked against source
**Needs verification:** What requires validation before proceeding
```

This structure allows Codex to pick up exactly where a session left off.

---

## Key Insight

Codex sessions are optimized for bounded analysis/review work, not iterative implementation. Effective prompts establish clear role, provide comprehensive context, and explicitly describe current state including what's been done and what needs verification.
