import prisma from '@/lib/prisma';

export const runtime = 'experimental-edge';

//GetAnswerHandler
//URL: http://localhost:3000/api/answer?qid=9ea3875b-23d5-4a83-8c48-d055dcc7e9f8

export async function GET(request, response) {
  const { searchParams } = new URL(request.url);
  const qid = searchParams.get('qid');
  try {
    const answer = await prisma.answers.findMany({
      where: {
        question_id: qid,
      },
    });

    response = new Response(
      JSON.stringify({ message: 'Answers fetched successfully', answer }),
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
      response = new Response(JSON.stringify({ error: 'Question not found' }), {
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

//AddAnswerHandler
//URL: http://localhost:3000/api/answer?qid=9ea3875b-23d5-4a83-8c48-d055dcc7e9f8
//body: {
//     "value":"testAnswer2"
// }

export async function POST(request, response) {
  const { searchParams } = new URL(request.url);
  const qid = searchParams.get('qid');
  const { value } = await request.json();

  try {
    const answer = await prisma.answers.create({
      data: {
        value,
        question_id: qid,
      },
    });

    response = new Response(
      JSON.stringify({ message: 'Answers added successfully', answer }),
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
      response = new Response(JSON.stringify({ error: 'Question not found' }), {
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

//DeleteAnswerHandler
//URL: http://localhost:3000/api/answer?aid=4563875b-23d5-4a83-8c48-d055dcc7eadf

export async function DELETE(request, response) {
  const { searchParams } = new URL(request.url);
  const aid = searchParams.get('aid');
  try {
    const answer = await prisma.answers.delete({
      where: {
        id: aid,
      },
    });

    response = new Response(
      JSON.stringify({ message: 'Answer deleted successfully', answer }),
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
      response = new Response(JSON.stringify({ error: 'Answer not found' }), {
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

//UpdateAnswerHandler
//URL: http://localhost:3000/api/answer?aid=4563875b-23d5-4a83-8c48-d055dcc7eadf
//body: {
//     "value":"updatedTestAnswer"
// }

export async function PUT(request, response) {
  const { searchParams } = new URL(request.url);
  const aid = searchParams.get('aid');
  const body = await request.json();
  try {
    const answer = await prisma.answers.update({
      where: {
        id: aid,
      },
      data: {
        ...body,
      },
    });

    response = new Response(
      JSON.stringify({ message: 'Answer updated successfully', answer }),
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
      response = new Response(JSON.stringify({ error: 'Answer not found' }), {
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
