import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { useMeta } from "@/hooks/useMeta";
import { Expand, ImageOff, Sparkles, X } from "lucide-react";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  event: "Introductory Event" | "TechVerse-26";
  caption: string;
  span: string;
}

// NOTE: swap these src URLs with your real Cloudinary event photos
// (same pattern as QR_PATH in Contact.tsx) — placeholders used for layout.
const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "https://picsum.photos/seed/aws-hitms-01/1000/1200",
    alt: "AWS Cloud Club HITMS Introductory Event stage",
    event: "Introductory Event",
    caption: "Kickoff — Vision & Roadmap",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    src: "https://picsum.photos/seed/aws-hitms-02/700/700",
    alt: "Attendees at the Introductory Event",
    event: "Introductory Event",
    caption: "Full House at HITMS Auditorium",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 3,
    src: "https://picsum.photos/seed/aws-hitms-03/700/900",
    alt: "Lucky draw winners",
    event: "Introductory Event",
    caption: "Lucky Draw — $25 AWS Credits",
    span: "md:col-span-1 md:row-span-2",
  },
  {
    id: 4,
    src: "https://picsum.photos/seed/aws-hitms-04/900/600",
    alt: "TechVerse-26 opening session",
    event: "TechVerse-26",
    caption: "TechVerse-26 — Opening Session",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    id: 5,
    src: "https://picsum.photos/seed/aws-hitms-05/700/700",
    alt: "AI development workshop",
    event: "TechVerse-26",
    caption: "AI & Dev Deep-Dive",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 6,
    src: "https://picsum.photos/seed/aws-hitms-06/700/700",
    alt: "Cybersecurity challenge round",
    event: "TechVerse-26",
    caption: "Cybersecurity Challenge",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 7,
    src: "https://picsum.photos/seed/aws-hitms-07/900/600",
    alt: "Certificates and prize distribution",
    event: "Introductory Event",
    caption: "Certificates & Prize Moment",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    id: 8,
    src: "https://picsum.photos/seed/aws-hitms-08/700/700",
    alt: "Group photo of AWS Student Builder Group HITMS",
    event: "TechVerse-26",
    caption: "The Builders — Group Shot",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 9,
    src: "https://picsum.photos/seed/aws-hitms-09/700/900",
    alt: "Registration desk on event day",
    event: "Introductory Event",
    caption: "Sign-Ins at the Desk",
    span: "md:col-span-1 md:row-span-2",
  },
  {
    id: 10,
    src: "https://picsum.photos/seed/aws-hitms-10/700/700",
    alt: "Speaker presenting cloud roadmap",
    event: "Introductory Event",
    caption: "The Full-Stack Blueprint",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 11,
    src: "https://picsum.photos/seed/aws-hitms-11/700/700",
    alt: "Students networking during break",
    event: "Introductory Event",
    caption: "Between Sessions",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 12,
    src: "https://picsum.photos/seed/aws-hitms-12/1000/1200",
    alt: "TechVerse-26 hands-on challenge",
    event: "TechVerse-26",
    caption: "Hands-On Cloud Architecture",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: 13,
    src: "https://picsum.photos/seed/aws-hitms-13/700/700",
    alt: "Interactive Q&A session",
    event: "TechVerse-26",
    caption: "Interactive Q&A",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 14,
    src: "https://picsum.photos/seed/aws-hitms-14/700/700",
    alt: "AWS SBG goodies for quiz winners",
    event: "TechVerse-26",
    caption: "Goodies for the Quiz Winners",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 15,
    src: "https://picsum.photos/seed/aws-hitms-15/900/600",
    alt: "Team huddle before the event",
    event: "Introductory Event",
    caption: "Pre-Event Huddle",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    id: 16,
    src: "https://picsum.photos/seed/aws-hitms-16/700/700",
    alt: "UI/UX mock war session",
    event: "TechVerse-26",
    caption: "UI/UX Mock War",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 17,
    src: "https://picsum.photos/seed/aws-hitms-17/700/900",
    alt: "AI-powered threat detection demo",
    event: "TechVerse-26",
    caption: "AI-Powered Threat Demo",
    span: "md:col-span-1 md:row-span-2",
  },
  {
    id: 18,
    src: "https://picsum.photos/seed/aws-hitms-18/700/700",
    alt: "Attendees receiving e-certificates",
    event: "Introductory Event",
    caption: "E-Certificates Handed Out",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 19,
    src: "https://picsum.photos/seed/aws-hitms-19/700/700",
    alt: "Closing remarks at TechVerse-26",
    event: "TechVerse-26",
    caption: "Closing Remarks",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 20,
    src: "https://picsum.photos/seed/aws-hitms-20/1000/1200",
    alt: "Full team closing group photo",
    event: "Introductory Event",
    caption: "See You Next Time",
    span: "md:col-span-2 md:row-span-2",
  },
];

const filters = ["All", "Introductory Event", "TechVerse-26"] as const;
type Filter = (typeof filters)[number];

export default function Gallery() {
  useMeta({
    title: "Gallery | AWS SBG HITMS",
    description:
      "A look back at AWS Student Builder Group HITMS events — Introductory Event and TechVerse-26 in photos.",
  });

  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [selected, setSelected] = useState<GalleryImage | null>(null);

  const filteredImages = useMemo(
    () =>
      activeFilter === "All"
        ? galleryImages
        : galleryImages.filter((img) => img.event === activeFilter),
    [activeFilter],
  );

  return (
    <Layout>
      <PageHeader
        eyebrow="Moments"
        title="The Gallery"
        subtitle="A visual trail of every session, workshop and win — captured live by the Student Builder Group."
      />

      {/* Orbit divider — signature element: a dashed trail connecting two nodes,
          echoing the "events timeline" nature of the content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 -mt-2 mb-10">
        <div className="relative flex items-center justify-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_12px_oklch(0.769_0.165_64.5/0.8)]" />
          <span className="flex-1 max-w-xs border-t border-dashed border-primary/40" />
          <Sparkles size={14} className="text-primary shrink-0" />
          <span className="flex-1 max-w-xs border-t border-dashed border-[oklch(0.78_0.17_140/0.5)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.78_0.17_140)] shadow-[0_0_12px_oklch(0.78_0.17_140/0.7)]" />
        </div>
      </div>

      {/* Filter Pills — matches Navbar's active-pill treatment */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 mb-10 flex justify-center">
        <div className="inline-flex items-center gap-1 bg-muted/50 p-1.5 rounded-full border border-border/50 backdrop-blur-md shadow-inner">
          {filters.map((f) => {
            const active = activeFilter === f;
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                data-hover
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                  active
                    ? "text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="relative z-10">{f}</span>
                {active && (
                  <motion.div
                    layoutId="activeGalleryFilter"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-primary shadow-sm"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bento Grid */}
      <section className="relative max-w-6xl mx-auto px-4 md:px-8 pb-24">
        {/* Ambient glows, same language as Contact.tsx cards */}
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-[oklch(0.769_0.165_64.5/0.15)] blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -right-20 h-72 w-72 rounded-full bg-[oklch(0.78_0.17_140/0.15)] blur-3xl pointer-events-none" />

        {filteredImages.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-24 text-muted-foreground">
            <ImageOff size={28} />
            <p className="text-sm">No moments here yet.</p>
          </div>
        ) : (
          <div className="relative grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] md:auto-rows-[170px] gap-4 grid-flow-dense">
            {filteredImages.map((img, i) => (
              <motion.button
                key={img.id}
                type="button"
                onClick={() => setSelected(img)}
                data-hover
                data-cursor="VIEW"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 10) * 0.05 }}
                className={`group relative overflow-hidden rounded-2xl border border-border/60 bg-card text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:border-primary/60 transition-colors duration-300 ${img.span}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

                {/* top hairline that lights up on hover */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/0 group-hover:via-primary transition-all duration-500" />

                {/* caption */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-[9px] tracking-[0.25em] uppercase text-primary font-bold mb-1">
                    {img.event}
                  </p>
                  <p className="text-sm font-semibold text-white leading-snug">{img.caption}</p>
                </div>

                {/* expand icon */}
                <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 grid place-items-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                  <Expand size={14} className="text-white" />
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full rounded-2xl overflow-hidden border border-primary/30 bg-card shadow-[0_25px_80px_-20px_oklch(0.769_0.165_64.5/0.5)]"
            >
              <img
                src={selected.src}
                alt={selected.alt}
                className="w-full max-h-[70vh] object-cover"
              />
              <div className="p-6 relative">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-bold mb-1">
                  {selected.event}
                </p>
                <h3 className="text-lg font-black tracking-tight">{selected.caption}</h3>
              </div>

              <button
                onClick={() => setSelected(null)}
                data-hover
                aria-label="Close"
                className="absolute top-3 right-3 h-9 w-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 grid place-items-center text-white hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
