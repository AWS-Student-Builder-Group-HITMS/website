"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Hero from "@/components/Hero"

const contactInfo = [
  {
    icon: "📧",
    title: "Email",
    value: "awscc@hitms.edu",
    link: "mailto:awscc@hitms.edu",
  },
  {
    icon: "📍",
    title: "Location",
    value: "HITMS Campus, Delhi",
    link: "#",
  },
  {
    icon: "🕐",
    title: "Office Hours",
    value: "Mon - Fri, 2:00 PM - 5:00 PM",
    link: "#",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const nameAttr = e.target.name
    const value = e.target.value
    setFormData((prev) => ({ ...prev, [nameAttr]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitted(true)
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
        setTimeout(() => setSubmitted(false), 5000)
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Hero
        title="Contact Us"
        subtitle="Get in touch with the AWS Cloud Club team"
        animated
      />

      <section className="py-24 bg-dark-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-40 w-72 h-72 rounded-full blur-3xl bg-accent-magenta animate-float"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold gradient-text mb-2">Get In Touch</h2>
              <div className="h-1 w-16 bg-gradient-primary rounded-full mb-8"></div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4 group"
                  >
                    <div className="text-4xl group-hover:scale-125 transition-transform duration-300">{info.icon}</div>
                    <div>
                      <h3 className="font-bold text-primary mb-1 group-hover:text-accent-purple transition-colors duration-300">{info.title}</h3>
                      <a
                        href={info.link}
                        className="text-dark-600 hover:text-primary transition-colors duration-300"
                      >
                        {info.value}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-10 glass-effect rounded-xl p-6 border border-dark-200"
              >
                <h3 className="font-bold text-primary mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {["twitter", "instagram", "linkedin", "facebook"].map((social) => (
                    <motion.a
                      key={social}
                      href="#"
                      className="w-10 h-10 rounded-lg glass-effect flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      <span className="text-lg">🔗</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-effect rounded-2xl p-10 border border-white/40"
            >
              <h3 className="text-2xl font-bold text-dark-900 mb-8">Send us a Message</h3>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-100/80 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 glass-effect"
                >
                  ✓ Message sent successfully! We will reply soon.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-dark-900 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/50 border border-dark-200 text-dark-900 placeholder-dark-500 focus:border-primary focus:outline-none transition-all duration-300"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark-900 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/50 border border-dark-200 text-dark-900 placeholder-dark-500 focus:border-primary focus:outline-none transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark-900 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/50 border border-dark-200 text-dark-900 placeholder-dark-500 focus:border-primary focus:outline-none transition-all duration-300"
                    placeholder="Message Subject"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark-900 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/50 border border-dark-200 text-dark-900 placeholder-dark-500 focus:border-primary focus:outline-none transition-all duration-300"
                    placeholder="Your message here..."
                    rows={6}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-gradient py-3 rounded-lg font-bold text-white disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Message →"}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
