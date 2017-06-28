var express =    require("express"),
    app =        express(),
    bodyparser = require("body-parser"),
    mongoose =   require("mongoose"),
    cityInfo = require("./models/cityinfo"),
    Comment     = require("./models/comment"),
    Seeds    = require("./seeds");
    
 
 
 
var test = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});



  
mongoose.connect("mongodb://localhost/cityinfo");
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");
Seeds(); 





app.get("/", function(req, res){
   res.render("landing"); 
});


//INDEX - show all city info
app.get("/cityinfo", function(req, res){
    cityInfo.find({}, function(err, info){
       if(err){
           console.log(err);
       } else {
            res.render("cityinfo/index", {info: info}); 
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
            res.redirect("cityinfo/index");
        }
    });
});




//NEW - show form to add a new city info
app.get("/cityinfo/new", function(req, res){
   res.render("cityinfo/new"); 
});




// SHOW - shows more info about one campground
app.get("/cityinfo/:id", function(req, res){
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


// ================
// Comments Routes
//=================

app.get("/cityinfo/:id/comments/new", function(req, res){
    cityInfo.findById(req.params.id, function(err, Info){
       if(err){
           console.id(err);
       } else {
           res.render("comments/new", {Info: Info});
       }
    });
});



app.post("/cityinfo/:id/comments", function(req, res){
    //lookup the city using its ID
   cityInfo.findById(req.params.id, function(err, Info){
       if(err){
           console.log(err);
           res.redirect("/cityinfo")
       } else {
           // Add the new comment to DB
           Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err);
               } else {
                  // Add the new comment to appropriate post
                  Info.comments.push(comment);
                  Info.save();
                  res.redirect('/cityinfo/'+ Info._id);
               }
           });
       }
   });
});







app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The city info server has started"); 
});