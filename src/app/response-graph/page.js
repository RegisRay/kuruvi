'use client';

import { useEffect, useState } from 'react';
import { Chart } from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
// import { testData } from "./test-data";
// import { getForm } from "../forms/[form_id]/service";
import { BarChart } from './barChart';
import { getForm } from '../forms/[form_id]/service';
import { getGraphData } from '../services/answer/service';

Chart.register(CategoryScale);

export default function CardBarChart({ qid }) {
console.log("Hello")
  const [graphCount, setGraphCount] = useState(null);

  useEffect(() => {
    (async () => {
      console.log("Hello")
      const { data, error } = await getGraphData(qid);
      if (data) {
        // console.log(data);
        setGraphCount(data);
      }
    })();
  }, []);

  let chartData;
  if (graphCount) {
    console.log(graphCount);
    chartData = {
      labels: graphCount.map((data) => data.name), //Choices
      datasets: [
        {
          label: 'Results',
          data: graphCount.map((data) => data.count), //count
          backgroundColor: [
            'rgba(75,192,192,1)',
            '#ecf0f1',
            '#50AF95',
            '#f3ba2f',
            '#2a71d0',
          ],
          borderColor: 'black',
          borderWidth: 2,
        },
      ],
    };
  }
  return (
    <>
      {chartData ? (
        <>
          <div >
            <BarChart chartData={chartData} />
          </div>
        </>
      ) : (
        <>Loading..</>
      )}
    </>
  );
}
