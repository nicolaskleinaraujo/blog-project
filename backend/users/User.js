const Sequelize = require("sequelize")
const connection = require("../database/db")

const User = connection.define("users", {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

module.exports = Category