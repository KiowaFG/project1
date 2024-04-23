//define HTML elements
const board = document.getElementById(`gameBoard`);
const instructionText = document.getElementById(`instructionText`);
const logo = document.getElementById(`logo`);
const highScoreText = document.getElementById(`highScore`);

//define game variables
const gridSize = 20;
let snake = [{x:10, y: 10}];
let food = generateFood();
let highScore = 0;
let direction = `right`
let gameInterval
let gameSpeedDelay = 200;
let gameStarted = false;
const score = document.getElementById(`score`);
let enemy = spawnEnemy();
let gameIntervalEnemy
//draw game map, snake, food
function draw(){
    board.innerHTML = ``;
    drawSnake();
    drawFood();
    updateScore();
    drawEnemy()
}

//draw snake
function drawSnake(){
    snake.forEach((segment) =>{
        const snakeElement = createGameElement(`div`,`snake`)
        setPosition(snakeElement,segment)
        board.appendChild(snakeElement);
    })
}

//create a snake or food cube/div

function createGameElement(tag, className){
    const element = document.createElement(tag)
    element.className = className
    return element;
}

//set the position of snake or food
function setPosition(element, position){
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

//testing draw function

//draw();

//draw food function
function drawFood(){
    if(gameStarted){
    const foodElement = createGameElement(`div`,`food`)
    setPosition(foodElement, food);
    board.appendChild(foodElement);
    }
}
//generate food
function generateFood(){
    const x = Math.floor(Math.random() * gridSize) +1 ;
    const y = Math.floor(Math.random() * gridSize) +1 ;
    return {x, y};
}

//mooving snake
function move(){
    const head = {...snake[0]}
    switch (direction) {
        case `up`:
            head.y--         
            break;

        case `down`:
                head.y++            
                break;

        case `left`:
                head.x--            
                break;    
        case `right`:
            head.x++            
            break;
        default:
            break;
    }
    
    snake.unshift(head);

    //snake.pop();

    if (head.x === food.x && head.y === food.y){
        food = generateFood();
        increaseSpeed();
        clearInterval(gameInterval);
        gameInterval =setInterval(() =>{
            move();
            checkCollision();
            draw();     
        },gameSpeedDelay)
    }
    // if (head.x === enemy.x && head.y === enemy.y){
    //     clearInterval()
    //     gameIntervalEnemy = setInterval(() =>{
    //         move();
    //         checkCollision()
    //         snake.pop()
    //     })
    // }
    else if (head.x === enemy.x && head.y === enemy.y) {
        snake.pop(); // Lose one square of the snake when hitting an enemy
        snake.length > 1 ? snake.pop() : resetGame(); // Ensure the snake doesn't disappear or game doesn't crash
        enemy = spawnEnemy(); 
    }
    
    else {
        snake.pop()
    }
}

//test moving

/* setInterval(() => {
    move()
    draw()
},200) */

//start game function

function startGame(){
    gameStarted = true;
    instructionText.style.display = `none`;
    logo.style.display = `none`;
    gameInterval = setInterval (() =>{
        move();
        checkCollision();
        draw();
    },gameSpeedDelay)
}

// keypress event listener
function handleKeyPress(event){
    if (
        (!gameStarted && event.code === `Space`)||(!gameStarted && event.key === ` `)) {
        startGame()
    }
    else{
      switch (event.key){
        case `ArrowUp`:
        case `w`:    
            if (direction !== 'down'){
                direction = `up`
            }
            break;
        case `ArrowDown`:
        case `s`: 
            if (direction !== 'up'){
                direction = `down`
            }
             break;
        case `ArrowLeft`:
        case `a`:          
            if (direction !== 'right'){
                direction = `left`               
            }
            break;
        case `ArrowRight`:
        case `d`:                
            if(direction !== `left`){
                direction = `right`
            }
            break;
      } 
    }
}

document.addEventListener(`keydown`, handleKeyPress)

function increaseSpeed(){
   // console.log(gameSpeedDelay);
if ( gameSpeedDelay > 150){
    gameSpeedDelay -= 5;
    }
    else if (gameSpeedDelay > 100) {
        gameSpeedDelay -= 3 ;
    }
    else if (gameSpeedDelay > 50) {
        gameSpeedDelay -= 3 ;
    }
    else if (gameSpeedDelay > 25) {
        gameSpeedDelay -= 3 ;
    }
}

function checkCollision (){
    const head = snake[0];

    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize){
        resetGame();
    }
    for (let i = 1 ; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y){
            resetGame();
        }
        
    }
}

function resetGame() {
    updateHighScore();
    stopGame();
    snake = [{x: 10, y: 10}];
    food= generateFood();
    direction = `right`;
    gameSpeedDelay = 200;
    updateScore();
}

function updateScore(){
    const currentScore = snake.length -1;
    score.textContent = currentScore.toString().padStart(8,`Score 0`)
}

function stopGame() {
    clearInterval(gameInterval);
    gameStarted = false;
    instructionText.style.display = `block`
    logo.style.display = `block`
}

function updateHighScore() {
    const currentScore = snake.length -1;
    if (currentScore > highScore) {
        highScore = currentScore
        highScoreText.textContent= highScore.toString().padStart(6,'H.S. 0');
    }
    highScoreText.style.display = `block`;
}

function drawEnemy(){
    if(gameStarted){
    const enemyElement = createGameElement(`div`,`enemy`)
    setPosition(enemyElement, enemy);
    board.appendChild(enemyElement);
    }
}

//  class enemy{
//      constructor(health){
//      this.health = 2

//      }
//  }

//  function spawnEnemy (){
//      const x = Math.floor(Math.random() * gridSize) +1 ;
//     const y = Math.floor(Math.random() * gridSize) +1 ;
//      return {x, y};
//  }

 function spawnEnemy() {
    let x, y;
    do {
        x = Math.floor(Math.random() * gridSize) + 1;
        y = Math.floor(Math.random() * gridSize) + 1;
    } while (snake.some(segment => segment.x === x && segment.y === y) || (x === food.x && y === food.y));
    return {x, y};
}





