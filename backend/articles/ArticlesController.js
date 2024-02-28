const express = require("express")
const router = express.Router()
const Category = require("../categories/Category")

// Get All Categories
router.get("/admin/articles/new", async (req, res) => {
  try {
    const categories = await Category.findAll()
    res.status(200).json(categories)
  } catch (error) {
    res.status(400).json({ message: error })
  }
})

module.exports = router
