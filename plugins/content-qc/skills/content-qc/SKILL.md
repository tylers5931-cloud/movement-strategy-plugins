---
name: content-qc
description: Opens a QC intake form, then QCs a piece of creative content (Google Drive folder or file link, Frame.io review link, uploaded video or still, PDF, or pasted copy) before it goes to client. Checks Spanish/English grammar and accents, verifies album, artist, and track names against Amazon Music's exact styling, and runs visual/brand checks. Use when someone says "QC this", "proof this", "check this link/folder", "make sure the album names are right", "review these frames", or shares a Drive or Frame.io link, video, or still and asks for a check.
---

# Content QC

Review every frame/asset in the deliverable and return a clear pass/flag report. Be exhaustive: read every word on every asset. Never mark something correct without checking it.

## 0. Intake form

Show the intake form only when the request has no link, file, or pasted copy. If the user already dropped a link or file, skip the form entirely and run the full QC with the defaults below. When you do show it, use the AskUserQuestion tool, as one call with these four questions.

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
   - Copy & grammar: "Spanish/English spelling, accents, punctuation, album italics / song quotes"
   - Amazon Music styling: "Album, artist, and track names match Amazon Music exactly"
   - Visual & brand: "Logo, layout, artwork, cropping, file naming (and video technical for video)"
4. **Anything else I should know?** (header "Context", single select)
   - Nothing extra
   - VO script / lyrics attached: "I'll check captions and VO copy against it"
   - Specific notes: "Type them in the box (e.g., client feedback to verify, focus areas)"
   - Re-check of a fixed round: "Type the previous round's issues so I confirm they're fixed"

**Defaults** (used when a link or file was dropped, or the form is skipped or left blank). Don't ask anything; start right away:
- Asset: work it out from the link or file (drive.google.com → Drive, f.io / frame.io → Frame.io, an attachment → uploaded file, plain text → copy only).
- Format: work it out from the files themselves (image types → static, video types → video, both → mixed).
- Checks: all of the above, including video technical for any video.
- Context: nothing extra. If the asset has VO or lyrics and no script was given, say in the report that audio wasn't reviewed. Don't stop to ask.

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

1. **Copy & grammar (Spanish and English).** See `references/copy-checklist.md`. Spelling, accents/tildes, ¿¡ marks, agreement, verb tense, punctuation, consistency of repeated copy across frames, and **music title formatting**: album titles in *italics*, song titles in "quotation marks" (see the checklist for where this does and doesn't apply).
2. **Amazon Music name styling.** See `references/amazon-music-styling.md`. The team mirrors exactly how Amazon Music displays album, artist, and track names (caps, lowercase, symbols, punctuation, accents). Verify **every** album and **every** artist name against Amazon Music, including names that look obviously right. Artist styling is checked separately from album styling (e.g., Amazon lists "KAROL G" in all caps).
3. **Visual & brand.** See `references/visual-brand-checklist.md`. Logo, layout consistency across frames, artwork matches the named album, text cropping/overlap, file naming.

## 4. Report back

Keep it short enough to read in 30 seconds. Errors only.

**If there are errors:**

**X issues to fix · [count] [format], [round]** (e.g., "4 issues to fix · 5 static frames, R01")

1. **Frame 03:** wrong → right
2. **Frames 03–05:** wrong → right

Rules:
- One line per issue, in the form "wrong → right". Group an error that repeats across frames into one line.
- No explanations, unless the fix is a name change from Amazon Music (then add "per Amazon Music" and nothing more).
- No sources list, no tables, no list of what passed, no tips or style suggestions. Check every name anyway.
- Only if something couldn't be checked, add one final line: "Couldn't verify: …".
- For a re-check, add one line above the issues: "Last round: 3 fixed, 1 still open (Frame 02)".

**If there are no errors**, reply with one line: "No issues · 5 static frames, R01. Ready to send."
