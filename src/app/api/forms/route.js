import prisma from '@/lib/prisma';

export const config = {
  runtime: 'experimental-edge',
};

// Example
// URL: http://localhost:3000/api/forms?uid=7c80580b-d01c-41e7-8472-9426554ac031

export async function GET(request, response) {
  //Query parameter
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get('uid');
  // console.log(uid, 'issss');
  try {
    const form = await prisma.forms.findMany({
      where: {
        user_id: uid,
      },
    });

    response = new Response(JSON.stringify({message: 'Forms fetched successfully', form}), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });
  } catch (error) {
    console.log(error);
    if ((error.code = 'P2025')) {
      response = new Response(JSON.stringify({ error: 'No forms found' }), {
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
// URL: http://localhost:3000/api/forms?uid=7c80580b-d01c-41e7-8472-9426554ac031
// Body: {
//   "name": "Test",
//   "description": "Test",
// }

export async function POST(request, response) {
  //Query parameter
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get('uid');
  // console.log(uid, 'issss');
  //Body data
  const { name, description } = await request.json();
  try {
    const form = await prisma.forms.create({
      data: {
        name,
        description,
        user_id: uid,
      },
    });

    response = new Response(JSON.stringify({message: 'Form created successfully', form}), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });
  } catch (error) {
    console.log(error);
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
// URL: http://localhost:3000/api/forms?fid=1
// Body: {
//   "name": "Test",
//   "description": "Test",
// }

export async function PUT(request, response) {
  //Query parameter
  const { searchParams } = new URL(request.url);
  const fid = searchParams.get('fid');
  //Body data
  const { name, description } = await request.json();
  try {
    const form = await prisma.forms.update({
      where: {
        id: fid,
      },
      data: {
        name,
        description,
      },
    });

    response = new Response(JSON.stringify({message: 'Forms updated successfully', form}), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });
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
// URL: http://localhost:3000/api/forms?fid=1

export async function DELETE(request, response) {
  //Query parameter
  const { searchParams } = new URL(request.url);
  const fid = searchParams.get('fid');

  try {
    const form = await prisma.forms.delete({
      where: {
        id: fid,
      },
    });

    response = new Response(
      JSON.stringify({
        message: 'Form deleted successfully',
        form,
      }),
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
