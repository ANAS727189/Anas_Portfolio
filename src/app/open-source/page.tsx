import BackButton from '@/components/BackButton';
import { Button } from '@/components/ui/button';
import { generateMetadata as getMeta } from '@/config/Meta';
import { openSourceContributions } from '@/data/open-source/contributions';
import { ExternalLink, GitMerge } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata() {
  return getMeta('/open-source');
}

const OpenSourcePage = () => {
  const totalMerged = openSourceContributions.reduce((acc, item) => acc + item.merged, 0);

  return (
    <section className="max-w-5xl mx-auto px-4 py-10 bg-white dark:bg-black text-gray-900 dark:text-white">
      <BackButton className="mb-6" />

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Open Source Contributions</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Contributions merged into community projects.
        </p>
        <div className="h-px bg-gray-200 dark:bg-gray-800 mt-6"></div>
      </div>

      <div className="mb-6 inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-black">
        <p className="text-xs text-gray-500 dark:text-gray-400">Total merged PRs</p>
        <p className="text-xl font-bold inline-flex items-center gap-1">
          <GitMerge size={16} /> {totalMerged}
        </p>
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
        <Link href="/">
          <Button
            variant="outline"
            className="text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Back to home
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default OpenSourcePage;
