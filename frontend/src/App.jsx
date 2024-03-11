// Modules
import dbFetch from "./axios/config"
import { useEffect } from "react"

// Routes
import Router from "./utils/Router"

function App() {
  const tryAuth = async() => {
    const res = await dbFetch.get("/try-authenticate", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })

    if (res.status === 200) {
      localStorage.setItem("authenticated", true)
    } else {
      localStorage.setItem("authenticated", false)
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
