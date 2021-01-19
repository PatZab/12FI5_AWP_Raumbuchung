const express = require('express');
const apiRouter = express.Router();
const databaseRouter = require('./databaseRouter');
const authRouter = require('./authRouter');

apiRouter.use('/database', databaseRouter);
apiRouter.use('/auth', authRouter);

module.exports = apiRouter;