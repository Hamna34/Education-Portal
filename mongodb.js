const mongoose = require("mongoose")

 const LoginSchema = new mongoose.Schema(     {

  
           email :
        {
       type : String ,
         required : true
        },
        password:
        {
         type : String ,
         required : true
        }
     }
 )

 const User = new mongoose.model("USER" , LoginSchema )

 module.exports = User
