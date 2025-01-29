'use strict'

require('dotenv').config({})
const bodyParser = require('body-parser');
const express = require('express');
const {port} = require('./app/config/config')
const cors = require('cors');
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname,'./app','public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit:'1mb'}))
app.use(cors())
app.use(bodyParser.json());

app.use('/api/v1/admin' , require('./app/routes/admin-routes'))

app.get('/health' , (req,res,next)=>{
    res.status(200).json({
        message:'server is running perfectly'
    })
})

app.use(require('./app/middlewares/error-handler'))

app.listen(port,()=>{
    console.log(`http://127.0.0.1:${port}`)
}) 