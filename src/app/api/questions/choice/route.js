import prisma from '@/lib/prisma';

export const config = {
  runtime: 'experimental-edge',
};

//GetChoiceHandler
//URL: http://localhost:3000/api/questions/choice?qid=9ea3875b-23d5-4a83-8c48-d055dcc7e9f8
export async function GET(request, response){
    const {searchParams} = new URL(request.url);
    const {qid} = searchParams.get('qid');
    try{
        const choice = await prisma.choice.findMany({
            where:{
              question_id:qid
            },
        });
        
        response = new Response(JSON.stringify({message: 'Choices fetched successfully', choice}),{
            status: 200,
            headers:{
                'content-type':'application/json'
            }
        })
    }
    catch (error) {
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

//AddChoiceHandler
//URL: http://localhost:3000/api/questions/choice?qid=9ea3875b-23d5-4a83-8c48-d055dcc7e9f8
//body: {
//     "name":"option2"
// }

export async function POST(request, response){
    const {searchParams} = new URL(request.url);
    const qid = searchParams.get('qid');
    const {name} = await request.json();
    
    try{
        const choice = await prisma.choice.create({
            data:{
                name,
                question_id:qid
            }
        });
        
        response = new Response(JSON.stringify({message: 'Choice added successfully', choice}),{
            status:200,
            headers:{
                'content-type':'application/json'
            }
        })
    }
    catch (error) {
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

//DeleteChoiceHandler
//URL: http://localhost:3000/api/questions/choice?cid=a88d12c6-4454-4d76-856d-1a5d0264c240

export async function DELETE(request, response){
    const {searchParams} = new URL(request.url);
    const cid = searchParams.get('cid');
    try{
        const choice = await prisma.choice.delete({
            where:{
                id:cid
            }
        });
        
        response = new Response(JSON.stringify({message: 'Choices deleted successfully', choice}),{
            status: 200,
            headers:{
                'content-type':'application/json'
            }
        })
    }
    catch (error) {
        console.log(error);
        if ((error.code = 'P2025')) {
          response = new Response(JSON.stringify({ error: 'Choice not found' }), {
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

//UpdateChoiceHandler
//URL: http://localhost:3000/api/questions/choice?cid=a88d12c6-4454-4d76-856d-1a5d0264c240
//body: {
//     "name":"updateChoice"
// }

export async function PUT(request, response){
    const {searchParams} = new URL(request.url);
    const cid = searchParams.get('cid');
    const body = await request.json();
    try{
        const choice = await prisma.choice.update({
            where:{
                id: cid,
            },
            data:{
                ...body
            }
        });
        
        response = new Response(JSON.stringify({message: 'Choices updated successfully', choice}),{
            status: 200,
            headers:{
                'content-type':'application/json'
            }
        })
    }
    catch (error) {
        console.log(error);
        if ((error.code = 'P2025')) {
          response = new Response(JSON.stringify({ error: 'Choice not found' }), {
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