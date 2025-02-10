"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const GlowingOrb: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener("mousemove", handleMouseMove)

        return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])

    return (
        <motion.div
        className="glow-orb"
        style={{
            position: "fixed",
            top: 0,
            left: 0,
            pointerEvents: "none",
            zIndex: 100,
        }}
        animate={{
            x: mousePosition.x - 25,
            y: mousePosition.y - 25,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        >
        <div
            style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.8) 0%, rgba(59,130,246,0) 70%)",
            filter: "blur(10px)",
            }}
        />
        </motion.div>
    )
    }

export default GlowingOrb

