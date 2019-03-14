const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const cors = require("cors");
const app = express();
const SurveyController = require('../Controllers/SurveyController');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));




// SIgnUp 
router.post('/signup', (req, res) => {
    return new SurveyController().signUp(req, res);

});


// SignIn

router.post('/signin', (req, res) => {
    return new SurveyController().signIn(req, res)
});

// Create Survey

router.post('/post-survey',  cors(),(req, res) => {
   return new SurveyController().createSurvey(req, res);
});

// Get Questions By UserId

router.get('/surveys/:userId', (req, res) => {
    return new SurveyController().getQuestionsByUserId(req, res);
});

// Get Questions By Survey Id

router.get('/survey/:questionId', (req, res) => {
    return new SurveyController().getIndQuestions(req, res);
});

// Post A Response

router.post('/post-response', (req, res) => {
    return new SurveyController().postResponse(req, res);
});

// Save A Category 

router.post('/category', (req, res) => {
    return new SurveyController().category(req, res);
});

// Get All Questions

router.get('/questions', (req, res) => {
   return new SurveyController().getQuestions(req, res);
});


module.exports = router;