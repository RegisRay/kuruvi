import prisma from '@/lib/prisma';


export async function GET(request, response){
    const {searchParams} = new URL(request.url);
    const qid = searchParams.get('qidRes');
    try{
      const choices = await prisma.choice.findMany({
        where:{
          id: qid
        }
      })
      console.log(choices)
    }
    catch (error) {
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
  