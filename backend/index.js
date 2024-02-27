const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const connection = require("./database/db")

const categoriesController = require("./categories/CategoriesController")
const articlesController = require("./articles/ArticlesController")

const Category = require("./categories/Category")
const Article = require("./articles/Article")

// Body Parser and Cors
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)
app.use(express.json())
app.use(cors())

// Database
connection
  .authenticate()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log(err))

// Controller Routes
app.use("/", categoriesController)
app.use("/", articlesController)

app.get("/", (req, res) => {
  res.send("Bem-vindo ao meu site")
})

app.listen(3000, () => {
  console.log("Server running!")
})
