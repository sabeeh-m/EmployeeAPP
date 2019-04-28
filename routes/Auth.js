var db= require("../models/index.js")
var passport=require("passport")


var express= require("express");
var router= express.Router();


router.get("/signup",function(req,res){
  
  
  res.render("signup")
  
})

router.post("/signup",function(req,res){
  try{
  let user= new db.employee({username:req.body.username,name:req.body.name,status:"Active"}); 

  user.setPassword(req.body.password);
  
  user.save(function(err,user){
    if(err){ console.log(err)}
    console.log("Success!!")
    req.flash("success","Signup Successfull, please login to continue")
    res.redirect("/home")
    
    
  })
  } 
  catch(e){
    
    console.log("error");
    res.send({message:"error"})
    
    
  }
  
  
  
})



router.post("/login",passport.authenticate("local",{
    successRedirect: "/profile" ,
    failureRedirect: "/home",
    failureFlash:"Invalid User or Password"
}),function(req,res,next){
      
          
        })
        
router.get("/logout",UpdateStatus, function(req,res){
  
  req.logout();
  req.flash("success","Logged Out Successfully")
  res.redirect("/home")
  
  
  
})        


function UpdateStatus(req,res,next){
  try{
  if(req.user){
    db.employee.findOneAndUpdate({_id:req.user._id},{status:"Logged Out"},{new:true},function(err,data){
      
      return next()
      
    }
    
  )  
  }
  else if(!req.user){
   
  return next()  
    
  }
  
  
  } catch(e){
    
  res.redirect("/home",{data:e.message})
    
  }
  
  
}




        
module.exports=router;

