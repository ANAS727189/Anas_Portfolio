import { ExternalLink, GitPullRequest, GitMerge, Rocket } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { openSourceContributions } from '@/data/open-source/contributions'

const totalMerged = openSourceContributions.reduce((acc, item) => acc + item.merged, 0)
const totalOpen = openSourceContributions.reduce((acc, item) => acc + item.open, 0)

const OpenSource = () => {
  return (
    <section id="open-source" className="bg-white dark:bg-black text-gray-900 dark:text-white py-14">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-lg text-blue-500 dark:text-blue-400 font-semibold">Open Source</p>
            <h3 className="text-4xl font-bold">Community Contributions</h3>
          </div>

          <div className="flex gap-3 flex-wrap">
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-black">
              <p className="text-xs text-gray-500 dark:text-gray-400">Merged</p>
              <p className="text-xl font-bold inline-flex items-center gap-1">
                <GitMerge size={16} /> {totalMerged}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-black">
              <p className="text-xs text-gray-500 dark:text-gray-400">Open</p>
              <p className="text-xl font-bold inline-flex items-center gap-1">
                <GitPullRequest size={16} /> {totalOpen}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-black">
              <p className="text-xs text-gray-500 dark:text-gray-400">Repositories</p>
              <p className="text-xl font-bold inline-flex items-center gap-1">
                <Rocket size={16} /> {openSourceContributions.length}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {openSourceContributions.map((item) => (
            <article
              key={item.project}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-5"
            >
              <div className="flex justify-between gap-3">
                <h4 className="text-xl font-semibold">{item.project}</h4>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  <ExternalLink size={18} />
                </a>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{item.description}</p>

              <div className="mt-3 flex items-center gap-2 text-xs">
                <span className="rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 px-2 py-1 font-semibold">
                  {item.merged} merged
                </span>
                {item.open > 0 && (
                  <span className="rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-1 font-semibold">
                    {item.open} open
                  </span>
                )}
              </div>

              <ul className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                {item.highlights.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="text-blue-500">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/open-source">
            <Button
              variant="outline"
              className="text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Show all open source contributions
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default OpenSource
