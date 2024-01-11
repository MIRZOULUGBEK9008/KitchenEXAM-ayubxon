import {useGlobalContext} from "./useGlobalContext"
import {signInWithEmailAndPassword} from "firebase/auth"
import {auth} from "../firebase/firebaseConfig"
import {toast} from "react-toastify"

function useLogin() {
  const {dispatch} = useGlobalContext()
  const login = (email, password) => {
    dispatch({type: "IS_PANDING", payload: true})
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.success("Welcome come back")
        dispatch({type: "LOGIN", payload: userCredential.user})
        dispatch({type: "ERROR", error: null})
        dispatch({type: "IS_PANDING", payload: false})
      })
      .catch((error) => {
        toast.error(error)
        dispatch({type: "ERROR", error: error})
        dispatch({type: "IS_PANDING", payload: false})
      })
  }
  return {login}
}

export default useLogin
