const express = require('express');
const databaseRouter = express.Router();
const dbReadRouter = require('./databaseReadRouter');
const dbInsertRouter = require('./databaseInsertRouter');
const dbRemoveRouter = require('./databaseRemoveRouter');
const dbUpdateRouter = require('./database-routers/databaseUpdateRouter');

databaseRouter.use('/read', dbReadRouter);
databaseRouter.use('/insert', dbInsertRouter);
databaseRouter.use('/remove', dbRemoveRouter);
databaseRouter.use('/update', dbUpdateRouter);

module.exports = databaseRouter;

