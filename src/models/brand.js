const mongoose = require("mongoose")
const Schema = mongoose.Schema

const brandSchema = new Schema(
  {
    name: String,
    created_at: { type: String, default: new Date() },
    updated_at: { type: String, default: null },
  }
)

brandSchema.virtual('id').get(function(){
  return this._id.toHexString()
})
brandSchema.set('toJSON', {
  virtuals: true
})

module.exports = mongoose.model('Brand', brandSchema)
