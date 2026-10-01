## 2023-10-24 - Accessibility improvements for icon-only buttons
**Learning:** Found multiple icon-only buttons (like save recipe, go back, close modal) without `aria-label` attributes. This makes them inaccessible to screen readers as the buttons only contain SVG icons.
**Action:** Ensure all icon-only buttons have descriptive `aria-label` attributes. Added translation support for screen reader labels to match the current user interface language.
