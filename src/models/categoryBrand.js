const mongoose = require("mongoose")
const Schema = mongoose.Schema

const categoryBrandSchema = new Schema(
  {
    category_id: { type: Schema.Types.ObjectId, ref: 'Category' },
    brand_id: { type: Schema.Types.ObjectId, ref: 'Brand' },
    created_at: { type: String, default: new Date() },
    updated_at: { type: String, default: null },
  }
)

categoryBrandSchema.virtual('id').get(function(){
  return this._id.toHexString()
})
categoryBrandSchema.virtual('category').get(function(){
  return this.created_at
})
categoryBrandSchema.virtual('brand').get(function(){
  return this.brand_id
})

categoryBrandSchema.set('toJSON', {
  virtuals: true
})

module.exports = mongoose.model('CategoryBrand', categoryBrandSchema)
