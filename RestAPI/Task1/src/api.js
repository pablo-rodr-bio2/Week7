const URL ='http://localhost:3001/tasks';

const getAll = async () => {
    const res = await fetch(URL)
    const data = await res.json()

    return data
}

const createTask = async (newTask) => {    

    const res = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
    })
    if (res.status === 200) return 'created'
}

const getById = async (id) => {
    const res = await fetch(`${URL}/${id}`)
    const data = await res.json()

    return data
}

const update = async (task) => {
    const res = await fetch(`${URL}/${task.id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(task)
    })
    if (res.status === 200) return 'updated'
}

const remove = async (id) => {
    const res = await fetch(`${URL}/${id}`, {
        method: 'DELETE',
    })
    if (res.status === 200) return 'deleted'
}


export { getAll, createTask, getById, update, remove }