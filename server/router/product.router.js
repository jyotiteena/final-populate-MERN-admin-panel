const productController = require('../controller/product.controller');

const router = require('express').Router();

router
    .route('/')
    .post(productController.store)
    .get(productController.index)

router.route('/:id')
    .delete(productController.trash)
    .put(productController.update)


module.exports = router