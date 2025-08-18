import { getBlogBySlug, getAllBlogs } from '@/lib/blogs';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import ClientBlogPost from '@/components/ClientBlogPost';
import Callout from '@/components/Callout';
import CodeBlock from '@/components/CodeBlock';
import rehypeSlug from 'rehype-slug';
import remarkToc from 'remark-toc';

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  if (typeof blog.content !== 'string') {
    notFound();
  }

  const content = await MDXRemote({
    source: blog.content as string,
    components: {
      Callout,
      CodeBlock,
    },
    options: {
      mdxOptions: {
        remarkPlugins: [remarkToc], 
        rehypePlugins: [rehypeSlug],
      },
    },
  });

  return (
    <section className="max-w-4xl mx-auto px-4 py-10 bg-white dark:bg-black text-gray-900 dark:text-white">
      <ClientBlogPost blog={{ ...blog, content }} />
    </section>
  );
}

export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}