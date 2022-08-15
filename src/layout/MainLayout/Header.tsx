import { Link } from "react-router-dom"
import NavDesktop from "./NavDesktop/index"

const Header = () => {
  return (
    <header className='fixed top-0 left-0 right-0 h-16 bg-dark-7 z-50 flex items-center shadow-md shadow-black/40'>
        <div className='flex flex-row items-center container mx-auto space-x-12 h-full px-3'>
            <Link to='/'>
                <span className='text-3xl font-semibold'>Margo</span><span className='text-sky-500 text-3xl font-bold'>Stat</span>
            </Link>
            <NavDesktop />
        </div>
    </header>
  )
}

export default Header