import { Bar } from 'react-chartjs-2';
export const BarChart = ({ chartData }) => {
  return (
    <>
      {console.log(chartData)}
      <div className="chart">
        <Bar
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
              },
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </>
  );
};
