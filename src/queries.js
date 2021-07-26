/*
*  Copyright (c) 2021 AARYA RAJOJU. Rights reserved.
*  This Code is licensed under the GNU General Public License v3.0
*  refer: https://github.com/aaryarajoju/ToDo-Manager/blob/main/LICENSE
*/

// importing config details for the database from the `config.json` file
const {user, host, database, password, port} = require("./config.json");

// importing the `pg` node module and setting up a pool connection to the database
const Pool = require('pg').Pool;
const pool = new Pool({
    user: user,
    host: host,
    database: database,
    password: password,
    port: port,
});

// function to get all tasks
const getTasks = (request, response) => {
    // use `SELECT` query to get all the data
    pool.query(
        'SELECT * FROM tasks ORDER BY id ASC',
        (error, results) => {
            if (error) {
                throw error;
            }
            // send the response with the query result
            response.status(200).json(results.rows)
        }
    );
};

// function to get a particular task
const getTaskById = (request, response) => {
    // getting the parameter
    const id = parseInt(request.params.id);

    // use the `SELECT` query and then `WHERE` to get a one row
    pool.query(
        'SELECT * FROM tasks WHERE id = $1', [id],
        (error, results) => {
            if (error) {
                throw error;
            }
            // send the response with the query result
            response.status(200).json(results.rows);
        }
    );
};

// function to create task
const createTask = (request, response) => {
    // getting the parameters
    const { taskname, status } = request.body;

    // use the `INSERT` query to enter the data in the table
    pool.query(
        'INSERT INTO tasks (taskname, status) VALUES ($1, $2) RETURNING id', [taskname, status],
        (error, results) => {
            if (error) {
                throw error;
            }
            // send the response with the confirmation
            response.status(201).send(`${results.rows[0].id}`);
        }
    );
};

// function to update task
const updateTask = (request, response) => {
    // getting the parameters
    const id = parseInt(request.params.id);
    const { taskname, status } = request.body;

    // use the `UPDATE` query to change a row
    pool.query(
        'UPDATE tasks SET taskname = $1, status = $2 WHERE id = $3', [taskname, status, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            // send the response with the confirmation
            response.status(200).send(`Task modified with ID: ${id}`);
        }
    );
};

// function to delete task
const deleteTask = (request, response) => {
    // getting the parameter
    const id = parseInt(request.params.id)

    // use the `DELETE` query to delete a row
    pool.query(
        'DELETE FROM tasks WHERE id = $1', [id],
        (error, results) => {
            if (error) {
                throw error;
            }
            // send the response with the confirmation
            response.status(200).send(`Task deleted with ID: ${id}`);
        }
    );
};

// exporting all the functions
module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
};
