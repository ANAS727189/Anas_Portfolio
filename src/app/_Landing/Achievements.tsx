import { achievementsData } from '@/data/achievements/achievements';

const BADGE: Record<string, { label: string; className: string }> = {
  '3x Hackathon Wins':              { label: 'Hackathon',   className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' },
  'ICPC Asia West Rank 93':         { label: 'Competitive', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
  'Codeforces Expert (1614)':       { label: 'Competitive', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
  'Inter-College Event at Scale':   { label: 'Organiser',   className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' },
};

const Achievements = () => {
  return (
    <section id="achievements" className="bg-white dark:bg-black text-gray-900 dark:text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-lg text-blue-500 dark:text-blue-400 font-semibold">Highlights</p>
        <h3 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Achievements</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          {achievementsData.map((achievement) => {
            const badge = BADGE[achievement.title];
            return (
              <article
                key={achievement.title}
                className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-5 flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-lg font-semibold leading-snug">{achievement.title}</h4>
                  {badge && (
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${badge.className}`}>
                      {badge.label}
                    </span>
                  )}
                </div>

                <hr className="border-gray-200 dark:border-none" />

                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {achievement.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;