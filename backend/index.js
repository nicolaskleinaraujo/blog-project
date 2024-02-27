const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/db")

const categoriesController = require("./categories/CategoriesController")

// Body Parser
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)
app.use(express.json())

// Database
connection
  .authenticate()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log(err))

//
app.use("/", categoriesController)

app.get("/", (req, res) => {
  res.send("Bem-vindo ao meu site")
})

app.listen(3000, () => {
  console.log("Server running!")
})
