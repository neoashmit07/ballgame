var ball;
var database;
var position;

function setup(){
    database= firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //reading from the database
    //storing the value into the variable
    //.ref() - referring to the field/node in the database
    var ballPosition = database.ref('ball/position');
    //.on() - creates a listener to always listen to the changes being made to the value of that node
    ballPosition.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

//reading the value from database and giving it to the ball sprite
function readPosition(data){
    position = data.val();
    ball.x=position.x;
    ball.y = position.y;
}

//update the value into the database
function writePosition(x,y){
    //.set() - helps you create a new node or change info in the database
    database.ref('ball/position').set({
        'x': position.x + x,
        'y': position.y + y,
    })
    
}

function showError(){
    console.log("cant read from the database")
}
