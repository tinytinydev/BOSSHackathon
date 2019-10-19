const express = require('express')
const app = express()
const port = 3001
const path = require('path');



var loc = require('./locations')
app.use('/locations',loc) //Add new file to path


//Read json data
app.use(express.json())


app.listen(port,()=>console.log('Listening on ' + port))