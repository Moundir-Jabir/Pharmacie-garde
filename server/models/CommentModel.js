const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    
    clientname: {
        type: String,
        required : true,
    }, 

    clientcomment: {
        type: String,
        required : true,
    }, 

    commentID : {
        type: mongoose.Types.ObjectId,
        ref: 'PharmacieModel'
    },
    
    
    
})

module.exports = mongoose.model('comment', commentSchema)
