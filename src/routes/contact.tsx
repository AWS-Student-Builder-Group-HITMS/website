import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import {
  Send,
  Linkedin,
  Instagram,
  Users,
  CalendarDays,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  MoveRight,
} from "lucide-react";
import { useMeta } from "@/hooks/useMeta";
import { useContactForm, type ContactFormInput } from "@/hooks/useContactForm";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://chat.whatsapp.com/FgyyG0kLNIKIovBwenLagq";
const INSTAGRAM_URL =
  "https://www.instagram.com/awssbghitms?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";
const LINKEDIN_URL = "https://www.linkedin.com/company/aws-student-builder-group-hitms";
const MEETUP_URL = "https://www.meetup.com/aws-sbg-at-hitms/";
const QR_PATH = "https://res.cloudinary.com/txg3hveh/image/upload/v1783966922/Whatsapp%20QR.jpg";

// Form validation schema
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject must be less than 200 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must be less than 5000 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  useMeta({
    title: "Contact — AWS SBG HITMS",
    description: "Get in touch with AWS Student Builder Group HITMS leaders.",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const { isLoading, isSuccess, error, submitForm, resetForm } = useContactForm();
  const [showForm, setShowForm] = useState(false);

  const onSubmit = async (data: ContactFormData) => {
    const result = await submitForm(data as ContactFormInput);
    if (result.success) {
      reset();
      setTimeout(() => {
        setShowForm(false);
        resetForm();
      }, 2000);
    }
  };

  return (
    <Layout>
      <PageHeader
        eyebrow="Connect"
        title="Let's Build Something Together"
        subtitle="Got a question, idea or want to partner with us? Drop a line — our Student Builder Group Leaders read every message."
      />

      {/* Meetup Callout — top priority section for event registration */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 pt-16 -mt-4 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative flex flex-col md:flex-row items-center md:items-center justify-between gap-6 rounded-3xl border border-primary/40 p-8 md:p-10 bg-gradient-to-br from-[oklch(0.769_0.165_64.5/0.25)] via-card to-[oklch(0.35_0.15_150/0.4)] overflow-hidden"
        >
          <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-[oklch(0.769_0.165_64.5/0.25)] blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

          <div className="relative flex items-start gap-4 max-w-2xl">
            <div className="h-12 w-12 shrink-0 rounded-xl bg-primary/10 border border-primary/30 grid place-items-center text-primary">
              <CalendarDays size={22} />
            </div>
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-bold mb-1">
                Official Event Registration
              </p>
              <h2 className="text-xl md:text-2xl font-black tracking-tight font-display">
                Register for Events on Meetup
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                All AWS Student Builder Group HITMS workshops, meetups, and sessions are hosted and
                registered through our official{" "}
                <span className="text-foreground font-semibold">Meetup</span> page — it's the
                fastest way to reserve your spot, see upcoming events, and get reminders before we
                go live. Join our Meetup group to stay in the loop and never miss a session.
              </p>
            </div>
          </div>

          <a
            href={MEETUP_URL}
            target="_blank"
            rel="noreferrer"
            data-hover
            data-cursor="JOIN"
            className="relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-black tracking-wider hover:shadow-[0_0_30px_oklch(0.769_0.165_64.5/0.7)] transition shrink-0"
          >
            JOIN ON MEETUP <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </section>

      {/* Main Grid: QR + Info */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 mb-10 grid md:grid-cols-[1fr_1.5fr] gap-6">
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
            <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-bold mb-1">
              WhatsApp Community
            </p>
            <h2 className="text-xl font-black tracking-tight">Scan to Join</h2>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              Scan the QR code or tap the button below to join our WhatsApp community.
            </p>
          </div>

          {/* QR Image */}
          <div className="relative rounded-2xl overflow-hidden border border-primary/30 shadow-[0_0_40px_oklch(0.78_0.17_140/0.3)] group-hover:shadow-[0_0_60px_oklch(0.78_0.17_140/0.5)] transition duration-500">
            <img
              src={QR_PATH}
              alt="WhatsApp Community QR Code"
              className="w-48 h-48 object-cover"
              loading="lazy"
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
              JOIN NOW <MessageCircle size={14} className="group-hover:translate-x-1 transition" />
            </a>
          </div>
        </motion.div>

        {/* Right: Talk to Builders + Social Links */}
        <div className="flex flex-col gap-4">
          {/* Contact Form / Talk to Builders Toggle */}
          {!showForm ? (
            <motion.button
              type="button"
              onClick={() => setShowForm(true)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              data-hover
              data-cursor="OPEN"
              aria-label="Open the contact form"
              className="relative flex items-center gap-5 p-8 rounded-2xl border border-border bg-card overflow-hidden flex-1 text-left cursor-pointer hover:border-primary hover:shadow-[0_15px_50px_-15px_oklch(0.769_0.165_64.5/0.4)] transition-all group"
            >
              <div className="absolute inset-0 aurora-bg opacity-60 pointer-events-none" />
              <div className="absolute -top-px inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

              <div className="relative flex-1">
                <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-bold mb-2">
                  Direct Line
                </p>
                <h3 className="text-2xl md:text-3xl font-black tracking-tight font-display">
                  Send us a Message
                </h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-md">
                  Fill out the form below and we'll get back to you within 24-48 hours. For urgent
                  matters, reach us on WhatsApp.
                </p>
                <span className="relative inline-flex items-center gap-2 mt-4 text-xs font-black tracking-wider uppercase text-primary">
                  Tap to open form
                  <MoveRight
                    size={14}
                    className="group-hover:translate-x-1.5 transition-transform"
                  />
                </span>
              </div>

              <div className="relative shrink-0 h-14 w-14 rounded-full bg-primary/10 border border-primary/30 grid place-items-center text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-12 transition-all">
                <Send size={20} />
              </div>
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative p-8 rounded-2xl border border-border bg-card overflow-hidden flex-1"
            >
              <div className="absolute inset-0 aurora-bg opacity-60 pointer-events-none" />
              <div className="absolute -top-px inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-bold mb-1">
                      Message Form
                    </p>
                    <h3 className="text-lg font-black tracking-tight">Contact Our Team</h3>
                  </div>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                    }}
                    className="text-muted-foreground hover:text-foreground transition"
                  >
                    ✕
                  </button>
                </div>

                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-8 gap-3"
                  >
                    <CheckCircle size={48} className="text-green-500" />
                    <h4 className="text-lg font-black text-center">Message Sent! ✨</h4>
                    <p className="text-sm text-muted-foreground text-center">
                      Thanks for reaching out! We'll review your message and get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name Field */}
                    <div>
                      <label className="text-xs font-semibold text-foreground mb-2 block">
                        Name *
                      </label>
                      <Input
                        {...register("name")}
                        placeholder="Your name"
                        disabled={isLoading}
                        className="bg-muted/50 border-muted-foreground/20"
                      />
                      {errors.name && (
                        <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="text-xs font-semibold text-foreground mb-2 block">
                        Email *
                      </label>
                      <Input
                        {...register("email")}
                        type="email"
                        placeholder="your@email.com"
                        disabled={isLoading}
                        className="bg-muted/50 border-muted-foreground/20"
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label className="text-xs font-semibold text-foreground mb-2 block">
                        Subject *
                      </label>
                      <Input
                        {...register("subject")}
                        placeholder="What's this about?"
                        disabled={isLoading}
                        className="bg-muted/50 border-muted-foreground/20"
                      />
                      {errors.subject && (
                        <p className="text-xs text-red-500 mt-1">{errors.subject.message}</p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div>
                      <label className="text-xs font-semibold text-foreground mb-2 block">
                        Message *
                      </label>
                      <Textarea
                        {...register("message")}
                        placeholder="Tell us more..."
                        disabled={isLoading}
                        rows={4}
                        className="bg-muted/50 border-muted-foreground/20 resize-none"
                      />
                      {errors.message && (
                        <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    {/* Error Message */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30"
                      >
                        <AlertCircle size={16} className="text-red-500 shrink-0" />
                        <p className="text-xs text-red-600">{error}</p>
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black"
                    >
                      {isLoading ? "Sending..." : "Send Message"}
                      {!isLoading && <Send size={16} className="ml-2" />}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          )}

          {/* Social Links Grid (Meetup now lives in its own top section, not duplicated here) */}
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
                  <p className="text-[9px] tracking-[0.2em] uppercase text-primary font-bold leading-none mb-1">
                    {label}
                  </p>
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
];
