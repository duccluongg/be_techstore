const categoryRepo = require("../repositories/CategoryRepository")

class CategoryService {
  async getAll() {
    const categories = await categoryRepo.findAll()

    return categories ? categories : []
  }

  async getDetail({ _id }) {
    const category = await categoryRepo.findById({ _id })

    return category ? category : []
  }
}

module.exports = new CategoryService()
