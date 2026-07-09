import { motion } from "framer-motion";

/**
 * Hero/Home page loader - futuristic 3D tech aesthetic
 */
export function HeroPageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div className="relative w-32 h-32">
        {/* Outer rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary"
        />

        {/* Middle pulsing ring */}
        <motion.div
          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 rounded-full border-2 border-primary-glow opacity-60"
        />

        {/* Center glow orb */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 9, repeat: Infinity }}
          className="absolute inset-8 rounded-full bg-gradient-to-br from-primary to-primary-glow shadow-[0_0_1.875rem_oklch(0.769_0.165_64.5/0.8)]"
        />

        {/* Corner accent elements */}
        {[0, 90, 180, 270].map((angle) => (
          <motion.div
            key={angle}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, delay: angle / 360 }}
            className="absolute w-0.125 h-0.125 bg-primary rounded-full"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${angle}deg) translateX(3.5rem) translateY(-50%)`,
            }}
          />
        ))}
      </motion.div>

      {/* Loading text with tech feel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-20 text-center"
      >
        <p className="text-xs font-mono tracking-[0.2em] uppercase text-primary">Initializing</p>
        <motion.p
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-[0.625rem] font-mono text-muted-foreground mt-2"
        >
          ◢ building your experience
        </motion.p>
      </motion.div>
    </div>
  );
}

/**
 * Events page loader - timeline animation
 */
export function EventsPageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div className="w-full max-w-xs px-6">
        {/* Timeline */}
        <div className="relative space-y-8">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.5, duration: 0.8 }}
              className="flex items-center gap-4"
            >
              {/* Timeline dot */}
              <motion.div
                animate={{
                  scale: [1, 1.4, 1],
                  backgroundColor: [
                    "oklch(0.769 0.165 64.5)",
                    "oklch(0.88 0.12 78)",
                    "oklch(0.769 0.165 64.5)",
                  ],
                }}
                transition={{ duration: 8, repeat: Infinity, delay: i * 0.5 }}
                className="w-3 h-3 rounded-full bg-primary flex-shrink-0"
              />
              {/* Timeline bar */}
              <div className="flex-1 h-1 bg-gradient-to-r from-primary to-primary-glow/30 rounded-full overflow-hidden">
                <motion.div
                  animate={{ x: [-100, 100] }}
                  transition={{ duration: 8, repeat: Infinity, delay: i * 0.5 }}
                  className="h-full w-1/3 bg-primary-glow"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-xs font-mono text-primary mt-12 tracking-widest uppercase"
        >
          Loading events...
        </motion.p>
      </motion.div>
    </div>
  );
}

/**
 * Members page loader - network node animation
 */
export function MembersPageLoader() {
  const nodes = [
    { x: 0, y: 0, delay: 0 },
    { x: 60, y: 60, delay: 0.6 },
    { x: -60, y: 60, delay: 1.2 },
    { x: 60, y: -60, delay: 1.8 },
    { x: -60, y: -60, delay: 2.4 },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div className="relative w-40 h-40">
        {/* Center node */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 9, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 w-0.25 h-0.25 bg-primary rounded-full shadow-[0_0_1.25rem_oklch(0.769_0.165_64.5/0.8)] -translate-x-1/2 -translate-y-1/2"
        />

        {/* Connected nodes */}
        {nodes.map((node, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ delay: node.delay, duration: 1 }}
            className="absolute top-1/2 left-1/2 w-0.1875 h-0.1875 bg-primary-glow rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{ x: node.x, y: node.y }}
          />
        ))}

        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full">
          {nodes.map((node, i) => (
            <motion.line
              key={`line-${i}`}
              x1="50%"
              y1="50%"
              x2={`calc(50% + ${node.x * 16}px)`}
              y2={`calc(50% + ${node.y * 16}px)`}
              stroke="url(#grad)"
              strokeWidth="1"
              initial={{ strokeDasharray: 100, strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: [100, 0, 100] }}
              transition={{ delay: node.delay, duration: 8, repeat: Infinity }}
            />
          ))}
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.769 0.165 64.5)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="oklch(0.88 0.12 78)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-20 text-xs font-mono text-primary tracking-widest uppercase"
      >
        Connecting members...
      </motion.p>
    </div>
  );
}

/**
 * Resources page loader - data flow animation
 */
export function ResourcesPageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div className="w-40 space-y-6">
        {/* Data packets flowing */}
        {[0, 1, 2].map((i) => (
          <motion.div key={i} className="flex items-center gap-3">
            {/* Flowing packet */}
            <motion.div
              animate={{ x: [0, 120, 0] }}
              transition={{ duration: 9, repeat: Infinity, delay: i * 1.2 }}
              className="w-0.1875 h-0.1875 rounded-sm bg-primary shadow-[0_0_0.75rem_oklch(0.769_0.165_64.5/0.8)]"
            />

            {/* Progress bar */}
            <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ duration: 9, repeat: Infinity, delay: i * 1.2 }}
                className="h-full bg-gradient-to-r from-primary to-primary-glow origin-left"
              />
            </div>
          </motion.div>
        ))}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-xs font-mono text-primary mt-12 tracking-widest uppercase"
        >
          Fetching resources
        </motion.p>
      </motion.div>
    </div>
  );
}

/**
 * About page loader - building/construction theme
 */
export function AboutPageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div className="text-center">
        {/* Stacked blocks animation */}
        <motion.div className="flex items-end justify-center gap-0.0625 h-1.25 mb-0.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              animate={{ height: [40, 80, 40] }}
              transition={{ duration: 8, repeat: Infinity, delay: i * 0.4 }}
              className="w-0.125 bg-gradient-to-t from-primary to-primary-glow rounded-sm"
            />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs font-mono text-primary tracking-widest uppercase"
        >
          Building knowledge
        </motion.p>
      </motion.div>
    </div>
  );
}

/**
 * Contact page loader - message/communication theme
 */
export function ContactPageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div className="w-32 space-y-4">
        {/* Message bubbles animation */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 1, duration: 1.2 }}
            className={`h-2 bg-gradient-to-r from-primary to-primary-glow rounded-full ${
              i % 2 === 0 ? "w-20" : "w-24 ml-auto"
            }`}
          />
        ))}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-xs font-mono text-primary mt-8 tracking-widest uppercase"
        >
          Preparing message
        </motion.p>
      </motion.div>
    </div>
  );
}
