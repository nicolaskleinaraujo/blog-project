const dotenv = require("dotenv").config()
const express = require("express")
const router = express.Router()
const User = require("./User")
const bcrypt = require("bcryptjs")
const adminAuth = require("../middlewares/adminAuth")
const jwt = require("jsonwebtoken")

// User save route
router.post("/users/save", async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  const testEmail = await User.findOne({
    where: { email },
  })
  if (testEmail != undefined) {
    res.status(400).json({ message: "This email is already cadastered" })
    return
  }

  if (email === undefined || password === undefined) {
    res.status(400).json({ message: "Failed to save user" })
    return
  }

  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)

  await User.create({
    email,
    password: hash,
  })
  res.status(200).json({ message: "User created succesfully" })
})

// Authenticate login route
router.post("/authenticate", async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  const user = await User.findOne({
    where: {
      email,
    },
  })
  if (user === null) {
    res.status(400).json({ message: "Incorrect credentials" })
    return
  }

  const testPassword = bcrypt.compareSync(password, user.password)

  if (testPassword) {
    jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.jwt_secret,
      { expiresIn: "48h" },
      (err, token) => {
        if (err) {
          res.status(400).json({ message: "Incorrect credentials" })
        } else {
          res.status(200).json({ message: "Logged succesfully", token })
        }
      }
    )
  } else {
    res.status(400).json({ message: "Incorrect credentials" })
  }
})

// Try Authenticate Route
router.get("/try-authenticate", adminAuth,async(req, res) => {
  res.status(200).json({msg: "deu certo"})
})

module.exports = router
