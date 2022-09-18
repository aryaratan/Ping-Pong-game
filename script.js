// accessing html items
const ball = document.getElementById("ball");    
const upperbar = document.getElementById('upper');
const lowerBar = document.getElementById('lower');

// styling to ball
ball.style.margin = "250px 0px 0px 620px";

// variables 
var interval;
var score1 = 0;
let PerName;

// speed variables
var vx = 2;
var vy = 2;

// initial paddle left 
var l = window.innerWidth / 2  - 75 ;
var v ;


ball.style.marginLeft =  l + 65 +  "px";
ball.style.marginTop = innerHeight/2 - 10 + "px";
upperbar.style.left =  l + "px";
upperbar.style.top =   "30px";
lowerBar.style.left =  l + "px";
lowerBar.style.left =  innerHeight - 30 + "px";


// for handling multiple collision
let collision = true;

// for knowing is first game of not
let isFirstGame = false;

// fucntion for first game
function newGame(){
    // input name
    PerName = window.prompt("Enter your name");
    // object for local storage
    let obj = { "name": PerName, "score": 0 };
    // convert obj to string (setItem only take string)

    localStorage.setItem('player', JSON.stringify(obj));

    // variable for speed
    v =  parseInt(prompt("Enter level "));
    vx = v;
    vy = v;
    alert("This is your first game ");
}

// start game function which initialise interval
function start() {   
    // getItem from localstorage (it also returns string)         
    var data = JSON.parse(localStorage.getItem('player'));
    if(isFirstGame){
        alert("Previous max score of " + data.name + " " + data.score);
    }
    isFirstGame = true; 
    // interval 
    interval = setInterval(move, 10);
}

// function for reset the paddle and ball after ending game
function reset() {
    // clear the interval
    clearInterval(interval);
    // initialise all value form start
    score1 = 0;
    // vx = v;
    // vy = v;
    l = innerWidth /2 - 75 ;
    ball.style.marginLeft =  l + 65 +  "px";
    ball.style.marginTop = innerHeight/2 - 10 + "px";
    upperbar.style.left =  l + "px";
    lowerBar.style.left =  l + "px";
    // collision = true;

    // reccursive call to start
    start();
}


// ball move function
function move() {
    // cordinates of ball and paddles
    var cordinates = ball.getBoundingClientRect();
    var upperCord = upperbar.getBoundingClientRect();
    var lowerCord = lowerBar.getBoundingClientRect();
    var x = cordinates.x;
    var y = cordinates.y;

    // fail condition
    if (y > lowerCord.bottom) {

        let data = JSON.parse(localStorage.getItem('player'));
        // update max score if needed    
        if (data.score < score1) {
            let obj = { "name": PerName, "score": score1 };
            localStorage.setItem('player', JSON.stringify(obj));
            window.alert("New high score " + score1);
        }

        else{
            alert("Your score " + score1);
        }
        // reset function
        reset();
        return;
    }

    // second fail condition
    if (cordinates.bottom < upperCord.top) {
        let data = JSON.parse(localStorage.getItem('player'));
        
        if (data.score < score1) {
            let obj = { "name": PerName, "score": score1 };
            localStorage.setItem('player', JSON.stringify(obj));
            window.alert("New high score " + score1);
        }
        else{
            alert("Your score " + score1);
        }
        reset();
        return;
    }

    // if lower paddle touch
    if (cordinates.bottom >= lowerCord.top) {
        if (cordinates.right > lowerCord.left && cordinates.left < lowerCord.right && collision) {
            vy = -1 * vy;
            console.log("lower");
            collision = false;
        }
    }

    // if right touch
    if (cordinates.right == window.innerWidth) {
        vx = -1 * vx;
    }
    // if left side touch
    if (x == 0) {
        vx = -1 * vx;
    }

    // if upper paddle touch
    if (cordinates.top <= upperCord.bottom) {
        if (cordinates.left > upperCord.left && cordinates.left < upperCord.right && !collision) {
            vy = -1 * vy;
            score1++;
            collision = true;
        }
    }

    // make ball move by inc / dec margins to left and top
    ball.style.marginLeft = x + vx + 'px';
    ball.style.marginTop = y + vy + 'px';
}


// make paddle move by left and right arrow keys
document.addEventListener('keydown', function (event) {
    // key value and max left value
    if (event.keyCode == 39 && l <= innerWidth - 165) {
        upperbar.style.left = l + 15 + 'px';
        lowerBar.style.left = l + 15 + 'px';
        l += 15;
    }
    // key value and min left value
    else if (event.keyCode == 37 && l >= 15) {
        upperbar.style.left = l - 15 + 'px';
        lowerBar.style.left = l - 15 + 'px';
        l -= 15;
    }
})
// call new game 
newGame();
// start game
start();