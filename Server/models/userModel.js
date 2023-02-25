const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    location:{
        latitude:Number,
        longitude:Number,
    },
    wallet:{
        type:Number,
        default:500,
    }
})

module.exports = mongoose.model("UserTable",userModel);