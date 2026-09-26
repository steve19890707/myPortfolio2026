import { useEffect, useRef } from 'react';
import { useRoom } from '../store';

type Signal = { x: number; y: number; w: number; h: number; color: string };

export default function CityBackdrop() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useRoom(state => state.reducedMotion);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;
    const base = document.createElement('canvas');
    const art = base.getContext('2d');
    if (!art) return;
    let signals: Signal[] = [];
    let timer = 0;
    let visible = true;
    let last = 0;
    let time = 0;
    let width = 0;
    let height = 0;
    const rect = (x: number, y: number, w: number, h: number, color: string) => {
      art.fillStyle = color;
      art.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
    };

    function paint() {
      if (!ctx) return;
      ctx.drawImage(base, 0, 0);
      signals.forEach((s, i) => {
        ctx.globalAlpha = 0.45 + 0.25 * Math.sin(time / (650 + i * 23) + i * 1.8);
        ctx.fillStyle = s.color;
        ctx.fillRect(s.x, s.y, s.w, s.h);
      });
      ctx.globalAlpha = 1;
    }

    function build() {
      if (!canvas || !art) return;
      const bounds = canvas.getBoundingClientRect();
      // A bounded pixel grid keeps the background crisp and inexpensive on retina screens.
      width = Math.max(160, Math.min(900, Math.round(bounds.width / 2)));
      height = Math.max(200, Math.round(bounds.height / bounds.width * width));
      canvas.width = base.width = width;
      canvas.height = base.height = height;
      signals = [];
      let seed = 2026;
      const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
      rect(0, 0, width, height, '#1a0f23');
      const horizon = height - 36;
      const skylineHeight = Math.min(height * 0.8, width < 300 ? 290 : 350);
      for (let layer = 0; layer < 3; layer++) {
        let x = -15;
        while (x < width) {
          const w = Math.floor(22 + random() * (layer === 0 ? 40 : 28));
          const h = Math.floor(skylineHeight * (0.25 + random() * 0.7) * (1 - layer * 0.18));
          const y = horizon - h + layer * 8;
          const colors = ['#302047', '#251735', '#130f24'];
          rect(x, y, w, h, colors[layer]);
          rect(x + 2, y, 1, h, layer === 0 ? '#483064' : '#392447');
          rect(x + w / 2, y - 10, 1, 10, '#483855');
          rect(x + w / 2, y - 11, 1, 1, '#b66b9a');
          if (random() > 0.5) rect(x + 4, y - 4, w - 8, 4, colors[layer]);
          for (let wy = y + 7; wy < horizon - 2; wy += 7) {
            for (let wx = x + 4; wx < x + w - 3; wx += 6) {
              if (random() > 0.48) rect(wx, wy, layer === 0 ? 2 : 3, 2,
                ['#435270', '#477781', '#668b91', '#8c8092', '#baa881'][Math.floor(random() * 5)]);
            }
          }
          if (layer > 0 && random() > 0.35) {
            const sx = Math.round(x + w - 11);
            const sy = Math.round(y + 12);
            const color = ['#ee5386', '#42cabc', '#b96ce3', '#e4ac67'][Math.floor(random() * 4)];
            rect(sx - 2, sy - 2, 10, 29, '#332039');
            rect(sx, sy, 6, 25, color);
            for (let j = 0; j < 4; j++) {
              rect(sx + 1, sy + 3 + j * 5, 4, 1, '#21152c');
              rect(sx + 2 + j % 2, sy + 1 + j * 5, 1, 4, '#21152c');
            }
            signals.push({ x: sx - 1, y: sy, w: 1, h: 25, color });
          }
          if (layer === 1 && random() > 0.55) {
            rect(x + 3, y + 4, w - 6, 2, '#429aab');
            rect(x + 3, y + 9, w - 6, 1, '#429aab');
          }
          x += w + 3 + Math.floor(random() * 8);
        }
      }
      // Street, storefronts, and reflected light anchor the layered skyline.
      rect(0, horizon, width, 36, '#100e1c');
      rect(0, horizon + 2, width, 1, '#51344d');
      for (let x = 5; x < width; x += 33) {
        rect(x, horizon - 8, 24, 8, '#1c2532');
        rect(x, horizon - 9, 24, 1, x % 2 ? '#784766' : '#477b78');
        rect(x + 2, horizon + 9, 15, 1, '#402537');
        rect(x + 7, horizon + 13, 20, 1, '#253842');
        rect(x, horizon + 29, 12, 1, '#65526b');
      }
      paint();
    }

    function tick(now: number) {
      if (now - last >= 1000 / 15) {
        time += last ? Math.min(now - last, 100) : 0;
        last = now;
        paint();
      }
      timer = requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(timer);
      last = 0;
      if (!reducedMotion && visible && !document.hidden) timer = requestAnimationFrame(tick);
      else paint();
    }
    const resize = new ResizeObserver(build);
    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      sync();
    });
    build();
    resize.observe(canvas);
    observer.observe(canvas);
    document.addEventListener('visibilitychange', sync);
    sync();
    return () => {
      cancelAnimationFrame(timer);
      resize.disconnect();
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [reducedMotion]);

  return <div className="city-backdrop" aria-hidden="true"><canvas ref={ref}/></div>;
}
