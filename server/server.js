const express = require('express');
const app = express();
const PORT = process.env.port || 5000;
// local router path defined
const taskRouter = require('./routes/task.router.js');

app.use(express.urlencoded({ extended:true }));
app.use(express.static('server/public'));

// Routes
app.use('/tasks', taskRouter);


// start listening on assigned port
app.listen(PORT, () => {
    console.log('Listening on PORT', PORT);
});