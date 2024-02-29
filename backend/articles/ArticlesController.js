const express = require("express")
const router = express.Router()
const Category = require("../categories/Category")
const Article = require("./Article")
const slugigy = require("slugify")

// Get All Categories
router.get("/admin/articles/new", async (req, res) => {
  try {
    const categories = await Category.findAll()
    res.status(200).json(categories)
  } catch (error) {
    res.status(400).json({ message: error })
  }
})

// Article Save Route
router.post("/articles/save", (req, res) => {
  const title = req.body.title
  const body = req.body.body
  const category = req.body.category

  if (title === undefined || body === undefined || category === undefined){
    res.status(400).json({ message: "Failed to save article" })
    return
  }

  Article.create({
    title,
    slug: slugigy(title),
    body,
    categoryId: category,
  })
  res.status(200).json({ message: "Article created succesfully" })
})

module.exports = router
