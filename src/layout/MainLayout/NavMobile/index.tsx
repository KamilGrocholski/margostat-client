import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { MARGONEM_CONSTS } from '../../../constants/Margonem'
// import { navItems } from '../NavDesktop'

export const navItems = [
  {
    label: 'Strona główna',
    to: '/'
  },
  {
      label: 'Statystyki',
      to: '/statystyki',
      dropdownItems: [
          {
              label: 'Światy',
              specialItem: {
                  label: 'Wszystkie',
                  to: '/statystyki/swiaty'
              },
              items: MARGONEM_CONSTS.WORLDS.map((world) => {
                  return {
                      label: world,
                      to: `/statystyki/swiaty/${ world }`
                  }
              })
          }
      ]
  },
]

const NavMobile = () => {
  return (
    <nav className='fixed md:hidden block bottom-0 left-0 right-0 h-12 bg-black text-white'>
      <ul className='flex flex-row items-center justify-around p-3 w-full h-full'>
        {navItems.map((navItem, i) => {
          if (navItem.dropdownItems) {
            return <NavMobileItemWithMenu key={ i } to={ navItem.to } label={ navItem.label } dropdownItems={ navItem.dropdownItems } />
          }
          if (!navItem.dropdownItems) {
            return <NavMobileItemNoMenu key={ i } to={ navItem.to } label={ navItem.label } />
          }
          else return null
        })}
      </ul>
    </nav>
  )
}

interface NMIMprops {
  label: string
  to: string
}
const NavMobileItemNoMenu = (props: NMIMprops) => {
  return (
    <li className='h-full'>
      <NavLink
        to={ props.to }
        className={({isActive}) => {
          return `text-secondary h-full ${ isActive && 'border-b border-sky-500 text-sky-500' }`
        }}
      >
        { props.label }
      </NavLink>
    </li>
  )
}


interface NMIWMprops {
  label: string
  to: string
  dropdownItems: {
      label: string
      specialItem?: {
          label: string
          to: string
      },
      items: {
          label: string
          to: string
      }[]
  }[]
}

const NavMobileItemWithMenu = (props: NMIWMprops) => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let first = true
    const checkLoc = () => {
      if (first) {
        if (location.pathname.includes(props.to)) {
          setIsActive(true)
        } else {
          setIsActive(false)
        }
      }
    }

    checkLoc()

    return () => {
      first = false
    }
  }, [location, props.to])
  

  return (
    <li>
      <button
        onClick={ () => setIsOpen(prev => !prev) }
        // onTouchEnd={ () => setIsOpen(false) }
        className={
          `text-secondary ${ isActive && 'border-b border-sky-500 text-sky-500' }`
        }
      >
        { props.label }
      </button>
      {
        isOpen && 
          <div className='fixed z-30 top-16 p-3 bottom-12 flex flex-col items-center  left-0 right-0 bg-dark-7/90'>
            {props.dropdownItems.map((item, i) => (
              <div key={ i } className='w-full'>
                <div
                  className='flex justify-center w-full items-center bg-dark-6/90 p-3 text-xl font-semibold text-center'
                >
                  { item.label }
                </div>

                <ul className='flex flex-col items-center justify-center text-secondary text-md space-y-2'>
                  {item.specialItem && 
                    <li 
                      key={ i }
                      className='border-b border-gray-1'
                    >
                      <Link
                        onClick={ () => setIsOpen(false) }
                        to={ item.specialItem.to }
                        className='text-lg'
                      >
                        { item.specialItem.label }
                      </Link>
                    </li>
                  }
                  {item.items.map((item, i) => (
                    <li key={ i }>
                      <Link
                        onClick={ () => setIsOpen(false) }
                        to={ item.to }
                      >
                        { item.label }
                      </Link>
                    </li>
                  ))}
                </ul>

              </div>
            ))}
          </div>
      }
    </li>
  )
}
export default NavMobile