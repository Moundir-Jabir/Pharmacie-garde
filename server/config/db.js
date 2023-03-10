const mongoose = require('mongoose')
const db = process.env.MONGO_URI

const connectDB = async () => {
    try {
         mongoose.set('strictQuery', true)
        await mongoose.connect(db)
        console.log('Database connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB