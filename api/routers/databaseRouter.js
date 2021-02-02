const express = require('express');
const databaseRouter = express.Router();
const DBReadRouter = require('./databaseReadRouter')

databaseRouter.use('/read', DBReadRouter);

module.exports = databaseRouter;

