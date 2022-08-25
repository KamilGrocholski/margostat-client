import XCircleIcon from '../../../assets/svg/XCircleIcon'
import { MARGONEM_CONSTS } from '../../../constants/Margonem'
import { TActionSelectedGroup } from '../SelectedGroup/reducerSelectedGroup'
import { IGroup, TGroupsList } from '../TeamBuilderTypes'
import { TActionGroupsList } from './reducerGroupList'
import { toPng } from 'html-to-image'
import { useRef, useCallback } from 'react'
import DownloadIcon from '../../../assets/svg/DownloadIcon'
import CopyIcon from '../../../assets/svg/CopyIcon'

interface IGroupProps extends IGroup {
    groupsListDispatch: React.Dispatch<TActionGroupsList>
    selectedGroupDispatch: React.Dispatch<TActionSelectedGroup>
    checkUsedCharacters: (name: string) => void
}
const Group = (props: IGroupProps) => {

    const refGroup = useRef<HTMLLIElement>(null)

    const handleHtmlToImage = useCallback(() => {
        if (refGroup.current === null) {
          return
        }

        toPng(refGroup.current, { cacheBust: true })
        .then((dataUrl) => {
            const link = document.createElement('a')
            link.download = `${ props.name } (${ new Date().toISOString().slice(0, 10) }).png`
            link.href = dataUrl
            link.click()
          })
          .catch((err) => {
            console.log(err)
          })
      }, [refGroup])

    return (
        <li    
            ref={ refGroup }
            className='bg-dark-7 rounded-md p-3 flex flex-col drop-shadow-lg border border-dark-6/90 w-full'
        >
            <div className='relative flex items-center justify-center font-semibold text-xl mb-3'>
                <button 
                    className='absolute -top-1 text-gray-500 left-0 dni'
                    onClick={ () => props.selectedGroupDispatch({ type: 'EDIT_GROUP_FROM_GROUPS_LIST', payload: { name: props.name, slots: props.slots } }) }
                >
                    <CopyIcon />
                </button>
                <button
                    className='absolute -top-1 text-gray-500 left-10 dni'
                    onClick={ handleHtmlToImage }
                >
                    <DownloadIcon />
                </button>
                <div className='mt-4'>
                    { props.name }
                </div>
                <button 
                    className='absolute -top-1 text-red-500 right-0 dni'
                    onClick={ () => { props.groupsListDispatch({ type: 'REMOVE_GROUP_FROM_GROUPS_LIST', payload: { name: props.name } }); props.checkUsedCharacters(props.name) } }
                >
                    <XCircleIcon />
                </button>
            </div>
            <ul className='flex flex-col space-y-1'>
                {props.slots.map((slot, i) => (
                    <li 
                        key={ i }
                        className={ `items-center font-semibold h-6 flex flex-row space-x-3 px-3 ${ i % 2 !== 0 && 'bg-dark-6/50' }` }
                    >
                        <div className='text-secondary italic w-6'>
                            { slot.n + 1 }
                        </div>
                        <div className='flex flex-row w-16 items-center space-x-3'>
                            <div>
                                { slot.character?.prof && MARGONEM_CONSTS.PROFESSIONS[slot.character.prof as keyof typeof MARGONEM_CONSTS.PROFESSIONS].icon }
                            </div>
                            <div>
                                { slot.character?.lvl }
                            </div>
                        </div>
                        <div
                            style={{
                                color: `${ slot.character?.prof && MARGONEM_CONSTS.PROFESSIONS[slot.character.prof as keyof typeof MARGONEM_CONSTS.PROFESSIONS].color }`
                            }}
                        >
                            { slot.character?.name }
                        </div>
                    </li>
                ))}
            </ul>
        </li>
    )
}

const GroupList = ({ checkUsedCharacters, groups, groupsListDispatch, selectedGroupDispatch }: { checkUsedCharacters: (name: string) => void, groups: TGroupsList | null, groupsListDispatch: React.Dispatch<TActionGroupsList>, selectedGroupDispatch: React.Dispatch<TActionSelectedGroup> }) => {

    const ref = useRef<HTMLOListElement>(null)

    const handleHtmlToImage = useCallback(() => {
        if (ref.current === null) {
          return
        }

        toPng(ref.current, { cacheBust: true })
        .then((dataUrl) => {
            const link = document.createElement('a')
            link.download = `lista druzyn (${ new Date().toISOString().slice(0, 10) }).png`
            link.href = dataUrl
            link.click()
          })
          .catch((err) => {
            console.log(err)
          })
      }, [ref])

  return (
    <div className='pr-3 h-full flex flex-col space-y-3'>
        <button 
            onClick={ handleHtmlToImage } 
            className='flex flex-row space-x-1 hover:text-sky-500 bg-dark-6 items-center drop-shadow-lg rounded h-10 px-3 w-fit py-1 text-center text-secondary'
        >
            <div>Pobierz listę jako obraz</div>
            <div><DownloadIcon /></div>
        </button>
        <div className='overflow-y-scroll overscroll-none h-full'>
            <ul ref={ ref } className='flex flex-col space-y-5 pr-3'>
                {groups?.map((group, i) => (
                    <Group 
                        key={ i }
                        { ...group }
                        groupsListDispatch={ groupsListDispatch }
                        selectedGroupDispatch={ selectedGroupDispatch }
                        checkUsedCharacters={ checkUsedCharacters }
                    />
                ))} 
            </ul>
        </div>
    </div>
  )
}

export default GroupList