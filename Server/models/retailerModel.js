const mongoose = require('mongoose');

const retailerModel = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    location:{
        type:String,
    },
    products:[{
        product_id:String,
        shop_name:String,
        quantity:Number,

    }],
    password:{
        type:String,
        required:true,
    }   
})

module.exports = mongoose.model("RetailerTable",retailerModel);
