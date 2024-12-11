const categoryController = require('../controller/category.controller');

const router = require('express').Router();

router
    .route('/')
    .post(categoryController.store)
    .get(categoryController.index)

router.route('/:id')
    .delete(categoryController.trash)
    .put(categoryController.update)

module.exports = router