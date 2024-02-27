const express = require("express")
const router = express.Router()
const Category = require("./Category")
const slugify = require("slugify")

router.post("/categories/save", (req, res) => {
  const title = req.body.title
  if (title != undefined) {
    Category.create({
      title,
      slug: slugify(title)
    })
  }
})

module.exports = router
