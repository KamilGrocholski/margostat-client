
import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDatesArray, getWorldRanks } from '../../../../api/ranksApi'
import { getOneWorldByDate } from '../../../../api/statisticsAPI'
import ArrowDownIcon from '../../../../assets/svg/ArrowDownIcon'
import GlobeIcon from '../../../../assets/svg/GlobeIcon'
import Loader from '../../../../components/Loader'
import Trending from '../../../../components/Trending'
import { MARGONEM_CONSTS } from '../../../../constants/Margonem'
import numberWithSpaces from '../../../../utils/numberWithSpaces'
import Box from '../Box'
import CharDistributionByLvl from '../CharDistributionByLvl'
import ProfsByLvl from '../ProfsByLvl'
import ProfsGain from '../ProfsGain'
import Section from '../Section'

const GeneralInfo = ({ description, value, percentage, rank, trending }: { description: string, value: number, percentage?: string, rank?: number, trending: boolean }) => {
    return (
        <div className='flex flex-col space-y-3'>
            <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-row mr-3 space-x-2 text-2xl font-bold'>
                    {trending && 
                    <div className='flex items-center'>
                        <Trending iconSize={ 28 } value={ value } />
                    </div>}
                    <div>
                        <span>{ numberWithSpaces(value) }</span>
                        {percentage &&
                        <span className='text-2xl text-secondary'>({ parseInt(percentage).toFixed(2) }%)</span>}
                    </div>
                </div>
                {rank &&
                    <div className='text-3xl italic text-opacity-25 text-secondary'>
                        #{ rank }
                    </div>}
            </div>
            <div className='text-xs font-medium text-secondary'>
                { description.toUpperCase() }
            </div>
        </div>
    )
}

const WorldStatistics = () => {

    const { world } = useParams()
    const queryDate = useQuery(['datesArray', world], () => getDatesArray())
    const [date, setDate] = useState(queryDate?.data?.datesArray[0] || 'Najnowsze')

    const query = useQuery(['worldStatistics', { world, date }], () => getOneWorldByDate({ world: world ? world : 'Wszystkie', date }))
    const queryRanks = useQuery(['ranks', { world, date }], () => getWorldRanks({ world: world ?? 'Tempest', date: date }))

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

        document.addEventListener('click', handleEvent, true)

        return () => document.removeEventListener('click', handleEvent, true)
    }, [dateButtonRef])
    

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
        {query.isLoading ||  queryRanks.isLoading
        ? <div className='flex items-center justify-between w-full h-[90vh]'><div></div><Loader /><div></div></div>
        : query.isError || queryRanks.isError
        ? <p>Error</p>
        : !query.data || !queryRanks.data
        ? <p>xd</p>
        : (
        <div className='flex flex-col grid-cols-12 gap-5 lg:grid'>

            <div className='flex flex-col col-span-10 my-6 space-y-2'>
                <div className='text-4xl font-bold text-left'>
                    <div className='flex flex-row'>
                        <span className='flex items-center text-sky-500'><GlobeIcon /></span>
                        {/* { 'Tempest' } */}
                        { query.data.name }
                        {/* { world ? world : 'Wszystkie' } */}
                    </div>
                </div>
                <div>
                    <span className='text-normal'>Dane z okresu od <span className='text-secondary'>{ getFirstCreationTime(query.data.creationTimesArray) }</span> do <span className='text-secondary'>{ getLastCreationTime(query.data.creationTimesArray) }</span></span>
                </div>
            </div>

            <div className='flex flex-col items-center justify-start col-span-2 my-6 space-y-2 lg:items-end'>
                <div className='flex flex-col items-end space-y-3'>
                    <div className='text-normal'>
                        Statystyki z <span className='text-sm text-secondary'>{ query.data.creationTime.slice(0, 10) }</span>
                    </div>
                        <button onClick={ handleShowDateMenu } ref={ dateButtonRef } className='relative px-6 py-1 font-semibold rounded-md bg-dark-7/90 hover:text-sky-500'>
                            <div className='flex flex-row items-center justify-between space-x-3'>
                                <span>Wybierz datę</span>
                                <span
                                    className={ `${ dateMenu && '-rotate-180' } transition-all duration-400 delay-400 easy-in-out` }
                                >
                                    <ArrowDownIcon/>
                                </span>
                            </div>
                            <div 
                                className={ `bg-dark-7/90 top-10 border-b border-gray-1/50 rounded-md text-secondary p-3 absolute right-0 w-full z-10 flex flex-col space-y-1 ${ !dateMenu && 'hidden' }` }
                                style={{
                                    animation: 'fadeIn 0.1s ease-in'
                                }}
                            >
                                    {queryDate.data?.datesArray.map((date, i) => (
                                        <div 
                                            key={ i }
                                            id={ date }
                                            onClick={ e => setDate(e.currentTarget.id) }
                                            className={ `hover:text-sky-500 hover:bg-dark-7/90 ${ i % 2 !== 0 && 'bg-dark-6/90' }` }
                                        >
                                            { date.slice(0, 10) }
                                        </div>
                                    ))}
                            </div>
                        </button>
                </div>
            </div>

            <div className='flex flex-col col-span-12 space-y-4'>
                <Section title='Informacje ogólne'>
                    <Box gridSpan='col-span-3'>
                        <GeneralInfo  
                            description='Ilość postaci' 
                            value={ queryRanks.data.selectedWorld.nCharacters.n } 
                            rank={ queryRanks.data.nCharactersRank_n } 
                            trending={ false } 
                        />
                    </Box>
                    <Box gridSpan='col-span-3'>
                        <GeneralInfo  
                            description='Postacie - w ostatniej aktualizacji' 
                            value={ queryRanks.data.selectedWorld.nCharacters.gainFromLast } 
                            percentage={ ((queryRanks.data.selectedWorld.nCharacters.gainFromLast / queryRanks.data.selectedWorld.nCharacters.n) * 100).toString() } 
                            rank={ queryRanks.data.nCharactersRank_gainLast } 
                            trending={ true } 
                        />
                    </Box>
                    <Box gridSpan='col-span-3'>
                        <GeneralInfo  
                            description='Przeciętny przyrost postaci' 
                            value={ queryRanks.data.selectedWorld.nCharacters.gainAvg } 
                            percentage={ ((queryRanks.data.selectedWorld.nCharacters.gainAvg / queryRanks.data.selectedWorld.nCharacters.n) * 100).toString() } 
                            rank={ queryRanks.data.nCharactersRank_gainAvg } 
                            trending={ true } 
                        />
                    </Box>
                    <Box gridSpan='col-span-3'>
                        <GeneralInfo 
                            description='Najwyższy poziom' 
                            value={ query.data.maxLvl } 
                            rank={ queryRanks.data.maxLvlRank }
                            trending={ false } 
                        />
                    </Box>
                </Section>
            </div>

            <div className='flex flex-col col-span-9 space-y-4'>
                <Section title='Popularność profesji' mutedTitle='według przedziału'>
                    <Box gridSpan='col-span-12'>
                        <ProfsByLvl world={ query.data.name } max={ query.data.maxLvl } date={ date } />
                    </Box>
                </Section>
                <Section title='Dystrybucja postaci' mutedTitle='według poziomu'>
                    <Box gridSpan='col-span-12'>
                        <CharDistributionByLvl prof={ null } profsByLvl={ query.data.profsByLvl } />
                    </Box>
                </Section>
                <Section title='Dystrybucja wojowników' mutedTitle='według poziomu'>
                    <Box gridSpan='col-span-12'>
                        <CharDistributionByLvl prof={ MARGONEM_CONSTS.PROFESSIONS['Wojownik'].name } profsByLvl={ query.data.profsByLvl } />
                    </Box>
                </Section>
                <Section title='Dystrybucja magów' mutedTitle='według poziomu'>
                    <Box gridSpan='col-span-12'>
                        <CharDistributionByLvl prof={ MARGONEM_CONSTS.PROFESSIONS['Mag'].name } profsByLvl={ query.data.profsByLvl } />
                    </Box>
                </Section>
                <Section title='Dystrybucja paladynów' mutedTitle='według poziomu'>
                    <Box gridSpan='col-span-12'>
                        <CharDistributionByLvl prof={ MARGONEM_CONSTS.PROFESSIONS['Paladyn'].name } profsByLvl={ query.data.profsByLvl } />
                    </Box>
                </Section>
                <Section title='Dystrybucja łowców' mutedTitle='według poziomu'>
                    <Box gridSpan='col-span-12'>
                        <CharDistributionByLvl prof={ MARGONEM_CONSTS.PROFESSIONS['Łowca'].name } profsByLvl={ query.data.profsByLvl } />
                    </Box>
                </Section>
                <Section title='Dystrybucja tropicieli' mutedTitle='według poziomu'>
                    <Box gridSpan='col-span-12'>
                        <CharDistributionByLvl prof={ MARGONEM_CONSTS.PROFESSIONS['Tropiciel'].name } profsByLvl={ query.data.profsByLvl } />
                    </Box>
                </Section>
                <Section title='Dystrybucja tancerzy ostrzy' mutedTitle='według poziomu'>
                    <Box gridSpan='col-span-12'>
                        <CharDistributionByLvl prof={ MARGONEM_CONSTS.PROFESSIONS['Tancerz ostrzy'].name } profsByLvl={ query.data.profsByLvl } />
                    </Box>
                </Section>
            </div>

            <div className='flex flex-col col-span-3 space-y-4'>
                <Section title='Profesje' mutedTitle='w ostatniej aktualizacji'>
                    <Box gridSpan='col-span-12'>
                        <ProfsGain global={ queryRanks.data.global } worlds={ queryRanks.data.worlds } type={ 'last' } />
                    </Box>
                </Section>
                <Section title='Profesje' mutedTitle='przeciętny przyrost'>
                    <Box gridSpan='col-span-12'>
                        <ProfsGain global={ queryRanks.data.global } worlds={ queryRanks.data.worlds } type={ 'avg' } />
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
        )}
    </>
  )
}

export default WorldStatistics