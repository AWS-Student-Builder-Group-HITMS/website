import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { useMeta } from "@/hooks/useMeta";
import { Expand, ImagePlus, Layers, Sparkles, X } from "lucide-react";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

interface GalleryMediaProps {
  src: string;
  alt: string;
  className: string;
  controls?: boolean;
}

function GalleryMedia({ src, alt, className, controls = false }: GalleryMediaProps) {
  const isVideo = /\/video\/upload\/|\.(mp4|webm|ogg)(?:$|\?)/i.test(src);

  if (isVideo) {
    return (
      <video
        src={src}
        aria-label={alt}
        className={className}
        controls={controls}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />
    );
  }

  return <img src={src} alt={alt} className={className} loading="lazy" />;
}

const rawUrls: string[] = [
  "https://res.cloudinary.com/txg3hveh/image/upload/v1786230225/communityday2_vmyp8m.jpg",
  "https://res.cloudinary.com/txg3hveh/image/upload/v1786230225/introductory1_ie2zmy.jpg",
  "https://res.cloudinary.com/txg3hveh/image/upload/v1787930271/WhatsApp_Image_2026-08-24_at_7.15.33_PM_xi9bcb.jpg",
  "https://res.cloudinary.com/txg3hveh/image/upload/v1786231659/speakers_kkdklh.jpg",
  "https://res.cloudinary.com/txg3hveh/image/upload/v1786230224/interview_d8pma8.jpg",
  "https://res.cloudinary.com/txg3hveh/image/upload/v1786230225/introdcutory2_njspnc.jpg",
  "https://res.cloudinary.com/txg3hveh/image/upload/v1786230224/techverse1_pqo13m.jpg",
  "https://res.cloudinary.com/txg3hveh/image/upload/v1786230224/communityday4_z54jsq.jpg",
  "https://res.cloudinary.com/txg3hveh/image/upload/v1786230223/leader_d2lc7y.jpg",
  "https://res.cloudinary.com/txg3hveh/image/upload/v1787930272/WhatsApp_Image_2026-08-24_at_6.49.03_PM_mckble.jpg",
  "https://res.cloudinary.com/txg3hveh/image/upload/v1786230224/communityday5_o3yiuy.jpg",
  "https://res.cloudinary.com/txg3hveh/image/upload/v1787930271/WhatsApp_Image_2026-08-24_at_6.48.51_PM_jsvjzs.jpg",
  "https://res.cloudinary.com/txg3hveh/image/upload/v1786230223/swags_atmn6n.jpg",
  "https://res.cloudinary.com/txg3hveh/image/upload/v1786230223/swags_distribution_b9ajfo.jpg",
  "https://res.cloudinary.com/txg3hveh/image/upload/v1787930272/WhatsApp_Image_2026-08-24_at_6.49.04_PM_ezu7y2.jpg",
  "https://res.cloudinary.com/txg3hveh/image/upload/v1786230223/swag_distribution2_gzhaer.jpg",
  "https://res.cloudinary.com/txg3hveh/image/upload/v1786230223/communityday1_duluol.jpg",
  "https://res.cloudinary.com/txg3hveh/image/upload/v1785261744/meeting_mkrtxv.jpg",
  "https://res.cloudinary.com/txg3hveh/image/upload/v1785262423/member_q1wkcj.jpg",
  "https://res.cloudinary.com/txg3hveh/image/upload/v1783966921/WhatsApp%20Image%202026-07-13%20at%207.31.27%20PM.jpg",
  "https://res.cloudinary.com/txg3hveh/image/upload/v1783966919/WhatsApp%20Image%202026-07-13%20at%207.31.27%20PM%20%282%29.jpg",
  "https://res.cloudinary.com/txg3hveh/image/upload/v1786119989/WhatsApp%20Image%202026-07-13%20at%207.31.27%20PM%20%281%29.jpg",
  "https://res.cloudinary.com/txg3hveh/image/upload/v1783966915/team.jpg",
  "https://res.cloudinary.com/txg3hveh/image/upload/v1783966912/prize.jpg",
  "https://res.cloudinary.com/txg3hveh/image/upload/v1787930272/WhatsApp_Image_2026-08-24_at_6.48.52_PM_duguei.jpg",
  "https://res.cloudinary.com/txg3hveh/video/upload/v1787931490/WhatsApp_Video_2026-08-28_at_8.37.14_PM_yagaft.mp4",
  "https://res.cloudinary.com/txg3hveh/image/upload/v1783966885/audience.jpg",
  "https://res.cloudinary.com/txg3hveh/image/upload/v1786232699/swags2_liw5j4.jpg",
  "https://res.cloudinary.com/txg3hveh/video/upload/v1787932206/WhatsApp_Video_2026-08-24_at_6.48.44_PM_jrlpzh.mp4",
];

const galleryImages: GalleryImage[] = Array.from({ length: 28 }, (_, i) => ({
  id: i + 1,
  src: rawUrls[i] ?? "",
  alt: `AWS SBG HITMS gallery photo ${i + 1}`,
}));

export default function Gallery() {
  useMeta({
    title: "Gallery | AWS SBG HITMS",
    description:
      "A visual trail of every session, workshop and win — captured live by the Student Builder Group.",
  });

  const [selected, setSelected] = useState<GalleryImage | null>(null);
  const [activeTab, setActiveTab] = useState<"hero" | "all" | "grid">("hero");

  const validImages = galleryImages.filter((img) => img.src.trim().length > 0);

  // Split images into two rows for marquee sliding
  const halfLength = Math.ceil(validImages.length / 2);
  const topRowImages = validImages.slice(0, halfLength);
  const bottomRowImages = validImages.slice(halfLength);

  return (
    <Layout>
      <PageHeader
        eyebrow="Moments"
        title="The Gallery"
        subtitle="A visual trail of every session, workshop and win — captured live by the Student Builder Group."
      />

      {/* Top Floating Navigation Buttons */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 mb-8 flex justify-center sm:justify-end">
        <div className="inline-flex p-1.5 rounded-2xl bg-card/90 backdrop-blur-md border border-border/80 shadow-lg gap-1">
          <button
            onClick={() => setActiveTab("hero")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === "hero"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Sparkles size={16} />
            <span>Featured View</span>
          </button>
          <button
            onClick={() => setActiveTab("all")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === "all"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Layers size={16} />
            <span>All Photos</span>
          </button>
          <button
            onClick={() => setActiveTab("grid")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === "grid"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <ImagePlus size={16} />
            <span>Grid View</span>
          </button>
        </div>
      </div>

      {/* Dual Row Continuous Marquee Slider Section */}
      {activeTab === "hero" && (
        <section className="relative max-w-full mx-auto pb-24 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] bg-primary/10 blur-[140px] pointer-events-none rounded-full" />

          <div className="flex flex-col gap-6 py-6 overflow-hidden">
            {/* Top Row: Sliding Left */}
            <div className="relative w-full overflow-hidden flex">
              <motion.div
                className="flex gap-4 shrink-0"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: 35,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {[...topRowImages, ...topRowImages].map((img, idx) => (
                  <div
                    key={`top-${img.id}-${idx}`}
                    onClick={() => setSelected(img)}
                    className="relative h-56 w-72 sm:h-64 sm:w-80 rounded-2xl overflow-hidden border border-border/80 bg-card cursor-pointer group shadow-xl shrink-0 transition-all duration-300 hover:scale-105 hover:border-primary hover:shadow-[0_0_25px_rgba(var(--primary),0.3)]"
                  >
                    <GalleryMedia
                      src={img.src}
                      alt={img.alt}
                      className="absolute inset-0 h-full w-full object-cover bg-black/60 group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-white text-xs font-medium bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 shadow-lg">
                        <Expand size={12} /> Preview
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Bottom Row: Sliding Right */}
            <div className="relative w-full overflow-hidden flex">
              <motion.div
                className="flex gap-4 shrink-0"
                animate={{ x: ["-50%", "0%"] }}
                transition={{
                  duration: 35,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {[...bottomRowImages, ...bottomRowImages].map((img, idx) => (
                  <div
                    key={`bottom-${img.id}-${idx}`}
                    onClick={() => setSelected(img)}
                    className="relative h-56 w-72 sm:h-64 sm:w-80 rounded-2xl overflow-hidden border border-border/80 bg-card cursor-pointer group shadow-xl shrink-0 transition-all duration-300 hover:scale-105 hover:border-primary hover:shadow-[0_0_25px_rgba(var(--primary),0.3)]"
                  >
                    <GalleryMedia
                      src={img.src}
                      alt={img.alt}
                      className="absolute inset-0 h-full w-full object-cover bg-black/60 group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-white text-xs font-medium bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 shadow-lg">
                        <Expand size={12} /> Preview
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* All Photos View */}
      {activeTab === "all" && (
        <section className="relative max-w-6xl mx-auto px-4 md:px-8 pb-24">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-semibold tracking-tight">
              All Captured Moments ({validImages.length} Photos)
            </h3>
          </div>

          <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {galleryImages.map((img, i) => {
              const hasImage = img.src.trim().length > 0;
              return (
                <motion.button
                  key={img.id}
                  type="button"
                  onClick={() => hasImage && setSelected(img)}
                  disabled={!hasImage}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: (i % 12) * 0.02 }}
                  className={`group relative overflow-hidden rounded-2xl border bg-card text-left shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all duration-300 aspect-square ${
                    hasImage
                      ? "border-border/60 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 cursor-pointer"
                      : "border-dashed border-border/40 hover:border-primary/40 cursor-default"
                  }`}
                >
                  {hasImage ? (
                    <>
                      <GalleryMedia
                        src={img.src}
                        alt={img.alt}
                        className="absolute inset-0 h-full w-full object-cover bg-black/50 group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 grid place-items-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                        <Expand size={14} className="text-white" />
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted/20 group-hover:bg-primary/5 transition-colors duration-300">
                      <ImagePlus
                        size={22}
                        className="text-muted-foreground/30 group-hover:text-primary/50 transition-colors"
                      />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </section>
      )}

      {/* Grid View */}
      {activeTab === "grid" && (
        <section className="relative max-w-6xl mx-auto px-4 md:px-8 pb-24">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-semibold tracking-tight">
              Comfortable Grid View ({validImages.length} Photos)
            </h3>
          </div>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((img, i) => {
              const hasImage = img.src.trim().length > 0;
              return (
                <motion.button
                  key={img.id}
                  type="button"
                  onClick={() => hasImage && setSelected(img)}
                  disabled={!hasImage}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: (i % 12) * 0.02 }}
                  className={`group relative overflow-hidden rounded-2xl border bg-card text-left shadow-md focus:outline-none transition-all duration-300 aspect-[4/3] ${
                    hasImage
                      ? "border-border/60 hover:border-primary/60 hover:shadow-xl cursor-pointer"
                      : "border-dashed border-border/40 cursor-default"
                  }`}
                >
                  {hasImage ? (
                    <>
                      <GalleryMedia
                        src={img.src}
                        alt={img.alt}
                        className="absolute inset-0 h-full w-full object-cover bg-black/50 group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-white text-xs font-medium bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                          <Expand size={12} /> View Large
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
                      <ImagePlus size={22} className="text-muted-foreground/30" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </section>
      )}

      {/* Lightbox / Preview Modal */}
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
              className="relative max-w-4xl w-full rounded-2xl overflow-hidden border border-primary/30 bg-card shadow-2xl flex items-center justify-center p-2"
            >
              <GalleryMedia
                src={selected.src}
                alt={selected.alt}
                className="max-h-[85vh] w-auto max-w-full object-contain rounded-xl"
                controls={/\/video\/upload\/|\.(mp4|webm|ogg)(?:$|\?)/i.test(selected.src)}
              />
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute top-4 right-4 h-9 w-9 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 grid place-items-center text-white hover:bg-primary hover:text-primary-foreground transition-colors z-10"
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
