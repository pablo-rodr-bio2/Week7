import { getAll, remove, createTask, getById } from "./api"

const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

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
                        clon.querySelector('.task__done').textContent = 'DONE'
                    } else {
                        clon.querySelector('.task__done').textContent = 'TO DO'
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

    updateTask(divTask) {
        // Select modal
        let mpopup = document.getElementById('mpopupBox');
        console.log(mpLink)

        // Select trigger link
        let mpLink = document.getElementById("mpopupLink");

        // Select close action element
        let close = document.getElementsByClassName("close")[0];

        // Open modal once the link is clicked
     
        mpLink.onclick = function () {
            mpopup.style.display = "block";
        };

        // Close modal once close element is clicked
        close.onclick = function () {
            mpopup.style.display = "none";
        };

        // Close modal when user clicks outside of the modal box
        window.onclick = function (event) {
            if (event.target == mpopup) {
                mpopup.style.display = "none";
            }
        };

    }

}