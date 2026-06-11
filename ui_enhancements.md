# UI Enhancements: Onboarding Setup Wizard

The following visual and structural enhancements were implemented in the `OnboardingWizard.jsx` to create a modern, premium enterprise aesthetic:

## 1. Global Visual Language
*   **Ambient Backgrounds:** Added subtle, glowing, blurred orbs (using `radial-gradient` and large `blur()` filters) behind the main layout to give the page depth and a futuristic, "glassmorphism" feel.
*   **Glass Panels:** All interactive elements, containers, and cards now utilize a semi-transparent `glass-panel` class with borders to separate them from the background cleanly.
*   **Typography Upgrades:** Increased heading sizes, improved letter spacing (`-0.02em` for headings to look sleeker), and utilized a gradient text effect (`text-gradient`) on key branding elements like "pulseCX".

## 2. Dynamic Timeline (Left Sidebar)
*   **Connected Nodes:** Transformed a simple list into a connected, vertical timeline. A subtle gray line connects each numbered step.
*   **Active/Completed States:** 
    *   **Completed:** The step's circle turns solid blue with a white checkmark icon.
    *   **Active:** The step's circle gets a glowing blue border with solid blue interior.
    *   **Pending:** The step remains grayed out with 40% opacity.
*   **Contextual Subtext:** Added a short description underneath each step title (e.g., "Core details" under Application Setup) to guide the user better.

## 3. Interactive Component Upgrades
*   **Selectable Cards (Step 2 - Monitoring Type):** Replaced basic text/buttons with large, interactive cards featuring high-quality Lucide icons (`MonitorPlay`, `Server`, `Cloud`). Selecting a card applies a vibrant blue border, subtle blue background tint, a drop shadow, and a slight upward translate (`transform: translateY(-2px)`).
*   **Location Grid (Step 3 - Locations):** Updated the standard checkbox list into a grid of clickable glass-tiles containing custom styled checkboxes and region subtext (e.g., "us-east").
*   **Evidence Toggles (Step 6):** Converted raw checkboxes into large, clickable pill-shaped buttons with their corresponding icons (e.g., a Camera for Screenshots, a Globe for DNS).

## 4. Journey Builder (Step 4)
*   **Sequential Visuals:** Added a visual indicator (a blue circle overlapping the left border) for each row to mimic a timeline/flowchart structure.
*   **Input Layout:** Arranged the Action dropdown, Target input, and Expected Result input horizontally with equal spacing, utilizing monospace font for the "Target" input to distinguish technical values.

## 5. Animated Test Simulation (Step 9)
*   **Loading State:** Replaced a static "Testing..." button with a visually engaging simulation screen. When clicking "Execute Test Run":
    *   A custom CSS spinning animation (`@keyframes spin`) replaces the Play button.
    *   A progress bar smoothly transitions from 0% to 100% over a few seconds to simulate an actual remote execution.

## 6. Review & Activation (Steps 10 & 11)
*   **Success Splash:** Added a large, prominent green CheckCircle icon on the results page to provide immediate, positive visual feedback.
*   **Summary Grid:** Built a clean, 2-column grid in Step 11 to summarize all user selections (App Name, Environment, Frequency, etc.) utilizing muted, uppercase labels above the strong, bold values.
*   **Primary Call to Action:** The final "Start Global Monitoring" button was upgraded with a horizontal gradient background, larger padding, and a prominent drop shadow.
