// CSS
import styles from "./NewArticle.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useEffect } from "react"

const NewArticle = () => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [articleCategory, setArticleCategory] = useState("")

    const [categories, setCategories] = useState([])
    const getCategories = async() => {
        const res = await dbFetch.get("/admin/articles/new")
        setCategories(res.data)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("submited")
    }

    useEffect(() => {
        getCategories()
    })

    return (
        <div>
            <h1>NewArticle</h1>
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
                <label>
                    <p>Texto: </p>
                    <input 
                        type="text" 
                        name="body" 
                        id="body" 
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                    />
                </label>
                <label>
                    <select name="category" defaultValue="placeholder" onChange={(e) => setArticleCategory(e.target.value)}>
                        <option value="placeholder" disabled hidden>--- SELECIONE UMA CATEGORIA ---</option>
                        {categories && 
                            categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.title}</option>
                            ))
                        }
                    </select>
                </label>
                <button type="submit">Criar</button>
            </form>
        </div>
    )
}

export default NewArticle