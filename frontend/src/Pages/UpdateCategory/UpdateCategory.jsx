// CSS
import styles from "./UpdateCategory.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useLayoutEffect } from "react"

const UpdateCategory = ({ id }) => {
    const [category, setCategory] = useState([])
    const [title, setTitle] = useState("")

    const getCategory = async(id) => {
        const res = await dbFetch.get(`/categories/${id}`)
        setCategory(res.data)
        setTitle(category.title)
    }

    const handleSubmit = () => {
        console.log("submited")
    }

    useLayoutEffect(() => {
        getCategory()
    }, [])

    return (
        <div>
            <h1>Atualizar Categoria</h1>
            <button onClick={() => console.log(title)}>teste</button>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Titulo: </p>
                    <input 
                        type="text" 
                        name="title" 
                        id="title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </label>
                <button type="submit">Adicionar</button>
            </form>
        </div>
    )
}

export default UpdateCategory
