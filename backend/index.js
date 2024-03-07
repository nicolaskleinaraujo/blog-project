require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const session = require("express-session")
const connection = require("./database/db")

const categoriesController = require("./categories/CategoriesController")
const articlesController = require("./articles/ArticlesController")
const usersController = require("./users/UsersController")

// Body Parser, Cors and Sessions
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)
app.use(express.json())
app.use(cors())
app.use(
  session({
    secret: process.env.session_secret,
    cookie: { maxAge: 30000 },
  })
)

// Database
connection
  .authenticate()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log(err))

// Controller Routes
app.use("/", categoriesController)
app.use("/", articlesController)
app.use("/", usersController)

app.listen(3000, () => {
  console.log("Server running!")
})
