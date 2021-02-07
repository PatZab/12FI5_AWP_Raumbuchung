const express = require('express');
const databaseRemoveRouter = express.Router();
const bodyParser = require('body-parser');
const databaseAction = require('../data-access/databaseAction.js');

databaseRemoveRouter.use(bodyParser.urlencoded({extended: false}));

databaseRemoveRouter.post('/occupancies', (req, res) => {
    let date = req.body.date;
    let startTime = req.body.start_time;
    let building = req.body.building;
    let roomNumber = req.body.room_number;
    databaseAction.remove.occupancies(date, startTime, building, roomNumber);
})






module.exports = databaseRemoveRouter