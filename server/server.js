require('dotenv').config();
const express = require('express');
const app = express();
const errorHandler = require('./middlewares/errorHandler')
const connectDB = require('./Config/db')
connectDB()



const cors = require('cors');
app.use(cors({ origin: true, credentials: true }));
const coockieparser = require('cookie-parser')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(coockieparser())

const PharmacieRouter = require('./routes/PharmacieRouter')

app.use('/api/pharmacie', PharmacieRouter)


app.use(errorHandler)




const port = process.env.PORT || 8084;

app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`Server is running on port ${port}`);
});


module.exports = app
