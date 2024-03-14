// CSS
import styles from "./Categories.module.css"

// Icons
import { FaEdit, FaTrash } from "react-icons/fa";

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
                await dbFetch.delete(`/categories/delete/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                })
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
        <div className={styles.categories}>
            <h1>Categorias</h1>

            {categories &&
                categories.map((category) => (
                   <div key={category.id}>
                        <h2>{category.title}</h2>
                        <Link to={`/update-category/${category.id}`}><FaEdit /></Link>
                        <button onClick={() => deleteCategory(category.id)}><FaTrash /></button>
                   </div>
                ))
            }
        </div>
    )
}

export default Category