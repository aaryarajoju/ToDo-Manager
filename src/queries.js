/*
*  Copyright (c) 2021 AARYA RAJOJU. Rights reserved.
*  This Code is licensed under the GNU General Public License v3.0
*  refer: https://github.com/aaryarajoju/ToDo-Manager/blob/main/LICENSE
*/

const {user, host, database, password, port} = require("./config.json");

const Pool = require('pg').Pool;
const pool = new Pool({
    user: user,
    host: host,
    database: database,
    password: password,
    port: port,
});

const getTasks = (request, response) => {
    pool.query(
        'SELECT * FROM tasks ORDER BY id ASC',
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows)
        }
    );
};

const getTaskById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(
        'SELECT * FROM tasks WHERE id = $1', [id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    );
};

const createTask = (request, response) => {
    const { taskname, status } = request.body;

    pool.query(
        'INSERT INTO tasks (taskname, status) VALUES ($1, $2) RETURNING id', [taskname, status],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(201).send(`${results.rows[0].id}`);
        }
    );
};

const updateTask = (request, response) => {
    const id = parseInt(request.params.id);
    const { taskname, status } = request.body;

    pool.query(
        'UPDATE tasks SET taskname = $1, status = $2 WHERE id = $3', [taskname, status, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`Task modified with ID: ${id}`);
        }
    );
};

const deleteTask = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query(
        'DELETE FROM tasks WHERE id = $1', [id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`Task deleted with ID: ${id}`);
        }
    );
};

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
};
