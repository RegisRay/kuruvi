import prisma from '@/lib/prisma';

export const config = {
  runtime: 'experimental-edge',
};

// Example
// URL: http://localhost:3000/api/profile?uid=7c80580b-d01c-41e7-8472-9426554ac031

export async function GET(request, response) {
  //Query parameter
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get('uid');

  try {
    const user = await prisma.profiles.findUniqueOrThrow({
      where: {
        id: uid,
      },
    });

    response = new Response(JSON.stringify(user), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });
  } catch (error) {
    if ((error.code = 'P2025')) {
      response = new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: {
          'content-type': 'application/json',
        },
      });
    } else {
      response = new Response(JSON.stringify(error), {
        status: 400,
        headers: {
          'content-type': 'application/json',
        },
      });
    }
  }

  return response;
}

// Example
// URL: http://localhost:3000/api/profile?uid=7c80580b-d01c-41e7-8472-9426554ac031
// Body: { "full_name": "John Doe" }

export async function PUT(request, response) {
  //Query parameter
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get('uid');
  //Body data
  const body = await request.json();

  try {
    const user = await prisma.profiles.update({
      where: {
        id: uid,
      },
      data: {
        ...body,
      },
    });

    response = new Response(JSON.stringify(user), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });
  } catch (error) {
    if ((error.code = 'P2025')) {
      response = new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: {
          'content-type': 'application/json',
        },
      });
    } else {
      response = new Response(JSON.stringify(error), {
        status: 400,
        headers: {
          'content-type': 'application/json',
        },
      });
    }
  }
  return response;
}

// Example
// URL: http://localhost:3000/api/profile?uid=7c80580b-d01c-41e7-8472-9426554ac031

export async function DELETE(request, response) {
  //Query parameter
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get('uid');

  try {
    const user = await prisma.profiles.delete({
      where: {
        id: uid,
      },
    });

    response = new Response(
      JSON.stringify({
        message: 'User deleted successfully',
        user,
      }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      }
    );
  } catch (error) {
    if ((error.code = 'P2025')) {
      response = new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: {
          'content-type': 'application/json',
        },
      });
    } else {
      response = new Response(JSON.stringify(error), {
        status: 400,
        headers: {
          'content-type': 'application/json',
        },
      });
    }
  }
  return response;
}
