console.log('JS');


$(readyNow);

function readyNow() {
    console.log('document ready - jQ');
    
    // Setting up click listeners
    // TO DO: don't allow post with empty task field,
    // refactor click listeners into separate function
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