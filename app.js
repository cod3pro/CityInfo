var express =    require("express"),
    app =        express(),
    bodyparser = require("body-parser"),
    mongoose =   require("mongoose"),
    cityInfo = require("./models/cityinfo"),
    Comment     = require("./models/comment"),
    Seeds    = require("./seeds"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user")
    
    
// Requiring Routes
var commentRoutes  = require("./routes/comments"),
    cityinfoRoutes = require("./routes/cityinfo"),
    indexRoutes    = require("./routes/index");




  
mongoose.connect("mongodb://localhost/cityinfo");
app.use(bodyparser.urlencoded({extended: true}));

app.use(express.static(__dirname+ "/public"));

app.set("view engine", "ejs");
Seeds(); 



// PASSPORT configuration
app.use(require("express-session")({
    secret: "bori",
    resave: false,
    saveUninitialized: false
}));


app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});



app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use("/", indexRoutes);
app.use("/cityinfo", cityinfoRoutes);
app.use("/cityinfo/:id/comments", commentRoutes);




app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The city info server has started"); 
});