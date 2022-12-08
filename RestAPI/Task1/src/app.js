import { TaskManager } from "./TaskManager"

'use strict';
const tasks = document.querySelector('.tasks')
const taskList = document.querySelector('.taskList')
const template = document.querySelector('.template__list')
const form = document.querySelector('.task__form')
const taskManager = new TaskManager(template)


taskManager.render(tasks)

document.getElementById('addTaskForm').addEventListener('click', () => {
    form.style.display = 'block'
    taskList.style.display = 'none'
})

document.getElementById('cancelNewTask').addEventListener('click', (e) => {
    e.preventDefault()
    form.style.display = 'none'
    taskList.style.display = 'block'
})

document.getElementById('submitNewTask').addEventListener('click', (e) => {
    e.preventDefault()
    const title = document.getElementById('task__add--title').value
    const description = document.getElementById('task__add--description').value
    taskManager.create(title, description).then(() => {
        form.style.display = 'none'
        taskList.style.display = 'block'
        taskManager.render(tasks)
    })

})

tasks.addEventListener('click', (e) => {
    if (e.target.id === 'btn__delete') {
        const id = e.target.parentElement.id
        taskManager.deleteTask(id).then(() => taskManager.render(tasks))
    }
    if (e.target.id === 'btn__edit') {
        const id = e.target.parentElement.id
        taskManager.renderModal(id)        
    }
    if (e.target.name === 'isDone') {
        const id = e.target.parentElement.parentElement.id
        taskManager.toggleTask(id).then(() => taskManager.render(tasks))
    }

})

document.getElementById('submitEditTask').addEventListener('click', (e) => {
    e.preventDefault()
    const id = document.getElementById('submitEditTask').className
    const title = document.getElementById('task__edit--title').value
    const description = document.getElementById('task__edit--description').value
    const done = document.getElementById('doneTaskEdit').checked
    const updatedTask = {id: id, title: title, description: description, done: done}
    taskManager.updateTask(updatedTask).then(() => taskManager.render(tasks))
    document.getElementById("myModal").style.display = 'none'
})

