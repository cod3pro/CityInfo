var express = require("express");
var router  = express.Router({mergeParams: true});

var cityInfo = require("../models/cityinfo");
var Comment = require("../models/comment");



// Comments New
router.get("/new", isLoggedIn, function(req, res){
    cityInfo.findById(req.params.id, function(err, Info){
       if(err){
           console.id(err);
       } else {
           res.render("comments/new", {Info: Info});
       }
    });
});


// Comments Create
router.post("/", isLoggedIn, function(req, res){
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


// middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}



module.exports = router;
