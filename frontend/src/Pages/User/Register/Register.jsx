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
        <div>
            <h1>Criar Conta</h1>

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

                <input type="submit" value="Criar" />
            </form>
        </div>
    )
}

export default Register