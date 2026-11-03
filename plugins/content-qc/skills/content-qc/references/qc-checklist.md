# Content QC Checklist

Read this file once per run. It covers intake routes and every check.

## 1. Intake routes

- **Drive folder:** `search_files` with parentId=<id>, pageSize 100, excludeContentSnippets, and follow `nextPageToken`. Sort by frame number and flag gaps. Ask before including subfolders.
- **Drive file:** `get_file_metadata`. For Docs, Slides, Sheets or PDF, use `read_file_content`. For an image, open `drive.google.com/file/d/<id>/view` in the browser and zoom; batch several files per `browser_batch` (navigate → wait 2s → zoom). For a video, ask for an upload or a connected folder, then use the video file route.
- **Frame.io** (f.io, next.frame.io, app.frame.io): open the link. If you hit a sign-in or password page, ask the user and never enter credentials. `get_page_text` lists the assets, version and comment count. The `-Archive` folder holds older rounds, so skip it unless asked.
  - Still: zoom on the image.
  - Video: open the asset, `resize_window` 1080x1920, paste `scripts/frameio_grid.js` into `javascript_tool`, then run **one `browser_batch` per grid**: `await qcGrid([6 times])` followed by `zoom [0,0,800,980]`. Cover every 1s, plus the last 0.1s. Where captions or cards change, use `qcGrid(times, y, h)` on just that band (about 14 timestamps per call) to read the text. Finish with `qcDone()` and `resize_window` preset "desktop".
  - Unresolved comments that still apply count as errors. Don't post, resolve or approve anything.
- **Video file:** `python3 scripts/extract_frames.py <video> <out> --interval 1` (0.5 for fast cuts). Read the contact sheet, then the scene stills that have text.
- **Still uploaded:** read it directly. If the text is small, crop with PIL.
- **Pasted copy:** run copy + Amazon checks only. Visuals are not reviewed.
- **Audio** can't be heard. Check VO or lyrics only against a provided script; otherwise add "audio not reviewed" under Couldn't verify.

## 2. Copy & grammar (ES + EN)

- **Spanish:** accents (más/mas, tú/tu, él/el, sí/si, qué/cómo/cuándo in questions, álbum, canción, música, corazón), ¿? and ¡!, ñ, gender/number agreement, the same verb person across the set, no capitalized days/months/languages mid-sentence. Watch the mix-ups haber/a ver, hay/ahí/ay, echo/hecho, porque/por qué, a/ha, haya/halla, sino/si no. Flag slang that's off for the target market.
- **English:** its/it's, your/you're, their/there, agreement, tense, apostrophes, consistent title case.
- **Both:** repeated copy (headlines, CTAs, supers) must match character for character. Check for double spaces and stray punctuation, and write "Amazon Music" exactly that way.
- **Every name, letter by letter:** artist, album, track, playlist. Name typos are the easiest miss.
- **Titles:** *albums and playlists in italics*, "songs in quotes", artists plain. Use one quote style across the set. In English, commas and periods go inside the quotes; in Spanish, outside. This doesn't apply to UI-style cards (now-playing, album tiles) or plain-text captions; for those captions, note once under Couldn't verify.

## 3. Amazon Music styling

Match Amazon's display exactly: caps, lowercase, symbols, punctuation, accents, spacing. Check artist styling separately. Ignore [Explicit]/[Clean]; flag edition tags only if the creative clearly means a different edition.

- **Run all searches in one parallel batch:** WebSearch `<artist> <title> amazon music` with allowed_domains music.amazon.com and amazon.com. The best evidence is a result titled "<Track> song by <ARTIST> from <ALBUM> on Amazon Music", or "<ARTIST> on Amazon Music Unlimited" for artists.
- Don't run a second search round. For names search doesn't settle, do **one web-player check**: a single `browser_batch` with, per name, navigate `https://music.amazon.com/search/<artist> <title>` → wait 3s → `get_page_text`. Match the track row's title and artist exactly.
  - If it shows a sign-in page or doesn't load, stop and list the names under Couldn't verify (add "sign in to Amazon Music in the browser"). Never enter credentials or retry.
  - Anything still unclear after this one pass goes under Couldn't verify.
- If something is unreleased, fall back to the label announcement and mark it "unverified on Amazon".

**Known stylings** (re-verify; add confirmed ones after each run):

| Artist | Album / track / playlist |
|---|---|
| TINI | un mechón de pelo |
| Bad Bunny | Un Verano Sin Ti |
| Junior H | $AD BOYZ 4 LIFE II |
| KAROL G | NO ME ARREPIENTO DE SENTIR TANTO · Tropicoqueta |
| Mariangela | Sensible |
| Luis Miguel | Romance |
| Becky G | BARAJA BENDITA |
| Young Miko | Do Not Disturb: Late Checkout |
| Grupo Frontera & Bad Bunny | un x100to |
| Maluma | Hawái |
| Manuel Turizo | La Bachata |
| Shakira & Maluma | Clandestino |
| (playlist) | Written By Edgar Barrera |

## 4. Visual & brand

- **Per asset:**
  - The cover matches the named title (right edition, not the wrong single).
  - The Amazon Music logo has the same position and size everywhere, and isn't distorted, cropped or recolored.
  - No text is cut off, overlapping, or outside safe margins, and no orphan lines.
  - Shared elements (cards, labels, arrows, supers) keep the same position, size, font and color.
  - No pixelation or stretching. Flag a Parental Advisory label on clean placements.
- **Set:**
  - No missing or duplicate frames.
  - The ratio matches the file name and platform.
  - No unintended duplicate artists or albums.
  - File names follow `JOB_PLATFORM_Campaign_Artist_Ratio_Region_RxxVxx` (or `..._FrameNN_..._RxxVxx`), with fields consistent across the set and no stray spaces or characters.
- **Video:**
  - Supers stay up at least 1.5s (about 1s per 3–4 words).
  - 9x16 safe zones: clear of the top 14%, the bottom 20%, and the right edge.
  - No accidental black or flash frames, frozen frames, or leftover timecode or watermarks.
  - The end card has the logo and CTA, is held long enough to read, and the last frame isn't black.
  - Burned-in captions match the script.
