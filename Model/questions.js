const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionsSchema = new Schema ({
    userId: {
        ref: 'SignUp',
        type: mongoose.Schema.Types.ObjectId    
    },
    surveyName: {
        type: String,
        required: true,    
    },
    surveyDescription: {
        type: String,
        required: true,    
    },
    surveyCategory: {
        type: String,
        required: true
    },
    surveyQuestions: {
        type: [ Object ],
        required: true,    
    }
});

const QuestionsModel = mongoose.model('Question', questionsSchema);

module.exports = QuestionsModel;