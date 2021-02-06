const express = require('express');
const databaseInsertRouter = express.Router();
const bodyParser = require('body-parser');
const databaseAction = require('../data-access/databaseAction.js');

databaseInsertRouter.use(bodyParser.urlencoded({extended: false}));

databaseInsertRouter.post('/occupancies', (req, res) => {
    let date = req.body.date;
    let slotsId = req.body.slotsId;
    let roomsId = req.body.roomsId;
    let usersId = req.body.usersId;
    console.log(date, slotsId, roomsId, usersId);

    databaseAction.insert.occupancies(date, slotsId, roomsId, usersId);
});




module.exports = databaseInsertRouter;