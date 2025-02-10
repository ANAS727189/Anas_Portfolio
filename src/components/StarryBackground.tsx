"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Star {
    id: number
    x: number
    y: number
    size: number
    opacity: number
    }

export default function StarryBackground() {
    const [stars, setStars] = useState<Star[]>([])

    useEffect(() => {
        const generateStars = () => {
        const newStars: Star[] = []
        for (let i = 0; i < 100; i++) {
            newStars.push({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.1,
            })
        }
        setStars(newStars)
        }

        generateStars()
    }, [])

    return (
        <div className="fixed inset-0 pointer-events-none">
        {stars.map((star) => (
            <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: star.size,
                height: star.size,
                opacity: star.opacity,
            }}
            animate={{
                opacity: [star.opacity, star.opacity * 0.5, star.opacity],
                scale: [1, 1.2, 1],
            }}
            transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            />
        ))}
        </div>
    )
}