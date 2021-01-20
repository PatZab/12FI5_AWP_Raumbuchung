const dbAction = require("../../data-access/dbAction");

function passwordCheck(/*todo: input from request*/) {

    //Reading login data from database
    var test;
    dbAction.select.loginData(/*todo: correct input from outside*/ 'ksteinam')
    .then(
        (resolved) => {
            console.log(resolved);
            console.log(resolved[0].password)
        }
    )
        .catch((rejected) => {
            console.log(rejected);
        })

}

module.exports = passwordCheck;