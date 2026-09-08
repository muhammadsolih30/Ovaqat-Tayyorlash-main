## 2024-05-24 - Initial creation\n**Learning:** Started tracking UX/a11y insights.\n**Action:** N/A
## 2026-09-08 - Adding ARIA labels to modal close buttons
**Learning:** Icon-only close buttons frequently lack ARIA labels, making them inaccessible to screen readers. This pattern is common in modals. In bilingual applications, ARIA labels also need to respect language contexts (e.g., using context-derived `lang` variables for translation).
**Action:** Add localized `aria-label`s to all icon-only buttons to ensure full accessibility.
