const userRepo = require("../repositories/UserRepository")
const ratingRepo = require("../repositories/RatingRepository")
const orderRepo = require("../repositories/OrderRepository")
const productRepo = require("../repositories/ProductRepository")
const categoryRepo = require("../repositories/CategoryRepository")
const brandRepo = require("../repositories/BrandRepository")

class AdminService {
  // USER
  async getListUser() {
    const users = await userRepo.getListPaginate()

    // return {
    //   status: 200,
    //   error: 0,
    //   message: "get_list_user_success",
    //   data: users,
    // }

    return users ? users : []
  }

  async deleteUser({ _id }) {
    try {
      await userRepo.deleteUser({ _id })

      return 'Delete user success'
    } catch (error) {
      return 'Error, can not delete user'
    }
  }

  // RATING
  async responseOfARating({ comment, rating_id, user }) {
    const ratingCheck = ratingRepo.findById({ _id: rating_id })

    let ratingResponse = await ratingRepo.createRatingResponse({ comment, rating_id, user_id: user._id })

    ratingResponse['user'] = {
      _id: user._id,
      name: user.name,
      role: user.role
    }

    // return {
    //   status: 200,
    //   error: 0,
    //   message: "success",
    //   data: {
    //     id: ratingResponse._id,
    //     comment: ratingResponse.comment,
    //     created_at: ratingResponse.created_at,
    //     updated_at: ratingResponse.updated_at,
    //     rating: ratingCheck.rate,
    //     user: {
    //       id: user.id,
    //       name: user.name,
    //       role: user.role
    //     }
    //   },
    // }

    return {
      id: ratingResponse._id,
      comment: ratingResponse.comment,
      created_at: ratingResponse.created_at,
      updated_at: ratingResponse.updated_at,
      rating: ratingCheck.rate,
      user: {
        id: user.id,
        name: user.name,
        role: user.role
      }
    }
  }

  // ORDER
  async getListOrder() {
    const orders = await orderRepo.getAll()

    return orders ? orders : []
  }

  async updateOrderStatus({ _id, status }) {
    const order = await orderRepo.updateStatus({ _id, status })

    return order ? order : []
  }

  async orderDetail({ _id }) {
    const order = await orderRepo.getDetail({ _id })

    return order ? order : []
  }

  // PRODUCT
  async createProduct({ name, thumbnail, price, sale_price, specifications, short_description, brand_id, category_id, name_latin, description }) {
    const product = await productRepo.create({ name, thumbnail, price, sale_price, specifications, short_description, brand_id, category_id, name_latin, description })

    return product ? product : []
  }

  async updateProduct({ _id, name, thumbnail, price, sale_price, specifications, short_description, brand_id, category_id, name_latin, description }) {
    const checkProduct = await productRepo.findById({ _id })

    if (!checkProduct) return 'Product not found'

    const product = await productRepo.update({ _id, name, thumbnail, price, sale_price, specifications, short_description, brand_id, category_id, name_latin, description })

    return product ? product : []
  }

  async deleteProduct({ _id }) {
    const checkProduct = await productRepo.findById({ _id })

    if (!checkProduct) return 'Product not found'

    const product = await productRepo.delete({ _id })

    return product ? product : []
  }

  // CATEGORY
  async createCategory({ name, thumbnail }) {
    const category = await categoryRepo.create({ name, thumbnail })

    return category ? category : []
  }

  async updateCategory({ _id, name, thumbnail }) {
    const checkCategory = await categoryRepo.findById({ _id })

    if (!checkCategory) return 'Category not found'

    const category = await categoryRepo.update({ _id, name, thumbnail })

    return category ? category : []
  }

  async deleteCategory({ _id }) {
    const checkCategory = await categoryRepo.findById({ _id })

    if (!checkCategory) return 'Category not found'

    const category = await categoryRepo.delete({ _id })

    return category ? category : []
  }

  // BRAND
  async createBrand({ name }) {
    const brand = await brandRepo.create({ name })

    return brand ? brand : []
  }

  async updateBrand({ _id, name }) {
    const checkBrand = await brandRepo.findById({ _id })

    if (!checkBrand) return 'Brand not found'

    const Brand = await brandRepo.update({ _id, name })

    return Brand ? Brand : []
  }

  async deleteBrand({ _id }) {
    const checkBrand = await brandRepo.findById({ _id })

    if (!checkBrand) return 'Brand not found'

    const brand = await brandRepo.delete({ _id })

    return brand ? brand : []
  }
}

module.exports = new AdminService()
