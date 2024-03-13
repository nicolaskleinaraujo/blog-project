// CSS
import styles from "./ArtByCat.module.css"

// Modules
import dbFetch from "../../../axios/config"
import { useState, useEffect } from "react"
import { useParams, Link, useLocation } from "react-router-dom"

const ArtByCat = () => {
    const location = useLocation()
    const { slug } = useParams()

    const [category, setCategory] = useState([])
    const [articles, setArticles] = useState([])
    const getArticles = async() => {
        const res = await dbFetch.get(`/category/${slug}`)
        setCategory(res.data)
        setArticles(res.data.articles)
    }

    useEffect(() => {
        getArticles()
    }, [location])

    return (
        <div className={styles.category}>
            <h1>{category.title}</h1>
            {articles &&
                articles.map((article) => (
                    <div key={article.id}>
                        <h2>{article.title}</h2>
                        <Link to={`/article/${article.slug}`}>LER MAIS</Link>
                        <hr />
                    </div>
                ))
            }
        </div>
    )
}

export default ArtByCat