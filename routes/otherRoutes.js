var express= require("express");
var router= express.Router();



router.get("/home",function(req,res){
    
    res.render("home",{root:__dirname,message:req.flash()})
    
    
})

router.get("/",function(req,res){
    
    res.redirect("/home")
    
})

module.exports=router