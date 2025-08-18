import React from 'react';
import Image from 'next/image';
import { Github, Globe } from 'lucide-react';
import { projectsData } from '@/data/projects/projects';
import type { JSX } from 'react'
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiExpress as SiExpressjs,
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiPython,
  SiGo,
  SiSolidity,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiEthereum,
  SiAppwrite,
  SiCloudinary,
  SiFfmpeg,
  SiStripe,
  SiPytorch,
  SiDaisyui,
  SiC,
  SiChartdotjs,
  SiRedis,
  SiFlask,
  SiGnubash,
} from 'react-icons/si'
import { generateMetadata as getMeta } from "@/config/Meta";

export async function generateMetadata() {
  return getMeta("/projects");
}

const techIcons: Record<string, JSX.Element> = {
  'React.js': <SiReact size={18} />,
  'Next.js': <SiNextdotjs size={18} />,
  'Node.js': <SiNodedotjs size={18} />,
  'Express': <SiExpress size={18} />,
  'Express.js': <SiExpressjs size={18} />,
  'TypeScript': <SiTypescript size={18} />,
  'Typescript': <SiTypescript size={18} />,
  'Tailwind CSS': <SiTailwindcss size={18} />,
  'TailwindCSS': <SiTailwindcss size={18} />,
  'MongoDB': <SiMongodb size={18} />,
  'Python': <SiPython size={18} />,
  'Python3': <SiPython size={18} />,
  'Go': <SiGo size={18} />,
  'Solidity': <SiSolidity size={18} />,
  'JavaScript': <SiJavascript size={18} />,
  'HTML/CSS': <SiHtml5 size={18} />,
  'HTML': <SiHtml5 size={18} />,
  'CSS': <SiCss3 size={18} />,
  'Ethereum': <SiEthereum size={18} />,
  'Appwrite': <SiAppwrite size={18} />,
  'Cloudinary': <SiCloudinary size={18} />,
  'FFmpeg': <SiFfmpeg

 size={18} />,
  'Stripe': <SiStripe size={18} />,
  'PyTorch': <SiPytorch size={18} />,
  'DaisyUI': <SiDaisyui size={18} />,
  'C': <SiC size={18} />,
  'Chart.js': <SiChartdotjs size={18} />,
  'Redis': <SiRedis size={18} />,
  'Flask': <SiFlask size={18} />,
  'Judge0 API': <SiGnubash size={18} />,
  'LLVM': <SiGnubash size={18} />,
  'watchdog': <SiPython size={18} />,
  'tqdm': <SiPython size={18} />,
  'colorama': <SiPython size={18} />,
  'Ethers.js': <SiEthereum size={18} />,
  'Wagmi': <SiEthereum size={18} />,
  'OpenZeppelin': <SiEthereum size={18} />,
  'Vite': <SiJavascript size={18} />,
  'Auth0': <SiJavascript size={18} />,
  'Leaflet': <SiJavascript size={18} />,
  'Recharts': <SiChartdotjs size={18} />,
  'Scikit-learn': <SiPython size={18} />,
  'recharts': <SiChartdotjs size={18} />,
  'Mongoose': <SiMongodb size={18} />,
  'Gemini-api': <SiPython size={18} />,
  'shadcn': <SiReact size={18} />,
  'Clerk': <SiJavascript size={18} />,
  'SERP-API': <SiPython size={18} />,
  'Crunchbase API': <SiJavascript size={18} />,
  'Zustand': <SiReact size={18} />,
  'Nodejs': <SiNodedotjs size={18} />,
  'ExpressJS': <SiExpressjs size={18} />
}

const Project = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-10 bg-white dark:bg-black text-gray-900 dark:text-white">
      {/* Main Heading */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Projects</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          My projects and work across different technologies and domains.
        </p>
        <div className="h-px bg-gray-200 dark:bg-gray-800 mt-6"></div>
      </div>

      {/* All Projects Header */}
      <div className="flex items-center gap-2 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">All Projects</h3>
        <span className="text-gray-500 dark:text-gray-400 font-normal">
          ({projectsData.length} projects)
        </span>
      </div>

      {/* Project Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {projectsData.map((project) => (
          <div
            key={project.title}
            className="rounded-2xl p-[1px] hover:scale-[1.02] transition-transform duration-200 bg-gray-200 dark:bg-gray-700"
          >
            <div className="bg-white dark:bg-[#111] rounded-2xl overflow-hidden flex flex-col h-full shadow-md dark:shadow-none">
              {/* Project Image */}
              {project.image && (
                <div className="relative w-full h-48">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Title + Icons */}
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{project.title}</h4>
                  <div className="flex gap-3">
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
                      >
                        <Globe size={20} />
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
                      >
                        <Github size={20} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="mt-auto">
                  <p className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="bg-gray-100 dark:bg-gray-800 text-xs px-2.5 py-1 rounded-md text-gray-700 dark:text-gray-300 flex items-center gap-1.5"
                      >
                        {techIcons[tech] || <SiJavascript size={18} />}
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Project;