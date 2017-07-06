var express = require("express");
var router = express.Router();
var cityInfo = require("../models/cityinfo");



//INDEX - show all city info
router.get("/", function(req, res){
    cityInfo.find({}, function(err, info){
       if(err){
           console.log(err);
       } else {
            res.render("cityinfo/index", {info: info}); 
       }
    });
});




//CREATE - add a new info to our db
router.post("/", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newPlace = {name: name, image: image, description: description};
    //Add the new city info to the database
    cityInfo.create(newPlace, function(err, info){
        if(err){
            console.log(err);
        } else {
            res.redirect("/index");
        }
    });
});




//NEW - show form to add a new city info
router.get("/new", function(req, res){
   res.render("cityinfo/new"); 
});




// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    console.log("Hey hey hey!!!!!!!!!!!!!11");

    //find the campground with provided ID
    cityInfo.findById(req.params.id).populate("comments").exec(function(err, Info){
        if(err){
            console.log("You have some error in your code body !!!!!!!!!!!!!11");
            console.log(err);
        } else {
            console.log("I don't know why !!!!!!!!!!!!!!!");
            //render show template with that campground
            res.render("cityinfo/show", {Info: Info});
        }
    });
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;