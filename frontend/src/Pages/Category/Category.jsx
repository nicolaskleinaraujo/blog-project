// CSS
import styles from "./Category.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Category = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault()
        setTitle("")
        try {
            dbFetch.post("/categories/save", { title })
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>Criar nova categoria</h1>
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

export default Category