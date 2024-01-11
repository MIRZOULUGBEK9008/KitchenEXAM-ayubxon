import {useGlobalContext} from "./useGlobalContext"
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth"
import {GoogleProvider, auth} from "../firebase/firebaseConfig"
import {toast} from "react-toastify"

export function useSignup() {
  const {dispatch} = useGlobalContext()

  const signup = (displayName, email, password) => {
    dispatch({type: "IS_PANDING", payload: true})
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await updateProfile(auth.currentUser, {
          displayName,
        })
        toast.success("Welcome")
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

  const signUpWithGoogleProvider = () => {
    dispatch({type: "IS_PANDING", payload: true})
    signInWithPopup(auth, GoogleProvider)
      .then((result) => {
        GoogleAuthProvider.credentialFromResult(result)
        const user = result.user
        toast.success("Welcome Back")
        dispatch({type: "LOGIN", payload: user})
        dispatch({type: "IS_PANDING", payload: false})
      })
      .catch((error) => {
        const errorMessage = error.message
        toast.error(errorMessage)
        dispatch({type: "IS_PANDING", payload: false})
        dispatch({type: "ERROR", payload: errorMessage})
      })
  }
  return {signUpWithGoogleProvider, signup}
}
