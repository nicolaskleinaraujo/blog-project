const express = require("express")
const router = express.Router()
const Article = require("./Article")
const slugigy = require("slugify")

// Get All Articles
router.get("/admin/articles", async(req, res) => {
  try {
    const articles = await Article.findAll()
    res.status(200).json(articles)
  } catch (error) {
    res.status(400).json(error)
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
