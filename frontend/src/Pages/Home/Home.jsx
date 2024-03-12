// CSS
import styles from "./Home.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useEffect } from "react"
import { Link, useLocation, useParams } from "react-router-dom"

const Home = () => {
  const location = useLocation()

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
  }, [location])

  return (
    <div className={styles.home}>
      <div>
        <h1>Blog de Tecnologia</h1>
        <p>Bem-vindo ao meu blog. Nele você pode criar uma conta para criar e excluir artigos</p>
        <Link to="/register">Criar Conta</Link>
      </div>
      

      {articles &&
        articles.map((article) => (
          <div key={article.id}>
            <h2>{article.title}</h2>
            <hr />
            <Link to={`/article/${article.slug}`}>LER ARTIGO</Link>
          </div>
        ))
      }

      <menu className={styles.menu}>
        {num > 1 && <Link to={`/${num - 1}`}>⬅ Página Anterior</Link>}
        {next && <Link to={`/${1 + parseInt(num)}`}>Proxima Página ➡</Link>}
      </menu>
    </div>
  )
}

export default Home