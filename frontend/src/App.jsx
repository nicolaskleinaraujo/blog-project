// Modules
import dbFetch from "./axios/config"
import { useEffect, useContext } from "react"

// Auth Context
import { AuthContext } from "./context/AuthContext"

// Routes
import Router from "./utils/Router"

function App() {
  const { setAuth } = useContext(AuthContext)

  const tryAuth = async() => {
    const res = await dbFetch.get("/try-authenticate", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })

    if (res.status === 200) {
      setAuth(true)
    } else {
      setAuth(false)
    }
  }

  useEffect(() => {
    tryAuth()
  }, [])

  return (
    <>
      <Router />
    </>
  )
}

export default App
