const express = require('express');
const apiRouter = express.Router();
const databaseRouter = require('./databaseRouter');
const authRouter = require('./authRouter');

apiRouter.use('/database', databaseRouter);
apiRouter.use('/auth', authRouter);

apiRouter.get('/', (req, res, next) => {
    console.error('API-TEST');
})

module.exports = apiRouter;