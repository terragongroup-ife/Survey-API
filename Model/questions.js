const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionsSchema = new Schema ({
    question: {
        type: String,
        required: true, 
        minLength: 1,
        trim: true    
    },
    questionId: {
        type: String,
        minLength: 1,
        trim: true,
        required: true,
        unique: true
    }, 
    userId: {
        type: String,
        minLength: 1,
        trim: true,
        required: true,
        unique: true
    },
    options: {
        type: Object
    }
});

const Questions = mongoose.model('Questions', questionsSchema);

module.exports = Questions;