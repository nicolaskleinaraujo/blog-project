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
            setAuth(true)
            navigate("/")
        }
    }

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    <span>Email: </span>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email} 
                    />
                </label>

                <label>
                    <span>Senha: </span>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
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