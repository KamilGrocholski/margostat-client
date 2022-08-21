import EditIcon from '../../../assets/svg/EditIcon'
import XCircleIcon from '../../../assets/svg/XCircleIcon'
import { MARGONEM_CONSTS } from '../../../constants/Margonem'
import { TActionSelectedGroup } from '../SelectedGroup/reducerSelectedGroup'
import { IGroup, TGroupsList } from '../TeamBuilderTypes'
import { TActionGroupsList } from './reducerGroupList'
import { toPng } from 'html-to-image'
import { useRef, useCallback } from 'react'

interface IGroupProps extends IGroup {
    groupsListDispatch: React.Dispatch<TActionGroupsList>
    selectedGroupDispatch: React.Dispatch<TActionSelectedGroup>
}
const Group = (props: IGroupProps) => {
    return (
        <li className='bg-dark-7 rounded-md p-3 flex flex-col'>
            <div className='relative flex items-center justify-center font-semibold text-xl mb-3'>
                <button 
                    className='absolute -top-1 text-gray-500 left-0 dni'
                    onClick={ () => props.selectedGroupDispatch({ type: 'EDIT_GROUP_FROM_GROUPS_LIST', payload: { name: props.name, slots: props.slots } }) }
                >
                    <EditIcon />
                </button>
                <div>
                    { props.name }
                </div>
                <button 
                    className='absolute -top-1 text-red-500 right-0 dni'
                    onClick={ () => props.groupsListDispatch({ type: 'REMOVE_GROUP_FROM_GROUPS_LIST', payload: { name: props.name } }) }
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

const GroupList = ({ groups, groupsListDispatch, selectedGroupDispatch }: { groups: TGroupsList | null, groupsListDispatch: React.Dispatch<TActionGroupsList>, selectedGroupDispatch: React.Dispatch<TActionSelectedGroup> }) => {

    const ref = useRef<HTMLOListElement>(null)

    const handleHtmlToImage = useCallback(() => {
        if (ref.current === null) {
          return
        }
    
        toPng(ref.current, { cacheBust: true })
          .then((dataUrl) => {
            const link = document.createElement('a')
            link.download = 'lista-druzyn.png'
            link.href = dataUrl
            link.click()
          })
          .catch((err) => {
            console.log(err)
          })
      }, [ref])

  return (
    <div className='overflow-y-scroll pr-3 overscroll-none'>
        <button onClick={ handleHtmlToImage } className='px-3 py-1 text-center border border-sky-500 w-full mb-3'>Utwórzcie trochę grup i kliknijcie ten przycisk</button>
        <ul ref={ ref } className='flex flex-col space-y-5'>
            {groups?.map((group, i) => (
                <Group 
                    key={ i }
                    { ...group }
                    groupsListDispatch={ groupsListDispatch }
                    selectedGroupDispatch={ selectedGroupDispatch }
                />
            ))} 
        </ul>
    </div>
  )
}

export default GroupList