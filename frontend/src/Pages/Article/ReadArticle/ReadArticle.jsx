// CSS
import styles from "./ReadArticle.module.css"

// Modules
import dbFetch from "../../../axios/config"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const ReadArticle = () => {
    const [loading, setLoading] = useState(true)
    const { slug } = useParams()

    const [article, setArticle] = useState([])
    const getArticle = async() => {
        const res = await dbFetch.get(`/article/${slug}`)
        setArticle(res.data)
        setLoading(false)
    }

    useEffect(() => {
        getArticle()
    }, [])

    return (
        <div className={styles.read_article}>
            {loading ? (
                <img src=".././loading.svg" alt="Loading" />
            ): (
                <div>
                    <h1>{article.title}</h1>
                    <p>{article.body}</p>
                </div>
            )}
        </div>
    )
}

export default ReadArticle