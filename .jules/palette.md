## 2024-06-25 - Icon-only buttons lacking accessible names and keyboard focus

**Learning:** When using `backdrop-blur` or absolute positioning for icon-only buttons overlaying images (such as in RecipeCard and RecipeDetail), these elements consistently lack accessible names (`aria-label`) and visible keyboard focus indicators, making them difficult to use for screen reader and keyboard-only users.

**Action:** Ensure all icon-only buttons are provided with descriptive `aria-label`s and visible focus states using classes like `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500` to guarantee accessibility.
