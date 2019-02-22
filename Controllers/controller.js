const signInModel = require('../Model/signIn')
const categoryModel = require('../Model/category');
const QuestionsModel = require('../Model/questions');



module.exports = {
    createSurvey: (req, res) => {
        const { questions, username, options, category } = req.body         
        console.log(req.body);
        QuestionsModel.create({
            questions,
            username,
            options,
            category
        }).then((resp) => {
            console.log('Saved',resp);
                return res.send ({
                    error: false,
                    status: 201,
                    message: 'Questions was saved successfully'
                })
            }).catch((err) => {
                console.log('Not saved',err);
                return res.send ({
                    error: true,
                    status: 400,
                    message: 'Unable to save questions to the Database'
                })
            })

    },

    // SignIn 

    signIn: (req, res) =>{
        const { name, email, authToken } = req.body;
    return signInModel.create({
        name,
        email,
        authToken
    }).then((response) => {
        console.log('User succesfully signed in', response);
        return res.send({
            err: false, 
            code: 200,
            message: 'User successfully signed in',
            response: response
        });
    }).catch(() => {
        console.log('Unable to sign in user');
        return res.send({
            err: true, 
            code: 400,
            message: 'Name already taken', 
        });
    })
 },
    
    // Get all questions

    getQuestions: (req, res) => {

        return QuestionsModel.aggregate([
            {
                $lookup: {
                    from: "Login",
                    localField: "username",
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
                data: resp,
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
    },

    // Get Individual Questions

    getIndQuestions: (req, res) => {
        const id = (req.params.questionsId);
            QuestionsModel.findById({
                _id: id
            }).then((resp) => {
            if (resp) { 
                console.log(resp);
               return res.send ({
                error: false,
                code: 201,
                 message: 'Question was successfully fetched',
                 data: resp 
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
    },

    // Get Questions by category

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
