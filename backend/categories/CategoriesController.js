const express = require("express")
const router = express.Router()
const Category = require("./Category")
const slugify = require("slugify")

router.post("/categories/save", (req, res) => {
  const title = req.body.title
  if (title != undefined) {
    Category.create({
      title,
      slug: slugify(title),
    })
  } else {
    return
  }
})

router.get("/admin/categories", async (req, res) => {
  try {
    const categories = await Category.findAll()
    res.status(200).json(categories)
  } catch (error) {
    console.log(error)
  }
})

router.delete("/categories/delete/:id", (req, res) => {
  const id = req.params.id
  if (!isNaN(id)) {
    Category.destroy({
      where: {
        id: id
      }
    })
  } else {
    return
  }
})

module.exports = router
