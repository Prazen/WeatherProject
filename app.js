const express = require('express'); //express required
const https = require('https'); 
const bodyParser = require('body-parser');

const app = express(); //express used in app

app.use(bodyParser.urlencoded({extended: true}));
app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html");
    
})

app.post('/',(req,res)=>{
   const cityName = req.body.cityName; 
//    const cityName = "kathmandu"
       const appId = "47c7262cda8891f9e7d7f648cf8104f4";
       const unit = "metric";
       const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${appId}&units=${unit}`;
       
       https.get(url, (response)=>{
           // console.log(response.statusCode);
   
           response.on("data", (data)=>{
               const weatherData = JSON.parse(data);
               const temp = weatherData.main.temp;
               const weatherDescription = weatherData.weather[0].description;
               const weatherIcon = weatherData.weather[0].icon;
               const imgUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
   
               // console.log(weatherDescription);
               res.write(`<p>Now Weather is ${weatherDescription}</p>`);
               res.write(`<h1>The temperature of ${cityName} is ${temp} degree Celsius.</h1>`);
               res.write(`<img src="${imgUrl}" alt="weather-icon">`);
               res.send();
           })
       })
})

// 

app.listen(3000, ()=>{ //server started at 3000 port ---> get.app(3,()=>{})
    console.log("server is running at Port:3000")
})