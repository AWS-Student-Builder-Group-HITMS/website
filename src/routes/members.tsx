import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, createContext, useContext } from "react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { useMeta } from "@/hooks/useMeta";
import {
  Github,
  Linkedin,
  Twitter,
  Crown,
  Palette,
  Calendar,
  Cpu,
  Camera,
  Megaphone,
  Star,
  Rocket,
  ShieldCheck,
  X,
  Globe,
  IdCard,
  ArrowRight,
  Sparkles,
  Code2,
} from "lucide-react";

type Member = {
  name: string;
  role: string;
  image?: string;
  roll?: string;
  bio?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  behance?: string;
  badge?: string;
};
type Team = {
  key: string;
  name: string;
  tag: string;
  icon: typeof Crown;
  accent: string;
  glow: string;
  lead: Member;
  members: Member[];
};

const initialsOf = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

/* Leads already get a "Lead" badge on the card — no need to repeat "Lead · X" as the role text too. */
const roleLabel = (role: string) => role.replace(/^Lead\s*·\s*/i, "");

const captain: Member = {
  name: "Hanzala Salaheen",
  role: "Student Builder Group Captain",
  image: "https://res.cloudinary.com/txg3hveh/image/upload/v1783966878/231%201.png",
  roll: "24BSSW041",
  bio: `A Full Stack AI Engineer specializing in RAG and intelligent automation. Experienced in architecting robust backend systems, scalable AI solutions, and AWS pipelines. Committed to building autonomous agents and driving technical growth to create seamless intelligent applications.`,
  github: "https://github.com/hanzi448",
  linkedin: "https://www.linkedin.com/in/hanzala-salaheen",
};

const teams: Team[] = [
  {
    key: "technical",
    name: "Technical Team",
    tag: "Cloud · AI · Engineering",
    icon: Cpu,
    accent: "from-cyan-400/40 to-primary/30",
    glow: "oklch(0.72 0.13 220 / 0.55)",
    lead: {
      name: "Abdul Rafay",
      role: "Lead · Technical",
      image:
        "https://res.cloudinary.com/txg3hveh/image/upload/v1785265811/me_-_Abdul_Rafay_Khalid_Jameel-removebg-preview_pshjxc.png",
      roll: "24BSSW038",
      bio: "A Full Stack Developer passionate about creating modern, user-focused digital experiences. Expert in writing clean, scalable code to solve complex problems. Brings a consistent track record of delivering high-quality, responsive applications.",
      github: "https://github.com/ARafaykhalid",
      linkedin: "https://www.linkedin.com/in/abdulrafaykhalid/",
    },
    members: [
      {
        name: "Waniza Khan",
        role: "Technical",
        image: "https://res.cloudinary.com/txg3hveh/image/upload/v1783966918/Waniza%20Khan.png",
        roll: "24BSSW079",
        bio: "A Full Stack Developer specializing in MERN stack high-performance applications. Experienced in architecting robust APIs and responsive frontends. Committed to writing clean, maintainable code to create seamless user journeys.",
        github: "https://github.com/Waniza-Khan",
        linkedin: "https://www.linkedin.com/in/waniza-khan-32453b301",
        badge: "Built This Website",
      },
      {
        name: "Ahmed Hussain",
        role: "Technical",
        image: "https://res.cloudinary.com/txg3hveh/image/upload/v1783966881/Ahmed%20Hussain.png",
        roll: "24BSCS219",
        bio: "An expert in Red Hat security and Full Stack development with four years of experience. Specializes in building secure, scalable digital solutions. Passionate about tackling complex technical challenges and cybersecurity trends.",
        github: "https://github.com/ahmedhussain176",
        linkedin: "https://www.google.com/search?q=ahmedhussain006",
        portfolio: "https://www.google.com/search?q=ahmed-hussain-dev.vercel.app",
      },
      {
        name: "Ahmed Mujtaba",
        role: "Technical",
        image:
          "https://res.cloudinary.com/txg3hveh/image/upload/v1785534745/Ahmed_Mujtaba-removebg-preview_rfenuq.png",
        roll: "24BSCS026",
        bio: "A passionate Computer Science student specializing in building responsive and aesthetic web interfaces. Expert in React, Tailwind CSS, and JavaScript. Focused on transforming design concepts into seamless user experiences across all devices.",
        github: "https://github.com/mujtabakhan24",
        linkedin: "https://www.linkedin.com/in/mujtabakhan24/",
      },
    ],
  },
  {
    key: "media",
    name: "Media Team",
    tag: "Photo · Video · Story",
    icon: Camera,
    accent: "from-purple-500/35 to-cyan-400/30",
    glow: "oklch(0.65 0.22 300 / 0.5)",
    lead: {
      name: "Mutahir Raza",
      role: "Lead · Media",
      image:
        "https://res.cloudinary.com/txg3hveh/image/upload/v1783966902/Mask%20group%20%284%29.png",
      roll: "24BSSW101",
      bio: "A fitness content creator simplifying healthy living and nutrition for students. Provides practical, budget-friendly guidance to help beginners achieve wellness goals. Committed to demystifying fitness through actionable and accessible content.",
      linkedin: "https://www.linkedin.com/in/mutahir-raza-632027376/",
      portfolio: "https://www.google.com/search?q=https://mutahirrazakhan.my.canva.site/",
    },
    members: [
      {
        name: "Umaima Junaid",
        role: "Media",
        image: "https://res.cloudinary.com/txg3hveh/image/upload/v1783966916/Umaima%20Junaid.png",
        roll: "24BSCS137",
        bio: "A Computer Science student with a deep interest in cybersecurity and innovation. An active debater who refines problem-solving abilities through technical events. Driven by intellectual curiosity and a commitment to collaborative, challenging projects.",
        github: "https://github.com/umaima13",
        linkedin:
          "https://www.linkedin.com/in/umaima-junaid-0ab93a339?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
      {
        name: "Minha Fatima",
        role: "Media",
        image:
          "https://res.cloudinary.com/txg3hveh/image/upload/v1783966907/Minha_Media_-removebg-preview%201.png",
      },
      {
        name: "Muhammad Shayan Baig",
        role: "Media",
        image:
          "https://res.cloudinary.com/txg3hveh/image/upload/v1783966910/Muhammad%20Shayan%20Baig.png",
        roll: "25BSSW113",
        bio: "An aspiring Developer and Digital Marketing expert bridging technical functionality with market reach. Combines core development skills with data-driven strategies for business growth. Passionate about staying ahead of digital trends.",
        github: "https://github.com/shayanbaigminecraft-max",
        linkedin:
          "https://www.linkedin.com/in/mirza-muhammad-shayan-baig-56b038382?utm_source=share_via&utm_content=profile&utm_medium=member_android",
        portfolio: "https://www.behance.net/shayanbaig19",
      },
    ],
  },
  {
    key: "marketing",
    name: "Outreach & Marketing Team",
    tag: "Growth · Social · Brand",
    icon: Megaphone,
    accent: "from-rose-500/35 to-primary/30",
    glow: "oklch(0.65 0.22 25 / 0.55)",
    lead: {
      name: "Aashir Ali",
      role: "Lead · Marketing",
      image: "https://res.cloudinary.com/txg3hveh/image/upload/v1783966880/77%201.png",
      roll: "24BSSWO34",
      bio: "A Software Engineering student dedicated to mastering AWS and cloud infrastructure. Focused on architecting efficient software solutions to support modern, high-demand applications. Committed to building practical skills that address real-world problems.",
      github: "https://github.com/aashirazeemIMS",
      linkedin: "https://linkedin.com/in/aashir-ali-7987b334a",
    },
    members: [
      {
        name: "Taha Baig",
        role: "Marketing",
        image: "https://res.cloudinary.com/txg3hveh/image/upload/v1783966877/1111%201.png",
        roll: "25BSSW089",
        bio: "A Digital Marketer focused on driving growth through data-driven and creative strategies. Expert in social media marketing and content optimization. Committed to delivering measurable results and maximizing brand presence through emerging trends.",
        linkedin:
          "https://www.linkedin.com/in/muhammad-taha-baig-89083a409?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      },
      {
        name: "Farwa Zehra",
        role: "Marketing",
        image:
          "https://res.cloudinary.com/txg3hveh/image/upload/v1785534335/Farwa_Zehra_OR_and_Market_-removebg-preview_1_skmnvs.png",
        roll: "25BSCS002",
        bio: "An aspiring Cloud professional exploring the intersection of technology and product strategy. Focused on architecting cloud-native solutions for scalable digital products. Committed to bridging the gap between high-level technical innovation and design.",
        github: "https://github.com/farwaxzehra",
        linkedin: "https://www.linkedin.com/in/syeda-farwa-zehra",
      },
      {
        name: "Hassan Irfan",
        role: "Marketing",
        image: "https://res.cloudinary.com/txg3hveh/image/upload/v1785534531/Mask_group_cjumtv.png",
        roll: "24BSCS033",
        github: "https://github.com/Hassan-Irfan-07",
        linkedin: "https://www.linkedin.com/in/hassanirfan07",
        bio: "Digital marketer at Sellevate Pty Ltd managing social strategy and paid ads across Australia and Pakistan. 4th-semester BSCS student at HITMS pursuing the IBM Data Science Professional Certificate; transitioning toward data science and AI while freelancing.",
      },
    ],
  },
  {
    key: "events",
    name: "Event Management Team",
    tag: "Ops · Production",
    icon: Calendar,
    accent: "from-primary/35 to-amber-500/30",
    glow: "oklch(0.769 0.165 64.5 / 0.55)",
    lead: {
      name: "Ayesha Shaikh",
      role: "Lead · Events",
      image:
        "https://res.cloudinary.com/txg3hveh/image/upload/v1785534533/Ayesha_Shaikh_Event_Lead_-removebg-preview_1_go86y6.png",
      roll: "24BSSW022",
      bio: "A Software Engineering student and Event Management Lead for AWS SBG and ACM. Expert in coordinating large-scale events through strong leadership. Thrives on blending technical knowledge with strategic planning to ensure project excellence.",
      github: "https://github.com/AyeshaShaikh-19",
      linkedin:
        "https://www.linkedin.com/in/ayeshashaikh2005?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    },
    members: [
      {
        name: "Ayema Nadeem",
        role: "Events",
        image: "https://res.cloudinary.com/txg3hveh/image/upload/v1783966886/Ayema%20Nadeem.png",
        roll: "24BSCS221",
        bio: "A BS Computer Science student balancing technical studies with leadership roles. Actively mastering web development and cloud computing as a member of AWS SBG. Passionate about organizing events to foster a productive, collaborative environment.",
        github: "https://github.com/itsaima",
        linkedin: "https://www.linkedin.com/in/aima-nadeem-186193356",
      },
      {
        name: "Muhammad Hasan",
        role: "Events",
        image: "https://res.cloudinary.com/txg3hveh/image/upload/v1783966909/Muhammad%20Hasan.png",
        roll: "24BSCS127",
        bio: "A dedicated Computer Science student at HITMS and an experienced public speaker. Frequently leads volunteer teams and hosts major university events. Committed to innovation and solving real-world challenges through impactful projects.",
        github: "https://github.com/hasan-aziz127",
        linkedin:
          "https://www.linkedin.com/in/muhammad-hasan-91809233a?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      },
      {
        name: "Muhammad Shahmeer",
        role: "Events",
        image:
          "https://res.cloudinary.com/txg3hveh/image/upload/v1783966914/Shameer_event_-removebg-preview%201.png",
        roll: "25BSFT042",
        bio: "A core member of the AWS SBG HITMS Event Management team. Passionate about fostering tech communities and enhancing the student learning experience. Enjoys collaborating to inspire peers through engaging events and exploration.",
        linkedin:
          "https://www.linkedin.com/in/shahmeer-shaikh-03837b365?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      },
    ],
  },
  {
    key: "creative",
    name: "Creative Team",
    tag: "Design · Brand · Identity",
    icon: Palette,
    accent: "from-fuchsia-500/35 to-primary/30",
    glow: "oklch(0.7 0.25 330 / 0.5)",
    lead: {
      name: "Fahad Shaikh",
      role: "Lead · Creative",
      image:
        "https://res.cloudinary.com/txg3hveh/image/upload/v1783966900/Mask%20group%20%281%29.png",
      roll: "24BSSW013",
      bio: "A UI/UX designer and Computer Science student passionate about crafting clean, user-centered digital experiences. I specialize in balancing aesthetics with usability to build modern websites and mobile apps. Driven by intellectual curiosity and a commitment to creating impactful products while growing my freelance career.",
      linkedin:
        "https://www.linkedin.com/in/fahad-shaikh-21b944245?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      behance: "https://www.behance.net/fahadahmed100",
    },
    members: [
      {
        name: "Misbah Waqar",
        role: "Creative",
        image: "https://res.cloudinary.com/txg3hveh/image/upload/v1783966883/asdas%201.png",
        roll: "24BSSW003",
        bio: "A creative professional who expertly blends visual design with stage presence. Specializes in crafting distinct brand identities while ensuring events run smoothly. Passionate about delivering memorable experiences that connect storytelling with design.",
        linkedin:
          "https://www.linkedin.com/in/misbah-waqar-uddin-86b9b4339?utm_source=share_via&utm_content=profile&utm_medium=member_android",
        portfolio: "https://www.instagram.com/graphysicist?igsh=YXdvODZobzg3OG5k",
      },
      {
        name: "Maryam Arshad",
        role: "Creative",
        image: "https://res.cloudinary.com/txg3hveh/image/upload/v1783966898/Maryam%20Arshad.png",
        roll: "24BSSW078",
        bio: "A BS Software Engineering student bridging technical functionality with creative design. A certified Graphic Designer dedicated to crafting digital products that are both aesthetic and usable. Strives for excellence in user-centric experiences.",
        linkedin: "https://www.linkedin.com/in/maryam-s-78406b363",
      },
      {
        name: "Mariam Memon",
        role: "Creative",
        roll: "24BSSW029",
        image: "https://res.cloudinary.com/txg3hveh/image/upload/v1785262591/MaryamSami_w9bex8.png",
        bio: "A graphic designer crafting bold, purposeful visual identities. Brings two years of experience turning ideas into striking, memorable design. Passionate about shaping concepts into visuals that communicate with clarity and impact.",
        github: "https://github.com/mmAS13",
        linkedin: "https://www.linkedin.com/in/mariammemon13/",
        portfolio: "https://mariammportfolio.netlify.app/",
      },
    ],
  },
];

const allNames = [
  captain.name,
  ...teams.flatMap((t) => [t.lead.name, ...t.members.map((m) => m.name)]),
];

/* ── Modal context: har card se access krne k liye without heavy prop drilling ── */
const MemberModalContext = createContext<{
  open: (m: Member, glow: string) => void;
}>({ open: () => {} });
const useMemberModal = () => useContext(MemberModalContext);

export default function Members() {
  useMeta({
    title: "The Architects | AWS Student Builder Group HITMS",
    description: "Meet the captain and elite teams of AWS Student Builder Group HITMS.",
  });

  const [active, setActive] = useState<{ m: Member; glow: string } | null>(null);

  const open = (m: Member, glow: string) => setActive({ m, glow });
  const close = () => setActive(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <MemberModalContext.Provider value={{ open }}>
      <Layout>
        <PageHeader
          eyebrow="The Architects"
          title="Meet The Minds Building The Cloud"
          subtitle="One leader. Five elite squads. Engineering the future of cloud, AI, development and much more at HITMS."
        />

        <CaptainSpotlight />

        <section className="relative py-6 mt-10 md:mt-14 border-y border-border/60 bg-card/30 overflow-hidden select-none">
          <div className="flex w-max animate-marquee-rev text-xl font-bold uppercase tracking-widest">
            <div className="flex shrink-0 items-center gap-8 sm:gap-12 pr-8 sm:pr-12">
              {allNames.map((n, i) => (
                <span key={i} className="inline-flex items-center gap-8 sm:gap-12 text-muted-foreground/70">
                  {n} <Star size={14} className="text-primary shrink-0" />
                </span>
              ))}
            </div>
            <div className="flex shrink-0 items-center gap-8 sm:gap-12 pr-8 sm:pr-12" aria-hidden="true">
              {allNames.map((n, i) => (
                <span key={`dup-${i}`} className="inline-flex items-center gap-8 sm:gap-12 text-muted-foreground/70">
                  {n} <Star size={14} className="text-primary shrink-0" />
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 space-y-24">
          {teams.map((team, i) => (
            <TeamSection key={team.key} team={team} index={i} />
          ))}
        </section>
      </Layout>

      <AnimatePresence>
        {active && <MemberModal member={active.m} glow={active.glow} onClose={close} />}
      </AnimatePresence>
    </MemberModalContext.Provider>
  );
}

/* ────────────────────────────────────────────────────────────── */

function CaptainSpotlight() {
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [imgFailed, setImgFailed] = useState(false);
  const { open } = useMemberModal();

  return (
    <section className="relative max-w-7xl mx-auto px-4 md:px-8 mt-8 mb-10 md:mb-14">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
          const r = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          setRot({ x: -y * 6, y: x * 8 });
        }}
        onMouseLeave={() => setRot({ x: 0, y: 0 })}
        style={{ transform: `perspective(1400px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)` }}
        data-hover
        onClick={() => open(captain, "oklch(0.769 0.165 64.5 / 0.55)")}
        className="relative overflow-hidden rounded-3xl border border-primary/50 bg-gradient-to-br from-card via-card/80 to-background p-8 md:p-12 preserve-3d cursor-pointer"
      >
        <div className="absolute -top-32 -left-20 h-80 w-80 rounded-full bg-primary/30 blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-[oklch(0.72_0.13_220/0.35)] blur-3xl" />
        <div className="absolute inset-0 aurora-bg opacity-60" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        {[
          "top-4 left-4 border-l-2 border-t-2",
          "top-4 right-4 border-r-2 border-t-2",
          "bottom-4 left-4 border-l-2 border-b-2",
          "bottom-4 right-4 border-r-2 border-b-2",
        ].map((c, i) => (
          <div key={i} className={`absolute h-5 w-5 ${c} border-primary/80`} />
        ))}

        <div className="relative grid md:grid-cols-[auto_1fr_auto] gap-8 md:gap-12 items-center">
          {/* Avatar */}
          <div className="relative shrink-0 mx-auto" style={{ transform: "translateZ(50px)" }}>
            <div className="absolute inset-0 bg-primary/50 blur-3xl rounded-full animate-pulse" />
            <div
              className="absolute -inset-6 rounded-full border border-primary/40 animate-spin-slow"
              style={{ animation: "cursor-rot 20s linear infinite" }}
            />
            <div
              className="absolute -inset-10 rounded-full border border-primary/20"
              style={{ animation: "cursor-rot 35s linear infinite reverse" }}
            />

            <div className="relative h-48 w-48 md:h-60 md:w-60 rounded-full ring-4 ring-primary/30 shadow-[0_0_60px_oklch(0.769_0.165_64.5/0.6)] overflow-hidden">
              {/* Gradient background always present */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-glow to-accent" />

              {/* Initials shown ONLY when image is absent or failed */}
              {(!captain.image || imgFailed) && (
                <span className="absolute inset-0 grid place-items-center text-6xl font-black text-primary-foreground">
                  {initialsOf(captain.name)}
                </span>
              )}

              {/* Photo — covers everything when loaded successfully */}
              {captain.image && !imgFailed && (
                <img
                  src={captain.image}
                  alt={captain.name}
                  onError={() => setImgFailed(true)}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
              )}
            </div>

            {/* Crown badge below avatar */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-[10px] tracking-widest uppercase font-black shadow-[0_0_20px_oklch(0.769_0.165_64.5/0.8)]">
              <Crown size={12} /> Leader
            </div>
          </div>

          {/* Explore button under badges (opens modal) */}
          {/* This button is placed in the info column below the badges for clear spacing */}

          {/* Info */}
          <div className="text-center md:text-left" style={{ transform: "translateZ(30px)" }}>
            <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-primary font-bold mb-3 inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              Student Builder Group · Leader
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight font-display">
              <span className="text-gradient-primary">{captain.name}</span>
            </h2>
            <p className="mt-2 text-base text-muted-foreground max-w-2xl">
              Orchestrating five elite squads, driving the SBG mission, and building the next
              generation of cloud architects at HITMS.
            </p>
            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
              {["AWS", "Leadership", "Vision 2026", "Cloud Native"].map((t) => (
                <span
                  key={t}
                  data-hover
                  className="px-3 py-1 rounded-full border border-primary/40 bg-primary/10 text-[10px] tracking-widest uppercase font-bold text-primary"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-4 flex justify-center md:justify-start">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  open(captain, "oklch(0.769 0.165 64.5 / 0.55)");
                }}
                data-hover
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/40 bg-primary/10 text-sm tracking-widest uppercase font-black text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
              >
                Explore
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-3 md:grid-cols-1 gap-3 md:w-44"
            style={{ transform: "translateZ(20px)" }}
          >
            {[
              { l: "Teams", v: "5", i: ShieldCheck },
              { l: "Members", v: "20", i: Star },
              { l: "Year", v: "2026", i: Rocket },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-xl border border-primary/30 bg-background/60 backdrop-blur px-3 py-3 text-center"
              >
                <s.i size={14} className="text-primary mx-auto mb-1" />
                <div className="text-2xl font-black text-gradient-primary font-display">{s.v}</div>
                <div className="text-[8px] tracking-[0.3em] uppercase text-muted-foreground">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */

function TeamSection({ team, index }: { team: Team; index: number }) {
  const Icon = team.icon;
  const total = 1 + team.members.length;
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
    >
      <div className="flex items-end justify-between flex-wrap gap-4 mb-7">
        <div className="flex items-center gap-4">
          <div
            className={`relative h-16 w-16 rounded-2xl bg-gradient-to-br ${team.accent} border border-primary/40 grid place-items-center text-primary overflow-hidden`}
          >
            <div
              className="absolute inset-0 opacity-50"
              style={{
                background: `radial-gradient(circle at center, ${team.glow}, transparent 70%)`,
              }}
            />
            <Icon size={28} className="relative animate-orbit-y" />
          </div>
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-primary/80 font-bold font-mono">{`TEAM 0${index + 1}`}</p>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight font-display">
              {team.name}
            </h2>
            <p className="text-xs text-muted-foreground tracking-widest uppercase mt-1">
              {team.tag}
            </p>
          </div>
        </div>
        <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/80 font-mono inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          {total} Builders · Active
        </div>
      </div>

      <div className="overflow-hidden">
        <motion.div
          initial={{ x: index % 2 ? 80 : -80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 ${team.members.length === 4 ? "xl:grid-cols-5" : ""} gap-3 sm:gap-4 items-stretch`}
        >
          <MemberCard m={team.lead} team={team} lead />
          {team.members.map((m, i) => (
            <MemberCard key={m.name} m={m} team={team} delay={(i + 1) * 0.08} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

function MemberCard({
  m,
  team,
  lead,
  delay = 0,
}: {
  m: Member;
  team: Team;
  lead?: boolean;
  delay?: number;
}) {
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [imgFailed, setImgFailed] = useState(false);
  const { open } = useMemberModal();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.55, ease: "easeOut" }}
      data-hover
      onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
        const r = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        setRot({ x: -y * 12, y: x * 12 });
      }}
      onMouseLeave={() => setRot({ x: 0, y: 0 })}
      onClick={() => open(m, team.glow)}
      style={{ transform: `perspective(1000px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)` }}
      className={`group relative flex flex-col rounded-2xl border bg-card overflow-hidden transition-transform duration-200 preserve-3d shine-sweep cursor-pointer ${
        lead
          ? "border-primary/70 shadow-[0_0_30px_oklch(0.769_0.165_64.5/0.25)]"
          : m.badge
            ? "border-primary/60 shadow-[0_0_24px_oklch(0.769_0.165_64.5/0.2)]"
            : "border-border hover:border-primary/50"
      }`}
    >
      <div
        className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full blur-3xl opacity-40 group-hover:opacity-80 transition duration-500 pointer-events-none"
        style={{ background: team.glow }}
      />

      {/* Avatar — fixed-size circle, identical for every card so photos never look uneven */}
      <div className="relative pt-6 sm:pt-7 pb-1 flex flex-col items-center shrink-0">
        <div
          className="relative h-32 w-32 sm:h-36 sm:w-36 md:h-40 md:w-40 rounded-full overflow-hidden ring-4 ring-primary/25 shrink-0"
          style={{ boxShadow: `0 0 26px ${team.glow}` }}
        >
          {/* Gradient background always present (fallback base) */}
          <div className={`absolute inset-0 bg-gradient-to-br ${team.accent}`} />

          {/* Initials shown ONLY when image is absent or failed */}
          {(!m.image || imgFailed) && (
            <div className="absolute inset-0 grid place-items-center text-2xl sm:text-3xl font-black font-display text-primary-foreground/90">
              {initialsOf(m.name)}
            </div>
          )}

          {/* Photo — strictly clipped to the circle by the parent's overflow-hidden.
              Same object-fit/object-position treatment as every other avatar on the
              site (captain spotlight + modal), so every photo is framed the same way
              regardless of the source image's own size or aspect ratio. */}
          {m.image && !imgFailed && (
            <img
              src={m.image}
              alt={m.name}
              onError={() => setImgFailed(true)}
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>

        {/* Badges — sit below the circle, centered. Slot height is reserved even when
            empty so every avatar section is identical, keeping name/Explore levels aligned. */}
        <div className="mt-2 min-h-[19px] flex flex-col items-center gap-1">
          {lead && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[8px] tracking-widest uppercase font-black shadow-md">
              <Crown size={9} /> Lead
            </span>
          )}
          {m.badge && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/50 text-[7.5px] tracking-widest uppercase font-black text-primary backdrop-blur-sm shadow-md">
              <Code2 size={8} /> {m.badge}
            </span>
          )}
        </div>
      </div>

      {/* Text block — name always starts here, so all cards line up regardless of badges */}
      <div className="relative flex flex-col flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-center">
        <h3
          className={`font-black tracking-tight leading-tight line-clamp-1 ${lead ? "text-base sm:text-lg" : "text-sm sm:text-base"}`}
        >
          {m.name}
        </h3>

        <div className="mt-3 flex justify-center gap-3">
          {m.github && (
            <a
              href={m.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              data-hover
              className="h-8 w-8 grid place-items-center rounded-md border border-border hover:border-primary hover:text-primary transition"
            >
              <Github size={14} />
            </a>
          )}
          {m.linkedin && (
            <a
              href={m.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              data-hover
              className="h-8 w-8 grid place-items-center rounded-md border border-border hover:border-primary hover:text-primary transition"
            >
              <Linkedin size={14} />
            </a>
          )}
          {m.behance && (
            <a
              href={m.behance}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              data-hover
              className="h-8 w-8 grid place-items-center rounded-md border border-border hover:border-primary hover:text-primary transition"
            >
              <Palette size={14} />
            </a>
          )}
          {m.portfolio && !m.behance && (
            <a
              href={m.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              data-hover
              className="h-8 w-8 grid place-items-center rounded-md border border-border hover:border-primary hover:text-primary transition"
            >
              <Globe size={14} />
            </a>
          )}
          {!m.github && !m.linkedin && !m.portfolio && !m.behance && (
            <span className="h-8 w-8 grid place-items-center rounded-md border border-border text-muted-foreground/50">
              <Twitter size={14} />
            </span>
          )}
        </div>

        {/* Flexible spacer — absorbs leftover space so the button sits at the
            bottom, while guaranteeing the icons never touch the button */}
        <div className="flex-1 min-h-4" />

        <button
          onClick={(e) => {
            e.stopPropagation();
            open(m, team.glow);
          }}
          data-hover
          className="mb-1 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-primary/40 bg-primary/10 text-[10px] sm:text-[11px] tracking-widest uppercase font-black text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
        >
          Explore
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-primary-glow to-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Member profile — opens as its own full page/screen instead of a small dialog */

function MemberModal({
  member,
  glow,
  onClose,
}: {
  member: Member;
  glow: string;
  onClose: () => void;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const hasLinks = member.github || member.linkedin || member.portfolio || member.behance;

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full h-[100dvh] flex flex-col overflow-hidden"
      >
        {/* ambient background, same visual language as the rest of the site */}
        <div
          className="absolute -top-32 -left-24 h-96 w-96 rounded-full blur-3xl opacity-40 pointer-events-none"
          style={{ background: glow }}
        />
        <div
          className="absolute -bottom-40 -right-24 h-[26rem] w-[26rem] rounded-full blur-3xl opacity-25 pointer-events-none"
          style={{ background: glow }}
        />
        <div className="absolute inset-0 aurora-bg opacity-20 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

        <button
          onClick={onClose}
          data-hover
          className="absolute top-5 left-5 z-20 inline-flex items-center gap-1.5 h-10 px-4 rounded-full border border-border bg-background/80 backdrop-blur text-[10px] tracking-widest uppercase font-bold hover:border-primary hover:text-primary transition"
        >
          <ArrowRight size={14} className="rotate-180" /> Back
        </button>
        <button
          onClick={onClose}
          data-hover
          className="absolute top-5 right-5 z-20 h-10 w-10 grid place-items-center rounded-full border border-border bg-background/80 backdrop-blur hover:border-primary hover:text-primary transition"
        >
          <X size={18} />
        </button>

        <div className="relative flex-1 min-h-0 w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-10 flex flex-col justify-center overflow-hidden">
          {/* Hero: photo centered, then the member's name */}
          <div className="flex flex-col items-center text-center mb-5 sm:mb-7 shrink-0">
            <div
              className="relative h-36 w-36 sm:h-44 sm:w-44 md:h-48 md:w-48 rounded-full ring-4 ring-primary/30 overflow-hidden mb-4"
              style={{ boxShadow: `0 0 55px ${glow}` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-glow to-accent" />
              {(!member.image || imgFailed) && (
                <div className="absolute inset-0 grid place-items-center text-5xl font-black text-primary-foreground">
                  {initialsOf(member.name)}
                </div>
              )}
              {member.image && !imgFailed && (
                <img
                  src={member.image}
                  alt={member.name}
                  onError={() => setImgFailed(true)}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
              )}
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight font-display text-gradient-primary">
              {member.name}
            </h1>
            <p className="text-[11px] tracking-[0.3em] uppercase text-primary mt-2 font-black">
              {roleLabel(member.role)}
            </p>
          </div>

          {/* Body: left = identity, right = about */}
          <div className="grid md:grid-cols-[minmax(0,260px)_1fr] gap-4 sm:gap-6 items-start shrink-0">
            {/* Left — identity card */}
            <div className="rounded-2xl border border-border bg-card/60 backdrop-blur p-4 sm:p-5">
              <div className="mb-4">
                <p className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground font-bold mb-1">
                  Name
                </p>
                <p className="text-sm font-black tracking-tight">{member.name}</p>
              </div>

              {member.roll && (
                <div className="mb-4">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground font-bold mb-1">
                    Roll Number
                  </p>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/40 text-[10px] tracking-widest uppercase font-black text-primary w-fit">
                    <IdCard size={12} /> {member.roll}
                  </span>
                </div>
              )}

              {member.badge && (
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/50 text-[10px] tracking-widest uppercase font-black text-primary w-fit">
                    <Code2 size={12} /> {member.badge}
                  </span>
                </div>
              )}

              {hasLinks && (
                <div>
                  <p className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground font-bold mb-2">
                    Social Links
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-hover
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-primary/40 bg-primary/10 text-[10px] tracking-widest uppercase font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                      >
                        <Github size={13} /> GitHub
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-hover
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-primary/40 bg-primary/10 text-[10px] tracking-widest uppercase font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                      >
                        <Linkedin size={13} /> LinkedIn
                      </a>
                    )}
                    {member.behance && (
                      <a
                        href={member.behance}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-hover
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-primary/40 bg-primary/10 text-[10px] tracking-widest uppercase font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                      >
                        <Palette size={13} /> Behance
                      </a>
                    )}
                    {member.portfolio && !member.behance && (
                      <a
                        href={member.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-hover
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-primary/40 bg-primary/10 text-[10px] tracking-widest uppercase font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                      >
                        <Globe size={13} /> Portfolio
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right — about, no box around it, just clean text */}
            <div className="p-1 sm:p-2">
              <p className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.3em] uppercase text-primary font-black mb-3">
                <Sparkles size={12} /> About {member.name}
              </p>
              <p className="text-lg sm:text-xl md:text-xl text-muted-foreground leading-relaxed font-bold">
                {member.bio ?? "Profile details coming soon."}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-primary-glow to-accent" />
      </motion.div>
    </motion.div>
  );
}
