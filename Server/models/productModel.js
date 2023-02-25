const mongoose = require('mongoose');

const productModel = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    qty:{
        type:Number,
        required:true,
        default:0
    },
    price:{
        type:Number,
        required:true,
    },
    image_link:{
        type:String,
        required:true,
    },
    shops:[{
        shop_id:String,
        shop_name:String,
        quantity:Number,
    }],
    description:{
        type:String,
    }   
})

module.exports = mongoose.model("ProductTable",productModel);
