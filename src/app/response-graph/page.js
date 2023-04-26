'use client';

import { Chart } from 'chart.js';
import { testData } from './test-data';
import { useEffect } from 'react';

export function Test() {
  useEffect(() => {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, { testData });
  }, []);

  return (
    <>
      <h1 className="mx-auto mt-10 w-[150px] text-xl font-semibold capitalize ">
        Bar Chart
      </h1>
      <div className="mx-auto my-auto flex h-screen w-[1100px]">
        <div className="my-auto h-fit w-full rounded-xl  border border-gray-400 pt-0  shadow-xl">
          <canvas id="myChart"></canvas>
        </div>
      </div>
    </>
  );
}
