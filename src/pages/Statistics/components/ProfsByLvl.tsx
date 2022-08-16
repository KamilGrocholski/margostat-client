import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { getOneWorldFilteredProfsByLvl } from '../../../api/statisticsAPI'
import ArrowDownIcon from '../../../assets/svg/ArrowDownIcon'
import Loader from '../../../components/Loader'
import { MARGONEM_CONSTS } from '../../../constants/Margonem'
import numberWithSpaces from '../../../utils/numberWithSpaces'

// { query.data } : { query.data: IOneWorldFiltered }
const ProfsChart = ({ max, world, date }: { max: number, world: string, date: string}) => {

    const [minLvl, setMinLvl] = useState(1)
    const [maxLvl, setMaxLvl] = useState(max || 500)
    const [oneLvl, setOneLvl] = useState<number | null>(null)
    
    useEffect(() => {
        setMinLvl(1)
        setMaxLvl(max || 500)
        setOneLvl(null)
    }, [max])

    const query = useQuery(['worldFilteredProfsByLvl', [world, date]], () => getOneWorldFilteredProfsByLvl({ world: world ? world : 'Wszystkie', min: minLvl, max: maxLvl, date }))

    const handleOnChangeMinLvl = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value)
        if (value < 1 || value > max) return 
        setMinLvl(value)
        setOneLvl(null)
    }

    const handleOnChangeMaxLvl = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value)
        if (value < 1 || value > max) return 
        setMaxLvl(value)
        setOneLvl(null)
    }

    const handleOnChangeOneLvl = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value)
        if (value < 1 || value > max) return 
        setOneLvl(value)
        setMinLvl(value)
        setMaxLvl(value)
    }

    const decrementMinLvl = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()  
        setMinLvl(prev => prev - 1 < 1 ? prev : prev - 1)
    }
    const incrementMinLvl = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setMinLvl(prev => prev + 1 > max ? prev : prev + 1)
    }
    const decrementMaxLvl = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setMaxLvl(prev => prev - 1 < 1 ? prev : prev - 1)
    }
    const incrementMaxLvl = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setMaxLvl(prev => prev + 1 > max ? prev : prev + 1)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        query.refetch()
    }
    
    if (query.isLoading) {
        return <div className='flex items-center justify-center col-start-6 col-end-8'><Loader /></div>
    } 
    if (query.isError) {
        return <div>error</div>
    } 
    if (!query.data) {
        return <div>error</div>
    }

    const firstPlaceProf = query.data.sortedProfs[0]

    return (
    <>
        <div className='col-span-8'>
                <div className='grid items-center grid-cols-10 p-3 mb-2 border-b text-secondary border-gray-2/50'>
                    <div className='col-span-1'>
                        # 
                    </div>
                    <div className='col-span-3'>
                        Profesja
                    </div>
                    <div className='col-span-1'>
                    </div>
                    <div className='flex flex-row justify-between col-span-5'>
                        <div>
                            % przedziału
                        </div>
                        <div>
                            Ilość
                        </div>
                    </div>
                </div>
            {query.data.sortedProfs.map((d, i) => (
                <div key={ i } className={ `grid items-center grid-cols-10 py-2 ${ i === 5 ? '' : '' } ${ i % 2 === 0 ? '' : 'bg-dark-6/50' }` }>
                    <div className='grid items-center grid-cols-10 col-span-10 px-3'>
                        <div className='col-span-1 text-secondary'>
                            { i + 1 }  
                        </div>
                        <div className='col-span-1'>
                            { MARGONEM_CONSTS.PROFESSIONS[d.name as keyof typeof MARGONEM_CONSTS.PROFESSIONS].icon }
                        </div>
                        <div 
                            className='col-span-3 text-sm font-semibold lg:text-md'
                            style={{
                                color: MARGONEM_CONSTS.PROFESSIONS[d.name as keyof typeof MARGONEM_CONSTS.PROFESSIONS].color
                            }}
                        >
                            { d.name }
                        </div>
                        {/* <div className='col-span-1'>
                        </div> */}
                        <div className='col-span-5'>
                            <div className='flex flex-col w-full space-y-1'>
                                <div className='flex justify-between font-semibold'>
                                    <div className='flex items-center text-secondary'>
                                        { d.p.toFixed(2) }%
                                    </div>
                                    <div>
                                        { numberWithSpaces(d.q) }
                                    </div>
                                </div>
                                <div className='flex items-center justify-end w-full h-[4px] bg-gray-2/50 rounded'>
                                    <div
                                        className='flex h-[4px] rounded'
                                        style={
                                            {
                                                width: `${ d.p === 0 ? '0' : ((d.p / firstPlaceProf.p ) * 100) }%`,
                                                backgroundColor: MARGONEM_CONSTS.PROFESSIONS[d.name as keyof typeof MARGONEM_CONSTS.PROFESSIONS].color,
                                                animation: 'from0ToN 1s ease-in-out'
                                            }
                                        }
                                    >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className='grid grid-cols-10 col-span-4 p-3 grid-rows-10'>
            <div className='col-start-1 col-end-11 sm:col-start-2 row-span-9'>
                <form onSubmit={ handleSubmit } className='flex flex-col space-y-8'>
                        <div className='flex flex-col justify-between lg:flex-row'>
                            <div className='flex flex-col w-fit'>
                                <label htmlFor='minLvl' className='text-secondary'>Min</label> 
                                <div className='flex flex-row space-y-1 border rounded border-sky-500'>
                                    <div className='flex flex-row space-x-3'>
                                        <button onClick={ e => decrementMinLvl(e) } className='p-2 rotate-90'>
                                            <ArrowDownIcon />
                                        </button>
                                        <input id='minLvl' type='number' value={ minLvl } className='w-8 text-center bg-dark-6/90' onChange={ handleOnChangeMinLvl } />
                                        <button onClick={ e => incrementMinLvl(e) } className='p-2 -rotate-90'>
                                            <ArrowDownIcon />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col w-fit'>
                                <label htmlFor='maxLvl' className='text-secondary'>Max</label> 
                                <div className='flex flex-row space-x-3 border rounded border-sky-500'>
                                    <button onClick={ e => decrementMaxLvl(e) } className='p-2 rotate-90'>
                                        <ArrowDownIcon />
                                    </button>
                                    <input type='number' value={ maxLvl } className='w-8 text-center bg-dark-6/90' onChange={ handleOnChangeMaxLvl } />
                                    <button onClick={ e => incrementMaxLvl(e) } className='p-2 -rotate-90 '>
                                        <ArrowDownIcon />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* <label htmlFor='minLvl'>Min</label>
                        <input id='minLvl' className='w-16 px-3 rounded bg-dark-6/90' type='number' value={ minLvl } onChange={ handleOnChangeMinLvl } />
                        <label htmlFor='maxLvl'>Max</label>
                        <input id='maxLvl' className='w-16 px-3 rounded bg-dark-6/90' type='number' value={ maxLvl } onChange={ handleOnChangeMaxLvl } /> */}
                    <div className='flex flex-row justify-start space-x-1 sm:justify-between'>
                        <label htmlFor='oneLvl' className='text-secondary'>Wybierz jeden poziom</label>
                        <input id='oneLvl' className='w-16 px-3 border rounded border-sky-500 bg-dark-6/90' type='number' value={ oneLvl ? oneLvl : '' } onChange={ handleOnChangeOneLvl } />
                    </div>
                    <button type='submit' className='w-full h-10 border rounded text-sky-500 border-sky-500'>
                        Filtruj
                    </button>
                </form>
            </div>
        </div>
    </>
    )
}

const ProfsByLvl = ({ max, world, date } : { max: number, world: string, date: string }) => {

  return (
    <div className='flex flex-col grid-cols-12 lg:grid'>
        <ProfsChart max={ max } world={ world } date={ date } />
    </div>
  )
}

export default ProfsByLvl