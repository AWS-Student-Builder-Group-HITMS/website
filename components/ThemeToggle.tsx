"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import type { MouseEvent } from "react"

type Theme = "light" | "dark"

const THEME_STORAGE_KEY = "theme"
const THEME_SWITCH_DELAY_MS = 120
const THEME_SWITCH_LOCK_MS = 980

interface ThemeToggleProps {
  isScrolled?: boolean
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "light"
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.toggle("dark", theme === "dark")
  root.style.colorScheme = theme
}

function emitThemeTransition(theme: Theme, x: number, y: number) {
  window.dispatchEvent(
    new CustomEvent("theme-transition", {
      detail: { theme, x, y },
    })
  )
}

function ThemeIcon({ theme }: { theme: Theme }) {
  if (theme === "dark") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2"></path>
        <path d="M12 20v2"></path>
        <path d="M4.93 4.93l1.41 1.41"></path>
        <path d="M17.66 17.66l1.41 1.41"></path>
        <path d="M2 12h2"></path>
        <path d="M20 12h2"></path>
        <path d="M4.93 19.07l1.41-1.41"></path>
        <path d="M17.66 6.34l1.41-1.41"></path>
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"></path>
    </svg>
  )
}

export default function ThemeToggle({ isScrolled = false }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>("light")
  const [isMounted, setIsMounted] = useState(false)
  const [isSwitching, setIsSwitching] = useState(false)
  const [burstKey, setBurstKey] = useState(0)
  const applyTimerRef = useRef<number | null>(null)
  const unlockTimerRef = useRef<number | null>(null)

  useEffect(() => {
    const initialTheme = getInitialTheme()
    setTheme(initialTheme)
    applyTheme(initialTheme)
    setIsMounted(true)

    return () => {
      if (applyTimerRef.current !== null) {
        window.clearTimeout(applyTimerRef.current)
      }

      if (unlockTimerRef.current !== null) {
        window.clearTimeout(unlockTimerRef.current)
      }
    }
  }, [])

  const toggleTheme = (event: MouseEvent<HTMLButtonElement>) => {
    if (isSwitching || !isMounted) {
      return
    }

    setIsSwitching(true)

    const nextTheme: Theme = theme === "dark" ? "light" : "dark"
    const rect = event.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2

    emitThemeTransition(nextTheme, x, y)
    setBurstKey((prev) => prev + 1)

    if (applyTimerRef.current !== null) {
      window.clearTimeout(applyTimerRef.current)
    }

    applyTimerRef.current = window.setTimeout(() => {
      setTheme(nextTheme)
      applyTheme(nextTheme)
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
    }, THEME_SWITCH_DELAY_MS)

    if (unlockTimerRef.current !== null) {
      window.clearTimeout(unlockTimerRef.current)
    }

    unlockTimerRef.current = window.setTimeout(() => {
      setIsSwitching(false)
    }, THEME_SWITCH_LOCK_MS)
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      disabled={isSwitching}
      className={`relative grid h-11 w-11 place-items-center overflow-hidden rounded-xl border transition-all ${
        isScrolled
          ? "border-white/70 bg-white/70 text-dark-800 hover:bg-white/85"
          : "border-white/60 bg-white/55 text-dark-800 hover:bg-white/75"
      } disabled:cursor-not-allowed disabled:opacity-80`}
      aria-label={isMounted ? `Switch to ${theme === "dark" ? "light" : "dark"} mode` : "Toggle theme"}
      aria-busy={isSwitching}
      title={isMounted ? `Switch to ${theme === "dark" ? "light" : "dark"} mode` : "Toggle theme"}
    >
      <AnimatePresence>
        {burstKey > 0 && (
          <motion.span
            key={`burst-${burstKey}`}
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.34 }}
          >
            <motion.span
              className="absolute inset-1 rounded-lg border border-primary/35"
              initial={{ scale: 0.74, opacity: 0.6 }}
              animate={{ scale: 1.12, opacity: 0 }}
              transition={{ duration: 0.52, ease: "easeOut" }}
            ></motion.span>
          </motion.span>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isMounted ? theme : "loading"}
          initial={{ y: 5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -5, opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <ThemeIcon theme={isMounted ? theme : "light"} />
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
