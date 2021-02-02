const express = require('express');
const databaseReadRouter = express.Router();
const databaseAction = require('../data-access/databaseAction.js');

databaseReadRouter.get('/occupancies', (req, res) => {

    databaseAction.select.occupancies()
        .then((result) => {res.send(result)})
        .catch((err) => {console.error(err)});
});

databaseReadRouter.get('/rooms', (req, res) => {
    databaseAction.select.rooms()
        .then(result => {res.send(result)})
        .catch(err => {console.error(err)})
});

module.exports = databaseReadRouter;