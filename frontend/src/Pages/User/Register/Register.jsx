// CSS
import styles from "./Register.module.css"

// Modules
import dbFetch from "../../../axios/config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Register = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault()

        try {
            await dbFetch.post("/users/save", {
                email,
                password
            })
            navigate("/login")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className={styles.register}>
            <h1>Criar Conta</h1>

            <form onSubmit={handleSubmit}>
                <p>Crie sua conta para compartilhar seus conhecimentos</p>

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
            </form>
        </div>
    )
}

export default Register