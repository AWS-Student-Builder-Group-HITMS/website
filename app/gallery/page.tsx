"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Hero from "@/components/Hero"

const galleryImages = [
  {
    id: 1,
    title: "AWS Workshop 2026",
    category: "Workshop",
    image: "https://via.placeholder.com/400x300?text=Workshop+1",
  },
  {
    id: 2,
    title: "Cloud Architecture Session",
    category: "Session",
    image: "https://via.placeholder.com/400x300?text=Architecture",
  },
  {
    id: 3,
    title: "Team Collaboration",
    category: "Event",
    image: "https://via.placeholder.com/400x300?text=Team+Work",
  },
  {
    id: 4,
    title: "Career Talk with Experts",
    category: "Career",
    image: "https://via.placeholder.com/400x300?text=Career+Talk",
  },
  {
    id: 5,
    title: "Hands-on Lab Session",
    category: "Workshop",
    image: "https://via.placeholder.com/400x300?text=Lab+Session",
  },
  {
    id: 6,
    title: "Club Meetup",
    category: "Event",
    image: "https://via.placeholder.com/400x300?text=Club+Meetup",
  },
  {
    id: 7,
    title: "AWS Certification Prep",
    category: "Workshop",
    image: "https://via.placeholder.com/400x300?text=Certification",
  },
  {
    id: 8,
    title: "Innovation Hackathon",
    category: "Event",
    image: "https://via.placeholder.com/400x300?text=Hackathon",
  },
]

const categories = ["All", "Workshop", "Session", "Career", "Event"]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory)

  return (
    <>
      <Hero
        title="Event Gallery"
        subtitle="Moments from our amazing events and activities"
        animated
      />

      <section className="py-24 bg-dark-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl shadow-gradient-lg hover:shadow-gradient-xl transition-all duration-300 cursor-pointer border border-white/20"
              >
                <div className="relative h-72 overflow-hidden bg-gradient-primary">
                  <img
                    src={image.image}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">View</span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-900 to-transparent p-4 text-white">
                  <p className="text-xs text-blue-200 mb-1">{image.category}</p>
                  <h3 className="font-bold text-lg">{image.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
