require("dotenv").config()
const Sequelize = require("sequelize")

const connection = new Sequelize("blog_project", process.env.DB_USERNAME, process.env.DB_PASS, {
  host: process.env.DB_ADDRESS,
  dialect: "mysql",
  logging: false,
  timezone: "-03:00",
})

module.exports = connection
