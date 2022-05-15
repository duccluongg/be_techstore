const categoryService = require("../services/CategoryService")

class CategoryController {
  async getAll(req, res, next) {
    const response = await categoryService.getAll()

    return res.status(200).json(response)
  }

  async getDetail(req, res, next) {
    const { id } = req.params
    const response = await categoryService.getDetail({ _id: id })

    return res.status(200).json(response)
  }
}

module.exports = new CategoryController()
