let canvas = document.querySelector(".bane");
let context = canvas.getContext("2d");
let scoreText = document.querySelector(".score");

let score = 0;
let fps = 10;
let snakeBody = [{x:190, y:190}];



let snakeLength = 5;
let xSpeed = 10;
let ySpeed = 0;
let tileSize = 10;
let food = {};
positionFood();


function draw() {
    // reset canvas 
    canvas.width = canvas.width;

    // draw the snake
    for(let tile of snakeBody) {
        context.fillStyle = "coral";
        context.fillRect(tile.x, tile.y, tileSize, tileSize);  
    }

    // draw apples
        context.fillStyle = "coral";
        context.fillRect(food.x, food.y, tileSize, tileSize);  

    
    // // move the snake
    let oldPos = snakeBody[snakeBody.length-1];
    let newPos = {};
    newPos.x = oldPos.x + xSpeed;
    newPos.y = oldPos.y + ySpeed;



    // check for self collision

    for(let tile of snakeBody) {
        if((newPos.x === tile.x) && (newPos.y === tile.y)) {
            resetGame();
            return;
        }
    }  
    snakeBody.push(newPos);
    

    // check for food collision
    if(newPos.x == food.x && newPos.y == food.y) {
        snakeLength ++;
        score++;
        scoreText.innerHTML = `Score: ${score}`;
        positionFood();
    }

    // remove old tail elements
    while(snakeBody.length > snakeLength){
        snakeBody.shift();
    }

    // check for wall collisions
    if(newPos.x >= canvas.width) {
        newPos.x = 0;
    } if(newPos.x < 0) {
        newPos.x = canvas.width;
    } if(newPos.y >= canvas.height) {
        newPos.y = 0;
    } if(newPos.y < 0) {
        newPos.y = canvas.height;
    }

}



function resetGame() {
    snakeBody = [{x:190, y:190}];
    snakeLength = 5;
    score = 0;
    scoreText.innerHTML = `Score: ${score}`;
    
}


function positionFood() {
    food.x = Math.floor(Math.random() * 40) * tileSize;
    food.y = Math.floor(Math.random() * 40) * tileSize;

    for(let tile of snakeBody) {
        if(tile.x == food.x && tile.y == food.x) {
            positionFood();
        }
    }
};

setInterval(draw, 1000/fps);

// get user input
window.addEventListener("keydown", function (event) {
    console.log("keydown", event.code);
    if(event.code == "ArrowLeft" && xSpeed != 10) {
        xSpeed = -10;
        ySpeed = 0;
    }
    if(event.code == "ArrowRight" && xSpeed != -10){
        xSpeed = 10;
        ySpeed = 0;
    }
    if(event.code == "ArrowUp" && ySpeed != 10) {
        ySpeed = -10;
        xSpeed = 0;
    }
    if(event.code == "ArrowDown" && ySpeed != -10) {
        ySpeed = 10;
        xSpeed = 0;
    }
})
