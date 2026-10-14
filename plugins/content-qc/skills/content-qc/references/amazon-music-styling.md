# Amazon Music Name Styling

The team mirrors exactly how album, artist, and track names appear in the Amazon Music app and website. "Correct spelling" is not enough. The styling must match character for character.

## What has to match

- Capitalization: all caps (BARAJA BENDITA), all lowercase (un mechón de pelo), title case (Un Verano Sin Ti), mixed
- Symbols and stylized characters: $AD BOYZ 4 LIFE II, numerals vs. words, Roman numerals
- Punctuation: colons, periods, ampersands, apostrophes (Do Not Disturb: Late Checkout)
- Accents and tildes: mechón, pulmón, Él vs El
- Spacing and hyphens
- **Artist name styling, checked separately**: Amazon's artist page can differ from common usage (e.g., "KAROL G" in all caps, not "Karol G")

## What to leave out

Amazon appends tags like `[Explicit]`, `[Clean]`, `(Deluxe)`, `(Remastered)` to listings. Ignore `[Explicit]`/`[Clean]`. For edition tags like Deluxe, flag only if the creative clearly refers to a different edition than the one shown.

## How to verify

1. For each album, run WebSearch with `allowed_domains: ["amazon.com", "music.amazon.com"]`, query: `<artist> <album> amazon music`.
2. The best evidence is track result titles, which follow the pattern `"<Track> song by <ARTIST> from <ALBUM> on Amazon Music"`. Read both the artist and album styling from that title.
3. For artist styling, also look for the artist page result (`music.amazon.com/artists/...`), titled `"<ARTIST> on Amazon Music Unlimited"`.
4. If the search results are ambiguous or styling differs between results, open the album or artist page in the browser to confirm.
5. If the album isn't on Amazon Music yet (unreleased or new), say so and fall back to the label's official announcement. Mark the item "unverified on Amazon".
6. Cite every Amazon page used in the report's Sources section.

## Known stylings (verified Oct 2026)

Add to this list as the team confirms more. Always re-verify. This is a shortcut, not the source of truth.

| Artist (Amazon styling) | Album (Amazon styling) |
|---|---|
| TINI | un mechón de pelo |
| Bad Bunny | Un Verano Sin Ti |
| Junior H | $AD BOYZ 4 LIFE II |
| KAROL G | NO ME ARREPIENTO DE SENTIR TANTO |
| Mariangela | Sensible |
| Luis Miguel | Romance |
| Becky G | BARAJA BENDITA |
| Young Miko | Do Not Disturb: Late Checkout |
