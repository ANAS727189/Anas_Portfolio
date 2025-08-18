import React from 'react'
import Link from 'next/link'
import { experienceData } from '@/data/experience/experience'
import Image from 'next/image'
import { Globe } from 'lucide-react'
import { generateMetadata as getMeta } from "@/config/Meta";

export async function generateMetadata() {
  return getMeta("/work-experience");
}

const techIcons: Record<string, string> = {
  'React': '/techstack/react.svg',
  'Next.js': '/techstack/nextjs.svg',
  'Tailwind CSS': '/techstack/tailwind.svg',
  'Figma': '/techstack/figma.svg',
  'Nodejs': '/techstack/nodejs.svg',
  'Node.js': '/techstack/nodejs.svg',
  'Express': '/techstack/express.svg',
  'MongoDB': '/techstack/mongodb.png',
  'Recharts': '/techstack/chart.png',
  'Socket.io': '/techstack/socketio.svg',
  'Typescript': '/techstack/typescript.svg',
  'React-quill': '/techstack/reactquill.png',
  'node-cron': '/techstack/nodecron.png',
  'AWS': '/techstack/aws.png',
  'Firebase': '/techstack/firebase.png',
  'Docker': '/techstack/docker.svg',
  'Jest': '/techstack/jest.png',
  'Cypress': '/techstack/cypress.webp',
  'Postman': '/techstack/postman.webp',
  'Git': '/techstack/git.png',
}

const Page = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 bg-white dark:bg-black text-gray-900 dark:text-white">
      {/* Main Heading */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white">Work Experience</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          My work experiences across different companies and roles.
        </p>
        <div className="h-px bg-gray-200 dark:bg-gray-800 mt-6"></div>
      </div>

      {/* All Experiences */}
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        All Experiences
        <span className="text-gray-500 dark:text-gray-400 font-normal"> ({experienceData.length} experiences)</span>
      </h3>

      <div className="flex flex-col gap-8">
        {experienceData.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl transition-all"
          >
            {/* Company & Role */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                {item.logo && (
                  <Image
                    src={item.logo}
                    alt={item.companyName}
                    width={45}
                    height={45}
                    className="rounded-md object-contain"
                  />
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{item.companyName}</h4>
                    {item.link && (
                      <Link href={item.link} target="_blank" rel="noopener noreferrer">
                        <Globe className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors" />
                      </Link>
                    )}
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-400">{item.position}</p>
                </div>
              </div>
              <div className="text-md text-gray-500 dark:text-gray-400 text-right min-w-[120px]">
                <p>{item.duration}</p>
                <p>{item.type}</p>
              </div>
            </div>

            {/* Technologies */}
            <div className="mt-5">
              <span className="text-gray-700 dark:text-gray-300 mb-2 text-md block font-medium">Technologies</span>
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 font-medium bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md text-md text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                  >
                    {techIcons[tech] && (
                      <Image
                        src={techIcons[tech]}
                        alt={tech}
                        width={16}
                        height={16}
                        className="object-contain"
                      />
                    )}
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <ul className="mt-5 space-y-2 text-gray-600 dark:text-gray-300 text-md leading-relaxed pl-1">
              {item.description.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2"
                >
                  <span className="text-gray-500 dark:text-gray-400 text-lg leading-[1]">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page