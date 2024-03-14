// CSS
import styles from "./Home.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useEffect, useContext } from "react"
import { Link, useLocation, useParams } from "react-router-dom"

// Context
import { AuthContext } from "../../context/AuthContext"

const Home = () => {
  const location = useLocation()
  const { auth } = useContext(AuthContext)

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
      {!auth &&
        <div>
          <h1>Blog de Tecnologia</h1>
          <p>Bem-vindo ao meu blog. Nele você pode criar uma conta para ler, criar e excluir artigos</p>
          <Link to="/register">Criar Conta</Link>
        </div>
      }

      {articles &&
        articles.map((article) => (
          <div key={article.id}>
            <h2>{article.title}</h2>
            <hr />
            <Link to={`/article/${article.slug}`}>LER ARTIGO</Link>
          </div>
        ))
      }

      <menu>
        {num > 1 && <Link className={styles.prev_page} to={`/${num - 1}`}>⬅ Página Anterior</Link>}
        {next && <Link className={styles.next_page} to={`/${1 + parseInt(num)}`}>Proxima Página ➡</Link>}
      </menu>
    </div>
  )
}

export default Home