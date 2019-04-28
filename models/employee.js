const mongoose= require ("mongoose");
const crypto= require("crypto")
const passportLocalMongoose=require("passport-local-mongoose")
var userSchema = new mongoose.Schema({
    
        name:{
            type:String,
            required:true
        
            
        },
        status:{
            type:String,
            required:true
    
            
        },
        username:{
            type:String,
            required:true,
            unique:true
            
        },
        salt:String
        ,hash:String,
        
    
}, {
        timestamps:true
        })

userSchema.methods.setPassword=function(password){
      this.salt = crypto.randomBytes(16).toString('hex');
       this.hash = crypto.pbkdf2Sync(password, this.salt,  
    1000, 64, `sha512`).toString(`hex`);     
    
    
}


userSchema.methods.validPassword=function(password){
       var hash = crypto.pbkdf2Sync(password,  
    this.salt, 1000, 64, `sha512`).toString(`hex`); 
    return this.hash === hash; 
    
    
}


var employee= mongoose.model("employee",userSchema);
module.exports=employee;