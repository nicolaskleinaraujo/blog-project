// Modules
import dbFetch from "./axios/config"
import { useEffect, useContext } from "react"

// Context
import { AuthContext } from "./context/AuthContext"

// Router
import Router from "./utils/Router"

function App() {
  const { setAuth } = useContext(AuthContext)

  const tryAuth = async() => {
    try {
      await dbFetch.get("/try-authenticate", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })

      localStorage.setItem("authenticated", true)
      setAuth(true)
    } catch (error) {
      localStorage.setItem("authenticated", false)
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
