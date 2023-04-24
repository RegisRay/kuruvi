import prisma from '@/lib/prisma';

export const config = {
  runtime: 'experimental-edge',
};

// export const runtime = 'experimental-edge'

export async function GET(request,{params}, response) {
  const { id } = params;
  console.log(id);
  try {
    const user = await prisma.profiles.findUnique({
      where: {
        id: id,
      },
    });
    

    response = new Response(JSON.stringify(user), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });
  } catch (error) {
    console.log(error);
    response = new Response(JSON.stringify(error), {
      status: 400,
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  return response;
}

export async function POST(request, response){
  const body = await request.json();
  console.log(body);
  try{
  response = new Response(JSON.stringify(body),{
    status:200,
    headers:{
      'content-type':'application/json'
    }
  })
      
  }
  catch(error){
    response = new Response(JSON.stringify(error),{
      status:400,
      headers:{
        'content-type':'application/json'
      }
    })
  }
  return response
  
}
