const express = require('express');
const app = express();
const PORT = process.env.port || 5000;
const taskRouter = require('./routes/task.router');

app.use(express.urlencoded({ extended:true }));

app.use(express.static('server/public'));

// Routes
app.use('/tasks', taskRouter);


// start listening on assigned port
app.listen(PORT, () => {
    console.log('Listening on PORT', PORT);
});