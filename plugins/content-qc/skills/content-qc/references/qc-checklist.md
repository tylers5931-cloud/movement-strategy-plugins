# Content QC Checklist

Read this file once per run. It covers intake routes and every check.

## 1. Intake routes

- **Drive folder:** `search_files` with parentId=<id>, pageSize 100, excludeContentSnippets, and follow `nextPageToken`. Sort by frame number and flag gaps. Ask before including subfolders.
- **Drive file:** `get_file_metadata`. For Docs, Slides, Sheets or PDF, use `read_file_content`. For an image, call `download_file_content` for every image in one parallel turn (no browser sign-in needed). Each result is too big to return, so it's saved as a JSON file; decode all of them in one Bash call (`json.load(f)['content']` → base64 decode → write `title`), then Read each PNG. Only if that fails, open `drive.google.com/file/d/<id>/view` in a signed-in browser and zoom. For a video, ask for an upload or a connected folder, then use the video file route.
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

**Every name gets compared to the Amazon Music platform. "Couldn't verify" is not an option for a released track.**

1. **WebSearch, all names in one parallel batch:** `<artist> <title> amazon music`, allowed_domains music.amazon.com and amazon.com. A name is settled only by a result titled "<Track> song by <ARTISTS> from <ALBUM> on Amazon Music" or "Play <Title> by <ARTISTS> on Amazon Music". Anything else (artist page only, user playlists, covers) is not settled.
2. **Platform check for every unsettled name, no sign-in needed.** Never use `music.amazon.com/search` (it hides results unless signed in). Instead use `scripts/amazon_lookup.js` in the browser:
   - Batch A (search, up to 12 names per `browser_batch`): navigate `https://www.amazon.com/s?k=<artist>+<title>&i=digital-music` → `javascript_tool` with the script. If amazon.com is refused, call `request_access` {url "https://amazon.com", scope "site"} once.
   - Batch B (detail pages, up to 8 per batch): for the matching row, navigate its `link` → wait 3s → script. The `HEADER` line and track rows are Amazon Music's own styling. **Take artist styling and order only from here**, never from the search page's "by" line.
   - Skip karaoke, 8-bit, cover, "Originally Performed by" and remix rows unless the creative names that version.
3. Compare title and every artist character for character. Report fixes as "per Amazon Music".
- Only genuinely unreleased titles (not on the store or a detail page after steps 1–2) go under Couldn't verify, marked "not on Amazon Music yet". A robot check is never solved; use a music.amazon.com/tracks/<id> link from step 1 for that name instead.

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
| Luis Fonsi & Daddy Yankee | Despacito (Fonsi first) |
| Rels B | TU VAS SIN (fav) |
| Becky G & KAROL G | MAMIII |
| Anuel AA | Las mas bonitas son p#tas (no accent) |
| FEID, Divino & Baby Ranks | SE PUSO FEO |
| Maria Becerra (no accent) | J Balvin & Maria Becerra: Qué Más Pues? |
| Eslabon Armado & Peso Pluma | Ella Baila Sola |

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
