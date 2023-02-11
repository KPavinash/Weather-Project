const express= require("express");
const bodyParser = require("body-parser");
const https= require("https");
const app= express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
    const query = req.body.cityName;
    const apiKey = "9470c1d2cafa9fa7b9832797f4e05315";
    const url= "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+ apiKey+"&units=metric";
    https.get( url ,function(response){
        console.log("Response is " + response);
        response.on("data", function(data){
            const weatherData= JSON.parse(data);
               var temp=weatherData.main.temp;
                var des=weatherData.weather[0].description;
                var icon=weatherData.weather[0].icon;
                const iconUrl= "https://openweathermap.org/img/wn/"+icon+"@2x.png ";           
                res.write(`<h1> The temperature in ` +query+ ` is ` + temp + ` degree Celcius.  </h1>` + `<h2> The weather is currently ` + des +  `</h2>` );
                res.write(`<img src=` +iconUrl + " width='200px'>" );
                res.send();
                console.log(temp);
                console.log(des);
        });
    });
});

app.listen(4000, function(req, res) {
    console.log("Runnin on port 4000");
});

