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
- Claude in Chrome or the built-in browser, signed in to Frame.io (to view Drive images and Frame.io assets)
- Web search (to verify names on Amazon Music)

Video: Claude checks everything on screen (supers, end card, safe zones, flash frames). It can't hear audio, so share the VO script if voiceover or lyrics need QC.

## Updating

Add newly verified artist and album stylings to `skills/content-qc/references/amazon-music-styling.md`, and add team-specific rules to the checklists in that folder.
