const mongoose = require("mongoose")
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const productSchema = new Schema(
  {
    name: String,
    thumbnail: String,
    price: Number,
    sale_price: Number,
    specifications: String,
    short_description: String,
    brand_id: { type: Schema.Types.ObjectId, ref: 'Brand' },
    category_id: { type: Schema.Types.ObjectId, ref: 'Category' },
    name_latin: String,
    description: String,
    created_at: { type: String, default: new Date() },
    updated_at: { type: String, default: null },
  }
)

productSchema.virtual('id').get(function(){
  return this._id.toHexString()
})
productSchema.virtual('brand').get(function(){
  return this.brand_id
})
productSchema.virtual('category').get(function(){
  return this.category_id
})

productSchema.set('toJSON', {
  virtuals: true
})

productSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Product', productSchema)
