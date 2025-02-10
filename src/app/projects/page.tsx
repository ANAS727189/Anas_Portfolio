"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StarryBackground from "@/components/StarryBackground"
import GlowingOrb from "@/components/GlowingOrb"

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
    );
};

const ProjectsPage = () => {
    const projects = [
        {
            title: "AutoML-MLOps",
            image: "/auto-ml-cropped.png",
            description: "A comprehensive platform that simplifies the machine learning workflow by automating model development, training, and deployment. With features like real-time dashboards, interactive data visualization, and automated target selection.",
            features: [
                "Automated end-to-end ML pipeline with intuitive drag-and-drop interface for dataset upload and model configuration",
                "Real-time training dashboard with interactive visualizations and progress monitoring",
                "Smart preprocessing engine with automated feature engineering and target variable detection",
                "Comprehensive model evaluation suite featuring customizable metrics and performance comparisons",
                "Flexible architecture supporting both automated workflows for beginners and custom configurations for experts"
            ],
            technologies: ["Next.js", "Python3", "Typescript", "Scikit-learn", "TailwindCSS", "recharts"],
            // liveLink: "https://attend-ease-iota.vercel.app/",
            githubLink: "https://github.com/ANAS727189/AutoML-MLOps/"
        },
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
            title: "CloudKeeper",
            image: "/cloudkeeper.png",
            description: "A modern take on cloud storage, offering space-efficient file management and AI-powered file analysis. It's designed to provide a seamless experience for users who need more than just storage - they need intelligent interaction with their data.",
            features: [
                "Enterprise-level storage system with Cloudinary-powered compression that automatically optimizes files while maintaining quality",
                "AI-enhanced file analysis powered by Google's Gemini API for intelligent data insights and natural language queries",
                "Modern, intuitive dashboard featuring real-time storage metrics and visual file type analytics",
                "Comprehensive file management system with advanced search, filtering, and organization capabilities",
                "Secure authentication and file-sharing infrastructure ensuring data protection and privacy"
            ],
            technologies: ["Next.js", "React.js", "Appwrite", "Cloudinary", "Gemini-api", "shadcn"],
            liveLink: "https://cloud-keeper.vercel.app/",
            githubLink: "https://github.com/ANAS727189/CloudKeeper"
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
        },
        {
            title: "ProspectIQ",
            image: "/prospect-iq-cropped.png",
            description: "A cutting-edge tool for B2B sales and marketing teams, combining web scraping, AI-powered data enrichment, and real-time analytics to streamline the lead generation process and provide actionable insights.",
            features: [
                "Automated lead generation system powered by Crunchbase API with continuous data scraping and enrichment.",
                "AI-driven data analysis using Google's Gemini API for comprehensive prospect profiling and insights.",
                "Real-time SERP intelligence providing up-to-date company digital footprints and market presence.",
                "Advanced analytics dashboard featuring interactive visualizations and performance metrics.",
                "Automated 4-hour data refresh cycle ensuring consistently updated prospect information."
            ],
            technologies: ["Python3", "React.js", "Flask", "SERP-API", "Crunchbase API", "shadcn"],
            githubLink: "https://github.com/ANAS727189/ProspectIQ"
        },
        {
            title: "BuzzChat",
            image: "/buzz-chat-cropped.png",
            description: "🐝 BuzzChat is a real-time messaging app with React, Node.js, Socket.io. Secure auth, customizable themes, instant messaging. Full-stack modern chat solution !",
            features: [
                "Real-time messaging system powered by Socket.io enabling instant communication and live status updates",
                "Robust authentication infrastructure using JWT for secure user access and data protection",
                "Dynamic theme customization allowing personalized user experience and interface preferences",
                "Comprehensive user profile system with Cloudinary-powered avatar management",
                "Advanced messaging features including typing indicators and online/offline status tracking"
            ],
            technologies: ["Nodejs", "React.js", "ExpressJS", "MongoDB", "DaisyUI", "Cloudinary", "Zustand", "tailwindcss"],
            liveLink: "https://buzz-chat-qtdn.onrender.com/",
            githubLink: "https://github.com/ANAS727189/Buzzchat"
        },
    ];

    return (
        <div className="min-h-screen flex justify-center bg-black text-white relative overflow-hidden">
        <StarryBackground />
        <GlowingOrb />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse" />
        <div className="max-w-4xl w-full px-4 py-10 relative z-10">
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