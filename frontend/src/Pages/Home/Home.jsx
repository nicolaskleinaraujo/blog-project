// CSS
import styles from "./Home.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"

const Home = () => {
  let { num } = useParams()
  if (isNaN(num) || null){
    num = 1
  }

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

      <menu>
        {num > 1 && <Link to={`/${num - 1}`}>⬅ Página Anterior</Link>}---
        {next && <Link to={`/${1 + parseInt(num)}`}>Proxima Página ➡</Link> }
      </menu>
    </div>
  )
}

export default Home