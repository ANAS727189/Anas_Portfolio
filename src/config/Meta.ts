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
  title: 'Anas - Engineer',
  description:
    'Portfolio website of Anas showcasing projects, skills, blogs, and professional experience.',
  url: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
  ogImage: '/meta/opengraph-image.png',
  locale: 'en_US',
  themeColor: '#00ff00',
  author: {
    name: about.name,
    twitter: '@Anas_is_me',
    github: 'ANAS727189',
    linkedin: 'anas-khan83',
    email: 'anas23khan083@gmail.com',
  },
  keywords: [
    'Anas Khan',
    'portfolio',
    'software engineer',
    'full-stack developer',
    'react',
    'next.js',
    'typescript',
    'frontend',
    'backend',
    'web development',
  ],
};

export const pageMetadata: Record<string, PageMeta> = {
  '/': {
    title: 'Anas - Engineer',
    description: `${about.description} Explore my projects, experience, and technical expertise.`,
    keywords: [
      'portfolio',
      'developer',
      'full-stack',
      'web development',
      'projects',
    ],
    ogImage: '/meta/hero.png',
    twitterCard: 'summary_large_image',
  },

  '/contact': {
    title: 'Contact - Get in Touch',
    description:
      "Get in touch with me for collaborations, projects, or opportunities. I'd love to hear from you!",
    keywords: ['contact', 'hire developer', 'collaboration', 'freelance', 'software engineer'],
    ogImage: '/assets/logo.png',
    twitterCard: 'summary',
  },

  '/work-experience': {
    title: 'Work Experience - Professional Journey',
    description:
      'Explore my professional work experience across different companies and roles in software development.',
    keywords: [
      'work experience',
      'internships',
      'career',
      'professional',
      'software developer',
      'employment history',
    ],
    ogImage: '/meta/work.png',
    twitterCard: 'summary_large_image',
  },

  '/projects': {
    title: 'Projects - My Work & Projects Portfolio',
    description:
      'Discover my projects and work across different technologies and domains. From web apps to mobile solutions.',
    keywords: [
      'projects',
      'portfolio',
      'web apps',
      'react projects',
      'next.js projects',
      'applications',
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
    themeColor: siteConfig.themeColor,
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 5,
    },
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
    other: {
      'application/ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: siteConfig.author.name,
        url: siteConfig.url,
        sameAs: [
          `https://twitter.com/${siteConfig.author.twitter.replace('@', '')}`,
          `https://github.com/${siteConfig.author.github}`,
          `https://linkedin.com/in/${siteConfig.author.linkedin}`,
          `mailto:${siteConfig.author.email}`,
        ],
        jobTitle: 'Software Engineer',
        worksFor: {
          '@type': 'Organization',
          name: 'Freelance / Open Source',
        },
      }),
    },
  };
}
