const dbAction = require("../../data-access/dbAction");

function passwordCheck(/*todo: input from request*/) {

    //Reading login data from database
    dbAction.select.loginData(/*todo: correct input from outside*/ 'ksteinam', (err, rows) => {
        loginData = rows;

    });

}

module.exports = passwordCheck;