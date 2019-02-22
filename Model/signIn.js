const mongoose = require('mongoose');
const Schema = mongoose.Schema

const signInSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    authToken: {
        type: String,
        required: true
    }
});

const signInModel = mongoose.model('SignIn', signInSchema)

module.exports = signInModel 