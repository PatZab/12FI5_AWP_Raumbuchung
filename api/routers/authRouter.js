const express = require('express');
const bodyParser = require('body-parser');
const authRouter = express.Router();
const loginRouter = require("./loginRouter");

authRouter.use("/login", loginRouter);

module.exports = authRouter;
