import { FormEvent, useEffect, useReducer, useState } from 'react'
import { filterReducer, filterInitialState } from './CharactersFilter/reducerFilter'
import Filter from './CharactersFilter'
import { MARGONEM_CONSTS } from '../../constants/Margonem'
import CharactersList from './CharactersList' 
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import GroupList from './GroupsList'
import { ICharacter, TCharactersList } from './TeamBuilderTypes'
import SelectedGroup from './SelectedGroup'
import { selectedGroupInitialState, reducerSelectedGroup } from './SelectedGroup/reducerSelectedGroup'
import { getClan } from '../../api/teamBuilderAPI'
import { characterListInitialState, reducerCharacterList } from './CharactersList/reducerCharactersList'
import { groupsListInitialState, reducerGroupList } from './GroupsList/reducerGroupList'
import ArchiveIcon from '../../assets/svg/ArchiveIcon'
import RefundIcon from '../../assets/svg/RefundIcon'
import AddPersonIcon from '../../assets/svg/AddPersonIcon'
import DocumentAddIcon from '../../assets/svg/DocumentAddIcon'
import DocumentDownloadIcon from '../../assets/svg/DocumentDownloadIcon'
import EditGroup from './EditGroup'
import { editGroupInitialState, reducerEditGroup } from './EditGroup/reducerEditGroup'


export type TMode = 'creating' | 'editing'

const TeamBuilder = () => {

    const [filterState, filterDispatch] = useReducer(filterReducer, filterInitialState)
    const [groupsListState, groupsListDispatch] = useReducer(reducerGroupList, groupsListInitialState)
    const [selectedGroupState, selectedGroupDispatch] = useReducer(reducerSelectedGroup, selectedGroupInitialState)
    const [editGroupState, editGroupDispatch] = useReducer(reducerEditGroup, editGroupInitialState)
    const [charactersListState, charactersListDispatch] = useReducer(reducerCharacterList, characterListInitialState)

    const [modal, setModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [mode, setMode] = useState<TMode>('creating')
    const handleChangeMode = (mode: TMode) => {
        setMode(mode)
    }

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
    const [isClanCharsError, setIsClanCharsError] = useState(false)
    const [clanCharsMsg, setClanCharsMsg] = useState('')
    const fetchClanChars = async (e: FormEvent) => {
        setIsClanCharsError(false)
        setClanCharsMsg('')
        try {
            e.preventDefault()
            setIsLoading(true)
            const result = await getClan(clanLink)
            if (result?.status === 'Success' && result?.clanCharacters) {
                setClanLink('')
                setClanCharsMsg('Pobieranie postaci zako??czone.')
                charactersListDispatch({ type: 'ADD_CLAN_CHARACTERS', payload: result.clanCharacters })
            } else if (result?.status === 'Error') {
                setIsClanCharsError(true)
                if (result?.msg) {
                    setClanCharsMsg(result.msg)
                }
            } else {
                setIsClanCharsError(true)
                setClanCharsMsg('Nieprawid??owy odno??nik do strony klanowej.')
            }
        } catch (err) {
            console.log(err)
            setIsClanCharsError(true)
            setClanCharsMsg('Nieprawid??owy odno??nik do strony klanowej.')
        } finally {
            setIsLoading(false)
        }
    }

    const [charForm, setCharForm] = useState<ICharacter>({
        name: '',
        prof: 'Wojownik',
        lvl: 1,
        nUsed: 0
    })
    const handleSetCharForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, prof: string) => {
        e.preventDefault()
        setCharForm(prev => ({
            ...prev,
            prof: prof
        }))
    }

    const [isOwnCharError, setIsOwnCharError] = useState(false)
    const [ownCharMsg, setOwnCharMsg] = useState('')
    const createOwnCharacters = (e: FormEvent) => {
        setIsOwnCharError(false)
        setOwnCharMsg('')
        try {
            e.preventDefault()
            setIsLoading(true)
            if (charForm.name === '' || charForm.prof === '' || !charForm.lvl) return 
            if (charactersListState.charactersList?.some(char => char.name === charForm.name)) {
                setIsOwnCharError(true)
                setOwnCharMsg('Posta?? o takiej nazwie znajduje si?? ju?? na li??cie.')
                return
            }
            charactersListDispatch({ type: 'ADD_OWN_CHARACTERS', payload: [{ ...charForm }] })
            setOwnCharMsg('Dodano posta??.')
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
            setCharForm(prev => ({
                ...prev,
                name: '',
                lvl: 1
            }))
        }
    }

    const removeUsedCharacters = (groupName: string) => {
        const currentGroup = groupsListState.groupsList?.find(group => group.name === groupName)
        currentGroup?.slots?.forEach(slot => {
            charactersListState.charactersList?.forEach(char => {
                if (char.name === slot.character?.name && char.nUsed !== 0) char.nUsed--
            })
        })
    }

    useEffect(() => {
        let first = true
        const applyFilter = () => {
            if (charactersListState?.charactersList === null || charactersListState?.charactersList === undefined) {
                return
            }
            charactersListState.charactersList.forEach(char => {
                char.nUsed = 0
                groupsListState.groupsList?.forEach(group => {
                    group.slots.forEach(slot => {
                        if (slot.character?.name === char.name) {
                            char.nUsed += 1
                        }
                    })
                })
            })
            charactersListState.charactersList.sort((a, b) => {
                return a.prof.localeCompare(b.prof) || b.lvl - a.lvl
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

    }, [charactersListState.charactersList, groupsListState.groupsList])


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
        {popupRestore && 
            <div className='fixed top-[68px] left-0 right-0 h-8 bg-green-500 text-black text-center font-semibold text-md z-40'>
                Przywr??cono sesj?? kreatora dru??yny
            </div>
        }
        {popupSave && 
            <div className='fixed top-[68px] left-0 right-0 h-8 bg-green-500 text-black text-center font-semibold text-md z-40'>
                Sesja zapisana pomy??lnie
            </div>
        }
        <div className='flex flex-col items-center justify-center space-y-3 mt-12'>
            {modal &&
                <div className='fixed bottom-0 flex items-center justify-center left-0 right-0 top-0 backdrop-blur-sm z-[100]'>
                    <div className='relative flex flex-col items-center justify-center w-fit bg-dark-8/90 p-3 h-fit shadow-sm shadow-black/30 space-y-3'>
                        <button className='absolute top-0 right-2 text-2xl text-red-500' onClick={ () => { setModal(false); setClanCharsMsg(''); setIsOwnCharError(false) } }>
                            &times;
                        </button>
                        <div className='flex flex-row space-x-24'>
                            <form onSubmit={ fetchClanChars } className='text-secondary flex flex-col space-y-3 w-80 h-full justify-between'>
                                <div className={ `text-center text-xs text-secondary ${ isClanCharsError ? 'text-red-500' : 'text-green-500' }` }>
                                    { clanCharsMsg }
                                </div>
                                <label htmlFor='clanLink' className='font-semibold'>Podaj link do strony klanowej</label>
                                <input id='clanLink' type='text' value={ clanLink } onChange={ e => setClanLink(e.target.value) } className='text-white-1 px-3 bg-dark-6/50' />
                                <button disabled={ isLoading } type='submit' className={ `h-10 px-3 py-2 rounded-md border border-sky-500 w-full ${ isLoading && 'opacity-30' }` }>
                                    {isLoading 
                                    ? <span>Trwa pobieranie postaci...</span>
                                    : <span>Dodaj postacie z klanu</span>}
                                </button>
                            </form>
                            <form onSubmit={ createOwnCharacters } className='flex flex-col space-y-3 text-secondary w-80'>
                                <div className={ `text-center text-xs text-secondary ${ isOwnCharError ? 'text-red-500' : 'text-green-500' }` }>
                                    { ownCharMsg }
                                </div>
                                <label htmlFor='charNameInput'>Nazwa postaci</label>
                                <input id='charNameInput' type='text' value={ charForm.name } onChange={ e => setCharForm(prev => ({ ...prev, name: e.target.value })) } className='text-white-1 px-3 bg-dark-6/50' />
                                <label htmlFor='charLvlInput'>Poziom</label>
                                <input 
                                    id='charLvlInput' type='number' 
                                    value={ charForm.lvl } 
                                    onChange={ e => setCharForm(prev => ({ ...prev, lvl: parseInt(e.target.value) })) } 
                                    onFocus={ e => e.target.select() }
                                    className='text-white-1 px-3 bg-dark-6/50' 
                                />
                                <label htmlFor='charProfMenu'>Profesja</label>
                                <div id='charProfMenu' className='flex flex-row space-x-3'>
                                    {Object.values(MARGONEM_CONSTS.PROFESSIONS).map((prof, i) => (
                                        <button 
                                            type='button'
                                            key={ i }
                                            id={ prof.name }
                                            className={ `px-3 py-1 rounded-md border-dark-8/90 ${ charForm.prof !== prof.name && 'opacity-30' }` }
                                            onClick={ e => handleSetCharForm(e, prof.name) }
                                            style={{ backgroundImage: MARGONEM_CONSTS.PROFESSIONS[prof.name as keyof typeof MARGONEM_CONSTS.PROFESSIONS].gradient }}
                                        >
                                            <div>
                                                { MARGONEM_CONSTS.PROFESSIONS[prof.name].icon }
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <button disabled={ isLoading } type='submit' className={ `h-10 mt-12 px-3 py-2 rounded-md border border-sky-500 w-full ${ isLoading && 'opacity-30' }` }>Stw??rz posta??</button>
                            </form>
                        </div>
                    </div>
                </div>
            }
            <div className='flex flex-row items-center justify-evenly p-3 space-x-12 bg-dark-8/90 rounded-lg w-full drop-shadow-lg shadow-sm shadow-black/30'>
                <button
                    disabled={ true }
                    className='opacity-30 flex flex-row space-x-2 items-center px-3 py-1 rounded bg-dark-6/90 hover:text-sky-500 w-fit h-10 text-sm text-secondary drop-shadow-lg'
                >
                    <div className='line-through'>Wczytaj sesj?? z JSON</div>
                    <div><DocumentAddIcon /></div>
                </button>
                <button
                    disabled={ true }
                    className='opacity-30 flex flex-row space-x-2 items-center px-3 py-1 rounded bg-dark-6/90 hover:text-sky-500 w-fit h-10 text-sm text-secondary drop-shadow-lg'
                >
                    <div className='line-through'>Zapisz sesj?? jako JSON</div>
                    <div><DocumentDownloadIcon /></div>
                </button>
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
                    className='flex flex-row space-x-2 items-center px-3 py-1 rounded bg-dark-6/90 hover:text-sky-500 w-fit h-10 text-sm text-secondary drop-shadow-lg'
                >
                    <div>Przywr???? ostatni?? sesj??</div>
                    <div><RefundIcon /></div>
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
                    className='flex flex-row space-x-2 items-center px-3 py-1 rounded bg-dark-6/90 hover:text-sky-500 w-fit h-10 text-sm text-secondary drop-shadow-lg'
                >
                    <div>Zapisz sesj??</div>
                    <div><ArchiveIcon /></div>
                </button>
            </div>
            <div className='flex flex-row h-[75vh] space-x-3 w-full'>
                <div className='flex flex-col w-1/4 p-3 space-y-3 bg-dark-8/90 rounded-lg  drop-shadow-lg shadow-sm shadow-black/30'>
                    <Filter state={ filterState } dispatch={ filterDispatch } />
                    <button 
                        className='flex flex-row space-x-3 items-center justify-center text-secondary px-3 py-1 rounded bg-dark-6/90 hover:text-sky-500 drop-shadow-lg w-full h-10'
                        onClick={ () => setModal(true) }
                    >       
                        <div>Dodaj postacie</div>
                        <div><AddPersonIcon /></div>
                    </button>
                    <CharactersList chars={ filteredChars ?? null } />
                </div>
                <div className='flex flex-col w-2/5 p-3 bg-dark-8/90 rounded-lg  drop-shadow-lg shadow-sm shadow-black/30'>
                    <div className='flex flex-row w-full mb-12 space-x-3'>
                        <button 
                            onClick={ () => handleChangeMode('creating') }
                            className={ `py-1 hover:text-sky-500 text-secondary w-1/2 border border-sky-500 rounded-md ${ mode !== 'creating' && 'opacity-30' }` }
                        >Tworzenie</button>
                        <button 
                            onClick={ () => handleChangeMode('editing') }
                            className={ `py-1 hover:text-sky-500 text-secondary w-1/2 border border-sky-500 rounded-md ${ mode !== 'editing' && 'opacity-30' }` }
                        >Edytowanie</button>
                    </div>
                    <SelectedGroup 
                        isHidden={ mode !== 'creating' }
                        state={ selectedGroupState } 
                        dispatch={ selectedGroupDispatch } 
                        groupsListState={ groupsListState } 
                        groupsListDispatch={ groupsListDispatch } 
                    />
                    <EditGroup 
                        isHidden={ mode !== 'editing' }
                        state={ editGroupState.editGroup }
                        origin={ editGroupState.originGroup } 
                        dispatch={ editGroupDispatch }
                        groupsListState={ groupsListState }
                        groupsListDispatch={ groupsListDispatch }
                    />
                </div>
                <div className='flex flex-col w-[35%] p-3 bg-dark-8/90 rounded-lg  drop-shadow-lg shadow-sm shadow-black/30'>
                    <GroupList 
                        setMode={ setMode }
                        checkUsedCharacters={ removeUsedCharacters } 
                        groups={ groupsListState.groupsList ?? null } 
                        groupsListDispatch={ groupsListDispatch } 
                        selectedGroupDispatch={ selectedGroupDispatch }
                        editGroupDispatch={ editGroupDispatch }
                    />
                </div>
            </div>
        </div>
    </DndProvider>
  )
}

export default TeamBuilder
