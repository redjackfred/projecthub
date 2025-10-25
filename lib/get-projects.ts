export const getProjects = async () => {
  // 1. Fetch data from the GitHub API
  const res = await fetch("https://api.github.com/users/vercel/repos");
  // 2. Check if the request was successful
  if (!res.ok) {
    // If not, throw an error that TanStack Query can catch
    throw new Error("Network response was not ok");
  }
  // 3. If successful, parse the JSON response and return it
  return res.json();
};

