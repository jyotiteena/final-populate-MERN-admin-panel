const upload = require('../config/imageUpload');
const productController = require('../controller/product.controller');

const router = require('express').Router();

router
    .route('/')
    .post(upload.single('p_image_url'), productController.store)
    .get(productController.index)

router.route('/:id')
    .delete(productController.trash)
    .put(upload.single('p_image_url'), productController.update)


module.exports = router