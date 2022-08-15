import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { IRanksGlobal } from '../../../types/ranks';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const WorldsRanksChart = ({ worlds }: { worlds: IRanksGlobal[] }) => {

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false,
      }
    }
  }

  const data = {
    // labels: fakeData.map(w => w.name),
    labels: worlds.map(w => w.name),
    datasets: [
      {
        // data: fakeData.map(w => w.nCharacters.n),
        data: worlds.map(w => w.nCharacters.n),
        backgroundColor: 'rgb(14 165 233 / 0.5)'
      }
    ]
  }

  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-12 p-3 h-[300px]'>
        <Bar
          options={options}
          data={data}
        />
      </div>
    </div>
  )
}

export default WorldsRanksChart