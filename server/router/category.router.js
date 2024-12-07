const categoryController = require('../controller/category.controller');

const router = require('express').Router();

router
    .route('/')
    .post(categoryController.store)
    .get(categoryController.index)

module.exports = router