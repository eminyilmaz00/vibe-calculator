# Vibe Calculator

A modern, dark-mode scientific calculator built using "Vibe Coding" techniques.

![Project Screenshot](screenshot.png)

## Description
This project explores the capabilities of AI-powered "vibe coding" tools. It features a fully functional scientific calculator with a "physical device" aesthetic, history tracking, and advanced trigonometry logic.

## Features
* **Scientific Functions:** Support for sin, cos, tan, log, square root, and exponents.
* **History Sidebar:** Tracks the last 10 calculations. Clicking a history item re-uses the result.
* **Smart Logic:** Trigonometry functions work in **Degrees** (standard human use) rather than Radians.
* **Physical UI:** A clean, flat design inspired by physical scientific calculators.

## Technologies Used
* HTML5
* CSS3 (Grid & Flexbox)
* JavaScript (ES6)
* **Vibe Tool:** Cursor (AI Composer)

## Installation & Setup
1.  Clone the repository:
    ```bash
    git clone https://github.com/eminyilmaz00/vibe-calculator.git
    ```
2.  Navigate to the project folder:
    ```bash
    cd vibe-calculator
    ```
3.  Open `index.html` in any web browser (Chrome, Firefox, Safari).

## How to Run
* Simply double-click `index.html` to run it locally.
* For the best development experience, use the "Live Server" extension in VS Code/Cursor.

## 🐳 Docker Deployment

You can run this project in a container using Docker.

### 1. Build the Image
Run this command in the project directory:
```bash
docker build -t vibe-calculator .