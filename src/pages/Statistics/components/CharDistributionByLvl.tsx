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
import sumProfs, { ISumProfs } from '../../../utils/sumProfs';
import { MARGONEM_CONSTS } from '../../../constants/Margonem';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

interface props extends ISumProfs {
    
}
const CharDistributionByLvl = ({ prof, profsByLvl } : props) => {

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

    const calcProfsSum = sumProfs({ prof, profsByLvl })
    
    const data = {
        labels: calcProfsSum.labels,
        datasets: [
            {
                data: calcProfsSum.datasets_data,
                backgroundColor: `${ prof ? MARGONEM_CONSTS.PROFESSIONS[prof].color : 'white' }`
            }
        ]
    }

  return (
    <div className='grid grid-cols-12'>
        <div className='col-span-12 p-3 h-[300px]'>
            <Bar 
                options={ options }
                data={ data }
            />
        </div>
    </div>
  )
}

export default CharDistributionByLvl