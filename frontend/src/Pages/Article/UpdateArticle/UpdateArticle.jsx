// CSS
import styles from "./UpdateArticle.module.css"

// Modules
import dbFetch from "../../../axios/config"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const UpdateArticle = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [articleCategory, setArticleCategory] = useState("")

    const getArticle = async() => {
        const res = await dbFetch.get(`/articles/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })

        setTitle(res.data.article.title)
        setBody(res.data.article.body)
        setArticleCategory(res.data.article.category.title)
    }

    const [categories, setCategories] = useState([])
    const getCategories = async() => {
        const res = await dbFetch.get("/admin/categories")
        setCategories(res.data)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        if(!isNaN(articleCategory)) {
            try {
                await dbFetch.post(`/articles/update/${id}`, {
                    title,
                    body,
                    category: articleCategory,
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                })
                navigate("/articles")
            } catch (err) {
                console.log(err)
            }
        }
    }

    useEffect(() => {
        getArticle()
        getCategories()
    }, [])

    return (
        <div className={styles.update_article}>
            <form onSubmit={handleSubmit}>
                <h1>Atualizar Artigo</h1>

                <input 
                    type="text" 
                    name="title" 
                    id="title" 
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />

                <textarea 
                    name="body" 
                    id="body" 
                    cols="30" 
                    rows="10" 
                    onChange={(e) => setBody(e.target.value)} 
                    value={body}
                ></textarea>

                <select name="category" defaultValue="placeholder" onChange={(e) => setArticleCategory(e.target.value)}>
                    <option value="placeholder" hidden>--- ESCOLHA UMA CATEGORIA ---</option>
                    {categories &&
                        categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.title}</option>
                        ))
                    }
                </select>

                <button type="submit">Atualizar</button>
            </form>
        </div>
    )
}

export default UpdateArticle