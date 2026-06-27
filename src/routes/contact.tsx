import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { MessageCircle, Send, Linkedin, Instagram, Users, CalendarDays } from "lucide-react";
import { useMeta } from "@/hooks/useMeta";

const WHATSAPP_URL = "https://chat.whatsapp.com/FgyyG0kLNIKIovBwenLagq";
const INSTAGRAM_URL = "https://www.instagram.com/awssbghitms?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";
const LINKEDIN_URL = "https://www.linkedin.com/company/aws-student-builder-group-hitms";
const MEETUP_URL = "https://www.meetup.com/aws-sbg-at-hitms/";
const QR_PATH = "/members/images/Whatsapp QR.jpg";

export default function Contact() {
  useMeta({
    title: "Contact — AWS SBG HITMS",
    description: "Get in touch with AWS Student Builder Group HITMS leaders.",
  });

  return (
    <Layout>
      <PageHeader
        eyebrow="Connect"
        title="Let's Build Something Together"
        subtitle="Got a question, idea or want to partner with us? Drop a line — our Student Builder Group Leaders read every message."
      />

      {/* Main Grid: QR + Info */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 pt-16 -mt-4 mb-10 grid md:grid-cols-[1fr_1.5fr] gap-6">

        {/* Left: WhatsApp QR Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="group relative flex flex-col items-center justify-center gap-5 rounded-3xl border border-primary/40 p-8 bg-gradient-to-br from-[oklch(0.35_0.15_150/0.5)] via-card to-[oklch(0.769_0.165_64.5/0.25)] overflow-hidden hover:border-primary hover:-translate-y-1 transition-all hover:shadow-[0_25px_80px_-20px_oklch(0.769_0.165_64.5/0.5)]"
        >
          <div className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-[oklch(0.78_0.17_140/0.25)] blur-3xl group-hover:bg-[oklch(0.78_0.17_140/0.45)] transition duration-700" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

          <div className="relative text-center">
            <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-bold mb-1">WhatsApp Community</p>
            <h2 className="text-xl font-black tracking-tight">Scan to Join</h2>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">Scan the QR code or tap the button below to join our WhatsApp community.</p>
          </div>

          {/* QR Image */}
          <div className="relative rounded-2xl overflow-hidden border border-primary/30 shadow-[0_0_40px_oklch(0.78_0.17_140/0.3)] group-hover:shadow-[0_0_60px_oklch(0.78_0.17_140/0.5)] transition duration-500">
            <img
              src={QR_PATH}
              alt="WhatsApp Community QR Code"
              className="w-48 h-48 object-cover"
            />
          </div>

          <div className="relative flex flex-col items-center gap-2 w-full">
            <div className="flex items-center gap-2 text-xs text-muted-foreground/80">
              <Users size={12} className="text-primary" />
              <span>Builders Community</span>
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              <span>Live Now</span>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              data-hover
              data-cursor="JOIN"
              className="inline-flex items-center gap-2 px-6 py-3 w-full justify-center rounded-xl bg-primary text-primary-foreground font-black tracking-wider hover:shadow-[0_0_30px_oklch(0.769_0.165_64.5/0.7)] transition"
            >
              JOIN NOW <Send size={14} className="group-hover:translate-x-1 transition" />
            </a>
          </div>
        </motion.div>

        {/* Right: Talk to Builders + Social Links */}
        <div className="flex flex-col gap-4">
          {/* Talk to Builders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-8 rounded-2xl border border-border bg-card overflow-hidden flex-1"
          >
            <div className="absolute inset-0 aurora-bg opacity-60 pointer-events-none" />
            <div className="absolute -top-px inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="relative">
              <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-bold mb-2">Direct Line</p>
              <h3 className="text-2xl md:text-3xl font-black tracking-tight font-display">Talk to the Builders</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-md">
                The fastest way to reach the captain and team leads is on WhatsApp. Slide into our DMs on Instagram or LinkedIn for partnerships and collabs.
              </p>
            </div>
          </motion.div>

          {/* Social + Meetup Links Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 gap-3"
          >
            {socialLinks.map(({ Icon, label, sub, href, accent }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                data-hover
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group relative flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/60 hover:-translate-y-0.5 transition overflow-hidden"
              >
                <div className="absolute -right-6 -bottom-6 h-20 w-20 rounded-full bg-primary/10 blur-xl group-hover:bg-primary/25 transition" />
                <div className="relative h-10 w-10 rounded-lg bg-primary/10 border border-primary/30 grid place-items-center text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-6 transition shrink-0">
                  <Icon size={16} />
                </div>
                <div className="relative min-w-0">
                  <p className="text-[9px] tracking-[0.2em] uppercase text-primary font-bold leading-none mb-1">{label}</p>
                  <p className="text-xs font-semibold truncate">{sub}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

const socialLinks = [
  {
    Icon: Linkedin,
    label: "LinkedIn",
    sub: "Announcements & recaps",
    href: LINKEDIN_URL,
    accent: "blue",
  },
  {
    Icon: Instagram,
    label: "Instagram",
    sub: "@awssbghitms",
    href: INSTAGRAM_URL,
    accent: "pink",
  },
  {
    Icon: MessageCircle,
    label: "WhatsApp",
    sub: "Builders community",
    href: WHATSAPP_URL,
    accent: "green",
  },
  {
    Icon: CalendarDays,
    label: "Meetup",
    sub: "Events & workshops",
    href: MEETUP_URL,
    accent: "red",
  },
];