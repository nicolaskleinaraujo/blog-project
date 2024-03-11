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
        <nav>
            <ul>
                <Link to='/'>HOME---</Link>
                {categories &&
                    categories.map((category) => (
                        <Link key={category.id} to={`/category/${category.slug}`}>{category.title}---</Link>
                    ))
                }

                {auth ? (
                        <li><button onClick={() => logOut()}>SAIR</button></li>
                    ) : (
                        <Link to="/login">LOGAR</Link>
                    )
                }
                <Link to="categories">TESTE</Link>
            </ul>
        </nav>
    )
}

export default Navbar