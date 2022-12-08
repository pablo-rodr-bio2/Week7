// selectors
const btn = document.querySelector('button')
const timers = document.getElementById('timers')

let numTimers = 0

// function that takes a number of seconds
// and returns a promise. The promise resolves
// after the passed seconds and returns a string
const startTimer = (seconds) =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve(`Done in ${seconds} seconds!`)
        }, seconds * 1000)
    })
// return result

// generates a random int number between 2 numbers
const getRndInteger = (min, max) => Math.floor(Math.random() * (max - min)) + min;


// updates the timers button with the number of 
// available timers; if there are already 3 going on,
// btn is disabled; if not, is active
const updateBtn = (btn, timers) => {
    btn.textContent = `Start timer (${timers}/3)`
    btn.disabled = timers === 3
    // if(timers === 3) {
    //     btn.disabled = true
    // } else {
    //     btn.disabled = false
    // }
}

btn.addEventListener('click', async () => {
    let seconds = getRndInteger(2, 9)           
    console.log(seconds)

    numTimers++                                

    updateBtn(btn, numTimers)               

    let timerElement = document.createElement('div')    
    timerElement.classList.add('timer')
    
    const text = await startTimer(seconds)
    timerElement.textContent = text            
    
    timers.appendChild(timerElement)           
    
    numTimers--                    
    
    updateBtn(btn, numTimers)      

})

// use template
// more descriptive var names