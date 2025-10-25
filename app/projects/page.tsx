import Link from "next/link"
import type { Metadata } from "next";
import ProjectList from "@/components/project-lists";
import { getProjects } from "@/lib/get-projects";
import { verifySession } from "@/lib/dal";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "My Projects page",
  description: "Hey Hey Hey",
};

// Your page is an async Server Component again
export default async function ProjectsPage() {
  const session = await verifySession();

  if (!session.isAuth) {
    redirect('/login');
  }

  // 1. Fetch data on the server, just like your original code
  const projects = await getProjects();

  // 2. Pass the server-fetched data as the 'initialData' prop
  return <ProjectList initialData={projects} />;
}
