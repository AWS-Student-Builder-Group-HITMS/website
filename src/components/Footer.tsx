import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import logo from "@/assets/aws-hitms-logo.jpeg";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border/60 bg-card/40">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 grid md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src={logo} className="h-10 w-10 rounded-md" alt="AWS SBG HITMS" />
            <div>
              <p className="font-bold">AWS SBG HITMS</p>
              <p className="text-xs text-muted-foreground tracking-widest uppercase">
                Student Builder Group
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Same community. Stronger vision. Bigger future. Empowering the next generation of cloud
            builders.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-3 text-sm tracking-widest uppercase text-primary">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/about" className="hover:text-primary">
                About
              </Link>
            </li>
            <li>
              <Link to="/events" className="hover:text-primary">
                Events
              </Link>
            </li>
            <li>
              <Link to="/members" className="hover:text-primary">
                Members
              </Link>
            </li>
            <li>
              <Link to="/resources" className="hover:text-primary">
                Resources
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3 text-sm tracking-widest uppercase text-primary">
            Programs
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Cloud Workshops</li>
            <li>AI/ML Bootcamps</li>
            <li>Certification Track</li>
            <li>Hackathons</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3 text-sm tracking-widest uppercase text-primary">Connect</h4>
          <div className="flex gap-3">
            {[
              {
                icon: Github,
                href: "https://github.com/AWS-Student-Builder-Group-HITMS/website",
                label: "GitHub",
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/company/aws-student-builder-group-hitms",
                label: "LinkedIn",
              },
              {
                icon: MessageCircle,
                href: "https://chat.whatsapp.com/FgyyG0kLNIKIovBwenLagq",
                label: "WhatsApp",
              },
              { icon: Mail, href: "/contact", label: "Contact" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={label}
                className="h-10 w-10 grid place-items-center rounded-md border border-border hover:border-primary hover:text-primary hover:shadow-[0_0_20px_oklch(0.769_0.165_64.5/0.4)] transition"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} AWS Student Builder Group · HITMS Chapter. Built by Waniza
        Khan.
      </div>
    </footer>
  );
}
