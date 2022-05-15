const productRepo = require("../repositories/ProductRepository")

class ProductService {
  async getAllPaginate({ page, page_size, search_name, category, brand, price_lowest, price_highest }) {
    const products = await productRepo.getAllPaginate({ page, page_size, search_name, category, brand, price_lowest, price_highest })

    return products ? products : []
  }

  async getDetail({ _id }) {
    const product = await productRepo.findByIdPopulate({ _id })

    return product ? product : []
  }
}

module.exports = new ProductService()
