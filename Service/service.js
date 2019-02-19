const userModel = require('../Model/user')

module.exports = {


    checkIfUserExists(username) {
        userModel.findOne({
            username: username
        }).then((user) => {
            if (user) {
                console.log('The name exist in the DB')
                return true;
            } else {
                return false
            }
        }).catch((err) => {
            console.log('err', err)
        })
    }

};