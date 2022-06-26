const ratingService = require("../services/RatingService")

class RatingController {
  async getAll(req, res, next) {
    const response = await ratingService.getAll()

    return res.status(200).json(response)
  }

  async getRatingsOfProduct(req, res, next) {
    const { product_id } = req.params
    const response = await ratingService.getRatingsOfProduct({ product_id })

    return res.status(200).json(response)
  }
}

module.exports = new RatingController()
