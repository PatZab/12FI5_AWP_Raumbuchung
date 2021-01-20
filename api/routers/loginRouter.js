const express = require('express');
const bodyParser = require('body-parser');
const loginRouter = express.Router();
const app = express();
const loginCheck = require('../services/auth/loginCheck');

loginRouter.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

loginRouter.post("/", (req, res, next) => {

    console.log(req.body.user_name)
    console.log(req.body.user_password)
    loginCheck(req.body.user_name, req.body.user_password);
    //todo read body of post to get info
    // console.log("Login pressed");
    // console.log("Name: " + req.body.user_name);
    // console.log("Passwort: " + req.body.user_passwort);
});

module.exports = loginRouter;