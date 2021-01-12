const express = require('express');
const databaseRouter = express.Router();
const DBReadRouter = require('./DBReadRouter')

databaseRouter.use('/read', DBReadRouter);

databaseRouter.get('/', (req, res, next) => {
    //console.log('DATABASE TEST');


})


module.exports = databaseRouter;

