import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import logo from "@/assets/aws-hitms-logo.jpeg";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/events", label: "Events" },
  { to: "/members", label: "Members" },
  { to: "/resources", label: "Resources" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border/40 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between relative">
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3 group z-10">
          <div className="relative overflow-hidden rounded-xl p-0.5 border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent group-hover:border-primary/50 transition-colors">
            <img
              src={logo}
              alt="AWS SBG HITMS"
              className="h-10 w-10 rounded-lg object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-bold text-sm tracking-wide text-foreground group-hover:text-primary transition-colors">
              AWS HITMS
            </span>
            <span className="text-[10px] text-muted-foreground tracking-widest uppercase">
              Student Builder Group
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links (Centered) */}
        <nav className="hidden md:flex items-center gap-1 bg-muted/50 p-1.5 rounded-full border border-border/50 backdrop-blur-md shadow-inner absolute left-1/2 -translate-x-1/2">
          {links.map((l) => {
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  active
                    ? "text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                }`}
              >
                <span className="relative z-10">{l.label}</span>
                {active && (
                  <motion.div
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-primary shadow-sm"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Trigger & Right side spacer if needed */}
        <div className="flex items-center gap-2 z-10">
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-border bg-background/95 backdrop-blur-xl px-4 pt-2 pb-6 space-y-2 shadow-lg"
          >
            {links.map((l) => {
              const active = location.pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <div className="pt-2">
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>Join Us</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
