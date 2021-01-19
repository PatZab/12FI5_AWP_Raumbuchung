const express = require('express');
const bodyParser = require('body-parser');
const loginRouter = express.Router();

loginRouter.use(express.json());

loginRouter.post("/", (req, res, next) => {
    //todo read body of post to get info

});

module.exports = loginRouter;