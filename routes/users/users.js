var express = require('express');
var router = express.Router();

const userController = require('./Controller/userController')

// GET users listing. 
router.get('/',  (req, res, next) => {
    res.send("respond with resource")
});



// router.post('/login', userController.logIn)

router.post('/usersignupandlogin', userController.userSignUp 

)

module.exports = router;

