# Codex Key Findings: Ghostty Crash Investigation

Summary of technical discoveries and insights from Codex CLI sessions.

---

## 1. Key Insights from Codex

The Codex sessions revealed several critical crash patterns in Ghostty on macOS Tahoe (26.1.0 beta):

**Renderer-related crashes (3 bugs):**

- **Coordinate System Mismatches (#9957)**: A bug in `linkCells` where viewport-relative y coordinates were incorrectly passed to `Page.getRowAndCell`, which expects page-relative coordinates. Triggered by hovering over OSC8 hyperlinks with large scrollback (200k+ lines).

- **Bounds Check Missing (#10032)**: A separate bug in `linkCells` where viewport point exceeds grid bounds during resize/render-state lag. Different root cause from #9957.

- **Viewport Boundary Issues (#10074)**: The renderer and resize operations can cause the viewport pin position to exceed available rows during resize/reflow cycles. This is not a true race condition (both hold the same mutex), but rather the viewport pin becoming invalid after row count shrinks.

**Non-renderer crashes (1 bug):**

- **Integer Underflow in Circular Buffer (#10063)**: A crash in `CircBuf.getPtrSlice` where empty slices cause `end_offset - 1` to underflow (0 - 1 on usize). This is in the data structures layer, triggered by terminal search functionality.

---

## 2. Technical Findings

### Crash 1 - linkCells Coordinate Mismatch (Dec 17-18, Discussion #9957)

- **Location**: `src/terminal/render.zig:807-871`
- **Bug**: viewport_point.y (0 to terminal_rows-1) passed to getRowAndCell which expects page-relative coordinates
- **Crash Pattern**: OSC8 link hover + 200k+ line scrollback
- **Component**: Terminal renderer
- **Status**: Fixed in commit c02cf6418 (coordinate fix only, no bounds check)

### Crash 2 - linkCells Bounds Check (Dec 23, Discussion #10032)

- **Location**: `src/terminal/render.zig:833-838`
- **Bug**: Viewport point exceeds grid bounds during resize/render-state lag
- **Crash Pattern**: Hovering over hyperlinks during window resize
- **Component**: Terminal renderer
- **Note**: Different bug from #9957, though both in `linkCells` function
- **Status**: Fixed with bounds check + regression test

### Crash 3 - getBottomRight Null Unwrap Panic (Dec 23-26, Discussion #10074)

- **Location**: `src/terminal/PageList.zig:3974-3986`
- **Bug**: After resize/reflow, viewport pin position plus viewport height exceeds available rows
- **Root Cause**: `br.down(self.rows - 1)` returns null when pin.y + rows > total_rows
- **Component**: Terminal page list
- **Fix**: Multiple defensive layers added (viewport clamping, fallback to active, zero-size guards)
- **Status**: Fixed in commit 465d284c with 3 regression tests, all 1460+ PageList tests pass

### Crash 4 - CircBuf Integer Underflow (Dec 25, Discussion #10063)

- **Location**: `src/datastruct/circ_buf.zig:108`
- **Bug**: `appendSliceAssumeCapacity` calls `getPtrSlice(0, 0)` causing underflow
- **Trigger**: Searching with `yes` command
- **Component**: Data structures (NOT renderer)
- **Status**: Fixed with empty slice guard; upstream issue #9721 unfixed
- **Related**: Confirmed upstream ghostty-org/ghostty has the same bug

### Additional Investigation - Font Sprite MultiArrayList Index OOB (Dec 23)

- **Stack**: `font.sprite.draw.symbols_for_legacy_computing.SmoothMosaic.from` → `sort.pdq` → `MultiArrayList.addOneAssumeCapacity`
- **Error**: "index out of bounds: index 30, len 29"
- **Likely cause**: Internal sorting/deduplication of symbol glyphs failing
- **Status**: Investigated but **NOT FIXED** - root cause still under investigation

---

## 3. Debugging Methodology

**Tooling Used:**
- ghostty-crash-triage skill to extract minidumps from .ghosttycrash files
- Symbolication with lldb using dSYM debug symbols
- Targeted `log.err` instrumentation before unreachable statements
- ReleaseSafe builds (debug with symbols for performance)

**Key User Discoveries:**
- Identified how fnm (Node Version Manager) wasn't properly configured in shell PATH
- Found debug build performance issues and workarounds (use ReleaseSafe instead of full debug)
- Documented logging control via GHOSTTY_LOG environment variable

---

## 4. Timeline of Progress

### Dec 17 - Initial Investigation
- Added logging instrumentation before 5 identified unreachable statements in updateFrame
- Analyzed crash location at +9560 offset
- Built instrumented debug build

### Dec 17-18 - linkCells Coordinate Mismatch Fix (#9957)
- Found viewport-relative vs page-relative coordinate mismatch in linkCells
- Committed fix c02cf6418 with regression test

### Dec 23 - linkCells Bounds Check Fix (#10032)
- Separate crash: viewport point exceeds grid bounds during resize
- Added bounds check at `src/terminal/render.zig:833-838`
- Added regression test for out-of-bounds scenario

### Dec 23 - Font Crash Analysis
- Symbolicated crash showing MultiArrayList overflow in symbol deduplication
- Investigation showed font.zig and sort.zig involved
- Status: Still active/investigating

### Dec 23-26 - getBottomRight Viewport Panic
- Triaged crash report showing null unwrap in PageList.getBottomRight
- Traced root cause to resize/reflow leaving viewport invalid
- Implemented defensive fix with viewport clamping (3 code locations)
- Added zero-size guards and fallback behavior
- Committed fix 465d284c with comprehensive test coverage
- Verified all 1460+ terminal tests pass

### Dec 25 - CircBuf Underflow Discovery
- Found integer underflow in circular buffer implementation
- Related to terminal search functionality
- Confirmed upstream bug remains unfixed (issue #9721)
- Fix: Added early return guard for empty slices

### Dec 29 - Architectural Analysis
- Analyzed GitHub discussion and upstream PR approach
- Compared viewport clamping strategies
- Documented architectural understanding of multi-threaded renderer

### Jan 1 - VS Code Integration Feasibility
- Explored libghostty embedding architecture
- Analyzed native vs WebGL+wasm approaches
- Provided effort estimates and technical assessment

---

## 5. Key Files Touched

**Terminal renderer and page list:**
- `src/terminal/render.zig` - linkCells bugfixes (#9957, #10032)
- `src/terminal/PageList.zig` - Viewport management, getBottomRight fix (#10074)
- `src/renderer/generic.zig` - Metal renderer frame updates (instrumentation only)
- `src/font/sprite.zig` - Possible font glyph deduplication issue (investigating)

**Data structures (non-renderer):**
- `src/datastruct/circ_buf.zig` - Circular buffer empty slice guard (#10063)

**Debugging artifacts:**
- `bug-crash-reports/2025-12-23/` - Font crash analysis
- `bug-crash-reports/2025-12-26/` - Viewport panic documentation
- Test additions in PageList and render.zig with regression coverage

---

## 6. Current Status

**Fixed and Verified:**
- linkCells coordinate mismatch (#9957, commit c02cf6418)
- linkCells bounds check (#10032, separate fix with regression test)
- Viewport panic (#10074, commit 465d284c)
- CircBuf underflow guard (#10063)

**Still Investigating:**
- Font sprite deduplication crash (low priority, less common)
- Potential edge cases in viewport fallback logic

**Upstream Contributions:**
- circbuf fix aligns with unfixed upstream issue #9721
- viewport approach differs slightly from upstream PR #10095 (more comprehensive locally)

---

This documentation demonstrates systematic crash investigation using crash artifacts, symbolication, instrumentation logging, and targeted regression testing.
