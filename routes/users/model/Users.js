const mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
    nickName: ({type: String, required: true}),
    email: ({type: String, required: true}),
    password: ({type: String, required: true})
})

module.exports = mongoose.model('user', UserSchema)