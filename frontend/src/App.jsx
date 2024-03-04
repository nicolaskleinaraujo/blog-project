// Modules
import { BrowserRouter, Route, Routes } from "react-router-dom"

// Components
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"

// Pages
import Home from "./Pages/Home/Home"
import AddCategory from "./Pages/AddCategory/AddCategory"
import Categories from "./Pages/Categories/Categories"
import UpdateCategory from "./Pages/UpdateCategory/UpdateCategory"
import NewArticle from "./Pages/NewArticle/NewArticle"
import Articles from "./Pages/Articles/Articles"
import ReadArticle from "./Pages/ReadArticle/ReadArticle"
import ArtByCat from "./Pages/ArtByCat/ArtByCat"

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/update-category/:id" element={<UpdateCategory />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="new-article" element={<NewArticle />} />
          <Route path="/article/:slug" element={<ReadArticle />} />
          <Route path="/category/:slug" element={<ArtByCat />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
