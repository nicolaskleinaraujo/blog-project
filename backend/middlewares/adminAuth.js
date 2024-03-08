function adminAuth(req, res, next) {
  if (req.session.user != undefined) {
    next()
  } else {
    res.status(400).json(false)
  }
}

module.exports = adminAuth
