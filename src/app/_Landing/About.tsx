"use client";
import Image from 'next/image';
import React from 'react';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { techIcons } from '@/config/About';


const About = () => {
  const skills = [
    'React.js',
    'TypeScript',
    'Next.js',
    'Node.js',
    'Go',
    'Python',
    'C++',
    'Prisma',
    'MongoDB',
    'Git',
    'TailwindCSS',
    'AWS',
  ];

  return (
    <section className="bg-white dark:bg-black text-black dark:text-white py-12 px-4 sm:px-6 md:px-12">
      <h3 className="text-lg font-semibold opacity-80 text-blue-500 dark:text-blue-400">About</h3>
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">Me</h2>

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
        {/* Cartoon Image */}
        <div className="rounded-lg overflow-hidden shadow-lg shrink-0">
          <Image
            src="/my-cartoon.png"
            alt="Anas Khan"
            width={150}
            height={150}
            className="bg-yellow-400 p-2 sm:w-[200px] sm:h-[200px]"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center text-center sm:text-left">
          <h3 className="text-2xl sm:text-3xl font-bold">Anas</h3>
          <p className="max-w-xl text-sm sm:text-md opacity-80 mt-2">
            I'm a Full Stack web developer and Open Source Contributor. I love building products to solve
            real-world problems. I'm specialized in building MVP's.
          </p>

          {/* Skills */}
          <h4 className="mt-4 font-semibold">Skills</h4>
          <TooltipProvider delayDuration={100}>
            <div className="flex items-center justify-center sm:justify-start flex-wrap gap-3 sm:gap-4 mt-2">
              {skills.map((skill) => (
                <Tooltip key={skill}>
                  <TooltipTrigger asChild>
                    <span
                      className="hover:scale-110 transition-transform duration-200 text-black dark:text-white text-xl sm:text-2xl"
                    >
                      {techIcons[skill]}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-md bg-gray-800 text-white dark:bg-white dark:text-black">
                    {skill}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </div>
      </div>
    </section>
  );
};

export default About;