export const testData = {
  type: 'bar',
  data: {
    labels: ['Question1', 'Question2', 'Question3'],
    datasets: [
      {
        data: [12, 10, 30, 5], //first choice for all questions
        borderColor: 'rgb(109, 253, 181)',
        backgroundColor: 'rgb(109, 253, 181,0.5)',
        borderWidth: 2,
      },
      {
        data: [12, 10, 30, 5], //second choice for all questions
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgb(75, 192, 192,0.5)',
        borderWidth: 2,
      },
      {
        data: [12, 10, 30, 5], //third choice for all questions
        borderColor: 'rgb(255, 205, 86)',
        backgroundColor: 'rgb(255, 205, 86,0.5)',
        borderWidth: 2,
      },
    ],
  },
};
