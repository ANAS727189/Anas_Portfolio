import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Briefcase, CircleDot } from 'lucide-react';

const ExperienceCard = ({ 
    title, 
    role, 
    duration, 
    responsibilities,
    index
}: { 
    title: string;
    role: string;
    duration: string;
    responsibilities: string[];
    index: number;
}) => {
    const cardVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { 
                duration: 0.3,
                delay: index * 0.1  // Reduced delay between cards
            }
        }
    };

    const listVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05  // Faster stagger for list items
            }
        }
    };

    const listItemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.2 }
        }
    };

    return (
        <div className="relative mb-8 md:mb-12">
            <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}  // Earlier trigger
                className="flex gap-4 md:gap-8 items-start relative"
            >
                {/* Timeline line and dot */}
                <div className="hidden md:flex flex-col items-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2, delay: index * 0.1 }}
                        className="relative"
                    >
                        <CircleDot className="w-8 h-8 text-blue-500" />
                    </motion.div>
                    <div className="w-px h-full bg-gradient-to-b from-blue-500 to-transparent absolute top-8" />
                </div>

                {/* Card Content */}
                <Card className="flex-1 bg-zinc-950/50 border border-zinc-800/50 backdrop-blur-sm">
                    <CardHeader>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-start justify-between flex-wrap gap-2">
                                <div className="space-y-1">
                                    <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                                        {title}
                                    </CardTitle>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
                                            <Briefcase className="w-3 h-3 mr-1" />
                                            {role}
                                        </Badge>
                                    </div>
                                </div>
                                <Badge variant="outline" className="border-zinc-700 text-gray-500">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {duration}
                                </Badge>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <motion.ul 
                            className="space-y-3"
                            variants={listVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {responsibilities.map((responsibility, idx) => (
                                <motion.li 
                                    key={idx}
                                    variants={listItemVariants}
                                    className="text-zinc-300 pl-4 border-l-2 border-blue-500/50 hover:border-blue-500 transition-colors"
                                >
                                    {responsibility}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

const Experiences = () => {
    const experiences = [
        {
            title: "InfoKalash",
            role: "Full Stack Developer",
            duration: "2025 - Present",
            responsibilities: [
                "Designed a comprehensive website using Figma, focusing on user experience and modern design principles.",
                "Implemented the design using a full-stack approach with React.js for the frontend and Node.js/Express for the backend.",
                "Built a scalable MongoDB database architecture to handle complex data relationships and user interactions.",
                "Implemented responsive design principles ensuring seamless experience across all devices."
            ]
        },
        {
            title: "College Website Team",
            role: "Frontend Developer",
            duration: "March 2024 - August 2024",
            responsibilities: [
                "Collaborated in the creation of a college website that supports 1,000+ concurrent users, employing advanced technologies like Next.js and TypeScript; the project streamlined content management, allowing for real-time updates and edits.",
                "Designed and developed a key webpage, adhering to design specifications and optimizing for enhanced user experience, resulting in a 15% increase in page usability.",
                "Diagnosed and resolved performance bottlenecks, reducing website load times by 25% and improving overall responsiveness."
            ]
        }
    ];

    return (
        <div className="w-full max-w-4xl mx-auto px-4">
            {experiences.map((experience, index) => (
                <ExperienceCard
                    key={index}
                    {...experience}
                    index={index}
                />
            ))}
        </div>
    );
};

export default Experiences;