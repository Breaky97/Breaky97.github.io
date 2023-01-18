const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const blockWidth = 100
const blockHeight = 20
const ballDiameter = 20
const boardWidth = 560
const boardHeight = 300
let timerId

let xDir = 2
let yDir = 2

let score = 0

const playerStart = [230, 10]
let currentPosition = playerStart

const ballStart = [270, 40]
let ballCurrentPosition = ballStart

grid.style.background = 'lightyellow'
// Block
class Block{
    constructor(x, y) {
        this.bottomLeft = [x,y]
        this.bottomRight = [x + blockWidth, y]
        this.topLeft = [x, y + blockHeight]
        this.topRight = [x + blockWidth, y + blockHeight]

    }
}
// Blocks
const blocks = [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),

    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),

    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),

]


function addBlocks(){
    for(let i = 0; i < blocks.length; i++){
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }

}

addBlocks()



// PLAYER
const player = document.createElement('div')
player.classList.add('player')
drawPlayer()
grid.appendChild(player)

// DRAW

function drawBall(){
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}

function drawPlayer(){
    player.style.left = currentPosition[0] + 'px'
    player.style.bottom = currentPosition[1] + 'px'
}

// MOVMENT

function movePlayer(e){
    switch(e.key){
        case 'ArrowLeft':
            if(currentPosition[0] > 0){
                currentPosition[0] -= 10
                drawPlayer()
            }

            break;
        case 'ArrowRight':
            if(currentPosition[0] < boardWidth - blockWidth){
                currentPosition[0] += 10
                drawPlayer()
            }

            break;
    }
}

document.addEventListener('keydown', movePlayer)

function moveBall(){
    ballCurrentPosition[0] += xDir
    ballCurrentPosition[1] += yDir
    drawBall()
    checkForCollision()
}

timerId = setInterval(moveBall, 12)

function changeDirection(){
    if(xDir === 2 && yDir === 2){
        yDir = -2
        return
    }
    if(xDir === 2 && yDir === -2){
        xDir = -2
        return
    }
    if(xDir === -2 && yDir === -2){
        yDir = 2
        return
    }
    if(xDir === -2 && yDir === 2){
        xDir = 2
        return
    }
}


// BALL
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
checkForCollision()
grid.appendChild(ball)



// COLLISION
function checkForCollision(){
    for(let i = 0; i < blocks.length; i++){
        if(
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0])&&
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changeDirection()
            score++
            scoreDisplay.innerHTML = score

            if(blocks.length === 0){
                scoreDisplay.style.color = "red"
                scoreDisplay.innerHTML = "You win!"
                clearInterval(timerId)
            }


        }
    }
    if(ballCurrentPosition[0] >= (boardWidth - ballDiameter) || 
        ballCurrentPosition[1] >= (boardHeight - ballDiameter) ||
        ballCurrentPosition[0] <= 0){
        changeDirection()
    }

    if(
        (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
        (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
    ){
        changeDirection()
    }
    // GAME OVER
    if(ballCurrentPosition[1] <= 0){
        clearInterval(timerId)
        scoreDisplay.innerHTML = "You lose mf"
        document.removeEventListener('keydown', movePlayer)

    }
}

