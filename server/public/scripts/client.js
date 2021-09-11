console.log('JS');


$(readyNow);

function readyNow() {
    console.log('document ready - jQ');
    
    // Setting up click listeners
    $('#add-task').on('click', addNewTask);
    // get the tasks on DOM
    getAllTasks();
}

function getAllTasks() {
    console.log('Getting all tasks');
}

// Execute on click of add button
function addNewTask() {
    console.log('Adding new Task');
    // assigning input values to new object properties
    let newTask = {
        task: $('#new-task').val(),
        details: $('#task-details').val(),
    };
    // Clear inputs
    $('#new-task').val('');
    $('#task-details').val('');

    // Save to database with ajaax call to POST
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newTask,
    }).then(function(response) { //log response from server
        console.log('Response from server.', response);
        // after updating tasks, reload list
        getAllTasks();
      }).catch(function(error) {
        console.log('Error in POST', error)
        alert('Unable to add new task.');
      });
}