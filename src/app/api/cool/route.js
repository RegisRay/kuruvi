export const runtime = 'edge';

export async function GET(req) {
  return new Response(
    JSON.stringify({
      message: 'Hello from the edge!',
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    }
  );
}
