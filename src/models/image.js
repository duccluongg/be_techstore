const mongoose = require("mongoose")
const Schema = mongoose.Schema

const imageSchema = new Schema(
  {
    url: String,
    label: String,
    created_at: { type: String, default: new Date() },
    updated_at: { type: String, default: null },
  }
)

imageSchema.virtual('id').get(function(){
  return this._id.toHexString()
})
imageSchema.set('toJSON', {
  virtuals: true
})

module.exports = mongoose.model('Image', imageSchema)
