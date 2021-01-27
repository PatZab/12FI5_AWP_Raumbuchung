const express = require('express');
const bodyParser = require('body-parser');
const loginRouter = express.Router();
const passwordCheck = require('../services/auth/loginCheck');

loginRouter.use(bodyParser.urlencoded({extended: false}));

loginRouter.post("/", (req, res, next) => {
    // console.log(req.body.user_name)
    // console.log(req.body.user_password)
    let userNameInput = req.body.user_name;
    let userPasswordInput = req.body.user_password;
    passwordCheck(userNameInput, userPasswordInput).then((resolve) => {
        res.send(resolve);
    }).catch((error) => {
        console.log(error);
    })
});

module.exports = loginRouter;