const dotenv = require("dotenv").config()
const jwt = require("jsonwebtoken")

function adminAuth(req, res, next) {
  const authHeader = req.headers["authorization"]

  if (authHeader != null) {
    const authToken = authHeader.split(" ")[1]
    
    jwt.verify(authToken, process.env.jwt_secret, (err, data) => {
      if (err) {
        res.status(401).json({ message: "Invalid Token" })
      } else {
        next()
      }
    })
  } else {
    res.status(401).json({ message: "Invalid Token" })
  }
}

module.exports = adminAuth
