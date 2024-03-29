// CSS
import styles from "./Register.module.css"

// Modules
import dbFetch from "../../../axios/config"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

const Register = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        if (email != "" && password != "") {
            setLoading(true)
            try {
                await dbFetch.post("/users/save", {
                    email,
                    password
                })
                navigate("/login")
            } catch (err) {
                setLoading(false)
            }
        }
    }

    return (
        <div className={styles.register}>
            <form onSubmit={handleSubmit}>
                <h1>Criar Conta</h1>
                <p>Crie sua conta para compartilhar seus conhecimentos</p>

                {loading ? (
                    <img src=".././loading.svg" alt="Loading" />
                ) : (
                    <div>
                        <label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                placeholder="Digite um email" 
                                onChange={(e) => setEmail(e.target.value)} 
                                value={email} 
                            />
                        </label>

                        <label>
                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                placeholder="Digite uma senha" 
                                onChange={(e) => setPassword(e.target.value)} 
                                value={password} 
                            />
                        </label>

                        <input type="submit" value="Criar" />

                        <p>Já possui conta? <Link to="/login">Logar</Link></p>
                    </div>
                )}
            </form>
        </div>
    )
}

export default Register