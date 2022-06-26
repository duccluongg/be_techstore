const ratingRepo = require("../repositories/RatingRepository")

class RatingService {
  async getRatingsOfProduct({ product_id }) {
    const ratings = await ratingRepo.getRatingsOfProduct({ product_id })

    return ratings ? ratings : []
  }

  async getAllRatingByProductId({ product_id }) {
    const ratings = await ratingRepo.getAllRatingByProductId({ product_id })

    return ratings ? ratings : []
  }
}

module.exports = new RatingService()
