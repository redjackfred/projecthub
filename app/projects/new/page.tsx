import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export default function NewPage() {
  return (
    <form action={createProject}>
      <label htmlFor="title">Project Title</label>
      <input id="title" name="title"></input>
      <label htmlFor="description">Project Description</label>
      <input id="description" name="description"></input>
      <button type="submit">Create Project</button>
    </form>
  )
}

async function createProject(data: FormData) {
  'use server'
  const title = data.get('title')?.valueOf()
  const description = data.get('description')?.valueOf()

  console.log('Title:', title)
  console.log('Description:', description)

  revalidatePath('/projects')
  redirect('/projects')
}
