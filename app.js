// Get references to the DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const prioritySelect = document.getElementById('prioritySelect');

// Variable to store the currently edited task
let editingTask = null;

// Function to create a new task
function createTask(taskText, priority = 'low') {
    const li = document.createElement('li');
    li.classList.add(priority);  // Set the priority class (low, medium, high)
    
    const taskContent = document.createElement('span');
    taskContent.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');

    // Toggle task completion when clicked
    li.addEventListener('click', () => {
        li.classList.toggle('completed');
    });

    // Delete the task when the delete button is clicked
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        li.remove();
    });

    // Edit the task when the edit button is clicked
    editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        taskInput.value = taskContent.textContent;  // Set the input to the current task text
        prioritySelect.value = priority;  // Set the priority dropdown to the current task's priority
        editingTask = li;  // Store the reference to the task being edited
    });

    li.appendChild(taskContent);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Add task when the button is clicked
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    const taskPriority = prioritySelect.value;

    if (taskText) {
        if (editingTask) {
            // Update the existing task
            editingTask.querySelector('span').textContent = taskText;
            editingTask.className = '';  // Reset classes
            editingTask.classList.add(taskPriority);
            editingTask = null;  // Clear editing state
        } else {
            // Create a new task
            createTask(taskText, taskPriority);
        }
        taskInput.value = '';  // Clear the input field
    } else {
        alert('Please enter a task');
    }
});

// Optionally, allow adding tasks with the Enter key
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTaskBtn.click();
    }
});
