const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PharmacieSchema = new Schema({
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
    date :{
        type : Date,
        default : Date.now()
    }
})


module.exports = mongoose.model('PharmacieModel',  PharmacieSchema);