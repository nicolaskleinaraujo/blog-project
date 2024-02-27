// Modules
import { BrowserRouter, Route, Routes } from "react-router-dom"

// Pages
import Home from "./Pages/Home/Home"
import Category from "./Pages/AddCategory/AddCategory"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-category" element={<Category />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App