import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
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
    const fn = () => setScrolled(window.scrollY > 30);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 backdrop-blur-xl transition-all duration-500 ${
        scrolled ? "bg-background/85 border-b border-primary/30 shadow-[0_8px_40px_-12px_oklch(0.769_0.165_64.5/0.35)]" : "bg-background/40 border-b border-transparent"
      }`}
    >
      {/* scan line on top edge */}
      <div className="absolute inset-x-0 -bottom-px h-px overflow-hidden opacity-70">
        <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-x" />
      </div>
      <nav className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link to="/" data-hover className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute -inset-1 bg-primary/40 blur-xl rounded-full opacity-70 group-hover:opacity-100 transition animate-glow-pulse" />
            <div className="absolute -inset-px rounded-md bg-gradient-to-tr from-primary via-primary-glow to-accent opacity-80 blur-[2px] group-hover:opacity-100 transition" />
            <img src={logo} alt="AWS SBG HITMS" className="relative h-10 w-10 rounded-md object-cover ring-1 ring-primary/40 group-hover:rotate-[-6deg] group-hover:scale-110 transition-transform duration-500" />
          </div>
        </Link>

        <ul className="hidden md:flex items-center gap-1 px-2 py-1 rounded-full border border-border/60 bg-background/40 backdrop-blur-md">
          {links.map((l) => {
            const active = location.pathname === l.to;
            return (
              <li key={l.to}>
                <Link
                  to={l.to}
                  data-hover
                  className={`relative px-4 py-1.5 text-sm rounded-full transition-colors ${
                    active ? "text-primary-foreground" : "text-foreground/80 hover:text-primary"
                  }`}
                >
                  <span className="relative z-10">{l.label}</span>
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-primary-glow shadow-[0_0_24px_oklch(0.769_0.165_64.5/0.7)]"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block w-10" aria-hidden />

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {open && (
        <motion.ul
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="md:hidden border-t border-border/60 bg-background/95 px-4 py-3 space-y-1"
        >
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-md hover:bg-secondary text-sm"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </motion.ul>
      )}
    </motion.header>
  );
}