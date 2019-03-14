const mongoose = require('mongoose');
const Schema = mongoose.Schema

const responseSchema = new Schema ({
    surveyId: {
        ref: 'Question',
        type: mongoose.Schema.Types.ObjectId
    },
    surveyResponses: {
        type: [ Object ],
        required: true
    },
});

const responseModel = mongoose.model('Response', responseSchema)


module.exports = responseModel 