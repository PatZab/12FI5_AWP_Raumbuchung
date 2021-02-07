const express = require('express');
const databaseUpdateRouter = express.Router();
const bodyParser = require('body-parser');
const databaseAction = require('../../data-access/databaseAction.js');

databaseUpdateRouter.use(bodyParser.urlencoded({extended: false}));

databaseUpdateRouter.post('/occupancies', (req, res) => {

})

module.exports = databaseUpdateRouter;