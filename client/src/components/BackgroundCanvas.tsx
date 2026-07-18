import { useEffect, useRef } from "react";

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    let animId: number;

    function resize() {
      W = canvas!.width = window.innerWidth;
      H = canvas!.height = document.documentElement.scrollHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // ── PARTICLES ──────────────────────────────────────────
    const PARTICLE_COUNT = 100;

    interface Particle {
      x: number; y: number; z: number;
      r: number; speed: number; opacity: number; color: string;
    }

    function makeParticle(init = false): Particle {
      const z = Math.random() * 0.8 + 0.1;
      return {
        x: Math.random() * W,
        y: init ? Math.random() * H : H + 10,
        z,
        r: z * 2.2,
        speed: z * 0.35 + 0.08,
        opacity: z * 0.55 + 0.08,
        color: Math.random() > 0.5 ? "96,165,250" : "56,189,248",
      };
    }

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => makeParticle(true));

    // ── PERSPECTIVE GRID ────────────────────────────────────
    function drawGrid(t: number) {
      const vx = W / 2;
      const vy = H * 0.38;
      const cols = 14;
      const rows = 18;
      const offset = (t * 0.00016) % (1 / rows);

      // Vertical lines
      for (let i = 0; i <= cols; i++) {
        const bx = (i / cols) * W;
        const alpha = 0.055 + 0.035 * Math.sin((i / cols) * Math.PI);
        ctx!.beginPath();
        ctx!.moveTo(vx, vy);
        ctx!.lineTo(bx, H);
        ctx!.strokeStyle = `rgba(56,189,248,${alpha})`;
        ctx!.lineWidth = 0.6;
        ctx!.stroke();
      }

      // Horizontal lines
      for (let j = 0; j <= rows; j++) {
        const tv = ((j / rows) + offset) % 1;
        const y = vy + (H - vy) * tv;
        const xLeft = vx - vx * tv;
        const xRight = vx + (W - vx) * tv;
        const alpha = tv * 0.10;
        ctx!.beginPath();
        ctx!.moveTo(xLeft, y);
        ctx!.lineTo(xRight, y);
        ctx!.strokeStyle = `rgba(56,189,248,${alpha})`;
        ctx!.lineWidth = 0.5;
        ctx!.stroke();
      }

      // Glow at vanishing point
      const grd = ctx!.createRadialGradient(vx, vy, 0, vx, vy, 220);
      grd.addColorStop(0, "rgba(96,165,250,0.10)");
      grd.addColorStop(1, "rgba(96,165,250,0)");
      ctx!.fillStyle = grd;
      ctx!.beginPath();
      ctx!.arc(vx, vy, 220, 0, Math.PI * 2);
      ctx!.fill();
    }

    // ── CONNECTIONS ─────────────────────────────────────────
    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.07;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = `rgba(96,165,250,${alpha})`;
            ctx!.lineWidth = 0.4;
            ctx!.stroke();
          }
        }
      }
    }

    // ── RENDER LOOP ─────────────────────────────────────────
    let t = 0;
    function render() {
      t++;

      // Sync canvas height to page height
      const pageH = document.documentElement.scrollHeight;
      if (canvas!.height !== pageH) {
        canvas!.height = pageH;
        H = pageH;
      }

      ctx!.clearRect(0, 0, W, H);

      // Background gradient
      const bg = ctx!.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, "#080c14");
      bg.addColorStop(0.5, "#090e18");
      bg.addColorStop(1, "#07111a");
      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, W, H);

      drawGrid(t);
      drawConnections();

      for (const p of particles) {
        p.y -= p.speed;
        if (p.y < -10) {
          const np = makeParticle(false);
          Object.assign(p, np);
        }
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${p.color},${p.opacity})`;
        ctx!.fill();
      }

      animId = requestAnimationFrame(render);
    }
    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
