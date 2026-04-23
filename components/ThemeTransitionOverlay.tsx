"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

type Theme = "light" | "dark"

interface ThemeBurstDetail {
  theme: Theme
  x: number
  y: number
}

interface BurstState {
  id: number
  theme: Theme
  x: number
  y: number
  radius: number
}

const bubbleOffsets = [
  { x: -188, y: -96, size: 9, delay: 0.0, duration: 0.72 },
  { x: -116, y: 136, size: 8, delay: 0.07, duration: 0.74 },
  { x: 0, y: 162, size: 10, delay: 0.12, duration: 0.78 },
  { x: 122, y: -132, size: 8, delay: 0.18, duration: 0.76 },
  { x: 176, y: 92, size: 9, delay: 0.24, duration: 0.74 },
]

const stylesByTheme: Record<
  Theme,
  {
    flood: string
    ring: string
    glow: string
    bubble: string[]
  }
> = {
  light: {
    flood: "rgba(115, 224, 255, 0.2)",
    ring: "rgba(0, 98, 122, 0.28)",
    glow: "radial-gradient(circle, rgba(0,98,122,0.2) 0%, rgba(120,0,138,0.12) 42%, transparent 78%)",
    bubble: [
      "rgba(0,98,122,0.88)",
      "rgba(0,59,143,0.82)",
      "rgba(120,0,138,0.78)",
      "rgba(178,0,143,0.74)",
      "rgba(104,184,255,0.78)",
    ],
  },
  dark: {
    flood: "rgba(101, 128, 255, 0.22)",
    ring: "rgba(152, 195, 255, 0.34)",
    glow: "radial-gradient(circle, rgba(80,163,255,0.24) 0%, rgba(156,103,255,0.16) 42%, transparent 78%)",
    bubble: [
      "rgba(151,214,255,0.88)",
      "rgba(122,165,255,0.84)",
      "rgba(180,136,255,0.82)",
      "rgba(236,156,255,0.78)",
      "rgba(167,248,255,0.8)",
    ],
  },
}

const BURST_LIFETIME_MS = 1120
const COLOR_TRANSITION_MS = 760

export default function ThemeTransitionOverlay() {
  const [bursts, setBursts] = useState<BurstState[]>([])
  const prefersReducedMotion = useReducedMotion()
  const transitionClassTimerRef = useRef<number | null>(null)
  const burstTimerIdsRef = useRef<number[]>([])

  useEffect(() => {
    let nextId = 0

    const onThemeTransition = (event: Event) => {
      const customEvent = event as CustomEvent<ThemeBurstDetail>

      const theme = customEvent.detail?.theme ?? "light"
      const x = customEvent.detail?.x ?? window.innerWidth / 2
      const y = customEvent.detail?.y ?? 72
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const maxX = Math.max(x, viewportWidth - x)
      const maxY = Math.max(y, viewportHeight - y)
      const radius = Math.hypot(maxX, maxY)
      const transitionDuration = prefersReducedMotion ? 460 : COLOR_TRANSITION_MS
      const burstLifetime = prefersReducedMotion ? 640 : BURST_LIFETIME_MS

      const root = document.documentElement
      root.classList.add("theme-transitioning")
      if (transitionClassTimerRef.current !== null) {
        window.clearTimeout(transitionClassTimerRef.current)
      }
      transitionClassTimerRef.current = window.setTimeout(() => {
        root.classList.remove("theme-transitioning")
      }, transitionDuration)

      const id = ++nextId
      setBursts((prev) => [...prev, { id, theme, x, y, radius }])

      const burstTimerId = window.setTimeout(() => {
        setBursts((prev) => prev.filter((burst) => burst.id !== id))
        burstTimerIdsRef.current = burstTimerIdsRef.current.filter((timerId) => timerId !== burstTimerId)
      }, burstLifetime)
      burstTimerIdsRef.current.push(burstTimerId)
    }

    window.addEventListener("theme-transition", onThemeTransition as EventListener)

    return () => {
      window.removeEventListener("theme-transition", onThemeTransition as EventListener)

      if (transitionClassTimerRef.current !== null) {
        window.clearTimeout(transitionClassTimerRef.current)
      }

      burstTimerIdsRef.current.forEach((timerId) => window.clearTimeout(timerId))
      burstTimerIdsRef.current = []

      document.documentElement.classList.remove("theme-transitioning")
    }
  }, [prefersReducedMotion])

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {bursts.map((burst) => {
          const styleSet = stylesByTheme[burst.theme]
          const particleOffsets = prefersReducedMotion ? bubbleOffsets.slice(0, 3) : bubbleOffsets

          return (
            <motion.div
              key={burst.id}
              className="absolute inset-0"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              <motion.span
                className="absolute h-6 w-6 rounded-full"
                style={{
                  backgroundColor: styleSet.flood,
                  left: burst.x,
                  top: burst.y,
                  transform: "translate(-50%, -50%)",
                  willChange: "transform, opacity",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: burst.radius / 11.5,
                  opacity: [0, 0.2, 0],
                }}
                transition={{ duration: prefersReducedMotion ? 0.52 : 0.84, ease: [0.22, 0.82, 0.2, 1] }}
              ></motion.span>

              <motion.span
                className="absolute h-4 w-4 rounded-full border"
                style={{
                  borderColor: styleSet.ring,
                  left: burst.x,
                  top: burst.y,
                  transform: "translate(-50%, -50%)",
                  willChange: "transform, opacity",
                }}
                initial={{ scale: 0.4, opacity: 0.7 }}
                animate={{ scale: burst.radius / 2.45, opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0.58 : 0.96, ease: [0.16, 0.84, 0.22, 1] }}
              ></motion.span>

              <motion.span
                className="absolute h-10 w-10 rounded-full blur-lg"
                style={{
                  background: styleSet.glow,
                  left: burst.x,
                  top: burst.y,
                  transform: "translate(-50%, -50%)",
                  willChange: "transform, opacity",
                }}
                initial={{ scale: 0.14, opacity: 0.34 }}
                animate={{ scale: burst.radius / 7.8, opacity: [0.34, 0.14, 0] }}
                transition={{ duration: prefersReducedMotion ? 0.72 : 1.08, ease: [0.2, 0.78, 0.2, 1] }}
              ></motion.span>

              {particleOffsets.map((bubble, index) => (
                <motion.span
                  key={`${burst.id}-${index}`}
                  className="absolute rounded-full"
                  style={{
                    width: bubble.size,
                    height: bubble.size,
                    backgroundColor: styleSet.bubble[index % styleSet.bubble.length],
                    left: burst.x,
                    top: burst.y,
                    transform: "translate(-50%, -50%)",
                    willChange: "transform, opacity",
                  }}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0.34 }}
                  animate={{
                    x: bubble.x,
                    y: bubble.y,
                    opacity: [0, 1, 0],
                    scale: [0.34, 0.94, 0.26],
                  }}
                  transition={{
                    duration: bubble.duration,
                    delay: bubble.delay,
                    ease: [0.22, 0.82, 0.24, 1],
                  }}
                ></motion.span>
              ))}
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}