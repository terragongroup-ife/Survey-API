const signInModel = require('../Model/signIn')
const categoryModel = require('../Model/category');
const QuestionsModel = require('../Model/questions');
const responseModel = require('../Model/response');
const signUpModel = require('../Model/signUp')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

class SurveyController {
//handles all logic for surveys

    // SIgnUp

    signUp (req, res) {
            const { name, email, password } = req.body;
        if ( !name || !email || !password ) {
                console.log('Some fields are not filled');
                return res.send({
                    error: true,
                    code: 400,
                    message: "name, email must be passed"
                }); 
            }
            else{
                bcrypt.hash(req.body.password, 10, (err, hashedPassword)=>{
                    if(err){
                        return res.status(500).json({
                            error: err.message
                        });
                    }
                    else{
                        console.log(hashedPassword)
                       return signUpModel.create({
                            name,
                            email,
                            password: hashedPassword
                        }).then ((resp) => {
                            console.log('Sign up was successful')
                        return res.send({
                                    error: false,
                                    status: 201,
                                    message: 'You have successfully signed up',
                                    userId: resp._id
                            })
                        }).catch((err) => {
                            console.log('Not saved');
                            if (err) {
                                if (err.name === 'MongoError' && err.code === 11000) {
                                    return res.send ({
                                        code: 400,
                                        message: 'Email already exist' 
                                    })
                                } else {
                                    return res.send({
                                        err: true, 
                                        code: 400,
                                        message: err 
                                    });
                                }
                            }
                        })
                    }

                });
            }
    
        }
    

    //SignIn

    signIn (req, res) {
            const { email, password } = req.body;
            if ( !email || !password ) {
                return res.send({
                    err: true, 
                    code: 400,
                    message: 'name, password must be passed'
                })
            }
            return signUpModel.findOne({email})
                .then((response) => {
                    if (response) {
                        bcrypt.compare(req.body.password, response.password, (err, result)=>{
                            if (err){
                                // do something
                                return res.send({
                                    err: true, 
                                    code: 503,
                                    message: 'Auth failed',
                                });
                            }
                            if(result){
                                const token =jwt.sign({
                                    email: response.email,
                                    userID: response._id
                                  },
                                  process.env.JWT_SECRET,
                                   {
                                     expiresIn: "1h"
                                      }
                                );
                                console.log('User succesfully signed in');
                                return res.send({
                                    err: false, 
                                    code: 200,
                                    message: 'User successfully signed in',
                                    token: token
                                });
                            }
                            else{
                                return res.send({
                                    err: false, 
                                    code: 200,
                                    message: 'Incorrect password'
                                });
                            }
                        });
                    }
                    else{
                        console.log('Unable to sign in');
                        return res.send({
                            err: false, 
                            code: 404,
                            message: 'User does not exisit, kindly sign up'
                        });
                    } 
                })
                .catch((err) => {
                    console.log('Unable to sign in user');
                    return res.send({
                        err: true, 
                        code: 503,
                        message: err
            })
        })
     }

    // Create Survey

    createSurvey (req, res) {
        const { userId, surveyName, surveyDescription, surveyCategory, surveyQuestions } = req.body
        console.log(req.body); 
        if ( !userId || !surveyName || !surveyDescription || !surveyCategory || !surveyQuestions ) {
            console.log('Some fields are not filled');
            return res.send({
                error: true,
                code: 400,
                message: "userId, surveyName, surveyDescription, surveyCategory, surveyQuestions must be passed"
            });
        }
         if (surveyQuestions.length === 0) {
            return res.send({
                error: true,
                code: 400,
                message: "No question sent"
            });
        }
        return QuestionsModel.create({
            userId,
            surveyName,
            surveyDescription,
            surveyCategory,
            surveyQuestions
        }).then((resp) => {
            console.log('Saved',resp);
                return res.send ({
                    error: false,
                    status: 201,
                    message: 'Questions was saved successfully',
                    result: resp
                })
            }).catch((err) => {
                console.log('Not saved',err);
                return res.send ({
                    error: true,
                    status: 400,
                    message: 'Unable to save questions to the Database'
                })
            })
    }

    // Get Questions By UserId

    getQuestionsByUserId (req, res) {
        const { userId } = req.params;
        if (userId.length === 0) {
            console.log(userId)
            return res.send({
                error: true,
                code: 400,
                message: "No Id sent"
            });
        }
        return QuestionsModel.findOne({userId}).then((resp) => {
            if (resp) {
                console.log('Query was successful');
             return res.send ({
                error: false,
                code: 201,
                result: resp 
                });
            } 
        }).catch(() => {
            console.log('Unable to query question');
            return res.send ({
                error: true,
                status: 400,
                message: 'Invalid UserId'
            });
        }) 
    }

     // Get Questions By Id

    getIndQuestions (req, res) {
        const { questionId } = req.params;
        if (questionId.length === 0) {
            return res.send({
                error: true,
                code: 400,
                message: "No Id sent"
            });
        }
              return  QuestionsModel.findById(questionId)
              .then((resp) => {
            if (resp) {
                 return res.send ({
                    error: false,
                    code: 201,
                    message: 'Query was successfull',
                    result: resp 
                    });
                }
                return res.send ({
                    error: false,
                    code: 201,
                    message: 'Question was successfully fetched'    
                });
            }).catch(() => {
                console.log('Unable to fetch question');
                return res.send ({
                    error: true,
                    status: 400,
                    message: 'Invalid question Id'
                });
            }) 
       }

    // Post A Response

    postResponse (req, res) {
                const { surveyId, respondentId, surveyResponses } = req.body;
                if ( !surveyId || !respondentId || !surveyResponses ) ({
                    error: true,
                    code: 503,
                    message: "surveyId, respondentId, surveyResponses must be passed"
                })
            return responseModel.create({
                surveyId,
                respondentId,
                surveyResponses
            }).then((response) => {
                console.log('Response saved succesfully', response);
                return res.send({
                    err: false, 
                    code: 200,
                    message: 'Response saved succesfully',
                    response: response
                });
            }).catch(() => {
                console.log('Unable to save response');
                return res.send({
                    err: true, 
                    code: 400,
                    message: 'Unable to save response', 
                });
            })
        }


    // Save A Category 

    category (req, res) {
            const { name } = req.body
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


    // Get all Questions

    getQuestions (req, res) {

            return QuestionsModel.aggregate([
                {
                    $lookup: {
                        from: "signins",
                        localField: "name",
                        foreignField: "_id",
                        as: "user"
                    }

                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category"
                    }
                }
            ]).then((resp)=>{
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
                    result: resp,
                    message: 'Questions were successfully fetched'
                });
            }).catch(err =>{
                console.log(err)
                return res.send ({
                    error: true,
                    status: 400,
                    message: 'Unable to fetch questions from the Database'
                });
            })
        }
}
module.exports = SurveyController;
