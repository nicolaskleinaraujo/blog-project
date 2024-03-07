const express = require("express")
const router = express.Router()
const Article = require("./Article")
const Category = require("../categories/Category")
const slugify = require("slugify")

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
    slug: slugify(title),
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
      id,
    },
    include: [{ model: Category }],
  }).then((article) => {
    if (article === null) {
      res.status(400).json({ message: "Article not found" })
      return
    }
    res.status(200).json({ article })
  })
})

// Update Article
router.post("/articles/update/:id", async (req, res) => {
  const id = req.params.id
  const title = req.body.title
  const body = req.body.body
  const category = req.body.category

  if (isNaN(id)) {
    res.status(400).json({ message: `${id} isn't a valid id` })
    return
  }

  await Article.update(
    {
      title,
      slug: slugify(title),
      body,
      categoryId: category,
    },
    { where: { id } }
  )
  res.status(200).json({ message: "Article updated succesfully" })
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
  } catch (err) {
    res.status(400).json(err)
  }
})

// Get pages to show articles
router.get("/articles/page/:num", async (req, res) => {
  const num = req.params.num
  let offset = 0

  if (isNaN(num) || num == 1) {
    offset = 0
  } else {
    offset = parseInt(num) * 4
  }

  try {
    const page = await Article.findAndCountAll({
      limit: 8,
      offset,
    })
    res.status(200).json(page)
  } catch (err) {
    res.status(400).json(err)
  }
})

module.exports = router
