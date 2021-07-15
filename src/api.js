/*
*  Copyright (c) 2021 AARYA RAJOJU. Rights reserved.
*  This Code is licensed under the GNU General Public License v3.0
*  refer: https://github.com/aaryarajoju/ToDo-Manager/blob/main/LICENSE
*/

const express = require('express');
const db = require('./queries');

const app = express();
const port = 3000;

app.use(express.static('./src/website'))
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get('/api/tasks', (req, res) => db.getTasks(req, res));
app.get('/api/tasks/:id', (req, res) => db.getTaskById(req, res));
app.post('/api/tasks', (req, res) => db.createTask(req, res));
app.put('/api/tasks/:id', (req, res) => db.updateTask(req, res));
app.delete('/api/tasks/:id', (req, res) => db.deleteTask(req, res));

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
