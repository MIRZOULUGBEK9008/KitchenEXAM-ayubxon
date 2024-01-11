import {deleteDoc, doc} from "firebase/firestore"
import {toast} from "react-toastify"
import {db} from "../firebase/firebaseConfig"
import {useState} from "react"
function useDeletedRecipe() {
  const [loading, setLoading] = useState(false)
  const deleteRecipe = async (col, id) => {
    setLoading(true)
    await deleteDoc(doc(db, col, id))
    toast.success("You deleted this Recipe")
    setLoading(false)
  }
  return {deleteRecipe, loading}
}

export {useDeletedRecipe}
