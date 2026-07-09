import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { Target, Eye, Heart, Star } from "lucide-react";
import { useMeta } from "@/hooks/useMeta";

export default function About() {
  useMeta({
    title: "About — AWS Student Builder Group HITMS",
    description: "Our story, mission and vision. Same community. Stronger vision. Bigger future.",
  });

  return (
    <Layout>
      <PageHeader
        eyebrow="Our Story"
        title="Same Community Stronger Vision Bigger Future"
        subtitle="AWS Cloud Clubs evolved into AWS Student Builder Groups — a global movement of student innovators building the next generation of cloud, AI and builder culture."
      />

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 grid md:grid-cols-3 gap-5">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="relative p-7 rounded-xl border border-border bg-card overflow-hidden group"
          >
            <div className="absolute -top-px inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <p.icon className="text-primary mb-4" size={28} />
            <h3 className="text-xl font-bold mb-2">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        <div className="mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-primary font-bold mb-2">Timeline</p>
          <h2 className="text-3xl md:text-5xl font-black">A Little History</h2>
        </div>
        <div className="relative pl-6 border-l border-border space-y-10">
          {timeline.map((t, i) => (
            <motion.div
              key={t.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -left-[31px] top-1.5 h-2 w-2 rounded-full bg-primary ring-4 ring-background" />
              <div className="text-sm font-bold text-primary">{t.year}</div>
              <h3 className="text-lg font-bold mt-1">{t.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-xl leading-relaxed">
                {t.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

const pillars = [
  {
    icon: Target,
    title: "Our Mission",
    desc: "Empower students to understand Cloud, Serverless and modern building systems through local, hands-on, peer-to-peer workshops.",
  },
  {
    icon: Star,
    title: "Our Vision",
    desc: "Build a persistent local hub of student engineering talent that connects directly with global tech circles.",
  },
  {
    icon: Heart,
    title: "Our Values",
    desc: "Inclusion, builder culture, collaborative building, continuous learning and open exchange.",
  },
];

const timeline = [
  {
    year: "2025",
    title: "AWS Cloud Club Launched",
    desc: "We started as an AWS Cloud Club, laying down the early bricks of cloud education inside the university.",
  },
  {
    year: "2026",
    title: "Community Evolution",
    desc: "With growing programs and stronger industry relations, we transitions into the new AWS SBG era.",
  },
  {
    year: "2026",
    title: "The Next Era",
    desc: "Same local team with robust developer tracks, larger speaker networks, and specialized cloud hackathons.",
  },
];
