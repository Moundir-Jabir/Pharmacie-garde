require('dotenv').config();
const express = require('express');
const app = express();
const errorHandler = require('./middlewares/errorHandler')



const cors = require('cors');
app.use(cors({ origin: true, credentials: true }));
const coockieparser = require('cookie-parser')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(coockieparser())

const connectBD = require('./config/db')
connectBD()


const PharmacieRouter = require('./routes/PharmacieRouter')
const Authentification = require('./routes/AuthRouter')
const ReviewRouter = require('./routes/ReviewRouter')

app.use('/api/auth', Authentification);
app.use('/api/pharmacie', PharmacieRouter)
app.use('/api/review', ReviewRouter)


app.use(errorHandler)




const port = process.env.PORT || 8084;

app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`Server is running on port ${port}`);
});


module.exports = app