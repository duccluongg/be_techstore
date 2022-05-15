const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productImageSchema = new Schema(
  {
    product_id: { type: Schema.Types.ObjectId, ref: 'Product' },
    image_id: { type: Schema.Types.ObjectId, ref: 'Image' },
  }
)

productImageSchema.virtual('id').get(function(){
  return this._id.toHexString()
})
productImageSchema.virtual('product').get(function(){
  return this.product_id
})

productImageSchema.set('toJSON', {
  virtuals: true
})

module.exports = mongoose.model('ProductImage', productImageSchema)
