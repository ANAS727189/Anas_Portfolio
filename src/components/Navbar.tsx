"use client";
import React from "react";
import {
    Home,
    FolderKanban,
    Linkedin,
    Github,
    Twitter,
    Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const navLinks = [
        { path: "/", icon: Home, label: "Home" },
        { path: "/projects", icon: FolderKanban, label: "Projects" },
    ];

    const socialLinks = [
        { 
            href: "https://www.linkedin.com/in/anas-khan-7a6a5b1b7/",
            icon: Linkedin,
            label: "LinkedIn",
            hoverColor: "hover:text-[#0077B5]"
        },
        { 
            href: "https://www.github.com/ANAS727189/",
            icon: Github,
            label: "GitHub",
            hoverColor: "hover:text-blue-500"
        },
        { 
            href: "https://www.x.com/Anas_is_me/",
            icon: Twitter,
            label: "Twitter",
            hoverColor: "hover:text-[#1DA1F2]"
        },
        { 
            href: "mailto:anas23khan083@gmail.com",
            icon: Mail,
            label: "Email",
            hoverColor: "hover:text-blue-400"
        }
    ];

    return (
        <nav className="flex justify-between items-center w-full">
            <motion.div 
                className="flex items-center space-x-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.path;
                    
                    return (
                        <Button
                            key={link.path}
                            onClick={() => router.push(link.path)}
                            variant={isActive ? "default" : "ghost"}
                            className={`
                                flex items-center gap-2 px-4 
                                ${isActive ? 'bg-blue-500 hover:bg-blue-600' : 'hover:bg-zinc-800/50 hover:text-gray-500'}
                                transition-all duration-200
                            `}
                        >
                            <Icon className="w-4 h-4" />
                            <span className="hidden sm:inline">{link.label}</span>
                        </Button>
                    );
                })}
            </motion.div>

            <motion.div 
                className="flex items-center space-x-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                {socialLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                        <motion.a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`
                                p-2 rounded-full
                                hover:bg-zinc-800/50
                                transition-all duration-200
                                ${link.hoverColor}
                            `}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="sr-only">{link.label}</span>
                        </motion.a>
                    );
                })}
            </motion.div>
        </nav>
    );
};

export default Navbar;