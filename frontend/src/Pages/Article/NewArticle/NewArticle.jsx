// CSS
import styles from "./NewArticle.module.css"

// Modules
import dbFetch from "../../../axios/config"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const NewArticle = () => {
    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [articleCategory, setArticleCategory] = useState(0)

    const [categories, setCategories] = useState([])
    const getCategories = async() => {
        const res = await dbFetch.get("/admin/categories")
        setCategories(res.data)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        if(articleCategory != 0) {
            try {
                await dbFetch.post("/articles/save", {
                    title,
                    body,
                    category: articleCategory
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    } 
                })
                navigate("/articles")
            } catch (error) {
                console.log(error)
            }

            setTitle("")
            setBody("")
            setArticleCategory(0)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div className={styles.new_article}>
            <button onClick={() => console.log(articleCategory)}></button>
            <form onSubmit={handleSubmit}>
                <h1>Criar Artigo</h1>

                <input 
                    type="text" 
                    name="title" 
                    id="title" 
                    placeholder="Digite o seu titulo"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />

                <textarea 
                    name="body" 
                    id="body" 
                    cols="30" 
                    rows="10" 
                    placeholder="Digite o seu texto" 
                    onChange={(e) => setBody(e.target.value)}
                    value={body}
                ></textarea>

                <select name="category" defaultValue="placeholder" onChange={(e) => setArticleCategory(e.target.value)}>
                    <option value="placeholder" hidden>--- SELECIONE UMA CATEGORIA ---</option>
                    {categories && 
                        categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.title}</option>
                        ))
                    }
                </select>
                
                <button type="submit">Criar</button>
            </form>
        </div>
    )
}

export default NewArticle