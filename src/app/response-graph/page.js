'use client'

import {useEffect, useState } from "react";
import {Chart} from "chart.js/auto";
import { CategoryScale } from "chart.js";
// import { testData } from "./test-data";
// import { getForm } from "../forms/[form_id]/service";
import { BarChart } from "./barChart";
import { getForm } from "../forms/[form_id]/service";

Chart.register(CategoryScale);

const Data = [
  {
    id: 1,
    year: 2016,
    userGain: 80000,
    userLost: 823
  },
  {
    id: 2,
    year: 2017,
    userGain: 45677,
    userLost: 345
  },
  {
    id: 3,
    year: 2018,
    userGain: 78888,
    userLost: 555
  },
  {
    id: 4,
    year: 2019,
    userGain: 90000,
    userLost: 4555
  },
  {
    id: 5,
    year: 2020,
    userGain: 4300,
    userLost: 234
  }
];


export default function CardBarChart() {

  const [questions, setQuestions] = useState(null);
  useEffect(()=>{
    (async()=>{
      const form_id = "21864db8-e43d-11ed-b5ea-0242ac120002"
      const {data, error} = await getForm(form_id)
      if(data){
        setQuestions(data.form.questions[0])
      }
    })();
  },[])
  
  
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.year),  //Choices
    datasets: [
      {
        label: "Users Gained ",
        data: Data.map((data) => data.userGain), //count
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });
  return (
    <>
      <div className="App">
        <p>Using Chart.js in React</p>
        <BarChart chartData={chartData}/>
      </div>
    </>
  );
}