import { skillsData } from '@/data/skills/skills';

const ELEMENT_MAP: Record<string, { sym: string; cat: 'lang' | 'fw' | 'tool' }> = {
  'JavaScript':  { sym: 'Js',  cat: 'lang' },
  'TypeScript':  { sym: 'Ts',  cat: 'lang' },
  'C++':         { sym: 'C++', cat: 'lang' },
  'Go':          { sym: 'Go',  cat: 'lang' },
  'Python':      { sym: 'Py',  cat: 'lang' },
  'Rust':        { sym: 'Rs',  cat: 'lang' },
  'Solidity':    { sym: 'Sol', cat: 'lang' },
  'SQL':         { sym: 'Sql', cat: 'lang' },
  'Java':        { sym: 'Jv',  cat: 'lang' },
  'HTML/CSS':    { sym: 'Hc',  cat: 'lang' },
  'React.js':    { sym: 'Rx',  cat: 'fw' },
  'Next.js':     { sym: 'Nx',  cat: 'fw' },
  'Node.js':     { sym: 'Nd',  cat: 'fw' },
  'Express.js':  { sym: 'Ex',  cat: 'fw' },
  'FastAPI':     { sym: 'Fa',  cat: 'fw' },
  'Anchor (Solana)': { sym: 'An', cat: 'fw' },
  'Flask':       { sym: 'Fl',  cat: 'fw' },
  'Tailwind CSS':{ sym: 'Tw',  cat: 'fw' },
  'Docker':      { sym: 'Dk',  cat: 'tool' },
  'Kubernetes':  { sym: 'K8s', cat: 'tool' },
  'AWS':         { sym: 'Aws', cat: 'tool' },
  'PostgreSQL':  { sym: 'Pg',  cat: 'tool' },
  'MongoDB':     { sym: 'Mg',  cat: 'tool' },
  'Git':         { sym: 'Gt',  cat: 'tool' },
  'LangChain':   { sym: 'Lc',  cat: 'tool' },
  'FAISS':       { sym: 'Fs',  cat: 'tool' },
  'HuggingFace': { sym: 'Hf',  cat: 'tool' },
  'WebSockets':  { sym: 'Ws',  cat: 'tool' },
  'WebRTC':      { sym: 'Wr',  cat: 'tool' },
  'LLVM':        { sym: 'Lv',  cat: 'tool' },
};

const CAT_LABELS = {
  lang: 'Languages',
  fw:   'Frameworks',
  tool: 'Tools & Libraries',
};

const CAT_STYLES = {
  lang: {
    base: 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-[#0e2440] dark:border-[#1d4a7a] dark:text-[#7ec4f4]',
    glow: 'hover:shadow-[0_6px_20px_rgba(55,138,221,0.25)] dark:hover:shadow-[0_6px_20px_rgba(55,138,221,0.35)]',
    dot:  'bg-blue-200 dark:bg-[#1d4a7a]',
  },
  fw: {
    base: 'bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-[#0a2a1e] dark:border-[#155c3e] dark:text-[#5dcba5]',
    glow: 'hover:shadow-[0_6px_20px_rgba(29,158,117,0.25)] dark:hover:shadow-[0_6px_20px_rgba(29,158,117,0.35)]',
    dot:  'bg-emerald-200 dark:bg-[#155c3e]',
  },
  tool: {
    base: 'bg-orange-50 border-orange-200 text-orange-900 dark:bg-[#2a1208] dark:border-[#6e3010] dark:text-[#f4a070]',
    glow: 'hover:shadow-[0_6px_20px_rgba(216,90,48,0.25)] dark:hover:shadow-[0_6px_20px_rgba(216,90,48,0.35)]',
    dot:  'bg-orange-200 dark:bg-[#6e3010]',
  },
};

const Skills = () => {
  const allItems = skillsData.flatMap((g) => g.items);

  return (
    <section id="skills" className="bg-white dark:bg-black text-gray-900 dark:text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-lg text-blue-500 dark:text-blue-400 font-semibold">Technical</p>
        <h3 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">Skills</h3>

        {/* Legend */}
        <div className="flex gap-4 flex-wrap mb-6">
          {(['lang', 'fw', 'tool'] as const).map((cat) => (
            <div key={cat} className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <span className={`w-2 h-2 rounded-[2px] ${CAT_STYLES[cat].dot}`} />
              {CAT_LABELS[cat]}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-10 gap-1 justify-items-center">
          {allItems.map((skill, idx) => {
            const meta = ELEMENT_MAP[skill];
            if (!meta) return null;
            const s = CAT_STYLES[meta.cat];
            return (
              <div
                key={skill}
                title={`${skill} · ${CAT_LABELS[meta.cat]}`}
                className={`
                  group relative
                  w-[72px] h-[72px]
                  flex flex-col items-center justify-center gap-px
                  rounded-md border cursor-default
                  transition-transform duration-150
                  hover:-translate-y-1 hover:scale-105
                  ${s.base} ${s.glow}
                `}
              >
                <span className="absolute top-1 left-1.5 text-[9px] font-mono opacity-50">{idx + 1}</span>
                <span className="text-[21px] font-bold leading-none">{meta.sym}</span>
                <span className="text-[8px] text-center px-1 leading-tight opacity-80">{skill}</span>

                {/* Tooltip */}
                <div className="
                  pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2
                  opacity-0 group-hover:opacity-100 transition-opacity duration-150
                  bg-white dark:bg-black border border-gray-200 dark:border-gray-700
                  text-gray-900 dark:text-gray-100 text-[11px] font-medium
                  px-2.5 py-1 rounded-md whitespace-nowrap shadow-md z-20
                ">
                  {skill} · {CAT_LABELS[meta.cat]}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;