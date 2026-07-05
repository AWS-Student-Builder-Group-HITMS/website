import { motion } from "framer-motion";

export function SkeletonLoader() {
  const skeletonVariants = {
    initial: { opacity: 0.6 },
    animate: { opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Header skeleton */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="space-y-4"
        >
          <div className="h-12 bg-muted rounded-lg w-3/4" />
          <div className="h-6 bg-muted rounded-lg w-1/2" />
        </motion.div>
      </div>

      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            className="space-y-4"
          >
            <div className="h-40 bg-muted rounded-lg" />
            <div className="h-4 bg-muted rounded-lg w-3/4" />
            <div className="h-4 bg-muted rounded-lg w-1/2" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
