import { motion } from "framer-motion";
import logo from "@/assets/aws-hitms-logo.jpeg";
import { Hero3D } from "@/components/Hero3D"; // apna actual path check kar lein

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative min-h-[60vh] mask-b-from-90% mask-b-to-100% items-center flex pt-25 overflow-hidden">
      {/* Same background as hero */}
      <Hero3D />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

      <div className="relative max-w-5xl mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/40 blur-2xl rounded-full" />
            <img src={logo} alt="logo" className="relative h-16 w-16 rounded-lg animate-float-3d" />
          </div>
        </motion.div>

        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-bold"
          >
            {eyebrow}
          </motion.p>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-black tracking-tight"
        >
          {title.split(" ").map((w, i) => (
            <span key={i} className={i % 2 ? "text-gradient-primary" : ""}>
              {w}{" "}
            </span>
          ))}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
