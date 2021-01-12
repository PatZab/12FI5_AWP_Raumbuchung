const express = require('express');
const DBReadRouter = express.Router();
const dbAction = require('../data-access/dbAction.js');

DBReadRouter.get('/', (req, res, next) => {
    dbAction.select.allColumnsAllRowsPlain("Login",(err, rows)=>{
        res.send(rows);
    })
});

module.exports = DBReadRouter;