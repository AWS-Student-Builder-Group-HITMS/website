import { useEffect, useState } from "react";

/**
 * Lightweight launch intro: an "AWS" cube appears, splits horizontally,
 * and slides apart revealing the site. Pure CSS — no JS animation loop.
 * Auto-dismounts after ~1.6s and respects prefers-reduced-motion + sessionStorage.
 */
export function BootIntro() {
  const [mounted, setMounted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("__intro_played")) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem("__intro_played", "1");
      return;
    }
    sessionStorage.setItem("__intro_played", "1");
    setMounted(true);
    const t = setTimeout(() => setDone(true), 1700);
    return () => clearTimeout(t);
  }, []);

  if (!mounted || done) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
      style={{ animation: "intro-fade 0.4s ease 1.3s forwards" }}
    >
      {/* Top half */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 bg-[#070a12] flex items-end justify-center overflow-hidden"
        style={{ animation: "intro-split-up 1.3s cubic-bezier(.7,0,.3,1) 0.55s forwards" }}
      >
        <div
          className="translate-y-[50%] font-black tracking-tight text-primary"
          style={{
            fontFamily: "Orbitron, system-ui, sans-serif",
            fontSize: "clamp(80px, 18vw, 220px)",
            lineHeight: 1,
            textShadow: "0 0 40px oklch(0.769 0.165 64.5 / 0.6)",
          }}
        >
          AWS
        </div>
      </div>
      {/* Bottom half */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#070a12] flex items-start justify-center overflow-hidden"
        style={{ animation: "intro-split-down 1.3s cubic-bezier(.7,0,.3,1) 0.55s forwards" }}
      >
        <div
          className="-translate-y-[50%] font-black tracking-tight text-primary"
          style={{
            fontFamily: "Orbitron, system-ui, sans-serif",
            fontSize: "clamp(80px, 18vw, 220px)",
            lineHeight: 1,
            textShadow: "0 0 40px oklch(0.769 0.165 64.5 / 0.6)",
          }}
        >
          AWS
        </div>
      </div>
      {/* Centre seam flash */}
      <div
        className="absolute left-0 right-0 top-1/2 h-px bg-primary"
        style={{
          boxShadow: "0 0 24px 6px oklch(0.769 0.165 64.5 / 0.9)",
          animation: "intro-seam 0.55s ease forwards",
        }}
      />
      <style>{`
        @keyframes intro-split-up   { to { transform: translateY(-100%); } }
        @keyframes intro-split-down { to { transform: translateY(100%);  } }
        @keyframes intro-seam       { 0% { transform: scaleX(0); opacity: 0; }
                                       60%{ transform: scaleX(1); opacity: 1; }
                                       100%{ transform: scaleX(1); opacity: 0; } }
        @keyframes intro-fade       { to { opacity: 0; } }
      `}</style>
    </div>
  );
}