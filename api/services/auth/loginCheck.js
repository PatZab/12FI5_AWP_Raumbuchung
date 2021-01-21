const dbAction = require("../../data-access/dbAction");

async function passwordCheck(userName, passwordInput) {
    // Reading login data from database
    try {
        let dbResult = await dbAction.select.loginData(userName);
        let passwordDB = dbResult.password;
        // console.log("Password in database: " + passwordDB)
        // console.log("Type: " + typeof passwordDB);

        if (typeof passwordDB != 'string') {
            console.log("Converting to string")
            passwordDB = passwordDB.toString();
        }

        // console.log(typeof passwordDB)

        if (passwordInput === passwordDB) {
            console.log('Password Match!');
            return true;
        } else {
            console.log('Password Mismatch!')
            return false;
        }
    } catch (error) {
        console.log(error);
        await passwordCheck(userName, passwordInput);
    }

}

module.exports = passwordCheck;