const Content= require('../controllers/contentController')
const User = require('../models/Content')

module.exports = {
    
    createContent: (params) => {
        
        return new Promise((resolve, reject) => {
            User.findById(params.id)
                .then(user => {
                    const newContent = new Content({
                        title: params.content.title,
                        body: params.content.body,
                        user_id: user._id,
                        completed: params.content.completed
                    })
                    
                    newContent.save()
                        .then(savedContent => {
                            user.content.push(savedContent)

                            user.save()
                                .then(() => resolve(savedContent))
                                .catch(error => reject(error))
                        })
                        .catch(error => reject(error))
                })
                .catch(error => reject(error))
        })
    },

    
    // getAllContent: (id) => {
    //     return new Promise((resolve, reject) => {
    //         User.findById(id, ' email')
    //             .populate('content', '-user_id -__v')
    //             .exec((err, user) => {
    //                 if (err) reject(err)
    //                 else     resolve(user)
    //             })
    //     })
    // }
}