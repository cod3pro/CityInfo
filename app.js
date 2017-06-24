var express = require("express");
var app = express();
var bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended: true}));

app.set("view engine", "ejs");



var info = [
    {name: "Hollywood Blvd", image: "https://us.123rf.com/450wm/duha127/duha1271201/duha127120100018/12016760-hollywood-sign-in-la.jpg?ver=6"},
    {name: "Griffith Observatory", image: "http://griffithobservatory.org/slideshow/slide_show00.jpg"},
    {name: "Santa Monica Pier", image: "http://cdn.c.photoshelter.com/img-get/I00004BMfCdDBCqY/s/500/I00004BMfCdDBCqY.jpg"},
    {name: "Hollywood Blvd", image: "https://us.123rf.com/450wm/duha127/duha1271201/duha127120100018/12016760-hollywood-sign-in-la.jpg?ver=6"},
    {name: "Griffith Observatory", image: "http://griffithobservatory.org/slideshow/slide_show00.jpg"},
    {name: "Santa Monica Pier", image: "http://cdn.c.photoshelter.com/img-get/I00004BMfCdDBCqY/s/500/I00004BMfCdDBCqY.jpg"}

];



app.get("/", function(req, res){
   res.render("landing"); 
});

app.get("/cityinfo", function(req, res){

   res.render("cityinfo", {info: info}); 
});


app.post("/cityinfo", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newPlace = {name: name, image: image};
    info.push(newPlace);
   res.redirect("/cityinfo"); 
});


app.get("/cityinfo/new", function(req, res){
   res.render("new.ejs"); 
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The city info server has started"); 
});