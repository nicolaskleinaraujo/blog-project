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
        const res = await dbFetch.get(`/articles/${id}`)
        setTitle(res.data.article.title)
        setBody(res.data.article.body)
        setArticleCategory(res.data.article.category.title)
    }

    const [categories, setCategories] = useState([])
    const getCategories = async() => {
        const res = await dbFetch.get("/admin/categories")
        setCategories(res.data)
    }

    useEffect(() => {
        getArticle()
        getCategories()
    }, [])

    return (
        <div>
            <h1>Atualizar Artigo</h1>
        </div>
    )
}

export default UpdateArticle