const express = require('express')
const cors = require('cors');
const app = express()
const port = 3001
const path = require('path');

app.use(cors());

var loc = require('./locations')
app.use('/locations',loc) //Add new file to path


//Read json data
app.use(express.json())


app.listen(port,()=>console.log('Listening on ' + port))