import { Outlet } from "react-router-dom"

const Wrapper = () => {
  return (
    <main id='app__main' className='z-0 min-h-screen'>
        <div className='container min-h-screen p-3 pb-16 mx-auto mt-16'>
          <Outlet />
        </div>
    </main>
  )
}

export default Wrapper