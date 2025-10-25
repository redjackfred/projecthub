"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getProjects } from "@/lib/get-projects";


// Define the type for a project (good practice)
type Project = {
  id: number;
  full_name: string;
  // ... any other fields you need
};


// Update the props to accept initialData
export default function ProjectList({
  initialData,
}: {
  initialData: Project[];
}) {
  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    initialData: initialData, // Here's the magic!
    // staleTime: 1000 * 60 * 5, // Optional: tell Query data is fresh for 5 mins
  });

  // We don't need loading/error states for the *initial* load
  // because the data is provided by the server.

  return (
    <ul>
      {projects.map((project: any) => (
        <li key={project.id}>
          <Link href={`/projects/${project.id}`}>{project.full_name}</Link>
        </li>
      ))}
    </ul>
  );
}
