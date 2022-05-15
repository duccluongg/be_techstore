const brandRepo = require("../repositories/BrandRepository")

class BrandService {
  async getAll() {
    const categories = await brandRepo.findAll()

    return categories ? categories : []
  }

  async getDetail({ _id }) {
    const category = await brandRepo.findById({ _id })

    return category ? category : []
  }
}

module.exports = new BrandService()
