import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Hero3D } from "@/components/Hero3D";
import { FlyingIcons } from "@/components/FlyingIcons";
import { ArrowRight, Cloud, Cpu, Award, Rocket, Users, Code2, Sparkles, Zap, Server, Database, Network, Boxes } from "lucide-react";
import { Link } from "react-router-dom";
import { useMeta } from "@/hooks/useMeta";

export default function Index() {
  useMeta({
    title: "AWS Student Builder Group HITMS — Cloud Builders of Tomorrow",
    description: "Join AWS Student Builder Group HITMS. Hands-on cloud, AI and builder culture for students. Same community. Stronger vision. Bigger future.",
  });
  return (
    <Layout>
      {/* HERO */}
      <section className="relative min-h-[100vh] overflow-hidden bg-[#070a12]">
        {/* Full-bleed cinematic 3D */}
        <div className="absolute inset-0">
          <Hero3D />
        </div>



        {/* Flying service tiles drifting across */}
        <FlyingIcons />

        {/* Vignette + readability layers */}
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: "radial-gradient(ellipse at center, transparent 30%, oklch(0.08 0.02 250 / 0.85) 80%)" }} />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background/80 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-background via-background/70 to-transparent pointer-events-none" />

        {/* HUD lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-24 right-6 md:right-10 text-[9px] tracking-[0.4em] uppercase text-primary/70 font-mono">
            v2026.01 · sbg.hitms
          </div>
          <div className="absolute bottom-24 left-6 md:left-10 text-[9px] tracking-[0.4em] uppercase text-muted-foreground font-mono">
            ◢ build · ship · scale
          </div>
          <div className="absolute bottom-24 right-6 md:right-10 text-[9px] tracking-[0.4em] uppercase text-muted-foreground font-mono">
            lat 28.6° · lon 77.2°
          </div>
        </div>

        {/* Floating service badges around the scene */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
          {orbitIcons.map((o, i) => (
            <div
              key={i}
              className="absolute opacity-0 animate-fade-in"
              style={{ left: o.left, top: o.top, animationDelay: `${0.6 + i * 0.1}s`, animationFillMode: "forwards" }}
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-background/40 text-[10px] font-mono tracking-widest uppercase">
                <o.icon size={12} className="text-primary" />
                <span className="text-foreground/80">{o.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CENTER GLASS PANEL */}
        <div className="relative z-10 min-h-[100vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 pb-24 pt-28">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-black tracking-tight leading-[0.95] max-w-5xl"
          >
            <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-gradient-primary font-display drop-shadow-[0_3px_24px_rgba(0,0,0,0.7)]">AWS</span>
            <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground font-display mt-2">STUDENT BUILDER GROUP</span>
            <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-gradient-primary font-display mt-1">HITMS</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="mt-6 max-w-xl text-sm md:text-base text-muted-foreground/90 tracking-wide px-2"
          >
            Same community. Stronger vision. Bigger future —
            engineered on the cloud by the next wave of builders.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
            className="mt-8 flex flex-wrap gap-3 justify-center"
          >
            <a
              href="#join"
              data-cursor="DEPLOY"
              className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-bold hover:shadow-[0_0_40px_oklch(0.769_0.165_64.5/0.7)] transition-all hover:-translate-y-0.5 overflow-hidden text-sm md:text-base"
            >
              <span className="relative z-10">Join Our Community</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition" />
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 bg-gradient-to-r from-primary-glow to-primary" />
            </a>
            <Link
              to="/events"
              data-cursor="EXPLORE"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-primary/60 text-primary hover:bg-primary/10 transition text-sm md:text-base"
            >
              View Workshops
            </Link>
          </motion.div>

          {/* Live stats strip */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}
            className="mt-12 grid grid-cols-3 gap-px max-w-2xl w-full border border-primary/20 rounded-xl overflow-hidden bg-background/40"
          >
            {heroStats.map((s) => (
              <div key={s.l} className="px-3 py-3 sm:px-4 sm:py-4 bg-background/40">
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-gradient-primary">{s.n}</div>
                <div className="text-[8px] sm:text-[9px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-primary/80 tracking-[0.5em] uppercase z-10 font-mono"
        >
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            ◢ scroll to explore
          </motion.div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <section className="relative py-6 border-y border-border/60 bg-card/30 overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap animate-marquee text-2xl md:text-3xl font-black tracking-tight uppercase">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="inline-flex items-center gap-12 text-muted-foreground/60">
              {m}
              <span className="text-primary">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* WHY JOIN */}
      <section className="relative py-24 px-4 md:px-8 overflow-hidden">
        <FlyingIcons density={0.6} />
        <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-primary font-bold mb-2">Why Join</p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">Build. Learn. <span className="text-gradient-primary">Launch.</span></h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.45, ease: "easeOut" }}
              data-hover
              className="group relative p-7 rounded-2xl bg-card/80 border border-border hover:border-primary/60 overflow-hidden transition-colors hover:-translate-y-1 hover:scale-[1.01]"
            >
              <div className="absolute inset-0 opacity-30 group-hover:opacity-100 transition duration-500" style={{ background: "var(--gradient-hero)" }} />
              <div className="absolute -top-px inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition" />
              <div className="relative">
                <div className="relative mb-5 inline-flex">
                  <div className="relative h-14 w-14 rounded-xl bg-gradient-to-br from-primary/30 to-accent/20 border border-primary/40 grid place-items-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <f.icon size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-black mb-2 tracking-tight">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                <div className="mt-5 flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-primary opacity-0 group-hover:opacity-100 transition">
                  <span>Explore</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-primary-glow to-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            </motion.div>
          ))}
        </div>
        </div>
      </section>

      {/* STATS PARALLAX */}
      <ParallaxStats />

      {/* PROGRAMS */}
      <section className="relative py-24 px-4 md:px-8 overflow-hidden">
        <FlyingIcons density={0.5} />
        <div className="relative max-w-7xl mx-auto">
        <div className="mb-12 flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-primary font-bold mb-2">Programs</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">Hands-on Cloud Curricula</h2>
          </div>
          <Link to="/resources" data-hover className="text-sm text-primary hover:underline">Explore all →</Link>
        </div>
        <div className="relative">
          {/* center timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent md:-translate-x-1/2" />
          <div className="flex flex-col gap-10 md:gap-16">
            {programs.map((p, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={p.tag} className="relative md:grid md:grid-cols-2 md:items-center md:gap-12">
                  {/* node dot on the center line */}
                  <div className="absolute left-4 md:left-1/2 top-8 md:top-1/2 h-3 w-3 -translate-x-1/2 md:-translate-y-1/2 rounded-full bg-primary shadow-[0_0_18px_oklch(0.769_0.165_64.5/0.8)] z-10" />
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                    data-hover
                    className={`group relative rounded-2xl border border-border hover:border-primary/60 bg-card/80 p-6 overflow-hidden transition-all hover:-translate-y-1 ml-10 md:ml-0 ${
                      isLeft ? "md:col-start-1 md:mr-4" : "md:col-start-2 md:ml-4"
                    }`}
                  >
                    <div className="absolute inset-0 opacity-30 group-hover:opacity-70 transition duration-700"
                         style={{ background: "var(--gradient-hero)" }} />
                    <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-primary animate-pulse-ring" />
                    <div className="relative flex items-start gap-4">
                      <div className="shrink-0 h-14 w-14 rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/25 to-accent/20 grid place-items-center text-primary shadow-[0_0_30px_oklch(0.769_0.165_64.5/0.3)] group-hover:scale-110 transition duration-500">
                        <p.icon size={26} strokeWidth={1.6} />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] tracking-[0.25em] uppercase text-primary font-bold">{p.tag}</span>
                        <h3 className="mt-1.5 text-xl md:text-2xl font-black leading-tight text-foreground group-hover:text-gradient-primary transition">{p.title}</h3>
                        <div className="mt-4 flex items-center justify-between gap-4">
                          <p className="text-xs text-muted-foreground">{p.meta}</p>
                          <div className="h-8 w-8 shrink-0 rounded-full border border-primary/40 grid place-items-center text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-[-45deg] transition-all duration-300">
                            <ArrowRight size={14} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
        </div>
      </section>

      {/* CTA */}
      <section id="join" className="relative py-24 px-4 md:px-8">
        <div className="max-w-5xl mx-auto relative rounded-2xl border border-primary/30 overflow-hidden p-10 md:p-16 text-center bg-card">
          <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
          <div className="relative">
            <p className="text-xs tracking-[0.3em] uppercase text-primary font-bold mb-3">System Initialization</p>
            <h2 className="text-4xl md:text-6xl font-black mb-4">Ready to <span className="text-gradient-primary">build the cloud?</span></h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Join our driving community of student builders across HITMS. Empowering one another to become architects of tomorrow.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <a href="https://chat.whatsapp.com/FgyyG0kLNIKIovBwenLagq" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-bold hover:shadow-[0_0_40px_oklch(0.769_0.165_64.5/0.7)] transition">
                <Zap size={16} /> Join WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

const features = [
  { icon: Cloud, title: "AWS Credits & Tools", desc: "Get exclusive access to AWS credits, Udemy licenses and certification vouchers to sharpen your skills and ship production-ready projects." },
  { icon: Award, title: "Certifications", desc: "Prepare for AWS Cloud Practitioner, Solutions Architect and Developer Associate with curated learning paths and exam vouchers." },
  { icon: Code2, title: "Hands-on Projects", desc: "Build real-world cloud applications using S3, Lambda, EC2, DynamoDB and more — guided by mentors and AWS experts." },
  { icon: Cpu, title: "AI & Cloud Innovation", desc: "Dive into the next-gen intersection of AI and cloud-native engineering — from Bedrock to SageMaker." },
  { icon: Users, title: "Global Network", desc: "Connect with 99K+ student builders in 35+ regions. Peers, mentors, AWS employees — all in one Slack." },
  { icon: Rocket, title: "Builder Culture", desc: "Hackathons, workshops, speaker sessions. Lead, contribute, ship — and become the architect of tomorrow." },
];

const programs = [
  { tag: "CLOUD · CORE", title: "Building with Amazon Bedrock", meta: "8 weeks · Mentored", icon: Cpu },
  { tag: "AI · NEW", title: "Innovate-A-Thon 2026", meta: "Live cohort", icon: Rocket },
  { tag: "FUTURE", title: "The Future of Cloud", meta: "Speaker series", icon: Cloud },
  { tag: "SECURITY", title: "Cloud Security Mastery", meta: "Self-paced", icon: Award },
];

const marquee = ["Cloud", "AI / ML", "Serverless", "Bedrock", "Builders", "Hackathons", "Certifications", "Community"];

const orbitIcons = [
  { icon: Cloud, label: "S3", left: "6%", top: "30%" },
  { icon: Server, label: "EC2", left: "8%", top: "62%" },
  { icon: Database, label: "DynamoDB", left: "82%", top: "28%" },
  { icon: Cpu, label: "Bedrock", left: "85%", top: "60%" },
  { icon: Network, label: "VPC", left: "16%", top: "78%" },
  { icon: Boxes, label: "ECS", left: "78%", top: "78%" },
];

const heroStats = [
  { n: "300+", l: "Builders" },
  { n: "20+", l: "Workshops" },
  { n: "99K+", l: "Global Network" },
];

function ParallaxStats() {
  const stats = [
    { n: "99K+", l: "Student Builders" },
    { n: "35+", l: "Regions Worldwide" },
    { n: "200+", l: "Workshops Delivered" },
    { n: "100%", l: "Builder Energy" },
  ];

  return (
    <section className="relative py-28 overflow-hidden border-y border-border/60 bg-card/30">
      <div className="absolute -top-32 -left-20 h-80 w-80 rounded-full bg-primary/10" />
      <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-accent/10" />
      <div className="relative max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            data-hover
            className="group relative rounded-2xl border border-primary/30 bg-background/40 p-6 overflow-hidden hover:-translate-y-1 transition-transform"
          >
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="absolute top-2 left-2 text-[8px] font-mono tracking-[0.3em] text-primary/60">▸ {String(i+1).padStart(2,"0")}</div>
            <div className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <div className="relative">
              <div className="text-5xl md:text-7xl font-black font-display text-gradient-primary drop-shadow-[0_0_25px_oklch(0.769_0.165_64.5/0.5)]">{s.n}</div>
              <div className="mt-2 text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-mono">{s.l}</div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
