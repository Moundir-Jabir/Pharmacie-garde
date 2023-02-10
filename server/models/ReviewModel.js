const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ReviewSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    review : {
        type : Number,
        required : true,
        enum: [0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5]
    },
    idPharamcie : {
        type : mongoose.Types.ObjectId, 
        ref: 'PharmacieModel'
    }
})

module.exports = mongoose.model('ReviewModel',  ReviewSchema);