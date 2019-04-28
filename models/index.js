const mongoose= require("mongoose");
mongoose.set("debug",true)
mongoose.Promise=Promise;
// mongoose.connect("mongodb://localhost/employeeapp",{keepAlive:true});
mongoose.connect("mongodb+srv://sabeeh:riyadh@employeeapp-oxbky.mongodb.net/test?retryWrites=true");

module.exports.employee= require("./employee.js")
