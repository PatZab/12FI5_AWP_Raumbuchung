/**
 * This module is for execute database actions
 * Note: plain means that no joins or similar have been made on the table
 */

const sqlite3 = require('sqlite3')
const databasePath = './database/' //todo: add database



const select = {
    /**
     * Method for getting all rows and columns of a given database table
     * @param {String} table - Database table
     * @param {CallbackFunction} callback - Callback function for processing rows
     */
    allColumnsAllRowsPlain(table, callback) {
        const db = dbConnection.openDBConnection(databasePath)
        const sql = `SELECT * FROM ${table}`
        db.all(sql, (err, rows) => {
            if (err) {
                callback(err)
            } else {
                callback(null, rows)
            }
        })
        dbConnection.closeDBConnection(db)
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

