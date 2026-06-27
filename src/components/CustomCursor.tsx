import { useEffect, useRef } from "react";

/**
 * Minimal, clean custom cursor:
 *   - A small solid dot that tracks the pointer exactly
 *   - A thin outline ring that follows with a soft lag
 *   - Ring gently grows over links / buttons / inputs
 * No trails, labels, rotation or shockwaves — just simple and professional.
 */
export function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let tx = -100, ty = -100;
    let rx = -100, ry = -100;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${tx - 3}px, ${ty - 3}px, 0)`;
    };

    const loop = () => {
      rx += (tx - rx) * 0.2;
      ry += (ty - ry) * 0.2;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    const onOver = (e: Event) => {
      const interactive = (e.target as HTMLElement)?.closest?.("a, button, [data-hover], input, textarea, select");
      document.documentElement.classList.toggle("cursor-hover", !!interactive);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" />
      <div ref={dot} className="cursor-core" />
    </>
  );
}
