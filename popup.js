document.addEventListener('DOMContentLoaded', function () {
    // Your JavaScript code for the popup goes here
    let taskInput = document.getElementById('taskInput');
    let addTaskButton = document.getElementById('addTask');
    let tasksList = document.getElementById('tasksList');
  
    // Load tasks from storage
    chrome.storage.sync.get(['tasks'], function (result) {
      if (result.tasks) {
        result.tasks.forEach(task => {
          addTaskToList(task);
        });
      } 
    });
  
    // Add task to list
    addTaskButton.addEventListener('click', function () {
      let task = taskInput.value.trim();
      if (task !== '') {
        addTaskToList(task);
        saveTasksToStorage();
        taskInput.value = '';
      }
    });

    // Function to add task to the list
    function addTaskToList(task) {
        let li = document.createElement('li');
        li.textContent = task;
      
        // Create a remove icon
        let removeIcon = document.createElement('i');
        removeIcon.className = 'fas fa-times remove-icon';
        li.appendChild(removeIcon);
      
        tasksList.appendChild(li);
      
        // Add click listener to remove task
        removeIcon.addEventListener('click', function () {
          li.remove();
          saveTasksToStorage();
        });
      }
      
  
    // Function to save tasks to storage
    function saveTasksToStorage() {
      let tasks = Array.from(tasksList.children).map(li => li.textContent);
      chrome.storage.sync.set({ 'tasks': tasks });
    }
  });
  