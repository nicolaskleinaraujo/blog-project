const express = require("express")
const router = express.Router()
const Article = require("./Article")
const Category = require("../categories/Category")
const slugigy = require("slugify")

// Get All Articles
router.get("/admin/articles", async (req, res) => {
  try {
    const articles = await Article.findAll({
      order: [["id", "DESC"]],
      include: [{ model: Category }],
    })
    res.status(200).json(articles)
  } catch (error) {
    res.status(400).json(error)
  }
})

// Article Save Route
router.post("/articles/save", async (req, res) => {
  const title = req.body.title
  const body = req.body.body
  const category = req.body.category

  if (title === undefined || body === undefined || category === undefined) {
    res.status(400).json({ message: "Failed to save article" })
    return
  }

  await Article.create({
    title,
    slug: slugigy(title),
    body,
    categoryId: category,
  })
  res.status(200).json({ message: "Article created succesfully" })
})

// Delete Article
router.delete("/articles/delete/:id", async (req, res) => {
  const id = req.params.id

  if (isNaN(id)) {
    res.status(400).json({ message: `${id} isn't a valid id` })
    return
  }

  await Article.destroy({
    where: {
      id,
    },
  })
  res.status(200).json({ message: "Article deleted succesfully" })
})

// Get Article By ID (used to update category)
router.get("/articles/:id", async (req, res) => {
  const id = req.params.id

  if (isNaN(id)) {
    res.status(400).json({ message: `${id} isn't a valid id` })
    return
  }

  await Article.findOne({
    where: {
      id
    },
    include: [{ model: Category }]
  }).then((article) => {
    if (article === null) {
      res.status(400).json({ message: "Article not found" })
      return
    }
    res.status(200).json({ article })
  })
})

// Find Article By Slug
router.get("/article/:slug", async (req, res) => {
  const slug = req.params.slug

  try {
    const article = await Article.findOne({
      where: {
        slug,
      },
      include: [{ model: Category }],
    })
    res.status(200).json(article)
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router
