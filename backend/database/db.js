require("dotenv").config()
const Sequelize = require("sequelize")

const connection = new Sequelize("blog_project", "root", process.env.db_pass, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  timezone: "-03:00",
})

module.exports = connection
