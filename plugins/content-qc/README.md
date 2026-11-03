# Content QC

QC creative deliverables before they go to the client.

## How to use

Share a Google Drive folder or file link, a Frame.io link, or upload a video or still, and say something like:

- "QC this folder: <link>"
- "Proof these frames and check the album names"
- "QC this Frame.io cut: <link>"

Claude reviews every asset and checks:

1. **Copy and grammar** in Spanish and English: accents, ¿¡, agreement, consistency across frames, album titles in italics and song titles in quotes
2. **Amazon Music styling**: every album, artist, and track name must match exactly how it appears on Amazon Music (caps, symbols, punctuation)
3. **Visual and brand**: Amazon Music logo, layout consistency, artwork matches the album, cropping, file naming

You get a short list of errors only (frame, what's wrong, the fix), or a one-line all-clear.

## Requirements

- Google Drive connector (to read folders and files)
- Claude in Chrome or the built-in browser (Frame.io assets need a Frame.io sign-in; the Amazon Music check needs no sign-in, just amazon.com allowed once)
- Web search (first pass on Amazon Music names)

Video: Claude checks everything on screen (supers, end card, safe zones, flash frames). It can't hear audio, so share the VO script if voiceover or lyrics need QC.

## Updating

All rules live in one file: `skills/content-qc/references/qc-checklist.md`. Add newly verified stylings to its Known stylings table and team rules to the matching section. Keep it short: every line is re-read on every step of a QC run.

## Changelog

- **0.9.0**: Every name is now checked against the Amazon Music platform with no sign-in: `scripts/amazon_lookup.js` reads the public amazon.com Digital Music search, then the album/track page (Amazon Music's own title and artist styling). Released titles can no longer land under "Couldn't verify". Drive images now download through the Drive connector instead of a signed-in browser. Added 7 known stylings.
- **0.8.0**: Names that web search can't settle now get one Amazon Music web-player check (a single batched pass, stops at a sign-in page). Dropped the second search round.
- **0.7.0**: Merged the four reference files into one `qc-checklist.md` (about half the length). Added step-saving rules: load tools once, skip Chrome if it doesn't connect, batch browser actions, run Amazon searches in one pass, don't open the Amazon web player. Added `scripts/frameio_grid.js` for capturing Frame.io video in 6-frame grids. New checks: name typos letter by letter, stray spaces in file names.
