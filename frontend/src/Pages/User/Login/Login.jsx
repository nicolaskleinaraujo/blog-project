// CSS
import styles from "./Login.module.css"

// Modules
import dbFetch from "../../../axios/config"
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"

// Context
import { AuthContext } from "../../../context/AuthContext"

const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { setAuth } = useContext(AuthContext)
    const handleSubmit = async(e) => {
        e.preventDefault()
        setEmail("")
        setPassword("")

        const res = await dbFetch.post("/authenticate", {
            email,
            password
        })

        if(res.status === 200) {
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("authenticated", true)
            setAuth(true)
            navigate("/")
        }
    }

    return (
        <div className={styles.login}>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <p>Faça login para compartilhar seus conhecimentos</p>

                <label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="Digite seu email" 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email} 
                    />
                </label>

                <label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="Digite sua senha" 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password} 
                    />
                </label>

                <input type="submit" value="Login" />
            </form>
        </div>
    )
}

export default Login