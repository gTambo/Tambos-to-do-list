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


// PUT


// DELETE

module.exports = router;