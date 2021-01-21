const express = require('express');
const databaseRouter = express.Router();
const DBReadRouter = require('./DBReadRouter')

databaseRouter.use('/read', DBReadRouter);

module.exports = databaseRouter;

