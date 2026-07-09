import { Cloud, Server, Database, Cpu, Boxes, Network, Zap, Box } from "lucide-react";

/* Decorative full-section overlay of flying AWS-style service tiles.
   Pure CSS animations, GPU-accelerated, pointer-events: none. */

const items = [
  { Icon: Cloud, anim: "animate-fly-1", delay: "0s", top: "12%", size: 22, dur: "26s" },
  { Icon: Server, anim: "animate-fly-2", delay: "-4s", top: "30%", size: 18, dur: "32s" },
  { Icon: Database, anim: "animate-fly-1", delay: "-8s", top: "55%", size: 24, dur: "30s" },
  { Icon: Cpu, anim: "animate-fly-2", delay: "-2s", top: "70%", size: 20, dur: "36s" },
  { Icon: Boxes, anim: "animate-fly-1", delay: "-14s", top: "82%", size: 16, dur: "28s" },
  { Icon: Network, anim: "animate-fly-2", delay: "-18s", top: "20%", size: 20, dur: "34s" },
  { Icon: Zap, anim: "animate-fly-1", delay: "-6s", top: "65%", size: 18, dur: "24s" },
  { Icon: Box, anim: "animate-fly-2", delay: "-10s", top: "45%", size: 22, dur: "30s" },
];

export function FlyingIcons({ density = 1 }: { density?: number }) {
  const list =
    density >= 1 ? items : items.slice(0, Math.max(3, Math.floor(items.length * density)));
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {list.map(({ Icon, anim, delay, top, size, dur }, i) => (
        <div
          key={i}
          className={`absolute ${anim}`}
          style={{ top, animationDelay: delay, animationDuration: dur }}
        >
          <div className="relative h-9 w-9 grid place-items-center rounded-lg border border-primary/30 bg-background/30 text-primary">
            <Icon size={size * 0.6} />
          </div>
        </div>
      ))}
    </div>
  );
}
