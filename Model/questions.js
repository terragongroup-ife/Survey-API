const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionsSchema = new Schema ({
    question: {
        type: [Object],
        required: true, 
        minLength: 1,
        trim: true    
    },
    username: {
        type: String,
        minLength: 1,
        trim: true,
        required: true,
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

const Questions = mongoose.model('Question', questionsSchema);

module.exports = Questions;