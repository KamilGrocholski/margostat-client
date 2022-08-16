import Footer from "./Footer"
import Header from "./Header"
import NavMobile from "./NavMobile"
import Wrapper from "./Wrapper"

const MainLayout = () => {
  return (
    <div id='app__main'>
        <Header />
        <Wrapper />
        <NavMobile />
        <Footer />
    </div>
  )
}

export default MainLayout