import React from 'react'
import Box from '../Box'

const StatisticsLangindPage = () => {
  return (  
    <div className='grid grid-cols-12 gap-3'>
        <Box gridSpan='col-span-8'>
            <div className='h-64'>
                Światy
            </div>
        </Box>
        <Box gridSpan=''>
            <div className='h-64'>
                Przedmioty
            </div>
        </Box>
        <Box gridSpan=''>
            <div className='h-64'>
                Światy
            </div>
        </Box>
    </div>
  )
}

export default StatisticsLangindPage