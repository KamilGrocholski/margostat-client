import { useDrag } from 'react-dnd'
import { MARGONEM_CONSTS } from '../../../constants/Margonem'
import { ICharacter, TCharactersList } from '../TeamBuilderTypes'

const CharacterItem = (props: ICharacter) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "li",
        item: { 
            name: props.name, 
            prof: props.prof, 
            lvl: props.lvl,
            nUsed: props.nUsed
        },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      }))

    return (
        <li 
            ref={ drag }
            className={ `relative drop-shadow-lg flex flex-row justify-between space-x-3 font-semibold text-sm items-center cursor-grab bg-dark-6/50 px-2 py-1 ${ isDragging && 'border border-sky-500'}` }
        >
            <div className='flex flex-row space-x-3 w-full'>
                <div>
                    { MARGONEM_CONSTS.PROFESSIONS[props.prof as keyof typeof MARGONEM_CONSTS.PROFESSIONS].icon }
                </div>
                <div>
                    { props.lvl }
                </div>
                <div 
                    style={{ 
                        color: MARGONEM_CONSTS.PROFESSIONS[props.prof as keyof typeof MARGONEM_CONSTS.PROFESSIONS].color 
                    }}
                >
                    { props.name }
                </div>
            </div>
            <div className='text-red-500 text-secondary opacity-20'>
                { props.nUsed !== 0 && props.nUsed }    
            </div>
        </li>
    )
}

const CharactersList = ({ chars }: { chars: TCharactersList | null }) => {

  return (

        <div className='overflow-y-scroll h-full pr-3 overscroll-none'>
            <ul className='space-y-1 h-full'>
                {chars?.map((char, i) => (
                    <CharacterItem key={ char.name + i } {...char} />
                ))}
            </ul>
        </div>
  )
}

export default CharactersList