var express= require("express");
var router= express.Router();

var db= require("../models/index.js")
var passport=require("passport")


router.get("/profile",isSignedIn,function(req,res,next){
  res.render("profile",{data:req.user})

  
})


router.get("/status",isSignedIn,function(req,res,next){
  
  db.employee.find().sort({updatedAt:"desc"}).exec(function(err,data){
    if(err){
      
      res.redirect("/home")
    }
    res.render("status",{data:data});
    
    
  })
  
  
})



router.put("/status/:id",isSignedIn,ownershipCheck, function(req,res){
  
  db.employee.findOneAndUpdate({_id:req.params.id},{status:req.body.statusinput},{new:true},function(err,data){
  if(err){
   res.redirect("/home")
    
  }
    req.flash("success","Status Updated")
    res.status(200).redirect("/profile")
    
    
  })
  
  
  
})



function isSignedIn(req,res,next){
  if(req.user) {
    return next()
    
  } else {
    req.flash("error","please sign in first")
    res.redirect("/home");
  }
}


function ownershipCheck(req,res,next){
  
  if(req.user._id == req.params.id){
    
    return next()
  } else {
    req.flash("error","You are not authorized to do this")
    res.redirect("home")
    
  }
    
  
}


module.exports=router