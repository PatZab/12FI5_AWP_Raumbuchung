/**
 * This module is for execute database actions
 * Note: plain means that no joins or similar have been made on the table
 */

const sqlite3 = require('sqlite3')
const databasePath = './database/mydb.db' //todo: add database


const select = {
    // /**
    //  * Method for getting all rows and columns of a given database table
    //  * @param {String} table - Database table
    //  * @param {CallbackFunction} callback - Callback function for processing rows
    //  */
    // allColumnsAllRowsPlain(table, callback) {
    //     const db = dbConnection.openDBConnection(databasePath)
    //     const sql = `SELECT * FROM ${table}`
    //     db.all(sql, (err, rows) => {
    //         if (err) {
    //             callback(err)
    //         } else {
    //             callback(null, rows)
    //         }
    //     });
    //     dbConnection.closeDBConnection(db)
    // },

    loginData(userNameInput) {
        return new Promise((resolve, reject) => {
            const db = dbConnection.openDBConnection(databasePath);
            const sql = `SELECT password FROM Logindata WHERE user_name=$userName`;
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
    occupancy() {
        return new Promise((resolve, reject) => {
            const db = dbConnection.openDBConnection(databasePath);
            const sql = `SELECT Occ.date,
                                Slots.start_time,
                                Slots.end_time,
                                Users.last_name AS booker,
                                Rooms.location AS building,
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
    //todo add insert action ind dbAction.js

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

