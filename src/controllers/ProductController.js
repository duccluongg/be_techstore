const productService = require("../services/ProductService")
const ratingService = require("../services/RatingService")

class ProductController {
  async getAll(req, res, next) {
    const { page, page_size, search_name, category, brand, price_lowest, price_highest } = req.query
    const response = await productService.getAllPaginate({ page, page_size, search_name, category, brand, price_lowest, price_highest })

    return res.status(200).json(response)
  }

  async getDetail(req, res, next) {
    const { id } = req.params
    const response = await productService.getDetail({ _id: id })

    return res.status(200).json(response)
  }
  
  async getProductSuggestion(req, res, next) {
    return 'Updating...'
  }

  async getProductsBoughtBySameUsers(req, res, next) {
    return 'Updating...'
  }
}

module.exports = new ProductController()
