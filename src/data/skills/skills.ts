export interface SkillCategory {
  category: string;
  items: string[];
}

export const skillsData: SkillCategory[] = [
  {
    category: 'Languages',
    items: ['JavaScript', 'TypeScript', 'C++', 'Go', 'Python', 'Rust', 'Solidity', 'SQL', 'Java', 'HTML/CSS'],
  },
  {
    category: 'Frameworks',
    items: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'FastAPI', 'Anchor (Solana)', 'Flask', 'Tailwind CSS'],
  },
  {
    category: 'Tools & Libraries',
    items: [
      'Docker',
      'Kubernetes',
      'AWS',
      'PostgreSQL',
      'MongoDB',
      'Git',
      'LangChain',
      'FAISS',
      'HuggingFace',
      'WebSockets',
      'WebRTC',
      'LLVM',
    ],
  },
];
