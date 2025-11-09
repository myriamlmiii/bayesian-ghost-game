# Bayesian Ghost Game: Probabilistic Reasoning Simulator

An interactive AI game implementing Bayesian inference for ghost localization using probabilistic sensor feedback on an 8×13 grid.

## 🎥 Demo Video

[![Watch Gameplay Demo](https://img.youtube.com/vi/nO9lVMx8nlk/maxresdefault.jpg)](https://youtu.be/nO9lVMx8nlk)

*Click the image above to watch the full gameplay demonstration*

---
## What Problem Are We Solving?

**Challenge:** How can players locate a hidden object using only noisy, probabilistic sensor feedback?

**Our Solution:** An interactive game that teaches Bayesian inference by having players hunt a ghost using two independent sensor systems:
- **Distance sensor:** Color-coded hints based on Manhattan distance
- **Direction sensor:** Compass-based directional feedback

Players observe how probability distributions update in real-time as they gather evidence, providing intuitive understanding of Bayesian reasoning.

---

## Game Overview

### Objective
Locate and "bust" a hidden ghost on an 8×13 grid using probabilistic sensor feedback.

### Core Mechanics

**Initial State:**
- Ghost randomly placed on grid
- Uniform probability: P(Ghost) = 1/104 ≈ 0.01 per cell

**Gameplay:**
- Click cells to receive sensor feedback
- Observe Bayesian probability updates
- Make bust attempt when confident of location

**Resources:**
- Starting score: 30 points (1 point per click)
- Bust attempts: 2
- Game ends when ghost found or resources exhausted

---

## Sensor Systems

### Distance Sensor (Color-Coded)

| Color | Distance | Probability P(Color|Distance) |
|-------|----------|-------------------------------|
| Red | 0 cells | 1.0 |
| Orange | 1-2 cells | 0.8 (orange), 0.2 (yellow) |
| Yellow | 3-4 cells | 0.6 (yellow), 0.4 (green) |
| Green | 5+ cells | 0.9 (green) |

### Direction Sensor (Optional)

Provides compass directions: N, S, E, W, NE, NW, SE, SW, HERE

**Accuracy:** 90% correct, 5-2.5% for adjacent/opposite directions

---

## Bayesian Inference

**Update Formula:**
```
P(Ghost at L | Sensor) = [P(Sensor | Ghost at L) × P(Ghost at L)] / Normalization
```

**Process:**
1. Start with uniform prior probabilities
2. Player clicks cell, receives sensor feedback
3. Calculate likelihood for each cell based on conditional probability tables
4. Multiply prior × likelihood for each cell
5. Normalize so probabilities sum to 1.0
6. Display updated probability distribution

---

## Technical Stack

**Technologies:**
- HTML5 (Grid interface)
- CSS3 (Responsive design, color-coded feedback)
- JavaScript (Bayesian inference, game logic)

**Key Features:**
- Real-time probability updates
- Dual-sensor probabilistic modeling
- Interactive grid visualization
- Probability distribution display toggle

---

## How to Run

### Option 1: Direct File
```bash
# Open in browser
open index.html
```

### Option 2: Local Server
```bash
# Python
python -m http.server 8000

# Node.js
npx http-server

# Then visit: http://localhost:8000
```

### Gameplay
1. Click cells to gather sensor evidence
2. (Optional) Activate direction sensor for additional hints
3. Toggle "View Probabilities" to see distribution
4. Click "Bust the Ghost" when red feedback appears
5. Win by finding ghost within resource limits

---

## Project Highlights

**AI Concepts:**
- Bayesian inference implementation
- Conditional probability modeling
- Sensor fusion with independent noise models
- Real-time belief state updates

**Educational Value:**
- Intuitive visualization of abstract probability theory
- Hands-on experience with Bayesian reasoning
- Understanding sensor uncertainty and information gain
- Decision-making under incomplete information

**Engineering:**
- Clean separation of game logic and probabilistic reasoning
- Efficient probability distribution updates
- Responsive UI with visual feedback
- Modular code structure

---

## Team Contributions

| Component | Meriem Lmoubariki | Mohamed Adam Sterheltou |
|-----------|-------------------|------------------------|
| Distance Sensor | Primary | Support |
| Direction Sensor | Support | Primary |
| Bayesian Updates | Collaborated | Collaborated |
| UI/UX Design | Primary | Support |
| Game Logic | Support | Primary |
| Testing | Collaborated | Collaborated |

---

## Results

**Typical Gameplay:**
- Average clicks to locate ghost: 15-25
- Direction sensor reduces clicks by ~30%
- Probability distributions converge rapidly near ghost
- Strategic exploration outperforms random clicking

**See full gameplay demonstration in the demo video above.**

---

## Project Files
```
bayesian-ghost-game/
├── index.html          # Game interface
├── styles.css          # UI styling
├── script.js           # Bayesian logic
├── README.md           # This file
└── report.pdf          # Detailed technical report
```

**For complete technical details, mathematical formulations, and in-depth analysis, see the full project report.**

---

## Applications

**This same technique is used in:**
- Robot localization and SLAM
- Medical diagnosis systems
- Autonomous vehicle perception
- Spam filtering and classification
- Financial risk assessment

---

## Acknowledgments

Sincere thanks to **Dr. Tajjeddine Rachidi** for guidance on this project. This work represents practical application of probabilistic AI concepts and Bayesian inference in an interactive educational context.

---

## Contact

**Meriem Lmoubariki**  
GitHub: [@myriamlmiii](https://github.com/myriamlmiii)


---

*Interactive demonstration of Bayesian inference through probabilistic game-based learning.*
