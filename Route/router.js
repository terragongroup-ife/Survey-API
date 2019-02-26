const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const SurveyController = require('../Controllers/SurveyController');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


// Sign in... Endpoint 2

router.post('/signIn', (req, res) => {
    return new SurveyController().signIn(req, res)
});

// Save a Question... Endpoint 3

router.post('/questions', (req, res) => {
   return new SurveyController().createSurvey(req, res);
});

// Query by userId...Endpoint 4

router.get('/surveys/:userId', (req, res) => {
    return new SurveyController().getQuestionsByUserId(req, res);
})

// Get Individual Questions...Endpoint 5

router.get('/question/:questionsId', (req, res) => {
    return new SurveyController().getIndQuestions(req, res);
})

// Post response...Endpoint 6
router.get('/postresponse', (req, res) => {
    return new SurveyController().postResponse(req, res);
})

// save the category details

router.post('/category', (req, res) => {
    return new SurveyController().category(req, res);
});

// Get All Questions

router.get('/questions', (req, res) => {
   return new SurveyController().getQuestions(req, res);
})


module.exports = router;