import { ReactNode } from "react";


export interface Blog {
  slug: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  rawDate: string;
  date: string;
  author: string;
  isPublished: boolean;
 content: string | ReactNode;
}