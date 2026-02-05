"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { Button } from "@web/components/ui/button";
import { Input } from "@web/components/ui/input";
import clsx from "clsx";
import { ImMan, ImWoman } from "react-icons/im";
import { BiTrophy } from "react-icons/bi";
import Image from "next/image";
import { SiPinboard } from "react-icons/si";

type Winner = { girl?: string; boy?: string };

export default function SpinWheel() {
  const [girlsRaw, setGirlsRaw] = useState("");
  const [boysRaw, setBoysRaw] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<Winner>({});
  const [dialogOpen, setDialogOpen] = useState(false);

  const wheelARef = useRef<SVGGElement | null>(null);
  const wheelBRef = useRef<SVGGElement | null>(null);
  const confettiCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeTl = useRef<gsap.core.Timeline | null>(null);

  // dialog refs & focus management
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const primaryBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastActiveEl = useRef<HTMLElement | null>(null);

  const SIZE = 420;
  const CX = SIZE / 2;
  const CY = SIZE / 2;
  const RADIUS = Math.floor(SIZE * 0.42);

  const girlsPalette = useMemo(
    () => ["#ffdce6", "#ffb3d1", "#ff89c1", "#ff4d9e"],
    [],
  );
  const boysPalette = useMemo(
    () => ["#e8f6ff", "#cfeeff", "#9fddff", "#4da4ff"],
    [],
  );

  const parseNames = useCallback(
    (raw: string) =>
      raw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    [],
  );
  const girls = useMemo(() => parseNames(girlsRaw), [girlsRaw, parseNames]);
  const boys = useMemo(() => parseNames(boysRaw), [boysRaw, parseNames]);

  function polarToCartesian(
    cx: number,
    cy: number,
    r: number,
    angleDeg: number,
  ) {
    const angleRad = ((angleDeg - 90) * Math.PI) / 180.0;
    return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) };
  }

  function describeArc(
    cx: number,
    cy: number,
    r: number,
    startAngle: number,
    endAngle: number,
  ) {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      `M ${cx} ${cy}`,
      `L ${start.x} ${start.y}`,
      `A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
      `Z`,
    ].join(" ");
  }

  function makeSegments(names: string[], palette: string[]) {
    if (!names.length)
      return [] as {
        label: string;
        start: number;
        end: number;
        color: string;
      }[];
    const angle = 360 / names.length;
    return names.map((label, i) => ({
      label,
      start: i * angle,
      end: (i + 1) * angle,
      color: palette[i % palette.length],
    }));
  }

  const segA = useMemo(
    () => makeSegments(girls, girlsPalette),
    [girls, girlsPalette],
  );
  const segB = useMemo(
    () => makeSegments(boys, boysPalette),
    [boys, boysPalette],
  );

  const pickIndex = useCallback(
    (arr: string[]) =>
      arr.length ? Math.floor(Math.random() * arr.length) : -1,
    [],
  );

  const runConfetti = useCallback((color = "#ff4d9e") => {
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPR = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * DPR;
    canvas.height = window.innerHeight * DPR;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    type P = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      s: number;
      life: number;
      col: string;
      r: number;
      vr: number;
    };
    const parts: P[] = [];
    const spawn = (n: number) => {
      for (let i = 0; i < n; i++) {
        parts.push({
          x: window.innerWidth / 2 + (Math.random() - 0.5) * 240,
          y: window.innerHeight / 2 + (Math.random() - 0.5) * 120,
          vx: (Math.random() - 0.5) * 6,
          vy: Math.random() * -9 - 2,
          s: 6 + Math.random() * 8,
          life: 60 + Math.random() * 60,
          col:
            Math.random() > 0.5
              ? color
              : Math.random() > 0.5
                ? "#ffdce6"
                : "#cfeeff",
          r: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 0.2,
        });
      }
    };
    spawn(80);

    let raf = 0;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.vy += 0.35;
        p.x += p.vx;
        p.y += p.vy;
        p.r += p.vr;
        p.life -= 1;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.fillStyle = p.col;
        ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s);
        ctx.restore();
        if (p.life <= 0 || p.y > window.innerHeight + 50) parts.splice(i, 1);
      }
      if (parts.length) raf = requestAnimationFrame(loop);
      else cancelAnimationFrame(raf);
    };
    loop();
    setTimeout(() => {
      if (raf) cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 4500);
  }, []);

  function mod360(v: number) {
    return ((v % 360) + 360) % 360;
  }

  // ------------ SPIN (keeps your existing behavior) ------------
  const spin = useCallback(() => {
    if (!girls.length || !boys.length) {
      alert("Add at least one name on each wheel");
      return;
    }

    const idxA = pickIndex(girls);
    const idxB = pickIndex(boys);

    const angleA = 360 / girls.length;
    const angleB = 360 / boys.length;
    const centerA = idxA * angleA + angleA / 2;
    const centerB = idxB * angleB + angleB / 2;

    const spins = 6 + Math.floor(Math.random() * 3); // 6..8
    const spinsB = 6 + Math.floor(Math.random() * 3);

    const curA = Number(gsap.getProperty(wheelARef.current, "rotation") || 0);
    const curB = Number(gsap.getProperty(wheelBRef.current, "rotation") || 0);

    const desiredModA = mod360(-centerA);
    const desiredModB = mod360(-centerB);

    const curModA = mod360(curA);
    const curModB = mod360(curB);

    const finalAbsA = desiredModA + spins * 360;
    const finalAbsB = desiredModB + spinsB * 360;

    const deltaA = finalAbsA - curModA;
    const deltaB = finalAbsB - curModB;

    const targetA = curA + deltaA;
    const targetB = curB + deltaB;

    if (activeTl.current) {
      activeTl.current.kill();
      activeTl.current = null;
    }

    setSpinning(true);
    setWinner({});

    // ensure SVG groups rotate around center
    gsap.set([wheelARef.current, wheelBRef.current], {
      transformOrigin: "50% 50%",
    });

    const tl = gsap.timeline({ defaults: { transformOrigin: "50% 50%" } });
    activeTl.current = tl;

    // small pop
    tl.to(
      [wheelARef.current, wheelBRef.current],
      { scale: 1.04, duration: 0.18 },
      0,
    );

    // main spins
    tl.to(
      wheelARef.current,
      { rotation: targetA, duration: 3.9, ease: "power4.out" },
      0,
    );
    tl.to(
      wheelBRef.current,
      { rotation: targetB, duration: 4.2, ease: "power4.out" },
      0,
    );

    // wobble
    tl.to(
      wheelARef.current,
      { rotation: "+=5", duration: 0.36, ease: "elastic.out(1,0.6)" },
      3.75,
    );
    tl.to(
      wheelARef.current,
      { rotation: "-=5", duration: 0.22, ease: "power3.inOut" },
      4.12,
    );

    tl.to(
      wheelBRef.current,
      { rotation: "+=6", duration: 0.38, ease: "elastic.out(1,0.6)" },
      4.05,
    );
    tl.to(
      wheelBRef.current,
      { rotation: "-=6", duration: 0.25, ease: "power3.inOut" },
      4.4,
    );

    // reveal winners + open dialog + confetti
    tl.call(
      () => {
        const g = girls[idxA];
        const b = boys[idxB];
        setWinner({ girl: g, boy: b });

        runConfetti("#ff4d9e");
        runConfetti("#4da4ff");

        lastActiveEl.current = document.activeElement as HTMLElement | null;
        setDialogOpen(true);
      },
      undefined,
      4.22,
    );

    // final tidy
    tl.call(
      () => {
        setSpinning(false);
        activeTl.current = null;
      },
      undefined,
      4.6,
    );
  }, [girls, boys, pickIndex, runConfetti]);

  useEffect(
    () => () => {
      if (activeTl.current) {
        activeTl.current.kill();
        activeTl.current = null;
      }
    },
    [],
  );

  // const applyLists = useCallback(() => {
  //   setGirls(parseNames(girlsRaw));
  //   setBoys(parseNames(boysRaw));
  //   setWinner({});
  //   gsap.set(wheelARef.current, { rotation: 0, scale: 1 });
  //   gsap.set(wheelBRef.current, { rotation: 0, scale: 1 });
  // }, [girlsRaw, boysRaw, parseNames]);

  // helper to animate dialog closing and restore focus
  const closeDialogWithAnimation = () => {
    const el = dialogRef.current;
    if (!el) {
      setDialogOpen(false);
      if (lastActiveEl.current) lastActiveEl.current.focus();
      return;
    }
    gsap.killTweensOf(el);
    gsap.to(el, {
      opacity: 0,
      scale: 0.96,
      y: 8,
      duration: 0.22,
      ease: "power2.in",
      onComplete: () => {
        setDialogOpen(false);
        if (lastActiveEl.current) lastActiveEl.current.focus();
      },
    });
  };

  // ---- dialog animation + focus trap ----
  useEffect(() => {
    if (!dialogOpen) return;

    const el = dialogRef.current;
    if (el) {
      gsap.killTweensOf(el);
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.96, y: 12 },
        { opacity: 1, scale: 1, y: 0, duration: 0.36, ease: "power3.out" },
      );
    }

    requestAnimationFrame(() => {
      if (primaryBtnRef.current) primaryBtnRef.current.focus();
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeDialogWithAnimation();
      } else if (e.key === "Tab") {
        const node = dialogRef.current;
        if (!node) return;
        const focusable = Array.from(
          node.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((n) => n.offsetParent !== null);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dialogOpen]);

  function labelProps(seg: { start: number; end: number }) {
    const angle = seg.end - seg.start;
    const angleRad = (angle * Math.PI) / 180;
    const arcLen = RADIUS * angleRad;
    const fontSize = Math.max(10, Math.min(18, Math.round(arcLen / 10)));
    const mid = seg.start + angle / 2;
    const pos = polarToCartesian(CX, CY, RADIUS * 0.62, mid);
    return { fontSize, mid, pos };
  }

  return (
    <div className="min-h-screen bg-gradient-to-b relative overflow-clip to-[#A13AED] from-[#FCD4C8] flex-col flex items-center  relative">
      {/* Svgs */}
      <div className="bg-[#F96E95] w-[2000px] mask-radial-from-25% mask-radial-to-25% mask-radial-at-bottom-left left-0 absolute h-[1000px] z-0" />
      <div className="bg-[#FF8EAE] w-[2000px] mask-radial-from-22% mask-radial-to-22% mask-radial-at-bottom-left left-0 absolute h-[1000px] z-0" />
      <div className="bg-[#FDB1C6] w-[2000px] mask-radial-from-19% mask-radial-to-19% mask-radial-at-bottom-left left-0 absolute h-[1000px] z-0" />
      <Image
        alt="cloud-1"
        height={156}
        width={156}
        className="absolute drop-shadow-2xl animate-float-random top-0 translate-y-50  transition-transform scale-100 hover:scale-105 left-0 translate-x-50 z-20"
        src={"/cloud.svg"}
      />

      <Image
        alt="cloud-2"
        height={256}
        width={256}
        className="absolute drop-shadow-2xl animate-float-random top-0 translate-y-150  transition-transform scale-100 hover:scale-105 left-0 translate-x-350 z-20"
        src={"/cloud.svg"}
      />

      <Image
        alt="cloud-2"
        height={176}
        width={176}
        className="absolute drop-shadow-2xl animate-float-random top-0 translate-y-20  transition-transform scale-100 hover:scale-105 left-0 translate-x-330 z-20"
        src={"/cloud.svg"}
      />

      {/* headings */}
      <div className="mx-auto grid grid-cols-2 -translate-x-10 mt-10 mb-12 gap-4">
        <Image
          alt="logo"
          height={176}
          width={176}
          className="place-self-center"
          src={"/ccLogo.svg"}
        />
        <div className="place-self-center justify-self-center">
          <h1 className="text-7xl text-primary -ml-18 font-bold">Lucky Draw</h1>
          <div className="h-2 w-full rounded-full bg-[#9C65D3]" />
          <h1 className="text-xl text-[#9C65D3] -ml-18 font-bold">
            A Chance To Win 25$ Worth AWS Credits
          </h1>
        </div>
      </div>

      <canvas
        ref={confettiCanvasRef}
        className="pointer-events-none fixed inset-0 w-full h-full z-100"
      />

      <div
        className={clsx(
          "flex flex-col items-center gap-6 transition-filter duration-200",
          {
            "filter blur-sm": dialogOpen,
          },
        )}>
        <div className="flex flex-wrap items-start gap-8 justify-center">
          {/* Wheel A */}
          <div className="flex flex-col items-center">
            <div className="relative overflow-visible">
              <svg
                width={SIZE}
                height={SIZE}
                viewBox={`0 0 ${SIZE} ${SIZE}`}
                aria-label="Girls wheel"
                className="drop-shadow-2xl"
                style={{ overflow: "visible" }}>
                <g ref={wheelARef}>
                  {segA.length > 0 ? (
                    segA.map((s, i) => (
                      <path
                        key={`a-${i}`}
                        d={describeArc(CX, CY, RADIUS, s.start, s.end)}
                        fill={s.color}
                        stroke="#ffffffaa"
                        strokeWidth={1}
                      />
                    ))
                  ) : (
                    <circle
                      cx={CX}
                      cy={CY}
                      r={RADIUS}
                      fill="#fff6fb"
                      stroke="#ffddeb"
                    />
                  )}

                  {segA.map((s, i) => {
                    const { fontSize, mid, pos } = labelProps(s);
                    return (
                      <text
                        key={`al-${i}`}
                        x={pos.x}
                        y={pos.y}
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        fontSize={fontSize}
                        fill="#2a2a2a"
                        transform={`rotate(${mid}, ${pos.x}, ${pos.y})`}
                        style={{ pointerEvents: "none" }}>
                        {s.label}
                      </text>
                    );
                  })}

                  <circle
                    cx={CX}
                    cy={CY}
                    r={48}
                    fill="#fff"
                    stroke="#ffdce6"
                    strokeWidth={3}
                  />
                </g>
              </svg>

              {/* pointer A (static DOM placed above SVG to avoid transform issues) */}
              <div
                className="absolute left-1/2 rotate-180  -translate-x-1/2 top-0 w-14 h-14 flex items-center justify-center pointer-events-none z-40"
                aria-hidden>
                <svg width={56} height={56} viewBox="0 0 24 24">
                  <g>
                    <path
                      d="M12 2 L18 12 L12 9 L6 12 Z"
                      fill="#ff4d9e"
                      stroke="#fff"
                      strokeWidth={0.8}
                    />
                    <circle
                      cx="12"
                      cy="17"
                      r="3.8"
                      fill="#ffb3d1"
                      stroke="#fff"
                      strokeWidth={0.6}
                    />
                  </g>
                </svg>
              </div>
            </div>

            <div className="mt-4 text-center z-50 drop-shadow-2xl">
              <div className="text-xs text-pink-200">Girl Winner</div>
              <div className="winner-pop text-5xl font-extrabold text-pink-200 mt-1">
                {winner.girl ?? "—"}
              </div>
            </div>
          </div>

          {/* Wheel B */}
          <div className="flex flex-col items-center">
            <div className="relative overflow-visible">
              <svg
                width={SIZE}
                height={SIZE}
                viewBox={`0 0 ${SIZE} ${SIZE}`}
                aria-label="Boys wheel"
                className="drop-shadow-2xl"
                style={{ overflow: "visible" }}>
                <g ref={wheelBRef}>
                  {segB.length > 0 ? (
                    segB.map((s, i) => (
                      <path
                        key={`b-${i}`}
                        d={describeArc(CX, CY, RADIUS, s.start, s.end)}
                        fill={s.color}
                        stroke="#ffffffaa"
                        strokeWidth={1}
                      />
                    ))
                  ) : (
                    <circle
                      cx={CX}
                      cy={CY}
                      r={RADIUS}
                      fill="#f0fbff"
                      stroke="#cfe9ff"
                    />
                  )}

                  {segB.map((s, i) => {
                    const { fontSize, mid, pos } = labelProps(s);
                    return (
                      <text
                        key={`bl-${i}`}
                        x={pos.x}
                        y={pos.y}
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        fontSize={fontSize}
                        fill="#03203C"
                        transform={`rotate(${mid}, ${pos.x}, ${pos.y})`}
                        style={{ pointerEvents: "none" }}>
                        {s.label}
                      </text>
                    );
                  })}

                  <circle
                    cx={CX}
                    cy={CY}
                    r={48}
                    fill="#fff"
                    stroke="#cfe9ff"
                    strokeWidth={3}
                  />
                </g>
              </svg>

              <div
                className="absolute left-1/2 -translate-x-1/2 rotate-180 top-0 w-14 h-14 flex items-center justify-center pointer-events-none"
                aria-hidden>
                <svg width={56} height={56} viewBox="0 0 24 24">
                  <g>
                    <path
                      d="M12 2 L18 12 L12 9 L6 12 Z"
                      fill="#4da4ff"
                      stroke="#fff"
                      strokeWidth={0.8}
                    />
                    <circle
                      cx="12"
                      cy="17"
                      r="3.8"
                      fill="#cfe9ff"
                      stroke="#fff"
                      strokeWidth={0.6}
                    />
                  </g>
                </svg>
              </div>
            </div>

            <div className="mt-4 text-center">
              <div className="text-xs text-blue-200">Boy Winner</div>
              <div className="winner-pop text-5xl font-extrabold text-blue-200 mt-1">
                {winner.boy ?? "—"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right controls */}
      <div className="absolute left-6  hover:scale-105 scale-100 origin-bottom-left transition-all bottom-6 w-96">
        <div>
          <Image
            alt="balloon-1"
            height={156}
            width={156}
            className="absolute drop-shadow-2xl animate-float-random pointer-events-none bottom-0 z-20 translate-x-5 rotate-12 right-0"
            src={"/balloon.svg"}
          />
          <Image
            alt="balloon-2"
            height={56}
            width={56}
            className="absolute drop-shadow-2xl animate-float-random pointer-events-none top-0 z-20 -translate-y-5 -translate-x-5 -rotate-12 left-0"
            src={"/balloon.svg"}
          />
          <div className=" relative space-y-4 bg-white p-2 !rounded-tr-[1000px] overflow-clip rounded-4xl border-2 shadow-lg">
            <div className="mask-alpha p-2 mask-r-from-0% mask-r-to-90%">
              <label className="text-xs text-slate-500">
                Girls (comma separated)
              </label>
              <Input
                value={girlsRaw}
                onChange={(e) => setGirlsRaw(e.target.value)}
                placeholder="Aisha, Sara, Noor, Fatima"
              />

              <label className="text-xs text-slate-500">
                Boys (comma separated)
              </label>
              <Input
                value={boysRaw}
                onChange={(e) => setBoysRaw(e.target.value)}
                placeholder="Ali, Ahmed, Bilal, Usman"
              />
            </div>
            <div className="flex gap-2">
              <Button
                className="w-full"
                onClick={() => {
                  // Reset everything
                  setGirlsRaw("");
                  setBoysRaw("");
                  setWinner({});
                  activeTl.current?.kill();
                  activeTl.current = null;
                  gsap.set([wheelARef.current, wheelBRef.current], {
                    rotation: 0,
                    scale: 1,
                  });
                }}
                variant="ghost">
                Reset
              </Button>
              <Button
                className="w-full bg-[#330066]"
                size="lg"
                onClick={() => {
                  spin();
                }}>
                {spinning ? "Spinning..." : "Spin Wheels"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom mobile action */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <Button onClick={spin} className="px-12 py-4 text-lg">
          {spinning ? "Spinning..." : "Spin Wheels"}
          <SiPinboard className="animate-spin" />
        </Button>
      </div>

      {/* WINNER DIALOG */}
      {dialogOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-60 flex items-center justify-center">
          {/* backdrop with blur */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeDialogWithAnimation}
            aria-hidden
          />

          {/* dialog panel */}
          <div className="relative z-70 w-full max-w-lg mx-4">
            <Image
              alt="balloon-1"
              height={56}
              width={56}
              className="absolute drop-shadow-2xl animate-float-random pointer-events-none bottom-0 z-20 translate-x-7 translate-y-7 rotate-12 right-0"
              src={"/balloon.svg"}
            />
            <Image
              alt="balloon-2"
              height={156}
              width={156}
              className="absolute drop-shadow-2xl animate-float-random pointer-events-none top-0 z-20 -translate-y-15 -translate-x-15 -rotate-12 left-0"
              src={"/balloon.svg"}
            />
            <div
              ref={dialogRef}
              className="bg-white rounded-2xl p-6 z-100 shadow-2xl ring-1 ring-black/6"
              aria-labelledby="winner-title">
              <h2
                id="winner-title"
                className="text-xl flex place-self-center justify-center font-semibold mb-2">
                <BiTrophy className="place-self-center mr-2" /> Winners!
              </h2>
              <p className="text-sm text-slate-600 mb-4 text-center">
                Congratulations to:
              </p>

              <div className="space-y-3 mb-6 ">
                <div className="flex items-center justify-between bg-pink-50 rounded-lg p-3">
                  <div>
                    <div className="text-xs text-slate-500">Girl</div>
                    <div className="font-medium text-pink-600 text-lg">
                      {winner.girl ?? "—"}
                    </div>
                  </div>
                  <div className="text-pink-400 text-2xl select-none">
                    <ImWoman />
                  </div>
                </div>

                <div className="flex items-center justify-between bg-sky-50 rounded-lg p-3">
                  <div>
                    <div className="text-xs text-slate-500">Boy</div>
                    <div className="font-medium text-sky-600 text-lg">
                      {winner.boy ?? "—"}
                    </div>
                  </div>
                  <div className="text-sky-400 text-2xl select-none">
                    <ImMan />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeDialogWithAnimation}>
                  Close
                </Button>
                <Button
                  ref={primaryBtnRef}
                  size="sm"
                  onClick={() => {
                    closeDialogWithAnimation();
                    setTimeout(() => {
                      spin();
                    }, 260);
                  }}>
                  Spin Again
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
