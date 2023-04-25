import prisma from '@/lib/prisma';

export const config = {
  runtime: 'experimental-edge',
};

// Example
// URL: http://localhost:3000/api/forms/[id]/questions

export async function GET(request, response) {
  const { searchParams } = new URL(request.url);
  const fid = searchParams.get('fid');

  try {
    const questions = await prisma.questions.findMany({
      where: {
        form_id: fid,
      },
    });

    response = new Response(JSON.stringify(questions), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });
  } catch (error) {
    console.log(error);
    if (error.code == 'P2025') {
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

export async function POST(request, response) {
  const { searchParams } = new URL(request.url);
  const { question_type, question, choice_name } = await request.json();
  const fid = searchParams.get('fid');

  try {
    const form = await prisma.forms.findUnique({
      where: {
        id: fid,
      },
    });
    if (form) {
      console.log(form);
      const question_db = await prisma.questions.create({
        data: {
          form_id: fid,
          type: question_type,
          content: question,
          choice: {
            create: {
              name: choice_name,
            },
          },
        },
      });

      console.log(question_db);

      response = new Response(JSON.stringify(question_db), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });
    }
  } catch (error) {
    if (error.code == 'P2025') {
      response = new Response(JSON.stringify({ error: 'No forms found' }), {
        status: 404,
        headers: {
          'content-type': 'application/json',
        },
      });
    } else {
      console.log(error);
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
