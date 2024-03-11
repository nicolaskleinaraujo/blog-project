// Modules
import { Outlet, Navigate } from "react-router-dom"

const PrivateRoutes = () => {
    let authenticated
    if (localStorage.getItem("authenticated")){
        authenticated = true
    } else {
        authenticated = false
    }

    return (
        authenticated ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes