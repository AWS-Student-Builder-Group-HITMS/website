/* Lightweight CSS/SVG hero visual — replaces previous heavy three.js scene.
   Same export API. Pure CSS animations, GPU-friendly, no canvas. */

export function Hero3D() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          /* Soft brand-orange glow centered behind the headline */
          background:
            "radial-gradient(ellipse at 50% 45%, oklch(0.769 0.165 64.5 / 0.20), transparent 60%), radial-gradient(ellipse at 80% 80%, oklch(0.88 0.12 78 / 0.10), transparent 55%)",
        }}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {[320, 460, 600, 760].map((s, i) => (
          <div
            key={s}
            className="absolute rounded-full border border-primary/15"
            style={{
              width: s,
              height: s,
              left: -s / 2,
              top: -s / 2,
              animation: `spin ${60 + i * 20}s linear infinite ${i % 2 ? "reverse" : ""}`,
              willChange: "transform",
            }}
          >
            <div
              className="absolute h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_oklch(0.769_0.165_64.5)]"
              style={{ top: -3, left: "50%" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}