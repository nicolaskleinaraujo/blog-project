// CSS
import styles from "./Home.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"

const Home = () => {
  const { num } = useParams()

  const [articles, setArticles] = useState([])
  const [next, setNext] = useState(true)
  const getArticles = async() => {
    const res = await dbFetch.get(`/articles/page/${num}`)
    setArticles(res.data.page.rows)
    setNext(res.data.next)
  }

  useEffect(() => {
    getArticles()
  }, [])

  return (
    <div>
        <h1>Home</h1>
        {articles &&
          articles.map((article) => (
            <div key={article.id}>
              {article.title} <br />
              <Link to={`/article/${article.slug}`}>LER MAIS</Link>
              <hr />
            </div>
          ))
        }
    </div>
  )
}

export default Home