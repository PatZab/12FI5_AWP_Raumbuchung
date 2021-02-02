const express = require('express');
const databaseReadRouter = express.Router();
const databaseAction = require('../data-access/databaseAction.js');

databaseReadRouter.get('/occupancies', (req, res) => {

    databaseAction.select.occupancies()
        .then((result) => {res.send(result)})
        .catch((err) => {console.error(err)});
});

module.exports = databaseReadRouter;