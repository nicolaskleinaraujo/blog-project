const express = require("express")
const app = express()
const cors = require("cors")
const connection = require("./database/db")
const port = process.env.PORT || 3000

const categoriesController = require("./categories/CategoriesController")
const articlesController = require("./articles/ArticlesController")
const usersController = require("./users/UsersController")

// Cors and Sessions
app.use(express.json())
app.use(
  cors({
    origin: "https://nk-blog-project.netlify.app",
    credentials: true,
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

app.listen(port, () => {
  console.log("Server running!")
})
