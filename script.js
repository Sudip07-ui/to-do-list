const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage when page loads
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        addTaskToDOM(task.text, task.completed);
    });
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add task to the DOM
function addTaskToDOM(text, completed = false) {
    const li = document.createElement('li');
    if (completed) li.classList.add('completed');

    li.innerHTML = `
        <span>${text}</span>
        <button class="delete-btn">Delete</button>
    `;

    // Toggle completed
    li.querySelector('span').addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTasks();
    });

    // Delete task
    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
        saveTasks();
    });

    taskList.appendChild(li);
}

// Add new task
function addTask() {
    const text = taskInput.value.trim();
    
    if (text === '') {
        alert("Please enter a task!");
        return;
    }

    addTaskToDOM(text);
    saveTasks();
    taskInput.value = ''; // clear input
}

// Event listeners
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Load tasks when page starts
loadTasks();