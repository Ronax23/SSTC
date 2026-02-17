import { Outlet} from 'react-router-dom'
import Footer from '../assets/Reusable/Footer'
import { Dataprovider } from '../context/Context'
import ScrollToTop from '../assets/Reusable/ScrollToTop'
import Nav from '../assets/Reusable/Nav'
function MainPage() {
  return (
   <>
  <Dataprovider>
    <ScrollToTop/>
    <Nav />
  <section>
    <Outlet />
   </section>
   <Footer/>
   </Dataprovider>
   </>
  )
}

export default MainPage