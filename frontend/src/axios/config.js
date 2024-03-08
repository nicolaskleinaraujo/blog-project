import axios from "axios"

const dbFetch = axios.create({
  baseURL: "http://localhost:3000",
})

const axiosConfig = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token")
  }
}

module.exports = dbFetch, axiosConfig
