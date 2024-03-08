// Modules
import { Outlet, Navigate } from "react-router-dom"
import { useContext } from "react"

// Context
import { AuthContext } from "../context/AuthContext"

const PrivateRoutes = () => {
    const { auth } = useContext(AuthContext)

    return (
        auth ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes