// CSS
import styles from "./UpdateCategory.module.css"

// Modules
import dbFetch from "../../../axios/config"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

const UpdateCategory = () => {
    const navigate = useNavigate()

    const { id } = useParams()
    const [title, setTitle] = useState("")

    const getCategory = async(id) => {
        const res = await dbFetch.get(`/categories/${id}`)
        setTitle(res.data.category.title)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            await dbFetch.post(`/categories/update/${id}`, { title })
            navigate("/categories")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCategory(id)
    }, [])

    return (
        <div>
            <h1>Atualizar Categoria</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Titulo: </p>
                    <input 
                        type="text" 
                        name="title" 
                        id="title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <button type="submit">Atualizar</button>
            </form>
        </div>
    )
}

export default UpdateCategory
