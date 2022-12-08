import { getAll, remove, createTask, getById, update } from "./api"

// util functions, refactor to another file
const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const changeTask = (task) => {
    task.done = !task.done
    return task
}
// util funcitons 

export class TaskManager {
    constructor(template) {
        this.template = template
    }

    render(taskList) {
        getAll()
            .then(tasks => {
                while (taskList.firstChild) taskList.removeChild(taskList.firstChild)
                tasks.map(task => {
                    const clon = this.template.content.cloneNode(true)
                    clon.querySelector('.task').setAttribute('id', task.id)
                    clon.querySelector('.task__title').textContent = task.title
                    clon.querySelector('.task__description').textContent = task.description
                    if (task.done) {
                        clon.querySelector('.task__done--label').textContent = 'DONE'
                        clon.getElementById('doneTask').checked = true
                    } else {
                        clon.querySelector('.task__done--label').textContent = 'TO DO'
                    }
                    taskList.appendChild(clon)
                })
            })

    }

    deleteTask(id) {
        return remove(id)
    }

    create(title, description) {
        const newTask = { title: title, description: description }
        newTask.id = getRndInteger(10, 100000)
        newTask.done = false
        return createTask(newTask)
    }

    updateTask(updatedTask) {
        return update(updatedTask)
    }

    toggleTask(id) {
        return getById(id)
                    .then(changeTask)
                    .then(update)
    }

    renderModal(id) {
        const modal = document.getElementById("myModal");
        const span = document.getElementsByClassName("close")[0];
        document.getElementById('submitEditTask').classList.add(id)
        modal.style.display = "block";
        span.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        
    }

    

}