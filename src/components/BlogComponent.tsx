'use client';
import Image from 'next/image';
import Link from 'next/link';
import { blogTechIcons } from '@/config/blogIcons';
import { SiJavascript } from 'react-icons/si';
import { Blog } from '@/types/blog';

interface ClientBlogsProps {
  blogs: Blog[];
}

export default function ClientBlogs({ blogs }: ClientBlogsProps) {
  return (
    <>
      <div className="flex items-center gap-2 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">All Blog Posts</h3>
        <span className="text-gray-500 dark:text-gray-400 font-normal">
          ({blogs.length} {blogs.length === 1 ? 'post' : 'posts'})
        </span>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {blogs.map((blog) => (
          <Link href={`/blogs/${blog.slug}`} key={blog.slug}>
            <div className="rounded-2xl p-[1px] hover:scale-[1.02] transition-transform duration-200 bg-gray-200 dark:bg-gray-700">
              <div className="bg-white dark:bg-[#111] rounded-2xl overflow-hidden flex flex-col h-full shadow-md dark:shadow-none">
                {blog.image && (
                  <div className="relative w-full h-48">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Title and Date */}
                  <div className="mb-3">
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white leading-tight mb-2">
                      {blog.title}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span>By {blog.author}</span>
                      <span>•</span>
                      <time dateTime={blog.date}>
                        {new Date(blog.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow leading-relaxed">
                    {blog.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-auto">
                    <p className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-100 dark:bg-gray-800 text-xs px-2.5 py-1 rounded-md text-gray-700 dark:text-gray-300 flex items-center gap-1.5"
                        >
                          {blogTechIcons[tag] || <SiJavascript size={16} className="text-yellow-400" />}
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}