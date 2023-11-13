require('dotenv').config()
const express = require('express')
const connectDb = require('./Config/DbConfig')
const cors = require('cors')
const router = require('./Routes/authRoute')
const bodyParser = require('body-parser')
const path = require('path');

connectDb()

const errorHandler = require('./Middlewares/ErrorHandling')

const PharmacieRoute = require('./Routes/PharmacieRoute')
const CommentairRoute = require('./Routes/CommentairRoute')
const TracableRoute = require('./Routes/TracableRoute')

const app = express()
app.use(express.urlencoded({ extended: false }))
// app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors())


app.use(express.json())

app.use('/api/auth', router)
app.use('/api/pharmacie', PharmacieRoute)
app.use('/api/commentair', CommentairRoute)
app.use('/api/tracable', TracableRoute)

app.use(errorHandler)

const port = process.env.port || 5050

app.listen((port), (err) => {
    if (!err) {
        console.log(`the port ${port} is running`)
    }
    else {
        console.log(err)
    }
})

module.exports = app