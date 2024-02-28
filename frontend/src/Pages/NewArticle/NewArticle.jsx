// CSS
import styles from "./NewArticle.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useEffect } from "react"

const NewArticle = () => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [category, setCategory] = useState("")

    const [categories, setCategories] = useState([])
    const getCategories = async() => {
        const res = await dbFetch.get("/admin/articles/new")
        setCategories(res.data)
    }

    useEffect(() => {
        getCategories()
    })

    return (
        <div>
            <h1>NewArticle</h1>
            <button onClick={() => console.log(title, body, categories)}></button>
            <form>
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
                    <select>
                        <option disabled selected>--- SELECIONE UMA CATEGORIA ---</option>
                        {categories && 
                            categories.map((category) => (
                                <option value={category.id}>{category.title}</option>
                            ))
                        }
                    </select>
                </label>
            </form>
        </div>
    )
}

export default NewArticle