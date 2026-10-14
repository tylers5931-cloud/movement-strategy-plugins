#!/usr/bin/env python3
"""Pull review stills out of a video for QC.

Usage: python3 extract_frames.py <video> <out_dir> [--interval 1.0] [--scene 0.3]

Writes:
  out_dir/scene_XXXX_<t>s.jpg  - a still at every cut/scene change
  out_dir/int_XXXX_<t>s.jpg    - a still every --interval seconds
  out_dir/contact_sheet.jpg    - grid of interval stills with timestamps
Prints duration, resolution, aspect ratio, fps, audio presence.
"""
import argparse, json, os, subprocess, sys

def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True)

def probe(path):
    r = run(["ffprobe", "-v", "error", "-print_format", "json", "-show_streams", "-show_format", path])
    if r.returncode != 0:
        sys.exit(f"ffprobe failed: {r.stderr.strip()}")
    return json.loads(r.stdout)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("video"); ap.add_argument("out_dir")
    ap.add_argument("--interval", type=float, default=1.0)
    ap.add_argument("--scene", type=float, default=0.3)
    a = ap.parse_args()
    os.makedirs(a.out_dir, exist_ok=True)

    info = probe(a.video)
    v = next((s for s in info["streams"] if s["codec_type"] == "video"), None)
    if not v:
        sys.exit("No video stream found.")
    has_audio = any(s["codec_type"] == "audio" for s in info["streams"])
    dur = float(info["format"].get("duration", 0))
    w, h = int(v["width"]), int(v["height"])
    num, den = (v.get("avg_frame_rate", "0/1").split("/") + ["1"])[:2]
    fps = float(num) / float(den) if float(den) else 0
    from math import gcd
    g = gcd(w, h)
    print(f"duration={dur:.2f}s resolution={w}x{h} aspect={w//g}:{h//g} fps={fps:.2f} audio={'yes' if has_audio else 'no'}")

    # Interval stills
    t, i = 0.0, 0
    while t < dur:
        out = os.path.join(a.out_dir, f"int_{i:04d}_{t:06.2f}s.jpg")
        run(["ffmpeg", "-v", "error", "-y", "-ss", f"{t:.3f}", "-i", a.video, "-frames:v", "1", "-q:v", "3", out])
        t += a.interval; i += 1
    # Always grab the last frame (end card)
    last = max(dur - 0.05, 0)
    run(["ffmpeg", "-v", "error", "-y", "-ss", f"{last:.3f}", "-i", a.video, "-frames:v", "1", "-q:v", "3",
         os.path.join(a.out_dir, f"int_{i:04d}_{last:06.2f}s_END.jpg")])

    # Scene-change stills
    r = run(["ffmpeg", "-v", "info", "-i", a.video, "-vf", f"select='gt(scene,{a.scene})',showinfo", "-vsync", "vfr",
             "-q:v", "3", os.path.join(a.out_dir, "scene_%04d.jpg")])
    times = [float(l.split("pts_time:")[1].split()[0]) for l in r.stderr.splitlines() if "pts_time:" in l]
    for n, ts in enumerate(times, 1):
        src = os.path.join(a.out_dir, f"scene_{n:04d}.jpg")
        if os.path.exists(src):
            os.rename(src, os.path.join(a.out_dir, f"scene_{n:04d}_{ts:06.2f}s.jpg"))
    print(f"interval_stills={i+1} scene_changes={len(times)} at: " + ", ".join(f"{x:.2f}s" for x in times))

    # Contact sheet of interval stills
    cols = 4
    tile_w = 480
    tile_h = int(tile_w * h / w)
    rows = (i + 1 + cols - 1) // cols
    run(["ffmpeg", "-v", "error", "-y", "-pattern_type", "glob", "-i", os.path.join(a.out_dir, "int_*.jpg"),
         "-vf", f"scale={tile_w}:{tile_h},tile={cols}x{rows}:padding=6:color=white", "-frames:v", "1",
         os.path.join(a.out_dir, "contact_sheet.jpg")])
    print(f"contact_sheet={os.path.join(a.out_dir, 'contact_sheet.jpg')}")

if __name__ == "__main__":
    main()
