const express = require("express")
const app = express()
const bodyParser = require("body-parser")

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Bem-vindo ao meu site")
})

app.listen(3000, () => {
  console.log("Server running!")
})
