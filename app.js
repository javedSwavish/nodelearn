//npm init -y
//npm i mongoose express cors moment dotenv validator

require('dotenv').config();
require('./db/conn')

const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./Routes/router')
const PORT = 5001;

app.use(cors());
app.use(express.json());
app.use(router);

//get response check for testing ,server is running or not 
// app.get('/', (req, res) => {
//     res.status(200).json('server started@@@@')
//     // console.log('server is running at', PORT)
// })


//server start
app.listen(PORT, () => {
    console.log('server is running at', PORT)
})