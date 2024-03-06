// CSS
import styles from "./Articles.module.css"

// Modules
import dbFetch from "../../../axios/config"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Articles = () => {
    const [articles, setArticles] = useState([])
    const getArticles = async() => {
        const res = await dbFetch.get("/admin/articles")
        setArticles(res.data)
    }

    const deleteArticle = async(id) => {
        if(confirm("Deletar Artigo?") === true){
            try {
                await dbFetch.delete(`/articles/delete/${id}`)
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        getArticles()
    }, [])

    return (
        <div>
            <h1>Artigos</h1>
            {articles &&
                articles.map((article) => (
                    <li key={article.id}>
                        {article.id} ---
                        {article.title} ---
                        {article.slug} ---
                        {article.categoryId === null ? "Categoria Excluida" : article.category.title} 
                        <br />
                        <Link to={`/update-article/${article.id}`}>EDITAR!</Link>
                        <button onClick={() => deleteArticle(article.id)}>DELETAR!</button>
                    </li>
                ))
            }
        </div>
    )
}

export default Articles