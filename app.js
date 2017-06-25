var express =    require("express"),
    app =        express(),
    bodyparser = require("body-parser"),
    mongoose =   require("mongoose");
    

mongoose.connect("mongodb://localhost/cityinfo");

//City info schema
var cityinfoSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
    
//database model
var cityInfo = mongoose.model("cityInfo", cityinfoSchema);

// cityInfo.create({
//     name: "Griffith Observatory", 
//     image: "http://griffithobservatory.org/slideshow/slide_show00.jpg",
//     description: "Griffith Observatory is a facility in Los Angeles, California, sitting on the south-facing slope of Mount Hollywood in Los Angeles' Griffith Park. It commands a view of the Los Angeles Basin, including Downtown Los Angeles to the southeast, Hollywood to the south, and the Pacific Ocean to the southwest. The observatory is a popular tourist attraction with an excellent view of the Hollywood Sign, and an extensive array of space and science-related displays. Since the observatory's opening in 1935, admission has been free, in accordance with the benefactor's will, after whom the observatory is named – Griffith J. Griffith."
// }, function(err, city){
//     if(err){
//         console.log("Error happend");
//     } else {
//         console.log("City added successfully");
//         console.log(city);
//     }
// });

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


//INDEX - show all city info
app.get("/cityinfo", function(req, res){
    cityInfo.find({}, function(err, info){
       if(err){
           console.log(err);
       } else {
            res.render("cityinfo", {info: info}); 
       }
    });
});


//CREATE - add a new info to our db
app.post("/cityinfo", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newPlace = {name: name, image: image, description: description};
    //Add the new city info to the database
    cityInfo.create(newPlace, function(err, info){
        if(err){
            console.log(err);
        } else {
            res.redirect("/cityinfo");
        }
    });
});


//NEW - show form to add a new city info
app.get("/cityinfo/new", function(req, res){
   res.render("new.ejs"); 
});



//SHOW - show info about one city
app.get("/cityinfo/:id", function(req, res){
    cityInfo.findById(req.params.id, function(err, cInfo){
        if(err){
            console.log(err);
        } else {
            var info = cityInfo.find({id: "id"});
            res.render("show", {info: cInfo})     
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The city info server has started"); 
});