// Modules
import { BrowserRouter, Route, Routes } from "react-router-dom"

// Components
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"

// Pages
import Login from "../Pages/User/Login/Login"
import Register from "../Pages/User/Register/Register"
import Home from "../Pages/Home/Home"
import AddCategory from "../Pages/Category/AddCategory/AddCategory"
import Categories from "../Pages/Category/Categories/Categories"
import UpdateCategory from "../Pages/Category/UpdateCategory/UpdateCategory"
import NewArticle from "../Pages/Article/NewArticle/NewArticle"
import Articles from "../Pages/Article/Articles/Articles"
import ReadArticle from "../Pages/Article/ReadArticle/ReadArticle"
import ArtByCat from "../Pages/Article/ArtByCat/ArtByCat"
import UpdateArticle from "../Pages/Article/UpdateArticle/UpdateArticle"

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/:num" element={<Home />} />
                    <Route exact path="/categories" element={<Categories />} />
                    <Route exact path="/add-category" element={<AddCategory />} />
                    <Route exact path="/update-category/:id" element={<UpdateCategory />} />
                    <Route exact path="/articles" element={<Articles />} />
                    <Route exact path="new-article" element={<NewArticle />} />
                    <Route exact path="/update-article/:id" element={<UpdateArticle />} />
                    <Route exact path="/article/:slug" element={<ReadArticle />} />
                    <Route exact path="/category/:slug" element={<ArtByCat />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    )
}

export default Router