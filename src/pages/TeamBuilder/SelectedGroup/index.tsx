import { useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import CheckIcon from '../../../assets/svg/CheckIcon';
import EditIcon from '../../../assets/svg/EditIcon';
import { MARGONEM_CONSTS } from '../../../constants/Margonem';
import { IGroupsListState, TActionGroupsList } from '../GroupsList/reducerGroupList';
import { ICharacter, IGroup } from '../TeamBuilderTypes';
import { TActionSelectedGroup } from './reducerSelectedGroup';

const SelectedGroupSlot = (
    { 
        dispatch, 
        character, 
        slotNumber
    }: 
    { 
        dispatch: React.Dispatch<TActionSelectedGroup>, 
        character: ICharacter | null, 
        slotNumber: number
    }) => {
    
    const DragExchange = () => {
        const [{ isOver }, drop] = useDrop(() => ({
            accept: "div",
            drop: (item: { n: number }) => {
                dispatch({
                    type: 'EXCHANGE_INSIDE_SELECTED_GROUP',
                    payload: {
                        from: item.n,
                        to: slotNumber,
                    }
                })
            },
            collect: (monitor) => ({
              isOver: !!monitor.isOver(),
            }),
          }))

        return (
            <div 
                ref={ drop }
                className='flex flex-row w-full space-x-3 font-semibold cursor-grab'
            >
                <div className='flex items-center w-6 italic text-secondary'>
                    { slotNumber }
                </div>
                <div
                    className={ `flex flex-row space-x-3 bg-dark-6/50 h-8 px-3 w-full py-1 ${ isOver && 'border border-sky-500' }` }
                >
                    <div className='flex flex-row items-center w-16 space-x-3'>
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
                    onClick={ () => { dispatch({ type: 'REMOVE_ONE_FROM_SELECTED_GROUP', payload: { n: slotNumber } }); console.log(slotNumber) } }
                    className='flex items-center justify-center w-5 h-full text-xl text-center text-red-500'
                >
                    &times;
                </button>    
            </div>
        )
    }

    const [{ isDragging }, drag] = useDrag(() => (
        {
            type: "div",
            item: {
                n: slotNumber
            },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging()
            })
        }
    ))

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "li",
        drop: (item: ICharacter) => {
            dispatch({
                type: 'ADD_TO_SELECTED_GROUP',
                payload: {
                    n: slotNumber,
                    character: {
                        name: item.name,
                        prof: item.prof,
                        lvl: item.lvl,
                        nUsed: item.nUsed
                    }
                }
            })
        },
        collect: (monitor) => ({
          isOver: !!monitor.isOver(),
        }),
      }))
      
    return (
        <li
            ref={ drop }
            className={` w-full items-center flex ${ isOver && 'border border-sky-500' }`}
        > 
            <div 
                ref={ drag }
                className={ `flex flex-row items-center space-x-3 bg-dark-6/50 h-8 px-3 w-full py-1 ${ isDragging && 'border border-sky-500' }` }
            >
                <DragExchange />
            </div>
        </li>
    )
}

const SelectedGroup = (
    { 
        isHidden,
        state, 
        dispatch, 
        groupsListState, 
        groupsListDispatch 
    }: 
    { 
        isHidden: boolean,
        state: IGroup, 
        dispatch: React.Dispatch<TActionSelectedGroup>, 
        groupsListState: IGroupsListState, 
        groupsListDispatch: React.Dispatch<TActionGroupsList> 
    }) => {

    const [isErrorName, setIsErrorName] = useState(false)
    const [nameMsg, setNameMsg] = useState('')

    const handleAddToGroupsList = () => {
        setIsErrorName(false)
        setNameMsg('')
        console.log(state.slots)
        if (groupsListState.groupsList?.some(group => group.name === name)) {
            setIsErrorName(true)
            setNameMsg('Nazwa jest już zajęta.')
        } else {
            groupsListDispatch({ type: 'ADD_TO_GROUPS_LIST', payload: state })
        }
    }

    const [isEditOpen, setIsEditOpen] = useState(false)
    const [name, setName] = useState(state.name ?? 'Nazwa grupy')
    useEffect(() => {
        setName(state.name)
    }, [state.name])

  return (
    <div className={ `flex flex-col justify-around h-full ${ isHidden && 'hidden' }` }>

        <div className='flex flex-row justify-evenly'>
            <button 
                className='px-3 py-1 bg-green-500 rounded-md'
                onClick={ handleAddToGroupsList }
            >
                Utwórz grupę
            </button>
            <button 
                className='px-3 py-1 bg-yellow-500 rounded-md'
                onClick={ () => dispatch({ type: 'RESET_SELECTED_GROUP' }) }
            >
                Resetuj
            </button>
        </div>

        <div className='flex flex-col space-y-3'>
            <div className={ `text-secondary text-center h-6 ${ isErrorName ? 'text-red-500' : 'text-green-500' }` }>
                { nameMsg }
            </div>
            <div className='flex flex-row space-x-3 justify-center items-center h-[24px]'>
                {
                    isEditOpen
                        ? <input className='text-white bg-dark-8/90' value={ name } onChange={ e => { if (name.length <= 22) { setName(e.target.value) } } } />
                        : <div className='text-xl font-semibold text-center'>{ name }</div>
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