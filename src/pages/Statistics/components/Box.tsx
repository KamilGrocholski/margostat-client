import React from 'react'

interface IBoxProps {
    children: JSX.Element | JSX.Element[]
    gridSpan?: string
}

const Box = ({ children, gridSpan }: IBoxProps) => {
  return (
    <div className={ `bg-dark-8/90 rounded-lg  drop-shadow-lg shadow-sm shadow-black/30 ${ gridSpan }` }>
        <div className='p-3'> 
            { children }
        </div>
    </div>
  )
}

export default Box