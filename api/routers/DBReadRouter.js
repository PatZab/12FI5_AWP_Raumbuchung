const express = require('express');
const DBReadRouter = express.Router();
const dbAction = require('../data-access/dbAction.js');

DBReadRouter.get('/occupancies', (req, res) => {

    dbAction.select.occupancies()
        .then((result) => {res.send(result)})
        .catch((err) => {console.error(err)});
});

module.exports = DBReadRouter;