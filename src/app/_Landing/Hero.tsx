"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Album, MessagesSquare, Trophy, Sparkles } from "lucide-react";
import { socialLinks, techBadges } from "@/config/Hero";
import Link from "next/link";
import { useRouter } from "next/navigation";
import WalkingCat from "@/components/WalkingCat"; // ← adjust path if needed

const Hero = () => {
  const router = useRouter();
  const [, setAvatarClicks] = useState(0);

  const handleAvatarClick = () => {
    setAvatarClicks((prev) => {
      const next = prev + 1;
      if (next >= 10) {
        router.push("/admin/projects");
        return 0;
      }
      return next;
    });
  };

  return (
    /*
      position: relative  → lets WalkingCat's absolute container anchor here
      overflow is NOT set on the section; clipping is handled inside WalkingCat
      pb-20              → extra bottom padding so the cat has visible runway
    */
    <section className="relative flex flex-col items-center text-center mt-1 space-y-6 pb-20">

      {/* 🐱 Walking cat — clips itself to this section */}
      <WalkingCat />

      {/* Avatar */}
      <button
        type="button"
        onClick={handleAvatarClick}
        className="rounded-full focus:outline-none"
        aria-label="Profile image"
      >
        <Image
          src="/my-cartoon.png"
          alt="My Cartoon"
          width={110}
          height={110}
          className="size-32 rounded-full dark:bg-yellow-300 bg-blue-300 border-4"
        />
      </button>

      {/* Headline */}
      <h1 className="text-5xl font-bold">
        Hi, I'm Anas ~{" "}
        <span className="text-gray-400">Software Engineer.</span>
      </h1>

      {/* Description */}
      <p className="max-w-2xl text-gray-500 leading-relaxed text-2xl">
        I build end-to-end software products{" "}
        {techBadges.map((tech, idx) => (
          <React.Fragment key={idx}>
            <span className="inline-flex items-center gap-2 font-bold bg-gray-800 px-2 py-1 rounded-sm text-xl text-gray-200">
              <Image src={tech.src} alt={tech.alt} width={20} height={20} />
              {tech.label}
            </span>
            {idx < techBadges.length - 2 && (
              <span className="mx-2 text-gray-400">,</span>
            )}
            {idx === techBadges.length - 2 && (
              <span className="mx-2 text-gray-400"> and </span>
            )}
          </React.Fragment>
        ))}{" "}
        combining full-stack execution with strong problem-solving, system
        design, and performance-focused engineering.
        <div className="gap-3 mt-3 flex flex-wrap justify-center">
          <span className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-700/50">
            <Trophy size={15} /> 3x Hackathon Winner
          </span>
          <span className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-700/50">
            <Sparkles size={15} /> ICPC 2025 Regionalist
          </span>
        </div>
      </p>

      {/* Buttons */}
      <div className="flex gap-5">
        <a
          href="https://drive.google.com/file/d/1cjhJJIUvmrdoBCh-aGElAF6Vox2_1XYo/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            className="flex items-center gap-2 px-6 py-6 text-lg dark:bg-white dark:text-black"
            variant="outline"
          >
            <Album className="h-6 w-6" /> Resume / CV
          </Button>
        </a>
        <Link href="/contact">
          <Button
            className="flex items-center gap-2 px-6 py-6 text-lg bg-black text-white"
            variant="outline"
          >
            <MessagesSquare className="h-6 w-6" /> Get in touch
          </Button>
        </Link>
      </div>

      {/* Social Icons with tooltips */}
      <TooltipProvider delayDuration={100}>
        <div className="flex gap-6 mt-4">
          {socialLinks.map((link) => (
            <Tooltip key={link.label}>
              <TooltipTrigger asChild>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors duration-300 ${link.hoverColor}`}
                >
                  <link.icon className="h-7 w-7" />
                </a>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-sm">
                {link.label}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>

    </section>
  );
};

export default Hero;