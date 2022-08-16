import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import ArrowDownIcon from '../../../assets/svg/ArrowDownIcon'
import { MARGONEM_CONSTS } from '../../../constants/Margonem'

export const navItems = [
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
    }
]

const NavDesktop = () => {
    return (
        <nav className='h-full'>
            <ul className='md:flex hidden flex-row items-center h-full space-x-5'>
                {navItems.map((navItem, i) => {
                    if (navItem.dropdownItems) {
                        return <NavItemWithMenu key={ i } to={ navItem.to } label={ navItem.label } dropdownItems={ navItem.dropdownItems } />
                    }
                    if (!navItem.dropdownItems) {
                        return <NavItemNoMenu key={ i } to={ navItem.to } label={ navItem.label } />
                    }   
                    else return null
                })}
            </ul>
        </nav>
    )
}

interface ININMprops {
    label: string
    to: string
}
const NavItemNoMenu = (props: ININMprops) => {
    return (
        <li
            className='relative flex items-center h-full'
        >
            <NavLink
                className={ ({ isActive }) => {
                    return `
                        h-full items-center flex flex-row space-x-2 w-full px-3 font-semibold 
                        hover:text-sky-500 hover: border-sky-500
                        ${ isActive && 'border-b border-sky-500 text-sky-500' } 
                        ${ !isActive ? 'hover:text-lg' : 'text-lg' }
                        transition-all duration-400 delay-400 easy-in-out
                    `
                } }
                to={ props.to }
            >
                { props.label }
            </NavLink>
        </li>
    )
}

interface INIWMprops {
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
const NavItemWithMenu = (props: INIWMprops) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <li
            className='relative flex items-center h-full'
            onMouseEnter={ () => setIsOpen(true) }
            onMouseLeave={ () => setIsOpen(false) }
        >
            <NavLink
                onClick={ () => setIsOpen(false) }
                className={ ({ isActive }) => {
                    return `
                        h-full items-center flex flex-row space-x-2 w-full px-3 font-semibold
                        hover:text-sky-500 hover:border-sky-500 hover:text-lg
                        ${ isActive && 'border-b border-sky-500 text-sky-500 text-lg' } 
                        ${ !isActive && isOpen && 'text-lg text-sky-500' }
                        transition-all duration-400 delay-400 easy-in-out
                    `
                } }
                to={ props.to }
            >
                <div>
                    { props.label }
                </div>
                <div className={ `${ isOpen && '-rotate-180' } transition-all duration-400 delay-400 easy-in-out` }>
                    <ArrowDownIcon />
                </div>
            </NavLink>
            {
                isOpen &&
                    // <div className='container fixed left-0 right-0 px-3 py-1 mx-auto top-16'>
                    <div 
                        className='absolute py-1 top-16'
                        style={{
                            animation: 'fadeIn 0.2s ease-in-out'
                        }}
                    >
                        <div
                            className='flex flex-col flex-wrap bg-dark-7/95 border-b border-gray-1/10 px-8 h-[500px]'
                        >
                            {
                                props.dropdownItems.map((item, i) => (
                                    <div key={ i } className='w-56 mt-3'>
                                        <div
                                            className='px-3 py-1 mb-2 text-sm font-semibold bg-dark-6'
                                        >
                                            { item.label.toUpperCase() }
                                        </div>
                                        <ul className='flex flex-col justify-start items-left'>
                                            { item?.specialItem &&
                                            <li className='px-3 text-sm text-gray-1 hover:text-sky-500 font-semibold border-b border-gray-1 py-[1px]'>
                                                <Link 
                                                    to={ item.specialItem.to }
                                                    onClick={ () => setIsOpen(false) }
                                                >
                                                    { item.specialItem.label } 
                                                </Link>
                                            </li> }
                                            {item.items.map((link, i) => (
                                                <li key={ i } className='px-3 text-sm text-gray-1 hover:text-sky-500 font-semibold py-[1px]'>
                                                    <Link
                                                        onClick={ () => setIsOpen(false) }
                                                        to={ link.to }
                                                    >
                                                        { link.label }
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
            }
        </li>
    )
}

export default NavDesktop