// CSS
import styles from "./NewArticle.module.css"

// Modules
import dbFetch from "../../../axios/config"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const NewArticle = () => {
    const [loading, setLoading] = useState(false)
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

        if(articleCategory != 0 && title != "" && body != "") {
            setLoading(true)
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
            } catch (err) {
                setTitle("")
                setBody("")
                setArticleCategory(0)
                setLoading(false)
            }
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div className={styles.new_article}>
            <form onSubmit={handleSubmit}>
                <h1>Criar Artigo</h1>

                {loading ? (
                    <img src=".././loading.svg" alt="Loading" />
                ) : (
                    <div>
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
                    </div>
                )}
            </form>
        </div>
    )
}

export default NewArticle