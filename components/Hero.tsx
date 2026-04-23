"use client"

import { motion } from "framer-motion"
import Link from "next/link"

interface HeroProps {
  title: string
  subtitle?: string
  backgroundGradient?: boolean
  animated?: boolean
}

export default function Hero({
  title,
  subtitle,
  backgroundGradient = true,
  animated = true
}: HeroProps) {
  const showLandingActions = title.toLowerCase().includes("welcome")

  return (
    <section className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      <div
        className={`absolute inset-0 -z-20 ${
          backgroundGradient ? "bg-gradient-primary" : "bg-primary"
        }`}
      ></div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.3),transparent_30%),radial-gradient(circle_at_90%_80%,rgba(255,255,255,0.15),transparent_30%)]"></div>

      {animated && (
        <>
          <motion.div
            className="absolute -top-12 -right-12 h-80 w-80 rounded-full border border-white/25 bg-white/10"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.08, 1],
            }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          ></motion.div>

          <motion.div
            className="absolute -bottom-24 left-6 h-72 w-72 rounded-full border border-white/20 bg-white/10"
            style={{
              backdropFilter: "blur(4px)",
            }}
            animate={{
              rotate: [360, 0],
              x: [0, 12, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>

          <motion.div
            className="absolute inset-x-0 top-[45%] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
            animate={{ opacity: [0.2, 0.75, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
        </>
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass-dark relative overflow-hidden rounded-[2rem] border border-white/25 p-8 shadow-gradient-2xl md:p-14"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_40%)]"></div>

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.04 }}
              className="mb-5 inline-flex items-center rounded-full border border-white/35 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.23em] text-white/85"
            >
              AWS Cloud Club HITMS
            </motion.span>

          <motion.h1
            className="font-display text-4xl font-extrabold leading-[1.04] text-white md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/85 md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
          )}

            {showLandingActions && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.3 }}
                className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"
              >
                <Link
                  href="/join-us"
                  className="btn-gradient rounded-full px-7 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-white"
                >
                  Join The Club
                </Link>
                <Link
                  href="/events"
                  className="rounded-full border border-white/55 bg-white/10 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-white hover:bg-white/20"
                >
                  Explore Events
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>

        {showLandingActions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42 }}
            className="mx-auto mt-6 grid max-w-4xl gap-4 sm:grid-cols-3"
          >
            {[
              { label: "Members", value: "500+" },
              { label: "Workshops", value: "50+" },
              { label: "Certified", value: "100+" },
            ].map((item) => (
              <div
                key={item.label}
                className="glass-effect rounded-2xl border border-white/65 px-5 py-4 text-center"
              >
                <p className="font-display text-2xl font-extrabold gradient-text">{item.value}</p>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-dark-600">
                  {item.label}
                </p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
