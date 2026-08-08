import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { useMeta } from "@/hooks/useMeta";
import { Expand, ImagePlus, Sparkles, X } from "lucide-react";

interface GalleryImage {
  id: number;
  src: string; // paste your Cloudinary image URL here — leave "" to keep the empty slot
  alt: string;
  span: string;
}

// Repeating bento pattern for a premium, non-uniform grid
const spanPattern = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-2",
  "md:col-span-1 md:row-span-1",
  "md:col-span-2 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-2",
  "md:col-span-1 md:row-span-1",
];

// TOTAL: 30 slots, all empty for now — paste real Cloudinary URLs into `src` as they come.
const galleryImages: GalleryImage[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  src: "",
  alt: `AWS SBG HITMS gallery photo ${i + 1}`,
  span: spanPattern[i % spanPattern.length],
}));

export default function Gallery() {
  useMeta({
    title: "Gallery | AWS SBG HITMS",
    description:
      "A look back at AWS Student Builder Group HITMS moments — workshops, sessions and community, in photos.",
  });

  const [selected, setSelected] = useState<GalleryImage | null>(null);

  return (
    <Layout>
      <PageHeader
        eyebrow="Moments"
        title="The Gallery"
        subtitle="A visual trail of every session, workshop and win — captured live by the Student Builder Group."
      />

      {/* Orbit divider — signature element */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 -mt-2 mb-12">
        <div className="relative flex items-center justify-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_12px_oklch(0.769_0.165_64.5/0.8)]" />
          <span className="flex-1 max-w-xs border-t border-dashed border-primary/40" />
          <Sparkles size={14} className="text-primary shrink-0" />
          <span className="flex-1 max-w-xs border-t border-dashed border-[oklch(0.78_0.17_140/0.5)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.78_0.17_140)] shadow-[0_0_12px_oklch(0.78_0.17_140/0.7)]" />
        </div>
      </div>

      {/* Bento Grid */}
      <section className="relative max-w-6xl mx-auto px-4 md:px-8 pb-24">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-[oklch(0.769_0.165_64.5/0.15)] blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -right-20 h-72 w-72 rounded-full bg-[oklch(0.78_0.17_140/0.15)] blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] md:auto-rows-[170px] gap-4 grid-flow-dense">
          {galleryImages.map((img, i) => {
            const hasImage = img.src.trim().length > 0;
            return (
              <motion.button
                key={img.id}
                type="button"
                onClick={() => hasImage && setSelected(img)}
                disabled={!hasImage}
                data-hover={hasImage ? true : undefined}
                data-cursor={hasImage ? "VIEW" : undefined}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 10) * 0.04 }}
                className={`group relative overflow-hidden rounded-2xl border bg-card text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors duration-300 ${
                  img.span
                } ${
                  hasImage
                    ? "border-border/60 hover:border-primary/60 cursor-pointer"
                    : "border-dashed border-border/40 hover:border-primary/40 cursor-default"
                }`}
              >
                {hasImage ? (
                  <>
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/0 group-hover:via-primary transition-all duration-500" />
                    <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 grid place-items-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                      <Expand size={14} className="text-white" />
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted/20 group-hover:bg-primary/5 transition-colors duration-300">
                    <ImagePlus
                      size={22}
                      className="text-muted-foreground/30 group-hover:text-primary/50 transition-colors duration-300"
                    />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
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
                className="w-full max-h-[80vh] object-cover"
              />
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
