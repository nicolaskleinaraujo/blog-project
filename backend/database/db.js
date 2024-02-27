const Sequelize = require("sequelize")

const connection = new Sequelize("blog_project", "root", "Geleia1126?", {
  host: "localhost",
  dialect: "mysql",
})

module.exports = connection
