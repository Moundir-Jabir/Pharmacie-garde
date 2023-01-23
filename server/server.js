require('dotenv').config();
const express = require('express');
const app = express();



const cors = require('cors');
app.use(cors({ origin: true, credentials: true }));
const coockieparser = require('cookie-parser')

app.use(express.urlencoded({ extended: true })); //* this is meddleware
app.use(express.json());
app.use(coockieparser())

const PharmacieRouter = require('./routes/PharmacieRouter')

app.use('/api/pharmacie', PharmacieRouter)





const connectDB = require('./Config/db')
connectDB()

const port = process.env.PORT || 8084;
app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`Server is running on port ${port}`);
});

