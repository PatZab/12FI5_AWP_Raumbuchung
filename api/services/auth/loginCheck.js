const dbAction = require("../../data-access/databaseAction");

async function passwordCheck(userNameInput, userPasswordInput) {
    // Reading login data from database
    try {
        let dbResult = await dbAction.select.password(userNameInput);
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
            console.error('Password Mismatch!')
            return false;
        }
    } catch (error) {
        console.error(error);
        console.error("No user was found in database!")
        return false;
    }

}

module.exports = passwordCheck;