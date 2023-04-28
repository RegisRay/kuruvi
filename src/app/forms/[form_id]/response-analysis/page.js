'use client'
import { useEffect, useState } from "react";
import { getForm } from "src/app/forms/[form_id]/service";
import { useParams } from "next/navigation";
import CardBarChart from "src/app/response-graph/page";

export default function ResponseAnalysis(){
    const {form_id} = useParams();
    const [questions, setQuestions] = useState(null);
    
    useEffect(()=>{
        (async()=>{
            console.log(form_id)
            const {data, error} = await getForm(form_id);
            if(data){
                // console.log(data);
                setQuestions(data.form.questions);
            }
            else{
                console.log(error)
            }
        })();
    },[])
    
    return(
        <div className="justify-content-center align-items-center">
        {questions?(
        <>  
        <h2 style={{ textAlign: 'center' }}>Response Analysis</h2>
            
            {questions?.map((question)=>{return(
                 
                <CardBarChart qid={question.id}/>
            )
               
            })}
        </>
        ):(<>Loading</>)}
        
        </div>
    );
    

}