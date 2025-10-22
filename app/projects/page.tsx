import Link from "next/link"

export default async function ProjectsPage() {
  const data = await fetch("https://api.github.com/users/vercel/repos")
  const projects = await data.json()

  return (
    <ul>
      {projects.map((project: any) => (
        <li key={project.id}>
          <Link href={`/projects/${project.id}`}>{project.full_name}</Link>
        </li>
      ))
      }
    </ul >
  )
}
