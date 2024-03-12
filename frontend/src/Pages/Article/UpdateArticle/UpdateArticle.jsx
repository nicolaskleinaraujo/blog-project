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
        try {
            await dbFetch.post(`/articles/update/${id}`, {
                title,
                body,
                category: articleCategory,
            })
            navigate("/articles")
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getArticle()
        getCategories()
    }, [])

    return (
        <div>
            <h1>Atualizar Artigo</h1>
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
                    <textarea 
                        name="body" 
                        id="body" 
                        cols="30" 
                        rows="10" 
                        onChange={(e) => setBody(e.target.value)} 
                        value={body}
                    ></textarea>
                </label>

                <select name="category" defaultValue={articleCategory.id} onChange={(e) => setArticleCategory(e.target.value)}>
                    <option value={articleCategory.id} disabled hidden>{articleCategory}</option>
                    {categories &&
                        categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.title}</option>
                        ))
                    }
                </select>

                <input type="submit" value="Atualizar" />
            </form>
        </div>
    )
}

export default UpdateArticle