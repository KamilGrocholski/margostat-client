import React from 'react'

interface ISectionProps {
  children?: JSX.Element | JSX.Element[]
  title?: string
  mutedTitle?: string,
}

const Section = ({ children, title, mutedTitle }: ISectionProps) => {
  return (
    <section className='w-full space-y-4'>
        <header className='w-full flex flex-row justify-between items-center'>
            <div>
              <p className='text-xl subpixel-antialiased font-bold'>{ title } <span className='text-secondary'>{ mutedTitle }</span></p>
            </div>
        </header>
        <div className='grid grid-cols-12 gap-5'> 
          { children }
        </div>
    </section>
  )
}

export default Section