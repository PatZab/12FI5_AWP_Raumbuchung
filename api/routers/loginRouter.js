const express = require('express');
const bodyParser = require('body-parser');
const loginRouter = express.Router();
const passwordCheck = require('../services/auth/loginCheck');

loginRouter.use(bodyParser.urlencoded({extended: false}));

loginRouter.use(express.json());

loginRouter.post("/", (req, res) => {
    let userNameInput = req.body.user_name;
    let userPasswordInput = req.body.user_password;
    passwordCheck(userNameInput, userPasswordInput).then((resolve) => {
    res.json({
        login: resolve,
        name: req.body.user_name
    });
    console.log(res)
     }).catch((error) => {
        console.log(error);
    })

});

module.exports = loginRouter;