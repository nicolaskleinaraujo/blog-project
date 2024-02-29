// CSS
import styles from "./Articles.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useEffect } from "react"

const Articles = () => {
    const [articles, setArticles] = useState([])

    const getArticles = async() => {
        const res = await dbFetch.get("/admin/articles")
        setArticles(res.data)
    }

    useEffect(() => {
        getArticles()
    })

    return (
        <div>
            <h1>Artigos</h1>
            <button onClick={() => console.log(articles)}>TESTE</button>
            {articles &&
                articles.map((article) => (
                    <li key={article.id}>
                        {article.id} --- {article.title} --- {article.slug} --- {article.categoryId}
                    </li>
                ))
            }
        </div>
    )
}

export default Articles