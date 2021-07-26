/*
*  Copyright (c) 2021 AARYA RAJOJU. Rights reserved.
*  This Code is licensed under the GNU General Public License v3.0
*  refer: https://github.com/aaryarajoju/ToDo-Manager/blob/main/LICENSE
*/

// importing the `express` node module
const express = require('express');

// importing the file with all the crud operation functions
const db = require('./queries');

// initiating a new express app
const app = express();
const port = 3000;

// serving the website as a static site through express
app.use(express.static('./src/website'))

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);

// routing the http request to their respective functions
app.get('/api/tasks', (req, res) => db.getTasks(req, res));
app.get('/api/tasks/:id', (req, res) => db.getTaskById(req, res));
app.post('/api/tasks', (req, res) => db.createTask(req, res));
app.put('/api/tasks/:id', (req, res) => db.updateTask(req, res));
app.delete('/api/tasks/:id', (req, res) => db.deleteTask(req, res));

// starting listening on the local server
app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
