import { motion } from "framer-motion";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { useMeta } from "@/hooks/useMeta";
import {
  Github, Linkedin, Twitter, Crown, Palette, Calendar, Cpu, Camera, Megaphone,
  Star, Rocket, ShieldCheck,
} from "lucide-react";

type Member = { name: string; role: string; image?: string };
type Team = {
  key: string;
  name: string;
  tag: string;
  icon: typeof Crown;
  accent: string;
  glow: string;
  lead: Member;
  members: Member[];
};

const initialsOf = (name: string) =>
  name.split(" ").filter(Boolean).map((n) => n[0]).slice(0, 2).join("").toUpperCase();

const captain: Member = {
  name: "Hanzala Salaheen",
  role: "Student Builder Group Captain",
  image: "/members/captain/Hanzala Salaheen.jpg",
};

const teams: Team[] = [
  {
    key: "technical", name: "Technical Team", tag: "Cloud · AI · Engineering",
    icon: Cpu, accent: "from-cyan-400/40 to-primary/30", glow: "oklch(0.72 0.13 220 / 0.55)",
    lead: { name: "Abdul Rafay", role: "Lead · Technical", image: "/members/technical/Abdul Rafay.jpg" },
    members: [
      { name: "Waniza Khan", role: "Technical", image: "/members/technical/Waniza Khan.jpg" },
      { name: "Ahmed Hussain", role: "Technical", image: "/members/technical/Ahmed Hussain.jpg" },
      { name: "Ahmed Mujtaba", role: "Technical", image: "/members/technical/Ahmed Mujtaba.jpg" },
    ],
  },
  {
    key: "media", name: "Media Team", tag: "Photo · Video · Story",
    icon: Camera, accent: "from-purple-500/35 to-cyan-400/30", glow: "oklch(0.65 0.22 300 / 0.5)",
    lead: { name: "Mutahir Raza", role: "Lead · Media", image: "/members/media/Mutahir Raza.jpg" },
    members: [
      { name: "Umaima Junaid", role: "Media", image: "/members/media/Umaima Junaid.jpg" },
      { name: "Minha Fatima", role: "Media", image: "/members/media/Minha Fatima.jpg" },
      { name: "Muhammad Shayan Baig", role: "Media", image: "/members/media/Muhammad Shayan Baig.jpg" },
    ],
  },
  {
    key: "marketing", name: "Outreach & Marketing Team", tag: "Growth · Social · Brand",
    icon: Megaphone, accent: "from-rose-500/35 to-primary/30", glow: "oklch(0.65 0.22 25 / 0.55)",
    lead: { name: "Ashir Ali", role: "Lead · Marketing", image: "/members/marketing/Ashir Ali.jpg" },
    members: [
      { name: "Taha Baig", role: "Marketing", image: "/members/marketing/Taha Baig.jpg" },
      { name: "Farwa Zehra", role: "Marketing", image: "/members/marketing/Farwa Zehra.jpg" },
      { name: "Hassan Irfan", role: "Marketing", image: "/members/marketing/Hassan Irfan.jpg" },
    ],
  },
  {
    key: "creative", name: "Creative Team", tag: "Design · Brand · Identity",
    icon: Palette, accent: "from-fuchsia-500/35 to-primary/30", glow: "oklch(0.7 0.25 330 / 0.5)",
    lead: { name: "Fahad Ahmed", role: "Lead · Creative", image: "/members/creative/Fahad Ahmed.jpg" },
    members: [
      { name: "Misbah Waqar", role: "Creative", image: "/members/creative/Misbah Waqar.jpg" },
      { name: "Maryam Arshad", role: "Creative", image: "/members/creative/Maryam Arshad.jpg" },
      { name: "Khalique Mehmood", role: "Creative", image: "/members/creative/Khalique Mehmood.jpg" },
    ],
  },
  {
    key: "events", name: "Event Management Team", tag: "Ops · Production",
    icon: Calendar, accent: "from-primary/35 to-amber-500/30", glow: "oklch(0.769 0.165 64.5 / 0.55)",
    lead: { name: "Ayesha Shaikh", role: "Lead · Events", image: "/members/events/Ayesha Shaikh.jpg" },
    members: [
      { name: "Ayema Nadeem", role: "Events", image: "/members/events/Ayema Nadeem.jpg" },
      { name: "Muhammad Hasan", role: "Events", image: "/members/events/Muhammad Hasan.jpg" },
      { name: "Shahmeer Shaikh", role: "Events", image: "/members/events/Shahmeer Shaikh.jpg" },
    ],
  },
];

const allNames = [captain.name, ...teams.flatMap((t) => [t.lead.name, ...t.members.map((m) => m.name)])];

export default function Members() {
  useMeta({
    title: "The Architects — AWS Student Builder Group HITMS",
    description: "Meet the captain and elite teams of AWS Student Builder Group HITMS.",
  });

  return (
    <Layout>
      <PageHeader
        eyebrow="The Architects"
        title="Meet The Minds Building The Cloud"
        subtitle="One captain. Five elite squads. Engineering the future of cloud at HITMS."
      />

      <CaptainSpotlight />

      <section className="relative py-6 border-y border-border/60 bg-card/30 overflow-hidden">
        <div className="flex gap-10 whitespace-nowrap animate-marquee-rev text-xl font-bold uppercase tracking-widest">
          {[...allNames, ...allNames].map((n, i) => (
            <span key={i} className="inline-flex items-center gap-10 text-muted-foreground/60">
              {n} <Star size={14} className="text-primary" />
            </span>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 space-y-24">
        {teams.map((team, i) => (
          <TeamSection key={team.key} team={team} index={i} />
        ))}
      </section>
    </Layout>
  );
}

/* ────────────────────────────────────────────────────────────── */

function CaptainSpotlight() {
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section className="relative max-w-7xl mx-auto px-4 md:px-8 -mt-2">
      <motion.div
        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
          const r = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          setRot({ x: -y * 6, y: x * 8 });
        }}
        onMouseLeave={() => setRot({ x: 0, y: 0 })}
        style={{ transform: `perspective(1400px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)` }}
        data-hover
        className="relative overflow-hidden rounded-3xl border border-primary/50 bg-gradient-to-br from-card via-card/80 to-background p-8 md:p-12 preserve-3d"
      >
        <div className="absolute -top-32 -left-20 h-80 w-80 rounded-full bg-primary/30 blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-[oklch(0.72_0.13_220/0.35)] blur-3xl" />
        <div className="absolute inset-0 aurora-bg opacity-60" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        {["top-4 left-4 border-l-2 border-t-2", "top-4 right-4 border-r-2 border-t-2",
          "bottom-4 left-4 border-l-2 border-b-2", "bottom-4 right-4 border-r-2 border-b-2"].map((c, i) => (
          <div key={i} className={`absolute h-5 w-5 ${c} border-primary/80`} />
        ))}

        <div className="relative grid md:grid-cols-[auto_1fr_auto] gap-8 md:gap-12 items-center">
          {/* Avatar */}
          <div className="relative shrink-0 mx-auto" style={{ transform: "translateZ(50px)" }}>
            <div className="absolute inset-0 bg-primary/50 blur-3xl rounded-full animate-pulse" />
            <div className="absolute -inset-6 rounded-full border border-primary/40 animate-spin-slow" style={{ animation: "cursor-rot 20s linear infinite" }} />
            <div className="absolute -inset-10 rounded-full border border-primary/20" style={{ animation: "cursor-rot 35s linear infinite reverse" }} />

            <div className="relative h-48 w-48 md:h-60 md:w-60 rounded-full ring-4 ring-primary/30 shadow-[0_0_60px_oklch(0.769_0.165_64.5/0.6)] overflow-hidden">
              {/* Gradient background always present */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-glow to-accent" />

              {/* Initials shown ONLY when image is absent or failed */}
              {(!captain.image || imgFailed) && (
                <span className="absolute inset-0 grid place-items-center text-6xl font-black text-primary-foreground">
                  {initialsOf(captain.name)}
                </span>
              )}

              {/* Photo — covers everything when loaded successfully */}
              {captain.image && !imgFailed && (
                <img
                  src={captain.image}
                  alt={captain.name}
                  onError={() => setImgFailed(true)}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
            </div>

            {/* Crown badge below avatar */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-[10px] tracking-widest uppercase font-black shadow-[0_0_20px_oklch(0.769_0.165_64.5/0.8)]">
              <Crown size={12} /> Captain
            </div>
          </div>

          {/* Info */}
          <div className="text-center md:text-left" style={{ transform: "translateZ(30px)" }}>
            <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-primary font-bold mb-3 inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              Student Builder Group · Lead
            </p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight font-display">
              <span className="text-gradient-primary">{captain.name}</span>
            </h2>
            <p className="mt-3 text-base text-muted-foreground max-w-xl">
              Orchestrating five elite squads, driving the SBG mission, and building the next generation of cloud architects at HITMS.
            </p>
            <div className="mt-5 flex flex-wrap justify-center md:justify-start gap-2">
              {["AWS", "Leadership", "Vision 2026", "Cloud Native"].map((t) => (
                <span key={t} data-hover className="px-3 py-1 rounded-full border border-primary/40 bg-primary/10 text-[10px] tracking-widest uppercase font-bold text-primary">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 md:grid-cols-1 gap-3 md:w-44" style={{ transform: "translateZ(20px)" }}>
            {[
              { l: "Teams", v: "5", i: ShieldCheck },
              { l: "Members", v: "20", i: Star },
              { l: "Year", v: "26", i: Rocket },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-primary/30 bg-background/60 backdrop-blur px-3 py-3 text-center">
                <s.i size={14} className="text-primary mx-auto mb-1" />
                <div className="text-2xl font-black text-gradient-primary font-display">{s.v}</div>
                <div className="text-[8px] tracking-[0.3em] uppercase text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */

function TeamSection({ team, index }: { team: Team; index: number }) {
  const Icon = team.icon;
  const total = 1 + team.members.length;
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
    >
      <div className="flex items-end justify-between flex-wrap gap-4 mb-7">
        <div className="flex items-center gap-4">
          <div className={`relative h-16 w-16 rounded-2xl bg-gradient-to-br ${team.accent} border border-primary/40 grid place-items-center text-primary overflow-hidden`}>
            <div className="absolute inset-0 opacity-50" style={{ background: `radial-gradient(circle at center, ${team.glow}, transparent 70%)` }} />
            <Icon size={28} className="relative animate-orbit-y" />
          </div>
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-primary/80 font-bold font-mono">{`TEAM 0${index + 1}`}</p>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight font-display">{team.name}</h2>
            <p className="text-xs text-muted-foreground tracking-widest uppercase mt-1">{team.tag}</p>
          </div>
        </div>
        <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/80 font-mono inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          {total} Builders · Active
        </div>
      </div>

      <div className="overflow-hidden">
        <motion.div
          initial={{ x: index % 2 ? 80 : -80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`grid sm:grid-cols-2 lg:grid-cols-4 ${team.members.length === 4 ? "xl:grid-cols-5" : ""} gap-4`}
        >
          <MemberCard m={team.lead} team={team} lead />
          {team.members.map((m, i) => (
            <MemberCard key={m.name} m={m} team={team} delay={(i + 1) * 0.08} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

function MemberCard({ m, team, lead, delay = 0 }: { m: Member; team: Team; lead?: boolean; delay?: number }) {
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.55, ease: "easeOut" }}
      data-hover
      onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
        const r = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        setRot({ x: -y * 12, y: x * 12 });
      }}
      onMouseLeave={() => setRot({ x: 0, y: 0 })}
      style={{ transform: `perspective(1000px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)` }}
      className={`group relative rounded-2xl border bg-card overflow-hidden transition-transform duration-200 preserve-3d shine-sweep ${
        lead ? "border-primary/70 shadow-[0_0_30px_oklch(0.769_0.165_64.5/0.25)]" : "border-border hover:border-primary/50"
      }`}
    >
      <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full blur-3xl opacity-40 group-hover:opacity-80 transition duration-500"
        style={{ background: team.glow }} />

      {/* Photo area */}
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        {/* Gradient + initials — fallback when no image or image fails */}
        <div className={`absolute inset-0 bg-gradient-to-br ${team.accent} opacity-60`} />
        {(!m.image || imgFailed) && (
          <div className="absolute inset-0 grid place-items-center text-4xl font-black font-display text-primary-foreground/80">
            {initialsOf(m.name)}
          </div>
        )}

        {/* Photo — covers gradient+initials when loaded */}
        {m.image && !imgFailed && (
          <img
            src={m.image}
            alt={m.name}
            onError={() => setImgFailed(true)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent" />
      </div>

      {/* Text block */}
      <div className="relative p-4 text-center">
        {lead && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 mb-1.5 rounded-full bg-primary text-primary-foreground text-[8px] tracking-widest uppercase font-black">
            <Crown size={9} /> Lead
          </span>
        )}
        <h3 className={`font-black tracking-tight ${lead ? "text-lg" : "text-base"}`}>{m.name}</h3>
        <p className="text-[10px] tracking-[0.25em] uppercase text-primary mt-1 font-bold">{m.role}</p>

        <div className="mt-3 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition translate-y-2 group-hover:translate-y-0 duration-300">
          {[Github, Linkedin, Twitter].map((Ic, k) => (
            <button key={k} data-hover className="h-7 w-7 grid place-items-center rounded-md border border-border hover:border-primary hover:text-primary transition">
              <Ic size={12} />
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-primary-glow to-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
    </motion.div>
  );
}