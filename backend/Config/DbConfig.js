const mongoose = require('mongoose')
const Admin = require('../Models/authModel')
const bycrpt = require('bcryptjs')
const crypto = require('crypto')
mongoose.set('strictQuery', false);

const connectDb = async () => {

    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`mongoose connected : ${conn.connection.host}`)

        const admin = {
            username: process.env.MONGO_USERNAME,
            email: process.env.MONGO_EMAIL,
            password: await bycrpt.hash(process.env.MONGO_PASSWORD, await bycrpt.genSalt(10)),
            eToken: crypto.randomBytes(64).toString('hex'),
            isReset: false
        }

        Admin.countDocuments({}, (err, count) => {
            if (err) {
                console.log(err)
                process.exit(1);
            }
            if (count === 0) {
                const adminUser = new Admin(admin)
                adminUser.save()
            }
        })

    } catch (error) {
        console.log(error)
    }
}
module.exports = connectDb