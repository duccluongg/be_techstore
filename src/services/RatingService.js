const ratingRepo = require("../repositories/RatingRepository")

class RatingService {
  async getAll() {
    const ratings = await ratingRepo.getAll()

    return ratings ? ratings : []
  }

  async getRatingsOfProduct({ product_id }) {
    const ratings = await ratingRepo.getRatingsOfProduct({ product_id })

    return ratings ? ratings : []
  }
}

module.exports = new RatingService()
