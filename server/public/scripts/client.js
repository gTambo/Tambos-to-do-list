console.log('JS');


$(readyNow);

function readyNow() {
    console.log('document ready - jQ');
    
    // Setting up click listeners
    // TO DO: refactor click listeners into separate function
    $('#add-task').on('click', addNewTask);
    // get the tasks on DOM
    getAllTasks();
}

function getAllTasks() {
    console.log('Getting all tasks');
    $.ajax({
        type: 'GET',
        url: '/tasks'
      }).then(function(response) {
        console.log('GET /tasks', response);
        appendAllTasks(response);
      }).catch(function(error) {
        console.log('error in GET tasks', error);
    });
}

function appendAllTasks() {
    console.log('appending tasks');
    $('#task-list').empty();
    // To-Do: .append as table rows
}

// Execute on click of add button
function addNewTask() {
    console.log('Adding new Task');
    // TO DO: don't allow post with empty task field,
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
    }).then(function(response) { //log response from server
        console.log('Response from server.', response);
        // after updating tasks, reload list
        getAllTasks();
      }).catch(function(error) {
        console.log('Error in POST', error)
        alert('Unable to add new task.');
      });
}