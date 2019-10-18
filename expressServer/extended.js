var express = require('express')
var router = express.Router();
var fs=require('fs'); //For reading file

//Must always have this in the file to read JSON from the body
router.use(express.json())

router.get('/',function (req,res){
    res.send('hello world')
})

router.get('/test',function (req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
})

router.get('/sample/:id', function(req, res) {

    var id = req.params.id; 
    res.send("ID is " + id);   
})

router.post('/post', function(request, response){
    console.log(request.body);      // your JSON
    response.send(request.body);    // echo the result back
  });


//Read JSON data from data.json
router.get('/readJson',function(request,response){
    var readFile = fs.readFileSync('data.json','utf-8')
    var data = JSON.parse(readFile)
    var output = ""
    for(i=0;i<data.length;i++){
        console.log(data[i].title)
        output += data[i].title + "\n"
    }
    response.send(output)
});

module.exports = router

