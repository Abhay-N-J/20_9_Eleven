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
        type:String
    },
})

module.exports = mongoose.model("UserTable",userModel);