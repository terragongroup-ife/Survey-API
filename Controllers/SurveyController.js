const signInModel = require('../Model/signIn')
const categoryModel = require('../Model/category');
const QuestionsModel = require('../Model/questions');
const responseModel = require('../Model/response');


class SurveyController {
//handles all logic for surveys


    //Endpoint 2

    signIn (req, res) {
        const { name, email, authToken } = req.body;
        if ( !name || !email || !authToken ) ({
            error: true,
               code: 503,
               message: "name, email, authToken must be passed"
        })
        return signInModel.create({
                name,
                email,
                authToken
            })
            .then((response) => {
                console.log('User succesfully signed in', response);
                return res.send({
                    err: false, 
                    code: 200,
                    message: 'User successfully signed in',
                    response: response
                });
            })
            .catch(() => {
                console.log('Unable to sign in user');
                return res.send({
                    err: true, 
                    code: 400,
                    message: 'Name already exist', 
                });
            })
    }

    // Endpoint 3

    createSurvey (req, res) {
        const { userId, surveyName, surveyDescription, surveyCategory, surveyQuestions } = req.body 
        if ( !userId || !surveyName || !surveyDescription || !surveyCategory || surveyQuestions ) {
            console.log('Some fields are not filled');
            return res.send ({
                error: true,
                code: 503,
                message: "userId, surveyName, surveyDescription, surveyCategory, surveyQuestions must be passed"
            })
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

        // Endpoint 4

    getQuestionsByUserId (req, res) {
        const { userId } = req.params;
        if ( !userId ) {
            return res.send ({
                error: true,
                code: 400,
                message: 'userId must be passed'
            })
        }
        return QuestionsModel.findById({
                userId
            }).then((resp) => {
            if (resp) { 
                console.log(resp);
             return res.send ({
                error: false,
                code: 201,
                message: 'Query was successfull',
                result: resp 
                });
            }
            console.log(resp);
        return res.send ({
                error: false,
                code: 201,
                message: 'Question was successfully fetched'    
            });
        }).catch((err) => {
            console.log('Data does not exist in the DB');
            return res.send ({
                error: true,
                status: 400,
                message: 'Unable to query question'
            });
        }) 
    }

     // Endpoint 5

    getIndQuestions (req, res) {
        const id = (req.params.questionsId);
                QuestionsModel.findById({
                    _id: id
                }).then((resp) => {
                if (resp) { 
                    console.log(resp);
                 return res.send ({
                    error: false,
                    code: 201,
                    message: 'Query was successfull',
                    result: resp 
                    });
                }
                console.log(resp);
            return res.send ({
                    error: false,
                    code: 201,
                    message: 'Question was successfully fetched'    
                });
            }).catch((err) => {
                console.log('Data does not exist in the DB');
                return res.send ({
                    error: true,
                    status: 400,
                    message: 'Unable to fetch question from the Database'
                });
            }) 
       }

           // Endpoint 6

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


            // Save a category for Endpoint

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


        // Get all questions

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








