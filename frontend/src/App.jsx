// Modules
import { BrowserRouter, Route, Routes } from "react-router-dom"

// Components
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"

// Pages
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
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
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
