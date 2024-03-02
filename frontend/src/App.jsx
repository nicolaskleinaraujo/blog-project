// Modules
import { BrowserRouter, Route, Routes } from "react-router-dom"

// Pages
import Home from "./Pages/Home/Home"
import AddCategory from "./Pages/AddCategory/AddCategory"
import Categories from "./Pages/Categories/Categories"
import UpdateCategory from "./Pages/UpdateCategory/UpdateCategory"
import NewArticle from "./Pages/NewArticle/NewArticle"
import Articles from "./Pages/Articles/Articles"
import ReadArticle from "./Pages/ReadArticle/ReadArticle"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/update-category/:id" element={<UpdateCategory />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="new-article" element={<NewArticle />} />
          <Route path="read-article/:slug" element={<ReadArticle />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
