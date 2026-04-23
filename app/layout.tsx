import type { Metadata } from "next"
import Script from "next/script"
import { Manrope, Sora } from "next/font/google"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import ThemeTransitionOverlay from "@/components/ThemeTransitionOverlay"
import "./globals.css"

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"],
})

const displayFont = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "AWS Cloud Club HITMS",
  description: "Professional website for AWS Cloud Club at HITMS - Join us to learn cloud technologies",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bodyFont.variable} ${displayFont.variable} font-sans antialiased`}>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(() => {
            try {
              const savedTheme = localStorage.getItem("theme");
              const theme =
                savedTheme === "light" || savedTheme === "dark"
                  ? savedTheme
                  : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
              document.documentElement.classList.toggle("dark", theme === "dark");
              document.documentElement.style.colorScheme = theme;
            } catch (_) {}
          })();`}
        </Script>

        <div className="site-shell">
          <ThemeTransitionOverlay />

          <div className="site-background" aria-hidden="true">
            <div className="site-grid"></div>
            <div className="noise-overlay"></div>
            <div className="absolute -top-20 -left-16 hidden h-72 w-72 rounded-full bg-cyan-400/22 blur-2xl animate-drift sm:block"></div>
            <div className="absolute top-24 right-8 hidden h-80 w-80 rounded-full bg-fuchsia-500/18 blur-2xl animate-float md:block"></div>
            <div className="absolute bottom-12 left-1/3 hidden h-64 w-64 rounded-full bg-blue-600/18 blur-2xl animate-pulse-soft lg:block"></div>
          </div>

          <Navigation />
          <main className="relative z-10">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
