

let canvas;
let canvasContext;

let pongBallX = 50;
let pongBallY = 50;
let pongBallSpeedX = 10;
let pongBallSpeedY = 6;

let player = 0;
let computer = 0;
const WINNER_SCORE = 3; 
let whoWon = false;
 

let canvasWidth = 800;
let canvasHight = 600;

let paddleLeft = 250;
let paddleRight = 250;
const PADDLE_SIZE = 100;
const PADDLE_WIDTH = 10;


window.onload = function(){
    canvas = document.getElementById('blackBackground');
    canvasContext = canvas.getContext('2d');

    //let the ball animate
    let frameRate = 60;
    setInterval(function(){ blocks(); animation(); }, 1000/frameRate);

    //this will reset the game after is over
    document.addEventListener('mousedown', clickToPlay);

    // make the paddle mover where ever the mouse is
    canvas.addEventListener('mousemove', 
    function(evt){
        let mousePos = mousePosition(evt);
        paddleLeft = mousePos.y - (PADDLE_SIZE / 2);
    });

    middleStart();
    
}

function blocks(){
    //this is the black background 
    positionAndColor(0, 0, canvasWidth , canvasHight, 'black');
    //this is the end screen if someone won the game
    if(whoWon){
        canvasContext.fillStyle = 'white';

        pongBallX = canvasWidth /2;
        pongBallY = canvasHight /2;
            
        if(player >= WINNER_SCORE){
            display(`Player  Won`,85, canvasHight - 530, 'white');
        } else if(computer >= WINNER_SCORE){
            display(`Computer Won`,canvasWidth - 120, canvasHight - 530, 'white');  
        }
        display('Click To Continue', canvasWidth/2, 100);
        return;
    }
    //this is the net
    net();
    //this is the left player
    positionAndColor(0, paddleLeft, PADDLE_WIDTH, PADDLE_SIZE, 'white');
    //this is the right player
    positionAndColor(canvasWidth - PADDLE_WIDTH, paddleRight, PADDLE_WIDTH, PADDLE_SIZE, 'white');
    // this is the pong ball
    pongCircle(pongBallX, pongBallY, 10, 'pink');
    //countScore
    display(player, 100, 100);
    display(computer, canvasWidth-100, 100);
    //Player and computer name
    display('Player', 85, canvasHight - 530, 'white');
    display('Computer', canvasWidth - 120, canvasHight - 530, 'white' );
}

//putting the score and the names
function display(input, cwidth, cheight, colorText){
    canvasContext.fillStyle = colorText;
    canvasContext.fillText(input, cwidth, cheight);
}

//Making the pong ball circle
function pongCircle(centerX, centerY, radius, circleColor){
    canvasContext.fillStyle = circleColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}

//this is the DIY effect for color of the objects and ther position
function positionAndColor( side, top, width, hight, color){
    canvasContext.fillStyle = color;
    canvasContext.fillRect(side, top, width, hight);
}

//this make the ball move and make it bounce off on edge
function animation(){


    //STOP THE GAME IF SOMEONE WON THE GAME 
    if(whoWon){
        return;
    }

    //this make the ball move left and right
    pongBallX+= pongBallSpeedX;

    //this is computer side
    if(pongBallX >= canvasWidth){

        //this check if the ball hist the paddle or not
        if(pongBallY > paddleRight && pongBallY < paddleRight + PADDLE_SIZE){
            pongBallSpeedX= -pongBallSpeedX;
            
            let ballAngle = pongBallY - (paddleLeft + PADDLE_SIZE / 2);
            pongBallSpeedY = ballAngle * 0.06;

        } else{
            player++;           //score is added before it is reset
            pongBallReset();
        }
    } 

    //this is player side
    if(pongBallX <= 0){

        //this check if the ball hist the paddle or not
        if (pongBallY > paddleLeft && pongBallY < paddleLeft + PADDLE_SIZE){
            pongBallSpeedX= -pongBallSpeedX;

            let ballAngle = pongBallY - (paddleRight + PADDLE_SIZE / 2);
            pongBallSpeedY = ballAngle * 0.06;

        } else{
            computer++;         //score is added before it is reset
            pongBallReset();
        }
    } 

    //this make the ball move up and down
    pongBallY+= pongBallSpeedY;

    if(pongBallY >= canvasHight){
        pongBallSpeedY= -pongBallSpeedY;
        
    } 
    if(pongBallY <= 0){
        pongBallSpeedY= -pongBallSpeedY;
        
    }

    computerMovement();     //computer moving the right paddle
}

//making the paddel move up and down from anywhere in the black background
function mousePosition(evt){
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = evt.clientX - rect.left - root.scrollLeft;
    let mouseY = evt.clientY - rect.top - root.scrollTop;

    return{
        x:mouseX,
        y:mouseY
    };
}

//reset the ball if the player miss the ball
function pongBallReset(){

    if(player >= WINNER_SCORE || computer >= WINNER_SCORE){
        whoWon = true;
    }
    pongBallSpeedX= -pongBallSpeedX;
    pongBallX = canvasWidth/2;
    pongBallY = canvasHight/2;
}

//computer move the right paddle
function computerMovement(){

    let paddleRightCenter = paddleRight + (PADDLE_SIZE / 2); 

    if(pongBallY - 20 > paddleRightCenter){
        paddleRight+= 9;
    }else if (pongBallY + 20 < paddleRightCenter ){
        paddleRight-= 9;
    }
}

//this will rest the game after it is GAME OVER
function clickToPlay(evt){
    if(whoWon){
        player = 0;
        computer = 0;
        whoWon = false;
    }
} 


//The line between the plater and the computer.
function net(){
    for(let i = 0; i < canvasHight; i+= 30){
        positionAndColor(canvasWidth/2 -1, i, 2, 20, 'white');
    }
}

//thias make the pong ball start from the middle
function middleStart(){
    pongBallX = canvasWidth /2;
    pongBallY = canvasHight /2;
}