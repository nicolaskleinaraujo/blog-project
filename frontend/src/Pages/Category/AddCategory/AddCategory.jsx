// CSS
import styles from "./AddCategory.module.css"

// Modules
import dbFetch from "../../../axios/config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Category = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const [title, setTitle] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault()

        if(title != "") {
            setLoading(true)
            try {
                await dbFetch.post("/categories/save", { title }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                })
                navigate("/categories")
            } catch (err) {
                setLoading(false)
            }
        }
    }

    return (
        <div className={styles.add_category}>
            <form onSubmit={handleSubmit}>
                <h1>Criar nova categoria</h1>

                {loading ? (
                    <img src=".././loading.svg" alt="Loading" />
                ) : (
                    <div>
                        <label>
                            <input 
                                type="text" 
                                name="title" 
                                id="title" 
                                placeholder="Digite o novo titulo" 
                                onChange={(e) => setTitle(e.target.value)} 
                                value={title}
                            />
                        </label>

                        <button type="submit">Adicionar</button>
                    </div>
                )}
            </form>
        </div>
    )
}

export default Category