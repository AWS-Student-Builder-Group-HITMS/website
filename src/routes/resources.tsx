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

      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
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
    icon: Code2,
    tag: "BUILDER CENTER",
    title: "Start here | AWS Builder Center",
    url: "https://bit.ly/3OUCW8i",
    desc: "Access beginner-friendly learning paths, practical hands-on labs, AWS credits, live workshops, and active community events, all with no credit card required.",
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
