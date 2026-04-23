"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Hero from "@/components/Hero"

const tickerItems = [
  "AWS Workshops",
  "Hands-on Labs",
  "Cloud Bootcamps",
  "Architecture Talks",
  "Certification Paths",
  "Mentor Sessions",
]

const focusAreas = [
  {
    icon: "01",
    title: "Builder Workshops",
    description: "Practice real cloud workflows from deployment to monitoring using guided labs.",
  },
  {
    icon: "02",
    title: "Certification Track",
    description: "Structured prep sessions for foundational and associate-level AWS certifications.",
  },
  {
    icon: "03",
    title: "Project Squads",
    description: "Build portfolio-ready team projects inspired by production cloud architectures.",
  },
  {
    icon: "04",
    title: "Career Growth",
    description: "Get mentorship, interview support, and roadmap guidance toward cloud roles.",
  },
]

const learningFlow = [
  {
    title: "Discover",
    description: "Start with beginner-friendly sessions and map your personalized cloud roadmap.",
  },
  {
    title: "Build",
    description: "Move into practical labs, team collaboration, and solution architecture thinking.",
  },
  {
    title: "Launch",
    description: "Present your work, pursue certifications, and prepare for industry opportunities.",
  },
]

const stats = [
  { number: "500+", label: "Active Members" },
  { number: "50+", label: "Events Hosted" },
  { number: "100+", label: "AWS Certified" },
]

export default function Home() {
  return (
    <>
      <Hero
        title="Welcome to AWS Cloud Club HITMS"
        subtitle="Model cloud systems, build production-ready skills, and grow with a high-impact student tech community."
        animated
      />

      <section className="relative -mt-10 pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass-effect overflow-hidden rounded-2xl border border-white/70"
          >
            <motion.div
              className="flex w-max items-center gap-8 px-5 py-3"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            >
              {[...tickerItems, ...tickerItems].map((item, index) => (
                <div key={`${item}-${index}`} className="flex items-center gap-8">
                  <span className="text-xs font-bold uppercase tracking-[0.28em] text-dark-600">{item}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-primary"></span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-20">
        <div className="absolute left-0 top-24 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl"></div>
        <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-fuchsia-400/20 blur-3xl"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-dark-500">What Makes Us Different</p>
            <h2 className="mt-3 font-display text-4xl font-extrabold gradient-text md:text-5xl">Cloud Learning, Designed Like A Product</h2>
            <p className="mx-auto mt-4 max-w-3xl text-dark-700 md:text-lg">
              A structured system built for students who want practical experience, visible growth, and community support.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {focusAreas.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.01 }}
                className="group gradient-border rounded-2xl p-7 shadow-ambient transition-all duration-300"
              >
                <div className="relative z-10">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-sm font-extrabold text-white shadow-gradient-md">
                    {item.icon}
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-dark-900 group-hover:gradient-text">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-dark-700">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 text-white">
        <div className="absolute inset-0 bg-gradient-primary"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_20%,rgba(255,255,255,0.24),transparent_26%),radial-gradient(circle_at_92%_75%,rgba(255,255,255,0.18),transparent_34%)]"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/70">Learning Journey</p>
            <h2 className="mt-3 font-display text-4xl font-extrabold md:text-5xl">Model Your Growth In 3 Stages</h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {learningFlow.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-dark rounded-2xl border border-white/25 p-7"
              >
                <p className="inline-flex rounded-full border border-white/35 bg-white/10 px-3 py-1 text-xs font-bold tracking-[0.18em] text-white/75">
                  {`0${index + 1}`}
                </p>
                <h3 className="mt-4 font-display text-2xl font-bold">{step.title}</h3>
                <p className="mt-3 text-white/80">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24">
        <div className="absolute left-8 top-12 h-56 w-56 rounded-full bg-blue-300/30 blur-3xl"></div>
        <div className="absolute bottom-10 right-8 h-72 w-72 rounded-full bg-fuchsia-400/30 blur-3xl"></div>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.25fr_0.9fr] lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
            className="glass-effect rounded-[2rem] border border-white/70 p-8 md:p-10"
          >
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-dark-500">Join The Next Cohort</p>
            <h2 className="mt-3 font-display text-4xl font-extrabold gradient-text md:text-5xl">Ready To Build On AWS?</h2>
            <p className="mt-5 max-w-2xl text-dark-700 md:text-lg">
              Join AWS Cloud Club and learn by doing through workshops, team projects, and mentor-led practice.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/join-us"
                className="btn-gradient inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-[0.16em]"
              >
                Join Our Club
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full border border-dark-300/70 bg-white/70 px-8 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-dark-800 hover:bg-white"
              >
                Learn More
              </Link>
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="gradient-border rounded-2xl p-5"
              >
                <p className="font-display text-4xl font-extrabold gradient-text">{stat.number}</p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.15em] text-dark-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
