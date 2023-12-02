const inputBox = document.querySelector('#input-box');
const container = document.querySelector('.todo-app');
let list = document.createElement('div');
list.className = 'list';
container.appendChild(list);

function addTask() {
    if (inputBox.value === '') {
        alert('You must write a task!');
        inputBox.value = '';
        inputBox.focus();
    } else {
        let tasks = document.createElement('div');
        tasks.className = 'tasks';
        tasks.innerHTML = `<div class="task">
        <input type="checkbox" name="progress" class="progress">
        <p class="task-description">${inputBox.value}</p>
        </div>
        <div class="task-actions">
        <a class="action-button delete-button">
        <i class="fa-regular fa-trash-can"></i>
        </a>
        </div>`;
        list.style.marginTop = '0px';
        list.appendChild(tasks);
        inputBox.value = '';
        inputBox.focus();

        const progress = tasks.querySelector('.progress');
        progress.addEventListener("change", () => {
            const taskDescription = tasks.querySelector('.task-description');
            taskDescription.classList.toggle('checked', progress.checked);
        });

        deleteTask();

        saveData();

    }
}

inputBox.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function deleteTask(){
    list.addEventListener("click", function(e) {
        if (e.target.tagName === 'I') {
            let closestTask = e.target.closest('.tasks');
    
            if (closestTask) {
                console.log('Deleting task:', closestTask.querySelector('.task-description').textContent);
                closestTask.remove();
                if(list.innerHTML == ''){
                    list.style.marginTop = '-20px'
                }
                saveData();
            }
        }
    }, false);    
}

function saveData() {
    localStorage.setItem("data", list.innerHTML);
    console.log('salvou')
}

function showTasksSaved() {
    list.innerHTML = localStorage.getItem("data");
    list.style.marginTop = '0px';
    if(list.innerHTML == ''){
        list.style.marginTop = '-20px'
    }
    deleteTask();
}
showTasksSaved();