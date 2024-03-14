// CSS
import styles from "./Articles.module.css"

// Icons
import { FaEdit, FaTrash } from "react-icons/fa";

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
                await dbFetch.delete(`/articles/delete/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        getArticles()
    }, [])

    return (
        <div className={styles.articles}>
            <h1>Artigos</h1>

            {articles &&
                articles.map((article) => (
                    <div key={article.id}>
                        <h2>{article.title}</h2>
                        <Link to={`/update-article/${article.id}`}><FaEdit /></Link>
                        <button onClick={() => deleteArticle(article.id)}><FaTrash /></button>
                    </div>
                ))
            }
        </div>
    )
}

export default Articles