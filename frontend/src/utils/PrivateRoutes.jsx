// Modules
import { Outlet, Navigate } from "react-router-dom"

const PrivateRoutes = () => {
    var authenticated
    if (localStorage.getItem("authenticated") === "true"){
        authenticated = true
    } else {
        authenticated = false
    }

    return (
        authenticated ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes