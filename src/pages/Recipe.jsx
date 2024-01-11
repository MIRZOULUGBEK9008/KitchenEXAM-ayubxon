import {Link, useParams} from "react-router-dom"
import {useGetARecipe} from "../hooks/useGetARecipe"
import {toast} from "react-toastify"
import {useEffect, useState} from "react"
import Navbar from "../components/Navbar"
import Loader from "../components/Loader"

function Recipe() {
  const [recipe, setRecipe] = useState(null)
  const {id} = useParams()
  const {getRecipe} = useGetARecipe()

  useEffect(() => {
    getRecipe("recipes", id)
      .then((data) => setRecipe(data))
      .catch((error) => toast.error(error))
  }, [])

  return (
    <div>
      <Navbar />
      <main className="max-container">
        {!recipe && (
          <div className="flex justify-center items-center h-full mt-[300px]">
            <h1 className="text-[30px] font-bold">Loading...</h1>
            <span className="loading loading-spinner loading-lg "></span>
          </div>
        )}
        {recipe && (
          <div className="mt-[30px] p-5 bg-[#fff] rounded-[14px] shadow-2xl max-container h-auto p-[15px">
            <img
              className="w-[475px] h-[470px] rounded-[12px] max-lg:w-[300px] max-lg:h-64  hidden max-lg:block max-lg:mx-auto"
              src={recipe.imagesUrl[0]}
              alt=""
            />
            <div className="flex max-lg:justify-center">
              <img
                className="w-[475px] h-[470px] bg-slate-600 rounded-[12px] max-lg:hidden"
                src={recipe.imagesUrl[0]}
                alt=""
              />
              <div className="block">
                <h1 className="text-[50px] sm:ml-6 font-bold max-sm:text-[25px]">
                  {recipe.title}
                </h1>
                <p className="font-bold text-[18px] sm:ml-6 mt-6 sm:text-[15px]">
                  Ingredients:{" "}
                  {recipe.ingredientss.map((ing, index, ingArray) => {
                    return (
                      <span className="font-sans text-slate-500 ">
                        {ing}
                        {index === ingArray.length - 1 ? "." : ", "}
                      </span>
                    )
                  })}
                </p>
                <p className="font-bold text-[18px] sm:ml-6 mt-6 sm:text-[15px] max-sm:text-[15px]">
                  Method:
                  <span className="text-slate-500"> {recipe.method}</span>
                </p>
                <p className="font-bold text-[18px] sm:ml-6 mt-6 sm:text-[15px] max-sm:text-[15px]">
                  Cooking Time:{" "}
                  <span className="text-slate-500">
                    {recipe.cookingTime + " minutes"}
                  </span>
                </p>
              </div>
              <Link to="/" className="btn btn-primary self-end ml-auto ">
                Home
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Recipe
