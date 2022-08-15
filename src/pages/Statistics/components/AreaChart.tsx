import React from 'react'
import { IWorldStatistics } from '../../../types/statistics';
import sumProfs from '../../../utils/sumProfs';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
import { MARGONEM_CONSTS } from '../../../constants/Margonem';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

const AreaChart = ({ prof, profsByLvl } : { profsByLvl: IWorldStatistics['profsByLvl'], prof: keyof typeof MARGONEM_CONSTS.PROFESSIONS }) => {

    const options = {
        responsive: true,
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
                backgroundColor: MARGONEM_CONSTS.PROFESSIONS[prof as keyof typeof MARGONEM_CONSTS.PROFESSIONS].color
            }
        ]
    }

  return (
    <div className='grid grid-cols-12'>
        <div className='col-span-12 p-3'>
            <Bar
                options={ options }
                data={ data }
            />
        </div>
    </div>
  )
}

export default AreaChart