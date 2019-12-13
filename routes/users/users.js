var express = require('express');
var router = express.Router();


const userController = require('./Controller/userController')

// GET users listing. 
router.get('/', userController.getAllUsers);

router.post('/singleUser', userController.getUserEmail)

router.post('/usersignupandin', userController.userSignUpandIn);

module.exports = router;

