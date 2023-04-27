import prisma from '@/lib/prisma';

export const config = {
  runtime: 'experimental-edge',
};

// Example
// URL: http://localhost:3000/api/forms/[id]

export async function GET(request, { params }, response) {
  const { id } = params;

  try {
    const form = await prisma.forms.findUnique({
      where: {
        id,
      },
      include: {
        questions: {
          include: {
            answers: true,
            choice: true
          },
        },
      },
    });

    response = new Response(
      JSON.stringify({ message: 'Form fetched successfully', form }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.log(error);
    if ((error.code = 'P2025')) {
      response = new Response(JSON.stringify({ error: 'Form not found' }), {
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
// URL: http://localhost:3000/api/forms/[id]

export async function PUT(request, { params }, response) {
  const { id } = params;
  const body = await request.json();
  try {
    const form = await prisma.forms.update({
      where: {
        id,
      },
      data: {
        ...body,
      },
    });

    response = new Response(
      JSON.stringify({ message: 'Form updated successfully', form }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.log(error);
    if ((error.code = 'P2025')) {
      response = new Response(JSON.stringify({ error: 'Form not found' }), {
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
// URL: http://localhost:3000/api/forms/[id]
