---
name: content-qc
description: QC a piece of creative content (Google Drive folder or file link, Frame.io review link, uploaded video or still, PDF, or pasted copy) before it goes to client. Checks Spanish/English grammar and accents, verifies album, artist, and track names against Amazon Music's exact styling, and runs visual/brand checks. Use when someone says "QC this", "proof this", "check this link/folder", "make sure the album names are right", "review these frames", or shares a Drive or Frame.io link, video, or still and asks for a check.
---

# Content QC

Review every frame/asset in the deliverable and return a clear pass/flag report. Be exhaustive: read every word on every asset. Never mark something correct without checking it.

## 1. Collect the assets

Accept any of: a Google Drive folder or file link, a Frame.io link (review link or single asset), a video or still uploaded to chat, or pasted copy. If nothing was provided, ask for it.

Read `references/asset-intake.md` and follow the route for the input type. It covers Drive folders (with pagination), Drive images, Frame.io stills and video (driving the player from the browser), video files (frame extraction with the bundled script), and uploads.

Before checking anything, confirm the full asset list and count. For video, confirm the duration and that every cut, super, and the end card has been captured.

## 2. Transcribe the copy

For every asset, write down every piece of on-screen text exactly as shown: headlines, body copy, album titles, artist names, track names, CTAs, legal text. Keep capitalization, accents, and punctuation exactly as they appear. This transcription is what all later checks run against.

## 3. Run the checks

Run all three. Detailed rules are in the reference files; read them before checking.

1. **Copy & grammar (Spanish and English).** See `references/copy-checklist.md`. Spelling, accents/tildes, ¿¡ marks, agreement, verb tense, punctuation, and consistency of repeated copy across frames.
2. **Amazon Music name styling.** See `references/amazon-music-styling.md`. The team mirrors exactly how Amazon Music displays album, artist, and track names (caps, lowercase, symbols, punctuation, accents). Verify **every** album and **every** artist name against Amazon Music, including names that look obviously right. Artist styling is checked separately from album styling (e.g., Amazon lists "KAROL G" in all caps).
3. **Visual & brand.** See `references/visual-brand-checklist.md`. Logo, layout consistency across frames, artwork matches the named album, text cropping/overlap, file naming.

## 4. Report back

Reply in chat in this order:

1. **One-line verdict**: "Clean, ready to send" or "X issues to fix before sending".
2. **Fixes needed** (only if any): numbered list. For each one: frame, what's wrong, what it should be, and why (with the Amazon Music source when relevant). Most important first.
3. **Frame-by-frame table**:

| Frame | Album / title | Artist | Copy | Amazon styling | Visual | Status |
|---|---|---|---|---|---|---|

   For video, use timecodes (e.g., 0:03–0:05) in place of frame numbers, one row per super or scene with text. Open the report with the video specs (duration, aspect ratio, version reviewed) and say whether audio/VO was reviewed.

   Use ✅ for pass and ⚠️ for flag; keep notes short.
4. **Shared copy**: if the same copy appears on every frame, list it once and confirm it.
5. **Optional notes**: things that aren't errors but are worth a look (e.g., a judgment call on tone). Keep them clearly separate from fixes.
6. **Sources**: markdown links to the Amazon Music pages used to verify names.

Keep it short. Don't restate passing items at length. If something couldn't be verified (e.g., an album not yet on Amazon Music), say so plainly and mark it ⚠️ "unverified" rather than passing it.
