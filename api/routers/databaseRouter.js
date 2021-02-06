const express = require('express');
const databaseRouter = express.Router();
const dbReadRouter = require('./databaseReadRouter');
const dbInsertRouter = require('./databaseInsertRouter');

databaseRouter.use('/read', dbReadRouter);
databaseRouter.use('/insert', dbInsertRouter)

module.exports = databaseRouter;

