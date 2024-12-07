const productController = require('../controller/product.controller');

const router = require('express').Router();

router
    .route('/')
    .post(productController.store)
    .get(productController.index)

module.exports = router