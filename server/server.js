require('dotenv').config();
const express = require('express');
const app = express();



const port = process.env.PORT || 8084;
app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`Server is running on port ${port}`);
});

