console.log('JS');


$(readyNow);

function readyNow() {
    console.log('document ready - jQ');
    
    // Setting up click listeners
    // TO DO: refactor click listeners into separate function
    $('#add-task').on('click', addNewTask);
    $('#tasklist').on('click', ".check-container", markComplete)
    // get the tasks on DOM
    getAllTasks();
}

function markComplete() {
    console.log('In mark complete');
}

function getAllTasks() {
    console.log('Getting all tasks');
    $.ajax({
        method: 'GET',
        url: '/tasks'
      }).then(function(response) {
        console.log('GET /tasks', response);
        appendAllTasks(response);
      }).catch(function(error) {
        console.log('error in GET tasks', error);
    });
}

function appendAllTasks(taskList) {
    console.log('appending tasks');
    $('#tasklist').empty();
    // To-Do: .append as table rows
    let domComplete = '';
    for(let item of taskList) {
        if(item.isComplete == false) {
            domComplete = 'No';
        } else {
            domComplete = 'Yes';
        }
        $('#tasklist').append(`
            <tr class="taskListRow">
                <td>${item.task}</td>
                <td>${item.details}</td>
                <td>${domComplete}</td>
                <td><label class="check-container">
                    <input type="checkbox" data-id="${item.id}">
                    <span class="checkmark"></span>
                </td>
                <td>${item.whenCompleted}</td>
            </tr>
        `);
    }
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