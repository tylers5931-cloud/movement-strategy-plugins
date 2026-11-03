// Frame.io video grid: paste once into javascript_tool after resize_window 1080x1920.
// Then each grid is ONE browser_batch: [javascript_tool `await qcGrid([...6 times])`, computer zoom [0,0,800,980]].
// qcGrid(ts)            -> 6 full frames in a 3x2 grid, timestamps in yellow
// qcGrid(ts, y, h)      -> only the band y..y+h of each frame (captions/cards), stacked full-width for reading
// qcDone()              -> removes the overlay (then resize_window preset "desktop")
(() => {
  const v = [...document.querySelectorAll('video')].sort((a, b) => b.videoWidth - a.videoWidth)[0];
  if (!v) return 'No <video> found (player may be in an iframe): fall back to timeline screenshots.';
  v.pause();
  const W = v.videoWidth, H = v.videoHeight;
  let c = document.getElementById('qcCanvas');
  if (!c) {
    c = document.createElement('canvas');
    c.id = 'qcCanvas'; c.width = 1080; c.height = 1920;
    Object.assign(c.style, { position: 'fixed', left: 0, top: 0, width: '1080px', height: '1920px', zIndex: 2147483647, background: '#000' });
    document.body.appendChild(c);
  }
  const x = c.getContext('2d');
  const seek = t => new Promise(r => { v.addEventListener('seeked', () => setTimeout(r, 200), { once: true }); v.currentTime = Math.min(t, v.duration - 0.02); });
  const label = (t, px, py) => { x.fillStyle = '#ff0'; x.font = '24px sans-serif'; x.fillText(t.toFixed(2) + 's', px, py); };
  window.qcGrid = async (ts, y, h) => {
    x.fillStyle = '#111'; x.fillRect(0, 0, 1080, 1920);
    if (y === undefined) {                       // full-frame grid, up to 6
      for (const [i, t] of ts.slice(0, 6).entries()) {
        await seek(t);
        const cx = (i % 3) * 360, cy = Math.floor(i / 3) * 660;
        x.drawImage(v, cx, cy, 360, 640);
        label(t, cx + 4, cy + 658);
      }
    } else {                                      // text bands, stacked
      const rowH = Math.floor(1920 / ts.length);
      for (const [i, t] of ts.entries()) {
        await seek(t);
        x.drawImage(v, 0, y * H / 1920, W, h * H / 1920, 110, i * rowH, 970, rowH - 4);
        label(t, 4, i * rowH + rowH / 2);
      }
    }
    return ts.length + ' frames';
  };
  window.qcDone = () => { document.getElementById('qcCanvas')?.remove(); return 'overlay removed'; };
  return { duration: +v.duration.toFixed(2), width: W, height: H };
})();
