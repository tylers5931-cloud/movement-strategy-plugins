# Asset Intake: Getting Eyes on Every Asset

Pick the route that matches what was shared. Whatever the route, end up with a clear, readable view of every still, and for video, of every distinct on-screen moment (each cut, each super, the end card).

## Google Drive folder link

1. Folder ID = the string after `/folders/`. Account index = the `N` in `/u/N/`, if present.
2. `search_files` with `parentId = '<folderId>'`, `excludeContentSnippets: true`, `pageSize: 100`. **Follow `nextPageToken` until none is returned.**
3. Ask before including subfolders unless the request makes it obvious.
4. Sort by frame number from the file name. Confirm the count and flag gaps.
5. Route each file by type below.

## Google Drive file link

File ID = the string after `/file/d/`. Use `get_file_metadata` to get the type and name, then route it by type.

- **Docs / Slides / Sheets / PDF**: `read_file_content`.
- **Image (JPG/PNG)**: `read_file_content` returns no text and `download_file_content` returns huge base64, so use neither. Open `https://drive.google.com/file/d/<id>/view?authuser=<N>` in the browser, screenshot once to find the image area, then `zoom` on it. Batch several files per browser batch (navigate → wait 2s → zoom).
- **Video**: Drive's player sits in an iframe and is hard to control. Ask the user to either (a) upload the video file to the chat, or (b) connect the folder on their computer that holds it, then use the **video file** route. If neither is possible, play it in the Drive viewer, pause, and screenshot at intervals by clicking along the timeline.

## Frame.io link

Links look like `f.io/...`, `next.frame.io/...`, `app.frame.io/...`, or `*.frame.io/reviews/...`. There's no Frame.io connector; use the browser, where the user is signed in to Frame.io.

1. Open the link in a new tab, wait for it to load, and take a screenshot. If it's a sign-in page or a password-protected review link, ask the user to sign in or share the password; never enter credentials yourself.
2. **Review link with multiple assets**: use `get_page_text` / `find` to list every asset name. Open each one in turn, and confirm the count.
3. **Still image**: screenshot, then `zoom` on the image area at full resolution. Use the viewer's zoom/fit control if text is small.
4. **Video**: control the player with `javascript_tool`:
   - Read the length: `const v=document.querySelector('video'); v.pause(); v.duration`
   - Jump to a time: `const v=document.querySelector('video'); v.pause(); v.currentTime=<seconds>;`
   - After each jump, wait about 1s, then `zoom` on the player area.
   - Step through every 1s (every 0.5s for fast-cut edits), plus the first frame and the last 0.1s (end card). When a super appears or changes between two checks, step back to capture it fully readable.
   - If `document.querySelector('video')` returns null, the player may be in an iframe. Fall back to pausing and clicking along the timeline scrubber, or the frame-step keys, taking a screenshot each time.
5. **Existing comments**: if the review has comments, read them (`get_page_text`). If an unresolved comment points to a problem still visible in the asset, include it as an error. Don't post, resolve, or approve anything in Frame.io unless the user explicitly asks.
6. Note the version shown (e.g., V2, V3) so the report says which version was reviewed.

## Video file (uploaded, or staged from the user's computer)

Run the bundled script:

```
python3 ${CLAUDE_PLUGIN_ROOT}/skills/content-qc/scripts/extract_frames.py <video> <out_dir> --interval 1
```

Use `--interval 0.5` for fast-cut edits. It prints duration, resolution, aspect ratio, fps, and whether there's audio. It also writes a still every interval, a still at every scene change, the end card, and a `contact_sheet.jpg`.

1. Read the contact sheet first for an overview.
2. Then read every `scene_*` still plus any interval still where text appears, at full size, to check the copy.
3. If ffmpeg isn't available, install it, or ask the user for a Frame.io or Drive link instead.

**Audio / VO / lyrics**: Claude can't hear the audio. If voiceover, sung lyrics, or audio-only callouts need QC, ask for the script or VO copy and check that text. Say in the report that audio wasn't reviewed.

## Still uploaded to chat

Read it directly. If it's large and the text is small, crop or zoom: use Python/PIL to crop regions to full size, then Read each crop.

## Pasted copy only

Run copy and Amazon styling checks only. Mark the visual checks "not reviewed (no asset)".
