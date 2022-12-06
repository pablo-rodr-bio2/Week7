// selectors
const btn = document.querySelector('button')
const timers = document.getElementById('timers')

// init variables
let numTimers = 0

// function that takes a number of seconds
// and returns a promise. The promise resolves
// after the passed seconds and returns a string
const startTimer = (seconds) =>{
    const result = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Done in ${seconds} seconds!`)
        }, seconds * 1000)
    })
    return result
}

// generates a random int number between 2 numbers
const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

// updates the timers button with the number of 
// available timers; if there are already 3 going on,
// btn is disabled; if not, is active
const updateBtn = (btn, timers) => {
    btn.textContent = `Start timer (${timers}/3)`
    if(timers === 3) {
        btn.disabled = true
    } else {
        btn.disabled = false
    }
}

btn.addEventListener('click', () => {
    let seconds = getRndInteger(2, 9)           // creates random seconds
    console.log(seconds)
    numTimers ++                                // inmediatly updates counter
    updateBtn(btn, numTimers)                   // and button to reflect number of timers and availability
    let div = document.createElement('div')     // creates div for new timer
    div.classList.add('timer')
    startTimer(seconds)
        .then((text) => {            
            div.textContent = text              // after startTimer is finished, we add the Promise return
            timers.appendChild(div)             // to the timers' div
            numTimers --                        // update counter of timers
            updateBtn(btn, numTimers)           // and update button and activity
        })
})

