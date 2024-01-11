import {Link, NavLink, Navigate} from "react-router-dom"
import {CiLogout} from "react-icons/ci"
import {signOut} from "firebase/auth"
import {auth} from "../firebase/firebaseConfig"
import {toast} from "react-toastify"
import {useGlobalContext} from "../hooks/useGlobalContext"
import {IoIosAddCircleOutline} from "react-icons/io"
import {useState} from "react"

function Navbar() {
  const {user, dispatch} = useGlobalContext()
  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Signout succsessfuly")
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }

  return (
    <div className="navbar shadow-md bg-base-100">
      <div className="max-container flex justify-between">
        <div className="flex-1">
          <NavLink
            to="/"
            className="btn btn-primary text-xl max-[700px]:btn-sm"
          >
            daisyUI
          </NavLink>
        </div>
        <h1 className="items-center font-medium flex mr-2 max-[700px]:text-[14px] ml-[10px] p-1">
          Welcome, {user.displayName}
        </h1>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full max-[700px]:w-[35px]">
                <img
                  src={
                    user.photoURL
                      ? user.photoURL
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXSzsNsUvjSXUeqmShMTEVZ0M4JUMe3ChPvyISEZ-6Eg&s"
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <button
            onClick={logout}
            className="items-center flex btn btn-md ml-3 btn-error max-[700px]:btn-sm  max-[610px]:hidden"
          >
            Logout
          </button>
          <button
            onClick={logout}
            className="max-[610px]:block min-[611px]:hidden mr-[10px] "
          >
            <CiLogout />
          </button>
          <Link
            to="/create"
            className="items-center flex btn btn-md ml-3 btn-success max-[700px]:btn-sm max-[610px]:hidden"
          >
            Create
          </Link>
          <Link className="max-[610px]:block min-[611px]:hidden" to="/create">
            <IoIosAddCircleOutline />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
