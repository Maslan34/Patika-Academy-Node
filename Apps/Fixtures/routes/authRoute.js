const express = require('express');
const authController = require('../controller/authController');

const router = express.Router();

router.route('/').post(authController.addNewUser);
router.route('/login').post(authController.login);
router.route('/logout').get(authController.logout);
router.route('/dashboard').get(authController.getUser);







module.exports = router;