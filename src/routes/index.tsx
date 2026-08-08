import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Hero3D } from "@/components/Hero3D";
import { FlyingIcons } from "@/components/FlyingIcons";
import {
  ArrowRight,
  Cloud,
  Cpu,
  Award,
  Rocket,
  Users,
  Code2,
  Sparkles,
  Zap,
  Server,
  Database,
  Network,
  Boxes,
  Image as ImageIcon,
  Images,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useMeta } from "@/hooks/useMeta";

const MEETUP_URL = "https://www.meetup.com/aws-sbg-at-hitms/";
const EXPLORE_URL = "https://bit.ly/4vYJOkE";

export default function Index() {
  const HIDE_COMING_NEXT = true;

  useMeta({
    title: "AWS Student Builder Group HITMS | Cloud Builders of Tomorrow",
    description:
      "AWS SBG HITMS is a student-led tech community focused on Cloud, AI & Development to empower future builders.",
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
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, oklch(0.08 0.02 250 / 0.85) 80%)",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background/80 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-background via-background/70 to-transparent pointer-events-none" />

        {/* HUD lines */}
        <div className="absolute inset-0 pointer-events-none">
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
              style={{
                left: o.left,
                top: o.top,
                animationDelay: `${0.6 + i * 0.1}s`,
                animationFillMode: "forwards",
              }}
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
            <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-gradient-primary font-display drop-shadow-[0_3px_24px_rgba(0,0,0,0.7)]">
              AWS
            </span>
            <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground font-display mt-2">
              STUDENT BUILDER GROUP
            </span>
            <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-gradient-primary font-display mt-1">
              HITMS
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 max-w-xl text-sm md:text-base text-foreground/90 tracking-wide px-2"
          >
            AWS SBG HITMS is a student-led tech community focused on Cloud, AI & Development to
            empower future builders.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-8 flex flex-wrap gap-3 justify-center"
          >
            <a
              href="#join"
              data-cursor="DEPLOY"
              className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-bold hover:shadow-[0_0_40px_oklch(0.769_0.165_64.5/0.7)] transition-all hover:-translate-y-0.5 overflow-hidden text-sm md:text-base"
            >
              <span className="relative z-10">Join Our Community</span>
              <ArrowRight
                size={16}
                className="relative z-10 group-hover:translate-x-1 transition"
              />
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 bg-gradient-to-r from-primary-glow to-primary" />
            </a>
          </motion.div>

          {/* Live stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="mt-12 grid grid-cols-3 gap-px max-w-2xl w-full border border-primary/20 rounded-xl overflow-hidden bg-background/40"
          >
            {heroStats.map((s) => (
              <div key={s.l} className="px-3 py-3 sm:px-4 sm:py-4 bg-background/40">
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-gradient-primary">
                  {s.n}
                </div>
                <div className="text-[8px] sm:text-[9px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-foreground/75 mt-1">
                  {s.l}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
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
            <span key={i} className="inline-flex items-center gap-12 text-foreground/75">
              {m}
              <span className="text-primary">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* WHAT WE DO + WHO WE ARE */}
      <section className="relative py-24 px-4 md:px-8 overflow-hidden">
        <div className="relative max-w-7xl mx-auto grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-primary/35 bg-card/95 p-8 md:p-10 shadow-[0_0_45px_rgba(0,0,0,0.18)]"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-primary font-bold mb-3">
              What We Do
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              We turn curiosity into cloud capability.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground/80">
              A welcoming space to learn AWS, build real projects, and grow as cloud builders.
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {whatWeDo.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border/80 bg-background/70 p-4"
                >
                  <div className="mb-3 inline-flex rounded-xl border border-primary/35 bg-primary/10 p-2 text-primary">
                    <item.icon size={18} />
                  </div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/75">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border/80 bg-background/80 p-8 md:p-10"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-primary font-bold mb-3">
              Who We Are
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              A student-led builder community at HITMS.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground/80">
              Learners, mentors, and future cloud professionals, building and growing together.
            </p>

            <div className="mt-6 group relative aspect-video overflow-hidden rounded-2xl border border-border/60">
              <div className="absolute inset-0 scale-100 group-hover:scale-105 transition-transform duration-500">
                <ImageSlot
                  src="https://res.cloudinary.com/txg3hveh/image/upload/v1783966915/team.jpg"
                  label="AWS SBG HITMS team"
                  icon={Users}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
            </div>

            <ul className="mt-6 space-y-3 text-foreground/80">
              {whoWeAre.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card/60 px-4 py-3"
                >
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* WHY JOIN */}
      <section className="relative py-24 px-4 md:px-8 overflow-hidden">
        <FlyingIcons density={0.6} />
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-primary font-bold mb-2">
              Why Join
            </p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              Build. Learn. <span className="text-gradient-primary">Launch.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.08, duration: 0.45, ease: "easeOut" }}
                className="group relative p-7 rounded-2xl bg-card/80 border border-border hover:border-primary/60 overflow-hidden transition-colors hover:-translate-y-1 hover:scale-[1.01] flex flex-col items-center text-center"
              >
                <div
                  className="absolute inset-0 opacity-30 group-hover:opacity-100 transition duration-500"
                  style={{ background: "var(--gradient-hero)" }}
                />
                <div className="absolute -top-px inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition" />
                <div className="relative">
                  <div className="relative mb-5 inline-flex">
                    <div className="relative h-14 w-14 rounded-xl bg-gradient-to-br from-primary/30 to-accent/20 border border-primary/40 grid place-items-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <f.icon size={24} />
                    </div>
                  </div>
                  <h3 className="text-xl font-black mb-2 tracking-tight">{f.title}</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">{f.desc}</p>
                </div>

                <a
                  href={EXPLORE_URL}
                  target="_blank"
                  rel="noreferrer"
                  data-hover
                  className="relative mt-6 inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-primary/10 border border-primary/40 text-primary text-[11px] font-black uppercase tracking-widest hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_25px_oklch(0.769_0.165_64.5/0.5)] transition-all duration-300"
                >
                  <span>Explore</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition" />
                </a>

                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-primary-glow to-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="relative py-24 px-4 md:px-8 overflow-hidden">
        <FlyingIcons density={0.4} />
        <div className="relative max-w-7xl mx-auto">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-primary font-bold mb-2">
                Gallery
              </p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                Moments from the <span className="text-gradient-primary">community.</span>
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-foreground/70">
                Snapshots from workshops, hackathons, and meetups. Drop your photos into the tiles
                below.
              </p>
            </div>

            <Link
              to="/gallery"
              data-hover
              className="group shrink-0 inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-primary/10 border border-primary/40 text-primary text-[11px] font-black uppercase tracking-widest hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_25px_oklch(0.769_0.165_64.5/0.5)] transition-all duration-300"
            >
              <span>View Gallery</span>
              <ArrowRight size={12} className="group-hover:translate-x-1 transition" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] md:auto-rows-[170px] gap-5">
            {galleryItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                data-hover
                className={`group relative overflow-hidden border border-border/70 bg-card/70 transition-all duration-500 hover:-translate-y-2 hover:border-primary/60 hover:shadow-[0_10px_40px_rgba(0,0,0,0.25)] ${item.shape} ${item.span}`}
              >
                <div className="absolute inset-0 scale-105 group-hover:scale-[1.15] transition-transform duration-700">
                  <ImageSlot src={item.src} label={item.label} icon={item.icon} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent opacity-40 transition duration-500" />
              </motion.div>
            ))}
          </div>

          {/* Secondary CTA below the grid for extra visibility on mobile */}
          <div className="mt-8 flex justify-center sm:hidden">
            <Link
              to="/gallery"
              data-hover
              className="group inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-primary/10 border border-primary/40 text-primary text-[11px] font-black uppercase tracking-widest hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_25px_oklch(0.769_0.165_64.5/0.5)] transition-all duration-300"
            >
              <span>View Gallery</span>
              <ArrowRight size={12} className="group-hover:translate-x-1 transition" />
            </Link>
          </div>
        </div>
      </section>

      {!HIDE_COMING_NEXT && (
        <section className="relative py-24 px-4 md:px-8 overflow-hidden">
          <FlyingIcons density={0.4} />
          <div className="relative max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative rounded-3xl border border-primary/35 bg-card/90 overflow-hidden p-10 md:p-16 text-center"
            >
              <div
                className="absolute inset-0 opacity-60 group-hover:opacity-90 transition duration-700"
                style={{ background: "var(--gradient-hero)" }}
              />
              <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />

              <div className="relative">
                <p className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-primary font-bold mb-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  Something's Brewing
                </p>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight max-w-3xl mx-auto">
                  The next workshop, hackathon, or speaker session is being planned,
                  <span className="text-gradient-primary"> right now.</span>
                </h2>
                <p className="mt-4 max-w-xl mx-auto text-base text-foreground/80">
                  We're locking in dates for what's coming next. Join the WhatsApp community to be
                  the first to know the moment it drops, no spam, just updates that matter.
                </p>

                <div className="mt-8 grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
                  {comingNextPillars.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/60 px-4 py-3"
                    >
                      <div className="shrink-0 h-9 w-9 rounded-lg border border-primary/40 bg-primary/10 grid place-items-center text-primary">
                        <item.icon size={16} />
                      </div>
                      <span className="text-sm font-semibold text-foreground/90">{item.label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-9 flex flex-wrap gap-3 justify-center">
                  <a
                    href="https://chat.whatsapp.com/FgyyG0kLNIKIovBwenLagq"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-bold hover:shadow-[0_0_40px_oklch(0.769_0.165_64.5/0.7)] transition"
                  >
                    <Zap size={16} /> Get Notified First
                  </a>
                  <Link
                    to="/events"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-primary/60 text-primary hover:bg-primary/10 transition"
                  >
                    See Past Events <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* PROGRAMS */}
      <section className="relative py-24 px-4 md:px-8 overflow-hidden">
        <FlyingIcons density={0.5} />
        <div className="relative max-w-7xl mx-auto">
          <div className="mb-12 flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-primary font-bold mb-2">
                Programs
              </p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                Hands-on Cloud Curricula
              </h2>
            </div>
            <Link to="/resources" data-hover className="text-sm text-primary hover:underline">
              Explore all →
            </Link>
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent md:-translate-x-1/2" />
            <div className="flex flex-col gap-10 md:gap-16">
              {programs.map((p, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div
                    key={p.tag}
                    className="relative md:grid md:grid-cols-2 md:items-center md:gap-12"
                  >
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
                      <div
                        className="absolute inset-0 opacity-30 group-hover:opacity-70 transition duration-700"
                        style={{ background: "var(--gradient-hero)" }}
                      />
                      <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-primary animate-pulse-ring" />
                      <div className="relative flex items-start gap-4">
                        <div className="shrink-0 h-14 w-14 rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/25 to-accent/20 grid place-items-center text-primary shadow-[0_0_30px_oklch(0.769_0.165_64.5/0.3)] group-hover:scale-110 transition duration-500">
                          <p.icon size={26} strokeWidth={1.6} />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[10px] tracking-[0.25em] uppercase text-primary font-bold">
                            {p.tag}
                          </span>
                          <h3 className="mt-1.5 text-xl md:text-2xl font-black leading-tight text-foreground group-hover:text-gradient-primary transition">
                            {p.title}
                          </h3>
                          <div className="mt-4 flex items-center justify-between gap-4">
                            <p className="text-xs text-foreground/75">{p.meta}</p>
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
            <p className="text-xs tracking-[0.3em] uppercase text-primary font-bold mb-3">
              System Initialization
            </p>
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              Ready to <span className="text-gradient-primary">build the cloud?</span>
            </h2>
            <p className="text-foreground/80 max-w-xl mx-auto mb-8">
              Join our community of student builders across HITMS, becoming architects of tomorrow,
              together.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="https://chat.whatsapp.com/FgyyG0kLNIKIovBwenLagq"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-bold hover:shadow-[0_0_40px_oklch(0.769_0.165_64.5/0.7)] transition"
              >
                <Zap size={16} /> Join WhatsApp
              </a>
              <a
                href={MEETUP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-primary/60 text-primary hover:bg-primary/10 transition"
              >
                <Users size={16} /> Join Meetup
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function ImageSlot({
  src,
  label,
  icon: Icon = ImageIcon,
}: {
  src?: string;
  label: string;
  icon?: typeof ImageIcon;
}) {
  if (src) {
    return <img src={src} alt={label} className="h-full w-full object-cover" loading="lazy" />;
  }
  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary/15 via-card to-accent/10 text-foreground/40 px-3 text-center">
      <Icon size={26} strokeWidth={1.4} />
      <span className="sr-only">{label}</span>
    </div>
  );
}

const features = [
  {
    icon: Cloud,
    title: "AWS Credits & Tools",
    desc: "Exclusive AWS credits, Udemy licenses, and certification vouchers to fuel your projects.",
  },
  {
    icon: Award,
    title: "Certifications",
    desc: "Curated paths and vouchers for Cloud Practitioner, Solutions Architect, and more.",
  },
  {
    icon: Code2,
    title: "Hands-on Projects",
    desc: "Build real apps with S3, Lambda, EC2, DynamoDB, guided by mentors.",
  },
  {
    icon: Cpu,
    title: "AI & Cloud Innovation",
    desc: "Explore AI and cloud-native engineering, from Bedrock to SageMaker.",
  },
  {
    icon: Users,
    title: "Global Network",
    desc: "Connect with 5K+ builders across regions, all in one community.",
  },
  {
    icon: Rocket,
    title: "Builder Culture",
    desc: "Hackathons, workshops, and speaker sessions. Lead, build, ship.",
  },
];

const whatWeDo = [
  {
    icon: Cloud,
    title: "Hands-on AWS learning",
    desc: "Workshops and guided labs that make cloud concepts practical.",
  },
  {
    icon: Code2,
    title: "Real builder projects",
    desc: "Ship real solutions, not just slides and notes.",
  },
  {
    icon: Rocket,
    title: "Mentorship and growth",
    desc: "From first steps to launch, we help you grow.",
  },
  {
    icon: Sparkles,
    title: "Community and visibility",
    desc: "Showcase ideas, get feedback, find new opportunities.",
  },
];

const whoWeAre = [
  "A student-led community focused on AWS, cloud, AI, and innovation.",
  "A safe space for beginners to learn without judgment.",
  "Peers and mentors who grow together, one project at a time.",
];

const comingNextPillars = [
  { icon: Rocket, label: "Hackathons" },
  { icon: Cloud, label: "Workshops" },
  { icon: Sparkles, label: "Speaker Sessions" },
];

const programs = [
  {
    tag: "CLOUD · CORE",
    title: "Building with Amazon Bedrock",
    meta: "8 weeks · Mentored",
    icon: Cpu,
  },
  { tag: "AI · NEW", title: "Innovate-A-Thon 2026", meta: "Live cohort", icon: Rocket },
  { tag: "FUTURE", title: "The Future of Cloud", meta: "Speaker series", icon: Cloud },
  { tag: "SECURITY", title: "Cloud Security Mastery", meta: "Self-paced", icon: Award },
];

const marquee = [
  "Cloud",
  "AI / ML",
  "Serverless",
  "Bedrock",
  "Builders",
  "Hackathons",
  "Certifications",
  "Community",
];

const orbitIcons = [
  { icon: Cloud, label: "S3", left: "6%", top: "30%" },
  { icon: Server, label: "EC2", left: "8%", top: "62%" },
  { icon: Database, label: "DynamoDB", left: "82%", top: "28%" },
  { icon: Cpu, label: "Bedrock", left: "85%", top: "60%" },
  { icon: Network, label: "VPC", left: "16%", top: "78%" },
  { icon: Boxes, label: "ECS", left: "78%", top: "78%" },
];

const heroStats = [
  { n: "500+", l: "Builders" },
  { n: "3+", l: "Events" },
  { n: "5K+", l: "Global Network" },
];

const galleryItems: {
  label: string;
  icon: typeof ImageIcon;
  src?: string;
  shape: string;
  span: string;
}[] = [
  {
    label: "Add photo: Hackathon night",
    icon: Rocket,
    src: "https://res.cloudinary.com/txg3hveh/image/upload/v1783966921/WhatsApp%20Image%202026-07-13%20at%207.31.27%20PM.jpg",
    shape: "rounded-[2rem]",
    span: "col-span-2 row-span-2",
  },
  {
    label: "Add photo: Workshop",
    icon: Cloud,
    src: "https://res.cloudinary.com/txg3hveh/image/upload/v1785261744/meeting_mkrtxv.jpg",
    shape: "rounded-full",
    span: "col-span-1 row-span-1",
  },
  {
    label: "Add photo: Team huddle",
    icon: Users,
    src: "https://res.cloudinary.com/txg3hveh/image/upload/v1783966885/audience.jpg",
    shape: "rounded-2xl",
    span: "col-span-1 row-span-1",
  },
  {
    label: "Add photo: Certification win",
    icon: Award,
    shape: "rounded-3xl",
    src: "https://res.cloudinary.com/txg3hveh/image/upload/v1785262423/member_q1wkcj.jpg",
    span: "col-span-1 row-span-2",
  },
  {
    label: "Add photo: Speaker session",
    icon: Sparkles,
    src: "https://res.cloudinary.com/txg3hveh/image/upload/v1783966919/WhatsApp%20Image%202026-07-13%20at%207.31.27%20PM%20%282%29.jpg",
    shape: "rounded-full",
    span: "col-span-1 row-span-1",
  },
  {
    label: "Add photo: Builder demo",
    icon: Code2,
    src: "https://res.cloudinary.com/txg3hveh/image/upload/v1783966888/brand-asset-logo-76cfb827-20260713T200857.png",
    shape: "rounded-2xl",
    span: "col-span-2 row-span-1",
  },
];
