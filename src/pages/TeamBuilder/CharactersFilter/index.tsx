import React from 'react'
import { MARGONEM_CONSTS } from '../../../constants/Margonem'
import { IState } from './reducerFilter'

const Filter = ({ state, dispatch }: { state: IState, dispatch: any }) => {

    const handleOnChangeMinLvl = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value)
        dispatch({ type: 'changeMin', payload: value }) 
    }

    const handleOnChangeMaxLvl = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value)
        dispatch({ type: 'changeMax', payload: value })
    }

    const handleOnChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value
        dispatch({ type: 'changeName', payload: name })
    }

    const handleOnChangeProf = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        dispatch({ type: 'selectProf', payload: e.currentTarget.id })
    }

  return (
    <div className='flex flex-col space-y-3 h-fit font-semibold text-white-1 border-b-2 border-gray-1/30 pb-3'>
        <div className='flex flex-col space-y-1'>
            <label htmlFor='name' className='text-secondary'>Nazwa postaci</label>
            <input 
                id='name'
                type='text'
                value={ state.name ?? '' }
                onChange={ handleOnChangeName }
                className='bg-dark-6/50 px-3'
            />
        </div>
        <div className='flex flex-row w-full'>
            <div className='flex flex-col space-y-1 w-full'>
                <label htmlFor='minLvl' className='text-secondary'>Min</label>
                <input
                    id='minLvl'
                    type='number'
                    value={ state.minLvl }
                    onChange={ handleOnChangeMinLvl }
                    className='bg-dark-6/50 w-1/2 px-3'
                />
            </div>
            <div className='flex flex-col space-y-1 w-full'>
                <label htmlFor='maxLvl' className='text-secondary'>Max</label>
                <input
                    id='maxLvl'
                    type='number'
                    value={ state.maxLvl }
                    onChange={ handleOnChangeMaxLvl }
                    className='bg-dark-6/50 w-1/2 px-3'
                />
            </div>
        </div>
        <div>
            <div className='flex flex-row justify-between w-full'>
                {Object.entries(state.profs).map((prof, i) => (
                    <button
                        key={ i }
                        id={ prof[0] }
                        className={ `px-3 py-1 rounded-md border-dark-8/90 ${ !prof[1] && 'opacity-20' }` }
                        onMouseDown={ handleOnChangeProf }
                        style={{ backgroundImage: MARGONEM_CONSTS.PROFESSIONS[prof[0] as keyof typeof MARGONEM_CONSTS.PROFESSIONS].gradient }}
                    >
                        { MARGONEM_CONSTS.PROFESSIONS[prof[0] as keyof typeof MARGONEM_CONSTS.PROFESSIONS].icon}
                    </button>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Filter