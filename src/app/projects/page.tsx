import ProjectsPageClient from '@/components/ProjectsPageClient'
import { generateMetadata as getMeta } from "@/config/Meta";

export async function generateMetadata() {
  return getMeta("/projects");
}

export default function ProjectsPage() {
  return <ProjectsPageClient />
}