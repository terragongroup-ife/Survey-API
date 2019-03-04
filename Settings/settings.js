const mongoose = require('mongoose');
const config = require('../Config/config');
mongoose.set('useCreateIndex', true);

// mongodb+srv://survey:testsurvey@cluster0-wpxhp.mongodb.net/test?retryWrites=true

mongoose.Promise = global.Promise
const connectionUrl = `mongodb://karo:password123@ds137703.mlab.com:37703/survey`
//const connectionUrl = `mongodb://${config.mongo.connection.host}:${config.mongo.connection.port}/${config.mongo.connection.db}` || "mongo"
console.log('Connecting to Mongo DB on ', connectionUrl);
mongoose.connect(connectionUrl, {useNewUrlParser: true})
    .then((data) => {
        console.log('MongoDB was connected sucessfully', data);
    }).catch((err) => {
        console.log('Unable to connect to mongoBD', err);
        process.exit();
});

module.exports = mongoose;

