function adminAuth(req, res, next) {
  if (req.session.user) {
    next()
    return true
  } else {
    return false
  }
}

module.exports = adminAuth
