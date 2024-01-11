import {Outlet} from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function RootLayouts() {
  return (
    <>
      <Navbar />
      <main className="max-container grow">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default RootLayouts
