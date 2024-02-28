const express = require("express")
const router = express.Router()
const Category = require("./Category")
const slugify = require("slugify")

// Get All Categories
router.get("/admin/categories", async (req, res) => {
  try {
    const categories = await Category.findAll()
    res.status(200).json(categories)
  } catch (error) {
    res.status(400).json({ message: error })
  }
})

// Add New Category
router.post("/categories/save", (req, res) => {
  const title = req.body.title

  if (title === undefined) {
    res.status(400).json({ message: "Failed to save category" })
    return
  }

  Category.create({
    title,
    slug: slugify(title),
  })
  res.status(200).json({ message: "Category added succesfully" })
})

// Delete Category
router.delete("/categories/delete/:id", (req, res) => {
  const id = req.params.id

  if (isNaN(id)) {
    res.status(400).json({ message: `${id} isn't a valid id` })
    return
  }

  Category.destroy({
    where: {
      id,
    },
  })
  res.status(200).json({ message: "Category removed succesfully" })
})

// Get Category By ID (used to update category)
router.get("/categories/:id", (req, res) => {
  const id = req.params.id

  if (isNaN(id)) {
    res.status(400).json({ message: `${id} isn't a valid id` })
    return
  }

  Category.findByPk(id)
    .then((category) => {
      if (category === null) {
        res.status(400).json({ message: "Category not found" })
        return
      }
      res.status(200).json({ category })
    })
})

// Update Category
router.post("/categories/update/:id", (req, res) => {
  const id = req.params.id
  const title = req.body.title

  if (isNaN(id)) {
    res.status(400).json({ message: `${id} isn't a valid id` })
    return
  }

  Category.update(
    {
      title,
      slug: slugify(title),
    },
    { where: { id } }
  )
  res.status(200).json({ message: "Category updated succesfully" })
})

module.exports = router
