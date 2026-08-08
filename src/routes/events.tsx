import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { useMeta } from "@/hooks/useMeta";
import {
  Calendar,
  MapPin,
  ArrowRight,
  Instagram,
  Linkedin,
  Sparkles,
  X,
  MessageCircle,
} from "lucide-react";

const INTRO_INSTAGRAM =
  "https://www.instagram.com/reel/DUf-IfwAdA2/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==";
const INTRO_LINKEDIN =
  "https://www.linkedin.com/posts/aws-student-builder-group-hitms_awsdevelopers-awscloudclubs-hitms-activity-7425653263510724609-qI3x";
const WHATSAPP_URL = "https://chat.whatsapp.com/FgyyG0kLNIKIovBwenLagq";
const MEETUP_URL = "https://www.meetup.com/aws-sbg-at-hitms/";

export default function Events() {
  useMeta({
    title: "Events & Workshops — AWS SBG HITMS",
    description:
      "Hands-on workshops, hackathons, speaker sessions and bootcamps from AWS Student Builder Group HITMS.",
  });

  const cards = [
    {
      id: "intro",
      tag: "INTRODUCTORY MEETUP",
      title: "Introductory Event",
      desc: "An introduction to our vision, roadmap, and opportunities in cloud computing. 6-Feb-2026 (Friday) · 11:00 AM · HITMS Auditorium.",
      overview:
        "Our very first gathering as AWS Student Builder Group HITMS — held on 6-Feb-2026 (Friday) at 11:00 AM in the HITMS Auditorium. A warm, energetic kickoff where students curious about cloud computing came together to meet the founding team and captain.",
      purpose:
        "The session was designed to introduce the club's vision and lay out the full roadmap for the year, including upcoming workshops, hackathons, and speaker sessions — while also showing students how to get involved across the five squads: Technical, Media, Marketing, Creative, and Events.",
      outcome:
        "Attendees left with a clear picture of what the year ahead looks like, direct access to team leads through a live Q&A, and a preview of TechVerse-26. The event closed with sign-ups for the WhatsApp community, setting the tone for everything AWS SBG HITMS has built since.",
      date: "6 Feb 2026 · 11:00 AM",
      type: "HITMS Auditorium",
      banner: "https://res.cloudinary.com/txg3hveh/image/upload/v1783966897/introductory.jpg",
      images: [
        "https://res.cloudinary.com/txg3hveh/image/upload/v1783966897/introductory.jpg",
        "https://res.cloudinary.com/txg3hveh/image/upload/v1783966890/captain_speech.jpg",
        "https://res.cloudinary.com/txg3hveh/image/upload/v1783966885/audience.jpg",
      ],
      links: [
        {
          label: "Instagram",
          url: INTRO_INSTAGRAM,
          icon: Instagram,
          color:
            "bg-gradient-to-r from-[oklch(0.65_0.22_25)] to-[oklch(0.55_0.22_280)] text-white shadow-md",
        },
        {
          label: "LinkedIn",
          url: INTRO_LINKEDIN,
          icon: Linkedin,
          color: "bg-[#0a66c2] text-white",
        },
      ],
    },
    {
      id: "techverse",
      tag: "FEATURED EVENT",
      title: "TechVerse-26",
      desc: "A flagship online session bringing together builders for a live, interactive deep-dive into modern cloud architectures, UI/UX, and cybersecurity — with hands-on challenges and prizes.",
      overview:
        "TechVerse-26 was our flagship online session, held on June 29, 2026, bringing together builders from every discipline for a live, interactive deep-dive into modern cloud architectures. The agenda spanned three focus areas — cloud infrastructure and AWS services, UI/UX design thinking, and cybersecurity fundamentals.",
      purpose:
        "Each focus area was led by a short expert talk followed by hands-on challenges participants solved in real time, with teams competing on a live leaderboard. The goal was to give students a genuine, practical taste of what building in these fields actually feels like — not just theory.",
      outcome:
        "Prizes were awarded to the top-performing teams, and the session opened up honest conversations about building a long-term career in the digital age, mentorship, and contributing to real AWS projects through the Student Builder Group. The recording and resources were shared afterward with the full community.",
      date: "June 29, 2026",
      type: "Online Session",
      banner: "https://res.cloudinary.com/txg3hveh/image/upload/v1783966911/overview.jpg",
      images: [
        "https://res.cloudinary.com/txg3hveh/image/upload/v1783966911/overview.jpg",
        "https://res.cloudinary.com/txg3hveh/image/upload/v1783966913/session.jpg",
        "https://res.cloudinary.com/txg3hveh/image/upload/v1783966912/prize.jpg",
      ],
      links: [
        {
          label: "Instagram",
          url: INTRO_INSTAGRAM,
          icon: Instagram,
          color:
            "bg-gradient-to-r from-[oklch(0.65_0.22_25)] to-[oklch(0.55_0.22_280)] text-white shadow-md",
        },
        {
          label: "LinkedIn",
          url: INTRO_LINKEDIN,
          icon: Linkedin,
          color: "bg-[#0a66c2] text-white",
        },
      ],
    },
  ];

  const [active, setActive] = useState<(typeof cards)[number] | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <>
      <Layout>
        <PageHeader
          eyebrow="Events"
          title="Events That Build Builders"
          subtitle="Workshops, hackathons and speaker sessions — designed by students, for students."
        />

        <section className="max-w-3xl mx-auto px-4 md:px-8 pb-24 pt-8">
          <div className="mb-12 text-center md:text-left">
            <p className="text-[10px] tracking-[0.4em] uppercase text-primary font-bold mb-2 inline-flex items-center gap-2">
              <Sparkles size={12} /> Live Roadmap
            </p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight font-display">
              Featured & Upcoming Events
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-10">
            {cards.map((e, i) => (
              <motion.article
                key={e.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                data-hover
                onClick={() => setActive(e)}
                className="group relative rounded-[2.5rem] border border-border/80 bg-card p-0 cursor-pointer shadow-2xl overflow-hidden backdrop-blur-md transition-all duration-300 hover:border-primary/55"
              >
                <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl group-hover:bg-primary/20 transition-all duration-500 pointer-events-none" />

                <div className="flex flex-col">
                  {/* Banner Image Container */}
                  <div className="relative w-full overflow-hidden bg-muted/20 border-b border-border/40 flex items-center justify-center">
                    <img
                      src={e.banner}
                      alt={e.title}
                      className="w-full h-auto object-contain transition duration-700 group-hover:scale-[1.01]"
                    />
                  </div>

                  {/* Content Container with Highlighted Description Box */}
                  <div className="flex flex-col justify-between p-6 md:p-8 bg-card relative">
                    <div>
                      <h3 className="text-2xl md:text-4xl font-black tracking-tight font-display mb-3 group-hover:text-primary transition-colors duration-300">
                        {e.title}
                      </h3>
                      <div className="w-12 h-1 bg-primary rounded-full mb-4 shadow-sm" />
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed bg-muted/30 p-4 rounded-xl border border-border/40">
                        {e.desc}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-border/60">
                      <div className="flex flex-wrap gap-4 text-xs font-semibold text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-lg border border-border/50">
                          <Calendar size={14} className="text-primary" /> {e.date}
                        </span>
                        <span className="inline-flex items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-lg border border-border/50">
                          <MapPin size={14} className="text-primary" /> {e.type}
                        </span>
                      </div>

                      <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary group-hover:translate-x-1 transition-transform">
                        <span>Explore Story</span>
                        <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground grid place-items-center shadow-md">
                          <ArrowRight size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}

            {/* UPCOMING EVENT CARD — no image, community CTA */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: cards.length * 0.1 }}
              className="group relative rounded-[2.5rem] border border-primary/40 bg-card p-0 overflow-hidden shadow-2xl backdrop-blur-md"
            >
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[oklch(0.35_0.15_150/0.3)] blur-3xl pointer-events-none" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

              <div className="relative flex flex-col items-center text-center p-8 md:p-14">
                <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase font-black text-primary mb-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  Upcoming Event
                </span>

                <h3 className="text-2xl md:text-4xl font-black tracking-tight font-display mb-4">
                  Something's <span className="text-gradient-primary">Brewing</span>
                </h3>

                <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl bg-muted/30 p-4 rounded-xl border border-border/40">
                  We're locking in dates for the next workshop, hackathon, or speaker session. Join
                  our community to be the first to know the moment it drops — no spam, just updates
                  that matter.
                </p>

                <div className="w-12 h-1 bg-primary rounded-full my-6" />

                <p className="text-xs font-bold uppercase tracking-widest text-foreground/70 mb-4">
                  Join Our Community
                </p>

                <div className="flex flex-wrap gap-3 justify-center">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    data-hover
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-bold hover:shadow-[0_0_40px_oklch(0.769_0.165_64.5/0.7)] transition"
                  >
                    <MessageCircle size={16} /> Join WhatsApp
                  </a>
                  <a
                    href={MEETUP_URL}
                    target="_blank"
                    rel="noreferrer"
                    data-hover
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-primary/60 text-primary hover:bg-primary/10 transition"
                  >
                    <Calendar size={16} /> Join Meetup
                  </a>
                </div>
              </div>
            </motion.article>
          </div>
        </section>
      </Layout>

      <AnimatePresence>
        {active && <EventDetailPage event={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </>
  );
}

type EventCard = {
  id: string;
  tag: string;
  title: string;
  desc: string;
  date: string;
  type: string;
  overview?: string;
  purpose?: string;
  outcome?: string;
  banner?: string;
  images?: string[];
  links: { label: string; url: string; icon: typeof Instagram; color: string }[];
};

const collagePlaceholders = [
  "https://placehold.co/300x300/1a1a1a/e2b93b?text=1",
  "https://placehold.co/260x340/1a1a1a/e2b93b?text=2",
  "https://placehold.co/300x220/1a1a1a/e2b93b?text=3",
];

function StorySection({
  eyebrow,
  text,
  image,
  alt,
  imageSide,
}: {
  eyebrow: string;
  text: string;
  image: string;
  alt: string;
  imageSide: "left" | "right";
}) {
  return (
    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
      <div className={imageSide === "left" ? "md:order-1" : "md:order-2"}>
        <div className="rounded-2xl overflow-hidden border border-border/80 shadow-2xl bg-card">
          <img
            src={image}
            alt={alt}
            className="block w-full h-auto object-cover hover:scale-105 transition duration-500"
          />
        </div>
      </div>
      <div className={imageSide === "left" ? "md:order-2" : "md:order-1"}>
        <p className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.3em] uppercase text-primary font-black mb-3">
          <Sparkles size={12} /> {eyebrow}
        </p>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function EventDetailPage({ event, onClose }: { event: EventCard; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-y-auto bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full flex flex-col overflow-hidden"
      >
        <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full blur-3xl opacity-30 pointer-events-none bg-primary/40" />
        <div className="absolute -bottom-40 -right-24 h-[26rem] w-[26rem] rounded-full blur-3xl opacity-20 pointer-events-none bg-[oklch(0.72_0.13_220/0.4)]" />
        <div className="absolute inset-0 aurora-bg opacity-15 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

        <div className="sticky top-0 z-25 flex items-center justify-between px-4 sm:px-6 md:px-10 py-4 backdrop-blur bg-background/80 border-b border-border/60">
          <button
            onClick={onClose}
            data-hover
            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full border border-border bg-background/80 backdrop-blur text-[10px] tracking-widest uppercase font-bold hover:border-primary hover:text-primary transition"
          >
            <ArrowRight size={14} className="rotate-180" /> Back To Events
          </button>
          <button
            onClick={onClose}
            data-hover
            className="h-10 w-10 grid place-items-center rounded-full border border-border bg-background/80 backdrop-blur hover:border-primary hover:text-primary transition"
          >
            <X size={18} />
          </button>
        </div>

        <div className="relative flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-10 py-10 md:py-14">
          <div className="max-w-3xl mb-12 md:mb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] tracking-[0.3em] uppercase font-black text-primary">
                {event.tag}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Active
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight font-display leading-[1.05] mb-5">
              <span className="text-gradient-primary">{event.title}</span>
            </h1>

            <p className="text-base md:text-xl text-muted-foreground leading-relaxed mb-6">
              {event.desc}
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
              <span className="inline-flex items-center gap-2">
                <Calendar size={14} className="text-primary" /> {event.date}
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin size={14} className="text-primary" /> {event.type}
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              {event.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  data-hover
                  className={`inline-flex items-center gap-1.5 px-5 py-3 rounded-md font-bold text-[11px] uppercase tracking-wider transition duration-300 ${link.color}`}
                >
                  <link.icon size={13} />
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-16 md:space-y-24">
            {event.overview && (
              <StorySection
                eyebrow="Overview"
                text={event.overview}
                image={event.images?.[0] ?? collagePlaceholders[0]}
                alt={`${event.title} overview`}
                imageSide="left"
              />
            )}
            {event.purpose && (
              <StorySection
                eyebrow="Purpose"
                text={event.purpose}
                image={event.images?.[1] ?? collagePlaceholders[1]}
                alt={`${event.title} purpose`}
                imageSide="right"
              />
            )}
            {event.outcome && (
              <StorySection
                eyebrow="Outcome"
                text={event.outcome}
                image={event.images?.[2] ?? collagePlaceholders[2]}
                alt={`${event.title} outcome`}
                imageSide="left"
              />
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-primary-glow to-accent" />
      </motion.div>
    </motion.div>
  );
}
