const dbAction = require("../../data-access/dbAction");

function passwordCheck(userName, passwordInput) {
    var checkResult = false;
    //Reading login data from database
    dbAction.select.loginData(userName)
    .then(
        (resolved) => {
            let passwordDB = resolved[0].password;
            if (passwordInput === passwordDB) {
                console.log('Password Match!');
                checkResult = true;
            } else {
                console.log('Password Mismatch!')
                checkResult = false;
            }
        }
    )
    .catch((rejected) => {
        console.log(rejected);
    })

    return checkResult;

}

module.exports = passwordCheck;