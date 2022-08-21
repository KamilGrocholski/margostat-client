import { FormEvent, useEffect, useReducer, useState } from 'react'
import { filterReducer, filterInitialState } from './CharactersFilter/reducerFilter'
import Filter from './CharactersFilter'
import { MARGONEM_CONSTS } from '../../constants/Margonem'
import CharactersList from './CharactersList' 
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import GroupList from './GroupsList'
import { TCharactersList } from './TeamBuilderTypes'
import SelectedGroup from './SelectedGroup'
import { selectedGroupInitialState, reducerSelectedGroup } from './SelectedGroup/reducerSelectedGroup'
import { getClan } from '../../api/teamBuilderAPI'
import { characterListInitialState, reducerCharacterList } from './CharactersList/reducerCharactersList'
import { groupsListInitialState, reducerGroupList } from './GroupsList/reducerGroupList'
import ArchiveIcon from '../../assets/svg/ArchiveIcon'
import RefundIcon from '../../assets/svg/RefundIcon'


const TeamBuilder = () => {

    const [filterState, filterDispatch] = useReducer(filterReducer, filterInitialState)
    const [groupsListState, groupsListDispatch] = useReducer(reducerGroupList, groupsListInitialState)
    const [selectedGroupState, selectedGroupDispatch] = useReducer(reducerSelectedGroup, selectedGroupInitialState)
    const [charactersListState, charactersListDispatch] = useReducer(reducerCharacterList, characterListInitialState)
    
    const [modal, setModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [popupRestore, setPopupRestore] = useState(false)
    const [popupSave, setPopupSave] = useState(false)
    const handlePopups = (popup: string) =>  {
        if (popup === 'restore') {
            setPopupRestore(prev => !prev)
            setTimeout(() => {
                setPopupRestore(prev => !prev)        
            }, 3000)
        }
        if (popup === 'save') {
            setPopupSave(prev => !prev)
            setTimeout(() => {
                setPopupSave(prev => !prev)        
            }, 3000)
        }
    }

    const [clanLink, setClanLink] = useState('')

    const [filteredChars, setFilteredChars] = useState<TCharactersList | null>(null)
    
    const fetchClanChars = async (e: FormEvent) => {
        try {
            setIsLoading(true)
            e.preventDefault()
            const result = await getClan(clanLink)
            if (result?.clanCharacters) {
                charactersListDispatch({ type: 'ADD_CLAN_CHARACTERS', payload: result.clanCharacters })
            }
            console.log(result)
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }
    
    useEffect(() => {
        let first = true
        const applyFilter = () => {
            if (charactersListState?.charactersList === null || charactersListState?.charactersList === undefined) {
                console.log('brak')
                return
            }
            console.log(charactersListState.charactersList)
            charactersListState.charactersList.sort((a, b) => {
                return a.prof.localeCompare(b.prof)
            })
            setFilteredChars(charactersListState.charactersList.filter(char => {
                if (filterState?.name) {
                    return char.name.toLocaleLowerCase().indexOf(filterState.name.toLowerCase()) >= 0
                        && char.lvl >= filterState.minLvl
                        && char.lvl <= filterState.maxLvl
                        && filterState.profs[MARGONEM_CONSTS.PROFESSIONS[char.prof as keyof typeof MARGONEM_CONSTS.PROFESSIONS].name]
                } else {
                    return char.lvl >= filterState.minLvl
                        && char.lvl <= filterState.maxLvl
                        && filterState.profs[MARGONEM_CONSTS.PROFESSIONS[char.prof as keyof typeof MARGONEM_CONSTS.PROFESSIONS].name]
                }
            }))
        }
    
        if (first) {
            applyFilter()
        }


        return () => {
            first = false
        }

    }, [charactersListState.charactersList])

    useEffect(() => {
        let first = true
        const applyFilter = () => {
            if (!charactersListState?.charactersList) return
            setFilteredChars(charactersListState.charactersList.filter(char => {
                if (filterState?.name) {
                    return char.name.toLocaleLowerCase().indexOf(filterState.name.toLowerCase()) >= 0
                        && char.lvl >= filterState.minLvl
                        && char.lvl <= filterState.maxLvl
                        && filterState.profs[MARGONEM_CONSTS.PROFESSIONS[char.prof as keyof typeof MARGONEM_CONSTS.PROFESSIONS].name]
                } else {
                    return char.lvl >= filterState.minLvl
                        && char.lvl <= filterState.maxLvl
                        && filterState.profs[MARGONEM_CONSTS.PROFESSIONS[char.prof as keyof typeof MARGONEM_CONSTS.PROFESSIONS].name]
                }
            }))
        }
    
        if (first) {
            applyFilter()
        }

        return () => {
            first = false
        }

    }, [filterState])

  return (
    <DndProvider backend={HTML5Backend}>
        <div className='flex flex-col items-center justify-center space-y-3 mt-12'>
            {modal &&
                <div className='fixed bottom-0 flex items-center justify-center left-0 right-0 top-0 backdrop-blur-sm z-[100]'>
                    <div className='relative flex flex-col items-center justify-center w-1/4 bg-dark-8/90 p-3 h-1/3 shadow-sm shadow-black/30 space-y-3'>
                        <button className='absolute top-0 right-2 text-2xl text-red-500' onClick={ () => setModal(false) }>
                            &times;
                        </button>
                        <form onSubmit={ fetchClanChars } className='flex items-center justify-center flex-col space-y-3'>
                            <label className='font-semibold text-white-1'>Podaj link do strony klanowej</label>
                            <input type='text' value={ clanLink } onChange={ e => setClanLink(e.target.value) } className='text-white-1 px-3 bg-dark-6/50' />
                            <button disabled={ isLoading } type='submit' className={ `px-3 py-2 rounded-md border border-sky-500 w-full ${ isLoading && 'opacity-30' }` }>Dodaj postacie z klanu</button>
                        </form>
                    </div>
                </div>
            }
            <div className='flex flex-row items-center justify-end p-3 space-x-12 bg-dark-8/90 rounded-lg w-full drop-shadow-lg shadow-sm shadow-black/30'>
                <div>
                    Bez ładu, ani składu, nie ma po tym nawet śladu.
                </div>
                <button 
                    onClick={ () => {
                        const charsList = localStorage.getItem('teamBuilder__charactersList')
                        const selectGroup = localStorage.getItem('teamBuilder__selectedGroup')
                        const groupsList = localStorage.getItem('teamBuilder__groupsList')
                        if (charsList === null || selectGroup === null || groupsList === null) {
                            return 
                        } else {
                            charactersListDispatch({ type: 'GET_THE_LAST_SESSION', payload: (JSON.parse(localStorage.getItem('teamBuilder__charactersList') as string)).charactersList })
                            selectedGroupDispatch({ type: 'GET_THE_LAST_SESSION', payload: (JSON.parse(localStorage.getItem('teamBuilder__selectedGroup') as string)) })
                            groupsListDispatch({ type: 'GET_THE_LAST_SESSION', payload: (JSON.parse(localStorage.getItem('teamBuilder__groupsList') as string)).groupsList })
                            handlePopups('restore')
                        } 
                    } }
                    className='flex flex-row space-x-2 items-center px-3 py-1 border border-sky-500 rounded-md hover:bg-sky-500/50'
                >
                    <div>Przywróć ostatnią sesję</div>
                    <div className='text-gray-500'><RefundIcon /></div>
                    {popupRestore && 
                        <div className='fixed -top-12 left-0 right-0 h-8 bg-green-500 text-black text-center font-semibold text-md z-40'>
                            Przywrócono sesję kreatora drużyny
                        </div>
                    }
                </button>
                <button 
                    onClick={ () => {
                        if (!charactersListState || !selectedGroupState || !groupsListState) {
                            return 
                        } else {
                            localStorage.setItem('teamBuilder__charactersList', JSON.stringify(charactersListState))
                            localStorage.setItem('teamBuilder__selectedGroup', JSON.stringify(selectedGroupState))
                            localStorage.setItem('teamBuilder__groupsList', JSON.stringify(groupsListState))
                            handlePopups('save')
                        }
                    } }
                    className='flex flex-row space-x-2 items-center px-3 py-1 border border-sky-500 rounded-md hover:bg-sky-500/50'
                >
                    <div>Zapisz sesję</div>
                    <div className='text-gray-500'><ArchiveIcon /></div>
                    {popupSave && 
                        <div className='fixed -top-12 left-0 right-0 h-8 bg-green-500 text-black text-center font-semibold text-md z-40'>
                            Sesja zapisana pomyślnie
                        </div>
                    }
                </button>
            </div>
            <div className='flex flex-row h-[75vh] space-x-3 w-full'>
                <div className='flex flex-col w-1/4 p-3 space-y-3 bg-dark-8/90 rounded-lg  drop-shadow-lg shadow-sm shadow-black/30'>
                    <Filter state={ filterState } dispatch={ filterDispatch } />
                    <button 
                        className='px-3 py-1 rounded-lg drop-shadow-lg border border-sky-500 w-full h-10'
                        onClick={ () => setModal(true) }
                    >
                        Dodaj postacie
                    </button>
                    <CharactersList chars={ filteredChars ?? null } />
                </div>
                <div className='flex flex-col w-2/5 p-3 bg-dark-8/90 rounded-lg  drop-shadow-lg shadow-sm shadow-black/30'>
                    <button>Wyślij jako 'embed' na discorda!</button>
                    <SelectedGroup state={ selectedGroupState } dispatch={ selectedGroupDispatch } groupsListDispatch={ groupsListDispatch } />
                </div>
                <div className='flex flex-col grow p-3 bg-dark-8/90 rounded-lg  drop-shadow-lg shadow-sm shadow-black/30'>
                    <GroupList groups={ groupsListState.groupsList ?? null } groupsListDispatch={ groupsListDispatch } selectedGroupDispatch={ selectedGroupDispatch } />
                </div>
            </div>
        </div>
    </DndProvider>
  )
}

export default TeamBuilder
