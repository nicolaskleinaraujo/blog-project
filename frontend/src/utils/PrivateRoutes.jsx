// Modules
import { Outlet, Navigate } from "react-router-dom"

const PrivateRoutes = () => {
    if (localStorage.getItem("authenticated") === "true"){
        var authenticated = true
    } else {
        var authenticated = false
    }

    return (
        authenticated ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes