// CSS
import styles from "./UpdateCategory.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useLayoutEffect } from "react"
import { useParams } from "react-router-dom"

const UpdateCategory = () => {
    const { id } = useParams()
    const [title, setTitle] = useState("")

    const getCategory = async(id) => {
        const res = await dbFetch.get(`/categories/${id}`)
        setTitle(res.data.category.title)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("submited")
    }

    useLayoutEffect(() => {
        getCategory(id)
    }, [])

    return (
        <div>
            <h1>Atualizar Categoria</h1>
            <button onClick={() => console.log(category)}>teste</button>
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
                <button type="submit">Adicionar</button>
            </form>
        </div>
    )
}

export default UpdateCategory
