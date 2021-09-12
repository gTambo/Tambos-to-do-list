console.log('JS');


$(readyNow);

function readyNow() {
    console.log('document ready - jQ');
    
    // Setting up click listeners
    // TO DO: refactor click listeners into separate function
    $('#add-task').on('click', addNewTask);
    $('#tasklist').on('click', '.complete-button', markComplete);
    $('#tasklist').on('click', '.delete-button', deleteTask);
    // get the tasks on DOM
    getAllTasks();
}

function deleteTask() {
    console.log('delete row request');
    let taskId = $(this).data('id');
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskId}`
    }).then( function(response) {
        console.log('Task deleted!');
        getAllTasks(); // Refresh the list of tasks
    }).catch( function(error) {
        alert('Something went wrong!');
        console.log('Error in DELETE', error);
    });
}

function markComplete() {
    console.log('In mark complete');
    let taskId = $(this).data('id');
    // console.log($(this).closest('tr'));
    // $(this).closest('tr').toggleClass('marked');
    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskId}`
    }).then( function(response) {
        console.log('Task marked complete');
        getAllTasks();
    })
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
    // Append as table rows
    let domComplete = 'No';
    let details = '';
    let completionDate = '';
    for(let item of taskList) {
        if (item.details != null) {
            details = item.details;
        }
        if (item.whenCompleted != null) {
            completionDate = item.whenCompleted;
        }
        if (item.isComplete == false) {
            $('#tasklist').append(`
            <tr class="taskListRow unmarked">
                <td>${item.task}</td>
                <td>${details}</td>
                <td>${domComplete}</td>
                <td>
                    <button class="complete-button" data-id="${item.id}">Complete</button>
                    <button class="delete-button" data-id="${item.id}">Delete</button>
                </td>
                <td>${completionDate}</td>
            </tr>
        `);
        } else {
            domComplete = 'Yes';
            $('#tasklist').append(`
            <tr class="taskListRow marked">
                <td>${item.task}</td>
                <td>${details}</td>
                <td>Yes</td>
                <td>
                    <button class="complete-button" data-id="${item.id}">Complete</button>
                    <button class="delete-button" data-id="${item.id}">Delete</button>
                </td>
                <td>${completionDate}</td>
            </tr>
        `);
        }
        
    }
}

{/* <label class="check-container">
<input type="checkbox" data-id="${item.id}">
<span class="checkmark"></span>  */}

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