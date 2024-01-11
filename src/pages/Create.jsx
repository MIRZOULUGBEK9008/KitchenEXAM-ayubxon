import {useRef, useState} from "react"
import Navbar from "../components/Navbar"
import {useAddRecipes} from "../hooks/useAddRecipes"
import {useNavigate} from "react-router-dom"
import Loader from "../components/Loader"
import {useGlobalContext} from "../hooks/useGlobalContext"
import {toast} from "react-toastify"

function Create() {
  const [render, setRender] = useState(0)
  const [ingredientss, setingredientss] = useState([])
  const [imagesUrl, setImagesUrl] = useState([])
  const {user} = useGlobalContext()
  const navigate = useNavigate()
  const {addNewDoc, newRecipe} = useAddRecipes()
  const [loading, setLoading] = useState(false)

  const title = useRef()
  const ingredients = useRef()
  const cookingTime = useRef()
  const images = useRef()
  const method = useRef()

  const handleClick = () => {
    if (
      title.current.value.length > 0 &&
      ingredientss.length > 0 &&
      imagesUrl.length > 0 &&
      cookingTime.current.value.length > 0 &&
      method.current.value.length > 0
    ) {
      document.getElementById("my_modal_2").showModal()
    } else {
      toast.error("fill out the form")
    }

    setRender((prev) => {
      return prev + 1
    })
  }
  const handleIng = (e) => {
    e.preventDefault()
    let newing = ingredients.current.value.trim()
    if (!ingredientss.includes(newing) && newing.length > 0) {
      setingredientss((prev) => {
        return [...prev, newing]
      })
    } else if (newing) {
      toast.error(newing + " ago added")
    } else {
      toast.error("fill out the form")
    }

    ingredients.current.value = ""
  }
  const handleForm = async (e) => {
    setLoading(true)
    e.preventDefault()

    await addNewDoc("recipes", {
      title: title.current.value,
      ingredientss,
      cookingTime: cookingTime.current.value,
      imagesUrl,
      method: method.current.value,
      uid: user.uid,
      createdDate: new Date().toLocaleString(),
    })

    navigate("/")
    setLoading(false)
  }
  const imageUrlRegex = /\.(jpeg|jpg|gif|png|svg|JPEG|JPG|GIF|PNG|SVG)$/
  const handleImage = (e) => {
    e.preventDefault()
    let newImage = images.current.value.trim()
    if (imageUrlRegex.test(newImage)) {
      toast.success("Image added")
      setImagesUrl((prev) => {
        return [...prev, newImage]
      })
    }
    images.current.value = ""
  }

  return (
    <>
      <Navbar />
      <main>
        <div className="grid justify-center mt-9">
          <h1 className="text-[40px] font-semibold">Create New Recipe</h1>
          <form onSubmit={handleForm} className="justify-center grid mt-5">
            <label>
              <p className="font-bold text-[20px]">Title:</p>
              <input
                ref={title}
                required
                name="title"
                type="text"
                placeholder="Type here"
                className="input input-bordered w-[400px] "
              />
              <br />
              <br />
              <p className="font-bold text-[20px]">Ingredients:</p>
              <input
                ref={ingredients}
                name="ingredients"
                type="text"
                placeholder="Type here"
                className="input input-bordered w-[330px] "
              />
              <button onClick={handleIng} className="btn btn-primary ml-3">
                Add
              </button>
              <p>
                Ingredients:{" "}
                {ingredientss.length > 0 &&
                  ingredientss.map((ing, index, ingArray) => {
                    return (
                      <span style={{display: "inline-block"}} key={ing}>
                        {ing}
                        {index === ingArray.length - 1 ? "." : ","}
                      </span>
                    )
                  })}
              </p>
              <br />
              <p className="font-bold text-[20px]">Cooking time:</p>
              <input
                ref={cookingTime}
                required
                name="cookingTime"
                type="number"
                placeholder="Type here"
                className="input input-bordered w-[400px] "
              />
              <br />
              <br />
              <p className="font-bold text-[20px]">Images URL:</p>
              <input
                ref={images}
                name="images"
                type="text"
                placeholder="Type here"
                className="input input-bordered w-[330px] "
              />
              <button
                onClick={handleImage}
                type="button"
                className="btn btn-primary ml-3"
              >
                Add
              </button>
              <p>Images:</p>
              <div className="grid gap-4 grid-cols-4">
                {imagesUrl.length > 0 &&
                  imagesUrl.map((image) => {
                    return (
                      <img
                        className="w-[90px] h-[70px]"
                        key={image}
                        src={image}
                        alt=""
                      />
                    )
                  })}
              </div>
              <br />
              <p className="font-bold text-[20px]">Method:</p>
              <textarea
                ref={method}
                required
                name="method"
                className="textarea textarea-bordered w-[400px] "
                placeholder="Bio"
              ></textarea>
              <div className="justify-between flex mt-4">
                {!loading && (
                  <button className="btn btn-primary w-36">CREATE</button>
                )}
                {loading && (
                  <button className="btn btn-primary w-36">
                    CREATE <Loader />
                  </button>
                )}
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <button className="btn" onClick={handleClick} type="button">
                  open modal
                </button>
                <dialog id="my_modal_2" className="modal">
                  <div className="modal-box p-0 m-0 h4">
                    <div className="p-5 bg-[#fff] rounded-[14px] shadow-2xl max-container h-auto">
                      <img
                        className="w-[475px] h-[470px] rounded-[12px] max-lg:w-[300px] max-lg:h-64  hidden max-lg:block max-lg:mx-auto"
                        src={imagesUrl[0]}
                        alt=""
                      />
                      <div className="flex max-lg:justify-center">
                        <img
                          className="self-center max-w-[300px] h-[270px] bg-slate-600 rounded-[12px] max-lg:hidden"
                          src={imagesUrl[0]}
                          alt=""
                        />
                        <div className="block">
                          <h1 className="text-[30px] sm:ml-6 font-bold max-sm:text-[20px]">
                            {title.current?.value}
                          </h1>
                          <p className="font-bold text-[18px] sm:ml-6 mt-6 sm:text-[15px]"></p>
                          <p className="font-bold text-[18px] sm:ml-6 mt-6 sm:text-[15px] max-sm:text-[15px] ">
                            Method:{" "}
                            <span className="text-slate-500">
                              {method.current?.value}
                            </span>
                          </p>
                          <p className="font-bold text-[18px] sm:ml-6 mt-6 sm:text-[15px] max-sm:text-[15px]">
                            Ingredients:{" "}
                            {ingredientss.map((ing, index, ingArray) => {
                              return (
                                <span className="font-sans text-slate-500 ">
                                  {ing}
                                  {index === ingArray.length - 1 ? "." : ", "}
                                </span>
                              )
                            })}
                          </p>
                          <p className="font-bold text-[18px] sm:ml-6 mt-6 sm:text-[15px] max-sm:text-[15px]">
                            Cooking Time:{" "}
                            <span className="text-slate-500">
                              {cookingTime.current?.value + " minutes"}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
              </div>
            </label>
          </form>
        </div>
      </main>
    </>
  )
}

export default Create
