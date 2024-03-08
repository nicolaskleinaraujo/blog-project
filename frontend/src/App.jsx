// Modules
import dbFetch from "./axios/config"
import { useEffect, useContext } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

// Auth Context
import { AuthContext } from "./context/AuthContext"

// Components
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"

// Pages
import Login from "./Pages/User/Login/Login"
import Register from "./Pages/User/Register/Register"
import Home from "./Pages/Home/Home"
import AddCategory from "./Pages/Category/AddCategory/AddCategory"
import Categories from "./Pages/Category/Categories/Categories"
import UpdateCategory from "./Pages/Category/UpdateCategory/UpdateCategory"
import NewArticle from "./Pages/Article/NewArticle/NewArticle"
import Articles from "./Pages/Article/Articles/Articles"
import ReadArticle from "./Pages/Article/ReadArticle/ReadArticle"
import ArtByCat from "./Pages/Article/ArtByCat/ArtByCat"
import UpdateArticle from "./Pages/Article/UpdateArticle/UpdateArticle"

function App() {
  const { setAuth } = useContext(AuthContext)

  const tryAuth = async() => {
    const res = await dbFetch.get("/try-authenticate", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })

    if (res.status === 200) {
      setAuth(true)
    } else {
      setAuth(false)
    }
  }

  useEffect(() => {
    tryAuth()
  }, [])

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/:num" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/update-category/:id" element={<UpdateCategory />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="new-article" element={<NewArticle />} />
          <Route path="/update-article/:id" element={<UpdateArticle />} />
          <Route path="/article/:slug" element={<ReadArticle />} />
          <Route path="/category/:slug" element={<ArtByCat />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
