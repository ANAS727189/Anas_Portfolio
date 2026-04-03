'use client'

import * as React from 'react'
import type { JSX } from 'react'
import Image from 'next/image'
import { ArrowDownRight, ArrowUpRight, Crown, Github, Globe, Medal, Minus, Trophy } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useProjectsCatalog } from '@/lib/useProjectsCatalog'
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
  SiRedux,
  SiDaisyui,
  SiC,
  SiChartdotjs,
  SiRedis,
  SiFlask,
  SiGnubash,
} from 'react-icons/si'

const techIcons: Record<string, JSX.Element> = {
  'React.js': <SiReact size={16} />,
  'Next.js': <SiNextdotjs size={16} />,
  'Node.js': <SiNodedotjs size={16} />,
  'Express': <SiExpress size={16} />,
  'Express.js': <SiExpressjs size={16} />,
  'TypeScript': <SiTypescript size={16} />,
  'Typescript': <SiTypescript size={16} />,
  'Tailwind CSS': <SiTailwindcss size={16} />,
  'TailwindCSS': <SiTailwindcss size={16} />,
  'MongoDB': <SiMongodb size={16} />,
  'Python': <SiPython size={16} />,
  'Python3': <SiPython size={16} />,
  'Go': <SiGo size={16} />,
  'Solidity': <SiSolidity size={16} />,
  'JavaScript': <SiJavascript size={16} />,
  'HTML/CSS': <SiHtml5 size={16} />,
  'HTML': <SiHtml5 size={16} />,
  'CSS': <SiCss3 size={16} />,
  'Ethereum': <SiEthereum size={16} />,
  'Appwrite': <SiAppwrite size={16} />,
  'Cloudinary': <SiCloudinary size={16} />,
  'FFmpeg': <SiFfmpeg size={16} />,
  'Stripe': <SiStripe size={16} />,
  'PyTorch': <SiPytorch size={16} />,
  'DaisyUI': <SiDaisyui size={16} />,
  'C': <SiC size={16} />,
  'Chart.js': <SiChartdotjs size={16} />,
  'Redis': <SiRedis size={16} />,
  'Flask': <SiFlask size={16} />,
  'Judge0 API': <SiGnubash size={16} />,
  'LLVM': <SiGnubash size={16} />,
  'watchdog': <SiPython size={16} />,
  'tqdm': <SiPython size={16} />,
  'colorama': <SiPython size={16} />,
  'Ethers.js': <SiEthereum size={16} />,
  'Wagmi': <SiEthereum size={16} />,
  'OpenZeppelin': <SiEthereum size={16} />,
  'Vite': <SiJavascript size={16} />,
  'Auth0': <SiJavascript size={16} />,
  'Leaflet': <SiJavascript size={16} />,
  'Recharts': <SiChartdotjs size={16} />,
  'Scikit-learn': <SiPython size={16} />,
  'recharts': <SiChartdotjs size={16} />,
  'Mongoose': <SiMongodb size={16} />,
  'Gemini-api': <SiPython size={16} />,
  'shadcn': <SiReact size={16} />,
  'Clerk': <SiJavascript size={16} />,
  'SERP-API': <SiPython size={16} />,
  'Crunchbase API': <SiJavascript size={16} />,
  'Zustand': <SiReact size={16} />,
  'Nodejs': <SiNodedotjs size={16} />,
  'ExpressJS': <SiExpressjs size={16} />,
}

const Project = () => {
  const { allProjects, topThree } = useProjectsCatalog()
  const podiumProjects = [topThree[1], topThree[0], topThree[2]].filter(Boolean)

  const rankStyles: Record<number, string> = {
    1: 'md:-mt-4 md:scale-105 border-yellow-400/70 dark:border-yellow-300/40 bg-gradient-to-b from-yellow-50 to-white dark:from-[#1a1608] dark:to-[#111] shadow-[0_0_50px_rgba(250,204,21,0.22)] z-10',
    2: 'md:mt-4 border-slate-300 dark:border-slate-700',
    3: 'md:mt-4 border-amber-700/40 dark:border-amber-600/40',
  }

  const rankBadgeStyles: Record<number, string> = {
    1: 'bg-yellow-400 text-black',
    2: 'bg-slate-300 text-slate-900',
    3: 'bg-amber-600 text-white',
  }

  const rankIcons: Record<number, JSX.Element> = {
    1: <Trophy size={16} />,
    2: <Medal size={16} />,
    3: <Crown size={16} />,
  }

  const podiumBaseStyles: Record<number, string> = {
    1: 'h-24 bg-yellow-400/90 text-black',
    2: 'h-16 bg-slate-300/90 text-slate-900',
    3: 'h-14 bg-amber-600/90 text-white',
  }

  const getTrendBadge = (trend?: 'up' | 'down' | 'steady' | 'new', delta?: number) => {
    if (trend === 'new') {
      return (
        <span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 px-2 py-0.5 text-xs font-semibold">
          NEW
        </span>
      )
    }

    if (trend === 'up') {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 px-2 py-0.5 text-xs font-semibold">
          <ArrowUpRight size={13} /> +{delta ?? 1}
        </span>
      )
    }

    if (trend === 'down') {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300 px-2 py-0.5 text-xs font-semibold">
          <ArrowDownRight size={13} /> -{delta ?? 1}
        </span>
      )
    }

    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 px-2 py-0.5 text-xs font-semibold">
        <Minus size={13} /> 0
      </span>
    )
  }

  return (
    <section id="projects" className="bg-white dark:bg-black text-gray-900 dark:text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-lg text-blue-500 dark:text-blue-400 font-semibold">Featured</p>
        <h3 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Projects</h3>

        {podiumProjects.length === 3 && (
          <div className="mb-12 rounded-3xl border border-gray-200 dark:border-gray-800 bg-gradient-to-b from-white to-gray-50 dark:from-[#0f0f0f] dark:to-black p-5 sm:p-7">
            <div className="flex items-center justify-between gap-3 flex-wrap mb-6">
              <div>
                <p className="text-sm font-semibold tracking-wide text-blue-500 dark:text-blue-400 uppercase">Weekly standings</p>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white">Top Project Podium</h4>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Updated this week</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-5 md:gap-y-8 gap-x-4 md:gap-x-8 lg:gap-x-10 items-end">
              {podiumProjects.map((project, index) => {
                const rank = [2, 1, 3][index]

                return (
                <div key={`podium-${project.title}`} className="flex flex-col justify-end">
                  <div
                    className={`relative rounded-2xl border p-4 bg-white dark:bg-[#111] transition-transform duration-200 hover:-translate-y-1 ${rankStyles[rank]}`}
                  >
                    {rank === 1 && (
                      <div className="absolute -top-3 right-3 rounded-full bg-yellow-400 text-black text-[10px] font-extrabold px-2.5 py-1 tracking-wide">
                        CHAMPION PICK
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-2">
                      <div className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${rankBadgeStyles[rank]}`}>
                        {rankIcons[rank]}
                        #{rank}
                      </div>
                      {getTrendBadge(project.weeklyTrend, project.weeklyDelta)}
                    </div>

                    <h5 className="mt-3 text-lg font-semibold text-gray-900 dark:text-white">{project.title}</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">{project.description}</p>

                    <div className="mt-3 flex items-center gap-2 flex-wrap">
                      {project.technologies?.slice(0, 3).map((tech) => (
                        <span
                          key={`${project.title}-${tech}`}
                          className="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                          <Globe size={18} />
                        </a>
                      )}
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                          <Github size={18} />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className={`${rank === 1 ? 'mt-4' : 'mt-2'} rounded-t-xl flex items-center justify-center text-xs font-extrabold tracking-widest ${podiumBaseStyles[rank]}`}>
                    PODIUM #{rank}
                  </div>
                </div>
                )
              })}
            </div>
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {allProjects.slice(0, 4).map((project) => (
            <div
              key={project.title}
              className="rounded-2xl p-[1px] hover:scale-[1.02] transition-transform duration-200 bg-gray-200 dark:bg-[#171717]"
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
                    <h4 className="text-2xl font-semibold text-gray-900 dark:text-white">{project.title}</h4>
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
                  <p className="text-gray-600 dark:text-gray-400 text-md mb-4 flex-grow">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="mt-auto">
                    <p className="text-gray-700 dark:text-gray-300 text-md font-medium mb-2">Technologies</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.slice(0, 6).map((tech) => (
                        <span
                          key={tech}
                          className="bg-gray-100 dark:bg-gray-800 text-md px-2.5 py-1 rounded-md text-gray-700 dark:text-gray-300 flex items-center gap-1.5"
                        >
                          {techIcons[tech] || <SiJavascript size={16} />}
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
      </div>

      {/* Show more button */}
      <div className="mt-10 text-center">
        <Link href="/projects">
          <Button
            variant="outline"
            className="text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Show all projects
          </Button>
        </Link>
      </div>
    </section>
  )
}

export default Project