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
    
    
    let questionRes = [];

    questions.map(async (quest,index)=>{
      const choices = await prisma.choice.findMany({
        where:{
          question_id: quest.id
        }
      })
    
      questionRes.push({
        id: quest.id,
        form_id: quest.form_id,
        content: quest.content,
        type: quest.type,
        choice: {choices}
      })
      console.log(questionRes);
      
    })
    

    response = new Response(JSON.stringify(questionRes), {
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
