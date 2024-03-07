const express = require("express")
const router = express.Router()
const User = require("./User")

router.get("/admin/users", (req, res) => {
    res.send("rota de listagem de usuarios")
})

module.exports = router