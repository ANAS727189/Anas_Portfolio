import { getAllBlogs } from '@/lib/blogs';
import ClientBlogs from '@/components/BlogComponent'
import { generateMetadata as getMeta } from "@/config/Meta";

export async function generateMetadata() {
  return getMeta("/blogs");
}

export default async function Blogs() {
  const blogs = await getAllBlogs();

  return (
    <section className="max-w-5xl mx-auto px-4 py-10 bg-white dark:bg-black text-gray-900 dark:text-white">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Blog Posts</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          My thoughts and insights across various topics.
        </p>
        <div className="h-px bg-gray-200 dark:bg-gray-800 mt-6"></div>
      </div>
      <ClientBlogs blogs={blogs} />
    </section>
  );
}