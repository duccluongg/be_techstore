const routePrefix = "/api"
const authRoute = require("./auth")
const adminRoute = require("./admin")
const userRoute = require("./user")
const productRoute = require("./product")
const categoryRoute = require("./category")
const brandRoute = require("./brand")
const ratingRoute = require("./rating")
const paymentRoute = require("./payment")
const orderRoute = require("./order")

function route(app) {
  app.use(`${routePrefix}/admin`, adminRoute)
  app.use(`${routePrefix}/user`, userRoute)
  app.use(`${routePrefix}/products`, productRoute)
  app.use(`${routePrefix}/categories`, categoryRoute)
  app.use(`${routePrefix}/brands`, brandRoute)
  app.use(`${routePrefix}/ratings`, ratingRoute)
  app.use(`${routePrefix}/payments`, paymentRoute)
  app.use(`${routePrefix}/orders`, orderRoute)
  app.use(`${routePrefix}`, authRoute)
}

module.exports = route
