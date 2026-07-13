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
  MessageCircle,
  Sparkles,
  Clock,
  Globe,
  X,
  Eye,
} from "lucide-react";

const WHATSAPP_URL = "https://chat.whatsapp.com/FgyyG0kLNIKIovBwenLagq";
const INTRO_INSTAGRAM =
  "https://www.instagram.com/reel/DUf-IfwAdA2/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==";
const INTRO_LINKEDIN =
  "https://www.linkedin.com/posts/aws-student-builder-group-hitms_awsdevelopers-awscloudclubs-hitms-activity-7425653263510724609-qI3x";
const TECHVERSE_INSTAGRAM =
  "https://www.instagram.com/reel/Ct0g8k7v6rA/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==";
const TECHVERSE_LINKEDIN =
  "https://www.linkedin.com/posts/aws-student-builder-group-hitms_awsdevelopers-awscloudclubs-hitms-activity-7425653263510724609-qI3x";

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
          color: "from-[oklch(0.65_0.22_25)] to-[oklch(0.55_0.22_280)] text-white shadow-md",
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
          color: "from-[oklch(0.65_0.22_25)] to-[oklch(0.55_0.22_280)] text-white shadow-md",
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
      id: "online-session-tba",
      tag: "ONLINE SESSION",
      title: "Title To Be Announced",
      desc: "A hands-on online session with expert builders exploring Cloud Services & Serverless. Full details and speaker lineup drops soon on our WhatsApp.",
      date: "TBA",
      type: "Online Session",
      isTba: true,
      links: [
        {
          label: "Join WhatsApp",
          url: WHATSAPP_URL,
          icon: MessageCircle,
          color: "bg-emerald-600 text-white",
        },
      ],
    },
    {
      id: "cloud-workshop-tba",
      tag: "WORKSHOP",
      title: "Title To Be Announced",
      desc: "An intensive building workshop focusing on deploying application stacks and scaling with AWS resources. Mark your calendars!",
      date: "TBA",
      type: "TBA",
      isTba: true,
      links: [
        {
          label: "Join WhatsApp",
          url: WHATSAPP_URL,
          icon: MessageCircle,
          color: "bg-emerald-600 text-white",
        },
      ],
    },
  ];

  /* Only addition: which event's blog-style detail page is currently open */
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

        {/* 4 EQUAL SIZED CARDS GRID */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 pb-24 pt-8">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-primary font-bold mb-2 inline-flex items-center gap-2">
                <Sparkles size={12} /> Live Roadmap
              </p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight font-display">
                Featured & Upcoming Events
              </h2>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              data-hover
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-primary text-primary-foreground font-bold hover:shadow-[0_0_40px_oklch(0.769_0.165_64.5/0.7)] transition"
            >
              <MessageCircle size={14} /> Join WhatsApp for Updates
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((e, i) => (
              <motion.article
                key={e.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
                data-hover
                className="group relative flex flex-col justify-between rounded-2xl border border-border bg-card overflow-hidden p-6 preserve-3d perspective-1000 shine-sweep h-full min-h-[380px]"
              >
                <div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.769_0.165_64.5/0.08)] via-transparent to-[oklch(0.72_0.13_220/0.08)] opacity-50 group-hover:opacity-100 transition duration-500" />
                  <div className="absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl group-hover:bg-primary/35 transition duration-700" />
                  <div className="absolute -top-px inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

                  <div className="relative flex items-start justify-between mb-4">
                    <span className="text-[9px] tracking-[0.25em] uppercase font-bold text-primary">
                      {e.tag}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        e.isTba
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      }`}
                    >
                      {e.isTba ? "TBA" : "Active"}
                    </span>
                  </div>

                  <h3 className="relative text-xl font-black tracking-tight font-display mt-2 group-hover:text-gradient-primary transition min-h-[56px] flex items-center">
                    {e.title}
                  </h3>
                  <p className="relative text-xs text-muted-foreground mt-3 line-clamp-4 leading-relaxed">
                    {e.desc}
                  </p>
                </div>

                <div className="relative mt-6 pt-4 border-t border-border/60">
                  <div className="flex flex-col gap-2 mb-4 text-[10px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={11} className="text-primary" /> {e.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={11} className="text-primary" /> {e.type}
                    </span>
                  </div>

                  {/* View button — only for events that already have a full story (not for "coming soon" TBA cards) */}
                  {!e.isTba && (
                    <button
                      onClick={() => setActive(e)}
                      data-hover
                      className="w-full mb-2 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md border border-primary/40 bg-primary/10 text-[10px] font-bold uppercase tracking-wider text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                    >
                      <Eye size={12} /> View
                    </button>
                  )}

                  <div className="flex flex-col gap-2">
                    {e.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md font-bold text-[10px] transition duration-300 ${link.color}`}
                      >
                        <link.icon size={11} />
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-primary-glow to-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              </motion.article>
            ))}
          </div>
        </section>
      </Layout>

      <AnimatePresence>
        {active && <EventDetailPage event={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Blog-style detail page — collage layout: content on the left, an
   overlapping photo cluster on the right (same visual idea as the
   reference), but using the site's existing color theme throughout. */

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
  isTba?: boolean;
  images?: string[];
  links: { label: string; url: string; icon: typeof Instagram; color: string }[];
};

/* Placeholder collage images — swap these for real Cloudinary URLs later,
   the shapes/sizes/positions below are already fixed so nothing else needs to change. */
const collagePlaceholders = [
  "https://placehold.co/300x300/1a1a1a/e2b93b?text=1",
  "https://placehold.co/260x340/1a1a1a/e2b93b?text=2",
  "https://placehold.co/300x220/1a1a1a/e2b93b?text=3",
  "https://placehold.co/240x240/1a1a1a/e2b93b?text=4",
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
    <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
      <div className={imageSide === "left" ? "md:order-1" : "md:order-2"}>
        <div className="rounded-xl overflow-hidden border border-border shadow-lg">
          <img src={image} alt={alt} className="block w-full h-auto" />
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
        {/* ambient background — same visual language as the rest of the site */}
        <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full blur-3xl opacity-30 pointer-events-none bg-primary/40" />
        <div className="absolute -bottom-40 -right-24 h-[26rem] w-[26rem] rounded-full blur-3xl opacity-20 pointer-events-none bg-[oklch(0.72_0.13_220/0.4)]" />
        <div className="absolute inset-0 aurora-bg opacity-15 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

        {/* nav */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 md:px-10 py-4 backdrop-blur bg-background/60 border-b border-border/60">
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
          {/* Hero — title, tag, meta, links */}
          <div className="max-w-2xl mb-12 md:mb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] tracking-[0.3em] uppercase font-black text-primary">
                {event.tag}
              </span>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                  event.isTba
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                }`}
              >
                {event.isTba ? "TBA" : "Active"}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-display leading-[1.05] mb-5">
              <span className="text-gradient-primary">{event.title}</span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
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

          {/* Overview / Purpose / Outcome — each a distinct section, image and text alternating sides */}
          <div className="space-y-14 md:space-y-20">
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
