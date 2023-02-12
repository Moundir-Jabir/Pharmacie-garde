const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PharmacieSchema = new Schema({
    image: {
        type: [String],
        required: true,
    },
    name : {
        type : String,
        required : true,
        min : 6,
        max : 50
    },
    address : {
        type : String,
        required : true,
    },
    phone : {
        type :String,
        required : true,
    },
    latitude :{
        type : Number,
        required : true
    },
    longtitude :{
        type : Number,
        required : true
    }, status : {
        type :String,
        required : true,
    },
    date_start :{
        type : Date,
        required : true
    },
    date_end :{
        type : Date,
        required : true
    }
})


module.exports = mongoose.model('PharmacieModel',  PharmacieSchema);