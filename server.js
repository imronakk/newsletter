const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require('request');
require("dotenv").config();

const app = express();
app.use(express.static("PUBLIC"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
})

app.post("/",function(req,res){
    const first = req.body.firstName;
    const Last = req.body.lastName;
    const email = req.body.emaill;
    
    const data2 = {
        members : [{
            email_address: email,
            status:"subscribed",
            merge_fields:{
                FNAME:first,
                LNAME:Last,
            }
        }]
    };
    const JSONdata = JSON.stringify(data2);

    const api = process.env.APIkey;
    const urlMain = process.env.Endpointurl;
    const url = urlMain;
    const option = {
        method:'POST',
        auth: 'Ronak:'+api
        
    }
    const request = https.request(url , option , function(response){
        if(response.statusCode==200){
            res.sendFile(__dirname + "/success.html")
        }else{
            res.sendFile(__dirname + "/faliure.html")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        }) 
    })
    request.write(JSONdata);
    request.end();
})

app.listen(process.env.PORT || 4000,function(){
    console.log("Server is live")
})

app.post("/faliure",function(req,res){
    res.redirect("/")
})