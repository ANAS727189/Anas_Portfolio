import { getBlogBySlug, getAllBlogs } from '@/lib/blogs';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import ClientBlogPost from '@/components/ClientBlogPost';
import Callout from '@/components/Callout';
import CodeBlock from '@/components/CodeBlock';
import rehypeSlug from 'rehype-slug';
import remarkToc from 'remark-toc';
import { generateBlogPostingSchema } from '@/lib/structured-data';
import { siteConfig } from '@/config/Meta';
import Script from 'next/script';
import { Metadata } from 'next';

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: 'Blog Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${blog.title} | Anas Khan Blog`,
    description: blog.description || `Read ${blog.title} on Anas Khan's blog`,
    keywords: blog.tags?.join(', '),
    authors: [{ name: blog.author || siteConfig.author.name }],
    openGraph: {
      title: blog.title,
      description: blog.description || `Read ${blog.title} on Anas Khan's blog`,
      type: 'article',
      publishedTime: blog.date,
      authors: [blog.author || siteConfig.author.name],
      url: `${siteConfig.url}/blogs/${slug}`,
      images: [
        {
          url: blog.image || `${siteConfig.url}/meta/blogs.png`,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.description || `Read ${blog.title} on Anas Khan's blog`,
      images: [blog.image || `${siteConfig.url}/meta/blogs.png`],
      creator: siteConfig.author.twitter,
    },
    alternates: {
      canonical: `${siteConfig.url}/blogs/${slug}`,
    },
  };
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

  const blogSchema = generateBlogPostingSchema({
    title: blog.title,
    description: blog.description || '',
    date: blog.date,
    slug,
    author: blog.author,
    tags: blog.tags,
  });

  return (
    <>
      <Script
        id={`blog-structured-data-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <section className="max-w-4xl mx-auto px-4 py-10 bg-white dark:bg-black text-gray-900 dark:text-white">
        <ClientBlogPost blog={{ ...blog, content }} />
      </section>
    </>
  );
}

export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}