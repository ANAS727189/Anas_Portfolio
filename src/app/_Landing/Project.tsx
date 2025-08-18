import { projectsData } from '@/data/projects/projects'
import * as React from 'react'
import type { JSX } from 'react'
import Image from 'next/image'
import { Github, Globe } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
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
  return (
    <section id="projects" className="bg-white dark:bg-black text-gray-900 dark:text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-lg text-blue-500 dark:text-blue-400 font-semibold">Featured</p>
        <h3 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Projects</h3>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {projectsData.slice(0, 4).map((project) => (
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