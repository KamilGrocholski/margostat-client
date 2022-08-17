import React, { useEffect, useRef, useState } from 'react'
import Trending from '../../../../components/Trending'
import numberWithSpaces from '../../../../utils/numberWithSpaces'
import Section from '../Section'
import Box from '../Box'
import { useQuery } from '@tanstack/react-query'
import { getOneWorldByDate } from '../../../../api/statisticsAPI'
import Loader from '../../../../components/Loader'
import GlobeIcon from '../../../../assets/svg/GlobeIcon'
import ProfsByLvl from '../ProfsByLvl'
import { getDatesArray, getGlobalRanks } from '../../../../api/ranksApi'
import ProfsGain from '../ProfsGain'
import CharDistributionByLvl from '../CharDistributionByLvl'
import { MARGONEM_CONSTS } from '../../../../constants/Margonem'
import ArrowDownIcon from '../../../../assets/svg/ArrowDownIcon'
import WorldsRanksChart from '../WorldsRanksChart'
import { useWindowDimentions } from '../../../../hooks/useWindowDimentions'

const GeneralInfo = ({ description, value, percentage, rank, trending }: { description: string, value: number, percentage?: string, rank?: number, trending?: boolean }) => {
    return (
        <div className='flex flex-col space-y-3'>
            <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-row mr-3 space-x-2 text-2xl font-bold'>
                    {trending &&
                        <div className='flex items-center'>
                            <Trending iconSize={28} value={value} />
                        </div>}
                    <div>
                        <span>{numberWithSpaces(value)}</span>
                        {percentage &&
                            <span className='text-2xl text-secondary'>({parseInt(percentage).toFixed(2)}%)</span>}
                    </div>
                </div>
            </div>
            <div className='text-xs font-medium text-secondary'>
                {description.toUpperCase()}
            </div>
        </div>
    )
}

const GlobalStatistics = () => {

    const queryDate = useQuery(['datesArray'], () => getDatesArray())
    const [date, setDate] = useState(queryDate?.data?.datesArray[0] || 'Najnowsze')
    const query = useQuery(['globalStatistics', date], () => getOneWorldByDate({ world: 'Wszystkie', date: date }))
    const queryRanks = useQuery(['ranks', date], () => getGlobalRanks({ date: date }))

    const windowDimentions = useWindowDimentions()
    const dateButtonRef = useRef<HTMLButtonElement | null>(null)
    const [dateMenu, setDateMenu] = useState(false)
    const handleShowDateMenu = () => {
        setDateMenu(prev => !prev)
    }

    useEffect(() => {
        const handleEvent = (e: Event) => {
            if (dateButtonRef.current && !dateButtonRef.current.contains(e.target as Node)) {
                setDateMenu(false)
            }
        }

        if (windowDimentions?.width && windowDimentions?.width > 780) {
            document.addEventListener('mousedown', handleEvent, false)
        } else {
            document.addEventListener('touchstart', handleEvent, false)
        }
        return () => {
            if (windowDimentions?.width && windowDimentions?.width > 780) {
                document.removeEventListener('mousedown', handleEvent, false)
            } else {
                document.removeEventListener('touchstart', handleEvent, false)
            }
        }
    }, [dateMenu])

    const getFirstCreationTime = (arr: string[]) => {
        if (arr) {
            return arr[0].slice(0, 10)
        } else {
            return 'nie ma'
        }
    }

    const getLastCreationTime = (arr: string[]) => {
        if (arr) {
            return arr[arr.length - 1].slice(0, 10)
        } else {
            return 'nie ma'
        }
    }

    return (
        <>
            {query.isLoading || queryRanks.isLoading || queryDate.isLoading
                ? <div className='flex items-center justify-between w-full h-[90vh]'><div></div><Loader /><div></div></div>
                : query.isError || queryRanks.isError || queryDate.isError
                    ? <p>Error</p>
                    : !query.data || !queryRanks.data || !queryDate.data
                        ? <p>xd</p>
                        : (
                            <div className='flex flex-col grid-cols-12 gap-5 lg:grid'>
                                <div className='flex flex-col col-span-10 my-6 space-y-2'>
                                    <div className='text-4xl font-bold text-left'>
                                        <div className='flex flex-row'>
                                            <span className='flex items-center text-sky-500'><GlobeIcon /></span>
                                            {/* { 'Tempest' } */}
                                            {query.data.name}
                                            {/* { world ? world : 'Wszystkie' } */}
                                        </div>
                                    </div>
                                    <div>
                                        <span className='text-normal'>Dane z okresu <span className='text-secondary'>{getFirstCreationTime(query.data.creationTimesArray)}</span> do <span className='text-secondary'>{getLastCreationTime(query.data.creationTimesArray)}</span></span>
                                    </div>
                                </div>
                                <div className='flex flex-col items-center justify-start col-span-2 my-6 space-y-2 lg:items-end'>
                                    <div className='flex flex-col items-end space-y-3'>
                                        <div className='text-normal'>
                                            Statystyki z <span className='text-sm text-secondary'>{query.data.creationTime.slice(0, 10)}</span>
                                        </div>
                                        {
                                            windowDimentions?.width && windowDimentions?.width > 780 ?
                                                <button onMouseDown={handleShowDateMenu}  ref={dateButtonRef} className='relative px-6 py-1 font-semibold rounded-md bg-dark-7/90 hover:text-sky-500'>
                                                <div className='flex flex-row items-center justify-between space-x-3'>
                                                    <span>Wybierz datę</span>
                                                    <span
                                                        className={`${ dateMenu && '-rotate-180' } transition-all duration-100 easy-in`}
                                                    >
                                                        <ArrowDownIcon />
                                                    </span>
                                                </div>
                                                {
                                                    dateMenu && 
                                                        <div 
                                                            className={ `bg-dark-7/90 top-10 border-b border-gray-1/50 rounded-md text-secondary p-3 absolute right-0 w-full z-10 flex flex-col space-y-1` }
                                                            style={{
                                                                animation: 'fadeIn 0.1s ease-in'
                                                            }}
                                                        >
                                                        {queryDate.data?.datesArray.map((date, i) => (
                                                            <div 
                                                                key={ i }
                                                                id={ date }
                                                                onMouseDown={ e => setDate(e.currentTarget.id) }
                                                                className={ `hover:text-sky-500 hover:bg-dark-7/90 border-b border-gray-1/50` }
                                                            >
                                                                { date.slice(0, 10) }
                                                            </div>
                                                        ))}
                                                        </div>
                                                }
                                                </button>
                                            :
                                                <button onTouchStart={handleShowDateMenu}  ref={dateButtonRef} className='relative px-6 py-1 font-semibold rounded-md bg-dark-7/90 hover:text-sky-500'>
                                                <div className='flex flex-row items-center justify-between space-x-3'>
                                                    <span>Wybierz datę</span>
                                                    <span
                                                        className={`${ dateMenu && '-rotate-180' } transition-all duration-100 easy-in`}
                                                    >
                                                        <ArrowDownIcon />
                                                    </span>
                                                </div>
                                                {
                                                    dateMenu && 
                                                        <div 
                                                            className={ `bg-dark-7/90 top-10 border-b border-gray-1/50 rounded-md text-secondary p-3 absolute right-0 w-full z-10 flex flex-col space-y-1` }
                                                            style={{
                                                                animation: 'fadeIn 0.1s ease-in'
                                                            }}
                                                        >
                                                        {queryDate.data?.datesArray.map((date, i) => (
                                                            <div 
                                                                key={ i }
                                                                id={ date }
                                                                onTouchStart={ e => setDate(e.currentTarget.id) }
                                                                className={ `hover:text-sky-500 hover:bg-dark-7/90 border-b border-gray-1/50` }
                                                            >
                                                                { date.slice(0, 10) }
                                                            </div>
                                                        ))}
                                                        </div>
                                                }
                                            </button>
                                        }
                                    </div>
                                </div>
                                <div className='flex flex-col col-span-12 space-y-4'>
                                    <Section title='Informacje ogólne'>
                                        <Box gridSpan='col-span-3'>
                                            <GeneralInfo description='Ilość postaci' value={queryRanks.data.global.nCharacters.n} />
                                        </Box>
                                        <Box gridSpan='col-span-3'>
                                            <GeneralInfo
                                                description='Postacie - w ostatniej aktualizacji'
                                                value={queryRanks.data.global.nCharacters.gainFromLast}
                                                percentage={((queryRanks.data.global.nCharacters.gainFromLast / queryRanks.data.global.nCharacters.n) * 100).toString()}
                                                trending={true}
                                            />
                                        </Box>
                                        <Box gridSpan='col-span-3'>
                                            <GeneralInfo
                                                description='Przeciętny przyrost postaci'
                                                value={queryRanks.data.global.nCharacters.gainAvg}
                                                percentage={((queryRanks.data.global.nCharacters.gainAvg / queryRanks.data.global.nCharacters.n) * 100).toString()}
                                                trending={true}
                                            />
                                        </Box>
                                        <Box gridSpan='col-span-3'>
                                            <GeneralInfo description='Najwyższy poziom' value={query.data.maxLvl} />
                                        </Box>
                                    </Section>
                                </div>

                                <div className='flex flex-col col-span-9 space-y-4'>
                                    <Section title='Popularność profesji' mutedTitle='według przedziału'>
                                        <Box gridSpan='col-span-12'>
                                            <ProfsByLvl world={query.data.name} max={query.data.maxLvl} date={date} />
                                        </Box>
                                    </Section>
                                    <Section title='Ranking światów' mutedTitle='według ilości postaci'>
                                        <Box gridSpan='col-span-12'>
                                            <WorldsRanksChart worlds={queryRanks.data.worlds} />
                                        </Box>
                                    </Section>
                                    <Section title='Dystrybucja postaci' mutedTitle='według poziomu'>
                                        <Box gridSpan='col-span-12'>
                                            <CharDistributionByLvl prof={null} profsByLvl={query.data.profsByLvl} />
                                        </Box>
                                    </Section>
                                    <Section title='Dystrybucja wojowników' mutedTitle='według poziomu'>
                                        <Box gridSpan='col-span-12'>
                                            <CharDistributionByLvl prof={MARGONEM_CONSTS.PROFESSIONS['Wojownik'].name} profsByLvl={query.data.profsByLvl} />
                                        </Box>
                                    </Section>
                                    <Section title='Dystrybucja magów' mutedTitle='według poziomu'>
                                        <Box gridSpan='col-span-12'>
                                            <CharDistributionByLvl prof={MARGONEM_CONSTS.PROFESSIONS['Mag'].name} profsByLvl={query.data.profsByLvl} />
                                        </Box>
                                    </Section>
                                    <Section title='Dystrybucja paladynów' mutedTitle='według poziomu'>
                                        <Box gridSpan='col-span-12'>
                                            <CharDistributionByLvl prof={MARGONEM_CONSTS.PROFESSIONS['Paladyn'].name} profsByLvl={query.data.profsByLvl} />
                                        </Box>
                                    </Section>
                                    <Section title='Dystrybucja łowców' mutedTitle='według poziomu'>
                                        <Box gridSpan='col-span-12'>
                                            <CharDistributionByLvl prof={MARGONEM_CONSTS.PROFESSIONS['Łowca'].name} profsByLvl={query.data.profsByLvl} />
                                        </Box>
                                    </Section>
                                    <Section title='Dystrybucja tropicieli' mutedTitle='według poziomu'>
                                        <Box gridSpan='col-span-12'>
                                            <CharDistributionByLvl prof={MARGONEM_CONSTS.PROFESSIONS['Tropiciel'].name} profsByLvl={query.data.profsByLvl} />
                                        </Box>
                                    </Section>
                                    <Section title='Dystrybucja tancerzy ostrzy' mutedTitle='według poziomu'>
                                        <Box gridSpan='col-span-12'>
                                            <CharDistributionByLvl prof={MARGONEM_CONSTS.PROFESSIONS['Tancerz ostrzy'].name} profsByLvl={query.data.profsByLvl} />
                                        </Box>
                                    </Section>
                                </div>

                                <div className='flex flex-col col-span-3 space-y-4'>
                                    <Section title='Profesje' mutedTitle='w ostatniej aktualizacji'>
                                        <Box gridSpan='col-span-12'>
                                            <ProfsGain
                                                global={queryRanks.data.global}
                                                worlds={queryRanks.data.worlds}
                                                type={'last'}
                                            />
                                        </Box>
                                    </Section>
                                    <Section title='Profesje' mutedTitle='przeciętny przyrost'>
                                        <Box gridSpan='col-span-12'>
                                            <ProfsGain
                                                global={queryRanks.data.global}
                                                worlds={queryRanks.data.worlds}
                                                type={'avg'}
                                            />
                                        </Box>
                                    </Section>
                                    {/* <Section title='Postacie' mutedTitle='historia przyrostu'>
                    <Box gridSpan='col-span-12'>
                        <CharDistributionByLvl prof={ MARGONEM_CONSTS.PROFESSIONS['Tropiciel'].name } profsByLvl={ query.data.profsByLvl } />
                    </Box>
                </Section>
                <Section title='Wojownicy' mutedTitle='historia przyrostu'>
                    <Box gridSpan='col-span-12'>
                        <CharDistributionByLvl prof={ MARGONEM_CONSTS.PROFESSIONS['Tropiciel'].name } profsByLvl={ query.data.profsByLvl } />
                    </Box>
                </Section>
                <Section title='Magowie' mutedTitle='historia przyrostu'>
                    <Box gridSpan='col-span-12'>
                        <CharDistributionByLvl prof={ MARGONEM_CONSTS.PROFESSIONS['Tropiciel'].name } profsByLvl={ query.data.profsByLvl } />
                    </Box>
                </Section>
                <Section title='Paladyni' mutedTitle='historia przyrostu'>
                    <Box gridSpan='col-span-12'>
                        <CharDistributionByLvl prof={ MARGONEM_CONSTS.PROFESSIONS['Tropiciel'].name } profsByLvl={ query.data.profsByLvl } />
                    </Box>
                </Section>
                <Section title='Łowcy' mutedTitle='historia przyrostu'>
                    <Box gridSpan='col-span-12'>
                        <CharDistributionByLvl prof={ MARGONEM_CONSTS.PROFESSIONS['Tropiciel'].name } profsByLvl={ query.data.profsByLvl } />
                    </Box>
                </Section>
                <Section title='Tropiciele' mutedTitle='historia przyrostu'>
                    <Box gridSpan='col-span-12'>
                        <CharDistributionByLvl prof={ MARGONEM_CONSTS.PROFESSIONS['Tropiciel'].name } profsByLvl={ query.data.profsByLvl } />
                    </Box>
                </Section>
                <Section title='Tancerze ostrzy' mutedTitle='historia przyrostu'>
                    <Box gridSpan='col-span-12'>
                        <CharDistributionByLvl prof={ MARGONEM_CONSTS.PROFESSIONS['Tropiciel'].name } profsByLvl={ query.data.profsByLvl } />
                    </Box>
                </Section> */}
                                </div>
                            </div>
                        )
            }
        </>
    )
}

export default GlobalStatistics