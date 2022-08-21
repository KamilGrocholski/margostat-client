import { useState } from 'react';
import { useDrop } from 'react-dnd';
import CheckIcon from '../../../assets/svg/CheckIcon';
import EditIcon from '../../../assets/svg/EditIcon';
import { MARGONEM_CONSTS } from '../../../constants/Margonem';
import { TActionGroupsList } from '../GroupsList/reducerGroupList';
import { ICharacter, IGroup } from '../TeamBuilderTypes';
import { TActionSelectedGroup } from './reducerSelectedGroup';

const SelectedGroupSlot = ({ dispatch, character, slotNumber }: { dispatch: React.Dispatch<TActionSelectedGroup>, character: ICharacter | null, slotNumber: number }) => {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "li",
        drop: (item: ICharacter) => dispatch({
            type: 'ADD_TO_SELECTED_GROUP',
            payload: {
                n: slotNumber,
                character: {
                    name: item.name,
                    prof: item.prof,
                    lvl: item.lvl
                }
            }
        }),
        collect: (monitor) => ({
          isOver: !!monitor.isOver(),
        }),
      }))

    return (
        <li
            ref={ drop }
            className='flex flex-row space-x-3 w-full font-semibold cursor-grab'
        > 
            <div className='text-secondary flex items-center w-6 italic'>
                { slotNumber }
            </div>
            <div
                className={ `flex flex-row space-x-3 bg-dark-6/50 h-8 px-3 w-full py-1 ${ isOver && 'border border-sky-500' }` }
            >
                <div className='flex flex-row space-x-3 items-center w-16'>
                    <div>
                        { character?.prof && MARGONEM_CONSTS.PROFESSIONS[character.prof as keyof typeof MARGONEM_CONSTS.PROFESSIONS].icon }
                    </div>
                    <div>
                        { character?.lvl }
                    </div>
                </div>
                <div
                    style={{
                        color: `${ character?.prof && MARGONEM_CONSTS.PROFESSIONS[character.prof as keyof typeof MARGONEM_CONSTS.PROFESSIONS].color }`
                    }}
                >
                    { character?.name }
                </div>
            </div>
            <button
                onClick={ () => dispatch({ type: 'REMOVE_ONE_FROM_SELECTED_GROUP', payload: { n: slotNumber } }) }
                className='text-red-500 text-xl text-center flex items-center h-full'
            >
                &times;
            </button>
        </li>
    )
}

const SelectedGroup = ({ state, dispatch, groupsListDispatch }: { state: IGroup, dispatch: React.Dispatch<TActionSelectedGroup>, groupsListDispatch: React.Dispatch<TActionGroupsList> }) => {

    const [isEditOpen, setIsEditOpen] = useState(false)
    const [name, setName] = useState(state.name ?? 'Nazwa grupy')

  return (
    <div className='flex flex-col space-y-28'>

        <div className='flex flex-row justify-evenly'>
            <button 
                className='rounded-md px-3 py-1 bg-green-500'
                onClick={ () => groupsListDispatch({ type: 'ADD_TO_GROUPS_LIST', payload: state }) }
            >
                Zapisz
            </button>
            <button 
                className='rounded-md px-3 py-1 bg-yellow-500'
                onClick={ () => dispatch({ type: 'RESET_SELECTED_GROUP' }) }
            >
                Resetuj
            </button>
        </div>

        <div className='flex flex-col space-y-3'>
            <div className='flex flex-row space-x-3 justify-center items-center h-[24px]'>
                {
                    isEditOpen
                        ? <input className='text-white bg-dark-8/90' value={ name } onChange={ e => setName(e.target.value) } />
                        : <div className='text-xl text-center font-semibold'>{ name }</div>
                }
                <button onClick={ () => setIsEditOpen(prev => !prev) }>
                    {isEditOpen
                        ? <div onClick={ () => dispatch({ type: 'CHANGE_NAME_OF_SELECTED_GROUP', payload: { name: name } }) }><CheckIcon /></div>
                        : <div className='text-gray-500'><EditIcon /></div>
                    }
                </button>
            </div>
            <ul className='space-y-1'>
                {state.slots.map((slot, i) => (
                    <SelectedGroupSlot 
                        key={ i }
                        dispatch={ dispatch }
                        slotNumber={ i + 1 }
                        character={ slot?.character }
                    />
                ))}
            </ul>
        </div>

    </div>
  )
}

export default SelectedGroup