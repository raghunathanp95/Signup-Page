const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

// making all the static media and css public with public folder
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// __dirname reveals the current location inside the seriver i.e our project folder
app.get("/", function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

// inputs are saved from clients side
app.post("/", function(req,res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

// API formats for sending it to mailchimp in documentation FNAME,LNAME, email_address
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

// stringify the data format to be accepted
  const jsonData = JSON.stringify(data);
  console.log(jsonData);

  const url = "https://us10.api.mailchimp.com/3.0/lists/adbdbb4c9a";

  const options = {
    method : "POST",
    auth : "raghu:e2f2e59fe7ed59b51f078d9228bfa2f7-us10"
  }

  const request = https.request(url,options, function(response){

    if (response.statusCode===200){
      // res.send("Successfully subscribed!")
      res.sendFile(__dirname+"/success.html");
    } else{
      // res.send("There was an error with signing up, pls try again later.");
      res.sendFile(__dirname+"/failure.html");
    }

    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })

// the poat the jsonData
  request.write(jsonData);
  request.end();

});

app.post("/failure", function(req,res){
  res.redirect("/");
});

// console log that is runs in 3000 port || in heroku a dynamic port process.env.PORT
app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running up in 3000!");
});


