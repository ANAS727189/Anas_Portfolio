import { siteConfig } from '@/config/Meta';

export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Anas Khan',
    alternateName: ['Anas', 'ANAS727189', 'Anas_Khan83', 'coderX083', 'Anas_is_me'],
    url: siteConfig.url,
    image: `${siteConfig.url}/meta/hero.png`,
    email: siteConfig.author.email,
    telephone: '+919794354555',
    jobTitle: 'Full Stack Developer & UI/UX Designer',
    description: 'Anas Khan is a Full Stack Developer and UI/UX Designer, specializing in React, Node.js, Solidity, Go, Next.js, Python and Web3 technologies. 3x Hackathon Winner and Open Source Contributor.',
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Indian Institute of Information Technology, Dharwad',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dharwad',
        addressRegion: 'Karnataka',
        addressCountry: 'IN',
      },
    },
    sameAs: [
      `https://twitter.com/${siteConfig.author.twitter.replace('@', '')}`,
      `https://github.com/${siteConfig.author.github}`,
      `https://linkedin.com/in/${siteConfig.author.linkedin}`,
      'https://leetcode.com/u/Anas_Khan83/',
      'https://codeforces.com/profile/coderX083',
    ],
    knowsAbout: [
      'Full-Stack Development',
      'UI/UX Design',
      'JavaScript',
      'TypeScript',
      'React.js',
      'Next.js',
      'Node.js',
      'Express.js',
      'Go',
      'C++',
      'Python',
      'Rust',
      'Solidity',
      'Java',
      'SQL',
      'HTML/CSS',
      'Tailwind CSS',
      'Docker',
      'Kubernetes',
      'AWS',
      'PostgreSQL',
      'MongoDB',
      'Git',
      'WebSockets',
      'WebRTC',
      'LLVM',
      'Compiler Design',
      'Solana Blockchain',
      'Ethereum',
      'Anchor Framework',
      'Web3',
      'Smart Contracts',
      'Flask',
      'Figma',
      'JWT Authentication',
      'Nginx',
      'Competitive Programming',
      'Algorithm Design',
      'Data Structures',
    ],
    award: [
      'Winner - Devhack 5.0 (IIT Dharwad)',
      'Winner - Hack to Crack 2.0 (ViMEET)',
      'Finalist - Techxcelerate (BITS Pilani)',
      'Codeforces Expert (Rating 1614)',
      'ICPC Asia West Kanpur Regionals - Rank 93',
    ],
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
    },
    inLanguage: 'en-US',
  };
}

export function generateBlogPostingSchema(blog: {
  title: string;
  description: string;
  date: string;
  slug: string;
  author?: string;
  tags?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.description,
    datePublished: blog.date,
    dateModified: blog.date,
    author: {
      '@type': 'Person',
      name: blog.author || siteConfig.author.name,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    url: `${siteConfig.url}/blogs/${blog.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/blogs/${blog.slug}`,
    },
    keywords: blog.tags?.join(', '),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
