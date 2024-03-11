// CSS
import styles from "./Navbar.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Navbar = () => {
    const [categories, setCategories] = useState()
    const getCategories = async() => {
        const res = await dbFetch.get("/admin/categories")
        setCategories(res.data)
    }

    const logOut = async() => {
        if(confirm("Deslogar do sistema?")) {
            localStorage.removeItem("token")
            localStorage.setItem("authenticated", false)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <nav>
            <ul>
                <Link to='/'>HOME---</Link>
                {categories &&
                    categories.map((category) => (
                        <Link key={category.id} to={`/category/${category.slug}`}>{category.title}---</Link>
                    ))
                }

                {localStorage.getItem("authenticated") === "true" ? (
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