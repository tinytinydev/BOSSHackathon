var express = require('express')
var router = express.Router();
var https = require('https'); //For reading file
const request = require('request');

const config = require('config')
const apiKey = config.get("API_KEY")

const googleMapAPI = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=" + apiKey



console.log(googleMapAPI)

//Must always have this in the file to read JSON from the body
router.use(express.json())


//Get all locations
router.get('/getnearbyfood/latlong/:latlong',function(request,resp){

    var nearbyRest = googleMapAPI + "&type=restaurant&location="+request.params.latlong + "&radius=1500";
    console.log(nearbyRest)

    https.get(nearbyRest, function (res) {
        var json = '';
        res.on('data', function (chunk) {
            json += chunk;
        });
        res.on('end', function () {
            if (res.statusCode === 200) {
                try {
                    var data = JSON.parse(json);
                    // data is available here:
                    console.log(data);
                    resp.send(data)
                } catch (e) {
                    console.log('Error parsing JSON!');
                }
            } else {
                console.log('Status:', res.statusCode);
            }
        });
    }).on('error', function (err) {
          console.log('Error:', err);
    });
})

router.get('/nearbycusine/cusine/:cusine/latlong/:latlong',function(request,response){

        var nearbyRestwCusine = googleMapAPI + "&type=restaurant&location="+request.params.latlong + "&radius=1500" + "&keyword=" + request.params.cusine;
        https.get(nearbyRestwCusine, function (res) {
        var json = '';
        res.on('data', function (chunk) {
            json += chunk;
        });
        res.on('end', function () {
            if (res.statusCode === 200) {
                try {
                    var data = JSON.parse(json);
                    // data is available here:
                    console.log(data);
                    response.send(data)
                } catch (e) {
                    console.log('Error parsing JSON!');
                }
            } else {
                console.log('Status:', res.statusCode);
            }
        });
    }).on('error', function (err) {
          console.log('Error:', err);
    });
});

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

