require('dotenv').config();

const express = require('express');
const router = require('./Route/router');
const config = require('./Config/config');
const mongo = require('./Settings/settings');
const app = express();

const port = config.server.port;
const appName = config.appName || "Survey";

app.use(router);

// Endpoint 1

app.get('/', (req, res) => {
    res.send('Welcome to Terra-Survey')
});

app.listen(port, (res) => {
    console.log(`${appName} is listening on ${port}`)
});

