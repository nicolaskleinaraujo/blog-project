// CSS
import styles from "./ArtByCat.module.css"

// Modules
import dbFetch from "../../../axios/config"
import { useState, useEffect } from "react"
import { useParams, Link, useLocation } from "react-router-dom"

const ArtByCat = () => {
    const [loading, setLoading] = useState(true)
    const { slug } = useParams()
    const location = useLocation()

    const [articles, setArticles] = useState([])
    const getArticles = async() => {
        const res = await dbFetch.get(`/category/${slug}`)
        setArticles(res.data.articles)
        if(loading){setLoading(false)}
    }

    useEffect(() => {
        getArticles()
    }, [location])

    return (
        <div className={styles.art_by_cat}>
            <h1>{slug}</h1>

            {loading ? (
                <img src=".././loading.svg" alt="Loading" />
            ) : (
                articles.map((article) => (
                    <div key={article.id}>
                        <h2>{article.title}</h2>
                        <hr />
                        <Link to={`/article/${article.slug}`}>Ler Artigo</Link>
                    </div>
                ))
            )}
        </div>
    )
}

export default ArtByCat