"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Hero from "@/components/Hero"

interface Event {
  _id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  category: string
  attendees: number
  image?: string
}

const DEFAULT_EVENTS: Event[] = [
  {
    _id: "1",
    title: "AWS Fundamentals Workshop",
    date: "2026-05-15",
    time: "3:00 PM",
    location: "Tech Lab A",
    description: "Introduction to AWS core services including EC2, S3, and RDS.",
    category: "Workshop",
    attendees: 120,
    image: "https://via.placeholder.com/400x200?text=AWS+Workshop",
  },
  {
    _id: "2",
    title: "Cloud Architecture Bootcamp",
    date: "2026-05-22",
    time: "2:00 PM",
    location: "Main Hall",
    description: "Learn to design scalable and secure cloud architectures.",
    category: "Bootcamp",
    attendees: 85,
    image: "https://via.placeholder.com/400x200?text=Architecture",
  },
  {
    _id: "3",
    title: "DevOps & CI/CD Pipeline Session",
    date: "2026-05-29",
    time: "4:00 PM",
    location: "Tech Lab B",
    description: "Master DevOps practices and continuous integration/deployment.",
    category: "Technical Session",
    attendees: 95,
    image: "https://via.placeholder.com/400x200?text=DevOps",
  },
  {
    _id: "4",
    title: "Career Talk: Industry Experts",
    date: "2026-06-05",
    time: "5:30 PM",
    location: "Auditorium",
    description: "Interact with professionals working at top cloud companies.",
    category: "Career Talk",
    attendees: 200,
    image: "https://via.placeholder.com/400x200?text=Career+Talk",
  },
]

const categories = ["All", "Workshop", "Bootcamp", "Technical Session", "Career Talk"]

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>(DEFAULT_EVENTS)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events")
        const data = await response.json()
        if (data.success) {
          setEvents(data.data)
        }
      } catch (error) {
        console.log("Using default events")
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter((event) => event.category === selectedCategory)

  return (
    <>
      <Hero
        title="Upcoming Events"
        subtitle="Amazing learning opportunities and networking sessions"
        animated
      />

      <section className="py-24 bg-dark-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl bg-accent-purple animate-float"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 rounded-full blur-3xl bg-accent-magenta animate-float" style={{ animationDelay: "2s" }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 justify-center mb-16"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "btn-gradient text-white shadow-gradient-lg"
                    : "glass-effect text-dark-700 hover:bg-white/50 border border-dark-200"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Events Grid */}
          {loading ? (
            <div className="text-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-primary border-t-accent-magenta rounded-full mx-auto"
              ></motion.div>
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="group glass-effect rounded-2xl overflow-hidden border border-white/40 hover:border-primary/40 transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="h-48 bg-gradient-primary relative overflow-hidden">
                    {event.image && (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.style.display = "none"
                        }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="p-6">
                    <motion.div
                      className="inline-block bg-gradient-to-r from-primary/20 to-accent-purple/20 text-primary px-4 py-2 rounded-full text-xs font-bold mb-4 border border-primary/30"
                      whileHover={{ scale: 1.1 }}
                    >
                      {event.category}
                    </motion.div>

                    <h3 className="text-xl font-bold text-dark-900 mb-3 group-hover:gradient-text transition-all duration-300">{event.title}</h3>
                    <p className="text-dark-600 mb-5 text-sm leading-relaxed">{event.description}</p>

                    <div className="space-y-3 text-sm text-dark-700 mb-6">
                      <p className="flex items-center">
                        <span className="text-lg mr-3">📅</span>
                        <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                      </p>
                      <p className="flex items-center">
                        <span className="text-lg mr-3">📍</span>
                        <span>{event.location}</span>
                      </p>
                      <p className="flex items-center">
                        <span className="text-lg mr-3">👥</span>
                        <span>{event.attendees} Attendees</span>
                      </p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full btn-gradient py-3 rounded-lg font-bold text-white"
                    >
                      Register Now →
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-dark-600 text-lg">No events found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
