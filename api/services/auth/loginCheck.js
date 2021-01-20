const dbAction = require("../../data-access/dbAction");

async function passwordCheck(userName, passwordInput) {
    // var checkResult = false;
    // console.log("Input:" + typeof passwordInput);
    // console.log("Input:" + passwordInput)
    // Reading login data from database
    let passwordObject = await dbAction.select.loginData(userName);
    let passwordDB = passwordObject[0].password;
    if (passwordInput === passwordDB) {
        console.log('Password Match!');
        return true;
    } else {
        console.log('Password Mismatch!')
        return false;
    }

    // dbAction.select.loginData(userName).then(
    //     (resolved) => {
    //         let passwordDB = resolved[0].password;
    //         console.log("DB: " + typeof passwordDB);
    //         console.log("DB: " + passwordDB);
    //
    //         if (passwordInput === passwordDB) {
    //             console.log('Password Match!');
    //
    //         } else {
    //             console.log('Password Mismatch!')
    //
    //         }
    //     }
    // )
    // .catch((rejected) => {
    //     console.log(rejected);
    // })

    // console.log(checkResult);
    // return checkResult;

}

module.exports = passwordCheck;