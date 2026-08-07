import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import {
  BookOpen,
  Code2,
  GraduationCap,
  Wrench,
  Cloud,
  ShieldAlert,
  ExternalLink,
  QrCode,
  ArrowUpRight,
} from "lucide-react";
import { useMeta } from "@/hooks/useMeta";

export default function Resources() {
  useMeta({
    title: "Resources & Learning Paths | AWS SBG HITMS",
    description:
      "Curated AWS learning paths, labs, certification prep and tools for student builders.",
  });

  return (
    <Layout>
      <PageHeader
        eyebrow="Learn · Build · Ship"
        title="Resources For Cloud Builders"
        subtitle="Curated curricula, hands-on labs and exclusive perks for AWS SBG HITMS members. No prior AWS experience required, just curiosity."
      />

      {/* Featured hero card — AWS Builder Center */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden border-2 border-amber-400/60 bg-card shadow-xl shadow-amber-400/20 ring-4 ring-amber-300/10"
        >
          {/* yellow ambient glow surround */}
          <motion.div
            className="absolute -top-28 -right-20 h-80 w-80 rounded-full bg-amber-400/30 blur-3xl"
            animate={{ opacity: [0.4, 0.85, 0.4] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-yellow-300/25 blur-3xl"
            animate={{ opacity: [0.6, 0.3, 0.6] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-amber-300/10 blur-3xl"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* glowing border ring */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-amber-400"
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative grid lg:grid-cols-[1.6fr_auto] gap-10 items-center p-8 md:p-12 lg:p-14">
            {/* Left: content */}
            <div>
              <div className="h-16 w-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shadow-sm mb-6">
                <Code2 size={30} strokeWidth={2} />
              </div>

              <span className="text-[11px] tracking-[0.3em] uppercase font-bold text-primary">
                Builder Center
              </span>

              <h2 className="text-3xl md:text-4xl font-extrabold mt-2 leading-tight">
                Start here | AWS Builder Center
              </h2>

              <p className="text-muted-foreground mt-4 leading-relaxed max-w-xl text-[15px]">
                Access beginner-friendly learning paths, practical hands-on labs, AWS credits, live
                workshops, and active community events, all with no credit card required.
              </p>

              <a
                href="https://bit.ly/4vYJOkE"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground font-semibold text-sm py-3 px-6 hover:opacity-90 hover:gap-3 transition-all shadow-md"
              >
                Explore Builder Center
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </a>
            </div>

            {/* Right: QR code panel */}
            <div className="flex flex-col items-center justify-self-center">
              <div className="relative bg-white rounded-2xl p-4 shadow-xl border border-border">
                <img
                  src="https://res.cloudinary.com/txg3hveh/image/upload/v1786036257/WhatsApp_Image_2026-08-05_at_11.17.45_PM_c44cce.jpg"
                  alt="Scan to open AWS Builder Center"
                  className="h-40 w-40 md:h-44 md:w-44 rounded-lg object-cover"
                />
              </div>
              <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase font-bold text-primary">
                <QrCode size={13} strokeWidth={2.4} />
                Scan to open
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Remaining resources grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-10 pb-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {resources.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ y: -6 }}
            className="group relative p-6 rounded-xl border border-border bg-card overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl group-hover:bg-primary/30 transition" />
            <div className="relative">
              <div className="h-14 w-14 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition shrink-0">
                <r.icon size={26} strokeWidth={2} />
              </div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-primary font-bold">
                {r.tag}
              </span>

              <h3 className="text-xl font-bold mt-2">
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary underline decoration-primary/40 underline-offset-4 inline-flex items-center flex-wrap gap-x-2 gap-y-1 transition-colors"
                >
                  <span>{r.title}</span>
                  <ExternalLink
                    size={16}
                    strokeWidth={2.2}
                    className="opacity-70 group-hover:opacity-100 transition-opacity shrink-0"
                  />
                </a>
              </h3>

              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                {r.renderDesc ? r.renderDesc() : r.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </section>
    </Layout>
  );
}

const resources = [
  {
    icon: Cloud,
    tag: "SKILL BUILDER",
    title: "AWS Skill Builder",
    url: "https://skillbuilder.aws",
    desc: "Unlock over 600+ free online courses, interactive hands-on labs, structured certification exam prep, and verifiable digital badges with zero prior experience required.",
  },
  {
    icon: Wrench,
    tag: "FREE TIER",
    title: "Free Cloud Computing Services - AWS Free Tier",
    url: "https://aws.amazon.com/free",
    renderDesc: () => (
      <>
        Build and scale real-world applications using free AWS services. A great{" "}
        <a
          href="https://aws-builder.enterprise.slack.com/files/U09TK0Q5GRM/F0AU3D5KXS9/aws_free_tier_getting_started__-_final.pptx?origin_team=E08R531Q42K&origin_channel=D09U0DZBCAW"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-medium underline decoration-primary underline-offset-2 hover:opacity-80 transition-opacity inline-flex items-center gap-0.5"
        >
          getting started guide
          <ExternalLink size={14} strokeWidth={2.2} className="inline shrink-0" />
        </a>{" "}
        was shared in the community covering a 6-month learning roadmap from beginner to advanced.
      </>
    ),
  },
  {
    icon: BookOpen,
    tag: "WORKSHOPS",
    title: "AWS Workshops",
    url: "https://workshops.aws",
    desc: "Free step-by-step hands-on projects tailored for every skill level to deepen your cloud architecture expertise.",
  },
  {
    icon: ShieldAlert,
    tag: "SANDBOX",
    title: "Introducing AWS Sandbox Environment",
    url: "https://dev.to/sarvar_04/introducing-aws-sandbox-environment-learn-aws-for-free-without-a-credit-card-58np",
    desc: "Practice in a real AWS environment with no credit card and no risk of surprise bills.",
  },
  {
    icon: GraduationCap,
    tag: "MICROCREDENTIALS",
    title: "AWS Free Microcredentials",
    url: "https://builder.aws.com/content/3D2cYCzbVUmVxiETpb92FpSWw3t/aws-dropped-new-free-credentials-that-prove-you-can-build-and-boost-your-resume",
    desc: "Four hands-on microcredentials with free Credly badges for your LinkedIn/resume.",
  },
];
