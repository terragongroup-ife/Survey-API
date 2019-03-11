require('dotenv').config();

const express = require('express');
const router = require('./Route/router');
const config = require('./Config/config');
const mongo = require('./Settings/settings');
const app = express();
const cors = require('cors');

const port = config.server.port;
const appName = config.appName || "Survey";

// Setting CORS for server conflicts.
// app.use( (req,res, next)=>{
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "*");
//      next();

//     if(req.method === "OPTIONS"){
//         res.header("Acess-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE");
//         return res.status(200).json({});
//     }
// });

app.use(cors());

app.use(router);

// Endpoint 1

app.get('/', (req, res) => {
    res.send('Welcome to Terra-Survey')
});

app.listen(port, (res) => {
    console.log(`${appName} is listening on ${port}`)
});

