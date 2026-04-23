"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Hero from "@/components/Hero"

const defaultMembers = [
  {
    _id: "1",
    name: "Raj Kumar",
    role: "Club President",
    department: "Computer Science",
    image: "https://via.placeholder.com/300x300?text=Raj",
    certified: true,
  },
  {
    _id: "2",
    name: "Priya Singh",
    role: "Vice President",
    department: "Information Technology",
    image: "https://via.placeholder.com/300x300?text=Priya",
    certified: true,
  },
  {
    _id: "3",
    name: "Arjun Patel",
    role: "Event Coordinator",
    department: "Computer Science",
    image: "https://via.placeholder.com/300x300?text=Arjun",
    certified: false,
  },
  {
    _id: "4",
    name: "Isha Sharma",
    role: "Technical Lead",
    department: "Software Engineering",
    image: "https://via.placeholder.com/300x300?text=Isha",
    certified: true,
  },
  {
    _id: "5",
    name: "Ahmed Khan",
    role: "Community Manager",
    department: "Computer Science",
    image: "https://via.placeholder.com/300x300?text=Ahmed",
    certified: false,
  },
  {
    _id: "6",
    name: "Zara Mohammed",
    role: "Content Creator",
    department: "Information Technology",
    image: "https://via.placeholder.com/300x300?text=Zara",
    certified: true,
  },
  {
    _id: "7",
    name: "Vikram Singh",
    role: "Workshop Coordinator",
    department: "Computer Science",
    image: "https://via.placeholder.com/300x300?text=Vikram",
    certified: true,
  },
  {
    _id: "8",
    name: "Neha Gupta",
    role: "Social Media Lead",
    department: "Software Engineering",
    image: "https://via.placeholder.com/300x300?text=Neha",
    certified: false,
  },
]

export default function MembersPage() {
  const [members, setMembers] = useState(defaultMembers)
  const [loading, setLoading] = useState(true)
  const [selectedRole, setSelectedRole] = useState("All")

  const roles = ["All", "Club President", "Vice President", "Event Coordinator", "Technical Lead", "Community Manager"]

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("/api/members")
        const data = await response.json()
        if (data.success) {
          setMembers(data.data)
        }
      } catch (error) {
        console.log("Using default members")
      } finally {
        setLoading(false)
      }
    }

    fetchMembers()
  }, [])

  const filteredMembers =
    selectedRole === "All"
      ? members
      : members.filter((member) => member.role === selectedRole)

  return (
    <>
      <Hero
        title="Our Team"
        subtitle="Meet the amazing people driving AWS Cloud Club HITMS"
        animated
      />

      <section className="py-24 bg-dark-50 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 justify-center mb-16"
          >
            {roles.map((role) => (
              <motion.button
                key={role}
                onClick={() => setSelectedRole(role)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  selectedRole === role
                    ? "btn-gradient text-white shadow-gradient-lg"
                    : "glass-effect text-dark-700 hover:bg-white/50 border border-dark-200"
                }`}
              >
                {role}
              </motion.button>
            ))}
          </motion.div>

          {loading ? (
            <div className="text-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-primary border-t-accent-magenta rounded-full mx-auto"
              ></motion.div>
            </div>
          ) : filteredMembers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredMembers.map((member, index) => (
                <motion.div
                  key={member._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="group glass-effect rounded-2xl overflow-hidden border border-white/40 hover:border-primary/40 transition-all duration-300 shadow-gradient-md hover:shadow-gradient-lg"
                >
                  <div className="relative h-64 overflow-hidden bg-gradient-primary">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.style.display = "none"
                      }}
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-dark-900 mb-1 group-hover:gradient-text transition-all duration-300">{member.name}</h3>
                    <p className="text-secondary font-semibold mb-2 text-sm">{member.role}</p>
                    <p className="text-dark-600 text-xs mb-4">{member.department}</p>

                    {member.certified && (
                      <div className="inline-block bg-yellow-100/80 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
                        ⭐ AWS Certified
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-dark-600 text-lg">No members found in this role.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
