const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ReviewSchema = new Schema({
    review : {
        type : String,
        required : true
    },
    idPharamcie : {
        type : mongoose.Schema.Types.ObjectId, 
        ref: 'PharmacieModel'
    }
})

module.exports = mongoose.model('ReviewModel',  ReviewSchema);