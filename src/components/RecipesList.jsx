import {FaClock} from "react-icons/fa6"
import {useDeletedRecipe} from "../hooks/useDeletedRecipe"
import {Link} from "react-router-dom"
import Loader from "./Loader"
import {isPassed24Hours} from "../utils/isPassed24Hours"

function RecipesList({recipes}) {
  const {deleteRecipe, loading} = useDeletedRecipe()
  return (
    <div className="block w-max mx-auto">
      <h1 className="text-[40px] mb-6">All Recipes:</h1>

      <div className="grid gap-4  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 max-[639px]:w-[350px] 2xl:w-[1000px] lg:w-[950px] sm:w-[600px] md:w-[700px] ">
        {recipes.map((recipe) => {
          return (
            <div
              key={recipe.id}
              className="card card-compact bg-base-100 shadow-xl mb-2"
            >
              <img
                className="w-full h-[200px] rounded-t-[16px]"
                src={recipe.imagesUrl[0]}
              />
              <div className="card-body">
                <div className="flex items-center">
                  <h2 className="grid-cols-2 card-title">{recipe.title}</h2>
                  {!isPassed24Hours(recipe.createdDate) && (
                    <span className="badge badge-secondary ml-3">!New</span>
                  )}
                </div>
                <div className="flex">
                  <p className="flex items-center gap-1">
                    <FaClock />
                    {recipe.cookingTime + "minutes"}
                  </p>
                </div>
                <p className="line-clamp-3">{recipe.method}</p>
                <div className="card-actions justify-end p-1">
                  <Link
                    to={`/recipe/${recipe.id}`}
                    className="btn btn-sm btn-primary"
                  >
                    Read More
                  </Link>
                  <button
                    onClick={() => deleteRecipe("recipes", recipe.id)}
                    className="btn btn-sm btn-primary"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RecipesList
