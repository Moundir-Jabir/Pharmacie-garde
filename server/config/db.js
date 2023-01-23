const mongoose = require('mongoose')
const db = process.env.MONGO_URI

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URL_MONGOOSE)
        console.log('Database connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB