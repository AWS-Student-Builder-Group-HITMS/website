"use client"

import { motion } from "framer-motion"
import Hero from "@/components/Hero"

const missionPoints = [
  {
    title: "Education",
    description: "Provide quality education on AWS cloud platforms and modern cloud technologies.",
  },
  {
    title: "Skill Development",
    description: "Help students develop practical cloud skills through hands-on workshops and projects.",
  },
  {
    title: "Certification Support",
    description: "Guide students in obtaining AWS certifications to boost their career prospects.",
  },
  {
    title: "Community Building",
    description: "Foster a supportive community of cloud enthusiasts at HITMS.",
  },
]

const achievements = [
  "Established AWS Academy Partnership",
  "500+ Active Members",
  "50+ Workshops & Events",
  "100+ AWS Certified Members",
  "National Cloud Conference Participation",
  "Industry Partnerships & Internships",
]

export default function AboutPage() {
  return (
    <>
      <Hero
        title="About AWS Cloud Club HITMS"
        subtitle="Our Journey in Cloud Excellence"
        animated
      />

      <section className="py-24 bg-dark-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-40 right-40 w-80 h-80 rounded-full blur-3xl bg-accent-magenta animate-float"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold gradient-text mb-6">Our Mission</h2>
              <div className="h-1 w-16 bg-gradient-primary rounded-full mb-8"></div>
              <p className="text-dark-700 text-lg mb-8 leading-relaxed">
                AWS Cloud Club HITMS is dedicated to empowering students with cloud computing knowledge and skills. We create a collaborative environment where aspiring cloud professionals can learn, grow, and network.
              </p>
              <div className="space-y-4">
                {missionPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4 group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-primary mb-1 group-hover:text-accent-purple transition-colors duration-300">{point.title}</h3>
                      <p className="text-dark-600">{point.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-primary rounded-2xl p-10 text-white relative overflow-hidden group"
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 opacity-20"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ background: "radial-gradient(circle, #b2008f 0%, transparent 70%)" }}
              ></motion.div>

              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
                <p className="text-white/80 text-lg leading-relaxed mb-10">
                  To be the premier cloud computing community at HITMS, producing industry-ready professionals who drive innovation through cloud technologies.
                </p>

                <div className="glass-dark rounded-xl p-6 border border-white/20">
                  <h4 className="text-lg font-bold mb-6 flex items-center">
                    <span className="w-2 h-2 bg-accent-magenta rounded-full mr-3"></span>
                    Core Values
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "Excellence in Technical Knowledge",
                      "Collaborative Learning",
                      "Industry Relevance",
                      "Career Growth",
                    ].map((value, idx) => (
                      <li key={idx} className="flex items-center space-x-3 group">
                        <span className="text-accent-magenta text-lg">✦</span>
                        <span className="group-hover:translate-x-2 transition-transform duration-300">{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-24 bg-gradient-vertical text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 left-20 w-96 h-96 rounded-full blur-3xl bg-white"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">Our Achievements</h2>
            <div className="h-1 w-24 bg-white/30 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group glass-dark rounded-xl p-6 border border-white/20 hover:border-white/50 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-magenta/0 to-accent-purple/0 group-hover:from-accent-magenta/10 group-hover:to-accent-purple/10 transition-all duration-300"></div>

                <div className="relative z-10 flex items-start">
                  <span className="text-2xl mr-4 group-hover:scale-125 transition-transform duration-300">⭐</span>
                  <p className="text-lg font-semibold group-hover:text-white transition-colors duration-300">{achievement}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
