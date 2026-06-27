import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { useMeta } from "@/hooks/useMeta";
import { Calendar, MapPin, ArrowRight, Instagram, Linkedin, MessageCircle, Sparkles, Clock, Globe } from "lucide-react";

const WHATSAPP_URL = "https://chat.whatsapp.com/FgyyG0kLNIKIovBwenLagq";
const INTRO_INSTAGRAM = "https://www.instagram.com/reel/DUf-IfwAdA2/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==";
const INTRO_LINKEDIN = "https://www.linkedin.com/posts/aws-student-builder-group-hitms_awsdevelopers-awscloudclubs-hitms-activity-7425653263510724609-qI3x";
const TECHVERSE_INSTAGRAM = "https://www.instagram.com/reel/Ct0g8k7v6rA/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==";
const TECHVERSE_LINKEDIN = "https://www.linkedin.com/posts/aws-student-builder-group-hitms_awsdevelopers-awscloudclubs-hitms-activity-7425653263510724609-qI3x";

export default function Events() {
  useMeta({
    title: "Events & Workshops — AWS SBG HITMS",
    description: "Hands-on workshops, hackathons, speaker sessions and bootcamps from AWS Student Builder Group HITMS.",
  });

  const cards = [
    {
      id: "intro",
      tag: "INTRODUCTORY MEETUP",
      title: "Introductory Event",
      desc: "An introduction to our vision, roadmap, and opportunities in cloud computing. 6-Feb-2026 (Friday) · 11:00 AM · HITMS Auditorium.",
      date: "6 Feb 2026 · 11:00 AM",
      type: "HITMS Auditorium",
      links: [
        { label: "Instagram", url: INTRO_INSTAGRAM, icon: Instagram, color: "from-[oklch(0.65_0.22_25)] to-[oklch(0.55_0.22_280)] text-white shadow-md" },
        { label: "LinkedIn", url: INTRO_LINKEDIN, icon: Linkedin, color: "bg-[#0a66c2] text-white" }
      ]
    },
    {
      id: "techverse",
      tag: "FEATURED EVENT",
      title: "TechVerse-26",
      desc: "Explore modern cloud architectures, UI/UX, Cybersecurity and building careers in the digital age. A live interactive session with hands-on challenges and prizes.",
      date: "June 29, 2026",
      type: "Online Session",
      links: [
         { label: "Instagram", url: INTRO_INSTAGRAM, icon: Instagram, color: "from-[oklch(0.65_0.22_25)] to-[oklch(0.55_0.22_280)] text-white shadow-md" },
        { label: "LinkedIn", url: INTRO_LINKEDIN, icon: Linkedin, color: "bg-[#0a66c2] text-white" }
      ]
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
        { label: "Join WhatsApp", url: WHATSAPP_URL, icon: MessageCircle, color: "bg-emerald-600 text-white" }
      ]
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
        { label: "Join WhatsApp", url: WHATSAPP_URL, icon: MessageCircle, color: "bg-emerald-600 text-white" }
      ]
    }
  ];

  return (
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
            <h2 className="text-3xl md:text-4xl font-black tracking-tight font-display">Featured & Upcoming Events</h2>
          </div>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" data-hover
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-primary text-primary-foreground font-bold hover:shadow-[0_0_40px_oklch(0.769_0.165_64.5/0.7)] transition">
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
                  <span className="text-[9px] tracking-[0.25em] uppercase font-bold text-primary">{e.tag}</span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                    e.isTba ? "bg-primary/10 text-primary border border-primary/20" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  }`}>
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
                  <span className="inline-flex items-center gap-1.5"><Calendar size={11} className="text-primary" /> {e.date}</span>
                  <span className="inline-flex items-center gap-1.5"><MapPin size={11} className="text-primary" /> {e.type}</span>
                </div>

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
  );
}
