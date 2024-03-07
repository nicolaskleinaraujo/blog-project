// CSS
import styles from "./Login.module.css"

// Modules
import dbFetch from "../../../axios/config"
import { useState, useEffect } from "react"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault
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