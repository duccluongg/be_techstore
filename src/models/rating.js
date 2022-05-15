const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ratingSchema = new Schema(
  {
    rate: Number,
    comment: String,
    is_solved: { type: Boolean, default: false },
    product_id: { type: Schema.Types.ObjectId, ref: 'Product' },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    responses: { type: [Schema.Types.ObjectId], ref: 'RatingResponse', default: [] },
    created_at: { type: String, default: new Date() },
    updated_at: { type: String, default: null },
  }
)

ratingSchema.virtual('id').get(function(){
  return this._id.toHexString()
})
ratingSchema.virtual('user').get(function(){
  return this.user_id
})
ratingSchema.virtual('product').get(function(){
  return this.product_id
})

ratingSchema.set('toJSON', {
  virtuals: true
})

module.exports = mongoose.model('Rating', ratingSchema)
