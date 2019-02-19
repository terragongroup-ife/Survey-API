const userModel = require('../Model/user');
const service = require('../Service/service');
const categoryModel = require('../Model/category');
const QuestionModel = require('../Model/questions');


module.exports = {
    createSurvey: (req, res) => {
    console.log('calling the create Question function');
    const survey = req.body
    console.log(survey);
    const username = req.body.username;
    const val = service.checkIfUserExists(username);
    if (val === true) {
        const schema = QuestionModel(question);
        schema.save({})
            .then((resp) => {
                console.log(resp);
                return res.send ({
                    error: false,
                    status: 201,
                    message: 'Questions was saved successfully'
                })
            })
            .catch((err) => {
                console.log(err);
                return res.send ({
                    error: true,
                    status: 400,
                    message: 'Unable to save questions to the Database'
                })
            })
    }
    else {
        return res.send({err: true, message: `username ${username} does not exist`})
    }
    process.exit();
    //check if username exists in the DB
    //Check if the category is valid
    //save the questions to the DB
    
    },

    signUp: (req, res) => {
        const { email, username, password } = req.body;
        console.log(req.body);
        const val = service.checkIfUserExists(username);
        if (val === false) {
            userModel.create({
                email,
                username,
                password
            }).then((response) => {
                console.log('User succesfully signed up', response);
                return res.send({
                    err: false, 
                    message: 'User successfully signed up', 
                    response: response
                });
    
            }).catch((err) => {
                console.log('Error occured while signing user', err);
                res.send({
                    error: true, 
                    message: 'Error occured while signing user', 
                    response: err
                });
            })
        } else {
            return res.send ({
                error: true,
                message: 'Username taken'
            })
        }


    
    },

    getQuestions: (req, res) => {
        return QuestionModel.find()
        .then((resp) => {
            if (resp.length === 0){
                return res.send ({
                    error: true,
                    code: 404,
                    message: 'No questions found'
                })
            }
            console.log(resp)
            return res.send ({
                error: false,
                code: 201,
                data: resp,
                message: 'Questions were successfully fetched'
            });
        }).catch((err) => {
            console.log(err)
            return res.send ({
                error: true,
                status: 400,
                message: 'Unable to fetch questions from the Database'
            });
        })
    },


    getIndQuestions: (req, res) => {
        const id = (req.params.questionsId);
        console.log('id', id);
        return QuestionModel.findOne ({
            questionId: id
        }).then((resp) => {
            if (!resp) { 
                console.log('Data not found');
               return res.send ({
                error: true,
                code: 404,
                 message: 'Data not found' 
                });
            }
            console.log(resp);
          return res.send ({
                error: false,
                code: 201,
                message: 'Question was successfully fetched'    
            });
        }).catch((err) => {
            console.log(err);
            return res.send ({
                error: true,
                status: 400,
                message: 'Unable to fetch question from the Database'
            });
        }) 
    },

    category: (req, res) => {
        const name = req.body.name
        console.log(req.body)
        categoryModel.create({
            name
        }).then((resp) => {
            console.log(resp);
            return res.send ({
                error: false,
                message: 'Data saved successfully'
            });
        }).catch((error) => {
            console.log('Data not saved', error);
            return res.send ({
                error: true,
                message: 'Data not saved'
        });
    }
    )}
}
