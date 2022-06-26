const Models = require('../models');

class RatingRepository {
  async createRating({ user, product_id, comment, rate }) {
    let rating = new Models.Rating({
      product_id,
      comment,
      rate,
      responses: [],
      user_id: user._id,
    });

    rating.save();

    return rating;
  }

  async findById({ _id }) {
    const rating = await Models.Rating.findOne({ _id });

    return rating;
  }

  async createRatingResponse({ comment, rating_id, user_id }) {
    const ratingResponse = new Models.RatingResponse({
      comment,
      rating_id,
      user_id,
    });
    ratingResponse.save();

    return ratingResponse;
  }

  async findAllOfAUserByProductId({ product_id, user_id }) {
    const ratings = await Models.Rating.find({ product_id, user_id }).populate(
      'user_id',
      'id name role' // -password: Explicitly exclude `password`)
    );

    return ratings;
  }

  async getRatingsOfProduct({ product_id }) {
    const ratings = await Models.Rating.find({ product_id }).populate([
      {
        path: 'user_id',
        select: 'id name role'
      },
      {
        path: 'responses',
        populate: {
          path: 'user_id',
          select: 'id name role'
        }
      } 
    ]);

    return ratings;
  }

  async updateRatingResponse({ ratingId, ratingResponseId }) {
    const rating = await Models.Rating.findOne({ _id: ratingId });

    rating.responses.push(ratingResponseId)

    rating.save()
  }
  
  async getAll() {
    const ratings = await Models.Rating.find()

    return ratings
  }
}

module.exports = new RatingRepository();
