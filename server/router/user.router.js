const userController = require('../controller/user.controller');

const router = require('express').Router();

router
    .route('/')
    .post(userController.store)
    .get(userController.index)

module.exports = router