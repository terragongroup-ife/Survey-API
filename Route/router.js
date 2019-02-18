const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const QuestionModel = require('../Model/questions');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


router.post('/questions', (req, res) => {
    const question = req.body
    const schema = QuestionModel(question);
    schema.save({
    }).then ((resp) => {
        console.log(resp);
        return res.send ({
            error: false,
            status: 201,
            message: 'Questions was saved successfully'
        })
    }).catch((err) => {
        console.log('Questions was not created', err);
        return res.send ({
            error: true,
            status: 400,
            message: 'Unable to save questions to the Database'
        })
    })
});


router.get('/questions/:id', (req, res) => {
    const questions = req.params.id
})




module.exports = router;