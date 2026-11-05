## 2024-05-24 - Interactive Elements Visibility and Accessibility
**Learning:** When using hover-based visibility utility classes (e.g., `opacity-0 group-hover:opacity-100`) on interactive elements like icon-only buttons, keyboard-only users and screen readers cannot discover or focus them properly if they remain invisible on focus.
**Action:** Always pair hover visibility classes with keyboard focus visibility classes (e.g., `focus-visible:opacity-100`) and ensure they have a descriptive `aria-label` attribute and visible focus ring (e.g., `focus-visible:ring-2`) to guarantee accessibility.
