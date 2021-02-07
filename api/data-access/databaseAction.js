/**
 * This module is for execute database actions
 * Note: plain means that no joins or similar have been made on the table
 */

const sqlite3 = require('sqlite3')
const databasePath = './database/mydb.db'

//Todo: DRY!
const select = {

    roles() {
        return new Promise((resolve, reject) => {
            const db = dbConnection.openDBConnection(databasePath);
            const sql = `SELECT * FROM Roles`;
            db.all(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
            dbConnection.closeDBConnection(db);
        });
    },


    departments() {
        return new Promise((resolve, reject) => {
            const db = dbConnection.openDBConnection(databasePath);
            const sql = `SELECT * FROM Departments`;
            db.all(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
            dbConnection.closeDBConnection(db);
        });
    },

    areas() {
        return new Promise((resolve, reject) => {
            const db = dbConnection.openDBConnection(databasePath);
            const sql = `SELECT * FROM Areas`;
            db.all(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
            dbConnection.closeDBConnection(db);
        });
    },

    roomtypes() {
        return new Promise((resolve, reject) => {
            const db = dbConnection.openDBConnection(databasePath);
            const sql = `SELECT * FROM Roomtypes`;
            db.all(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
            dbConnection.closeDBConnection(db);
        });
    },

    users() {
        return new Promise((resolve, reject) => {
            const db = dbConnection.openDBConnection(databasePath);
            const sql = `SELECT Users.id,
                                Users.first_name,
                                Users.last_name,
                                Users.username,
                                Roles.role,
                                Departments.department
                            FROM Users
                            JOIN Roles ON Users.roles_id = Roles.id
                            JOIN Departments On Users.departments_id = Departments.id`;
            db.all(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
            dbConnection.closeDBConnection(db);

        });
    },

    slots() {
      return new Promise((resolve, reject) => {
          const db = dbConnection.openDBConnection(databasePath);
          const sql = `SELECT * FROM Slots`;
          db.all(sql, (err, results) => {
              if (err) {
                  reject(err);
              } else {
                  resolve(results);
              }
          });
          dbConnection.closeDBConnection(db);
      })
    },

    rooms() {
        return new Promise((resolve, reject) => {
            const db = dbConnection.openDBConnection(databasePath);
            const sql = `SELECT Rooms.id,
                                Rooms.building, 
                                Rooms.room_number, 
                                Roomtypes.type, 
                                Areas.name AS areaname
                            FROM Rooms 
                            JOIN Roomtypes ON Rooms.roomtypes_id=Roomtypes.id 
                            JOIN Areas ON Rooms.areas_id=Areas.id;`;
            db.all(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
            dbConnection.closeDBConnection(db);

        })
    },

    password(userNameInput) {
        return new Promise((resolve, reject) => {
            const db = dbConnection.openDBConnection(databasePath);
            const sql = `SELECT password FROM Users WHERE username=$userName`;
            const params = {$userName: userNameInput};
            db.get(sql, params, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
            dbConnection.closeDBConnection(db);
        })
    },

    /**
     * Method for reading the whole table "Occupancy" with all linked tables joined
     * @param {callback} callback - Callback function for processing table data
     * */
    occupancies() {
        return new Promise((resolve, reject) => {
            const db = dbConnection.openDBConnection(databasePath);
            const sql = `SELECT Occ.date,
                                Slots.start_time,
                                Slots.end_time,
                                Users.username AS booker,
                                Rooms.building,
                                Rooms.room_number,
                                Areas.name AS area,
                                Roomtypes.type AS room_type       
                         FROM Occupancies AS Occ
                         JOIN Slots ON Occ.slots_id = Slots.id
                         JOIN Users ON Occ.users_id = Users.id
                         JOIN Rooms ON Occ.rooms_id = Rooms.id
                         JOIN Areas ON Rooms.areas_id = Areas.id
                         JOIN Roomtypes ON Rooms.roomtypes_id = Roomtypes.id;`;
            db.all(sql, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }

            });
            dbConnection.closeDBConnection(db);
        });
    },

    /**
     * Method for getting all rows for specific columns of a given database table
     * @param {String} table - Database table
     * @param {Array} columns - Single or multiple database columns of the table
     * @param {CallbackFunction} callback - Callback function for processing rows
     */
    specificColumnsAllRowsPlain(table, columns, callback) {
        const db = dbConnection.openDBConnection(databasePath)
        const sql = `SELECT ${columns} FROM ${table}`
        db.all(sql, (err, rows) => {
            if (err) {
                callback(err)
            } else {
                callback(null, rows)
            }
        })
        dbConnection.closeDBConnection(db)
    }
};

const insert = {

    occupancies(date, slotsId, roomsId, usersId) {
        const db = dbConnection.openDBConnection(databasePath);
        const sql = `INSERT INTO Occupancies (date, slots_id, rooms_id, users_id) VALUES ($date, $slots_id, $rooms_id, $users_id);`;
        const params = {
            $date: date,
            $slots_id: slotsId,
            $rooms_id: roomsId,
            $users_id: usersId
        };
        db.run(sql, params, (err) => {
            if (err) {
                console.error(err);
            }
        });
        dbConnection.closeDBConnection(db);
    },




};

const update = {
    /**
     * Method for updating a column of specific rows
     * @param {String} table - Database table
     * @param {String} column - Database column of given table to be updated
     * @param {String} whereColumn - Database column to specifiy the row
     * @param {String} columnValue - Value to set
     * @param {String} whereColumnValue - Value to check for where column
     * @return {void}
     */
    singleColumnSingleRow(table, column, whereColumn, columnValue, whereColumnValue) {
        const db = dbConnection.openDBConnection(databasePath)
        const sql = `UPDATE ${table} SET ${column} = $columnValue WHERE ${whereColumn} = $whereColumnValue`
        const params = {$columnValue: columnValue, $whereColumnValue: whereColumnValue}
        db.run(sql, params, (err) => {
            if (err) {
                console.error(err.message)
            }
            console.log(`Update on ${table} successful!`)
        })
        dbConnection.closeDBConnection(db);
    }
};

const remove = {
    /**
     * Method deletes a specific row in a table
     * @param {String} table
     * @param {String} conditionColumn
     * @param {String} condition
     * @return {void}
     */
    singleEntry(table, conditionColumn, condition) {
        const db = dbConnection.openDBConnection(databasePath)
        const sql = `DELETE FROM ${table} WHERE ${conditionColumn} = $condition`
        const params = {$condition: condition}
        db.run(sql, params, (err) => {
            if (err) {
                console.error(err.message)
            } else {
                console.log(`Deleted row from ${table}!`)
            }
        })
        dbConnection.closeDBConnection(db);
    }
};

const dbConnection = {
    /**
     * Method opens a DB connection to given SQLite database
     * @param {String}databasePath - Relative path to the database file
     * @return {sqlite3.Database}
     */
    openDBConnection(databasePath) {
        return new sqlite3.Database(databasePath, (err) => {
            if (err) {
                return console.error(err.message)
            } else {
                console.log('Connected to database.')
            }
        })
    },

    /**
     * Method closes a DB connection to given SQLite database
     * @param {sqlite3.Database}openDatabase - Opened database
     * @return {void}
     */
    closeDBConnection(openDatabase) {
        openDatabase.close((err) => {
            if (err) {
                return console.error(err.message)
            } else {
                console.log('Closed database connection. ')
            }
        })
    }
}

module.exports = {select, insert, update, remove}

