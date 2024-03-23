// CSS
import styles from "./UpdateCategory.module.css"

// Modules
import dbFetch from "../../../axios/config"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

const UpdateCategory = () => {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const { id } = useParams()
    const [title, setTitle] = useState("")

    const getCategory = async(id) => {
        const res = await dbFetch.get(`/categories/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
        setTitle(res.data.category.title)
        setLoading(false)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        if(title != "") {
            setLoading(true)
            try {
                await dbFetch.post(`/categories/update/${id}`, { title }, {
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

    useEffect(() => {
        getCategory(id)
    }, [])

    return (
        <div className={styles.update_category}>
            <form onSubmit={handleSubmit}>
                <h1>Atualizar Categoria</h1>
                
                {loading ? (
                    <img src=".././loading.svg" alt="Loading" />
                ) : (
                    <div>
                        <label>
                            <input 
                                type="text" 
                                name="title" 
                                id="title" 
                                placeholder="Digite o titulo" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </label>

                        <button type="submit">Atualizar</button>
                    </div>
                )}
            </form>
        </div>
    )
}

export default UpdateCategory
