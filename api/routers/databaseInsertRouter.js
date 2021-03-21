const express = require('express');
const databaseInsertRouter = express.Router();
const bodyParser = require('body-parser');
const databaseAction = require('../data-access/databaseAction.js');

databaseInsertRouter.use(bodyParser.urlencoded({extended: false}));

databaseInsertRouter.use(express.json());

databaseInsertRouter.post('/occupancies', (req, res) => {
    let date = req.body.date;
    let slotsId = req.body.slotsId;
    let roomsId = req.body.roomsId;
    let usersId = req.body.usersId;
    // console.log(date, slotsId, roomsId, usersId);

    databaseAction.insert.occupancies(date, slotsId, roomsId, usersId);
});

databaseInsertRouter.post('/users', (req, res) => {
    let firstName = req.body.first_name;
    let lastName = req.body.last_name;
    let password = req.body.password;
    let userName = req.body.username;
    let rolesId = req.body.roles_id;
    let departmentsId = req.body.departments_id;
    databaseAction.insert.users(firstName, lastName, password, userName, rolesId, departmentsId);
});

module.exports = databaseInsertRouter;