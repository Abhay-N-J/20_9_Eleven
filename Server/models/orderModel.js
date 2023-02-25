const mongoose = require('mongoose');

const orderModel = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
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
    products:[{
        product_id:String,
        product_name:String,
        quantity:Number,
    }],
    price:{
        type:Number,
        required:true,
    },
})

module.exports = mongoose.model("orderTable",orderModel);