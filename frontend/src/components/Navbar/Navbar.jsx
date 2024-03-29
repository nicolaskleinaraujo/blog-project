// CSS
import styles from "./Navbar.module.css"

// Icons
import { IoMenu, IoClose } from "react-icons/io5";

// Modules
import dbFetch from "../../axios/config"
import { useEffect, useState, useContext } from "react"
import { Link, useLocation } from "react-router-dom"

// Context
import { AuthContext } from "../../context/AuthContext"

const Navbar = () => {
    const location = useLocation()

    const [categories, setCategories] = useState()
    const getCategories = async() => {
        const res = await dbFetch.get("/admin/categories")
        setCategories(res.data)
    }

    const [menu, setMenu] = useState(false)
    const showMenu = () => {
        menu ? setMenu(false) : setMenu(true)
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
    }, [auth, location])

    return (
        <nav className={styles.nav}>
            <Link to='/'><img src="/blog-logo.svg" alt="Project Logo" /></Link>

            <li><button className={styles.menuBtn} onClick={() => showMenu()}>
                { menu ? <IoClose style={{position: "fixed"}} /> : <IoMenu style={{position: "absolute"}} /> }
            </button></li>

            <div className={styles.menu} style={{display: menu ? "flex" : "none"}}>
                <p>NAVEGAR</p>
                <li><Link to="/">Home</Link></li>
                {categories &&
                    categories.map((category) => (
                        <li key={category.id}><Link to={`/category/${category.slug}`}>{category.title}</Link></li>
                    ))
                }

                <p>ADMIN</p>
                <li><Link to="/new-article">Novo Artigo</Link></li>
                <li><Link to="/add-category">Nova Categoria</Link></li>
                <li><Link to="/articles">Artigos</Link></li>
                <li><Link to="/categories">Categorias</Link></li>

                {auth ? (
                    <p><li><button onClick={() => logOut()}>Sair</button></li></p>
                ) : (
                    <div>
                        <li><Link to="/register">Criar</Link></li>
                        <li><Link to="/login">Logar</Link></li>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar