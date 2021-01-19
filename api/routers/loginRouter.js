const express = require('express');
const bodyParser = require('body-parser');
const loginRouter = express.Router();
const loginCheck = require('../services/auth/loginCheck');

loginRouter.use(express.json());

loginRouter.post("/", (req, res, next) => {
    loginCheck();
    //todo read body of post to get info

});

module.exports = loginRouter;