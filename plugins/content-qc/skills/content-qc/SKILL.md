---
name: content-qc
description: Opens a QC intake form, then QCs a piece of creative content (Google Drive folder or file link, Frame.io review link, uploaded video or still, PDF, or pasted copy) before it goes to client. Checks Spanish/English grammar and accents, verifies album, artist, and track names against Amazon Music's exact styling, and runs visual/brand checks. Use when someone says "QC this", "proof this", "check this link/folder", "make sure the album names are right", "review these frames", or shares a Drive or Frame.io link, video, or still and asks for a check.
---

# Content QC

Review every frame/asset in the deliverable and return a clear pass/flag report. Be exhaustive: read every word on every asset. Never mark something correct without checking it.

## 0. Intake form

Always start with the intake form, before any other tool call, unless the request already answers every question below. Show it with the AskUserQuestion tool, as one call with these four questions. Skip any question the request already answers, but never skip the whole form just because a link was included.

1. **What are we QCing?** (header "Asset", single select)
   - Drive folder or file: "Paste the link in the box below or in your next message"
   - Frame.io link: "Review link or single asset"
   - Uploaded file: "A video or still attached to this chat"
   - Copy only: "Pasted text, no visuals"
2. **What's the format?** (header "Format", single select)
   - Static frames / carousel
   - Video
   - Mixed (stills + video)
3. **Which checks?** (header "Checks", multi-select)
   - All of the above (Recommended): "Copy, Amazon Music styling, visual/brand, plus video technical for video"
   - Copy & grammar: "Spanish/English spelling, accents, punctuation, consistency"
   - Amazon Music styling: "Album, artist, and track names match Amazon Music exactly"
   - Visual & brand: "Logo, layout, artwork, cropping, file naming (and video technical for video)"
4. **Anything else I should know?** (header "Context", single select)
   - Nothing extra
   - VO script / lyrics attached: "I'll check captions and VO copy against it"
   - Specific notes: "Type them in the box (e.g., client feedback to verify, focus areas)"
   - Re-check of a fixed round: "Type the previous round's issues so I confirm they're fixed"

**If the form is skipped or left blank** (the user dismisses it, skips questions, or just drops a link), don't ask again. Use the defaults and start right away:
- Asset: work it out from the link or file (drive.google.com → Drive, f.io / frame.io → Frame.io, an attachment → uploaded file, plain text → copy only).
- Format: work it out from the files themselves (image types → static, video types → video, both → mixed).
- Checks: all of the above, including video technical for any video.
- Context: nothing extra. If the asset has VO or lyrics and no script was given, say in the report that audio wasn't reviewed. Don't stop to ask.
Mention the defaults used in one line at the top of the report (e.g., "Ran full QC on 8 static frames from Drive").

After the form:
- If no link or file has been provided yet, ask in one short line: "Paste the link (or attach the file) and I'll start." Then wait.
- Run only the checks selected. If "Re-check" was chosen, verify each listed issue first and report them at the top as Fixed / Still open.
- If "VO script / lyrics" was chosen but no script is in the chat, ask for it before reporting.

## 1. Collect the assets

Accept any of: a Google Drive folder or file link, a Frame.io link (review link or single asset), a video or still uploaded to chat, or pasted copy.

Read `references/asset-intake.md` and follow the route for the input type. It covers Drive folders (with pagination), Drive images, Frame.io stills and video (driving the player from the browser), video files (frame extraction with the bundled script), and uploads.

Before checking anything, confirm the full asset list and count. For video, confirm the duration and that every cut, super, and the end card has been captured.

## 2. Transcribe the copy

For every asset, write down every piece of on-screen text exactly as shown: headlines, body copy, album titles, artist names, track names, CTAs, legal text. Keep capitalization, accents, and punctuation exactly as they appear. This transcription is what all later checks run against.

## 3. Run the checks

Run the checks selected in the intake form (default: all). "All of the above" means every check, plus video technical for any video. Detailed rules are in the reference files; read them before checking.

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
