var express=require("express");
var cookieParser= require("cookie-parser")
var session= require("express-session");
var app= express();
var bodyParser= require("body-parser");
const uuid=require("uuid")
var crypto= require("crypto")
var db= require("./models/index")
var FileStore= require("session-file-store")(session)
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
app.use(bodyParser.urlencoded({extended:true }));
app.set('view engine', 'ejs');
app.use(bodyParser.json())
var flash = require("connect-flash")
const employee=require("./models/employee")
var methodOverride=require("method-override")
app.use(express.static(__dirname+"/public"))
var authRoutes= require("./routes/Auth")
var userRoutes= require("./routes/user")
var otherRoutes= require("./routes/otherRoutes")
app.use(methodOverride("_method"))
app.use(flash())
app.use(session({
  genid: (req) => {
        return uuid() 
  },
  store: new FileStore(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(
new LocalStrategy(
  { usernameField: 'username',passwordField:'password'},
    (username, password, done) => {
try{
    console.log('Inside local strategy callback')
  console.log(username)
      db.employee.findOne({username:username},async function(err,user,next){
      console.log(user)
      if(  !user || user===null){
  
        return done(null,false)
      } 
      var pass= await user.validPassword(password);
      if(!user || typeof user==="undefined" ){
      return done(null,false,{message:"Problem occured"})
      
      } else if(!pass || typeof pass=== "undefined"){
                return done(null,false,{message:"Problem Occured"})
            } else if(user && pass){
        db.employee.findOneAndUpdate({username:user.username},{status:"Active"},{new:true},function(err,data){
                if(err){
        
            return next(err)
          }
          
          return done(null,data)  
      
        }) 
      
    }
          } 
      

    
    )}  catch(e){
      
      throw e;
    
      
    }
  }
    
    
  
));
passport.serializeUser(function(user,done){
    done(null,user._id)
    })

passport.deserializeUser(function(id, done){
    db.employee.findOne({_id:id},function(err,user){
      
      done(err,user);
    })
});
app.use(function(req,res,next){
  
    res.locals.error= req.flash("error")
    res.locals.success=req.flash("success")  
    next();
})
app.use(passport.initialize());
app.use(passport.session());

app.use(otherRoutes)
app.use(authRoutes);
app.use(userRoutes);



app.get("*",function ( req, res) {
  
  res.status(404).render('404.ejs')
})




app.listen(process.env.PORT,process.env.IP,function(){
    
    console.log("we are running on " + process.env.PORT)
})





