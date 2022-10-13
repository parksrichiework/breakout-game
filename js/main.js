const grid= document.querySelector('.grid')
const scoreDisplay= document.querySelector('.score')
const blockWidth = 100
const blockHeight= 20
const boardWidth= 560
const boardHeight= 300
const ballDiameter = 20
const moveLeft= document.querySelector('.left')
const moveRight= document.querySelector('.right')
let xDirection = -2
let yDirection = 2
let score = 0

const userStart = [230, 10]
let currentPosition= userStart

const ballStart = [270, 40]
let ballCurrentPosition = ballStart



// create individual Block 
class Block {
    constructor(xAxis, yAxis){
        this.bottomLeft = [xAxis,yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

//all the blocks
const blocks=[
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
]

// console.log(blocks)

// add a new block
function addBlocks(){   

    for(let i=0; i < blocks.length; i++){  
        const block = document.createElement('div')      
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }
}
addBlocks()

//add user

const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)


//draw user
function drawUser(){
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}



// how to move user with keyboard
document.addEventListener('keydown', moveUser)

function moveUser(e){
    switch(e.key){
        case 'ArrowLeft': 
            if (currentPosition[0] > 0){
                currentPosition[0] -= 10
             drawUser()
            }
             break;
        case 'ArrowRight': 
            if (currentPosition[0] < boardWidth - blockWidth){
                currentPosition[0] += 10
             drawUser()
            }
             break;
    }
}

document.addEventListener('mousedown', moveBar)

function moveBar(e){
    if(e.target == moveLeft && currentPosition[0] > 0){
        currentPosition[0] -= 10
        setTimeout(drawUser(), 100)
    }
    if(e.target == moveRight && currentPosition[0] < boardWidth - blockWidth){
        currentPosition[0] += 10
        drawUser()
    }
}






//draw ball

function drawBall(){
    ball.style.left= ballCurrentPosition[0] + 'px'
    ball.style.bottom= ballCurrentPosition[1] + 'px'
}

//add ball

const ball= document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)


//move ball
function moveBall(){
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions()
}

// START THE GAME WIHT THIS FUNCTION
function startGame(){
timerId = setInterval(moveBall, 30) //CHANGE THIS NUMBER TO MAKE BALL MOVE FASTER
}

// check for collisions ----------------------------------------------
function checkForCollisions(){
    //check for block collision -----------------------
    for(let i=0; i < blocks.length; i++){
        if((ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
            (ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
            ){
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changeDirection()
            score++
            scoreDisplay.innerHTML = score

            // check for win --------------------------------------
            if(blocks.length === 0){
                scoreDisplay.innerHTML = 'You win!'
                clearInterval(timerId)
                document.removeEventListener('keydown', moveUser)
                ball.style.backgroundColor= 'var(--lime-green)'
            }

        }
    }

    // check for wall collisions
    if(ballCurrentPosition[0] >= (boardWidth - ballDiameter) ||
        ballCurrentPosition[1] >= (boardHeight - ballDiameter) ||
        ballCurrentPosition[0] <= 0
        ){
        changeDirection()
    }
    //CHECK FOR USER COLLISIONS
    if((ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
        (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
        ){
            changeDirection()
    }




    //check for "Game Over"
    if(ballCurrentPosition[1] <=0){
        clearInterval(timerId)
        scoreDisplay.innerHTML = "You Lose"
        document.removeEventListener('keydown', moveUser)
    
    ball.style.backgroundColor= 'var(--fiery-rose)'
    }
   
}

function changeDirection(){
    if(xDirection === 2 && yDirection === 2){
        yDirection = -2
        return
    }
    if(xDirection === 2 && yDirection === -2){
        xDirection = -2
        return
    }
    if(xDirection === -2 && yDirection === -2){
        yDirection = 2
        return
    }
    if(xDirection === -2 && yDirection === 2){
        xDirection = 2
        return
    }
}

//directions modal ---------------
alert('Let\'s get breaking!');


let closeDirections = document.querySelector('#close-button');
let directions = document.querySelector('#game-directions');
let directionsModal = document.querySelector('#game-directions-modal')

closeDirections.addEventListener('click', closeBox);

function closeBox(){
         directions.classList.add('closed');
         directionsModal.classList.add('closed')
         console.log('closed the directions');
          startGame()                     
   }



 
