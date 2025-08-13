// Game setup
const robot = document.getElementById("robot");
const jumpSound = document.getElementById("jump_sound");
const hitSound = document.getElementById("hit_sound");

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
    if (!gameStarted) return;  // Skip if
