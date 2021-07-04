# Commands Used for DBMS

DB used: `PostgreSQL v13`


## Setting up the database

```SQL
CREATE DATABASE todo;

\c todo;

CREATE TABLE tasks(
        ID SERIAL PRIMARY KEY,
        taskName varchar(200),
        status   varchar(50)
    );
```

---

## CRUD Operations

1. CREATE
```SQL
INSERT INTO tasks (taskname, status) 
    VALUES ($1, $2) RETURNING id, 
    [taskname, status];
```

2. READ
```SQL
// for getting all values
SELECT * FROM tasks 
    ORDER BY id ASC;

// for getting a particular task
SELECT * FROM tasks 
    WHERE id = $1, 
    [id];
```



3. UPDATE
```SQL
UPDATE tasks 
    SET taskname = $1, 
    status = $2 
    WHERE id = $3, 
    [taskname, status, id];
```

4. DELETE
```SQL
DELETE FROM tasks 
    WHERE id = $1, 
    [id];
```

---
