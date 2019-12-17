const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ContentSchema = new mongoose.Schema({
    title : {type: String, required: ""},
    body: {type: String, required: ""},
    user_id:   { type: Schema.Types.ObjectId, ref: 'content' },
    completed: { type: Boolean, default: false }
      
})

module.exports = mongoose.model('content', ContentSchema)