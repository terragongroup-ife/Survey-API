const mongoose = require('mongoose');
const Schema = mongoose.Schema

const responseSchema = new Schema ({
    surveyId: {
        ref: 'Question',
        type: mongoose.Schema.Types.ObjectId
    },
    respondentId: {
        type: String,
        required: true
    },
    surveyResponses: {
        type: [ String ],
        required: true
    },
});

const responseModel = mongoose.model('Response', responseSchema)


module.exports = responseModel 