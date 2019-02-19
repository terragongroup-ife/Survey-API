const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('../Controllers/controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// Save the signup details

router.post('/signup', (req, res) => {
    return controller.signUp(req, res);
});

// save the category details
router.post('/category', (req, res) => {
    return controller.category(req, res);
});


// Save a Question

router.post('/questions', (req, res) => {
   return controller.createSurvey(req, res);
});


// Get All Questions

router.get('/questions', (req, res) => {
   return controller.getQuestions(req, res);
})


// Get Individual Questions

router.get('/question/:questionsId', (req, res) => {
    return controller.getIndQuestions(req, res);
})


module.exports = router;