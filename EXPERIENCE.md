# Vibe Coding Experience: Scientific Calculator

## Tool Selection Justification
I chose **Cursor** for this project because it integrates directly into VS Code, allowing me to stay in a familiar environment while using advanced AI features. Its "Composer" mode (Cmd+I) is particularly appealing because it can generate and edit multiple files (HTML, CSS, JS) simultaneously.

## Development Process
The development process was fast but required several iterations to get right.
1. **Initial Prompt:** I started with a prompt for a "Scientific Calculator." Cursor generated the skeleton (`index.html`, `style.css`, `script.js`) in under a minute.
2. **Testing:** I opened the file in the browser to test the math logic.
3. **Refining:** I used the Composer chat to refine the code. I acted as a "Project Manager," telling the AI what was visually wrong or logically broken, rather than writing the code myself.

## Challenges and Solutions
I encountered two significant "Vibe Coding" challenges:

**1. The "Math" Bug (Radians vs. Degrees):**
The initial code used JavaScript's standard `Math.sin()` function, which expects Radians. When I tested `sin(30)`, I got `-0.988` instead of `0.5`.
* **Solution:** I prompted the AI specifically: *"The calculator is using Radians. Update logic so sin/cos/tan accept Degrees."* The AI successfully rewrote the trig functions to convert inputs `(value * Math.PI / 180)` before calculating.

**2. The "Regression" (UI Fix Broke the Logic):**
Later, I asked the AI to "redesign the calculator to look like a physical device." It successfully updated the CSS to a beautiful dark/flat theme, but it regenerated the JavaScript file and **removed** my previous Radians/Degrees fix, reverting the calculator to Radians.
* **Solution:** I realized I had to be very specific. I prompted it to *"Fix the math logic in script.js WITHOUT touching the style.css or index.html files."* This taught me that AI doesn't always "remember" previous fixes when you ask for a major overhaul.

## Reflection
Vibe coding surprised me by how much it shifts the focus from *syntax* to *verification*. I didn't worry about missing semicolons; I worried about whether the app *behaved* correctly. It definitely speeds up the "0 to 1" phase of a project. However, the regression bug (where the UI update broke the math) showed me that AI lacks "object permanence"—it will happily overwrite good code if you aren't careful. I would use this for future prototyping, but I will always double-check the logic after every visual update.