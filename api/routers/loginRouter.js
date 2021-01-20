const express = require('express');
const bodyParser = require('body-parser');
const loginRouter = express.Router();
const loginCheck = require('../services/auth/loginCheck');

loginRouter.use(express.json());

loginRouter.post("/", (req, res, next) => {
    loginCheck(req.req.body.user_name, req.body.user_passwort);
    //todo read body of post to get info
    // console.log("Login pressed");
    // console.log("Name: " + req.body.user_name);
    // console.log("Passwort: " + req.body.user_passwort);
});

module.exports = loginRouter;