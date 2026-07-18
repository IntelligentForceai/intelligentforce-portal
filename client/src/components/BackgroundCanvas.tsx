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

    // ── HERO IMAGE (background layer) ──────────────────────
    const heroImg = new Image();
    heroImg.src = "/images/hero_ai_agents.jpg";
    let imgLoaded = false;
    heroImg.onload = () => { imgLoaded = true; };

    function resize() {
      W = canvas!.width = window.innerWidth;
      H = canvas!.height = document.documentElement.scrollHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // ── PARTICLES ──────────────────────────────────────────
    const PARTICLE_COUNT = 85;

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
        opacity: z * 0.50 + 0.08,
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
      const offset = (t * 0.00014) % (1 / rows);
      const gridAlpha = 0.43;

      for (let i = 0; i <= cols; i++) {
        const bx = (i / cols) * W;
        const alpha = gridAlpha * (0.055 + 0.035 * Math.sin((i / cols) * Math.PI));
        ctx!.beginPath();
        ctx!.moveTo(vx, vy);
        ctx!.lineTo(bx, H);
        ctx!.strokeStyle = `rgba(56,189,248,${alpha})`;
        ctx!.lineWidth = 0.6;
        ctx!.stroke();
      }

      for (let j = 0; j <= rows; j++) {
        const tv = ((j / rows) + offset) % 1;
        const y = vy + (H - vy) * tv;
        const xLeft = vx - vx * tv;
        const xRight = vx + (W - vx) * tv;
        const alpha = gridAlpha * tv * 0.10;
        ctx!.beginPath();
        ctx!.moveTo(xLeft, y);
        ctx!.lineTo(xRight, y);
        ctx!.strokeStyle = `rgba(56,189,248,${alpha})`;
        ctx!.lineWidth = 0.5;
        ctx!.stroke();
      }

      const grd = ctx!.createRadialGradient(vx, vy, 0, vx, vy, 220);
      grd.addColorStop(0, `rgba(96,165,250,${gridAlpha * 0.10})`);
      grd.addColorStop(1, "rgba(96,165,250,0)");
      ctx!.fillStyle = grd;
      ctx!.beginPath();
      ctx!.arc(vx, vy, 220, 0, Math.PI * 2);
      ctx!.fill();
    }

    // ── CONNECTIONS ─────────────────────────────────────────
    function drawConnections() {
      const partAlpha = 0.53;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            const alpha = partAlpha * (1 - dist / 110) * 0.07;
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

      const pageH = document.documentElement.scrollHeight;
      if (canvas!.height !== pageH) {
        canvas!.height = pageH;
        H = pageH;
      }

      ctx!.clearRect(0, 0, W, H);

      // 1. Dark base gradient
      const bg = ctx!.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, "#080c14");
      bg.addColorStop(0.5, "#090e18");
      bg.addColorStop(1, "#07111a");
      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, W, H);

      // 2. Hero image – gjennomsiktig, desaturert
      if (imgLoaded) {
        ctx!.save();
        ctx!.globalAlpha = 0.28;
        ctx!.filter = "saturate(0.45) brightness(0.65)";
        // Cover-fill: scale to cover entire canvas
        const iw = heroImg.naturalWidth;
        const ih = heroImg.naturalHeight;
        const scale = Math.max(W / iw, H / ih);
        const dw = iw * scale;
        const dh = ih * scale;
        const dx = (W - dw) / 2;
        const dy = (H - dh) / 2;
        ctx!.drawImage(heroImg, dx, dy, dw, dh);
        ctx!.filter = "none";
        ctx!.restore();
      }

      // 3. Overlay tint
      const overlay = ctx!.createLinearGradient(0, 0, 0, H);
      overlay.addColorStop(0, "rgba(8,12,20,0.68)");
      overlay.addColorStop(0.5, "rgba(6,18,35,0.55)");
      overlay.addColorStop(1, "rgba(8,12,20,0.72)");
      ctx!.fillStyle = overlay;
      ctx!.fillRect(0, 0, W, H);

      // 4. Grid + particles
      drawGrid(t);
      drawConnections();

      const partAlpha = 0.53;
      for (const p of particles) {
        p.y -= p.speed;
        if (p.y < -10) {
          Object.assign(p, makeParticle(false));
        }
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${p.color},${p.opacity * partAlpha})`;
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
