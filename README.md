# ToDo-Manager

Web-based Tasks List manager.
User can add/update/delete a task, along with tracking the progress of the task.

## Working

### DB:
- postgres was set up with a new db, and one table, nmed `task`
- in tasks, there are three columns - `id` (primary key), `taskname`, and `status`
- the crud operations are handled through node.js, using the `pg` module

### Rest API:
- express is set upt to listen on the port 3000
- `queries.js` has all the sql queries, required for the crud operations, which are written using the `pg` node module
- the `api.js` handles the express server, and also routes the http request to the respective function in `queries.js`
- the http requests are sent by the client-side js, on button presses, or text filed changes, using event listeneres

### Website:
- served as static webpage, by express.js
- the html file has one div for the entire body, all the elemnts are added to the DOM, using the `script.js` file
- the `script.js` file also has even listeners on every button and text inputs, which send the http reqest to the Res API, to communicate with the db.
- when the page first loads, it gets all the tasks from the db, by sending a `GET` request
- then, based on the user action, `POST`, `PUT`, and `DELETE` requests are sent to update the db

---

## Navigation of the repo

- all of the project code is in [`./src`](https://github.com/aaryarajoju/ToDo-Manager/tree/main/src)
- all of the website code is in [`./src/website`](https://github.com/aaryarajoju/ToDo-Manager/tree/main/src/website)

---

## Technologies Used

- `Express.JS` - Rest API
- `Node.JS` - local server
- `PostgreSQL` - DBMS
- `HTML/CSS & Vanilla JS` - webpage

---

## License 

The code is licensed under [`GNU GENERAL PUBLIC LICENSE v3.0`](https://github.com/aaryarajoju/ToDo-Manager/blob/main/LICENSE)
