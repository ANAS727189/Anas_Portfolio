import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

import { Blog } from "@/types/blog";

const blogsDirectory = path.join(process.cwd(), "src/data/blogs");

export const getAllBlogs = async (): Promise<Blog[]> => {
  try {
    const files = await fs.readdir(blogsDirectory);

    const blogs = await Promise.all(
      files
        .filter((file) => file.endsWith(".mdx"))
        .map(async (file) => {
          try {
            const filePath = path.join(blogsDirectory, file);
            const fileContent = await fs.readFile(filePath, "utf-8");
            const { data, content } = matter(fileContent);

            // console.log("DEBUG date string:", JSON.stringify(data.date));

            const dateValue = data.date ? String(data.date).trim() : null;
            const rawDate = dateValue ? new Date(dateValue) : null;


           return {
              slug: file.replace(".mdx", ""),
              title: data.title,
              description: data.description,
              image: data.image,
              tags: data.tags || [],
             rawDate: rawDate && !isNaN(rawDate.getTime()) ? rawDate.toISOString() : null,
            date: rawDate && !isNaN(rawDate.getTime())
                ? format(rawDate, "MMMM dd, yyyy", { locale: enUS })
                : "Unknown Date",

              author: data.author,
              isPublished: data.isPublished ?? false,
              content,
            } as Blog;
          } catch (error) {
            console.error(`Error processing blog file ${file}:`, error);
            return null;
          }
        })
    );

    return blogs
  .filter((blog): blog is Blog => blog !== null && blog.isPublished)
  .sort((a, b) => {
    const aTime = a.rawDate ? new Date(a.rawDate).getTime() : 0;
    const bTime = b.rawDate ? new Date(b.rawDate).getTime() : 0;
    return bTime - aTime;
  });


  } catch (error) {
    console.error("Error reading blogs directory:", error);
    return [];
  }
};

export const getBlogBySlug = async (slug: string): Promise<Blog | null> => {
  try {
    const filePath = path.join(blogsDirectory, `${slug}.mdx`);
    const fileContent = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    // console.log("DEBUG date string:", JSON.stringify(data.date));
    const rawDate = new Date(data.date);

    return {
      slug,
      title: data.title,
      description: data.description,
      image: data.image,
      tags: data.tags || [],
      rawDate: rawDate.toISOString(),
      date: format(rawDate, "MMMM dd, yyyy"),
      author: data.author,
      isPublished: data.isPublished ?? false,
      content,
    } as Blog;
  } catch (error) {
    console.error(`Error getting blog by slug ${slug}:`, error);
    return null;
  }
};
