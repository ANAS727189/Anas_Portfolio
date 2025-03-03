"use client"
import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"
import Experiences from "@/components/Experiences"
import Profile from "@/components/Profile"
import { Button } from "@/components/ui/button"
import GlowingOrb from "@/components/GlowingOrb"
import StarryBackground from "@/components/StarryBackground"

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <div className="min-h-screen flex justify-center bg-black text-white relative overflow-hidden">
      <StarryBackground />
      <GlowingOrb />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse" />
      <div className="max-w-4xl w-full px-4 py-10 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex justify-between items-center">
            <Navbar />
          </div>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="mt-16">
          <motion.h1
            className="font-bold text-5xl bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Hi, I'm Anas Khan
          </motion.h1>

          <motion.ul className="mt-4 text-lg text-zinc-400 max-w-2xl space-y-2" variants={containerVariants}>
            {[
              "I am a Fullstack developer based in India.",
              "I am also an UI/UX developer.",
              "I am 3 star coder at Codechef (Max rating - 1632+).",
              "I contribute to open source projects.",
              "Let's connect and discuss potential work opportunities.",
            ].map((text, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-2 hover:text-blue-400 transition-colors duration-200"
                variants={itemVariants}
              >
                <span className="text-blue-500">•</span>
                {text}
              </motion.li>
            ))}
          </motion.ul>
          <Button
            onClick={() => window.open("/My_Resume.pdf")}
            className="mt-4 hover:bg-blue-600 transition-all shadow-lg font-bold relative overflow-hidden group"
          >
            <span className="relative z-10">View Resume</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold mb-6">Experience</h2>
          <Experiences />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold mb-6">Profile</h2>
          <Profile />
        </motion.div>
      </div>
    </div>
  )
}