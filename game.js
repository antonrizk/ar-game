const screens = document.querySelectorAll('.screen')
const choosInsectBtns = document.querySelectorAll('.choose-insect-btn')
const startBtn = document.getElementById('start-btn')
const gameContainer = document.getElementById('game-container')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const message = document.getElementById('message')

let seconds = 0
let score = 0
let selectedInsects = {}

// event listners 
// make the screen apear
startBtn.addEventListener('click', () => screens[0].classList.add('up'))

// choose insect and start game event listners
choosInsectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        selectedInsects = {src, alt}
        screens[1].classList.add('up')
        setTimeout(createInsect, 1000)
        startGame()

    })
})



function startGame (){
    setInterval(increaseTime, 1000)
}

function increaseTime(){
    let m = Math.floor(seconds / 60)

    let s = seconds % 60 
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s

    timeEl.innerHTML = `Time: ${m}:${s}`
    seconds++
}

// set up function for creating insect
function createInsect(){
    const insect = document.createElement('div')
    insect.classList.add('insect')
    const { x, y } = getRandomLocation()

    insect.style.top = `${y}px`
    insect.style.left = `${x}px`

    insect.innerHTML = `<img src="${selectedInsects.src}" alt="${selectedInsects.alt}" style="transform: rotate( ${Math.random() * 360}deg)"/>`

    insect.addEventListener('click', catchInsect)
    
    gameContainer.appendChild(insect)
    
}

function getRandomLocation(){
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 400) + 100
    const y = Math.random() * (height - 400) + 100
    return { x, y }
}

function catchInsect(){
    increaseScore()
    this.classList.add('caught')
    setTimeout(() => this.remove(), 500)
    addInsects()
}

function addInsects(){
    setTimeout(createInsect, 500)
    setTimeout(createInsect, 800)



}

function increaseScore(){
    score++

    if(score > 40){
        message.classList.add('visible')
    }
    scoreEl.innerHTML = `Score: ${score}`
}