import { about } from './About';
import { heroConfig } from './Hero';

export interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
}

export const siteConfig = {
  name: heroConfig.name,
  title: 'Anas Khan | Full Stack Developer & UI/UX Designer',
  description:
    'Anas Khan - Full Stack Developer & UI/UX Designer. Expert in React, Next.js, Node.js, TypeScript, Solidity, Go, Next.js, Python, Docker, and Web3. Winner of 3 hackathons including Devhack 5.0 (IIT Dharwad). Open Source Contributor to LFortran & SymPy. Codeforces Expert (1614). Building scalable web platforms, compilers, and decentralized applications.',
  url: 'https://anas-khan.is-a.dev',
  ogImage: '/meta/opengraph-image.png',
  locale: 'en_US',
  themeColor: '#00ff00',
  author: {
    name: about.name,
    twitter: '@Anas_is_me',
    github: 'ANAS727189',
    linkedin: 'anas-khan83',
    email: 'anas23khan083@gmail.com',
    phone: '+919794354555',
    leetcode: 'Anas_Khan83',
    codeforces: 'coderX083',
  },
  keywords: [
    'Anas Khan',
    'Full Stack Developer',
    'UI/UX Designer',
    'React',
    'Next.js',
    'Node.js',
    'TypeScript',
    'JavaScript',
    'Solidity',
    'Rust',
    'Go',
    'Python',
    'C++',
    'Docker',
    'Kubernetes',
    'AWS',
    'PostgreSQL',
    'MongoDB',
    'Solana',
    'Web3',
    'Blockchain',
    'LLVM',
    'Compiler Design',
    'WebRTC',
    'WebSockets',
    'Tailwind CSS',
    'Express.js',
    'Flask',
    'Anchor',
    'Ethers.js',
    'Wagmi',
    'JWT',
    'Nginx',
    'Figma',
    'Hackathon Winner',
    'Open Source Contributor',
    'Codeforces Expert',
    'ICPC',
    'LeetCode',
    'IIIT Dharwad',
  ],
};

export const pageMetadata: Record<string, PageMeta> = {
  '/': {
    title: 'Anas Khan | Full Stack Developer & UI/UX Designer',
    description: `Anas Khan - Full Stack Developer & UI/UX Designer. Expert in React, Node.js, Solidity, Rust, Docker, and Web3. 3x Hackathon Winner. Open Source Contributor to LFortran & SymPy. Codeforces Expert (1614).`,
    keywords: [
      'Anas Khan',
      'Full Stack Developer',
      'UI/UX Designer',
      'React Developer',
      'Next.js Developer',
      'Node.js Developer',
      'TypeScript',
      'Solidity Developer',
      'Rust Developer',
      'Web3 Developer',
      'Blockchain Developer',
      'Docker',
      'Kubernetes',
      'LLVM',
      'Compiler Design',
      'Hackathon Winner',
      'Open Source',
      'Codeforces Expert',
      'Competitive Programming',
      'IIIT Dharwad',
    ],
    ogImage: '/meta/hero.png',
    twitterCard: 'summary_large_image',
  },

  '/contact': {
    title: 'Contact Anas Khan | Get in Touch',
    description:
      "Contact Anas Khan for collaborations, projects, or opportunities. Full Stack Developer & UI/UX Designer available for freelance work and consulting.",
    keywords: ['Anas Khan', 'contact', 'hire developer', 'collaboration', 'freelance', 'software engineer', 'full stack developer'],
    ogImage: '/assets/logo.png',
    twitterCard: 'summary',
  },

  '/work-experience': {
    title: 'Work Experience | Anas Khan',
    description:
      'Fullstack Developer Intern at MadQuick (Feb 2025 - May 2025) building CRM with React, Node.js, PostgreSQL, WebRTC. Frontend Developer Intern at InfoKalash (Jan 2025 - Feb 2025) creating UI/UX in Figma and React with JWT authentication.',
    keywords: [
      'MadQuick',
      'InfoKalash',
      'Fullstack Developer Intern',
      'Frontend Developer Intern',
      'React',
      'Node.js',
      'PostgreSQL',
      'WebRTC',
      'WebSockets',
      'Figma',
      'JWT',
      'CRM Development',
      'UI/UX Design',
      'internship experience',
      'remote work',
    ],
    ogImage: '/meta/work.png',
    twitterCard: 'summary_large_image',
  },

  '/projects': {
    title: 'Projects - Z-Studio, BountyStack, Tokenova | Anas Khan',
    description:
      'Explore my projects: Z-Studio (LLVM-based browser IDE), BountyStack (Solana Q&A platform with trustless escrow), Tokenova (NFT ticketing on Ethereum). Built with React, Next.js, Rust, Solidity, Docker, and Web3 technologies.',
    keywords: [
      'Z-Studio',
      'BountyStack',
      'Tokenova',
      'LLVM Compiler',
      'Browser IDE',
      'Solana',
      'Ethereum',
      'NFT',
      'Web3 Projects',
      'Blockchain Projects',
      'React Projects',
      'Next.js Projects',
      'Rust Projects',
      'Solidity Projects',
      'Docker',
      'Anchor Framework',
      'Smart Contracts',
    ],
    ogImage: '/meta/projects.png',
    twitterCard: 'summary_large_image',
  },

  '/blogs': {
    title: 'Blog - Thoughts & Tutorials',
    description:
      'Read my thoughts, tutorials, and insights on engineering, programming, web development and more.',
    keywords: [
      'blog',
      'tutorials',
      'coding tips',
      'programming',
      'web development',
      'technical writing',
    ],
    ogImage: '/meta/blogs.png',
    twitterCard: 'summary_large_image',
  },
};

export function getPageMetadata(pathname: string): PageMeta {
  return pageMetadata[pathname] || pageMetadata['/'];
}

export function generateMetadata(pathname: string) {
  const pageMeta = getPageMetadata(pathname);

  return {
    metadataBase: new URL(siteConfig.url),
    title: pageMeta.title,
    description: pageMeta.description,
    keywords: pageMeta.keywords?.join(', '),
    authors: [{ name: siteConfig.author.name }],
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,
    generator: 'Next.js',
    manifest: '/manifest.json',
    icons: [
      { rel: 'icon', url: '/Anas-192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'apple-touch-icon', url: '/Anas-256.jpg', sizes: '256x256' },
    ],
    openGraph: {
      type: 'website',
      url: `${siteConfig.url}${pathname}`,
      title: pageMeta.title,
      description: pageMeta.description,
      siteName: siteConfig.title,
      locale: siteConfig.locale,
      images: [
        {
          url: pageMeta.ogImage || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: pageMeta.title,
        },
      ],
    },
    twitter: {
      card: pageMeta.twitterCard || 'summary_large_image',
      title: pageMeta.title,
      description: pageMeta.description,
      creator: siteConfig.author.twitter,
      images: [pageMeta.ogImage || siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
    alternates: {
      canonical: `${siteConfig.url}${pathname}`,
    },
    verification: {
      google: 'c057d3f165776920',
    },
    other: {
      'google-site-verification': 'c057d3f165776920',
    },
  };
}
