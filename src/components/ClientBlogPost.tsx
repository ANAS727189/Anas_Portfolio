'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import { blogTechIcons } from '@/config/blogIcons';
import { SiJavascript } from 'react-icons/si';
import { Blog } from '@/types/blog';

interface ClientBlogPostProps {
  blog: Blog & { content: React.ReactNode };
}

export default function ClientBlogPost({ blog }: ClientBlogPostProps) {
  useEffect(() => {
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.slice(1);
        const element = document.getElementById(id || '');
        if (element) {
          const offset = 80;
          const y = element.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          {blog.title}
        </h1>
        <div className="flex items-center gap-3 mb-6 text-gray-600 dark:text-gray-400">
          <span className="font-medium">By {blog.author}</span>
          <span>•</span>
          <time dateTime={blog.date} className="text-sm">
            {new Date(blog.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
        {blog.image && (
          <div className="relative w-full h-64 mb-8">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 dark:bg-gray-800 text-sm px-3 py-1.5 rounded-md text-gray-700 dark:text-gray-300 flex items-center gap-2 font-medium"
              >
                {blogTechIcons[tag] || <SiJavascript size={16} className="text-yellow-400" />}
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="h-px bg-gray-200 dark:bg-gray-800 mb-8"></div>
      </div>
      <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800">
        {blog.content}
      </article>
    </>
  );
}