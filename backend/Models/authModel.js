const moongose = require('mongoose')

const adminSchema = moongose.Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: [true, "please enter a email"],
        unique: true
    },
    password: {
        type: String
    },
    eToken: {
        type: String,
    },
    isReset: {
        type: Boolean
    }
}, {
    timestamps: true
})

module.exports = moongose.model('admin', adminSchema)