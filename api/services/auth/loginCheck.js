const dbAction = require("../../data-access/dbAction");

async function passwordCheck(userNameInput, userPasswordInput) {
    // Reading login data from database
    try {
        let dbResult = await dbAction.select.loginData(userNameInput);
        let userPasswordDB = dbResult.password;
        // console.log("Password in database: " + passwordDB)
        // console.log("Type: " + typeof passwordDB);

        if (typeof userPasswordDB != 'string') {
            console.log("Converting to string")
            userPasswordDB = userPasswordDB.toString();
        }

        // console.log(typeof passwordDB)

        if (userPasswordInput === userPasswordDB) {
            console.log('Password Match!');
            return true;
        } else {
            console.log('Password Mismatch!')
            return false;
        }
    } catch (error) {
        console.error(error);
        console.error("No user was found in database!")
        await passwordCheck(userNameInput, userPasswordInput);
    }

}

module.exports = passwordCheck;