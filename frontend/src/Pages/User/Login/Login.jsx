// CSS
import styles from "./Login.module.css"

// Modules
import dbFetch from "../../../axios/config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate()
    

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [token, setToken] = useState("")
    const handleSubmit = async(e) => {
        e.preventDefault()
        setEmail("")
        setPassword("")

        const res = await dbFetch.post("/authenticate", {
            email,
            password
        })
        console.log(res)
        setToken(res.data.token)
        console.log(token)

        if(res.status === 200) {
            localStorage.setItem("token", token)
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