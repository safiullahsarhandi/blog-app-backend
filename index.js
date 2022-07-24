require('dotenv').config();

// importing packages OR dependencies
const express = require('express');
const app = express();
const logger = require('morgan');
const cors = require('cors');
const connectDB = require('./config/database');
const api = require('./routes/api');
const port = process.env.APP_PORT || 3000;
// initializing plugins
app.use(logger("dev"));
app.use(express.urlencoded({extended : true}));
app.use(express.json({limit : '200mb'}));
app.use(cors());
// registering routes;
app.use('/api',api);

// listen app 
app.listen(port,function(){
    console.log(`App is listening on PORT: ${port}`)
    connectDB();
});