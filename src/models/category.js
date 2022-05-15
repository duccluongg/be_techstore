const mongoose = require("mongoose")
const Schema = mongoose.Schema

const categorySchema = new Schema(
  {
    name: String,
    thumbnail: String,
    created_at: { type: String, default: new Date() },
    updated_at: { type: String, default: null },
  }
)

categorySchema.virtual('id').get(function(){
  return this._id.toHexString()
})
categorySchema.set('toJSON', {
  virtuals: true
})

module.exports = mongoose.model('Category', categorySchema)
