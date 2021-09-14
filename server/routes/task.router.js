const express = require('express');
const router = express.Router();

const pool = require('../modules/pool.js');

// POST of new task request from client
router.post('/', (req, res) => {
    const newTask = req.body;
    // expecting object with 1 to 4 properties
    console.log('Posting new task', newTask);
    // writing query to database 
    const queryText = `
                INSERT INTO "tasks"
                ("task", "isComplete", "whenCompleted", "details")
                VALUES
                ($1, $2, $3, $4);
            `;
    pool.query(queryText, [ // sending query to database via pool module, filtering client data through pg
        newTask.task,
        newTask.isComplete,
        newTask.whenCompleted,
        newTask.details,
    ]).then((result) => { // sending success back to client
        console.log('POST new task success!');
        res.sendStatus(201);
    }).catch((error) => { // in event of error
        console.log('Error in POST', error);
        res.sendStatus(500);
    });
});

// GET tasks from database
router.get('/', (req, res) => {
    console.log('Getting task list');
    // querying database "tasks" table for all items
    const queryText = 'SELECT * FROM "tasks" ORDER BY "id";';
    pool.query(queryText).then((result) => { // expecting table results from database
        res.send(result.rows); //send array of rows objects
    }).catch(error => {
        console.log('error getting tasks', error);
        res.sendStatus(500);
    });
});

// PUT task alterations to table, identify by id
router.put('/:id', (req, res) => {
    let reqId = req.params.id; // id parameter received from client request
    console.log('PUT request for id', reqId);
    // Toggle that boolean value isComplete
    let queryText = 'UPDATE "tasks" SET "isComplete" = NOT "isComplete" WHERE "id" = $1 RETURNING *;'
    pool.query(queryText, [reqId]) // sending query to database via pool module, filtering client data through pg
        .then((result) => {
            console.log('Task updated');
            res.sendStatus(200); // send success back to client
        }).catch((error) => {
            console.log(`Error making database query ${queryText}`, error);
            res.sendStatus(500); // or send back the error
        })
});

// DELETE request from database
router.delete('/:id', (req, res) => {
    let reqId = req.params.id; // id parameter received from client request data
    console.log('DELETE request for id', reqId);
    // text for submitting delete to ddatabase
    let queryText = 'DELETE FROM "tasks" WHERE "id" = $1;'
    pool.query(queryText, [reqId]) // through pg.Pool
        .then((result) => {
            console.log('taask deleted');
            res.sendStatus(200); // send success
        })
        .catch((error) => {
            console.log(`Error making database query ${queryText}`, error);
            res.sendStatus(500); // or send error
        })
});

// export file data to sever.js as 'router'
module.exports = router; 