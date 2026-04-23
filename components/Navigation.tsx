"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"
import ThemeToggle from "@/components/ThemeToggle"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Join Us", href: "/join-us" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
  { name: "Members", href: "/members" },
]

export default function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 14)
    onScroll()

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-3 pt-3 sm:px-6">
        <motion.nav
          initial={{ y: -18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className={`rounded-2xl border ${
            isScrolled
              ? "border-white/75 bg-white/90 shadow-ambient backdrop-blur-xl"
              : "border-white/70 bg-white/88 shadow-[0_8px_24px_rgba(16,22,41,0.12)] backdrop-blur-xl"
          }`}
        >
          <div className="flex h-[82px] items-center justify-between px-4 sm:px-6">
            <Link href="/" className="group flex items-center gap-3">
              <div
                className={`relative h-14 w-14 overflow-hidden rounded-xl border backdrop-blur-sm sm:h-16 sm:w-16 ${
                  isScrolled
                    ? "border-white/75 bg-white/20"
                    : "border-white/65 bg-white/20"
                }`}
              >
                <Image
                  src="/images/logo.png"
                  alt="AWS Cloud Club Logo"
                  fill
                  className="block object-contain p-1 opacity-95 drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)] dark:hidden"
                  priority
                />
                <Image
                  src="/images/logo-dark.png"
                  alt="AWS Cloud Club Logo Dark"
                  fill
                  className="hidden object-contain p-1 opacity-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] dark:block"
                  priority
                />
              </div>

              <div className="min-w-0">
                <p className="font-display text-base font-extrabold leading-tight text-dark-900 drop-shadow-[0_1px_0_rgba(255,255,255,0.35)] sm:text-lg">
                  AWS Cloud Club
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-dark-800 sm:text-[11px]">
                  HITMS Chapter
                </p>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1 rounded-full border border-white/75 bg-white/70 p-1 shadow-sm">
              {navItems.map((item) => {
                const isActive = item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href)

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:text-dark-900 ${
                      isScrolled ? "text-dark-700" : "text-dark-800"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-nav-pill"
                        className="absolute inset-0 rounded-full bg-gradient-primary shadow-gradient-md"
                        transition={{ type: "spring", stiffness: 360, damping: 30 }}
                      ></motion.span>
                    )}
                    <span className={`relative z-10 ${isActive ? "text-white" : ""}`}>
                      {item.name}
                    </span>
                  </Link>
                )
              })}
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle isScrolled={isScrolled} />

              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="group lg:hidden grid h-11 w-11 place-items-center rounded-xl border border-white/70 bg-white/70"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                <div className="space-y-1.5">
                  <motion.span
                    className="block h-0.5 w-6 rounded bg-gradient-to-r from-primary to-accent-purple"
                    animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
                    transition={{ duration: 0.2 }}
                  ></motion.span>
                  <motion.span
                    className="block h-0.5 w-6 rounded bg-gradient-to-r from-primary to-accent-purple"
                    animate={{ opacity: isOpen ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                  ></motion.span>
                  <motion.span
                    className="block h-0.5 w-6 rounded bg-gradient-to-r from-primary to-accent-purple"
                    animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
                    transition={{ duration: 0.2 }}
                  ></motion.span>
                </div>
              </button>
            </div>
          </div>
        </motion.nav>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-2 overflow-hidden rounded-2xl border border-white/70 bg-white/90 p-3 shadow-ambient backdrop-blur-xl lg:hidden"
            >
              <div className="grid gap-2">
                {navItems.map((item, index) => {
                  const isActive = item.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(item.href)

                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className={`block rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                          isActive
                            ? "bg-gradient-primary text-white shadow-gradient-md"
                            : "text-dark-700 hover:bg-white"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
