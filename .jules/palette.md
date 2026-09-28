## 2024-05-25 - ARIA Labels and Focus States for Icon-Only Buttons
**Learning:** Icon-only buttons (like close modals, back buttons, save actions) lack screen reader context and visible focus indicators for keyboard navigation in this application.
**Action:** Consistently add `aria-label` (using localized Uzbek text like "Yopish", "Orqaga") and Tailwind focus utilities (`focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none`) to all interactive icon elements without visible text to ensure both screen reader support and keyboard accessibility.
