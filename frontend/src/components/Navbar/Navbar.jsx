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
        navigate(`/category/${e.target.value}`)
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
                <Link to='/'>Home</Link>
                <select onChange={handleChange}>
                    {categories &&
                        categories.map((category) => (
                            <option key={category.id} value={category.slug}>{category.title}</option>
                        ))
                    }
                </select>
                
                {auth ? (
                        <li><button onClick={() => logOut()}>Sair</button></li>
                    ) : (
                        <Link to="/login">Logar</Link>
                    )
                }
            </ul>
        </nav>
    )
}

export default Navbar