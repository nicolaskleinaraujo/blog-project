// CSS
import styles from "./Categories.module.css"

// Modules
import dbFetch from "../../../axios/config"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

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
            {categories &&
                categories.map((category) => (
                   <li key={category.id}>
                        {category.title} <br />
                        <Link to={`/update-category/${category.id}`}> EDITAR!</Link> <br />
                        <button onClick={() => deleteCategory(category.id)}>DELETAR!</button>
                        <hr />
                   </li>
                ))
            }
        </div>
    )
}

export default Category