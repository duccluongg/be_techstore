const Models = require('../models')

class ProductRepository {
  async create({ name, thumbnail, price, sale_price, specifications, short_description, brand_id, category_id, name_latin, description }) {
    const product = new Models.Product({ name, thumbnail, price, sale_price, specifications, short_description, brand_id, category_id, name_latin, description })
    product.save()

    return product
  }

  async update({ _id, name, thumbnail, price, sale_price, specifications, short_description, brand_id, category_id, name_latin, description }) {
    const product = await Models.Product.findOne({ _id })
    
    product.name = name ? name : product.name
    product.thumbnail = thumbnail ? thumbnail : product.thumbnail
    product.price = price ? price : product.price
    product.sale_price = sale_price ? sale_price : product.sale_price
    product.specifications = specifications ? specifications : product.specifications
    product.short_description = short_description ? short_description : product.short_description
    product.brand_id = brand_id ? brand_id : product.brand_id
    product.category_id = category_id ? category_id : product.category_id
    product.name_latin = name_latin ? name_latin : product.name_latin
    product.description = description ? description : product.description

    product.save()

    return product
  }

  async delete({ _id }) {
    try {
      await Models.Product.deleteOne({ _id })

      return 'Delete product success'
    } catch (error) {
      return 'Error'
    }
  }

  async getAllPaginate({ page, page_size, search_name, category, brand, price_lowest, price_highest }) {
    // query documents based on condition
    let query={}
    if(search_name){
      query.name = { $regex: '.*' + search_name + '.*', $options: "i" }
    }
    if(category){
      query.category_id = category
    }
    if(brand){
      query.brand_id = brand
    }
    if(price_lowest){
      query.price = { $gte: price_lowest }
    }
    if(price_highest){
      query.price = { $lte: price_highest }
    }

    let options = {
      page: page ? page : 1,
      limit: page_size ? page_size : 5,
      populate: [
        {
          path: 'brand_id',
          select: '_id name'
        },
        {
          path: 'category_id',
          select: 'id name thumbnail'
        }
      ],
    }

    // Search products by name (only response name)
    if ((page_size !== undefined && search_name !== undefined) && (category === undefined && brand === undefined && price_lowest === undefined && price_highest === undefined)) {
      options = {
        page: page ? page : 1,
        limit: page_size ? page_size : 5,
        select: 'id name name_latin'
      }
    }

    const products = await Models.Product.paginate(query, options)

    return {
      links: {
        next: products.nextPage,
        previous: products.prevPage,
      },
      total: products.totalDocs,
      page: products.page,
      page_size: products.limit,
      results: products.docs,
    }
  }

  async findById({ _id }) {
    const product = await Models.Product.findOne({ _id })

    return product
  }

  async findByIdPopulate({ _id }) {
    const product = await Models.Product.findOne({ _id }).populate({
      path: "brand_id category_id"
    });

    return product
  }

  async findByListId({ list_id }) {
    const cartItemListDeleted = await Models.Product.find({ _id: { $in: list_id }});

    return cartItemListDeleted;
  }
}

module.exports = new ProductRepository()
