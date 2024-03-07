const express = require("express")
const router = express.Router()
const User = require("./User")

router.get("/admin/users", (req, res) => {
  res.send("rota de listagem de usuarios")
})

// User save route
router.post("/users/save", async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  if (email === undefined || password === undefined) {
    res.status(400).json({ message: "Failed to save user" })
    return
  }

  await User.create({
    email,
    password,
  })
  res.status(200).json({ message: "User created succesfully" })
})

module.exports = router
