const express = require('express');
const databaseRouter = express.Router();

databaseRouter.get('/', (req, res, next) => {
    console.log('DATABASE TEST');
})

module.exports = databaseRouter;

