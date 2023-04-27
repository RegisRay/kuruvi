import prisma from '@/lib/prisma';


export async function GET(request, response){
    const {searchParams} = new URL(request.url);
    const qid = searchParams.get('qidRes');
    try{
      const choices = await prisma.questions.findMany({
        where:{
          id: qid
        },
        
      })
      let choice_id=[]
      choices.map((choice)=>{choice_id.push(choice.id)})
      let answerRes = [];
      for(let i in choice_id){
        const answers = await prisma.answers.count({
            where:{
                choice_id: choice_id[i]         
            }
        })
        answerRes.push(answers)
      }
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
  