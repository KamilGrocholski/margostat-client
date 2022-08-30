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
                <div className='flex flex-row w-full space-x-3'>
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
                <div className='text-red-500 text-secondary'>
                    { props.nUsed !== 0 && props.nUsed }    
                </div>
            </li>
    )
}

const CharactersList = ({ chars }: { chars: TCharactersList | null }) => {

  return (

        <div className='h-full pr-3 overflow-y-scroll overscroll-none'>
            <ul className='h-full space-y-1'>
                {chars?.map((char, i) => (
                    <CharacterItem key={ char.name + i } {...char} />
                ))}
            </ul>
        </div>
  )
}

export default CharactersList