---
name: content-qc
description: Opens a QC intake form, then QCs a piece of creative content (Google Drive folder or file link, Frame.io review link, uploaded video or still, PDF, or pasted copy) before it goes to client. Checks Spanish/English grammar and accents, verifies album, artist, and track names against Amazon Music's exact styling, and runs visual/brand checks. Use when someone says "QC this", "proof this", "check this link/folder", "make sure the album names are right", "review these frames", or shares a Drive or Frame.io link, video, or still and asks for a check.
---

# Content QC

Review every asset and return an errors-only report. Read every word on every asset, and never pass something unchecked.

## Keep steps low

Every step re-reads the whole session, so fewer steps means a cheaper, faster run.

1. **Read `references/qc-checklist.md` once.** It has the intake routes and every check. Don't open other files.
2. **Load tools in one ToolSearch call** for the route: the Drive tools, the browser tools (needed for the Amazon check on every run) and `WebSearch` together.
3. **Pick the browser once.** If Claude in Chrome doesn't connect on the first call, switch to the built-in browser (`mcp__remote-devices__Claude_Browser__*`) without retrying or troubleshooting.
4. **Batch browser work.** Use `browser_batch` for navigate → wait → screenshot/zoom → get_page_text. For Frame.io video, use `scripts/frameio_grid.js` (one batch per 6 frames).
5. **Check every name against the Amazon Music platform.** Run all WebSearches in one parallel turn (standard mode). For every name search doesn't settle, run `scripts/amazon_lookup.js` in two batches: amazon.com Digital Music search, then the matching detail pages (see checklist). No sign-in is needed, so never skip this or report a released title as "Couldn't verify".
6. **Clean up in one turn:** close extra tabs, remove the overlay, and reset the viewport.

## 0. Intake form

Show it only when the request has no link, file, or pasted copy. Otherwise skip it and run everything with the defaults. When shown, make one AskUserQuestion call with:

1. **What are we QCing?** (header "Asset"): Drive folder or file / Frame.io link / Uploaded file / Copy only
2. **What's the format?** (header "Format"): Static frames / carousel · Video · Mixed
3. **Which checks?** (header "Checks", multi-select): All of the above (Recommended) · Copy & grammar · Amazon Music styling · Visual & brand
4. **Anything else I should know?** (header "Context"): Nothing extra · VO script / lyrics attached · Specific notes · Re-check of a fixed round

**Defaults:** work out the asset and format from the link or files, run all checks (plus video technical for video), and assume no extra context. Don't ask anything.

After the form:

- If there's no link yet, reply "Paste the link (or attach the file) and I'll start."
- For a re-check, verify the listed issues first.
- If VO / lyrics was chosen without a script, ask for it.

## 1. Collect

Follow the matching route in the checklist. Confirm the asset list and count; for video, confirm the duration and that every cut, super and the end card was captured. Note the round or version.

## 2. Transcribe

Write down all on-screen text exactly as shown: headlines, body, titles, artists, tracks, CTAs, legal. Every check runs against this transcription.

## 3. Check

Run the selected sections of the checklist: copy & grammar, Amazon Music styling, visual & brand (with video technical for video).

## 4. Report

Readable in 30 seconds, errors only.

**X issues to fix · [count] [format], [round]**

1. **Frame 03:** wrong → right
2. **Frames 03–05:** wrong → right

- One line per issue, as "wrong → right". Group repeats across frames.
- No explanations, except adding "per Amazon Music" to a name fix.
- No tables, no list of what passed, no tips.
- Only if needed, end with one line: "Couldn't verify: …".
- For a re-check, put "Last round: N fixed, N still open (Frame XX)" above the issues.
- With no errors, reply with one line: "No issues · 5 static frames, R01. Ready to send."
