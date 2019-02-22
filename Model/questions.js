const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionsSchema = new Schema ({
    questions: {
        type: [Object],
        required: true,    
    },
    username: {
        ref: 'Login',
        type: mongoose.Schema.Types.ObjectId
    }, 
    options: {
        type: [ String ],
        required: false,
        default: []
    },
    category: {
        ref: 'Category',
        type: mongoose.Schema.Types.ObjectId
    }
});

const QuestionsModel = mongoose.model('Question', questionsSchema);

module.exports = QuestionsModel;