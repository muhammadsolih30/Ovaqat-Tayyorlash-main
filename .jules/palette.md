## 2024-03-24 - Interactive Elements Visibility With Keyboard Focus
**Learning:** Icon-only buttons using hover-based opacity utilities (e.g. `opacity-0 group-hover:opacity-100`) for visibility become inaccessible to keyboard users because focusing them does not trigger the hover state.
**Action:** When using hover-based opacity for visibility on interactive elements, always pair it with keyboard focus visibility classes (e.g., `focus-visible:opacity-100` alongside `focus-visible:ring-*`) to ensure they remain accessible and visible to users navigating via keyboard.
