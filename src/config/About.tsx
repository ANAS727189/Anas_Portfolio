import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiPython,
  SiGo,
  SiCplusplus,
  SiPrisma,
  SiGit,
  SiAmazon,
} from 'react-icons/si';
import type { JSX } from 'react';

export const techIcons: Record<string, JSX.Element> = {
  'React.js': <SiReact size={28} />,
  'TypeScript': <SiTypescript size={28} />,
  'Next.js': <SiNextdotjs size={28} />,
  'Node.js': <SiNodedotjs size={28} />,
  'Go': <SiGo size={28} />,
   'Python': <SiPython size={28} />,
   'C++': <SiCplusplus size={28} />,
   'Prisma': <SiPrisma size={28} />,
   'MongoDB': <SiMongodb size={28} />,
   'Git': <SiGit size={28} />,
   'TailwindCSS': <SiTailwindcss size={28} />,
   'AWS': <SiAmazon size={28} />,
};

export const about = {
  name: 'Anas',
  description: `I'm a Full Stack web developer and Open Source Contributor, I love building products to solve real-world problems. I'm specialized in building MVP's.`,
};
