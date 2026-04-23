"use client"

import Link from "next/link"
import { motion } from "framer-motion"

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Contact", href: "/contact" },
]

const resources = [
  { name: "AWS Official", href: "https://aws.amazon.com" },
  { name: "AWS Documentation", href: "https://docs.aws.amazon.com" },
  { name: "Cloud Skills", href: "https://skillbuilder.aws.com" },
]

const socials = [
  { icon: "X", href: "#", label: "Twitter" },
  { icon: "IG", href: "#", label: "Instagram" },
  { icon: "in", href: "#", label: "LinkedIn" },
  { icon: "YT", href: "#", label: "YouTube" },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative mt-20 overflow-hidden text-white">
      <div className="absolute inset-0 bg-gradient-primary"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_90%_85%,rgba(255,255,255,0.12),transparent_32%)]"></div>

      <div className="absolute -left-20 top-0 h-72 w-72 rounded-full border border-white/15 bg-white/10 blur-2xl animate-drift"></div>
      <div className="absolute -right-24 bottom-8 h-80 w-80 rounded-full border border-white/15 bg-white/10 blur-2xl animate-float"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-3xl font-extrabold leading-tight">AWS Cloud Club</h3>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-white/70">HITMS Chapter</p>
            <p className="mt-5 text-white/80 leading-relaxed">
              Empowering students at HITMS to master cloud technologies and AWS services.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/25 bg-white/10 text-xs font-bold uppercase tracking-widest text-white/90 hover:bg-white/20"
                  whileHover={{ scale: 1.06, y: -2 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-white/20 bg-white/10 p-4 text-sm text-white/85">
              <p className="font-semibold">Weekly Meetups</p>
              <p className="mt-1 text-white/70">Every Friday, 3:00 PM at Tech Lab A</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-5 flex items-center text-lg font-bold">
              <span className="mr-3 h-6 w-1 rounded-full bg-white/70"></span>
              Quick Links
            </h4>

            <ul className="space-y-3 text-white/80">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-sm font-semibold transition-colors hover:text-white"
                  >
                    <span className="mr-3 h-1.5 w-1.5 rounded-full bg-white/45 transition-colors group-hover:bg-white"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-5 flex items-center text-lg font-bold">
              <span className="mr-3 h-6 w-1 rounded-full bg-white/70"></span>
              Resources
            </h4>

            <ul className="space-y-3 text-white/80">
              {resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center text-sm font-semibold transition-colors hover:text-white"
                  >
                    <span className="mr-3 h-1.5 w-1.5 rounded-full bg-white/45 transition-colors group-hover:bg-white"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-5 flex items-center text-lg font-bold">
              <span className="mr-3 h-6 w-1 rounded-full bg-white/70"></span>
              Stay Updated
            </h4>

            <p className="mb-4 text-sm text-white/80">
              Subscribe to get latest updates and event notifications.
            </p>

            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/55"
              />
              <button className="btn-gradient rounded-xl px-4 py-2.5 text-sm font-bold">
                →
              </button>
            </div>

            <p className="mt-4 text-xs text-white/65">No spam. Unsubscribe anytime.</p>
          </motion.div>
        </div>

        <div className="my-10 h-px bg-white/20"></div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-between gap-4 md:flex-row"
        >
          <p className="text-sm text-white/70">
            © {currentYear} AWS Cloud Club HITMS. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm">
            <Link href="#" className="text-white/70 hover:text-white transition-colors">
              Privacy Policy
            </Link>

            <Link href="#" className="text-white/70 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
