const express = require('express');
const databaseRouter = express.Router();
const dbReadRouter = require('./databaseReadRouter');
const dbInsertRouter = require('./databaseInsertRouter');
const dbRemoveRouter = require('./databaseRemoveRouter');

databaseRouter.use('/read', dbReadRouter);
databaseRouter.use('/insert', dbInsertRouter);
databaseRouter.use('/remove', dbRemoveRouter);

module.exports = databaseRouter;

