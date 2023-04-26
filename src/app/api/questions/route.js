import prisma from '@/lib/prisma';

export const config = {
  runtime: 'experimental-edge',
};

// GetQuestionsWithChoiceHandler
// URL: http://localhost:3000/api/questions?fid=b9cd2345-73d9-4c31-9236-d99220ad7555

export async function GET(request, response) {
  const { searchParams } = new URL(request.url);
  const fid = searchParams.get('fid');

  try {
    const questions = await prisma.questions.findMany({
      where: {
        form_id: fid,
      },
      include: {
        choice: true,
      },
    });

    response = new Response(
      JSON.stringify({ message: 'Questions fetched successfully', questions }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      }
    );
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

//AddQuestionHandler
//URL: http://localhost:3000/api/questions?fid=b9cd2345-73d9-4c31-9236-d99220ad7555
//body: {
//     "type":"choice",
//     "content":"hello testing question?",
//     "choice_name":"choice1"
// }

export async function POST(request, response) {
  const { searchParams } = new URL(request.url);
  const { type, content, choice_name } = await request.json();
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
          type,
          content,
          choice: {
            create: {
              name: choice_name,
            },
          },
        },
      });

      console.log(question_db);

      response = new Response(
        JSON.stringify({ message: 'Questions added successfully', question_db }),
        {
          status: 200,
          headers: {
            'content-type': 'application/json',
          },
        }
      );
    }
  } catch (error) {
    if (error.code == 'P2025') {
      response = new Response(JSON.stringify({ error: 'No form found' }), {
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

//DeleteQuestionHandler
//URL: http://localhost:3000/api/questions?qid=6060ecc9-5dc4-415d-bae5-149a4b2a1d0a

export async function DELETE(request, response) {
  const { searchParams } = new URL(request.url);
  const qid = searchParams.get('qid');
  console.log(qid);
  try {
    const question = await prisma.questions.delete({
      where: {
        id: qid,
      },
    });

    response = new Response(
      JSON.stringify({ message: 'Questions deleted successfully', questions }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      }
    );
  } catch (error) {
    if (error.code == 'P2025') {
      response = new Response(JSON.stringify({ error: 'No question found' }), {
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

//UpdateQuestionHandler
//URL:http://localhost:3000/api/questions?qid=9ea3875b-23d5-4a83-8c48-d055dcc7e9f8
//body:{
//     "content":"Update Tesing Question?",
//     "type":"choice"
// }

export async function PUT(request, response) {
  const { searchParams } = new URL(request.url);
  const qid = searchParams.get('qid');
  const body = await request.json();

  try {
    const question = await prisma.questions.update({
      where: {
        id: qid,
      },
      data: {
        ...body,
      },
    });

    response = new Response(
      JSON.stringify({ message: 'Question updated successfully', question }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      }
    );
  } catch (error) {
    if (error.code == 'P2025') {
      response = new Response(JSON.stringify({ error: 'No question found' }), {
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
