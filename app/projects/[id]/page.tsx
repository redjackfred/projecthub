import { notFound } from 'next/navigation';

export default async function ProjectDetailedPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await fetch("https://api.github.com/users/vercel/repos")
  if (!data.ok) {
    notFound();
  }
  const repos = await data.json()
  const project = repos.find((repo: { id: { toString: () => string; }; }) => repo.id.toString() === id);


  return (
    <>
      <h1>Project Detailed Page</h1>
      {project ? (
        <>
          <p>Project ID: {id}</p>
          <p>Project Name: {project ? project.full_name : 'Project not found'}</p>
          <p>Project Description: {project ? project.description : 'N/A'}</p>
        </>
      ) : notFound()}
    </>
  )
}
