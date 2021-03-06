var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");




router.get("/", function(req, res){
   res.render("landing"); 
});


// Show register form
router.get("/register", function(req, res){
   res.render("register"); 
});

// Handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("lcoal")(req, res, function(){
           res.redirect("/cityinfo"); 
        });
    });
});




// show login page
router.get("/login", function(req, res){
   res.render("login"); 
});


//login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/cityinfo",
        failureRedirect: "/login"
    }), function(req, res){
});



// logout logic
router.get("/logout", function(req, res){
   req.logout();
   res.redirect("/cityinfo");
});



//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}



module.exports = router;