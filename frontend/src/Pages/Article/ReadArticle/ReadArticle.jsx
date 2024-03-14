// CSS
import styles from "./ReadArticle.module.css"

// Modules
import dbFetch from "../../../axios/config"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const ReadArticle = () => {
    const { slug } = useParams()

    const [article, setArticle] = useState([])
    const getArticle = async() => {
        const res = await dbFetch.get(`/article/${slug}`)
        setArticle(res.data)
    }

    useEffect(() => {
        getArticle()
    }, [])

    return (
        <div className={styles.read_article}>
            <h1>{article.title}</h1>
            <p>{article.body}</p>
        </div>
    )
}

export default ReadArticle