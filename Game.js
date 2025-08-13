// Game setup
const robot = document.getElementById("robot");
const jumpSound = document.getElementById("jump-sound");
const hitSound = document.getElementById("hit-sound");

let isJumping = false;
let gravity = 0.6;
let jumpStrength = -15;
let robotVelocity = 0;
let robotPosition = 50; // Bottom position (in px)

let gameSpeed = 2;
let obstacles = [];
let gameInterval;
let jumpInterval;
let lastObstacleTime = 0;

document.addEventListener("keydown", function(event) {
    if (event.key === " " && !isJumping) {
        isJumping = true;
        robotVelocity = jumpStrength;
        jumpSound.play();
    }
});

function createObstacle() {
    let obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");
    obstacle.style.right = "0px";
    obstacle.style.bottom = "50px";
    document.getElementById("game-container").appendChild(obstacle);
    obstacles.push(obstacle);
}

function updateGame() {
    // Update robot position
    if (isJumping) {
        robotVelocity += gravity;
        robotPosition += robotVelocity;
        if (robotPosition >= 50) {
            robotPosition = 50;
            isJumping = false;
            robotVelocity = 0;
        }
    }

    // Move robot
    robot.style.bottom = robotPosition + "px";

    // Move obstacles
    obstacles.forEach(obstacle => {
        let obstaclePosition = parseInt(obstacle.style.right);
        obstaclePosition += gameSpeed;
        obstacle.style.right = obstaclePosition + "px";

        if (obstaclePosition > window.innerWidth) {
            obstacle.remove();
            obstacles.shift();
        }

        // Check for collision
        if (obstaclePosition > 100 && obstaclePosition < 150 && robotPosition < 100) {
            hitSound.play();
            clearInterval(gameInterval);
            alert("Game Over!");
        }
    });

    // Add new obstacles over time
    if (Date.now() - lastObstacleTime > 2000) {
        createObstacle();
        lastObstacleTime = Date.now();
    }

    gameSpeed += 0.001; // Increase speed over time
}

function startGame() {
    gameInterval = setInterval(updateGame, 1000 / 60);
}

startGame();
