// Modules
import { BrowserRouter, Route, Routes } from "react-router-dom"

// Pages
import Home from "./Pages/Home/Home"
import AddCategory from "./Pages/AddCategory/AddCategory"
import Categories from "./Pages/Categories/Categories"
import UpdateCategory from "./Pages/UpdateCategory/UpdateCategory"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/update-category" element={<UpdateCategory id={30} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
