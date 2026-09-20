
## 2024-03-24 - Accessibility for Icon-only Buttons
**Learning:** This app relies heavily on icon-only buttons across its components (e.g. `VideoHeader.tsx`). Often, these buttons were missing descriptive accessible names, rendering them silent or confusing for screen reader users, and missing focus visible states for keyboard navigation.
**Action:** When adding or updating icon-only buttons in the design system, always ensure they are given a semantically clear `aria-label` (and `aria-expanded` for toggles) in the correct language. In addition, apply standard focus ring classes (like `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500`) to guarantee robust keyboard accessibility.
