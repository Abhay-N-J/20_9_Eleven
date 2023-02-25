const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const axios = require('axios');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4100;
const mongo_uri = process.env.MONGO_URI;
const saltRounds = 12;

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.post('/add-item', async (req, res, next) => {
    try {
        const client = new MongoClient(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        
    }
    catch(err) {
        next(err);
    }
})
