const express = require('express')
const app = express()
const port = 3000
const path = require('path');



var extended = require('./extended')
app.use('/extended',extended) //Add new file to path


//Read json data
app.use(express.json())


app.listen(port,()=>console.log('Listening on ' + port))