const brandService = require("../services/BrandService")

class BrandController {
  async getAll(req, res, next) {
    const response = await brandService.getAll()

    return res.status(200).json(response)
  }

  async getDetail(req, res, next) {
    const { id } = req.params
    const response = await brandService.getDetail({ _id: id })

    return res.status(200).json(response)
  }
}

module.exports = new BrandController()
