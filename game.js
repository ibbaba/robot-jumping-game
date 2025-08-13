// Game setup
const robot = document.getElementById("robot");
const jumpSound = document.getElementById("jump_sound.mp3");
const hitSound = document.getElementById("hit_sound.mp3");

let isJumping = false;
let gravity = 0.6;
let jumpStrength = -15;
let robotVelocity = 0;
let robotPosition = 50; // Bottom position (in px)

let gameSpeed = 2;
let obstacles = [];
let gameInterval;
let lastObstacleTime = 0;
let gameStarted = false;  // Flag to track if the game has started

// Start the game when the page is loaded
window.onload = function() {
    gameStarted = true;  // Ensure the game only starts after this
    gameInterval = setInterval(updateGame, 1000 / 60);  // Start the game loop
};

// Listen for spacebar to jump
document.addEventListener("keydown", function(event) {
    if (event.key === " " && !isJumping) {
        isJumping = true;
        robotVelocity = jumpStrength;
        jumpSound.play();
    }
});

// Update the game state
function updateGame() {
    if (!gameStarted) return;  // Skip if the game hasn't started

    // Update robot position
    robotVelocity += gravity;
    robotPosition += robotVelocity;
    if (robotPosition >= 50) {
        robotPosition = 50;
        isJumping = false;
        robotVelocity = 0;
    }
    robot.style.bottom = robotPosition + "px";

    // Move obstacles
    obstacles.forEach(obstacle => {
        let obstaclePosition = parseInt(obstacle.style.right);
        obstaclePosition += gameSpeed;
        obstacle.style.right = obstaclePosition + "px";

        // Remove obstacle if it goes off-screen
        if (obstaclePosition > window.innerWidth) {
            obstacle.remove();
            obstacles.shift();
        }

        // Check for collision
        if (obstaclePosition > 100 && obstaclePosition < 150 && robotPosition < 100) {
            hitSound.play();
            clearInterval(gameInterval);  // Stop the game loop
            alert("Game Over!");  // Show Game Over message
        }
    });

    // Add new obstacles over time
    if (Date.now() - lastObstacleTime > 2000) {
        createObstacle();
        lastObstacleTime = Date.now();
    }

    gameSpeed += 0.001;  // Increase speed over time
}

// Create new obstacles
function createObstacle() {
    let obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");
    obstacle.style.right = "0px";
    document.getElementById("game-container").appendChild(obstacle);
    obstacles.push(obstacle);
}

// Restart the game (optional feature to reset)
function restartGame() {
    obstacles.forEach(obstacle => obstacle.remove());
    obstacles = [];
    robotPosition = 50;
    gameSpeed = 2;
    lastObstacleTime = 0;
    gameStarted = false;
    robot.style.bottom = robotPosition + "px";
    gameInterval = setInterval(updateGame, 1000 / 60);  // Restart game loop
}

