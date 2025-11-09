function setup() {
    createCanvas(windowWidth, windowHeight);
    noLoop();
}

function setup() {
    console.log("Setup function started"); // This should show in the browser's console.
    createCanvas(windowWidth, windowHeight);
    noLoop();
}

function draw() {
    background(128, 109, 124); // Background color similar to your Figma design
    drawText();
    drawButtons();
}

function drawText() {
    fill(255); // White text
    textSize(32);
    textAlign(CENTER, CENTER);
    text('Welcome to Bust the Ghost', width / 2, height / 2 - 100);
}

function drawButtons() {
    // Start Game button
    fill(255); // White button
    rect(width / 2 - 105, height / 2 + 20, 200, 50, 20);
    fill(0); // Black text
    textSize(18);
    text('Start Game', width / 2, height / 2 + 45);

    // Rules button
    fill(255); // White button
    rect(width / 2 - 105, height / 2 + 90, 200, 50, 20);
    fill(0); // Black text
    text('Rules', width / 2, height / 2 + 115);
}

function mousePressed() {
    // Check if 'Start Game' button is pressed
    if (mouseX >= width / 2 - 105 && mouseX <= width / 2 + 95 &&
        mouseY >= height / 2 + 20 && mouseY <= height / 2 + 70) {
        console.log('Start Game');
        // Here you can call a function to start the game
    }

    // Check if 'Rules' button is pressed
    if (mouseX >= width / 2 - 105 && mouseX <= width / 2 + 95 &&
        mouseY >= height / 2 + 90 && mouseY <= height / 2 + 140) {
        console.log('Rules');
        // Here you can call a function to show game rules
    }
}

function startGame() {
    // Redirect to the game interface
    window.location.href = 'game.html'; // Ensure you have a 'game.html' file setup for game UI
}

function showRules() {
    // Display game rules
    alert("Find and bust the ghost. Use 'View' to see the ghost probabilities. You have limited bust attempts.");
}
