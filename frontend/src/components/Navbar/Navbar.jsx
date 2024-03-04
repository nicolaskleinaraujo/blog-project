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

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <nav>
            <ul>
                {categories &&
                    categories.map((category) => (
                        <Link>{category.title}---</Link>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Navbar