// Pong Game Logic

// Ball properties
let ball = {
    x: 400, // initial x position
    y: 300, // initial y position
    radius: 10,
    speedX: 5, // velocity in x direction
    speedY: 3, // velocity in y direction
};

// Paddle properties
let paddleWidth = 10;
let paddleHeight = 100;
let playerPaddle = { x: 50, y: 250 }; // Player paddle
let aiPaddle = { x: 740, y: 250 }; // AI paddle

// Score
let playerScore = 0;
let aiScore = 0;

// Game settings
const canvasWidth = 800;
const canvasHeight = 600;

function update() {
    // Move ball
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Ball collision with top and bottom
    if (ball.y + ball.radius > canvasHeight || ball.y - ball.radius < 0) {
        ball.speedY *= -1; // Reverse direction
    }

    // Ball collision with paddles
    if ((ball.x - ball.radius < playerPaddle.x + paddleWidth &&
         ball.y > playerPaddle.y &&
         ball.y < playerPaddle.y + paddleHeight) ||
        (ball.x + ball.radius > aiPaddle.x &&
         ball.y > aiPaddle.y &&
         ball.y < aiPaddle.y + paddleHeight)) {
        ball.speedX *= -1; // Reverse direction
    }

    // Score management
    if (ball.x + ball.radius > canvasWidth) {
        playerScore++; // Player scores
        resetBall();
    } else if (ball.x - ball.radius < 0) {
        aiScore++; // AI scores
        resetBall();
    }
}

function resetBall() {
    ball.x = canvasWidth / 2;
    ball.y = canvasHeight / 2;
    ball.speedX = Math.random() > 0.5 ? 5 : -5;
    ball.speedY = Math.random() * 6 - 3; // Random vertical speed
}

function aiMovement() {
    // Basic AI logic
    if (ball.y < aiPaddle.y) {
        aiPaddle.y -= 4; // Move up
    } else if (ball.y > aiPaddle.y + paddleHeight) {
        aiPaddle.y += 4; // Move down
    }

    // Prevent AI paddle from moving out of canvas
    aiPaddle.y = Math.max(0, Math.min(canvasHeight - paddleHeight, aiPaddle.y));
}

function gameLoop() {
    update();
    aiMovement();
    // Here, you would redraw the game state
    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();