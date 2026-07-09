import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { BookOpen, Code2, GraduationCap, Wrench, Cloud, Brain } from "lucide-react";
import { useMeta } from "@/hooks/useMeta";

export default function Resources() {
  useMeta({
    title: "Resources & Learning Paths — AWS SBG HITMS",
    description:
      "Curated AWS learning paths, labs, certification prep and tools for student builders.",
  });

  return (
    <Layout>
      <PageHeader
        eyebrow="Learn · Build · Ship"
        title="Resources For Cloud Builders"
        subtitle="Curated curricula, hands-on labs and exclusive perks for AWS SBG HITMS members. No prior AWS experience required — just curiosity."
      />

      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {resources.map((r, i) => (
          <motion.a
            href="#"
            key={r.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ y: -6 }}
            className="group relative p-6 rounded-xl border border-border bg-card overflow-hidden block"
          >
            <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl group-hover:bg-primary/30 transition" />
            <div className="relative">
              <div className="h-12 w-12 rounded-md bg-primary/10 border border-primary/30 grid place-items-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition">
                <r.icon size={22} />
              </div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-primary font-bold">
                {r.tag}
              </span>
              <h3 className="text-xl font-bold mt-2">{r.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{r.desc}</p>
            </div>
          </motion.a>
        ))}
      </section>
    </Layout>
  );
}

const resources = [
  {
    icon: Cloud,
    tag: "FOUNDATIONS",
    title: "AWS Cloud Practitioner Path",
    desc: "End-to-end learning path to crush your CCP exam — includes flashcards, labs and a voucher.",
  },
  {
    icon: Code2,
    tag: "BUILD",
    title: "Student Hub Curriculum",
    desc: "Project-based curricula for full-stack cloud builders, from S3 to serverless.",
  },
  {
    icon: Brain,
    tag: "AI / ML",
    title: "GenAI with Bedrock",
    desc: "Build RAG apps, agents and copilots powered by Amazon Bedrock and Titan.",
  },
  {
    icon: Wrench,
    tag: "TOOLS",
    title: "AWS Credits & Vouchers",
    desc: "Exclusive AWS credits, Udemy licenses and certification vouchers for active members.",
  },
  {
    icon: GraduationCap,
    tag: "MENTORSHIP",
    title: "1:1 with AWS Experts",
    desc: "Book mentorship sessions with AWS Solutions Architects and Developer Advocates.",
  },
  {
    icon: BookOpen,
    tag: "READING",
    title: "Cloud Architecture Library",
    desc: "Curated whitepapers, blog series and reference architectures.",
  },
];
