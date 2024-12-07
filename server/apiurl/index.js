const userRoute = require('../router/user.router')
const categoryRoute = require('../router/category.router')
const productRoute = require('../router/product.router')
const finalRoute = (app) => {
    app.use('/api/user', userRoute)
    app.use('/api/category', categoryRoute)
    app.use('/api/product', productRoute)
}

module.exports = finalRoute