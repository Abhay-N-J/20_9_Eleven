const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const axios = require('axios');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');

const customerUrls= require('./routes/customer');
const retailerUrls= require('./routes/retailer');

const app = express();
const PORT = process.env.PORT || 4100;
const mongo_uri = process.env.MONGO_URI;
const saltRounds = 12;

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use('/',customerUrls); 
app.use('/retailer',retailerUrls); 

app.listen(PORT, () => 
    console.log(`Server running at ${PORT}`));
