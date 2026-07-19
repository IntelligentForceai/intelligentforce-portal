import { useEffect, useRef } from "react";

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    let animId: number;

    function resize() {
      W = canvas!.width = window.innerWidth;
      H = canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // ── PARTICLES ──────────────────────────────────────────
    const PARTICLE_COUNT = 80;

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
        r: z * 2.0,
        speed: z * 0.30 + 0.07,
        opacity: z * 0.55 + 0.10,
        color: Math.random() > 0.5 ? "96,165,250" : "56,189,248",
      };
    }

    const particles: Particle[] = Array.from(
      { length: PARTICLE_COUNT },
      () => makeParticle(true)
    );

    // ── PERSPECTIVE GRID ────────────────────────────────────
    function drawGrid(t: number) {
      const vx = W / 2;
      const vy = H * 0.38;
      const cols = 14;
      const rows = 18;
      const spread = W * 1.1;
      const depth = H * 0.55;
      const speed = (t * 0.18) % (depth / rows);

      ctx!.save();
      for (let r = 0; r <= rows; r++) {
        const progress = r / rows;
        const y = vy + progress * depth + speed;
        if (y > H + 10) continue;
        const alpha = progress * 0.13;
        const x0 = vx - (spread / 2) * progress;
        const x1 = vx + (spread / 2) * progress;
        ctx!.beginPath();
        ctx!.moveTo(x0, y);
        ctx!.lineTo(x1, y);
        ctx!.strokeStyle = `rgba(56,189,248,${alpha})`;
        ctx!.lineWidth = 0.5;
        ctx!.stroke();
      }
      for (let c = 0; c <= cols; c++) {
        const progress = c / cols;
        const xNear = vx + (progress - 0.5) * spread * 0.05;
        const xFar  = vx + (progress - 0.5) * spread;
        const yNear = vy + speed;
        const yFar  = vy + depth + speed;
        ctx!.beginPath();
        ctx!.moveTo(xNear, yNear);
        ctx!.lineTo(xFar, yFar);
        ctx!.strokeStyle = `rgba(96,165,250,0.07)`;
        ctx!.lineWidth = 0.4;
        ctx!.stroke();
      }
      ctx!.restore();
    }

    // ── CONNECTIONS ─────────────────────────────────────────
    function drawConnections() {
      const MAX_DIST = 120;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.09;
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
      ctx!.clearRect(0, 0, W, H);
      drawGrid(t);
      drawConnections();

      for (const p of particles) {
        p.y -= p.speed;
        if (p.y < -10) {
          Object.assign(p, makeParticle(false));
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
