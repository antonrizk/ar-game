const decrease = document.getElementById('decrease')
const sizeEL = document.getElementById('size')
const increase = document.getElementById('increase')
const colorTool = document.getElementById('color')
const clear = document.getElementById('clear')



const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let size = 10
let color 
let x 
let y
let isPressed = false


// setting fucntion for circle movemnts

function drawCircle(x, y) {
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fillStroke = color
    ctx.fill()
}

// setting function for line movment 

function drawLine(x1, y1, x2, y2){
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = color
    ctx.lineWidth = size * 2
    ctx.stroke()
}

function updateSize(){
    sizeEL.innerText  = size
}
// setup event listners for mouse movement 
canvas.addEventListener('mousedown', (e) => {
    isPressed = true

    x = e.offsetX
    y = e.offsetY

})

canvas.addEventListener('mouseup', (e) => {
    isPressed = false

    x = undefined
    y = undefined
    
})

canvas.addEventListener('mousemove', (e) => {
   if (isPressed){
       const x2 = e.offsetX
       const y2 = e.offsetY

       drawCircle(x2, y2)
       drawLine(x, y, x2, y2)

       x = x2
       y = y2
   }
    
})

// set up event listeners for the canvas tools

decrease.addEventListener('click', (e) => {
    size -= 5
    if(size < 5){
        size = 5
    }
    updateSize()
})

increase.addEventListener('click', () => {
    size += 5
    if(size > 50){
        size = 50
    }
    updateSize()

})
colorTool.addEventListener('change', (e) => color = e.target.value)


clear.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height))