## 2024-10-04 - Accessible Close Buttons
**Learning:** Icon-only close buttons in modals are completely invisible to screen readers without an aria-label, and they often lack keyboard focus states, making them difficult to use for keyboard-only users.
**Action:** Always ensure icon-only buttons (like `X` icons for closing modals) have an `aria-label` (matching the app's language, e.g., "Yopish" in Uzbek) and `focus-visible:ring-2 focus-visible:outline-none` classes.
