## Working

- The DBMS was set up, using the commands listed in the `db_commands.md`
- the `api.js` file handles all the api calls and routes them to the respective functions in `queries.js`
- The `queries.js` handles all the sql queries to the db, using the`pg` node module
- the express app in `api.js` also serves the static code for the webpage

---

## Navigation of the code

- [`./website`](https://github.com/aaryarajoju/ToDo-Manager/blob/main/src/website) - code for the webpage
- [`db_commands.md`](https://github.com/aaryarajoju/ToDo-Manager/blob/main/src/db_commands.md) - the sql commands i used to set up the db, and the crud operations
- [`queries.js`](https://github.com/aaryarajoju/ToDo-Manager/blob/main/src/queries.js) - js file with the sql queries for crud operations 
- [`api.js`](https://github.com/aaryarajoju/ToDo-Manager/blob/main/src/api.js) - js file for express app

---
