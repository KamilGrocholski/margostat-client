import React from 'react'
import Trending from '../../../components/Trending'
import { MARGONEM_CONSTS } from '../../../constants/Margonem'
import { IRanksGlobal } from '../../../types/ranks'
import numberWithSpaces from '../../../utils/numberWithSpaces'

interface props {
    global: IRanksGlobal
    worlds: IRanksGlobal[]
    type: 'avg' | 'last'
}
const ProfsGain = ({ global, worlds, type }: props) => {
    global.nProfs.sort((a, b) => {
        return type === 'last' ? b.gainFromLast - a.gainFromLast : b.gainAvg - a.gainAvg
    })
  return (
    <div className='grid grid-cols-6'>
        <div className={ `grid grid-cols-6 col-span-6 px-3 border-b border-gray-2/50 py-1 text-secondary` }>
            <div className='col-span-1'>
                #
            </div>
            <div className='col-span-3'>
                Profesja
            </div>  
            <div className='col-span-2'>
                Przyrost
            </div>
        </div>
        <div className='grid grid-cols-6 col-span-6'>
            {global.nProfs.map((d, i) => (
                <div key={ i } className={ `grid items-center grid-cols-12 py-1 col-span-6 px-3 ${ i % 2 === 0 ? '' : 'bg-dark-6/50' }` }>
                    <div className='flex items-center col-span-1 text-xs font-semibold text-secondary'>
                        { i + 1 }
                    </div>
                    <div className='flex flex-row col-span-6 space-x-1 text-xs'>
                        <div>
                            { MARGONEM_CONSTS.PROFESSIONS[d.prof as keyof typeof MARGONEM_CONSTS.PROFESSIONS].icon }
                        </div>
                        <div
                            className='flex items-center text-xs font-semibold'
                            style={
                                {
                                    color: MARGONEM_CONSTS.PROFESSIONS[d.prof as keyof typeof MARGONEM_CONSTS.PROFESSIONS].color
                                }
                            }
                        >
                            { d.prof }
                        </div>
                    </div>
                    <div className='flex items-center col-span-5'>
                        <div className='flex flex-col w-full space-y-1'>
                            <div className='flex justify-between space-x-1 font-semibold'>
                                <Trending iconSize={ 18 } value={ d.gainFromLast } />
                                <div className='flex flex-row items-center'>
                                    <span className='flex items-center text-xs font-semibold'>
                                        { numberWithSpaces(type === 'last' ? d.gainFromLast : d.gainAvg) }
                                    </span>
                                    <span className='flex items-center text-xs font-semibold text-secondary'>
                                        ({ type === 'last' ? ((d.gainFromLast / global.nCharacters.n) * 100).toFixed(2) : ((d.gainAvg / global.nCharacters.n) * 100).toFixed(2) }%)
                                    </span>
                                </div>
                            </div>
                            <div className='flex items-center justify-end w-full h-[2px] bg-gray-2/50 rounded'>
                                <div
                                    className='flex h-[2px] rounded'
                                    style={
                                        {
                                            width: `${ type === 'last' ? (d.gainFromLast / global.nProfs[0].gainFromLast) * 100 : (d.gainAvg / global.nProfs[0].gainAvg) * 100 }%`,
                                            backgroundImage: MARGONEM_CONSTS.PROFESSIONS[d.prof as keyof typeof MARGONEM_CONSTS.PROFESSIONS].gradient,
                                            animation: 'from0ToN 2s ease-in-out'
                                        }
                                    }
                                    >
                                </div>
                            </div>
                         </div>                        
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ProfsGain