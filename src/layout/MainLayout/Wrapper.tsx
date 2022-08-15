import { Outlet } from "react-router-dom"

const Wrapper = () => {
  return (
    <main id='app__main' className='min-h-screen z-0'>
        <div className='container min-h-screen p-3 mx-auto mt-16'>
          <Outlet />
        </div>
    </main>
  )
}

export default Wrapper