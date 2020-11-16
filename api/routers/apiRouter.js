const express = require('express');
const apiRouter = express.Router();
const databaseRouter = require('./databaseRouter');

apiRouter.use('/database', databaseRouter);

apiRouter.get('/', (req, res, next) => {
    console.error('API-TEST');
})

module.exports = apiRouter;