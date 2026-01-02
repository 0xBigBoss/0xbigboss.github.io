# Discord Story Arc

## The Origin (Dec 5, 2025)
Started as a USER in #help channel:
> "I have had Ghostty just exit 3 times this week without the dialog confirming all terminal sessions will be terminated. Any one else experiencing this? Sort of at a loss where to look as to why this might be happening."

Upgraded to tip hoping it would help. It didn't.

## First Patch (Dec 16, 2025)
Posted asking for experienced eyes to spotcheck:
> "hi all, wondering if anyone with a more experienced eye can spotcheck this diff. I've been recently building ghostty locally in the hopes of nailing down a crash that's been plaguing me for over a month. I built this from tip and was able to reliably reproduce the crash. Though I don't think it's related to my original issue which I've been experiencing even on 1.2.3. Obviously, it's all AI generated, but it's been working for me so far. Hope this helps."

Mitchell's response:
> "This looks believable. A discussion would help. If you're using AI, something that helps a lot is getting it to write and run a unit test that fails without the patch and passes with it"

After #9957 submitted, Mitchell:
> "@BigBoss your AI did really good work, #9959 i came to the identical diff organically w/o looking at your patch"

Key exchange:
- BigBoss: "opus 4.5 and codex 5.1 high are amazing models, nothing really gets by them. I can only take credit for the prompts haha"
- Mitchell: "Yeah I code primarily with Opus 4.5 and do analysis with GPT 5.1 so that tracks."
- Mitchell: "it still requires the right prompts 😊"

## Two More Patches + Skill Share (Dec 26, 2025)
> "hi ghostty devs, I experienced these crashes using releasesafe strip=false and guided the AIs to these fixes. Though I am still new to the src code, these extra checks do seem legit though I do not have steps to manually reproduce them."

Shared the crash triage skill:
> "Also sharing an agent skill I wrote to triage the crashes on mac in case someone else need the instructions to peek at the stacktraces and create a crash report. SKILL.md"

Mitchell's response:
> "Those both look good and your skill also looks really good, thanks ❤️ high quality AI work is always appreciated. im gonna critique the patches a bit more, I think they're a bit suspect but the actual crash analysis and stack trace inspection is good"

The backstory reveal:
> "sounds good. i'm rocking those two patches on my fork off tip, will update the discussions if i learn more. the backstory of why I am here is basically over the last month or so ghostty (originally v1.2.3) just started randomly crashing for me. I'm a heavy ghostty user and basically never restart and have claude code sessions that span days. So I started peeking at the source tracing that original bug. It's been a fun experiment on how well a novice zig dev can get up to speed quickly on a large project with aid of AI. fun times."

Mitchell on the patches:
> "The patches will definitely work. Just think they're at the wrong layer"

## The Final Bug (Dec 26-27, 2025)
> "ok, i think i finally caught the bug that i was chasing for over a month. this one is much more complicated than i imagined and unsure how to reproduce it exactly. though i do have a habit of resizing my windows constantly which is when i noticed this happens more frequently."

This was #10074 - viewport pin overflow in getBottomRight

---

## Key Narrative Elements

1. **Origin**: User experiencing crashes, not contributor looking for issues
2. **Motivation**: "plaguing me for over a month" - personal pain point
3. **Transparency**: "Obviously, it's all AI generated" - upfront about AI use
4. **Humility**: "I am still new to the src code" / "novice zig dev"
5. **Validation**: Mitchell independently arrived at same diff for #9957
6. **Respect earned**: "high quality AI work is always appreciated"
7. **Contribution beyond code**: Shared the crash triage skill publicly
8. **Heavy user context**: "claude code sessions that span days"
9. **Full circle**: Final bug was the original crash from Dec 5

## Quotable Moments

- "I can only take credit for the prompts haha"
- "it still requires the right prompts" - Mitchell
- "fun experiment on how well a novice zig dev can get up to speed quickly on a large project with aid of AI. fun times."
- "your AI did really good work" - Mitchell
- "high quality AI work is always appreciated" - Mitchell
