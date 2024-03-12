// CSS
import styles from "./Navbar.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useEffect, useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"

// Context
import { AuthContext } from "../../context/AuthContext"

const Navbar = () => {
    const [categories, setCategories] = useState()
    const getCategories = async() => {
        const res = await dbFetch.get("/admin/categories")
        setCategories(res.data)
    }
    
    const navigate = useNavigate()
    const handleChange = (e) => {
        navigate(e.target.value)
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
            <ul>
                <li className={styles.home_link}><Link to='/'>Home</Link></li>

                <li>
                    <select name="categories" defaultValue={location.href} onChange={handleChange}>
                        <option value={location.href} disabled hidden>Categorias</option>
                        {categories &&
                            categories.map((category) => (
                                <option key={category.id} value={`/category/${category.slug}`}>{category.title}</option>
                            ))
                        }
                    </select>
                </li>

                <li>
                    <select name="admin" defaultValue={location.href} onChange={handleChange}>
                        <option value={location.href} disabled hidden>Admin</option>
                        <option value="/new-article">Novo Artigo</option>
                    </select>
                </li>
                
                {auth ? (
                        <li className={styles.action}><button onClick={() => logOut()}>Sair</button></li>
                    ) : (
                        <li className={styles.action}><Link to="/login">Logar</Link></li>
                    )
                }
            </ul>
        </nav>
    )
}

export default Navbar