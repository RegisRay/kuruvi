import prisma from '@/lib/prisma';


export async function GET(request, response){
    const {searchParams} = new URL(request.url);
    const qid = searchParams.get('qidRes');
    try{
      const choices = await prisma.choice.findMany({
        where:{
          question_id: qid
        },
      })
      let choice_id=[]
    //   console.log(choices)
      choices.map((choice)=>{choice_id.push(choice.id)})
    //   console.log(choice_id)
      
      let answerCount = [];
      for(let i in choice_id){
        const answers = await prisma.answers.count({
            where:{
                choice_id: choice_id[i]         
            }
        })
        answerCount.push(answers)
      }
    //   console.log(answerCount)
      
      let ans=[];
      
      for(let i in choices){
        let temp ;
        temp ={
            choice_id: choices[i].id,
            count: answerCount[i],
            name: choices[i].name
        }
        ans.push(temp)
      }
    //   console.log(ans);
      
      response = new Response(JSON.stringify(ans),{
        status:200,
        headers:{
            'content-type':'application/type'
        }
      })
      
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
  