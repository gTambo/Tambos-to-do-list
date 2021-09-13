console.log('JS');


$(readyNow);

function readyNow() {
    console.log('document ready - jQ');

    // Setting up click listeners
    // TO DO: refactor click listeners into separate function
    $('#add-task').on('click', addNewTask); // add button
    $('#task-label').on('keypress', enterKey); // input field enter keypress
    $('#tasklist').on('click', 'input', markComplete); // complete button
    $('#tasklist').on('click', '.delete-button', deleteTask); //delete button 
    // get the tasks on DOM
    getAllTasks();
}

// Kepress event handler function
function enterKey(key) {
    let enter = key.which;
    if (enter == 13) {
        $('#add-task').on('click', addNewTask());
        return false;
    }
}

function deleteTask() {
    console.log('delete row request');
    let taskId = $(this).data('id'); // using id data from database previously appended to table row
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskId}` // id used as parameter
    }).then(function (response) {
        console.log('Task deleted!');
        getAllTasks(); // Refresh the list of tasks
    }).catch(function (error) {
        alert('Something went wrong!');
        console.log('Error in DELETE', error);
    });
}

function markComplete() {
    console.log('In mark complete');
    let taskId = $(this).data('id'); // using id data from database previously appended to table row
    // To Do: find a way to add class to table row that sticks around after call to get tasks
    // $(this).closest('tr').toggleClass('marked');
    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskId}` //id as parameter to server 
    }).then(function (response) {
        console.log('Task marked complete');
        getAllTasks(); // refresh that task list
    });
}

function getAllTasks() {
    console.log('Getting all tasks');
    $.ajax({
        method: 'GET', // hey server, give me some things,
        url: '/tasks' // things from the taskRouter!
    }).then(function (response) { // what did you give me?
        console.log('GET /tasks', response); 
        appendAllTasks(response); // I hope it's an array of database rows as objects 
    }).catch(function (error) { // if not, something went wrong.
        console.log('error in GET tasks', error);
    });
}

function appendAllTasks(taskList) {
    console.log('appending tasks');
    $('#tasklist').empty(); // let's clear the old info first
    // Append the table rows
    // prep some variables for my appending convenience
    let domComplete = 'No';
    let details = '';
    let completionDate = ''; // I did't end up getting to use this one
    for(let item of taskList) { // loop through that array I got
        if (item.details != null) {
            details = item.details; // I don't want to post 'null' to the DOM, so just leave that empty string if it's null
        }
        if (item.whenCompleted != null) {
            completionDate = item.whenCompleted; // same thing here as item.details ( I'm now realizing I could've probably used stringify or something else for this)
        }
        if (item.isComplete == false) { // appending with "unmarked" class for uncompleted tasks to be given appropriate styling
            $('#tasklist').append(`
            <tr class="taskListRow unmarked">
                <td>${item.task}</td>
                <td>${details}</td>
                <td><label class="check-container">
                <input type="checkbox" data-id="${item.id}">
                <span class="checkmark"></span> </td>
                <td>
                    <button class="delete-button" data-id="${item.id}">Delete</button>
                </td>
                <td>${completionDate}</td>
            </tr>
        `); // Included unchecked box for fun, with clickability in place of complete button (see branch feature-styling-bootstrap for button inclusion)
        } else { // appending with "marked" class for completed tasks to be given appropriate styling
            domComplete = 'Yes';
            $('#tasklist').append(`
            <tr class="taskListRow marked">
                <td>${item.task}</td>
                <td>${details}</td>
                <td><label class="check-container">
                <input type="checkbox" checked="true" data-id="${item.id}">
                <span class="checkmark"></span></td>
                <td>
                    <button class="delete-button" data-id="${item.id}">Delete</button>
                </td>
                <td>${completionDate}</td>
            </tr>
        `); // Included click-able checked box in place of complete button
        }
    }
}

{/* <button class="complete-button" data-id="${item.id}">Complete</button> */ }

// Execute on click of add button
function addNewTask() {
    console.log('Adding new Task');
    // Disallow post with empty task field,
    if ($('#new-task').val() == '') {
        console.log('No new task entered');
        alert('Please enter a task');
        return;
    }
    // assigning input values to new object properties
    let taskToAdd = {
        task: $('#new-task').val(),
        isComplete: 'false',
        whenCompleted: '',
        details: $('#task-details').val(),
    };
    // Clear inputs
    $('#new-task').val('');
    $('#task-details').val('');

    // Save to database with ajaax call to POST
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: taskToAdd
    }).then(function (response) { //log response from server
        console.log('Response from server.', response);
        // after updating tasks, reload list
        getAllTasks();
    }).catch(function (error) {
        console.log('Error in POST', error)
        alert('Unable to add new task.');
    });
}