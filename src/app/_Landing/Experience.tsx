import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { experienceData } from '@/data/experience/experience'
import Image from 'next/image'
import { GithubIcon, Globe } from 'lucide-react'

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

const Experience = () => {
  return (
    <section id="work" className="bg-white dark:bg-black text-gray-900 dark:text-white py-6 sm:py-8 px-4 sm:px-6">
      <span className="text-sm sm:text-md uppercase tracking-wide text-blue-500 dark:text-blue-400 font-semibold">
        Featured
      </span>
      <h3 className="text-3xl sm:text-4xl font-bold mt-1 mb-4 sm:mb-6 text-gray-900 dark:text-white">Experience</h3>

      <div className="flex flex-col gap-6 sm:gap-8">
        {experienceData.slice(0, 2).map((item, index) => (
          <div
            key={index}
            className="transition-all"
          >
            {/* Company & Role */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                {item.logo && (
                  <Image
                    src={item.logo}
                    alt={item.companyName}
                    width={35}
                    height={35}
                    className="rounded-md object-contain sm:w-[45px] sm:h-[45px]"
                  />
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">{item.companyName}</h4>
                    {item.link && (
                      <Link href={item.link} target="_blank" rel="noopener noreferrer">
                        <Globe className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors" />
                      </Link>
                    )}
                  </div>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">{item.position}</p>
                </div>
              </div>
              <div className="text-sm sm:text-md text-gray-500 dark:text-gray-400 sm:text-right sm:min-w-[120px]">
                <p>{item.duration}</p>
                <p>{item.type}</p>
              </div>
            </div>

            {/* Technologies */}
            <div className="mt-4 sm:mt-5">
              <span className="text-gray-700 dark:text-gray-300 mb-2 text-sm sm:text-md block font-medium">Technologies</span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {item.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 sm:gap-2 font-medium bg-gray-100 dark:bg-gray-800 px-2 sm:px-3 py-1 rounded-md text-xs sm:text-md text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                  >
                    {techIcons[tech] && (
                      <Image
                        src={techIcons[tech]}
                        alt={tech}
                        width={14}
                        height={14}
                        className="object-contain sm:w-[18px] sm:h-[18px]"
                      />
                    )}
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <ul className="mt-4 sm:mt-5 space-y-2 text-gray-600 dark:text-gray-300 text-sm sm:text-md leading-relaxed">
              {item.description.map((point, i) => (
                <li
                  key={i}
                  className="list-none flex items-start gap-2"
                >
                  <span className="text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-[1] flex-shrink-0">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-4 sm:mt-6 flex justify-center">
        <Link href="/work-experience">
          <Button
            variant="outline"
            className="px-4 sm:px-6 py-3 sm:py-5 text-sm sm:text-base text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Show all work experiences
          </Button>
        </Link>
      </div>
    </section>
  )
}

export default Experience