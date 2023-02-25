const express = require('express');
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const axios = require('axios');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors =require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const customerUrls= require('./routes/customer');
const retailerUrls= require('./routes/retailer');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4100;
dotenv.config(); 
const mongo_uri = process.env.MONGO_URI;
// console.log(mongo_uri);

const saltRounds = 12;

mongoose.connect(mongo_uri,()=>console.log("Database Connected"))


app.use('/',customerUrls); 
app.use('/retailer',retailerUrls); 

app.listen(PORT, () => 
    console.log(`Server running at ${PORT}`));
