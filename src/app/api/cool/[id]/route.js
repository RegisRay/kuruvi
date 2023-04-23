import prisma from '@/lib/prisma';

export const config = {
  runtime: 'experimental-edge',
};

export async function GET(request, response) {
  // const { id } = request.body;

  try {
    const user = await prisma.profiles.findFirst({
      where: {
        id: '7c80580b-d01c-41e7-8472-9426554ac031',
      },
    });

    response = new Response(JSON.stringify(user), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });
  } catch (error) {
    response = new Response(JSON.stringify(error), {
      status: 400,
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  return response;
}
