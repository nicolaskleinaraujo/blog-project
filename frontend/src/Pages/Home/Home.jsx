// CSS
import styles from "./Home.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Home = () => {
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
        <h1>Home</h1>
        {articles &&
          articles.map((article) => (
            <div key={article.id}>
              <hr />
              {article.title} <br />
              <Link to={`${article.slug}`}>LER MAIS</Link>
              <hr />
            </div>
          ))
        }
    </div>
  )
}

export default Home