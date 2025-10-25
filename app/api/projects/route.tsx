// Opt into caching for this route
export const dynamic = 'force-static';

export async function GET() {
  const res = await fetch('https://api.github.com/users/vercel/repos', {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY || ''
    }
  });

  const data = await res.json();

  return Response.json({ data })
}

export async function POST(request: Request) {
  const reqBody = await request.json();

  return Response.json({ received: reqBody })
}

export async function PUT(request: Request) {
  const reqBody = await request.json();
  return Response.json({ updated: reqBody })
}

export async function DELETE(request: Request) {
  const reqBody = await request.json();
  return Response.json({ deleted: reqBody })
}
