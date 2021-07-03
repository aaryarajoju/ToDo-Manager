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

app.get('/api/tasks', db.getTasks);
app.get('/api/tasks/:id', db.getTaskById);
app.post('/api/tasks', db.createTask);
app.put('/api/tasks/:id', db.updateTask);
app.delete('/api/tasks/:id', db.deleteTask);

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
