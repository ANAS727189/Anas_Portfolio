"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Album, MessagesSquare, Linkedin, Github, Twitter, Mail } from "lucide-react";
import { socialLinks, techBadges } from "@/config/Hero";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="flex flex-col items-center text-center mt-10 space-y-6">
      {/* Avatar */}
      <Image
        src="/my-cartoon.png"
        alt="My Cartoon"
        width={110}
        height={110}
        className="size-32 rounded-full dark:bg-yellow-300 bg-blue-300 border-4"
      />

      {/* Headline */}
      <h1 className="text-5xl font-bold">
        Hi, I'm Anas ~ <span className="text-gray-400">A Full Stack web developer.</span>
      </h1>

      {/* Description */}
      <p className="max-w-2xl text-gray-500 leading-relaxed text-2xl">
        I build interactive web apps using{" "}
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
        ))}

        . With a focus on <span className="dark:text-white text-black font-bold">UI/UX</span>.
         Web apps? I build them for fun, curiosity, and a little bit of mischief.
      </p>

      {/* Buttons */}
      <div className="flex gap-5">
        <a
          href="https://drive.google.com/file/d/1qkwgm3l8lYLNPGpJew_tTfYHpE1MPMxI/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="flex items-center gap-2 px-6 py-6 text-lg dark:bg-white dark:text-black" variant="outline">
            <Album className="h-6 w-6" /> Resume / CV
          </Button>
        </a>
        <Link href="/contact">
          <Button className="flex items-center gap-2 px-6 py-6 text-lg bg-black text-white" variant="outline">
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
