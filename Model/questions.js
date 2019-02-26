const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionsSchema = new Schema ({
    userId: {
        type: String,
        required: true,    
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
        ref: 'Category',
        type: mongoose.Schema.Types.ObjectId
    },
    surveyQuestions: {
        type: [ Object ],
        required: true,    
    }
});

const QuestionsModel = mongoose.model('Question', questionsSchema);

module.exports = QuestionsModel;