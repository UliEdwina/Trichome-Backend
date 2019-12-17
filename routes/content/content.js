const express = require('express');
const  router = express.Router();
const passport = require('passport')



const contentController = require('./controllers/contentController')

// router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
//     todoController.getAllcontent(req.query.id)
//         .then(content  => res.json(content))
//         .catch(error => res.json(error))
// })

router.post('/createcontent', passport.authenticate('jwt', {session: false}), (req, res) => {

           
                    contentController.createContent(req.body)
            .then(content => res.json(content))
    .catch(error => res.json(error))
})


module.exports = router;

