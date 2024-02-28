// CSS
import styles from "./Category.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useEffect, useState } from "react"

const Category = () => {
    const [loading, setLoading] = useState(false)

    const [categories, setCategories] = useState([])
    const getCategories = async() => {
        try {
            const res = await dbFetch.get("/admin/categories")
            setCategories(res.data)
            if (loading === true) {setLoading(false)}
        } catch (error) {
            console.log(error)
        }
    }

    const deleteCategory = async(id) => {
        if (confirm("Deletar categoria?") === true) {
            try {
                await dbFetch.delete(`/categories/delete/${id}`)
                setLoading(true)
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        getCategories()
    }, [loading])

    return (
        <div>
            <h1>Categorias</h1>
            <button onClick={() => console.log(categories)}>clique</button>
            {categories &&
                categories.map((category) => (
                   <li key={category.id}>
                        {category.id} --- {category.title} --- {category.slug}<br />
                        <button onClick={() => deleteCategory(category.id)}>DELETAR!</button><br />
                   </li>
                ))
            }
        </div>
    )
}

export default Category