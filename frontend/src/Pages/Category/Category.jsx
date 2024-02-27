// CSS
import styles from "./Category.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useEffect, useState } from "react"

const Category = () => {
    const [categories, setCategories] = useState([])

    const getCategories = async() => {
        try {
            const res = await dbFetch.get("/admin/categories")
            setCategories(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div>
            <h1>Categorias</h1>
            <button onClick={() => console.log(categories)}>clique</button>
            {categories &&
                categories.map((category) => (
                   <li key={category.id}>
                        {category.id} --- {category.title} --- {category.slug}
                   </li> 
                ))
            }
        </div>
    )
}

export default Category