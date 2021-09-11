const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

// POST
router.post('/', (req, res) => {
    const newTask = req.body;
    console.log('Posting new task', newTask);
    const queryText = `
                INSERT INTO "tasks"
                ("task", "isComplete", "whenCompleted", "details")
                VALUES
                ($1, $2, $3, $4);
            `;
    pool.query(queryText, [
        newTask.task,
        newTask.isComplete,
        newTask.whenCompleted,
        newTask.details,
    ]).then((result) => { // sending success back to client
        console.log('POST new task success!');
        res.sendStatus(201);
    }).catch((error) => {
        console.log('Error in POST', error);
        res.sendStatus(500);
    });
});

// GET
router.get('/', (req, res) => {
    console.log('Getting task list');
    const queryText = 'SELECT * FROM "tasks" ORDER BY "id";';
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch(error => {
        console.log('error getting tasks', error);
        res.sendStatus(500);
    });
});

// PUT
router.put('/:id', (req, res) => {
    let reqId = req.params.id;
    console.log('PUT request for id', reqId);
    let queryText = 'UPDATE "tasks" SET "isComplete" = NOT "isComplete" WHERE "id" = $1 RETURNING *;'
    pool.query(queryText, [reqId])
        .then((result) => {
            console.log('Task updated');
            res.sendStatus(200);
        }).catch((error) => {
            console.log(`Error making database query ${queryText}`, error);
            res.sendStatus(500);
        })
});

// DELETE
router.delete('/:id', (req, res) => {
    let reqId = req.params.id;
    console.log('DELETE request for id', reqId);
    let queryText = 'DELETE FROM "tasks" WHERE "id" = $1;'
    pool.query(queryText, [reqId])
        .then((result) => {
            console.log('taask deleted');
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Error making database query ${queryText}`, error);
            res.sendStatus(500);
        })
});

module.exports = router;