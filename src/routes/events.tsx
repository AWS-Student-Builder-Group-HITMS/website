import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { useMeta } from "@/hooks/useMeta";
import { Calendar, MapPin, ArrowRight, Instagram, Linkedin, Sparkles, X } from "lucide-react";

const INTRO_INSTAGRAM =
  "https://www.instagram.com/reel/DUf-IfwAdA2/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==";
const INTRO_LINKEDIN =
  "https://www.linkedin.com/posts/aws-student-builder-group-hitms_awsdevelopers-awscloudclubs-hitms-activity-7425653263510724609-qI3x";

export default function Events() {
  useMeta({
    title: "Events & Workshops | AWS SBG HITMS",
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
        "Our very first gathering as AWS Student Builder Group HITMS, held on 6-Feb-2026 (Friday) at 11:00 AM in the HITMS Auditorium. A warm, energetic kickoff where students curious about cloud computing came together to meet the founding team and captain.",
      purpose:
        "The session was designed to introduce the club's vision and lay out the full roadmap for the year, including upcoming workshops, hackathons, and speaker sessions, while also showing students how to get involved across the five squads: Technical, Media, Marketing, Creative, and Events.",
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
      desc: "A flagship online session bringing together builders for a live, interactive deep-dive into modern cloud architectures, UI/UX, and cybersecurity with hands-on challenges and prizes.",
      overview:
        "TechVerse-26 was our flagship online session, held on June 29, 2026, bringing together builders from every discipline for a live, interactive deep-dive into modern cloud architectures. The agenda spanned three focus areas: cloud infrastructure and AWS services, UI/UX design thinking, and cybersecurity fundamentals.",
      purpose:
        "Each focus area was led by a short expert talk followed by hands-on challenges participants solved in real time, with teams competing on a live leaderboard. The goal was to give students a genuine, practical taste of what building in these fields actually feels like, not just theory.",
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
          subtitle="Workshops, hackathons and speaker sessions, designed by students, for students."
        />

        <section className="max-w-7xl mx-auto px-4 md:px-8 pb-24">
          <div className="mb-10 text-center md:text-left">
            <p className="text-[10px] tracking-[0.4em] uppercase text-primary font-bold mb-2 inline-flex items-center gap-2">
              <Sparkles size={12} /> Live Roadmap
            </p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight font-display">
              Featured & Past Events
            </h2>
          </div>

          {/* Event Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {cards.map((e, i) => (
              <motion.article
                key={e.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                data-hover
                onClick={() => setActive(e)}
                className="group relative rounded-2xl border border-primary/25 hover:border-primary/70 bg-gradient-to-br from-card via-card/95 to-background p-0 cursor-pointer shadow-xl hover:shadow-[0_20px_50px_-12px_oklch(0.769_0.165_64.5/0.3)] overflow-hidden backdrop-blur-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-primary/15 blur-3xl group-hover:bg-primary/30 transition-all duration-500 pointer-events-none" />

                <div className="flex flex-col sm:flex-row h-full">
                  {/* Left Banner Image Container — auto-adjusts width to image aspect ratio */}
                  <div className="relative w-full sm:w-auto sm:max-w-[45%] shrink-0 overflow-hidden border-b sm:border-b-0 sm:border-r border-border/50 flex items-center justify-center">
                    {/* Status Badge Overlaid on Banner */}
                    <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-background/90 text-primary border border-primary/40 backdrop-blur-md shadow-lg">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Completed
                    </div>
                    <img
                      src={e.banner}
                      alt={e.title}
                      className="w-full h-auto sm:h-full sm:w-auto max-h-[320px] object-cover sm:object-contain transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Right Info Container */}
                  <div className="flex flex-col justify-between p-5 sm:p-6 bg-card/60 relative flex-1">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-md text-[9px] tracking-[0.2em] uppercase font-black text-primary bg-primary/10 border border-primary/30 inline-flex items-center gap-1">
                          <Sparkles size={10} /> {e.tag}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black tracking-tight font-display mb-2 group-hover:text-primary transition-colors duration-300">
                        {e.title}
                      </h3>
                      <div className="w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-3 shadow-sm" />
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed bg-muted/40 p-3.5 rounded-xl border border-border/50">
                        {e.desc}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 mt-5 pt-4 border-t border-border/60">
                      <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5 bg-muted/60 px-2.5 py-1 rounded-lg border border-border/50">
                          <Calendar size={12} className="text-primary" /> {e.date}
                        </span>
                        <span className="inline-flex items-center gap-1.5 bg-muted/60 px-2.5 py-1 rounded-lg border border-border/50">
                          <MapPin size={12} className="text-primary" /> {e.type}
                        </span>
                      </div>

                      <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-primary group-hover:translate-x-1 transition-transform ml-auto">
                        <span>Explore Story</span>
                        <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground grid place-items-center shadow-md">
                          <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* MORE EVENTS COMING SOON CTA BANNER */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 sm:mt-16 relative overflow-hidden rounded-3xl border border-primary/40 bg-gradient-to-br from-card via-card/90 to-background p-8 md:p-12 shadow-2xl"
          >
            <div className="absolute -top-32 -left-20 h-80 w-80 rounded-full bg-primary/20 blur-3xl animate-pulse" />
            <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-[oklch(0.72_0.13_220/0.25)] blur-3xl" />
            <div className="absolute inset-0 aurora-bg opacity-40 pointer-events-none" />

            <div className="relative grid md:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/40 bg-primary/10 text-[10px] tracking-widest uppercase font-black text-primary mb-4">
                  <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
                  Upcoming Roadmap · 2026
                </div>

                <h3 className="text-2xl md:text-4xl font-black tracking-tight font-display mb-3">
                  More Events & Bootcamps <span className="text-gradient-primary">Coming Soon</span>
                </h3>

                <p className="text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed mb-6">
                  We are cooking up hands-on AWS cloud workshops, AI hackathons, certification
                  cohorts, and live speaker sessions for the HITMS community. Stay connected so you
                  never miss a launch!
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {["Cloud Bootcamps", "AI & LLM Labs", "AWS Certifications", "Hackathons"].map(
                    (pill) => (
                      <span
                        key={pill}
                        className="px-3 py-1 rounded-lg border border-border bg-background/60 text-[11px] font-medium text-foreground/80"
                      >
                        {pill}
                      </span>
                    ),
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
                <a
                  href="https://www.meetup.com/aws-sbg-at-hitms/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest shadow-lg hover:shadow-[0_0_30px_oklch(0.769_0.165_64.5/0.5)] hover:scale-[1.02] transition-all duration-200"
                >
                  <Sparkles size={14} />
                  Join Meetup Community
                </a>
                <a
                  href="/contact"
                  data-hover
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-primary/40 bg-primary/10 text-primary font-black text-xs uppercase tracking-widest hover:bg-primary/20 transition-all duration-200"
                >
                  Get Notified
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </motion.div>
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
