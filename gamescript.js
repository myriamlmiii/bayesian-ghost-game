document.addEventListener("DOMContentLoaded", () => {
    const cols = 13;
    const rows = 8;
    const initialScore = 30;
    const initialBusts = 2;

    let score = initialScore;
    let remainingBusts = initialBusts;
    let ghostFound = false;
    let showProbabilities = false;
    let directionSensorActive = false;

    // Initialize uniform probabilities
    let probabilities = Array.from({ length: rows }, () => Array(cols).fill(1 / (rows * cols)));
    let ghostPos = placeGhost();
    const clickedCells = new Map();

    const gameContainer = document.getElementById("game-container");
    const scoreSpan = document.getElementById("score");
    const bustsSpan = document.getElementById("remainingBusts");
    const directionDisplay = document.getElementById("directionDisplay");
    const viewProbabilitiesButton = document.getElementById("viewProbabilities");
    const directionSensorButton = document.getElementById("directionSensor");
    const bustGhostButton = document.getElementById("bustGhost");
    const restartGameButton = document.getElementById("restartGame");

    // Randomly place the ghost
    function placeGhost() {
        const x = Math.floor(Math.random() * cols);
        const y = Math.floor(Math.random() * rows);
        console.log(`Ghost placed at: (${x}, ${y})`);
        return { x, y };
    }

    // Calculate Manhattan distance
    function calculateDistance(x1, y1, x2, y2) {
        return Math.abs(x1 - x2) + Math.abs(y1 - y2);
    }

    // Get direction based on player and ghost positions
    function getDirection(playerX, playerY, ghostX, ghostY) {
        if (playerX === ghostX && playerY === ghostY) return "HERE";
        if (Math.abs(playerX - ghostX) > Math.abs(playerY - ghostY)) {
            return playerX > ghostX ? "West" : "East";
        } else {
            return playerY > ghostY ? "North" : "South";
        }
    }

    // Toggle direction sensor
    directionSensorButton.addEventListener("click", () => {
        directionSensorActive = !directionSensorActive;
        directionSensorButton.textContent = directionSensorActive
            ? "Deactivate Direction Sensor"
            : "Activate Direction Sensor";
        directionDisplay.textContent = directionSensorActive
            ? "Direction: Sensor Activated"
            : "Direction: -";
    });

    // Handle cell clicks
    function handleCellClick(x, y, cell) {
        if (score <= 0 || remainingBusts <= 0 || ghostFound) return;

        const distance = calculateDistance(x, y, ghostPos.x, ghostPos.y);
        const color = senseDistance(distance);

        if (directionSensorActive) {
            const direction = getDirection(x, y, ghostPos.x, ghostPos.y);
            directionDisplay.textContent = `Direction: ${direction}`;
        } else {
            directionDisplay.textContent = "Direction: -";
        }

        cell.style.backgroundColor = color;
        cell.textContent = showProbabilities ? probabilities[y][x].toFixed(2) : "";
        clickedCells.set(`${x},${y}`, { color, probability: probabilities[y][x] });

        if (distance === 0) {
            ghostFound = true;
            alert("You found the ghost! Click 'Bust the Ghost' to confirm.");
            return;
        }

        updateProbabilities(x, y, color);
        score--;

        if (score <= 0) {
            alert("Game Over! Out of points.");
            revealGhost();
            return;
        }

        updateUI();
    }

    // Determine color based on distance
    function senseDistance(distance) {
        if (distance === 0) return "red";
        if (distance <= 2) return "orange";
        if (distance <= 4) return "yellow";
        return "green";
    }

    // Update probabilities using Bayesian inference
    function updateProbabilities(clickedX, clickedY, color) {
        const likelihood = Array.from({ length: rows }, () => Array(cols).fill(0));
        let totalProbability = 0;

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const distance = calculateDistance(x, y, clickedX, clickedY);
                const validDistances = {
                    red: [0],
                    orange: [1, 2],
                    yellow: [3, 4],
                    green: [5, 6, 7, 8, 9, 10]
                }[color];

                likelihood[y][x] = validDistances.includes(distance) ? 1 : 0;
            }
        }

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                probabilities[y][x] *= likelihood[y][x];
                totalProbability += probabilities[y][x];
            }
        }

        if (totalProbability > 0) {
            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    probabilities[y][x] /= totalProbability;
                }
            }
        } else {
            console.warn("Probabilities collapsed. Resetting to uniform distribution.");
            probabilities = Array.from({ length: rows }, () => Array(cols).fill(1 / (rows * cols)));
        }
    }

    // Reveal the ghost's location
    function revealGhost() {
        const ghostIndex = ghostPos.y * cols + ghostPos.x;
        const ghostCell = gameContainer.children[ghostIndex];
        ghostCell.style.backgroundColor = "red";
        ghostCell.textContent = "👻";
    }

    // Bust the ghost
    function bustGhost() {
        if (!ghostFound) {
            remainingBusts--;
            if (remainingBusts > 0) {
                alert("You missed! Try again. Busts remaining: " + remainingBusts);
            } else {
                revealGhost();
                alert("No more busts left. Game Over!");
            }
        } else {
            revealGhost();
            alert("Congratulations! You caught the ghost!");
        }
        updateUI();
    }

    // Update UI
    function updateUI() {
        scoreSpan.textContent = score;
        bustsSpan.textContent = remainingBusts;
    }

    // Initialize the grid
    function initializeGrid() {
        gameContainer.innerHTML = "";
        probabilities.forEach((row, y) => {
            row.forEach((prob, x) => {
                const cell = document.createElement("div");
                cell.className = "grid-cell";
                if (clickedCells.has(`${x},${y}`)) {
                    const cellData = clickedCells.get(`${x},${y}`);
                    cell.style.backgroundColor = cellData.color;
                    cell.textContent = showProbabilities ? cellData.probability.toFixed(2) : "";
                } else {
                    cell.style.backgroundColor = "#fff";
                    cell.textContent = showProbabilities ? prob.toFixed(2) : "";
                }
                cell.addEventListener("click", () => handleCellClick(x, y, cell));
                gameContainer.appendChild(cell);
            });
        });
    }

    viewProbabilitiesButton.addEventListener("click", () => {
        showProbabilities = !showProbabilities;
        initializeGrid();
    });

    bustGhostButton.addEventListener("click", bustGhost);
    restartGameButton.addEventListener("click", () => {
        score = initialScore;
        remainingBusts = initialBusts;
        ghostFound = false;
        probabilities = Array.from({ length: rows }, () => Array(cols).fill(1 / (rows * cols)));
        ghostPos = placeGhost();
        clickedCells.clear();
        directionDisplay.textContent = " -";
        showProbabilities = false;
        updateUI();
        initializeGrid();
    });

    initializeGrid();
    updateUI();
});
