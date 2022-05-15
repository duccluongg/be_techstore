const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ratingResponseSchema = new Schema(
  {
    comment: String,
    rating_id: { type: Schema.Types.ObjectId, ref: 'Rating' },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    created_at: { type: String, default: new Date() },
    updated_at: { type: String, default: null },
  }
)

ratingResponseSchema.virtual('id').get(function(){
  return this._id.toHexString()
})
ratingResponseSchema.virtual('user').get(function(){
  return this.user_id
})
ratingResponseSchema.virtual('rating').get(function(){
  return this.rating_id
})

ratingResponseSchema.set('toJSON', {
  virtuals: true
})

module.exports = mongoose.model('RatingResponse', ratingResponseSchema)
