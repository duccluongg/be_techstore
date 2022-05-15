const adminService = require("../services/AdminService")

class AdminController {
  // USER
  async getListUser(req, res, next) {
    const response = await adminService.getListUser()

    return res.status(200).json(response)
  }

  async deleteUser(req, res, next) {
    const { id } = req.params
    
    const response = await adminService.deleteUser({ _id: id })

    return res.status(200).json(response)
  }

  // RATING
  async responseOfARating(req, res, next) {
    const { comment } = req.body
    const { rating_id } = req.params
    const user = req.payload

    const response = await adminService.responseOfARating({ comment, rating_id, user })

    return res.status(200).json(response)
  }

  // ORDER
  async getOrderList(req, res, next) {
    const response = await adminService.getListOrder()

    return res.status(200).json(response)
  }

  async updateOrderStatus(req, res, next) {
    const { status } = req.body
    const { id } = req.params
    
    const response = await adminService.updateOrderStatus({ _id: id, status })

    return res.status(200).json(response)
  }

  // PRODUCT
  async createProduct(req, res, next) {
    const { name, thumbnail, price, sale_price, specifications, short_description, brand_id, category_id, name_latin, description } = req.body
    
    const response = await adminService.createProduct({ name, thumbnail, price, sale_price, specifications, short_description, brand_id, category_id, name_latin, description })

    return res.status(200).json(response)
  }

  async updateProduct(req, res, next) {
    const { id } = req.params
    const { name, thumbnail, price, sale_price, specifications, short_description, brand_id, category_id, name_latin, description } = req.body
    
    const response = await adminService.updateProduct({ _id: id, name, thumbnail, price, sale_price, specifications, short_description, brand_id, category_id, name_latin, description })

    return res.status(200).json(response)
  }

  async deleteProduct(req, res, next) {
    const { id } = req.params
    
    const response = await adminService.deleteProduct({ _id: id })

    return res.status(200).json(response)
  }

  // CATEGORY
  async createCategory(req, res, next) {
    const { name, thumbnail } = req.body
    
    const response = await adminService.createCategory({ name, thumbnail })

    return res.status(200).json(response)
  }

  async updateCategory(req, res, next) {
    const { id } = req.params
    const { name, thumbnail } = req.body
    
    const response = await adminService.updateCategory({ _id: id, name, thumbnail })

    return res.status(200).json(response)
  }

  async deleteCategory(req, res, next) {
    const { id } = req.params
    
    const response = await adminService.deleteCategory({ _id: id })

    return res.status(200).json(response)
  }

  // BRAND
  async createBrand(req, res, next) {
    const { name } = req.body
    
    const response = await adminService.createBrand({ name })

    return res.status(200).json(response)
  }

  async updateBrand(req, res, next) {
    const { id } = req.params
    const { name } = req.body
    
    const response = await adminService.updateBrand({ _id: id, name })

    return res.status(200).json(response)
  }

  async deleteBrand(req, res, next) {
    const { id } = req.params
    
    const response = await adminService.deleteBrand({ _id: id })

    return res.status(200).json(response)
  }
}

module.exports = new AdminController()
