const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
          type:String,
          required:true,
          trim:true, // trim remove space in start and end
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["Admin","Student","Visitor"]   // in enum user can acces only in 3  
    }

});

module.exports= mongoose.model("user",userSchema);      // collllection name is user every where use user for schema