import { getAllBlogs } from '@/lib/blogs';
import ClientBlog from '@/components/ClientBlog';

export default async function Blog() {
  const blogs = (await getAllBlogs()).slice(0, 2);

  return (
    <section id="blogs" className="bg-white dark:bg-black text-gray-900 dark:text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-lg text-blue-500 dark:text-blue-400 font-semibold">Featured</p>
        <h3 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Blogs</h3>
        <ClientBlog blogs={blogs} />
      </div>
    </section>
  );
}