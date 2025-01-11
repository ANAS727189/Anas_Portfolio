"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ProjectCard = ({ 
    title, 
    image, 
    description,
    features,
    technologies,
    liveLink, 
    githubLink,
    index 
}: { 
    title: string;
    image: string;
    description: string;
    features: string[];
    technologies: string[];
    liveLink?: string;
    githubLink?: string;
    index: number;
}) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.5,
                delay: index * 0.2 
            }
        }
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-8"
        >
            <Card className="bg-zinc-950/50 border border-zinc-800/50 backdrop-blur-sm overflow-hidden">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                            {title}
                        </span>
                        <div className="flex space-x-2 text-gray-500">
                            {githubLink && (
                                <a href={githubLink} target="_blank" rel="noopener noreferrer" 
                                    className="p-2 hover:bg-zinc-800 hover:text-blue-500 rounded-full transition-colors">
                                    <Github className="w-5 h-5" />
                                </a>
                            )}
                            {liveLink && (
                                <a href={liveLink} target="_blank" rel="noopener noreferrer"
                                    className="p-2 hover:bg-zinc-800 hover:text-blue-500 rounded-full transition-colors">
                                    <ExternalLink className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="relative group h-48 overflow-hidden">
                        <Image
                            src={image}
                            width={800}
                            height={400}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent opacity-60" />
                    </div>

                    <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                            {technologies.map((tech, idx) => (
                                <Badge 
                                    key={idx} 
                                    variant="secondary" 
                                    className="bg-zinc-800/50 text-zinc-300 border border-zinc-700 hover:bg-zinc-900 hover:text-blue-500 cursor-pointer"
                                >
                                    {tech}
                                </Badge>
                            ))}
                        </div>
                        <p className="text-zinc-300">{description}</p>
                        
                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold text-zinc-200">Key Features:</h3>
                            <ul className="space-y-2 text-zinc-300">
                                {features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-1">•</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

const ProjectsPage = () => {
    const projects = [
        {
            title: "AttendEase",
            image: "/attend-ease.png",
            description: "A centralized platform designed for efficient student record management, attendance tracking, and personalized course recommendations based on student grade.",
            features: [
                "Upload and manage courses by grade with YouTube-like video interface",
                "Comprehensive student data management and grade organization",
                "Efficient attendance tracking with date-wise and grade-wise filtering",
                "Intuitive dashboard with modern UI and seamless navigation",
                "Real-time updates and responsive design for all devices"
            ],
            technologies: ["Next.js", "React.js", "Node.js", "MongoDB", "Mongoose"],
            liveLink: "https://attend-ease-iota.vercel.app/",
            githubLink: "https://github.com/ANAS727189/AttendEase"
        },
        {
            title: "MediaHub",
            image: "/media-hub.png",
            description: "A robust platform designed for video streaming, media editing, and user management, combining seamless streaming capabilities with powerful editing tools.",
            features: [
                "Advanced video streaming with upload and management capabilities",
                "Professional-grade media editor for images and videos",
                "Secure user authentication and personalized experiences",
                "Responsive design optimized for various devices",
                "Dark/Light mode theme support for comfortable viewing"
            ],
            technologies: ["React.js", "Node.js", "Express", "MongoDB", "Clerk", "FFmpeg"],
            liveLink: "https://front-media.onrender.com/",
            githubLink: "https://github.com/ANAS727189/MediaHub"
        }
    ];

    return (
        <div className="min-h-screen flex justify-center bg-black text-white">
            <div className="max-w-4xl w-full px-4 py-10">
                <div className="flex justify-between items-center">
                    <Navbar />
                </div>
                
                <motion.h1 
                    className="mt-16 font-bold text-4xl bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Projects
                </motion.h1>

                <div className="mt-8">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            {...project}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;