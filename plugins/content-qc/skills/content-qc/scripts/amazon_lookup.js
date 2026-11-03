// Amazon Music name lookup — no sign-in needed.
// The music.amazon.com web player hides SEARCH results unless signed in, but:
//   1. the amazon.com Digital Music store search is public, and
//   2. album/track pages (amazon.com/dp/<ASIN>, music.amazon.com/albums|tracks/<ASIN>)
//      render Amazon Music's own header and track list without sign-in.
// Together they show exactly what's on the Amazon Music platform.
//
// Paste this whole file into javascript_tool after each navigate. It detects the page type.
//   Search page  (https://www.amazon.com/s?k=<artist>+<title>&i=digital-music)
//     -> top 6 rows as "TITLE | by ARTIST | link". Titles here match Amazon Music, but the
//        store's "by" line does NOT (it shows "Karol G", only the primary artist, or nothing).
//        Always open the matching row's link to check artist styling and order.
//   Album/track page (open a row's link; wait 3s first — the player renders late)
//     -> "HEADER: <album> | <artist>" plus every track row as "TRACK | ARTISTS"
// If navigate is refused for amazon.com, call request_access {url:"https://amazon.com", scope:"site"} once.
(() => {
  const val = (el, prop, attr) => (el && (el[prop] || el.getAttribute(attr))) || '';
  const headers = [...document.querySelectorAll('music-detail-header')]
    .map(h => [val(h, 'headline', 'headline'), val(h, 'primaryText', 'primary-text')])
    .filter(h => h[0]);
  if (headers.length) {
    const tracks = [...document.querySelectorAll('music-image-row, music-text-row')].map(r =>
      [val(r, 'primaryText', 'primary-text'),
       val(r, 'secondaryText1', 'secondary-text-1') || val(r, 'secondaryText2', 'secondary-text-2')]
        .filter(Boolean).join(' | ')).filter(Boolean);
    return [`HEADER: ${headers[0].join(' | ')}`, ...tracks.slice(0, 40)];
  }
  const rows = [...document.querySelectorAll('[data-component-type="s-search-result"]')].slice(0, 6);
  if (rows.length) {
    return rows.map(r => {
      const title = ((r.querySelector('h2') || {}).innerText || '').trim();
      const by = [...r.querySelectorAll('.a-row, .a-size-base')]
        .map(e => e.innerText.trim()).find(s => /^by\s/i.test(s)) || '(artist on product page)';
      const a = r.querySelector('h2 a, a.a-link-normal[href*="/dp/"]');
      return `${title} | ${by} | link: ${a ? a.href.split('/ref=')[0].split('?')[0] : ''}`;
    });
  }
  const t = document.body.innerText;
  if (/captcha|robot|Enter the characters/i.test(t)) return 'BLOCKED: robot check. Do not solve it; use a music.amazon.com/tracks/<id> link from WebSearch instead.';
  if (/music\.amazon/.test(location.host) || /dp\//.test(location.pathname)) return 'NOT RENDERED YET: wait 3s and run again.';
  return 'NO RESULTS: retry once with the title only.';
})();
