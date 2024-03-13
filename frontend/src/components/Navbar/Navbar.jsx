// CSS
import styles from "./Navbar.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"

// Context
import { AuthContext } from "../../context/AuthContext"

const Navbar = () => {
    const [categories, setCategories] = useState()
    const getCategories = async() => {
        const res = await dbFetch.get("/admin/categories")
        setCategories(res.data)
    }

    const { auth, setAuth } = useContext(AuthContext)
    const logOut = async() => {
        if(confirm("Deslogar do sistema?")) {
            localStorage.removeItem("token")
            localStorage.setItem("authenticated", false)
            setAuth(false)
        }
    }

    useEffect(() => {
        getCategories()
    }, [auth])

    return (
        <nav className={styles.nav}>
            <li><Link to='/'>Home</Link></li>

            <div className={styles.menu}>
                {categories &&
                    categories.map((category) => (
                        <li key={category.id}><Link to={`/category/${category.slug}`}>{category.title}</Link></li>
                    ))
                }

                <li><Link to="/new-article">Novo Artigo</Link></li>
                <li><Link to="/add-category">Nova Categoria</Link></li>
                <li><Link to="/articles">Artigos</Link></li>
                <li><Link to="/categories">Categorias</Link></li>

                {auth ? (
                    <li><button onClick={() => logOut()}>Sair</button></li>
                ) : (
                    <li><Link to="/login">Logar</Link></li>
                )
                }
            </div>
        </nav>
    )
}

export default Navbar