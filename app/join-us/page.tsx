"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Hero from "@/components/Hero"

const benefits = [
  "Access to exclusive AWS workshops and training sessions",
  "Mentorship from industry professionals",
  "Networking opportunities with cloud enthusiasts",
  "AWS certification exam discounts",
  "Project collaboration on real-world cloud solutions",
  "Career guidance and internship opportunities",
]

export default function JoinUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNo: "",
    department: "",
    year: "",
    experience: "",
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
      const response = await fetch("/api/join", {
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
          rollNo: "",
          department: "",
          year: "",
          experience: "",
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
        title="Join AWS Cloud Club HITMS"
        subtitle="Start your cloud journey with us today"
        animated
      />

      <section className="py-24 bg-dark-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold gradient-text mb-8">Member Benefits</h2>
              <div className="h-1 w-16 bg-gradient-primary rounded-full mb-8"></div>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4 glass-effect p-4 rounded-lg border border-white/40 group hover:border-primary/40 transition-all duration-300"
                  >
                    <span className="text-2xl mt-1 group-hover:scale-125 transition-transform duration-300">✓</span>
                    <p className="text-dark-700 group-hover:text-dark-900 transition-colors duration-300">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-effect p-10 rounded-2xl shadow-gradient-lg border border-white/40"
            >
              <h3 className="text-2xl font-bold text-dark-900 mb-8">Quick Sign Up</h3>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-100/80 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 glass-effect"
                >
                  ✓ Thank you! We will contact you soon!
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-dark-900 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/50 border border-dark-200 text-dark-900 placeholder-dark-500 focus:border-primary focus:outline-none transition-all duration-300"
                    placeholder="Your Full Name"
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-dark-900 mb-2">Roll No</label>
                    <input
                      type="text"
                      name="rollNo"
                      value={formData.rollNo}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/50 border border-dark-200 text-dark-900 placeholder-dark-500 focus:border-primary focus:outline-none transition-all duration-300"
                      placeholder="12345"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-dark-900 mb-2">Year</label>
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/50 border border-dark-200 text-dark-900 focus:border-primary focus:outline-none transition-all duration-300"
                    >
                      <option value="">Select Year</option>
                      <option value="1st">1st Year</option>
                      <option value="2nd">2nd Year</option>
                      <option value="3rd">3rd Year</option>
                      <option value="4th">4th Year</option>
                    </select>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-gradient py-3 rounded-lg font-bold text-white disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Join Now →"}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
