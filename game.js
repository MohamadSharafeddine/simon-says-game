const buttonColors = ["red", "blue", "green", "yellow"]
let gamePattern = [];
let userClickedPattern = []
let started = false
let level = 0
var correct = true
let green_button = document.getElementById('green')
let red_button = document.getElementById('red')
let yellow_button = document.getElementById('yellow')
let blue_button = document.getElementById('blue')
let buttons = document.querySelectorAll('.btn')

document.addEventListener('keypress', () => {
    if (!started) {
        document.querySelector("#level-title").textContent = `Level ${level}`
        // nextSequence();
        started = true
        gameLoop()
    }
})

function playSound(color) {
    var audio = new Audio(`sounds/${color}.mp3`)
    audio.play()
}

function addColorToPattern() {
    const random_index = Math.floor(Math.random() * buttonColors.length);
    var added_color = buttonColors[random_index];
    gamePattern.push(added_color);
}

function simonSays() {
    for (let i=0; i < gamePattern.length; i++) {
        setTimeout(() => {
        const flashed_button = document.getElementById(gamePattern[i])
        const original_color = flashed_button.style.backgroundColor
        flashed_button.style.backgroundColor = "grey"
        playSound(gamePattern[i])
        setTimeout(() => {
            flashed_button.style.backgroundColor = original_color
        }, 100)}, 500 * i)

}}

buttons.forEach(button => {
button.addEventListener('click', function(event) {
const clicked_id = event.target.id
userClickedPattern.push(clicked_id)
document.getElementById(clicked_id).classList.add("pressed");
setTimeout(() => {
    document.getElementById(clicked_id).classList.remove("pressed");
}, 100);

isEqual(userClickedPattern, gamePattern)
})
})

function isEqual(arr1, arr2) {
    if (arr1[arr1.length - 1] == arr2[arr1.length - 1]) {
        if (arr1.length ==  arr2.length) {
            userClickedPattern = []
            // level++
            gameLoop()
        }
    }
    else {
        document.querySelector("#level-title").textContent = `Level 0`
        gamePattern = []
        userClickedPattern = []
        level = 0
        playSound("wrong")
        document.body.classList.add("game-over")
        setTimeout(() => {
        document.body.classList.remove("game-over")
    }, 200)
        

        started = false
    }
}

function gameLoop() {
        level++
        document.querySelector("#level-title").textContent = `Level ${level}`
        addColorToPattern()
        simonSays()
        console.log(gamePattern)
}
